const {
  signupSchema,
  loginSchema,
} = require("../validations/auth.validation");
const {
  createUser,
  loginUser,
} = require("../services/auth.service");

const signup = async (req, res) => {
  try {
    const validatedData = signupSchema.parse(req.body);
    const user = await createUser(validatedData);
    return res.status(201).json(user);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const result = await loginUser(validatedData);
    return res.status(200).json(result);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors[0].message });
    }
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const logout = async (req, res) => {
  return res.status(200).json({
    message: "Logged out successfully",
  });
};


module.exports = {
  signup,
  login,
  logout
};
