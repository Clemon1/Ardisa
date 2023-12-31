import { Request, Response } from "express";
import users from "../model/usersModel";
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/JWT";

// Admin Registration
export const adminRegister = async (req: Request, res: Response) => {
  try {
    if (!req.body.fullname) {
      return res.status(400).json("Fullname cannot be empty");
    }
    if (!req.body.email) {
      return res.status(400).json("Email cannot be empty");
    }
    if (!req.body.password) {
      return res.status(400).json("Password cannot be empty");
    }
    // checking for existing admin
    const existingAdmin = await users.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(401).json("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new users({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashPassword,
      role: "admin",
    });

    const newAdmin = await newUser.save();
    console.log(newUser);

    const token = generateToken({ user: newAdmin.id, role: newAdmin.role });
    const { password, ...other } = newAdmin.toObject();

    res.status(200).json({ other, token });
  } catch (err: any) {
    console.log(err.message);

    res.status(500).json(err.message);
  }
};

// Admin Login
export const adminLogin = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json("Email or Password must not be empty");
    }
    const checkUser = await users.findOne({ email: req.body.email }); // checking for existing user
    if (!checkUser) {
      return res
        .status(401)
        .json("This user does not have an account, please register");
    }
    if (checkUser.role !== "admin") {
      // Checking if its an admin trying to login
      return res.status(401).json("You are not authorized to login here");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json("Invalid Password");
    }

    const { password, ...other } = checkUser.toObject();
    const token = generateToken({ user: checkUser.id, role: checkUser.role });
    console.log("logged in", other);

    res.status(200).json({ other, token });
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
// CLIENT Registration
export const clientRegister = async (req: Request, res: Response) => {
  try {
    const { fullname, email } = req.body;
    // checking if the user is already registered
    const existingAdmin = await users.findOne({ email });
    if (existingAdmin) return res.status(401).json("User already exist");
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new users({
      fullname,
      email,
      hashPassword,
    });

    const newUser = await user.save();
    const token = generateToken({ user: newUser.id, role: newUser.role });
    const { password, ...other } = newUser.toObject();

    res.status(200).json(other);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};

//Client Login
export const clientLogin = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json("Email or Password must not be empty");
    }
    // checking for existing user
    const checkUser = await users.findOne({ email: req.body.email });
    if (!checkUser) {
      return res
        .status(401)
        .json("This user does not have an account, please register");
    }
    if (checkUser.role !== "admin" || "guest") {
      // Checking if its an admin trying to login
      return res.status(401).json("You are not authorized to login here");
    }
    const checkPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password,
    );
    if (!checkPassword) {
      return res.status(401).json("Invalid Password");
    }
    const { password, ...info } = checkUser;
    const token = generateToken({
      user: checkUser.id,
      role: checkUser.role,
    });
    res.status(200).json(info);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
};
