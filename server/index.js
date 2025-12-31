const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/blogs", require("./routes/blogs"));
app.use("/api/users", require("./routes/users"));
app.use("/api/gemini", require("./routes/gemini"));

app.get("/", (req, res) => {
  res.send("Blog Platform API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
