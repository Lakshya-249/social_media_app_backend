import express from "express";
import router from "./router";
import cors from "cors";
process.loadEnvFile();

console.log(process.loadEnvFile);

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
