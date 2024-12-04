import type { Request, Response } from "express";
import { BadgeModel } from "../models/badge";


// PostgrestError型をインポートしてエラー型を明示的に指定する
interface PostgrestError {
    code: string;
    message: string;
}

export const BadgeController = {
	/**
     * バッジを追加する。
     * @param {Request} req リクエストオブジェクト
     * @param {Response} res レスポンスオブジェクト
     */
    createBadge: async (req: Request, res: Response) => {
        try {
            const { reviewId } = req.params; // URL パスパラメータから取得
            const { user_id, badge_flame_id, badge_text_id } = req.body; // リクエストボディから取得

            // バッジを追加
            const badge = await BadgeModel.createBadge(
                reviewId,
                user_id,
                badge_flame_id,
                badge_text_id
            );

            res.status(201).json(badge); // 成功時にバッジを返す
        } catch (error) {
            const e = error as PostgrestError;
            // エラーコードが 23503 の場合、レビューや記事が存在しないエラー
            if (e.code === "23503") {
                res.status(404).json({
                    error: "Article or Review not found.", // 外部キー制約違反（記事またはレビューが存在しない場合）
                });
            } else {
                res.status(500).json({ error: "Internal Server Error" }); // 予期しないエラーを処理
            }
        }
    },
	getBadgesByReview: (req: Request, res: Response) => {
		const { articleId, reviewId } = req.params;
		const badges = BadgeModel.getBadgesByReview(
			articleId,
			Number.parseInt(reviewId),
		);
		res.status(200).json(badges);
	},
	getReceivedBadges: (req: Request, res: Response) => {
		const { displayId } = req.params;
		const badges = BadgeModel.getReceivedBadges(displayId);
		res.status(200).json(badges);
	},
	getSentBadges: (req: Request, res: Response) => {
		const { displayId } = req.params;
		const badges = BadgeModel.getSentBadges(displayId);
		res.status(200).json(badges);
	},
};
