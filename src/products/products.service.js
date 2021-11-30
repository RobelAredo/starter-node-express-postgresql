const knex = require("../db/connection");

function list() {
  return knex("products").select("*");
};

function read(product_id) {
  return knex("products")
    .select("*")
    .where({ product_id })
    .first();
}

function outOfStockCount() {
  return knex("products")
    .count("*")
    .where({ product_quantity_in_stock: 0 })
    .first();
}

function priceSummary() {
  return knex("products")
    .select("supplier_id")
    .avg("product_price")
    .min("product_price")
    .max("product_price")
    .groupBy("supplier_id");
}

function totalWeightByProduct() {
  return knex("products")
    .select("product_title")
    .sum({ total_weight_in_lbs: knex.raw('(?? * ??)', ['product_quantity_in_stock', 'product_weight_in_lbs'])})
    .groupBy("product_title");
}

module.exports = {
  list,
  read,
  outOfStockCount,
  priceSummary,
  totalWeightByProduct,
};