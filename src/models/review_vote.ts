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
	getReviewVotes: (): ReviewVote[] => testReviewVotes,
	addOrUpdateVote: (vote: ReviewVote) => {
		// TODO: 実装
	},
	deleteVote: async (review_id: number, user_id: string): Promise<void> => {
		const { error } = await supabase
		  .from("review_vote")
		  .delete()
		  .match({ review_id, user_id }); 
	  
		if (error) {
		  throw new Error("Failed to delete review vote.");
		}
	  },
};
