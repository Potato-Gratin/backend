import { Request, Response } from 'express';
import { UserModel } from '../models/UserModel';

export const UserController = {
  /**
   * 新しいユーザーを作成する
   * @param req 
   * @param res 
   */
  createUser: async (req: Request, res: Response) => {
    try {
      const { displayId, name, description } = req.body.user;

      // リクエストデータのバリデーション
      if (!displayId) {
        return res.status(400).json({ message: 'displayId is required' });
      }
      if (!name) {
        return res.status(400).json({ message: 'name is required' });
      }

      // ユーザー作成処理
      const userId = await UserModel.create(displayId, name, description);
      
      //ここのリダイレクト先ホーム画面のパスがわからん
      return res.status(201).redirect(`/index`);
    } catch (error: any) {
      // エラーハンドリング
      if (error.message === 'displayId is conflicted') {
        return res.status(409).json({ message: error.message });
      } else if (error.message === 'displayId is required' || error.message === 'name is required') {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(500).json({
          message: 'ユーザーの作成に失敗しました',
          error: error.message,
        });
      }
    }
  },
};
