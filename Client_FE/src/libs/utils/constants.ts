import Cookies from "js-cookie";
import { RootState, useAppSelector } from "../../redux/store";
export const API_BASE_URL = "http://localhost:8080";

export const OAUTH2_REDIRECT_URI = "http://localhost:3080/";

export const GOOGLE_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorization/google?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorization/facebook?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
    API_BASE_URL +
    "/oauth2/authorization/github?redirect_uri=" +
    OAUTH2_REDIRECT_URI;
