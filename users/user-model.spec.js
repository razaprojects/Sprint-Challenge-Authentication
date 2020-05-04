const db = require("../database/dbConfig.js");
const UserTbl = require("./user-model.js");
const should = require("should");

describe("User Model", () => {
  describe("INSERT ", () => {
    it("should insert users in the database", async () => {
      const user = {
        username: "raza2",
        password: "pass123",
      };
      await UserTbl.add(user);
      const addedUser = await db("users");
      expect(addedUser).toHaveLength(1);
    });
  });

  describe("GET ", () => {
    it("should get users from table", async () => {
      const users = await UserTbl.getAll();
      console.log("users: ", users);
      expect(users.body).should.be.instanceof(Object);
    });
  });
});

beforeAll(async () => {
  await db("users").truncate();
});
