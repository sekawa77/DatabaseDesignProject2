// Creates and adds an inventory into Myffin Urwin's account

import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'name': 'Muffin Urwin'
    }
  }, {
    '$addFields': {
      'inventories': {
        '$mergeObjects': [
          '$inventories', {
            'inventoryName': 'Drink'
          }, {
            'id': 123
          }
        ]
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
await client.close();
console.log("New inventory " + result.map(user => user.inventories.inventoryName) + " was created for Muffin Urwin");
await client.close();