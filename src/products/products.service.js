const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
  category_id: "category.category_id",
  category_name: "category.category_name",
  category_description: "category.category_description",
});

function list() {
  return knex("products").select("*");
};

function read(product_id) {
  return knex("products as p")
    .select("p.*", "c.*")
    .join("products_categories as pc", "p.product_id", "pc.product_id")
    .join("categories as c", "c.category_id", "pc.category_id")
    .where({ "p.product_id": product_id })
    .first()
    .then(addCategory);
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