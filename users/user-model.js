const db = require("../database/dbConfig.js");

module.exports = {
  add,
  getAll,
  getById,
  findBy,
};

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return getById(id);
}

function getById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

function getAll() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter).first();
}
