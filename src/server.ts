import express, { Request, Response } from "express";
import connectToDatabase from "./db";
import userRoutes from './routes/user-routes';
import categoryRoutes from "./routes/category-routes";
import taskRoutes from "./routes/task-routes";

const app = express();

//to parse incoming data
app.use(express.json())

const PORT = 3000;

connectToDatabase()

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong');
});

app.use("/api/user", userRoutes)

app.use("/api/category", categoryRoutes)

app.use("/api/tasks", taskRoutes)

app.listen(PORT, () => {
    console.log("Server is Up and running")
});
