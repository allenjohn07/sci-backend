import { Request, Response } from "express";
import { fetchUserData } from "../services/authService";
import appConfig from "../config/appConfig";

const callback = async (req: Request, res: Response): Promise<void> => {
  const code = req.query.code;
  if (typeof code !== "string") {
    res.redirect(
      `${appConfig.frontendUrl}/login?error=invalid_authorization_code`
    );
    return;
  }
  try {
    const user = await fetchUserData(code);
    if (process.env.NODE_ENV !== "production") {
      console.log(user);
    }
    res.redirect(`${appConfig.frontendUrl}`);
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    res.redirect(`${appConfig.frontendUrl}/login?error=${error}`);
  }
};

export default callback;
