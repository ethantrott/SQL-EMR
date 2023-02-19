// Ethan Trott
// SQL EMR
// 2023

// (mrn INT, name TEXT, dob DATE)
async function insert_patient(client, mrn, name, dob){
    await client.query(`INSERT INTO patients VALUES ( ${mrn}, '${name}', '${dob}' )`);
}

// (fin INT, mrn INT, type interaction_type, note TEXT)
// 'type': ENUM ('routine', 'emergency', 'other')
async function insert_interaction(client, fin, mrn, type, note){
    await client.query(`INSERT INTO interactions VALUES ( ${fin}, ${mrn}, '${type}', '${note}' )`);
}

// (order_id INT, fin INT, order_name TEXT, quantity FLOAT)
async function insert_order(client, order_id, fin, order_name, quantity){
    await client.query(`INSERT INTO orders VALUES ( ${order_id}, ${fin}, '${order_name}', ${quantity})`);
}

// creates patients of quantity numPatients, each with random traits, interactions, and orders
async function insert_random(client, numPatients){

}

module.exports = { insert_patient, insert_interaction, insert_order, insert_random};