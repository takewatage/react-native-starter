import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import C from 'expo-constants'
import User from 'src/models/user'
import {IModel} from 'src/interfaces/IModel'
import moment from 'moment'

export enum ItemSortType {
	DEFAULT = 0,
	BEST_BEFORE = 1,
	QUANTITY_ASC = 2,
	QUANTITY_DESC = 3
}

class FirestoreService {
	key = ''
	domain = ''
	projectId = ''
	bucket = ''
	collection = ''
	startAfter?: any
	page = 1
	private complete = false
	limit = 15
	query?: firebase.firestore.Query
	userCollection = ''
	itemCollection = ''
	tabCollection = ''
	shoppingListCollection = ''

    constructor() {
		this.userCollection = C.manifest.extra.firebase.userCollection
		this.itemCollection = C.manifest.extra.firebase.itemCollection
		this.tabCollection = C.manifest.extra.firebase.tabCollection
		this.shoppingListCollection = C.manifest.extra.firebase.shoppingListCollection

	}

    create(key: string, domain: string, projectId: string, bucket: string) {
        this.key = key
        this.domain = domain
        this.projectId = projectId

        if(window.firebase === undefined) {
            window.firebase = firebase
            window.firebase.initializeApp({
                apiKey: key,
                authDomain: domain,
                projectId: projectId,
                storageBucket: bucket,
            })

            window.db = window.firebase.firestore()
        }
        return this
    }

    setCollection(collection: string) {
        this.collection = collection
        return this
    }

    setLimit(num: number) {
        this.limit = num
        return this
    }

    setQuery(query: firebase.firestore.Query) {
        this.query = query
        return this
    }


    get isComplete(): boolean {
        return this.complete
    }

    set isComplete(val: boolean) {
		this.complete = val
	}

    clearPage() {
        this.complete = false
        this.page = 1
    }

    clearQuery() {
		this.query = undefined
	}

    async createUser(user: User) {
		this.patchCreatedAt(user)
		await window.db.collection(this.userCollection)
			.doc(user.id).set({...user.onScheme().getPostable()}, {merge: true})

		const tabs = Tab.dummy()
		tabs.map(x => x.userId = user.id)
		const tabId = await this.createManyTabs(tabs)

		const items = Item.dummy(tabId, user.id)
		await this.createManyItems(items)
	}

	async getUserDB(id: string, collection: string) {
		return await window.db.collection(collection).doc(id)
	}

	async getUser(id: string) {
		const doc = await this.getUserDB(id, this.userCollection)
		const data = await doc.get()
		return data.data()
	}

	async updateUser(user: User) {
		this.patchUpdatedAt(user)
		await window.db.collection(this.userCollection)
			.doc(user.id)
			.set({...user.getPostable()}, {merge: true})
	}

	async updateDeviceId(userId: string, deviceId: string) {
		await window.db.collection(this.userCollection)
			.doc(userId)
			.set({deviceId: deviceId}, {merge: true})
	}

	async whereInUser(ids: string[]) {
		if(!ids.length) return []
		const users: User[] = []
		await window.db.collection(this.userCollection)
			.where('id', 'in', ids)
			.get()
			.then(snap => {
				snap.forEach(x => {
					users.push(x.data() as User)
				})
			})

		return users
	}

	async pushMembers(ownerId: string, memberId: string) {
		const owner = await window.db.collection(this.userCollection)
			.doc(ownerId)
			.get()

		const data = owner.data() as User
		if(data.memberIds) {
			data.memberIds = [...new Set([...data.memberIds, memberId])]
		} else {
			data.memberIds = [memberId]
		}
		this.patchUpdatedAt(data)
		await window.db.collection(this.userCollection)
			.doc(ownerId)
			.set({...data}, {merge: true})
	}

	async createManyItems(items: Item[]) {
		const ref = window.db.collection(this.itemCollection).doc(items[0].userId)

		items.map(async(x) => {
			const item = await ref.collection('items').add({...x.getPostable()})
			item.set({id: item.id}, {merge: true})
		})
	}

	async createManyTabs(tabs: Tab[]) {
		const ref = window.db.collection(this.tabCollection).doc(tabs[0].userId)

		let tabId: string = ''
		await Promise.all(
			tabs.map(async x => {
				const tab = await ref.collection('tabs').add(x.getPostable())
				tab.set({id: tab.id}, {merge: true})
				tabId = tab.id
			})
		)

		return tabId
	}

