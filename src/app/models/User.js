import Sequelize, { Model } from 'sequelize'

class User extends Model {
  static init (sequelize) {
    super.init(
      // Primeiro parâmetro
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN
      },
      {
        // Segundo parâmetro
        sequelize
      }
    )
  }
}
export default User
