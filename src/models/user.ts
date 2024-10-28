import { supabase } from '../libs/supabase'; // supabaseクライアントをインポート

interface User {
  id: string;          // UUID型をstringで表現
  displayId: string;
  name: string;
  description: string;
}

export const UserModel = {
  /**
   * ユーザーを作成する。
   * @param {string} id ユーザーID (UUID形式)
   * @param {string} displayId 表示ID
   * @param {string} name ユーザー名
   * @param {string} description 説明
   * @returns {Promise<string>} 作成したユーザーのID
   * @throws {Error} DB操作に失敗した場合
   */
  create: async (id: string, displayId: string, name: string, description: string): Promise<string> => {
    const { data, error } = await supabase
      .from('user')
      .insert([{ id, displayId, name, description }])
      .select('*');

    if (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
    
    return data ? data[0] : '';  // データが存在する場合のみIDを返す
  }
};
