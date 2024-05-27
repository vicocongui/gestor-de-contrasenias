import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { mostrarListadoCuentas, agregarCuenta, borrarCuenta, actualizarCuenta } from "./Modelo";

dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();


app.get("/", (req: Request, res: Response) => {
    res.send("Hola mundo!");
});

app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
});
/*
//muestro listado
app.get("/", async (req: Request, res: Response) => {
    const listado = await mostrarListadoCuentas();
    res.send(listado);
});
//agrego cuenta
app.get("/agregar/:nombre", async (req: Request, res: Response) => {
    const nombre = req.params.nombre;
    const ciudad = await agregarCuenta(nombre);
    res.send(ciudad);
});
//borrar cuenta
app.get("/borrar/:nombre", async (req: Request, res: Response) => {
    const nombre = req.params.nombre;
    await borrarCuenta(nombre);
    res.send("OK");
});
//actualizar cuenta
app.get("/verificarAlertas", async (req: Request, res: Response) => {
    const alertas = await actualizarCuenta();
    res.send(alertas);
});*/



