import express from 'express';
import handlebars from 'express-handlebars';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import MessageModel from './services/db/models/message.js';

const app = express();
const PORT = 8080;


//Armado para Postman
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// Confi de handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);


const httpServer = app.listen(PORT, () => {
    console.log("Server run on port: " + PORT);
})


const DB = async () => {
    try {
        await mongoose.connect('mongodb+srv://gastonsalvatierra:admin@cluster0.w1qjysl.mongodb.net/ecommerce?retryWrites=true&w=majority');
        console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
DB();

// Instanciamos socket.io
const socketServer = new Server(httpServer);

let messages = []
// Abrimos el canal de comunicacion
socketServer.on('connection', socket => {

    socket.on('message', data => {
        messages.push(data);

        const newMessage = new MessageModel({
            user: data.user,
            message: data.message
        });
        newMessage.save();

        // enviamos un array de objetos ---> [{ user: "Juan", message: "Hola" }, { user: "Elias", message: "Como estas?" }]
        // socket.emit('messageLogs', messages) // esto no es funcional para este ejercicio

        // socket.broadcast.emit('messageLogs', messages);

        socketServer.emit('messageLogs', messages);
    })

    socket.on('userConnected', data => {
        socket.broadcast.emit('userConnected', data.user);
    })

    // socket.disconnect()
    socket.on('closeChat', data => {
        if (data.close === 'close')
            socket.disconnect();
    })

})


