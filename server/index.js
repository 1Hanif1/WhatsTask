import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(bodyParser.json({ limit: "2mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.use(cors());

dotenv.config({ path: `./config.env` });
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@freecluster.u0mvojg.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));

// mongoose.set("strictQuery", false);
