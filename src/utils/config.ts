interface Config {
  backofficeApiUrl: string;
  orderApiUrl: string;
  googleClientId: string;
  googleClientSecret: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  spaceEndpoint: string;
  orderAppUrl: string;
  imageServerUrl: string;
  apiBaseUrl: string;
  uploadUrl: string;
}

export const config: Config = {
  backofficeApiUrl: process.env.NEXT_PUBLIC_BACKOFFICE_API_URL || "",
  orderApiUrl: process.env.NEXT_PUBLIC_ORDER_API_URL || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  orderAppUrl: process.env.ORDER_APP_URL || "",
  imageServerUrl: process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || "",
   apiBaseUrl: "https://food-man.vercel.app/api",
  // apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  uploadUrl: process.env.NEXT_PUBLIC_UPLOAD_URL || "",
};
