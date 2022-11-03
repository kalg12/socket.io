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

    socket.on('circle position', position => {
        socket.broadcast.emit('move circle', position); // Emitimos el evento circle position a todos los clientes
    })

});

httpServer.listen(3000); // Escuchamos en el puerto 3000