const Redis = require("ioredis");

const REDIS_HOST = process.env.REDIS_HOST
const REDIS_PORT = process.env.REDIS_PORT
const redis = new Redis(REDIS_PORT, REDIS_HOST);

setInterval(() => {
    const directions = ['N', 'S', 'E', 'W']
    const message = {
        direction: directions[Math.floor(Math.random() * directions.length)],
        id: 'R',
    };
    const channel = `updates`;

    redis.publish(channel, JSON.stringify(message));
    console.log("Published %s to %s", message, channel);
}, 100);
