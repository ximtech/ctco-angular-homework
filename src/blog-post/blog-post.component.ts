import {AfterViewInit, Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgClass} from '@angular/common';
import {BlogHeaderComponent} from '../blog-header/blog-header.component';
import {Popover} from 'bootstrap';
import {BlogApiService} from '../shared/service/blog-api.service';
import {Observable} from 'rxjs';
import {IBlogPostItem} from '../shared/model/blog-post.model';
import {BlogPostCommentModel} from '../shared/model/blog-post-comment.model';
import {IBlogPostAuthor} from '../shared/model/blog-post-author.model';

@Component({
  selector: 'app-blog-post',
  imports: [
    FormsModule,
    BlogHeaderComponent,
    NgClass,
    AsyncPipe
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements OnInit, AfterViewInit {

  private blogApiService: BlogApiService = inject(BlogApiService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  postId: number = this.route.snapshot.params['id'];
  authorId: number = this.route.snapshot.params['userId'];
  currentRating: number = 0;
  hoverRating: number = 0;

  readonly blogPostData$: Observable<IBlogPostItem> = this.blogApiService.getPostById(this.postId);
  readonly blogPostComments$: Observable<BlogPostCommentModel[]> = this.blogApiService.getPostCommentsById(this.postId);
  readonly blogPostAuthorInfo$: Observable<IBlogPostAuthor> = this.blogApiService.getPostAuthorById(this.authorId);

  blogPost = signal(this.blogPostData$);
  authorInfo = signal(this.blogPostAuthorInfo$);
  postComments = signal<BlogPostCommentModel[]>([]);

  ngOnInit(): void {
    this.postComments.update((items: BlogPostCommentModel[]) => {
      this.blogPostComments$.subscribe((values: BlogPostCommentModel[]) => Array.prototype.push.apply(items, values));
      return items;
    });
  }

  ngAfterViewInit(): void {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => new Popover(el, { trigger: 'focus', placement: 'top' }));
  }

  submitComment(formValue: any): void {
    this.postComments.update((items: BlogPostCommentModel[]) => {
      const newComment = {
        email: formValue.name,
        name: formValue.name,
        postId: this.postId,
        avatarImageUrl: 'https://avatar.iran.liara.run/public',
        body: formValue.message} as BlogPostCommentModel

      this.blogApiService.saveNewComment(newComment)
        .subscribe(value => console.log(value));
      return [...items, newComment] as BlogPostCommentModel[]
    });
  }

  setRating(rating: number): void {
    this.currentRating = rating;
  }

  setHover(rating: number): void {
    this.hoverRating = rating;
  }

  clearHover(): void {
    this.hoverRating = 0;
  }

}
