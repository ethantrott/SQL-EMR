// Ethan Trott
// SQL EMR
// 2023

async function get_all_patients(client){
    const res = await client.query(`SELECT * FROM patients`);
    console.log(res.rows)
}

async function get_patient_by_mrn(client, mrn){

}

async function get_patients_by_name(client, name){

}

async function get_interactions_by_mrn(client, fin){

}

async function get_interactions_by_name(client, name){

}

async function get_orders_by_fin(client, fin){

}

module.exports = { get_all_patients, get_interactions_by_mrn, get_interactions_by_name, get_orders_by_fin, get_patient_by_mrn, get_patients_by_name};