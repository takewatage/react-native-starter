import {Model, ArrayMappable} from '@team-decorate/alcts'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/ja';

dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.locale('ja');


export default class Ani extends Model {

	id?: string = ''
	title?: string = ''
	date?: string = ''


	constructor(data: object) {
		super()

		this.convert = false

		this.fillable = [
			'id', 'title', 'date'
		]
		this.presents = []

		this.data = data
	}


	beforePostable() {
	}

	afterPostable() {

	}

	//今日までのカウント
	countUntilToday = () => {

		const today = dayjs()
		const aniDay = dayjs(this.date)
		dayjs.extend(utc)
		dayjs.extend(duration)
		const Y = today.diff(aniDay, 'years')
		const M = today.subtract(Y, 'y').diff(aniDay, 'months')
		const D = today.add(1,'d').subtract(Y, 'y').subtract(M, 'M').diff(aniDay, 'days')


		console.log()





		return Y + '年' + M + 'ヶ月' + D + '日'
	}
}