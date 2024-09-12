import { body, param } from 'express-validator'

export const idValidation = param('id').isInt().withMessage('ID not valid')

export const productValidation = [
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
]
