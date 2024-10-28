import { Request, Response } from 'express';
import { UserModel } from '../models/user';

// POST /users コントローラー
export const createUser = async (req: Request, res: Response) => {
  const {displayId, name, description } = req.body;

 // リクエストデータのバリデーション
if (!displayId) {
    return res.status(400).json({
      message: 'displayId is required'
    });
  }
  
  if (!name) {
    return res.status(400).json({
      message: 'name is required'
    });
  }
  
  try {
    // displayIdの重複チェック
    const existingUser = await UserModel.findByDisplayId(displayId);
    if (existingUser) {
      return res.status(409).json({
        message: 'displayId is conflicted'
      });
    }

    // ユーザー作成
    const userId = await UserModel.create(displayId, name, description);

    // 成功レスポンス（201 Createdとともに、作成されたユーザーのURIを返す）
    res.status(201).json({
      message: 'ユーザーが作成されました',
      userId,
      userUri: `/users/${displayId}`
    });
  } catch (error) {
    // DB操作中のエラーハンドリング
    res.status(500).json({
      message: 'ユーザーの作成に失敗しました',
      error: error.message,
    });
  }
};
