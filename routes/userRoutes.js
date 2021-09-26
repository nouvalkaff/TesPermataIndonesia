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

router.get("/user/all", roleUser, getAllUsers);

router.get("/user/:id", roleUser, getUser);

router.put("/user/upd/:id", roleUser, updateUser);

router.delete("/user/del/:id", roleUser, deleteUser);
module.exports = router;
