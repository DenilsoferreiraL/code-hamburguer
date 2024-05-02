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
		this.connection = new Sequelize('postgresql://postgres:tkILuaCXjhpBiufnCXkukjFfBTyNNPWH@monorail.proxy.rlwy.net:39701/railway')
		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models))
	}
	mongo() {
		this.mongoConnection = mongoose.connect(
			'mongodb://mongo:XMDKdhjWbVmXVjspMoxErIPmhvYRrnJz@roundhouse.proxy.rlwy.net:41243'
		)
	}
}

export default new Database()
