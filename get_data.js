// Ethan Trott
// SQL EMR
// 2023

async function get_all_patients(client){
    const res = await client.query(`SELECT * FROM patients`);
    return res.rows;
}

async function get_patient_by_mrn(client, mrn){
    const res = await client.query(`SELECT * FROM patients WHERE mrn=${mrn}`);
    return res.rows[0];
}

async function get_patients_by_name(client, name){
    const res = await client.query(`SELECT * FROM patients WHERE name='${name}'`);
    return res.rows;
}

async function get_interaction_by_fin(client, fin){
    const res = await client.query(`SELECT * FROM interactions WHERE fin=${fin}`);
    return res.rows[0];
}

async function get_interactions_by_mrn(client, mrn){
    const res = await client.query(`SELECT * FROM interactions WHERE mrn=${mrn}`);
    return res.rows;
}

async function get_interactions_by_name(client, name){
    // get interactions by name by getting data from both interactions and patients tables, on the condition that they have the same mrn and the patients name matches the requested name
    // this is necessary because name is not stored in the interactions table, only the patients table 

    const res = await client.query(`SELECT interactions.* FROM interactions 
                                    INNER JOIN patients ON interactions.mrn=patients.mrn 
                                    WHERE patients.name='${name}'`);
    return res.rows;
}

async function get_orders_by_fin(client, fin){
    const res = await client.query(`SELECT * FROM orders WHERE fin=${fin}`);
    return res.rows;
}

async function get_orders_by_order_name(client, order_name){
    const res = await client.query(`SELECT * FROM orders WHERE order_name='${order_name}'`);
    return res.rows;
}

async function get_mrns_by_order_name(client, order_name){
    // get mrns from order name by getting data from interactions that have the same fin, then getting data from patients that have a common mrn
    const res = await client.query(`SELECT patients.mrn FROM orders 
                                    INNER JOIN interactions ON orders.fin=interactions.fin 
                                    INNER JOIN patients ON interactions.mrn=patients.mrn 
                                    WHERE order_name='${order_name}'`);
    return res.rows;
}

module.exports = { get_all_patients, get_interactions_by_mrn, get_interactions_by_name, get_orders_by_fin, 
    get_patient_by_mrn, get_patients_by_name, get_interaction_by_fin, get_orders_by_order_name, get_mrns_by_order_name};