import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { mostrarListadoCuentas, agregarCuenta, actualizarCuenta, generarContraseniaSegura, consultarListado } from "./Modelo";
dotenv.config();

const port = process.env.PORT || 3000;

const app: Express = express();

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

//mostrar toda la informacion del usuario que lo solicita.
app.post("/v1/listado", async (req: Request, res: Response) => {
    try {
        res.send(await consultarListado());
    } catch (error) {
        console.log("se rompido el post base de datos");
    }
});

//crear la cuenta que requiere el usuario
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
app.put("/v1/usuario/update", async (req: Request, res: Response) => {
    const {usuario, nombreWeb} = req.body;

    if (!nombreWeb || !usuario) {
        return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }

    try {
        await actualizarCuenta(usuario, generarContraseniaSegura(), nombreWeb);
        res.status(200).send({ message: "Contraseña actualizada con éxito" });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).send({ error: 'Error al actualizar la cuenta' });
    }
});


app.listen(port, () => {
    console.log(`[server]: Servidor iniciado en http://localhost:${port}`);
});


