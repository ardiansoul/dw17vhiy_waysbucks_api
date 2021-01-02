const Joi = require("joi");

const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    price: Joi.number().min(4).required(),
    photo: Joi.string().required(),
  });
  return schema.validate(data);
};

const topingValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    price: Joi.number().min(4).required(),
    photo: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(6).required(),
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(8).required(),
    role: Joi.string().allow("", null).empty(["", null]).default("user"),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(10).required().email(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const transValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string()
      .length(13)
      .pattern(/^[0-9]+$/)
      .required(),
    address: Joi.string().min(6).required(),
    posCode: Joi.number().min(3).required(),
    attachment: Joi.required(),
    status: Joi.string().required(),
    income: Joi.number().min(4).required(),
    products: Joi.array()
      .items(
        Joi.object().required().keys({
          productId: Joi.number().required(),
          amount: Joi.number().required(),
          topings: Joi.array(),
        })
      )
      .required(),
  });
  return schema.validate(data);
};

module.exports = {
  productValidation,
  topingValidation,
  registerValidation,
  loginValidation,
  transValidation,
};
