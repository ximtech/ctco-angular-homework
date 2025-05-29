import {AfterViewInit, Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgClass} from '@angular/common';
import {BlogHeaderComponent} from '../blog-header/blog-header.component';
import {Popover} from 'bootstrap';
import {BlogApiService} from '../shared/service/blog-api.service';
import {map, Observable} from 'rxjs';
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
export class BlogPostComponent implements AfterViewInit {

  private blogApiService: BlogApiService = inject(BlogApiService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  postId: number = this.route.snapshot.params['id'];
  authorId: number = this.route.snapshot.params['userId'];
  newComment = signal<BlogPostCommentModel | undefined>(undefined);

  currentRating: number = 0;
  hoverRating: number = 0;

  readonly blogPostData$: Observable<IBlogPostItem> = this.blogApiService.getPostById(this.postId);
  readonly blogPostComments$: Observable<BlogPostCommentModel[]> = this.blogApiService.getPostCommentsById(this.postId);
  readonly blogPostAuthorInfo$: Observable<IBlogPostAuthor> = this.blogApiService.getPostAuthorById(this.authorId);

  blogPost = signal(this.blogPostData$);
  authorInfo = signal(this.blogPostAuthorInfo$);
  postComments = computed(() => {
    console.log(this.newComment());
    return this.blogPostComments$.pipe(
      map((comments:BlogPostCommentModel[]) => {
        return comments;
      }));
  });

  ngAfterViewInit(): void {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => new Popover(el, { trigger: 'focus', placement: 'top' }));
  }

  submitComment(formValue: any) {
    this.newComment.set({
      email: formValue.name,
      name: formValue.name,
      postId: this.postId,
      body: formValue.message} as BlogPostCommentModel);
    this.blogApiService.saveNewComment(this.newComment())
      .subscribe(value => console.log(value));
  }

  setRating(rating: number) {
    this.currentRating = rating;
  }

  setHover(rating: number) {
    this.hoverRating = rating;
  }

  clearHover() {
    this.hoverRating = 0;
  }

}
