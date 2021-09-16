import { MongoClient } from 'mongodb'

const atlasConn = () => {

}
const uri = "mongodb+srv://lankadb:gynkJMmuQE2J45u@cluster0.qifx3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

export default atlasConn