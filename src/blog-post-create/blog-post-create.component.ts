import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BlogHeaderComponent} from '../blog-header/blog-header.component';
import {IBlogPostAuthor} from '../shared/model/blog-post-author.model';
import {IBlogPostItem} from '../shared/model/blog-post.model';
import {BlogApiService} from '../shared/service/blog-api.service';

@Component({
  selector: 'app-blog-post-create',
  imports: [
    FormsModule,
    BlogHeaderComponent
  ],
  templateUrl: './blog-post-create.component.html',
  styleUrl: './blog-post-create.component.css'
})
export class BlogPostCreateComponent {

  private blogApiService: BlogApiService = inject(BlogApiService);

  post: IBlogPostItem = {} as IBlogPostItem;
  author: IBlogPostAuthor = {} as IBlogPostAuthor;
  submitted: boolean = false;

  submitPost() {
    if (this.author.email && this.post.body && this.post.title) {
      console.log('Submitted post:', this.post);
      this.post.userId = 1;
      this.blogApiService.saveNewBlogPost(this.post).subscribe();
      this.post = { body: '', title: ''} as IBlogPostItem;  // Reset form
      this.submitted = true;
    }
  }

}
