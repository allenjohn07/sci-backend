import { Request, Response } from "express";
import appConfig from "../config/appConfig";

const login = async (req: Request, res: Response): Promise<void> => {
  const authUrl = new URL(`${appConfig.wcaUrl}/oauth/authorize`);
  authUrl.searchParams.append("client_id", appConfig.wcaClientId);
  authUrl.searchParams.append(
    "redirect_uri",
    `${appConfig.baseUrl}/api/auth/callback`
  );
  authUrl.searchParams.append("response_type", "code");

  res.redirect(authUrl.toString());
};

export default login;
