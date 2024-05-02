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
		this.connection = new Sequelize('postgresql://postgres:wcleIjvLhtcnpPSJsatrUvkDXcRisznb@monorail.proxy.rlwy.net:53205/railway')
		models
			.map(model => model.init(this.connection))
			.map(model => model.associate && model.associate(this.connection.models))
	}
	mongo() {
		this.mongoConnection = mongoose.connect(
			'mongodb://mongo:AMAerwiKuCBrpbpxMGBqmNJMSeDPfMtU@viaduct.proxy.rlwy.net:11639'
		)
	}
}

export default new Database()
