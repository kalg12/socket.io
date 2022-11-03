const socket = io(); // Creamos una instancia de socket.io

socket.on("Bienvenido", (data) => {
    console.log(data); // Imprimimos el mensaje recibido
    const mensaje = document.getElementById("mensaje").innerText = data;
});

const emitToServer = document.getElementById("emit-to-server");
emitToServer.addEventListener("click", () => {
    socket.emit("emit-to-server", "Hola servidor");
});


/* Listening for the event "everyone" and when it receives it, it prints the message. */
socket.on("everyone", mensaje => {
    console.log("Mensaje recibido: " + mensaje);
})

// Ahora se emitirá un mensaje al último socket conectado
const emitToLast = document.getElementById("emit-to-last");
emitToLast.addEventListener("click", () => {
    socket.emit("last", "Hola último socket conectado 🫡");
});

socket.on("saludo", mensaje => {
    console.log(mensaje);
});

//Diferencia entre on, once y off
socket.on("one", () => {
    console.log("Se emite varias veces");
})

socket.once("once", () => {
    console.log("Se emite una vez");
});

const listener = () => {
    console.log("Se apaga el evento")
}

socket.on("off", listener);

setTimeout(() => {
    socket.off("off", listener);
},2000);