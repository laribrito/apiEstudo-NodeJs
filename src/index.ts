import express,{Request, Response} from "express";
import { AppDataSource } from './db_connection';
import "reflect-metadata"
import { rotas } from "./routes";

const PORT = process.env.PORT || 3000;
const app = express();


AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => console.log("deu ruim"));

app.use(express.json());
app.use(rotas)

app.listen(PORT, () => {
    console.log(`Server is run in ${PORT}`);
  });
