const express = require("express");
const { Pool } = require("pg");
const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const app = express();
app.use(express.json());

const client = new SecretManagerServiceClient();

async function accessSecret(secretName) {
  const [version] = await client.accessSecretVersion({
    name: `projects/${process.env.PROJECT_ID}/secrets/${secretName}/versions/latest`,
  });
  return version.payload.data.toString();
}

async function startServer() {
  try {
    const dbUser = await accessSecret("db-user");
    const dbPass = await accessSecret("db-password");

    const pool = new Pool({
      host: process.env.DB_HOST,
      user: dbUser,
      password: dbPass,
      database: process.env.DB_NAME,
      port: 5432,
      ssl: {
        rejectUnauthorized: false, // for the demo reason using this, as the SSL connection to 
                                   // DB will throw an error if you don't use this
      },
    });

    //  HEALTH CHECK (CRITICAL for GKE Ingress)
    app.get("/", (req, res) => {
      res.status(200).send("OK");
    });

    //  POST API
    app.post("/api/data", async (req, res) => {
      try {
        const { text } = req.body;
        await pool.query("INSERT INTO messages(text) VALUES($1)", [text]);
        res.send("Saved");
      } catch (err) {
        console.error("POST ERROR:", err);
        res.status(500).send(err.message);
      }
    });

    //  GET API
    app.get("/api/data", async (req, res) => {
      try {
        const result = await pool.query("SELECT * FROM messages");
        res.json(result.rows);
      } catch (err) {
        console.error("GET ERROR:", err);
        res.status(500).send(err.message);
      }
    });

    app.listen(3000, () => console.log("Server running"));
  } catch (err) {
    console.error("Startup Error:", err);
  }
}

startServer();