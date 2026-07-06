import { Request, Response } from "express";
import { constructAuthUrl } from "../services/authService";

const login = async (req: Request, res: Response): Promise<void> => {
  const authUrl = constructAuthUrl();
  res.redirect(authUrl);
};

export default login;
