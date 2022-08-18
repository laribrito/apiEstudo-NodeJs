import express,{Request, Response} from "express";
import { AppDataSource } from './db_connection';
import "reflect-metadata"

const PORT = process.env.PORT || 3000;
const app = express();


AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => console.log("deu ruim"));

app.get("/", (req: Request, res: Response)=>(
    res.json(
        {
            msg: "alo"
        }
    )
))

app.listen(PORT, () => {
    console.log(`Server is run in ${PORT}`);
  });
