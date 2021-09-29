const express = require("express");

const router = express.Router();
const {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user_controller");

const { roleUser, tokenLoginUser } = require("../middleware/authentication");

router.post("/user/login", tokenLoginUser);

router.post("/user/crt", createUser);

router.get("/user/all", getAllUsers);

router.get("/user/:id", getUser);

router.put("/user/upd/:id", updateUser);

router.delete("/user/del/:id", deleteUser);
module.exports = router;
