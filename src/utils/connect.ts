import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const connect = () => {
  const db_uri = config.get<string>("db_uri");
  //   console.log(db_uri);
  mongoose.set("strictQuery", false);
  return mongoose
    .connect(db_uri)
    .then(() => {
      console.log("Connected to our db");
    })
    .catch((err) => {
      console.log("could not connect to db\n", err);
      //
      process.exit(1);
      // It can be either 0 or 1. 0 means end the
      // process without any kind of failure and 1
      // means end the process with some failure
    });
};
const connect_async = async () => {
  const db_uri = config.get<string>("db_uri");
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(db_uri);
    log.info("Connected to DB");
    // console.log("Connected to the DB");
  } catch (error) {
    log.error("couldnt connect to the DB");
    // console.error("couldnt connect to the DB");
    // console.log(error);
    process.exit(1);
  }
};

export { connect, connect_async };
