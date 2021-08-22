import {Model, ArrayMappable} from '@team-decorate/alcts'
import * as Localization from 'expo-localization'


export default class User extends Model {

	id: string = ''
	email: string = ''
	name: string = ''
	password: string = ''
	deviceId: string = ''
	updatedAt: string = ''
	deletedAt: string = ''
	lang: string = Localization.locale


	constructor(data: object) {
		super()

		this.convert = false

		this.fillable = [
			'id', 'email', 'name', 'deviceId', 'createdAt', 'updatedAt', 'deletedAt', 'lang'
		]
		this.presents = []

		this.data = data
	}


	beforePostable() {
	}

	afterPostable() {

	}
}