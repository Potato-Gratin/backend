export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
	public: {
		Tables: {
			article: {
				Row: {
					content: string | null;
					created_at: string;
					id: string;
					is_public: boolean;
					published_at: string | null;
					title: string | null;
					updated_at: string;
					user_id: string;
					view_count: number;
				};
				Insert: {
					content?: string | null;
					created_at?: string;
					id?: string;
					is_public?: boolean;
					published_at?: string | null;
					title?: string | null;
					updated_at?: string;
					user_id?: string;
					view_count?: number;
				};
				Update: {
					content?: string | null;
					created_at?: string;
					id?: string;
					is_public?: boolean;
					published_at?: string | null;
					title?: string | null;
					updated_at?: string;
					user_id?: string;
					view_count?: number;
				};
				Relationships: [
					{
						foreignKeyName: "article_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					},
				];
			};
			badge: {
				Row: {
					badge_flame_id: string | null;
					badge_text_id: string | null;
					created_at: string;
					id: string;
					review_id: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					badge_flame_id?: string | null;
					badge_text_id?: string | null;
					created_at?: string;
					id?: string;
					review_id?: string;
					updated_at?: string;
					user_id?: string;
				};
				Update: {
					badge_flame_id?: string | null;
					badge_text_id?: string | null;
					created_at?: string;
					id?: string;
					review_id?: string;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "badge_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_badge_flame";
						columns: ["badge_flame_id"];
						isOneToOne: false;
						referencedRelation: "badge_flame";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "fk_badge_text";
						columns: ["badge_text_id"];
						isOneToOne: false;
						referencedRelation: "badge_text";
						referencedColumns: ["id"];
					},
				];
			};
			badge_flame: {
				Row: {
					id: string;
					price: number;
				};
				Insert: {
					id?: string;
					price: number;
				};
				Update: {
					id?: string;
					price?: number;
				};
				Relationships: [];
			};
			badge_text: {
				Row: {
					context: string;
					id: string;
				};
				Insert: {
					context: string;
					id?: string;
				};
				Update: {
					context?: string;
					id?: string;
				};
				Relationships: [];
			};
			favorite: {
				Row: {
					article_id: string;
					created_at: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					article_id?: string;
					created_at?: string;
					updated_at?: string;
					user_id?: string;
				};
				Update: {
					article_id?: string;
					created_at?: string;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "favorite_article_id_fkey";
						columns: ["article_id"];
						isOneToOne: false;
						referencedRelation: "article";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "favorite_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					},
				];
			};
			review: {
				Row: {
					article_id: string;
					content: string;
					created_at: string;
					id: string;
					parent_article_id: string | null;
					parent_review_id: string | null;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					article_id?: string;
					content: string;
					created_at?: string;
					id?: string;
					parent_article_id?: string | null;
					parent_review_id?: string | null;
					updated_at?: string;
					user_id?: string;
				};
				Update: {
					article_id?: string;
					content?: string;
					created_at?: string;
					id?: string;
					parent_article_id?: string | null;
					parent_review_id?: string | null;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "review_article_id_fkey";
						columns: ["article_id"];
						isOneToOne: false;
						referencedRelation: "article";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "review_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					},
				];
			};
			review_vote: {
				Row: {
					created_at: string;
					review_id: string;
					score: number;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					review_id?: string;
					score: number;
					updated_at?: string;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					review_id?: string;
					score?: number;
					updated_at?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "review_vote_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "user";
						referencedColumns: ["id"];
					},
				];
			};
			user: {
				Row: {
					created_at: string;
					description: string | null;
					display_id: string;
					id: string;
					name: string;
					updated_at: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					display_id?: string;
					id?: string;
					name?: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					display_id?: string;
					id?: string;
					name?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;
