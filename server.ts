import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

const app = express();

// Autoriza o servidor a servir os arquivos estáticos dentro da pasta public. No caso o index.hmtl.
app.use(express.static(path.resolve(__dirname + "/public")));

// cria a instância do servidor
const server = createServer(app);

const io = new Server(); 

// Autoriza o socket.io a monitorar as requisições ao servidor, permitindo chamadas de todas as origens
io.listen(server, {cors: {origin: "*"}, });

// Caso receba evento chamado "chat", emite para todos os clients a mensagem recebida
io.on("connection", socket => {
    socket.on('chat', (message: string) => {
        io.emit('chat', message);
    })

    socket.on("end", () => {
        io.disconnectSockets();
    })
});

// Servidor começa rodar na porta 3333
server.listen(3333, () => {
    console.log("server running");
});



