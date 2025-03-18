const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const environmentsPath = path.join(__dirname, "../src/environments");

if (!fs.existsSync(environmentsPath)) {
  fs.mkdirSync(environmentsPath, { recursive: true });
}

const environmentFile = (isProd) => `
export const environment = {
  production: ${isProd},
  API_WRITE: '${process.env.API_WRITE || ""}',
  PROJECT_ID: '${process.env.PROJECT_ID || ""}',
  BOARD_COLLECTION_ID: '${process.env.BOARD_COLLECTION_ID || ""}',
  DATABASE_ID: '${process.env.DATABASE_ID || ""}'
};
`;

fs.writeFileSync(
  path.join(environmentsPath, "environment.ts"),
  environmentFile(true)
);
fs.writeFileSync(
  path.join(environmentsPath, "environment.development.ts"),
  environmentFile(false)
);
