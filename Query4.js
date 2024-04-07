// All users that have a reminder for an item within 3 days

import { MongoClient } from 'mongodb';
import { userInfo } from 'os';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const filter = {
  'inventories.items.reminders.daysTillPurchase': {
    '$lte': 3
  }
};

const client = await MongoClient.connect(
  'mongodb://localhost:27017/'
);
const coll = client.db('Project2').collection('UserAccounts');
const cursor = coll.find(filter);
const result = await cursor.toArray();

console.log("There are " + result.length + " users that have a reminder for an item within 3 days.");
console.log("They are " + result.map(user => user.name));
await client.close();