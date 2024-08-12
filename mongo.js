
const express = require("express");
const { MongoClient } = require("mongodb"); 
const bodyParser = require("body-parser");


const app = express();
const port = 4055;

app.use(bodyParser.urlencoded({ extended: true }));


const mongoUrl = "mongodb://localhost:27017";
const dbName = "mydatabase";
let db; 
MongoClient.connect(mongoUrl)
    .then((client) => {
        db = client.db(dbName); 
        console.log(`Connected to MongoDB: ${dbName}`);
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/insert", async (req, res) => {
    const { name, email, password } = req.body;
    if (!db) {
        res.status(500).send("Database not initialized"); 
        return;
    }
    try {
        await db.collection("items").insertOne({ name, email, password });
        console.log("Number of documents inserted: " + name);
        res.redirect("/"); 
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Failed to insert data");
    }
});


app.get("/report", async (req, res) => {
  try {
    const items = await db.collection("items").find().sort({ name: 1 }).toArray(); 
      console.log(items);

      let tableContent = `<!DOCTYPE html>
      <html>
      <head>
        <title>Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
        
          .container {
            width: 80%;
            max-width: 1000px;
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
        
          h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
          }
        
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            font-size: 16px;
          }
        
          th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
          }
        
          th {
            background-color: #f8f8f8;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
        
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
        
          tr:hover {
            background-color: #f1f1f1;
          }
        
          .action-links {
            display: flex;
            gap: 10px;
          }
        
          .action-links a {
            padding: 8px 12px;
            background-color: #007bff;
            color: #fff;
            border-radius: 4px;
            text-decoration: none;
            transition: background-color 0.3s;
          }
        
          .action-links a:hover {
            background-color: #0056b3;
          }

          .back-link {
            display: block;
            width: fit-content;
            margin: 20px auto 0;
            padding: 10px 20px;
            background-color: #28a745;
            color: #fff;
            border-radius: 4px;
            text-decoration: none;
            text-align: center;
            transition: background-color 0.3s;
          }

          .back-link:hover {
            background-color: #218838;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Report</h1>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th colspan="2">Actions</th>
            </tr>`;
      tableContent += items.map(item => 
          `<tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.password}</td>
            <td class="action-links">
              <a href="http://localhost:4055/edit/${item._id}">Update</a>
              <a href="http://localhost:4055/delete/${item._id}">Delete</a>
            </td>
          </tr>`).join("");
      tableContent += `</table>
          <a href="/" class="back-link">Back to form</a>
        </div>
      </body>
      </html>`; 
      res.send(tableContent); 
  } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).send("Failed to fetch data");
  }
});
app.get("/edit/:id",(req,res)=>{
    res.sendFile(__dirname + "/update.html");
});
app.post("/update/:id",async(req,res)=>{
    try{
        var id = req.params.id;
        const {name,email,password} = req.body;
        await db.collection("items").updateOne({'_id':new ObjectId(id) },{$set:{name,email,password}});
        res.redirect('/report');
    }
    catch(err){
        console.error("Error fetching data:", err);
        res.status(500).send("Failed to update data");
    }
});

app.get("/delete/:id",async(req,res)=>{
    try{
        var id = req.params.name;
        await db.collection("items").deleteOne({'_id':new ObjectId(id) });
        res.redirect('/report');
    }
    catch(err){
        console.error("Error deleting data:", err);
        res.status(500).send("Failed to delete data");
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});