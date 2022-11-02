const socket = io(); // Creamos una instancia de socket.io

const checkSocketStatus = () => {
    console.log(`Estado de socket: ${socket.connected}`);
}

//Escuchamos el evento de error de conexión y mostramos un console log en el cliente
socket.io.on('connect_error', () => {
    console.log(`Error de conexión 😢 `);
});

//Mostramos un console log del socket id en el cliente
socket.on('connect', () => {
  console.log(`El socket se ha conectado: ${socket.id}`);
  checkSocketStatus();
});

//Escuchamos el evento disconnect y mostramos un console log en el cliente
socket.on('disconnect', () => {
    console.log(`El socket se ha desconectado: ${socket.id}`);
    checkSocketStatus();
});

//Escuchamos el evento de intento de reconexión y mostramos un console log en el cliente el intento de reconexión
socket.io.on('reconnect_attempt', () => {
    console.log(`Intentando reconectar...😜`);
});

//Escuchamos el evento de reconectado y mostramos un console log en el cliente
socket.io.on('reconnect', () => {
    console.log(`Me he reconectado 😎`);
});