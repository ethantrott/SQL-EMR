# SQL-EMR
### Ethan Trott


<br>

Created as a proof-of-concept EMR implemented with SQL as the DB.

Makes use of Node.js and PostgreSQL.

**NOTE: This is for demonstration purposes only. It is entirely vulnerable to injection. There is no data validation other than what is done on the SQL server automatically.**

<br>

Requires file named `config.json` of structure:

```
{
    "host": your_sql_host,
    "port": your_sql_port,
    "username": your_sql_username,
    "password": your_sql_password
}
```