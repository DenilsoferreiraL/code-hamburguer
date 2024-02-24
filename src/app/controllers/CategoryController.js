import * as Yup from 'yup'
import Category from '../models/Category'

class CategoryController {
	async store(request, response) {
		const schema = Yup.object().shape({
			name: Yup.string().required()
		})

		try {
			await schema.validateSync(request.body, { abortEarly: false })
		} catch (err) {
			return response.status(400).json({ error: err.errors })
		}

		const { name } = request.body

		//Checks the category if it already exists in the database, if it does, it returns an error otherwise, it creates the category and returns its name and ID.
		const categoryExist = await Category.findOne({
			where: {
				name
			}
		})

		if (categoryExist) {
			return response.status(400).json({ error: 'Category already created' })
		}

		const { id } = await Category.create({ name })

		return response.json({ name, id })
	}

	async index(request, response) {
		const category = await Category.findAll()

		return response.json(category)
	}
}
export default new CategoryController()
