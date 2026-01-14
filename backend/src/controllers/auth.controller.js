const { ZodError } = require('zod');
const { signupSchema } = require('../validations/auth.validation');
const { createUser } = require('../services/auth.service');

const signupHandler = async (req, res) => {
  try {
    const parsedData = signupSchema.parse(req.body);
    const user = await createUser(parsedData);
    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: err.issues[0].message,
      });
    }

    if (err.statusCode) {
      return res.status(err.statusCode).json({
        error: err.message,
      });
    }

    console.error(err); 
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

module.exports = {
  signupHandler,
};  