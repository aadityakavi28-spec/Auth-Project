import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const { username, email, password } = req.body;

    const normalizedEmail = email.toLowerCase();

    const userIsExist = await userModel.findOne({
      $or: [{ username }, { email: normalizedEmail }]
    });

    if (userIsExist) {
      return res.status(409).json({
        message: "User already exists",
        success: false
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email: normalizedEmail,
      password: hash
    });

    return res.status(201).json({
      message: "Signup successful",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  }catch (error) {
  console.error(" ERROR:", error.message);
  console.error(error.stack);

  return res.status(500).json({
    message: error.message,   //  show real error TEMPORARILY
    success: false
  });
}
};

const login = async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await userModel.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export default { signup , login };