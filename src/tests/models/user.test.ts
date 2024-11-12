import { UserModel, User } from '../../models/user';
import supabase from '../../libs/supabase';

const testDisplayId = 'test_display_id';

describe('UserModel', () => {
  beforeEach(async () => {
    await supabase.from('user').delete().eq('display_id', testDisplayId);
  });

  afterEach(async () => {
    await supabase.from('user').delete().eq('display_id', testDisplayId);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const user = await UserModel.create(testDisplayId, 'test_name', 'test_description');
      expect(user).toMatchObject({
        display_id: testDisplayId,
        name: 'test_name',
        description: 'test_description'
      });
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('created_at');
      expect(user).toHaveProperty('updated_at');
    });

    it('should throw an error if display_id is conflicted', async () => {
      await UserModel.create(testDisplayId, 'test_name', 'test_description');
      await expect(UserModel.create(testDisplayId, 'test_name', 'test_description'))
        .rejects
        .toThrow('displayId is conflicted');
    });

    it('should throw an error if display_id is required', async () => {
      await expect(UserModel.create('', 'test_name', 'test_description'))
        .rejects
        .toThrow('displayId is required');
    });

    it('should throw a generic database error', async () => {
      // このテストは実際のデータベースエラーを引き起こすための特別な設定が必要です
      await expect(UserModel.create(testDisplayId, 'test_name', 'test_description'))
        .rejects
        .toThrow('Database Error: some database error');
    });
  });
});
