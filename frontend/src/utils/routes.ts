// routes.ts
const isProduction = process.env.NODE_ENV === 'production';

export const API_BASE_URL = isProduction
  ? 'bionicscholar-backend-c2bye0gxh9a9afgm.germanywestcentral-01.azurewebsites.net'
  : 'http://127.0.0.1:80';

export const ROUTES = {
  UPLOAD: `${API_BASE_URL}/api/upload/`,
  WEBSOCKET: (fileName: string) =>
    `${isProduction ? 'wss' : 'ws'}://${
      isProduction ? 'bionicscholar-backend-c2bye0gxh9a9afgm.germanywestcentral-01.azurewebsites.net' : '127.0.0.1:80'
    }/ws/research_papers/${fileName}/`,
  PDF_URL: (relativePath: string) => `${API_BASE_URL}${relativePath}`,
};
