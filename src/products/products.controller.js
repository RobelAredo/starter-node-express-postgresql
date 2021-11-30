const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

function read(req, res, next) {
  const data = res.locals.product;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

async function outOfStockCount(req, res, next) {
  const data = await productsService.outOfStockCount();
  res.json({ data });
}

async function priceSummary(req, res, next) {
  const data = await productsService.priceSummary();
  res.json({ data });
}

async function totalWeightByProduct(req, res, next) {
  const data = await productsService.totalWeightByProduct();
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  outOfStockCount: asyncErrorBoundary(outOfStockCount),
  priceSummary: asyncErrorBoundary(priceSummary),
  totalWeightByProduct: asyncErrorBoundary(totalWeightByProduct),
};
