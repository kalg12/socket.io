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

    //Emisión básica
    socket.emit("Bienvenido", "Ahora estás conectado"); // Emite un evento a todos los sockets conectados

    //Escuchamos el evento emit-to-server
    socket.on("emit-to-server", (data) => {
        console.log(data); // Imprimimos el mensaje recibido
    });

    //Emisión a todos los sockets conectados
    io.emit("everyone", socket.id + " se ha conectado"); // Emite un evento a todos los sockets conectados


});

httpServer.listen(3000); // Escuchamos en el puerto 3000