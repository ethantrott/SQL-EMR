const prompt = require("prompt-sync")({ sigint: true });

const insert_data = require("./insert_data");
const get_data = require("./get_data");

async function mainMenu(client){
    // main menu loop
    while (true){
        // clear console
        process.stdout.write('\033c');

        // get input and display correct submenu
        console.log("SQL-EMR\nEthan Trott \n\n1) Create Record\n2) View Record");
        const choice = prompt("> ");
        if (choice == "1") await createRecordMenu(client);
        else if (choice == "2") await viewRecordMenu(client);
    }
}

async function createRecordMenu(client){
    // clear console
    process.stdout.write('\033c');

    // get input and display correct submenu
    console.log("SQL-EMR\nEthan Trott \n\n1) Create Patient Record\n2) Create Interaction Record\n3) Create Order Record\n\nAny other key to return.");
    const choice = prompt("> ");
    if (choice == "1") await createPatientMenu(client);
    else if (choice == "2") await createInteractionMenu(client);
    else if (choice == "3") await createOrderMenu(client);
}

async function createPatientMenu(client){
    // clear console
    process.stdout.write('\033c');

    // get input and display correct submenu
    console.log("SQL-EMR\nEthan Trott \n\nCreate Patient Record\nType 'exit' to return\n\n");
    const mrn = prompt("MRN: ");
    const name = prompt("Name: ");
    const dob = prompt("Date of Birth (e.g. '1999-01-01'): ")
    await insert_data.insert_patient(client, mrn, name, dob);
}

async function viewRecordMenu(client){
    // clear console
    process.stdout.write('\033c');

    // get input and display correct submenu
    console.log("SQL-EMR\nEthan Trott \n\n1) View Patient Record\n2) View Interaction Record\n3) View Order Record\n\nAny other key to return.");
    const choice = prompt("> ");
    if (choice == "1") await viewPatientMenu(client);
    else if (choice == "2") await viewInteractionMenu(client);
    else if (choice == "3") await viewOrderMenu(client);
}

async function viewPatientMenu(client){
    // clear console
    process.stdout.write('\033c');

    // get input and display correct submenu
    console.log("SQL-EMR\nEthan Trott \n\nView Patient Record\n\n1) View All Patients\n2) View Patient by MRN\n3) View Patient by Name\n\nAny other key to return");
    const choice = prompt("> ");
    if (choice == "1"){
        console.log(await get_data.get_all_patients(client));
        prompt("Press any key to continue.");
    } 
    else if (choice == "2") {
        const mrn = prompt("MRN: ");
        console.log(await get_data.get_patient_by_mrn(client, mrn));
        prompt("Press any key to continue.");
    }
    else if (choice == "3") {
        const name = prompt("Name: ");
        console.log(await get_data.get_patients_by_name(client, name));
        prompt("Press any key to continue.");
    }
}

async function viewInteractionMenu(client){
    // clear console
    process.stdout.write('\033c');

    // get input and display correct submenu
    console.log("SQL-EMR\nEthan Trott \n\nView Interaction Record\n\n1) View Interaction by FIN\n2) View Interactions by MRN\n3) View Interactions by Name\n\nAny other key to return");
    const choice = prompt("> ");
    if (choice == "1"){
        const fin = prompt("FIN: ");
        console.log(await get_data.get_interaction_by_fin(client, fin));
        prompt("Press any key to continue.");
    } 
    else if (choice == "2") {
        const mrn = prompt("MRN: ");
        console.log(await get_data.get_interactions_by_mrn(client, mrn));
        prompt("Press any key to continue.");
    }
    else if (choice == "3") {
        const name = prompt("Name: ");
        console.log(await get_data.get_interactions_by_name(client, name));
        prompt("Press any key to continue.");
    }
}

async function viewOrderMenu(client){
    // clear console
    process.stdout.write('\033c');

    // get input and display correct submenu
    console.log("SQL-EMR\nEthan Trott \n\nView Order Record\n\n1) View Orders by FIN\n2) View Order by Order Name\n\nAny other key to return");
    const choice = prompt("> ");
    if (choice == "1"){
        const fin = prompt("FIN: ");
        console.log(await get_data.get_orders_by_fin(client, fin));
        prompt("Press any key to continue.");
    } 
    else if (choice == "2") {
        const name = prompt("Order Name: ");
        console.log(await get_data.get_orders_by_order_name(client, name));
        prompt("Press any key to continue.");
    }
}

module.exports = {mainMenu};