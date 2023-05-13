const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const Redis = require("ioredis");

const app = express();
const server = http.createServer(app);

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const redis = new Redis(REDIS_PORT, REDIS_HOST);


// const io = socketIO(server);

const io = socketIO(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors({
    origin: "http://localhost:3001/"
}));


app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



redis.subscribe("updates", (err: any, count: number) => {
    if (err) {
        console.error("Failed to subscribe: %s", err.message);
    } else {
        console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
    }
});

redis.on("message", (channel: string, message: string) => {
    console.log(`Received ${message} from ${channel}`);
});


io.on('connection', (socket: any) => {
    console.log('Client connected');
    redis.on("message", (channel: string, message: string) => {
        socket.emit('update', message);
        console.log(`Received ${message} from ${channel}`);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
