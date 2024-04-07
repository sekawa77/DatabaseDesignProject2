// Number of documents without inventories
import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
  'inventories': {
    '$exists': false
  }
};

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('Project2').collection('UserAccounts');
const cursor = coll.find(filter);
const result = await cursor.toArray();

console.log("There are " + result.length + " documents without inventories");
await client.close();