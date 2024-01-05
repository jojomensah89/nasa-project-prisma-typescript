import dotenv from "dotenv";
import http from "http";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
}

startServer();
