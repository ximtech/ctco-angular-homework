import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {BlogHeaderComponent} from '../blog-header/blog-header.component';

@Component({
  selector: 'app-blog-post-create',
  imports: [
    FormsModule,
    NgIf,
    BlogHeaderComponent
  ],
  templateUrl: './blog-post-create.component.html',
  styleUrl: './blog-post-create.component.css'
})
export class BlogPostCreateComponent {

  post = {
    author: '',
    message: '',
    title: 'Test Post'
  };

  submitted = false;

  submitPost() {
    if (this.post.author && this.post.message) {
      console.log('Submitted post:', this.post);
      this.submitted = true;

      // Reset form
      this.post = { author: '', message: '' , title: ''};
    }
  }

}
