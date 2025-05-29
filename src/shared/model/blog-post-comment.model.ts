export interface BlogPostCommentModel {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  date: string;
  avatarImageUrl: string;
}
