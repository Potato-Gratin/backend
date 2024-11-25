import cors from "cors";
import { articleRouter } from "./routes/article";
import { badgeRouter } from "./routes/badge";
import { badgeFlameRouter } from "./routes/badge_flame";
import { badgeTextRouter } from "./routes/badge_text";
import { favoriteRouter } from "./routes/favorite";
import { reviewRouter } from "./routes/review";
import { reviewVoteRouter } from "./routes/review_vote";
import { userRouter } from "./routes/user";
import "dotenv/config";

import express from "express";
const app: express.Express = express();
const port = 5000;

app.use(cors());

app.use("/users", userRouter);
app.use("/articles", articleRouter);
app.use("/favorites", favoriteRouter);
app.use("/reviews", reviewRouter);
app.use("/review_votes", reviewVoteRouter);
app.use("/badges", badgeRouter);
app.use("/badge_flames", badgeFlameRouter);
app.use("/badge_texts", badgeTextRouter);

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
