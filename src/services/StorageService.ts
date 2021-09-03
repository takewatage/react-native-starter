import 'dayjs/locale/ja'
import dayjs from "dayjs"
import Storage from 'react-native-storage';
import {AsyncStorage} from "react-native";

const storage: Storage = new Storage({
    // 最大容量
    size: 1000,
    // バックエンドにAsyncStorageを使う
    storageBackend: AsyncStorage,
    // キャッシュ期限(null=期限なし)
    defaultExpires: null,
    // メモリにキャッシュするかどうか
    enableCache: true,
})


const loadStorage = async (key:string) => {
    try {
        await storage
            .load({key: key})
            .then(data => {
                return data
            })
            .catch(err => {

            })
    } catch(error) {
        console.log('error', error);
    };
}





export { storage, loadStorage };