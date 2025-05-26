import { Routes } from '@angular/router';
import {BlogPostComponent} from '../blog-post/blog-post.component';
import {BlogListComponent} from '../blog-list/blog-list.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'post/:id', component: BlogPostComponent }  // Create this component next
];
