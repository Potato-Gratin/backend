import supabase from "../libs/supabase";

export type ReviewVote = {
	review_id: number;
	article_id: string;
	user_id: string;
	score: number;
	created_at?: Date;
	updated_at?: Date;
};

const testReviewVotes: ReviewVote[] = [
	{
		review_id: 1,
		article_id: "article-1",
		user_id: "user-1",
		score: 5,
		created_at: new Date(),
		updated_at: new Date(),
	},
	{
		review_id: 2,
		article_id: "article-2",
		user_id: "user-2",
		score: 3,
		created_at: new Date(),
		updated_at: new Date(),
	},
];

export const ReviewVoteModel = {
	getReviewScore: async (reviewId: string, articleId: string) => {
		// 記事が存在するかチェック
		const { data: articleData, error: articleError } = await supabase
			.from("article")
			.select("id")
			.eq("id", articleId)
			.single(); // 一件だけ取得

		if (articleError || !articleData) {
			// 記事が存在しない場合
			return null; // 404 用の null を返す
		}

		const { data, error, count } = await supabase
			.from("review_vote")
			.select("score", { count: "exact" })
			.eq("review_id", reviewId); // 指定されたレビューIDに一致するスコアを取得

		if (error) {
			throw new Error("Failed to fetch review score: ${error.message}");
		}

		// 該当するレビューが存在しない場合
		if (!data || count === 0) {
			return null; // 404 用の null を返す
		}

		// 合計値を計算
		const totalScore = data.reduce((sum, vote) => sum + vote.score, 0);
		return totalScore;
	},
	addOrUpdateVote: (vote: ReviewVote) => {
		// TODO: 実装
	},
	deleteVote: (review_id: number, article_id: string, user_id: string) => {
		// TODO: 実装
	},
};
