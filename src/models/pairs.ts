import {Model, ArrayMappable} from '@team-decorate/alcts'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/ja';
import Ani from "./ani";
import linq from 'linq'

dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.locale('ja');


export default class Pairs extends Model {

	id: string = ''
	user1Name: string = ''
	user2Name: string = ''
	user1Img: string = ''
	user2Img: string = ''

	anniversaries:Ani[] = []
	scheme: boolean = false

	constructor(data: object) {
		super()

		this.convert = false

		this.fillable = [
			'id', 'user1Name', 'user2Name', 'user1Img', 'user2Img', 'anniversaries'
		]
		this.presents = []

		this.arrayMap(
			new ArrayMappable(Ani).bind('anniversaries')
		)

		this.data = data
	}

	//記念日データ取得
	get mainAnniversaryData() {
		if(this.anniversaries.length) {
			const res =  linq.from(this.anniversaries).where(x => x.type == "anniversary").toArray()
			console.log("res",res)
			if(res.length) {
				return res[0]
			}
		}
		return undefined
	}
	//記念日タイトル
	get mainAnniversaryDataTitle() {
		const res = this.mainAnniversaryData
		if(res){
			return res.title
		}
		return ''
	}

	//今日までのカウント
	countUntilToday = () => {
		const d:Ani|undefined = this.mainAnniversaryData
		if(d==undefined) return

		const today = dayjs()
		const aniDay = dayjs(d.date)
		if(today.format('YYYY-MM-DD') == aniDay.format('YYYY-MM-DD')) {
			return '1日目！'
		}

		dayjs.extend(utc)
		dayjs.extend(duration)
		const Y = today.diff(aniDay, 'years')
		const M = today.subtract(Y, 'y').diff(aniDay, 'months')
		const D = today.add(1,'d').subtract(Y, 'y').subtract(M, 'M').diff(aniDay, 'days')


		return (Y > 0?Y+'年':'') + (M >0?(M + 'ヶ月'):'') + D + '日目'
	}

	onScheme() {
		this.scheme = true
		return this
	}

	beforePostable() {
	}

	afterPostable() {

	}
}