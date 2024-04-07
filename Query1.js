// Total count of unique inventories

import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$group': {
      '_id': '$inventories.inventoryName', 
      'count': {
        '$sum': 1
      }
    }
  }
];

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('Project2').collection('UserAccounts');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();

console.log("Total number of unique inventories in this collection " + result.length);
await client.close();