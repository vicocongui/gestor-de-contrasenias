import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hola mundo!");
});

app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
});
