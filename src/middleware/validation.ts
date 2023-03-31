import Joi from 'joi';
//validations
export const registerValidation = (data: string) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(10)
      .required()

  })
  return schema.validate(data);
}

//login validations

export const loginValidation = (data: string) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(10)
      .required()
  })
  return schema.validate(data);
}



module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;