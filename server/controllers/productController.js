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
        public_id: uploadedFile.public_id,
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
    if (product.image.public_id) {
      const imgId = product.image.public_id;
      await cloudinary.uploader.destroy(imgId);
    }

    // then remove from mongodb
    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(400);
    throw new Error("Error, product deletion failed");
  }
});

// update product

const updateProduct = [
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
    const { id } = req.params;
    let product;
    try {
      product = await Product.findById(id);
      if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
      if (product.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
      }
    } catch (error) {
      res.status(404);
      throw new Error("Product not found");
    }

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
        //if there is an old image delete it first
        if (product.image.public_id) {
          const imgId = product.image.public_id;
          await cloudinary.uploader.destroy(imgId);
        }
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "inStock",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error(error.message);
      }

      fileData = {
        public_id: uploadedFile.public_id,
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: filesize(req.file.size),
      };
    }

    // update product
    const updatedProduct = await Product.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        name,
        category,
        quantity,
        price,
        description,
        image: req.file ? fileData : product.image,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json(updatedProduct);
  }),
];

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
