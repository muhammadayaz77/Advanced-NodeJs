import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import userService from "./user.service";
import bcrypt from "bcrypt";

// Token expiry times
const ACCESS_TOKEN_EXPIRY = "15m"; // short-lived
const REFRESH_TOKEN_EXPIRY = "7d"; // long-lived

// Helpers to generate tokens
const generateAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
};

// ============================ REGISTER ============================
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const findUser = await userService.readOnlyUser(email);
    if (findUser) {
      return res.status(400).json({
        message: "User Already Exist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userService.createUser({ name, email, hashedPassword });

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    // store BOTH tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 mins
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

// ============================ LOGIN ============================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const findUser = await userService.readOnlyUser(email);
    if (!findUser) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials", success: false });
    }

    const accessToken = generateAccessToken(findUser.id);
    const refreshToken = generateRefreshToken(findUser.id);

    // store BOTH tokens in cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "User login successful", success: true });
  } catch (err: any) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

// ============================ REFRESH TOKEN ============================
export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token provided" });

    jwt.verify(token, process.env.JWT_REFRESH_SECRET as string, (err: any, decoded: any) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const newAccessToken = generateAccessToken(decoded.id);

      // set new access token cookie
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });

      return res.json({ message: "Access token refreshed", success: true });
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

// ============================ LOGOUT ============================
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ message: "Logged out successfully", success: true });
  } catch (err: any) {
    return res.status(500).json({ message: err.message, success: false });
  }
};


export const AuthUser = async (req:Request,res:Response) => {
  try{
    console.log('auth : ',(req as any).userId)
    const allUser = await userService.readAllUser();
    return res.status(200).json({
      data : allUser,
      success : true
    })
  }
  catch(err : any){
    return res.status(500).json({
      message : err.message,
      success : false
    })
  }
}