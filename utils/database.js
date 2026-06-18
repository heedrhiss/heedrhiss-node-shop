// const mongodb = require('mongodb')

// const mongoClient = mongodb.MongoClient

// let _db;

// const mongoDB = (callback)=> {
//      // Use local MongoDB for development
//      mongoClient.connect("mongodb+srv://heedrhiss:olowofenira@nodecluster.agoojqm.mongodb.net/?retryWrites=true&w=majority&appName=NodeCluster")
//     .then(client => {        
//         _db = client.db("shop")
//         callback();
//     })
//     .catch(err => {
//         console.error('MongoDB connection error:', err.message)
//     })
// }

// const getDB = () => {
//     if(_db){
//         return _db
//     }else {
//         throw 'No database connected'
//     }
// }

// exports.mongoDB = mongoDB
// exports.getDB = getDB;
