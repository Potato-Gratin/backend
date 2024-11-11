import { UserModel } from '../../models/user';
import supabase from '../../libs/supabase';

jest.mock('../../libs/supabase');

describe('UserModel.create', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('ユーザーが正常に作成される', async () => {
    const mockUser = {
      id: '1',
      display_id: 'test_display_id',
      name: 'test_name',
      description: 'test_description',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
    };

    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockUser, error: null }),
    });

    const result = await UserModel.create('test_display_id', 'test_name', 'test_description');
    expect(result).toEqual(mockUser);
  });

  it('表示IDが重複したときは 409 Conflicted を返す', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: { code: '23505' } }),
    });

    await expect(UserModel.create('test_display_id', 'test_name', 'test_description'))
      .rejects
      .toMatchObject({ status: 409 })
  });

  it('表示IDがなかった場合は 400 Bad Request を返す', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: { code: '23502' } }),
    });

    await expect(UserModel.create('test_display_id', 'test_name', 'test_description'))
      .rejects
      .toMatchObject({ status: 400 });
  });

  it('DBに異常があった場合は 500 Internal Server Error を返す', async () => {
    (supabase.from as jest.Mock).mockReturnValue({
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: { code: '99999', message: 'Unknown error' } }),
    });

    await expect(UserModel.create('test_display_id', 'test_name', 'test_description'))
      .rejects
      .toThrow('Database Error: Unknown error');
  });
});