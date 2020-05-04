const router = require("express").Router();
const bcrypt = require("bcryptjs");

const UserTbl = require("../users/user-model.js");
const generateToken = require("./generateToken.js");

router.post("/register", (req, res) => {
  // implement registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  UserTbl.add(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "exception error adding user", error: err });
    });
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;
  UserTbl.findBy({ username })
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}`,
          token: token,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