	async getItems(userId: string) {
		let data: Item[] = []
		const col = await window.db.collection(this.itemCollection)
			.doc(userId)
			.collection('items')
			.get()
			.then(snap => {
				snap.forEach(doc => {
					data.push(new Item(doc.data()))
				})
			})

		return data

	}

	async updateOrCreateItem(item: Item, user: User) {
		let itemId = item.id
		user = new User({...user})

		const collection =
			await window.db.collection(this.itemCollection)
			.doc(user.getAccessUser())
			.collection('items')
		if(item.id) {
			this.patchUpdatedAt(item)
			this.patchUpdateUserDate(item, user)
			await collection.doc(item.id).set({...item}, {merge: true})
		} else {
			this.patchCreatedAt(item)
			const data = new Item(item).onScheme().getPostable()
			const itemData = await collection.add(data)
			itemData.set({id: itemData.id}, {merge: true})
			itemId = itemData.id
			//await this.updateTab(user.getAccessUser(), new Tab({hasItem: true, id: item.tabId}))
		}

        //await this.updateTab(user.getAccessUser(), new Tab({hasItem: true, id: item.tabId}))
		const doc = await collection.doc(itemId).get()
		return doc.data()
	}

	async imagePut(item: Item, error?: Function) {
		const metadata = {
			contentType: 'image/jpeg',
		}
		const storage = firebase.storage()
		const response = await fetch(item.icon)
		const blob = await response.blob()
		const date = new Date().toString()
		const uploadRef = storage.ref(`images/${item.userId}/`).child(`${date}`)

		await uploadRef.put(blob, metadata).catch(() => {
			if(error) {
				error()
			}
		})

		const url = await uploadRef.getDownloadURL()
		return {url: url, fullPath: uploadRef.fullPath}
	}

	async deleteItem(item: Item, userId: string) {
		await window.db.collection(this.itemCollection)
			.doc(userId)
			.collection('items')
			.doc(item.id)
			.delete()
	}

	async deleteItems(ids: IDeleteId[], userId: string) {
		ids.map(async x => {
			await window.db.collection(this.itemCollection)
				.doc(userId)
				.collection('items')
				.doc(x.id)
				.delete()
		})
	}

	async updateItems(items: Item[], user: User) {
		items.map(async x => {
			await this.updateOrCreateItem(x, user)
		})
	}
	async getItemsPaginate(userId: string, tabId?: string, sort: ItemSortType = ItemSortType.DEFAULT) {
		const data: object[] = []
		this.query = await window.db.collection(this.itemCollection).doc(userId).collection('items')

		if(tabId) {
			this.query = this.query.where('tabId', '==', tabId)
		}

		if(sort == ItemSortType.DEFAULT) {
			this.query = this.query.orderBy('createdAt', 'desc')
		}

		if(sort == ItemSortType.BEST_BEFORE) {
			this.query = this.query.where('date', '>', '')
				.orderBy('date', 'asc')
		}

		if(sort == ItemSortType.QUANTITY_ASC || sort == ItemSortType.QUANTITY_DESC) {
			const s = sort == ItemSortType.QUANTITY_ASC ? 'asc' : 'desc'
			this.query = this.query.orderBy('quantity', s)
		}

		if(this.page == 1) {
			await this.query
				.limit(this.limit)
				.get()
				.then(snap => {
					snap.forEach(x => {
						data.push(x.data())
					})

					this.startAfter = snap.docs[snap.docs.length - 1]
				})
		} else {
			await this.query
				.limit(this.limit)
				.startAfter(this.startAfter)
				.get()
				.then(snap => {
					snap.forEach(x => data.push(x.data()))

					this.startAfter = snap.docs[snap.docs.length - 1]
				})
		}
		this.page++

		if(data.length <= this.limit) {
			this.complete = true
		}

		return data.map(x => new Item(x).getPostable() as Item)
	}

	async getTabs(userId: string) {

		let data: Tab[] = []
		const col = await window.db.collection(this.tabCollection)
			.doc(userId)
			.collection('tabs')
			.get()
			.then(snap => {
				snap.forEach(doc => {
					data.push(new Tab(doc.data()))
				})
			})

		return data.map(x => x.getPostable() as Tab)
	}

	async getTabsId(userId: string) {
		const tabs = await this.getTabs(userId)
		return tabs.map(x => x.id)
	}

