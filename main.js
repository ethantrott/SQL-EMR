// Ethan Trott
// SQL EMR
// 2023

const { Client } = require('pg');

const config = require("./config.json");

const tests = require("./tests");

const client = new Client({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password
});

async function main(){
    // connect
    await client.connect();
    console.log('Connected.');

    // setup
    await setup();

    // test insert and get
    await tests.doTests(client);

    // exit
    await client.end(); 
}

// Resets DB and creates tables from scratch
async function setup(){
    // Delete all tables (reset DB)
    await client.query(`DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA IF NOT EXISTS public;`);

    // Create types
    await client.query(`CREATE TYPE interaction_type AS ENUM ('routine', 'emergency', 'other')`);

    // Create required tables
    await client.query(`CREATE TABLE patients (mrn INT PRIMARY KEY, name TEXT, dob DATE)`);
    await client.query(`CREATE TABLE interactions (fin INT PRIMARY KEY, mrn INT, type interaction_type, note TEXT, 
        CONSTRAINT fk_patient_mrn
            FOREIGN KEY(mrn) 
            REFERENCES patients(mrn)
            ON DELETE CASCADE)`);
    await client.query(`CREATE TABLE orders (order_id INT PRIMARY KEY, fin INT, order_name TEXT, quantity FLOAT,
        CONSTRAINT fk_interaction_fin
            FOREIGN KEY(fin) 
            REFERENCES interactions(fin)
            ON DELETE CASCADE)`);

    // Output table list
    const res = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`);
    console.log("Tables created:");
    console.log(res.rows);

    console.log("Setup complete.");
}

main();