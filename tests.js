const insert_data = require("./insert_data");
const get_data = require("./get_data");

async function doTests(client) {
    //patient tests
    await insert_data.insert_patient(client, 5432174, "John Doe", '1986-02-05');    //patient 1
    await insert_data.insert_patient(client, 7632483, "John Doe", '1992-03-16');    //patient 2, same name as patient 1
    await insert_data.insert_patient(client, 2343243, "Rob Guy", '1982-09-26');     //patient 3, different name
    console.log(await get_data.get_all_patients(client));                   // returns all patients
    console.log(await get_data.get_patient_by_mrn(client, 5432174));        // returns one patient
    console.log(await get_data.get_patients_by_name(client, "John Doe"));   // returns both patients with name John Doe

    //interaction tests
    await insert_data.insert_interaction(client, 32746826, 5432174, "routine", "looks good");       //patient 1, fin 1
    await insert_data.insert_interaction(client, 33248724, 5432174, "emergency", "looks bad");      //patient 1, fin 2
    await insert_data.insert_interaction(client, 32479283, 7632483, "other", "okay");               //patient 2, fin 1, same patient name as patient 1
    await insert_data.insert_interaction(client, 32428199, 2343243, "routine", "doing great");      //patient 3, fin 1

    console.log(await get_data.get_interaction_by_fin(client, 32746826));       // returns one interaction
    console.log(await get_data.get_interactions_by_mrn(client, 5432174));       // returns both interactions for same patient
    console.log(await get_data.get_interactions_by_name(client, "John Doe"));   // returns the three interactions for the two patients with the same name

    //order tests
    await insert_data.insert_order(client, 23984723, 32746826, "ibuprofen", 12);  //patient 1, fin 1, order 1
    await insert_data.insert_order(client, 43214321, 33248724, "sleep", 24);      //patient 1, fin 2, order 1
    await insert_data.insert_order(client, 43298711, 33248724, "morphene", 24);   //patient 1, fin 2, order 2
    await insert_data.insert_order(client, 98475221, 32428199, "ibuprofen", 6);   //patient 3, fin 1, order 1, same order name as p1:f1:o1
    await insert_data.insert_order(client, 59298432, 32479283, "tylenol", 8);     //patient 2, fin 1, order 1, same patient name as p1

    console.log(await get_data.get_orders_by_fin(client, 33248724));                 // returns both orders for the same interaction
    console.log(await get_data.get_orders_by_order_name(client, "ibuprofen"));       // returns both orders of the same order_name
    console.log(await get_data.get_mrns_by_order_name(client, "ibuprofen"));         // returns both patient mrns that have orders for ibuprofen

    console.log("Tests complete.")
}

module.exports = {doTests};