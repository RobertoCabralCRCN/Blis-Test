// src/config/auth.ts
import { config } from "dotenv";

config(); // Carrega as variáveis do .env

export default {
  jwt: {
    secret: process.env.JWT_SECRET || "default_secret", // Lê do .env, se não encontrar, usa um valor padrão
    expiresIn: process.env.JWT_EXPIRES_IN || "1d", // Lê do .env, se não encontrar, usa 1 dia como padrão
  },
};
