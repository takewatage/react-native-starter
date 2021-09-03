import {Model, ArrayMappable} from '@team-decorate/alcts'


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
}