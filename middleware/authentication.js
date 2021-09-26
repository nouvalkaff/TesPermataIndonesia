const jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const { User } = require("../models");
routes = {};

routes.roleUser = async (req, res, next) => {
  try {
    const authHead = req.headers.authorization;

    if (authHead === "") {
      return res.status(403).json({
        code: 404,
        statusText: "Forbidden",
        success: false,
        message: "No access, login first!",
      });
    }

    const userToken = authHead.split(" ")[1] || authHead;

    jwt.verify(userToken, process.env.TOKEN_KEY, {
      algorithms: ["HS256", "RS256"],
    });

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Failed to get data",
    });
  }
};

routes.tokenLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        code: 404,
        statustext: "Not Found",
        success: false,
        message: "Email is not exist, please try again.",
      });
    }

    if (user) {
      const verifyPassword = await bcrypt.compare(
        password,
        user.dataValues.password
      );

      if (!verifyPassword) {
        return res.status(401).json({
          code: 401,
          statusText: "Unauthorized",
          success: false,
          message: "Wrong password, please try again.",
        });
      }

      const token = jwt.sign(
        {
          user_id: user.dataValues.id,
          role: "user",
          username: user.dataValues.username,
          email: user.dataValues.email,
        },
        process.env.TOKEN_KEY,
        { expiresIn: "30m" }
      );

      return res.status(201).json({
        statusCode: 200,
        statusText: "OK",
        success: true,
        message: "Login Success!",
        data: {
          token_user: token,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      statustext: "Internal Server Error",
      success: false,
      message: "Failed to get data",
    });
  }
};

module.exports = routes;
