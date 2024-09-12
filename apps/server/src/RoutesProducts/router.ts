import express, { Router, Request, Response } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../handlers/products'
import { handleInputErrors } from '../middleware'
import { idValidation, productValidation } from '../validation'

const router: Router = express.Router()

//TODO: ROUTING
//todo: GET
router.get('/', (req: Request, res: Response) => getProducts(req, res))
router.get('/:id', idValidation, handleInputErrors, getProductById)

//todo: POST
router.post(
  '/',
  productValidation,
  handleInputErrors,
  (req: Request, res: Response) => createProduct(req, res),
)

//todo: PUT
router.put(
  '/:id',
  idValidation,
  productValidation,
  handleInputErrors,
  (req: Request, res: Response) => updateProduct(req, res),
)

//todo: DELETE
router.delete(
  '/:id',
  handleInputErrors,
  (req: Request, res: Response) => deleteProduct(req, res),
)

export default router
