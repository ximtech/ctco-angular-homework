import {IBlogPostAuthor} from './blog-post-author.model';

export interface IBlogPostItem {
  id: number;
  userId: number;
  title: string;
  body: string;
  date: string;
  imageUrl: string;
}
