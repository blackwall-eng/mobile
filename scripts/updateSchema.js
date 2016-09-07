const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { introspectionQuery, printSchema, buildClientSchema } = require('graphql/utilities');
const schemaPath = path.join(__dirname, '../data/schema');

const SERVER = 'http://blackwall-cerebro.herokuapp.com/graphql';

// Save JSON of full schema introspection for Babel Relay Plugin to use
fetch(`${SERVER}`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({'query': introspectionQuery}),
}).then(res => res.json()).then((schemaJSON) => {
  console.log('received schema');
  if (schemaJSON.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(schemaJSON.errors, null, 2)
    );
  } else {
    const schemaString = JSON.stringify(schemaJSON, null, 2);
    console.log('write schema');
    fs.writeFileSync(
      `${schemaPath}.json`,
      schemaString
    );
    const clientSchema = buildClientSchema(schemaJSON.data);
    const printedSchema = printSchema(clientSchema);
    // Save user readable type system shorthand of schema
    fs.writeFileSync(
      `${schemaPath}.graphql`,
      printedSchema
    );
    console.log('updated the schema');
  }
});
