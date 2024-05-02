import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProductController from './app/controllers/ProductController'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

const uploads = multer(multerConfig)

const routes = new Router()

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello to my first API' })
})

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.post('/products', uploads.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', uploads.single('file'), ProductController.update)

routes.post('/categories', uploads.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', uploads.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.put('/orders/:id', OrderController.update)
routes.get('/orders', OrderController.index)

export default routes