	async createTab(userId: string, tab: Tab) {
		this.patchCreatedAt(tab)
		const tabData = await window.db.collection(this.tabCollection)
			.doc(userId)
			.collection('tabs')
			.add(tab)

		await tabData.set({id: tabData.id}, {merge: true})

		const doc = await window.db.collection(this.tabCollection)
			.doc(userId)
			.collection('tabs')
			.doc(tabData.id)
			.get()

		return doc.data()

	}

	async updateTab(userId: string, tab: Tab) {
		this.patchUpdatedAt(tab)
		await window.db.collection(this.tabCollection)
			.doc(userId)
			.collection('tabs')
			.doc(tab.id)
			.set({...tab.getPostable()}, {merge: true})
	}

	async deleteTab(userId: string, tab: Tab) {
		await window.db.collection(this.tabCollection)
			.doc(userId)
			.collection('tabs')
			.doc(tab.id)
			.delete()
	}

	async deleteTabs(ids: IDeleteId[], userId: string) {
		ids.map(async x => {
			await window.db.collection(this.tabCollection)
				.doc(userId)
				.collection('tabs')
				.doc(x.id)
				.delete()
		})
	}

	async getIcons() {
		const doc = await window.db.collection('assets')
			.doc('icons').get()

		return doc.data()

	}

	async getShoppingListsPaginate(userId: string) {
		const data: object[] = []
		this.query = await window.db.collection(this.shoppingListCollection)
			.doc(userId).collection('shoppingLists')

		if(this.page == 1) {
			await this.query
				.limit(this.limit)
				.get()
				.then(snap => {
					snap.forEach(x => {
						data.push(x.data())
					})

					this.startAfter = snap.docs[snap.docs.length - 1]
				})
		} else {
			await this.query
				.limit(this.limit)
				.startAfter(this.startAfter)
				.get()
				.then(snap => {
					snap.forEach(x => data.push(x.data()))

					this.startAfter = snap.docs[snap.docs.length - 1]
				})
		}
		this.page++

		if(data.length <= this.limit) {
			this.complete = true
		}
		return data.map(x => new ShoppingList(x).getPostable() as ShoppingList)
	}

	async createShoppingList(list: ShoppingList, user: User) {
		user = new User({...user})

		const doc =
			await window.db.collection(this.shoppingListCollection)
				.doc(user.getAccessUser())
				.collection('shoppingLists')
				.doc(list.id)


		this.patchCreatedAt(list)
		const data = new ShoppingList(list).onScheme().getPostable()
		await doc.set(data)
		const res = await doc.get()
		return res.data()

	}

	async deleteShoppingLists(ids: IDeleteId[], userId: string) {
		ids.map(async x => {
			await window.db.collection(this.shoppingListCollection)
				.doc(userId)
				.collection('shoppingLists')
				.doc(x.id)
				.delete()
		})
	}

	async deleteShoppingList(list: ShoppingList, userId: string) {
		await window.db.collection(this.shoppingListCollection)
			.doc(userId)
			.collection('shoppingLists')
			.doc(list.id)
			.delete()
	}

	async attachShoppingListsToItems(ids: string[], userId: string, lists: ShoppingList[]) {
		await window.db.collection(this.itemCollection)
			.doc(userId)
			.collection('items')
			.where('id', 'in', ids)
			.get()
			.then(snap => {
				snap.forEach(doc => {
					const data = doc.data()
					const list = lists.find(x => x.id == data.id)
					if(list) {
						doc.ref.set({quantity: list.quantity + data.quantity}, {merge: true})
					}
				})
			})
	}

	patchUpdateUserDate(item: Item, user: User) {
		item.updateUserName = user.name
		item.updateUserId = user.id
		item.updateUserDate = moment().format('YYYY-MM-DD H:mm:ss')
		return item
	}

	patchCreatedAt<T extends IModel>(model: T): T {
		model.createdAt = moment().format('YYYY-MM-DD H:mm:ss')
		return model
	}

	patchUpdatedAt<T extends IModel>(model: T): T {
		model.updatedAt = moment().format('YYYY-MM-DD H:mm:ss')
		return model
	}

	patchDeletedAt<T extends IModel>(model: T): T {
		model.deletedAt = moment().format('YYYY-MM-DD H:mm:ss')
		return model
	}

	isURL(string: string) {
		const bool = string.search(/(http|https)/)

		return bool != -1
	}

}

export default new FirestoreService()

const FirestoreServiceInstance = FirestoreService
export {FirestoreServiceInstance}
