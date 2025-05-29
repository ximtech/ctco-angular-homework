import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {IBlogPostItem} from '../model/blog-post.model';
import {IBlogPostAuthor} from '../model/blog-post-author.model';
import {BlogPostCommentModel} from '../model/blog-post-comment.model';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  private http = inject(HttpClient)

  readonly listOfBlogs$: Observable<IBlogPostItem[]> = this.http.get<IBlogPostItem[]>('/api/blog/posts');
  readonly listOfAuthors$: Observable<IBlogPostAuthor[]> = this.http.get<IBlogPostAuthor[]>('/api/blog/post/authors')

  getPostById(postId: number): Observable<IBlogPostItem> {
    return this.http.get<IBlogPostItem>(`/api/blog/${postId}/post`).pipe(
      tap((values) => console.log(values))
    );
  }

  getPostAuthorById(userId: number): Observable<IBlogPostAuthor> {
    return this.http.get<IBlogPostAuthor>(`/api/blog/post/${userId}/author`).pipe(
      tap((values) => console.log(values))
    );
  }

  getPostCommentsById(postId: number): Observable<BlogPostCommentModel[]> {
    return this.http.get<BlogPostCommentModel[]>(`/api/blog/post/${postId}/comments`).pipe(
      tap((values) => console.log(values))
    );
  }

  saveNewBlogPost(post: IBlogPostItem) {
    return this.http.post(`/api/blog/post`, post);
  }

  saveNewComment(comment: BlogPostCommentModel | undefined){
    return this.http.post(`/api/blog/post/comment`, comment);
  }

}
