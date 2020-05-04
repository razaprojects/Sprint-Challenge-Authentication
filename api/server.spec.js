const request = require("supertest");
const should = require("should");
const server = require("./server.js");
const db = require("../database/dbConfig.js");

describe("server", () => {
  it("should set the testing evnironment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET / Server", () => {
    it("should retun status of 200", async () => {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
      expect(res.type).toBe("text/html");
    });
  }); // end of GET

  describe("Authentication", () => {
    const user = {
      username: "raza",
      password: "pass123",
    };
    it("should register an user", async () => {
      const res = await request(server).post("/api/auth/register").send(user);
      expect(res.status).toBe(201);
    });

    it("should login user", async () => {
      const res = await request(server).post("/api/auth/login").send(user);
      expect(res.status).toBe(200);
    });
  });

  describe("GET DAD Joke", () => {
    const user = {
      username: "raza",
      password: "pass123",
    };
    let token = null;
    beforeEach((done) => {
      request(server)
        .post("/api/auth/login")
        .send(user)
        .end(function (err, res) {
          if (err) done(err);
          token = res.body.token;
          done();
        });
    });
    it("should return DAD Jokes as objects of array", (done) => {
      request(server)
        .get("/api/jokes/")
        .set("Authorization", token)
        .expect(200)
        .end(function (err, res) {
          if (err) done(err);
          res.body.should.be.instanceof(Array);
          done();
        });
    });

    it("should return DAD Jokes as objects of array using async", async () => {
      const res = await request(server)
        .get("/api/jokes/")
        .set("Authorization", token);
      expect(res.status).toBe(200);
      expect(res.body).should.be.instanceof(Object);
    });
  }); // end of DAD Jokes
}); // end of DESCRIBE SERVER

beforeAll(async () => {
  await db("users").truncate();
});

// request(server)
// .get("/api/jokes/")
// .set("Authorization", token)
// .expect(200)
// .end(function (err, res) {
//   if (err) done(err);
//   res.body.should.be.instanceof(Array);
//   done();
// });
