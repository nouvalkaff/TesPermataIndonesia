const joi = require("joi");
exports.crtUser = joi.object({
  first_name: joi.string().min(3).max(20).required(),
  last_name: joi.string().min(3).max(20).optional(),
  username: joi.string().alphanum().min(5).max(10).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(30)
    .required(),
  repeat_password: joi.ref("password"),
  no_phone: joi
    .string()
    .min(5)
    .message({
      "string.min": `"no_phone" should have a minimum length of 5 digit`,
    })
    .max(14)
    .message({
      "string.max": `"no_phone" should have a maximum length of 14 digit`,
    })
    .pattern(/^[0-9]+$/)
    .required(),
  birth_place: joi.string().min(3).max(35),
  birth_date: joi.date().max("12-31-2004").required(),
});

exports.updUser = joi.object({
  first_name: joi.string().min(3).max(20).required(),
  last_name: joi.string().min(3).max(20).optional(),
  username: joi.string().alphanum().min(5).max(10).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(30)
    .optional(),
  repeat_password: joi.ref("password"),
  no_phone: joi
    .string()
    .min(5)
    .message({
      "string.min": `"no_phone" should have a minimum length of 5 digit`,
    })
    .max(14)
    .message({
      "string.max": `"no_phone" should have a maximum length of 14 digit`,
    })
    .pattern(/^[0-9]+$/)
    .required(),
  birth_place: joi.string().min(3).max(35),
  birth_date: joi.date().max("12-31-2004").required(),
});

exports.delUser = joi.object({
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(30)
    .required(),
  repeat_password: joi.ref("password"),
});
