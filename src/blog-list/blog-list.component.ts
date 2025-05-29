import {Component, computed, effect, inject, model, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgForOf} from '@angular/common';
import {BlogHeaderComponent} from '../blog-header/blog-header.component';
import {FormsModule} from '@angular/forms';
import {BlogApiService} from '../shared/service/blog-api.service';
import {map, Observable} from 'rxjs';
import {IBlogPostItem} from '../shared/model/blog-post.model';
import {IBlogPostAuthor} from '../shared/model/blog-post-author.model';
import {toSignal} from '@angular/core/rxjs-interop';

const MAX_BLOG_POST_TITLE_LENGTH: number = 50;
const SEARCH_INPUT_TEXT_MIN_LENGTH: number = 3;

@Component({
  selector: 'app-blog-list',
  imports: [
    RouterLink,
    BlogHeaderComponent,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {

  private blogApiService: BlogApiService = inject(BlogApiService);

  sortOption = signal<string>('date-desc');
  searchTerm = signal<string>('');

  postList = computed(() => {
    const sort = this.sortOption();
    const textInput = this.searchTerm();

    return this.blogApiService.listOfBlogs$.pipe(
      map((blogs: IBlogPostItem[]) => {
        blogs.forEach(item => {
          if (item.body.length > MAX_BLOG_POST_TITLE_LENGTH) {  // abbreviate long text
            item.body = item.body.substring(0, MAX_BLOG_POST_TITLE_LENGTH) + '...';
          }})

        let filtered = blogs.filter(post =>
          post.title.toLowerCase().includes(textInput.toLowerCase())
        );

        if (sort === 'date-asc') {
          filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        } else { // 'date-desc'
          filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        }
        return filtered;
      }),
    );
  });

  authors = signal<Observable<IBlogPostAuthor[]>>(this.blogApiService.listOfAuthors$);

  findPostAuthor(authors: IBlogPostAuthor[] | null, post: IBlogPostItem) {
    return authors !== null ? authors.find((author: IBlogPostAuthor) => author.id == post.userId) : null;
  }

  onOptionSelect(event: any) {
    this.sortOption.set(event.target.value);
  }

  onSearchInputSet(event: any) {
    if (event.target.value.length >= SEARCH_INPUT_TEXT_MIN_LENGTH || event.target.value.length == 0) {
      this.searchTerm.set(event.target.value);
    }
  }

}
