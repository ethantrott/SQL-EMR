// Ethan Trott
// SQL EMR
// 2023

const { Client } = require('pg');

const config = require("./config.json");

const client = new Client({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password
});

client.connect()
    .then(() => mainLoop())
    .catch((err) => console.error('connection error', err.stack));


async function mainLoop(){
    console.log('connected')

    const res = await client.query('SELECT $1::text as message', ['Hello world!']);
    console.log(res.rows[0].message);

    await client.end(); 
}
