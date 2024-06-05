import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { mostrarListadoCuentas, agregarCuenta, borrarCuenta, actualizarCuenta, generarContraseniaSegura } from "./Modelo";
dotenv.config();

const port = process.env.PORT || 3000;
const app: Express = express();

const obtenerDatosApi = () => {
    return 23
}

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

//mostrar toda la informacion del usuario que lo solicita.
app.get("/v1/listado", (req: Request, res: Response) => {
    const miNuevoPass = generarContraseniaSegura();
    const usuarioDePrueba = {
        nombre: "nombre",
        edad: 30,
        pass: miNuevoPass,
        email: "juan.perez@example.com"
    };

    res.json(usuarioDePrueba);
});

//crear la contraseña que requiere el usuario
app.post ("/v1/usuario/new", (req: Request, res: Response) =>{
    obtenerDatosApi();

    res.send("Hola mundo, it's me con ganas de llorar pero con /usuario/new!");
});

//actualizar la contraseña
app.put ("/v1/usuario/update", (req: Request, res: Response)=>{
    res.send("Hola mundo, it's me con ganas de llorar pero con /usuario/actualizar!");
});

app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
});


/**
 * /v1/usuario`
            - Recibe: `sitio`, `nombreDeUsuario`, `contraseniamaestra`
            - Devuelve: la contrasenia
        - `/v1/usuario/crear`
            - Recibe: `sitio`, `nombreDeUsuario`, `contraseniamaestra`
            - Devuelve: nada (200 si todo bien, 4xx 5xx si todo mal)
        - `/v1/usuario/actualizar`
            - Recibe: `sitio`, `nombreDeUsuario`, `contraseniamaestra`, `nuevaContrasenia`
            - Devuelve: nada (200 si todo bien, 4xx 5xx si todo mal)
 */

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


/*app.get("/", (req: Request, res: Response) => {
    res.send("Hola mundo, it's me con ganas de llorar!");
});*/
