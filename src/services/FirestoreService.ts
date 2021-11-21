import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import Pairs from "../models/pairs";
import Ani from "../models/ani";
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
        this.anniversaryCollection = 'anniversaries'
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


    async createAnniversary(code: string, pairs: Pairs) {

        const res:Ani|undefined = pairs.mainAnniversaryData
        if(res==undefined) return

        await window.db.collection(this.pairsCollection)
            .doc(code)
            .collection(this.anniversaryCollection)
            .doc(res.type)
            .set({...res.onScheme().getPostable()}, { merge: true })

    }

    async getAnniversary(code: string) {
        const anis:Ani[] = []
        await window.db
            .collection(this.pairsCollection)
            .doc(code)
            .collection(this.anniversaryCollection)
            .get()
            .then(res => {
                res.forEach(q => {
                    anis.push(new Ani(q.data()))
                })
            })
        return anis
    }

    async deleteAnniversary(code: string, doc: string|undefined) {
        if(!doc) return
        await window.db
            .collection(this.pairsCollection)
            .doc(code)
            .collection(this.anniversaryCollection)
            .doc(doc)
            .delete()

    }

    async getPairs(code: string) {
        let pairs:Pairs|undefined = new Pairs({}).getPostable() as Pairs
        await window.db.collection(this.pairsCollection)
            .doc(code)
            .get()
            .then(res => {
                pairs = undefined
                if(res.exists) {
                    pairs = new Pairs({...res.data()})
                }
            })
            .catch(e => {
                console.log(e)
                pairs = undefined
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
