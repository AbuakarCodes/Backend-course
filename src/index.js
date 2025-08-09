import dotenv from "dotenv";
dotenv.config();
import { connect_DB } from "./db/_ConnectDB.js";
import { app } from "./_App.js";
import { standardApi_Response } from "./utils/_ApiResponseClass.js";

connect_DB()
    .then(() => app.listen(process.env.PORT))
    .catch(error => console.log("DB Coonection error cant Start that app", error))


