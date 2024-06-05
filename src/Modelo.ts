import * as fs from 'fs';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import  sqlite3  from 'sqlite3';
import { open } from 'sqlite';


export interface Cuenta {
    usuario : string;
    contrasenia : string;
    nombreWeb : string;
}

/*export interface SitioWeb{
    nombre: string;
    cuentas: Cuenta[];
}*/ //hicimos modificaciones en el modelado ya que nos pareció redundante hacer otra interface únicamente para asociar la cuenta del usuario con el nombre del sitio web


// Defino el tipo de retorno para indicar si la contraseña fue encontrada (Para evitar devolver null)
type ResultadoBusquedaContrasenia<T> =
        | { tipo: "exito", encontrado: T }
        | { tipo: "no_encontrado" }

    function formatearResultado<T>(resultado: ResultadoBusquedaContrasenia<T>): string {
        if (resultado.tipo === "exito")
            return `Se encontro a ${resultado.encontrado}`;
        else
            return `No se encontro nada`;
    }

async function abrirConexion() {
    return open({
        filename: 'db.sqlite',
        driver: sqlite3.Database
    })
}

//  CRUD
export async function agregarCuenta(nombreWeb: string, usuario: string, contrasenia: string): Promise<Cuenta> {
    // Comprobamos si el sitio web ya existe en nuestra base de datos
    // Si el sitio web ya existe, agregamos la nueva cuenta a ese sitio.
    // De lo contrario, creamos un nuevo sitio web con la nueva cuenta.
    const db = await abrirConexion();
    
    const query = `INSERT INTO Cuenta (nombreWeb, usuario, contrasenia) VALUES ('${nombreWeb}', ${usuario}, ${contrasenia})`;
    await db.run(query);

    return { nombreWeb, usuario, contrasenia };
}

export async function actualizarCuenta(nombreSitio: string, usuario: string, nuevaContrasenia: string): Promise<void> {
    // Buscamos el sitio web en nuestra base de datos
    // Si el sitio web existe y la cuenta también,
    // actualizamos la contraseña de esa cuenta.
    // Si no se encuentra el sitio web o la cuenta, no se realiza ninguna acción.
    // No es necesario devolver ningún valor explícito.
}

export async function borrarCuenta(nombreSitio: string, usuario: string): Promise<void> {
    // Encontramos el índice del sitio web en nuestra base de datos
    // Si se encuentra el sitio web,
    // buscamos la cuenta dentro de ese sitio y la eliminamos.
    // Si no se encuentra el sitio web o la cuenta, no se realiza ninguna acción.
    // No es necesario devolver ningún valor explícito.
}
//async?
export function obtenerContrasenia(nombreSitio: string, usuario: string, contraseniaMaestra: string): ResultadoBusquedaContrasenia<string> {
    // Desencriptar la base de datos utilizando la contraseña maestra
    // Buscar el sitio web en la base de datos
    // Buscar la cuenta dentro del sitio web
    // Devolver la contraseña si se encuentra, de lo contrario, devolver null
    return { tipo: "no_encontrado" }; // Devuelve "no encontrado" cuando no se encuentra
}
//Encriptar archivo de base de datos de forma segura
const secretKey = 'alagrandelepusecuca';

export async function encriptarArchivo(rutaArchivo: string, contrasenia_maestra: string): Promise<void> {
    try {
        // Leer el contenido del archivo
        const contenido = fs.readFileSync(rutaArchivo, 'utf-8');

        // Cifrar el contenido del archivo utilizando AES
        const contenidoCifrado = CryptoJS.AES.encrypt(contenido, contrasenia_maestra).toString();

        // Escribir el contenido cifrado en el mismo archivo
        fs.writeFileSync(rutaArchivo, contenidoCifrado);

        console.log(`Archivo encriptado correctamente: ${rutaArchivo}`);
    } catch (error) {
        console.error('Error al encriptar el archivo:', error);
    }
}

// Ejemplo de uso
const rutaArchivo = 'archivo.txt';
const contraseniaMaestra = 'mi_contrasenia_maestra';

// Desencriptar la base de datos antes de acceder a las contraseñas
// Ejemplo de cómo obtener la contraseña de una cuenta específica
const contraseniaCuenta = obtenerContrasenia('Ejemplo', 'usuario1', contraseniaMaestra);
if (contraseniaCuenta) {
    console.log(`La contraseña de la cuenta es: ${contraseniaCuenta}`);
} else {
    console.log('La cuenta no se encuentra o la contraseña maestra es incorrecta.');
}

//generar contraseña segura
const generarContraseniaSegura = (): string => {
    const caracteresRegEx = /[A-Za-z0-9]/;
    const longitud = 16;

    return [...Array(longitud)]
        .map(() => {
            let caracter;
            do {
                caracter = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
            } while (!caracteresRegEx.test(caracter));
            return caracter;
        })
        .join('');
};

//mostrar un listado de cuentas

export async function mostrarListadoCuentas(contraseniaMaestra: string): Promise<void> {
        // Leer y desencriptar la base de datos utilizando la contraseña maestra
        const contenidoCifrado = fs.readFileSync(rutaArchivo, 'utf-8');
        const contenidoDesencriptado = CryptoJS.AES.decrypt(contenidoCifrado, contraseniaMaestra).toString(CryptoJS.enc.Utf8);
        //AYUDA
        //const baseDatos: SitioWeb[] = JSON.parse(contenidoDesencriptado);

        // Mostrar listado de cuentas por sitio web
        // Manejar errores al mostrar el listado de cuentas
}

function mostrarContrasenia(usuario: string, contraseniaMaestra: string): ResultadoBusquedaContrasenia<string> {
    try {
        // Leer y desencriptar la base de datos utilizando la contraseña maestra
        const contenidoCifrado = fs.readFileSync(rutaArchivo, 'utf-8');
        const contenidoDesencriptado = CryptoJS.AES.decrypt(contenidoCifrado, contraseniaMaestra).toString(CryptoJS.enc.Utf8);
        //AYUDA
        //const baseDatos: SitioWeb[] = JSON.parse(contenidoDesencriptado);

        // Buscar la contraseña del usuario en todos los sitios web
        // Devolver la contraseña encontrada o "no encontrado" si no se encuentra
        
        //AYUDA
        return /*contraseniaEncontrada ? { tipo: "exito", encontrado: /*contraseniaEncontrada } : */{ tipo: "no_encontrado" };

    } catch (error) {
        console.error('Error al mostrar la contraseña:', error);
        return { tipo: "no_encontrado" }; // Devuelve "no encontrado" en caso de error
    }
}

//have i been pwoned?
async function verificarContraseniaComprometida(contrasenia: string): Promise<boolean> {
    try {
        // Definir el nombre de tu aplicación para el encabezado del usuario
        const nombreAplicacion = "SecurePassManager";

        // Llamar a la API de Have I Been Pwned
        const response = await axios.get(`https://haveibeenpwned.com/api/v3/pwnedpassword/${contrasenia}`, {
            headers: {
                'user-agent': nombreAplicacion
            }
        });

        // Verificar si la contraseña está comprometida
        return response.status === 200;
    } catch (error) {
        console.error('Error al verificar la contraseña comprometida:', error);
        return false; // En caso de error, asumimos que la contraseña no está comprometida
    }
}