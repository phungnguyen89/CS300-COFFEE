const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Product = require("./model").Product;
const chalk = require("chalk");

module.exports.update = async (o) => {
  console.log(chalk.red("model "), o);
  try {
    let ret = await Product.findById(o._id);
    console.log(chalk.red("model"), ret);
    return ret;
  } catch (err) {
    console.log(chalk.red(err));
    throw new Error(err);
  }
};

module.exports.deleteById = async (id) => {
  try {
    let ret = await Product.findByIdAndRemove(id);
    console.log(chalk.blue("model delte"), ret);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getById = async (id) => {
  try {
    let ret = await Product.findById(id);
    return ret;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.create = async (o) => {
  try {
    let newProduct = await new Product(o).save();
    console.log("Product model", newProduct);

    return newProduct;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports.getAll = async () => {
  try {
    let a = await Product.find().sort({ createdAt: -1 });

    return a;
  } catch (err) {
    throw new Error(err);
  }
};
