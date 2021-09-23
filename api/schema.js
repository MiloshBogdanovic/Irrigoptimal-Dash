const {pool} = require('./dbConfig');

// Declare a constant for the schema name
const schemaName = "user_schema";
const postgresRole = "postgres";
// Declare global array for the Postgres schema names
var pgSchemas = [];


const schemaCodes = {
  "25007": "schema_and_data_statement_mixing_not_supported",
  "3F000": "invalid_schema_name",
  "42P06": "duplicate_schema",
  "42P15": "invalid_schema_definition",
  "42000": "syntax_error_or_access_rule_violation",
  "42601": "syntax_error"
};

async function schemaFuncs() {
  // Declare a string for the Pool's query
  let selectSchemasSql = "SELECT schema_name FROM information_schema.schemata;";
  await pool.query(selectSchemasSql, (err, res) => {
    // Log the SQL statement to console
    console.log("\nselectSchemasSql:", selectSchemasSql);

    // Check for Postgres exceptions
    if (err) {
      console.log("SELECT schema_name:", schemaCodes[err.code]);
      console.log("ERROR code:", err.code);
    } else if (res.rows !== undefined) {
      // Iterate over the rows of Postgres schema names
      res.rows.forEach(row => {
        // Push the schema's name to the array
        pgSchemas.push(row.schema_name);
      });

      // Log the number of Postgres schema names to console
      console.log("schema names:", pgSchemas);
      console.log("SELECT schema_name total schemas:", res.rowCount);
    }
  });

  // Create the SCHEMA with user auth if it doesn't exist
let createSql = `CREATE SCHEMA IF NOT EXISTS ${schemaName} AUTHORIZATION ${postgresRole};`;

  // Log the SQL statement to console
  console.log("\ncreateSql:", createSql);
  await pool.query(createSql, (createErr, createRes) => {
    if (createErr) {
      console.log(
        "CREATE SCHEMA ERROR:",
        createErr.code,
        "--",
        schemaCodes[createErr.code]
      );
      console.log("ERROR code:", createErr.code);
      console.log("ERROR detail:", createErr.detail);
    }

    if (createRes) {
      console.log("\nCREATE SCHEMA RESULT:", createRes.command);

      let createTableSql = `CREATE TABLE ${schemaName}.test_table(
          id INT primary key, name VARCHAR(50) NOT NULL, pass VARCHAR (250) NOT NULL, email VARCHAR (250) UNIQUE NOT NULL
          );`;

      console.log("\ncreateTableSql:", createTableSql);

      pool.query(createTableSql, (tableErr, tableRes) => {
        if (tableErr) {
          console.log(
            "CREATE TABLE ERROR:",
            tableErr.code,
            "--",
            schemaCodes[tableErr.code]
          );
          console.log("createTableSql:", tableErr);
        }

        if (tableRes) {
          console.log("\nCREATE TABLE RESULT:", tableRes);
        }
      });
    }
  });
}

schemaFuncs();