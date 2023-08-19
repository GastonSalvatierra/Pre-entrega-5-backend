//import fs from 'fs';
import { Router } from "express";
const router = Router();
import cartService from '../services/db/carts.services.js'

const cartServices = new cartService();


//GET

router.get('/',async(req,res)=>{
    try {
        let carts = await cartServices.getAll();
        res.send(carts);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo obtener los estudiantes."});
    }
    
})



//POST
router.post('/',async(req,res)=>{
    const carts = req.body
    try {
        let result = await cartServices.save(carts);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({error:  error, message: "No se pudo guardar el estudiante."});
    }
})





export default router;















/* const crearArchivo = async () => {
    try {
        await fs.promises.mkdir(dirName, { recursive: true });
        await fs.promises.writeFile(fileName, JSON.stringify(nuevoCarrito, null, 2));
        console.log('Archivo JSON "productos.json" actualizado con éxito.');
    } catch (error) {
        console.log('No se pudo escribir el archivo JSON:', error);
    }
}; */

// Leer productos desde el archivo si existe

/* const leerProductosDeArchivo = async () => {
    try {
        if (fs.existsSync(fileName)) {
            const data = await fs.promises.readFile(fileName, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.log('No se pudo leer el archivo productos.json:', error);
        return [];
    }
}; */

// Cargar productos al iniciar el servidor


/* leerProductosDeArchivo().then(products => {
    nuevoCarrito.push(...products);
    if (products.length > 0) {
        id = Math.max(...products.map(item => item.id)) + 1;
    }
}); */

//ruta get /
/* router.get('/', (req, res) => {
    const products = nuevoCarrito;
    const limit = parseInt(req.query.limit);

    if (!Number.isNaN(limit)) {
        const limitedProducts = products.slice(0, limit);
        res.send(limitedProducts);
    } else {
        res.send(products);
    }
}); */

//ruta post 

/* router.post('/', (req, res) => {
    let { products } = req.body;

    let carrito1 = {
        id: id++,
        products,
    }

    nuevoCarrito.push(carrito1);
    crearArchivo();

    res.send({ status: "success", message: "Producto AGREGADO con éxito" });
}); */

//ruta get /:cid

/* router.get('/:cid', (req, res) => {
    const productId = parseInt(req.params.cid);
    const product = nuevoCarrito.find(product => product.id === productId);

    if (product) {
        res.send(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
}); */

//ruta post 
// Ruta POST para agregar un producto al carrito con :cid como id

/* router.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    let { quantity } = req.body;

    if (isNaN(cid) || isNaN(pid) || isNaN(quantity)) {
        return res.status(400).send('ID de carrito y cantidad deben ser números válidos.');
    }

    // Verificar si el carrito con :cid existe en el arreglo nuevoCarrito
    const carritoExistente = nuevoCarrito.find(carrito => carrito.id === cid);

    if (carritoExistente) {
        // Si el carrito existe, buscamos si el producto ya está agregado
        const productoExistente = carritoExistente.products.find(producto => producto.pid === pid);

        if (productoExistente) {
            // Si el producto ya existe en el carrito, incrementamos la cantidad
            productoExistente.quantity += quantity;
        } else {
            // Si el producto no existe en el carrito, lo agregamos al carrito
            carritoExistente.products.push({ pid, quantity });
        }
    }

    // Llamada a crearArchivo después de modificar un producto
    crearArchivo();

    res.send({ status: "success", message: "Producto AGREGADO con éxito" });
});

const obtenerCarrito = () => {
    return nuevoCarrito;
} */

