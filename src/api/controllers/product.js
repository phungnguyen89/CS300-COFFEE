const product = require("../../models/product");
const helper = require("../../helper");
const chalk = require("chalk");
module.exports.PAGE = async (req, res) => {
  res.send(req.params.p);
};

module.exports.DELETE = async (req, res) => {
  if (req.params.id) {
    try {
      let ret = await product.deleteById(req.params.id);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(400).json(helper.stt400());
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.PUT = async (req, res) => {
  if (res.locals.data) {
    try {
      let ret = await product.update(req.body);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500());
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.POST = async (req, res) => {
  if (res.locals.data) {
    console.log(chalk.blue("we got product controller"));
    try {
      let ret = await product.create(res.locals.data);
      if (ret) return res.status(200).json(helper.stt200(ret));
    } catch (err) {
      return res.status(500).json(helper.stt500(err));
    }
  }
  return res.status(400).json(helper.stt400());
};

module.exports.GET = async (req, res) => {
  try {
    let ret = req.params.id
      ? await product.getById(req.params.id)
      : await product.getAll();
    if (ret) return res.status(200).json(helper.stt200(ret));
  } catch (err) {
    return res.status(500).json(helper.stt500());
  }
  return res.status(400).json(helper.stt400());
};
