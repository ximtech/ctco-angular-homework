import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {BlogHeaderComponent} from '../blog-header/blog-header.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  imports: [
    RouterLink,
    BlogHeaderComponent,
    FormsModule,
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {

  searchTerm = '';
  sortOption = 'date-desc';

  posts = [
    {
      title: 'AI-Powered Siri Unveiled at WWDC',
      author: 'Emily Chen',
      date: 'May 20, 2025',
      description: 'Apple revealed a privacy-focused, on-device AI overhaul of Siri at WWDC 2025.',
      image: 'https://source.unsplash.com/featured/?apple,ai',
      link: '/post/1'
    },
    {
      title: 'Google Gemini 2 Goes Multimodal',
      date: 'May 18, 2025',
      author: 'Mark Jensen',
      description: 'Gemini 2 introduces real-time image and code understanding with improved accuracy.',
      image: 'https://source.unsplash.com/featured/?google,gemini',
      link: '/post/2'
    },
    {
      title: 'ChatGPT Gets Memory and Voice',
      date: 'May 15, 2025',
      author: 'Samantha Ray',
      description: 'OpenAI rolls out long-term memory and natural voice interaction to ChatGPT Pro users.',
      image: 'https://source.unsplash.com/featured/?openai,chatgpt',
      link: '/post/3'
    }
  ];

  get filteredAndSortedPosts() {
    let filtered = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    switch (this.sortOption) {
      case 'title-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      default: // 'date-desc'
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    return filtered;
  }

}
