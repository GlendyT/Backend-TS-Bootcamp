import express, { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from './handlers/products'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router: Router = express.Router()

//TODO: ROUTING
//todo: GET
router.get('/', getProducts)
router.get(
  '/:id',
  param('id').isInt().withMessage('ID not valid'),
  handleInputErrors,
  getProductById,
)

//todo: POST
router.post(
  '/',
  //Validacion
  body('title').notEmpty().withMessage('Title is Required'),
  body('artist').notEmpty().withMessage('Name artist is required'),
  body('image').notEmpty().withMessage('Image vinyl is required'),
  body('categoryId')
    .isNumeric()
    .withMessage('Value not valid')
    .notEmpty()
    .withMessage('Category vinyl is required')
    .custom((value) => value > 0)
    .withMessage('Category Not valid'),
  body('conditionId')
    .isNumeric()
    .withMessage('Value not valid')
    .notEmpty()
    .withMessage('Category vinyl is required')
    .custom((value) => value > 0)
    .withMessage('Category Not valid'),
  handleInputErrors,
  createProduct,
)

//todo: PUT
router.put(
  '/:id',
  param('id').isInt().withMessage('ID not valid'),
  body('title').notEmpty().withMessage('Title is Required'),
  body('artist').notEmpty().withMessage('Name artist is required'),
  body('image').notEmpty().withMessage('Image vinyl is required'),
  body('categoryId')
    .isNumeric()
    .withMessage('Value not valid')
    .notEmpty()
    .withMessage('Category vinyl is required')
    .custom((value) => value > 0)
    .withMessage('Category Not valid'),
  body('conditionId')
    .isNumeric()
    .withMessage('Value not valid')
    .notEmpty()
    .withMessage('Category vinyl is required')
    .custom((value) => value > 0)
    .withMessage('Category Not valid'),
  handleInputErrors,
  updateProduct,
)

//todo: DELETE
router.delete('/:id',
  param('id').isInt().withMessage('ID not valid'),
  handleInputErrors,
  deleteProduct
)

export default router
