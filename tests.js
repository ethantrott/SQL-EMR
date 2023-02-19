const insert_data = require("./insert_data");
const get_data = require("./get_data");

async function doTests(client) {
    await insert_data.insert_patient(client, 5432174, "John Doe", '1986-02-05');
    console.log(await get_data.get_patients_by_name(client, "John Doe"));
}

module.exports = {doTests};