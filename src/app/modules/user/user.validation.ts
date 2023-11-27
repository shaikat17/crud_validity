import Joi from 'joi';

// Define Joi schema for FullName
const FullNameJoiSchema = Joi.object({
  firstName: Joi.string().required().max(20),
  lastName: Joi.string().required(),
});

// Define Joi schema for Address
const AddressJoiSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
});

// Define Joi schema for ProductDetails
const ProductDetailsJoiSchema = Joi.object({
  productName: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});

// Define Joi schema for User
const UserJoiSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullName: FullNameJoiSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().required(),
  isActive: Joi.boolean().required(),
  hobbies: Joi.array().items(Joi.string()).required(),
  address: AddressJoiSchema.required(),
  orders: Joi.array().items(ProductDetailsJoiSchema),
});

export { UserJoiSchema,ProductDetailsJoiSchema };
