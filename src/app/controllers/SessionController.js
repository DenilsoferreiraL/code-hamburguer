import * as Yup from 'yup'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth'

class SessionController {
	async store(request, response) {
		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			password: Yup.string().required()
		})

		const incorrectUserEmailOrPassword = () => {
			return response
				.status(400)
				.json({ error: 'User not found or password incorrect' })
		}

		const { email, password } = request.body

		if (!(await schema.isValid(request.body))) incorrectUserEmailOrPassword()

		const user = await User.findOne({
			where: { email }
		})

		if (!user || !(await user.checkPassword(password)))
			incorrectUserEmailOrPassword()

		return response.json({
			id: user.id,
			email,
			name: user.name,
			admin: user.admin,
			token: jwt.sign({ id: user.id }, authConfig.secret, {
				expiresIn: authConfig.expireIn
			})
		})
	}
}

export default new SessionController()
