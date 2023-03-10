const db = require("../models");

// image Upload
const multer = require("multer");
const path = require("path");

// create main Model
const Product = db.products;
const Review = db.reviews;

// main work

// 1. create product

const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    colour: req.body.colour,
    typeOfShoe: req.body.typeOfShoe,
    designTemplates: req.body.designTemplates,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

// 2. get all products

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({});
  res.status(200).send(products);
};

// 3. get single product

const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });
  res.status(200).send(product);
};

// 4. update Product

const updateProduct = async (req, res) => {
  let id = req.params.id;

  const product = await Product.update(req.body, { where: { id: id } });

  res.status(200).send(product);
};

// 5. delete product by id

const deleteProduct = async (req, res) => {
  let id = req.params.id;

  await Product.destroy({ where: { id: id } });

  res.status(200).send("Product is deleted !");
};

// 6. get product by colour

const productsByColour = async (req, res) => {
  reqColour = req.params.colour;
  let products = await Product.findAll({ where: { colour: reqColour } });
  res.status(200).send(products);
};
const productsByTypeOfShoe = async (req, res) => {
  reqTypeOfShoe = req.params.typeOfShoe;
  let products = await Product.findAll({
    where: { typeOfShoe: reqTypeOfShoe },
  });
  res.status(200).send(products);
};

const productsByPrice = async (req, res) => {
  priceRange = req.params.range;
  console.log(priceRange);
  if (priceRange == 1) {
    let products = await Product.findAll({
      where: { price: { $between: [1500, 4000] } },
    });
    res.status(200).send(products);
  } else if (priceRange == 2) {
    let products = await Product.findAll({
      where: { price: { $between: [4000, 7000] } },
    });
    res.status(200).send(products);
  } else if (priceRange == 3) {
    let products = await Product.findAll({
      where: { price: { $gte: 7000 } },
    });
    res.status(200).send(products);
  } else {
    res.status(404).send("Enter correct range");
  }
};

// 7. connect one to many relation Product and Reviews

const getProductReviews = async (req, res) => {
  const id = req.params.id;

  const data = await Product.findOne({
    include: [
      {
        model: Review,
        as: "review",
      },
    ],
    where: { id: id },
  });

  res.status(200).send(data);
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  productsByColour,
  productsByTypeOfShoe,
  // productsByPrice,
};
