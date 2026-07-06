import axios from "axios";
import appConfig from "../config/appConfig";

export const constructAuthUrl = () => {
  const authUrl = new URL(`${appConfig.wcaUrl}/oauth/authorize`);

  authUrl.searchParams.append("client_id", appConfig.wcaClientId);
  authUrl.searchParams.append(
    "redirect_uri",
    `${appConfig.baseUrl}/api/auth/callback`
  );
  authUrl.searchParams.append("response_type", "code");

  return authUrl.toString();
};

const constructTokenParams = (authCode: string) => {
  const tokenParams = new URLSearchParams();
  tokenParams.append("grant_type", "authorization_code");
  tokenParams.append("code", authCode);
  tokenParams.append(
    "redirect_uri",
    `${appConfig.baseUrl}/api/auth/callback`
  );
  tokenParams.append("client_id", appConfig.wcaClientId);
  return tokenParams;
};

export async function fetchUserData(authCode: string) {
  if (!authCode) {
    throw new Error("Missing authorization code");
  }

  const tokenUrl = new URL(`${appConfig.wcaUrl}/oauth/token`);
  const tokenParams = constructTokenParams(authCode);
  const basicAuthToken = Buffer.from(
    `${appConfig.wcaClientId}:${appConfig.wcaClientSecret}`
  ).toString("base64");
  const tokenResponse = await axios.post(
    tokenUrl.toString(),
    tokenParams.toString(),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuthToken}`,
      },
    }
  );

  const { access_token } = tokenResponse.data;

  const userUrl = new URL(`${appConfig.wcaUrl}/api/v0/me`);
  const userResponse = await axios.get(userUrl.toString(), {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  return userResponse.data;
}
