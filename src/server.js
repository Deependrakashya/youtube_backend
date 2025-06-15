import { app } from "./app.js";
import dbConnection from "./db/db.js";
dbConnection()
  .then(() => {
    app.on("Error", (error) => {
      console.log("Error on app ", error);
      process.exit(1);
    }),
      app.listen(process.env.PORT || 8000, () => {
        console.log(`SERVER IS LISTING AT PORT ${process.env.PORT}`);
      });
  })
  .catch((error) => console.error("MongoDB connection error ", error));
