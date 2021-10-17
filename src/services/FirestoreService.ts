// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'
// import 'firebase/storage'
// import C from 'expo-constants'
// import User from 'src/models/user'
// import {IModel} from 'src/interfaces/IModel'
//
// export enum ItemSortType {
// 	DEFAULT = 0,
// 	BEST_BEFORE = 1,
// 	QUANTITY_ASC = 2,
// 	QUANTITY_DESC = 3
// }
//
// class FirestoreService {
// 	key = ''
// 	domain = ''
// 	projectId = ''
// 	bucket = ''
// 	collection = ''
// 	startAfter?: any
// 	page = 1
// 	private complete = false
// 	limit = 15
// 	query?: firebase.firestore.Query
// 	userCollection = ''
// 	itemCollection = ''
// 	tabCollection = ''
// 	shoppingListCollection = ''
//
//     constructor() {
// 		this.userCollection = C.manifest.extra.firebase.userCollection
// 		this.itemCollection = C.manifest.extra.firebase.itemCollection
// 		this.tabCollection = C.manifest.extra.firebase.tabCollection
// 		this.shoppingListCollection = C.manifest.extra.firebase.shoppingListCollection
//
// 	}
//
//     create(key: string, domain: string, projectId: string, bucket: string) {
//         this.key = key
//         this.domain = domain
//         this.projectId = projectId
//
//         if(window.firebase === undefined) {
//             window.firebase = firebase
//             window.firebase.initializeApp({
//                 apiKey: key,
//                 authDomain: domain,
//                 projectId: projectId,
//                 storageBucket: bucket,
//             })
//
//             window.db = window.firebase.firestore()
//         }
//         return this
//     }
//
//     setCollection(collection: string) {
//         this.collection = collection
//         return this
//     }
//
//     setLimit(num: number) {
//         this.limit = num
//         return this
//     }
//
//     setQuery(query: firebase.firestore.Query) {
//         this.query = query
//         return this
//     }
//
//
//     get isComplete(): boolean {
//         return this.complete
//     }
//
//     set isComplete(val: boolean) {
// 		this.complete = val
// 	}
//
//     clearPage() {
//         this.complete = false
//         this.page = 1
//     }
//
//     clearQuery() {
// 		this.query = undefined
// 	}
//
//
//
// }
//
// export default new FirestoreService()
//
// const FirestoreServiceInstance = FirestoreService
// export {FirestoreServiceInstance}
