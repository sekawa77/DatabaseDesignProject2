// All users that have a inventory called "food" or "drinks"

import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
  '$or': [
    {
      'inventories.inventoryName': 'Food'
    }, {
      'inventories.inventoryName': 'Drink'
    }
  ]
};

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('Project2').collection('UserAccounts');
const cursor = coll.find(filter);
const result = await cursor.toArray();

console.log("These users have inventories called Food or Drink: " + result.map(user => user.name));
await client.close();