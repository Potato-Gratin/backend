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
	getReviewVotes: (): ReviewVote[] => testReviewVotes, // ダミーデータ取得用 (既存コード)
	
	async addOrUpdateVote(review_id: string, user_id: string, score: number) {
	  const { data, error } = await supabase
		.from("review_vote")
		.upsert(
		  {
			review_id,
			user_id,
			score,
		  },
		  { onConflict: "review_id, user_id"}
		)
		.select();
  
	  if (error) {
		throw new Error(`Failed to upsert review score: ${error.message}`);
	  }
  
	  return data[0];
	},
		deleteVote: async (review_id: number, article_id: string, user_id: string) => {
		  // TODO: 削除機能の実装 (未実装)
		},
};
