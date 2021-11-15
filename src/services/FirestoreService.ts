import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
// import C from 'expo-constants'



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
    anniversaryCollection = ''
    pairsCollection = ''

    constructor() {
        this.anniversaryCollection = 'anniversary'
        this.pairsCollection = 'pairs'
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



    async getAnniversary() {
        await window.db.collection(this.anniversaryCollection)
            .get()
            .then(res => {
                res.forEach(q => {
                    console.log(q.data())
                })
            })
    }

    async checkPairCode(code: string) {
        let pairs = false
        await window.db.collection(this.pairsCollection)
            .doc(code)
            .get()
            .then(res => {
                if(res.exists) {
                    console.log(res.data())
                    pairs = true
                }
            })
            .catch(e => {
                console.log(e)
                pairs = false
            })

        return pairs
    }


}
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

export default new FirestoreService()

const FirestoreServiceInstance = FirestoreService
export {FirestoreServiceInstance}
