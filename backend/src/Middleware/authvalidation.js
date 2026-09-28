import Joi from "joi";

// 🔁 reusable password rule
const passwordRule = Joi.string()
  .min(8)
  .max(100)
  .pattern(/[A-Z]/)   // uppercase
  .pattern(/[a-z]/)   // lowercase
  .pattern(/[0-9]/)   // number
  .pattern(/[@$!%*?&]/) // special
  .required()
  .messages({
    "string.pattern.base":
      "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
  });

// ✅ signup validation
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().required(),
    password: passwordRule
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error.details[0].message
    });
  }

  next();
};

// ✅ login validation
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: passwordRule
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error.details[0].message
    });
  }

  next();
};

export { signupValidation, loginValidation };