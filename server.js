const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const productController = require("./controllers/productController");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://aathisriram8:1234@cluster0.h95vvam.mongodb.net/DressStore?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log(`Connected to MongoDB: ${mongoose.connection.db.databaseName}`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to DressStore application." });
});

app.get("/api/products", productController.getAllProducts);
app.get("/api/products/:id", productController.getProductById);
app.post("/api/products", productController.addProduct);
app.put("/api/products/:id", productController.updateProduct);
app.delete("/api/products/:id", productController.removeProduct);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
