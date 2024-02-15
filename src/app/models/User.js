import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcrypt'
class User extends Model {
	static init(sequelize) {
		super.init(
			// Primeiro parâmetro
			{
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.VIRTUAL,
				password_hash: Sequelize.STRING,
				admin: Sequelize.BOOLEAN
			},
			{
				// Segundo parâmetro
				sequelize
			}
		)
		this.addHook('beforeSave', async user => {
			if (user.password) {
				user.password_hash = await bcrypt.hash(user.password, 10)
			}
		})
		return this
	}
}
export default User
