import { Routes } from '@angular/router';
import {BlogPostComponent} from '../blog-post/blog-post.component';
import {BlogListComponent} from '../blog-list/blog-list.component';
import {BlogPostCreateComponent} from '../blog-post-create/blog-post-create.component';

export const routes: Routes = [
  { path: '', component: BlogListComponent },
  { path: 'post/:id', component: BlogPostComponent },
  { path: 'create', component: BlogPostCreateComponent }
];
