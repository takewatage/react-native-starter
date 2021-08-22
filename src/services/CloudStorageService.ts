import 'firebase/storage'
import Reference = firebase.storage.Reference

 class CloudStorageService {
	storage: Reference

    constructor() {
        this.storage = window.firebase.storage().ref()
    }

    async put(path: string,
              file:Blob | Uint8Array | ArrayBuffer ,
              uploadAfter = (url: string) => {},
              stateChange = (val: number) => {}, error = (e: any) => {})
    {
        const task = this.storage.child(path).put(file)

        await task.on('state_changed', async snapshot => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                stateChange(progress)

            },
            (e) => {
            console.log(e)
            error(e)
            },
            async () => {
                await task.snapshot.ref.getDownloadURL().then(url => {
                    uploadAfter(url)
                })
            }
        )
    }
}