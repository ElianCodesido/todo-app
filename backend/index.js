import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import listRoutes from "./routes/listRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

//connect routes
app.use("/todos", todoRoutes);
app.use("/lists", listRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
