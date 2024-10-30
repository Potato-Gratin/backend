import express from "express";
import userRouter from "./routes/user"; 

const app = express();
app.use(express.json());

// `/users`ルートでユーザー関連のAPIを提供
app.use("/users", userRouter);

export default app;
