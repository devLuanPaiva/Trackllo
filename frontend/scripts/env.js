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
  API_URL: '${process.env.API_URL ?? ''}'
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
