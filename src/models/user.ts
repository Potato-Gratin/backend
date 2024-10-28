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
  create: async (displayId: string, name: string, description: string): Promise<string> => {
    const { data, error } = await supabase
      .from('user')
      .insert([{displayId, name, description }])
      .select('*');
    
    return {data, error};  // データが存在する場合のみIDを返す
  }
};
