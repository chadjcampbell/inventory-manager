const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Product = require("../models/productModel");
const { filesize } = require("filesize");

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

    // handle image upload
    let fileData = {};
    if (req.file) {
      fileData = {
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: filesize(req.file.size),
      };
    }

    // creat product
    const product = await Product.create({
      user: req.user.id,
      name,
      sku,
      category,
      quantity,
      price,
      description,
      image: fileData,
    });
    res.status(201).json(product);
  }),
];

module.exports = {
  createProduct,
};
