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

	title: string = ''
	date: string = ''
	subTitle: string = ''
	type: string = ''

	scheme: boolean = false

	constructor(data: object) {
		super()

		this.convert = false
		this.fillable = [
			'type', 'title', 'date', 'subTitle'
		]
		this.presents = []

		this.data = data
	}

	onScheme() {
		this.scheme = true
		return this
	}

	beforePostable() {
	}

	afterPostable() {

	}

	//今日までのカウント
	countUntilToday = () => {

		const today = dayjs()
		const aniDay = dayjs(this.date)
		if(today.format('YYYY-MM-DD') == aniDay.format('YYYY-MM-DD')) {
			return '1日目！'
		}

		dayjs.extend(utc)
		dayjs.extend(duration)
		const Y = today.diff(aniDay, 'years')
		const M = today.subtract(Y, 'y').diff(aniDay, 'months')
		const D = today.add(1,'d').subtract(Y, 'y').subtract(M, 'M').diff(aniDay, 'days')




		return Y + '年' + M + 'ヶ月' + D + '日'
	}
}