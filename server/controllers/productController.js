const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Product = require("../models/productModel");

const createProduct = [
  // validate request
  body("name")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Please enter product name"),
  body("sku")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Please enter product sku"),
  body("category")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Please enter product category"),
  body("quantity")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Please enter product quantity"),
  body("price")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Please enter product price"),
  body("description")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Please enter product description"),
  asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;
    // extract the validation errors from a request
    const errors = validationResult(req);
    // there are errors
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }

    // manage image upload

    // creat product
    const product = await Product.create({
      user: req.user.id,
      name,
      sku,
      category,
      quantity,
      price,
      description,
    });
    res.status(201).json(product);
  }),
];

module.exports = {
  createProduct,
};
