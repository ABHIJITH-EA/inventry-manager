const path = require("path")
const express = require("express");

const product = require("./routes/store");
const warehouse = require("./routes/warehouse");
const stock = require("./routes/stocks");

const connectDB = require("./db/connect")

require('dotenv').config()

const app = express()

const PORT = 3000 || process.env.PORT;
const localhost = "127.0.0.1";

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile("./public/index.html")
});

// app.get("/warehouse", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public", "warehouse.html"));
// });

// app.get("/stock", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public", "stock.html"));
// });

app.use("/api/v1/tasks",product)
app.use("/api/v1/warehouse", warehouse)
app.use("/api/v1/stock", stock)

const start = async () => {
    try {
        await connectDB(process.env.URI);
        app.listen(PORT, ()=> {
            console.log(`Started at http://${localhost}:${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

start()