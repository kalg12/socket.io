const express = require('express');
const path = require('path');
const { createServer } = require('http'); // Importamos la función createServer de http module
const { Server } = require('socket.io'); // Importamos la clase Server de socket.io module

const app = express(); // Creamos una instancia de express
const httpServer = createServer(app); // Creamos una instancia de httpServer

const io = new Server(httpServer); // Creamos una instancia de io

//Declaramos nuestros archivos estáticos
app.use(express.static(path.join(__dirname, 'views'))); // Declaramos la carpeta views como estática

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // Enviamos como vista el archivo index.html
});

io.on('connection', (socket) => { // Escuchamos el evento connection
    console.log(`Clientes conectados: ${io.engine.clientsCount}`); // Imprimimos en consola el número de clientes conectados
    console.log(socket.id); // Imprimimos en consola el mensaje

    /* Listening for the disconnect event. */
    socket.on("disconnect", () => {
        console.log(`El socket ${socket.id} se ha desconectado`);
    })

    socket.conn.once('upgrade', () => {
        console.log(`Hemos pasado de HTTP Long Polling a ${socket.conn.transport.name}`);
    });

});

httpServer.listen(3000); // Escuchamos en el puerto 3000