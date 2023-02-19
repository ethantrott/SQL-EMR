// Ethan Trott
// SQL EMR
// 2023

const { Client } = require('pg');

const config = require("./config.json");

const insert_data = require("./insert_data");
const get_data = require("./insert_data");

const client = new Client({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password
});

async function main(){
    await client.connect();
    console.log('Connected.');

    await setup();
    console.log("Setup complete.")

}

// Resets DB and creates tables from scratch
async function setup(){
    // Delete all tables (reset DB)
    await client.query(`DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA IF NOT EXISTS public;`);

    // Create types
    await client.query(`CREATE TYPE interaction_type AS ENUM ('routine', 'emergency', 'other')`);

    // Create required tables
    await client.query(`CREATE TABLE patients (mrn INT, name TEXT, dob DATE)`);
    await client.query(`CREATE TABLE interactions (fin INT, mrn INT, type interaction_type, note TEXT)`);
    await client.query(`CREATE TABLE orders (order_id INT, fin INT, order_name TEXT, quantity FLOAT)`);

    // Output table list
    const res = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`);
    console.log("Tables created:");
    console.log(res.rows);

    await client.end(); 
}

main();