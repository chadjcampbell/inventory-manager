const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Product = require("../models/productModel");
const { filesize } = require("filesize");
const cloudinary = require("cloudinary").v2;

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
      // save to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "inStock",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error(error.message);
      }

      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: filesize(req.file.size),
      };
    }

    // create product
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

// get all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(products);
});

// get single product
const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(404);
    throw new Error("Product not found");
  }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    if (product.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    // remove image from cloudinary
    const imagePath = product.image.filePath;
    const imageId = cloudinary.url(imagePath).split("/").pop();
    await cloudinary.uploader.destroy(imageId);

    // then remove from mongodb
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
};
