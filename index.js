const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ym44y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const projectCollection = client
      .db("sayed-portfolio")
      .collection("projects");
    console.log("Mongo is running>>>>>>");

    app.get("/projects", async (req, res) => {
      const projects = await projectCollection.find().toArray();
    //   console.log(projects);
      res.send(projects);
    });
   

    app.get("/project/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const project = await projectCollection.findOne(query);
      res.send(project);
    });
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from Mohammed Sayed Portfolio!");
});

app.listen(port, () => {
  console.log(`Portfolio app listening on port: ${port}`);
});
