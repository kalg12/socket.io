const socket = io(); // Creamos una instancia de socket.io

const circle = document.querySelector('#circle'); // Seleccionamos el elemento con clase circle

const drawCircle = position => {
    circle.style.top = position.top;
    circle.style.left = position.left;
}

const drag = (e) => {

    //Creamos una constante con el nombre position que tendrá el objeto de las posiciones
    const position = {
        top: e.clientY + "px",
        left: e.clientX + "px"
    }

    drawCircle(position); // Llamamos a la función drawCircle y le pasamos como parámetro el objeto position

    //Vamos a emitir los movimientos a otros clientes
    socket.emit('circle position', position);

}

document.addEventListener('mousedown', e => {
    document.addEventListener('mousemove', drag)
});

document.addEventListener("mouseup", e => {
    document.removeEventListener('mousemove', drag)
})

socket.on('move circle', position => {
    drawCircle(position);
});