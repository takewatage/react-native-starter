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

	onScheme() {
		this.scheme = true
		return this
	}

	beforePostable() {
	}

	afterPostable() {

	}
}