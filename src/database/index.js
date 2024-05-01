import Sequelize from 'sequelize'
import configDataBase from '../config/database'
import User from '../app/models/User'
import Product from '../app/models/Product'
import Category from '../app/models/Category'
import mongoose from 'mongoose'

const models = [User, Product, Category]
class Database {
	constructor() {
		this.init()
		this.mongo()
	}

	init() {
		this.connection = new Sequelize('postgresql://postgres:bynqQRqojjMLVDiHMKFgXItIBwxpQxee@monorail.proxy.rlwy.net:59838/railway')
		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models))
	}
	mongo() {
		this.mongoConnection = mongoose.connect(
			'mongodb://mongo:vFIiIylsMWnOkMorJogBbGWXlNOhmYnL@monorail.proxy.rlwy.net:13473'
		)
	}
}

export default new Database()
