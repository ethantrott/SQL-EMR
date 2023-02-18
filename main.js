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
    .then(() => setup())
    .catch((err) => console.error('connection error', err.stack));

// Resets DB and creates tables from scratch
async function setup(){
    console.log('Connected');

    // Delete all tables (reset DB)
    await client.query('DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA IF NOT EXISTS public;');

    // Create required tables
    await client.query('CREATE TABLE patients (mrn INT)');
    await client.query('CREATE TABLE interactions (fin INT)');
    await client.query('CREATE TABLE orders (order_id INT)');

    // Output table list
    const res = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`);
    console.log("Tables created:");
    console.log(res.rows);

    await client.end(); 
}
