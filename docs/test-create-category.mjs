// Script ESM para crear categoría con imagen usando GraphQL multipart
// Requiere Node 18+

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = process.env.API_URL || "http://localhost:3000/graphql";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lexcard.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "P@$$w0rd";

async function login() {
  const query = `mutation ($input: LoginInput!) {\n  login(input: $input) { access_token user { id roles } }\n}`;
  const variables = { input: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD } };
  const r = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors) throw new Error("Login error: " + JSON.stringify(j.errors));
  return j?.data?.login?.access_token;
}

async function createCategory(token) {
  const name = `CatTest_${new Date()
    .toISOString()
    .replace(/[-:TZ]/g, "")
    .slice(0, 14)}`;
  const description = "Creada por script de prueba";
  const filePath = path.resolve(__dirname, "..", "test", "test-image.png");
  const buffer = await readFile(filePath);
  const blob = new Blob([buffer], { type: "image/png" });

  const operations = {
    query: `mutation ($input: CreateCategoryInput!) {\n      createCategory(input: $input) { id name description image }\n    }`,
    variables: { input: { name, description, image: null } },
  };

  const form = new FormData();
  form.append("operations", JSON.stringify(operations));
  form.append("map", JSON.stringify({ 0: ["variables.input.image"] }));
  form.append("0", blob, "test-image.png");

  const r = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Apollo-Require-Preflight": "true",
    },
    body: form,
  });
  const j = await r.json();
  return { json: j, name };
}

(async () => {
  try {
    console.log(`Usando API_URL: ${API_URL}`);
    const token = await login();
    if (!token) throw new Error("No token");
    console.log("Login OK");
    const { json, name } = await createCategory(token);
    console.log(JSON.stringify(json, null, 2));
    if (json?.data?.createCategory) {
      console.log(
        `Creada categoría ${name} (id=${json.data.createCategory.id})`
      );
    } else if (json?.errors) {
      console.error("Errores:", JSON.stringify(json.errors, null, 2));
      process.exitCode = 1;
    }
  } catch (e) {
    console.error("Fallo:", e?.message || e);
    process.exitCode = 1;
  }
})();
