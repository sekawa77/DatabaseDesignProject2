// Count the number of items Caryl Leming has in their inventory

import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'name': 'Caryl Leming'
    }
  }, {
    '$project': {
      'inventories': 1
    }
  }, {
    '$unwind': {
      'path': '$inventories'
    }
  }, {
    '$project': {
      'itemCount': {
        '$size': {
          '$objectToArray': '$inventories.items'
        }
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

console.log("Caryl Leming has " + result[0].itemCount + " items in her inventory");
await client.close();