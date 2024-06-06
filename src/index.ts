import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { mostrarListadoCuentas, agregarCuenta, borrarCuenta, actualizarCuenta, generarContraseniaSegura, consultarListado } from "./Modelo";
dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

/*mostrar toda la informacion del usuario que lo solicita.
app.post("/v1/listado", (req: Request, res: Response) => {
    const miNuevoPass = generarContraseniaSegura();
    const usuarioDePrueba = {
        nombre: "nombre",
        edad: 30,
        pass: miNuevoPass,
        email: "juan.perez@example.com"
    };

    res.json(usuarioDePrueba);
});*/

app.post("/v1/listado", async (req: Request, res: Response) => {
    try {
        res.send(await consultarListado());
    } catch (error) {
        console.log("se rompido el post base de datos");
    }
});

//crear la contraseña que requiere el usuario
/*app.post ("/v1/listado/add-account", async (req: Request, res: Response) =>{
try {
        const nombreWeb = req.body.nombreWeb;
        const usuario = req.body.usuario;
        const contrasenia = req.body.contrasenia;
        res.send(await agregarCuenta(usuario, contrasenia, nombreWeb));
    } catch (error) {
        console.log("se rompio");
    }
});*/

app.post("/v1/listado/add-account", async (req: Request, res: Response) => {
    console.log ('encabezados de la solicitud:', req.headers);
    console.log('cuerpo de la solicitud:', req.body );
    
    const { usuario, nombreWeb } = req.body;
    try {
       
        console.log(usuario, nombreWeb)

        if (!usuario || !nombreWeb) {
            return res.status(400).send({ error: 'Todos los campos son obligatorios' });
        }

        const nuevaCuenta = await agregarCuenta(usuario, generarContraseniaSegura(), nombreWeb);
        res.status(201).send(nuevaCuenta);
    } catch (error) {
        console.error('Error en el controlador:', error);
        res.status(500).send({ error: 'Error al agregar la cuenta' });
    }
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
