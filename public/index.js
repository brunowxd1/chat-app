// Conecta no servidor.
const socket = io.connect('http://192.168.11.7:3333');

const chatForm = document.querySelector('.chat--form');
const chatInput = document.querySelector('.chat--input');
const chatWindow = document.querySelector('.chat--window');

// Quando o usuário realiza o submit da mensagem, primeiramente previnimos o reload da página e após emitimos ao servidor 
// um evento chamado "chat", que possui como valor a mensagem digitada pelo usuário. Após enviar a mensagem, o conteúdo do input
// é apagado
chatForm.addEventListener('submit', event => {
    event.preventDefault();

    if (chatInput.value === "fim") {
        socket.emit("end");
        window.alert("Conexão encerrada");
        chatInput.disabled = true;
    }

    socket.emit('chat', chatInput.value);

    chatInput.value = '';
});

// Caso receba do servidor algum evento chamado "chat", cria um novo elemento div com o innexText da mensagem, apensando-o na div
// .chat--window
socket.on('chat', message => {
    const newMessage = document.createElement('div');
    newMessage.classList.add('chat--message');
    newMessage.innerText = message;
    chatWindow.appendChild(newMessage);
});
