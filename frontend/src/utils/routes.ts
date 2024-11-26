// routes.ts
export const API_BASE_URL = 'http://127.0.0.1:8000';

export const ROUTES = {
  UPLOAD: `${API_BASE_URL}/api/upload/`,
  WEBSOCKET: (fileName: string) => `ws://127.0.0.1:8000/ws/research_papers/${fileName}/`,
  PDF_URL: (relativePath: string) => `${API_BASE_URL}${relativePath}`,
};
