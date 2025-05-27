import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-blog-header',
  imports: [
    RouterLink, RouterLinkActive
  ],
  templateUrl: './blog-header.component.html',
  styleUrl: './blog-header.component.css'
})
export class BlogHeaderComponent {

  isBlogListPage = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      this.isBlogListPage = this.router.url === '/' || this.router.url === ''; // show create blog post only at home page
    })
  }

}
