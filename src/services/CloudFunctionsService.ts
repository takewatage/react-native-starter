import axios from 'axios'
import C from 'expo-constants'


export const itemCountToUser = async (userId: string) => {
	await axios.post(`${C.manifest.extra.functions.url}/itemCountToUser`, {
		itemCollectionName: C.manifest.extra.firebase.itemCollection,
		userCollectionName: C.manifest.extra.firebase.userCollection,
		userId: userId
	})
}