import {AfterViewInit, Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {BlogHeaderComponent} from '../blog-header/blog-header.component';
import {Popover} from 'bootstrap';

@Component({
  selector: 'app-blog-post',
  imports: [
    FormsModule,
    NgForOf,
    BlogHeaderComponent,
    NgClass,
    NgIf
  ],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.css'
})
export class BlogPostComponent implements AfterViewInit {

  currentRating: number = 0;
  hoverRating: number = 0;

  authorInfo = {
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    bio: 'Technology journalist covering AI, startups, and Apple for over a decade.',
    twitter: '@emilychen'
  };

  post = {
    id: 1,
    title: 'AI-Powered Siri Unveiled at WWDC',
    date: 'May 20, 2025',
    author: 'Emily Chen',
    content: [
      'At WWDC 2025, Apple showcased a dramatically improved version of Siri, powered by cutting-edge generative AI. The upgraded assistant can now summarize articles, send intelligent replies, and perform multi-step actions — all processed privately on-device.',
      '“This is a new era for personal AI,” said Tim Cook. The new Siri will launch in iOS 19 and macOS 15 later this year.',
      'Apple emphasized privacy and user control, with AI features built on-device and not shared with cloud servers, setting itself apart from competitors like Google and OpenAI.'
    ],
    image: 'https://source.unsplash.com/featured/?apple,ai'
  };

  comments = [
    {
      author: 'John Doe',
      date: 'May 21, 2025',
      content: 'This is a huge leap for voice assistants. Can’t wait to try it on my iPhone!'
    },
    {
      author: 'Sara T.',
      date: 'May 21, 2025',
      content: 'I love that they’re doing everything on-device. Big win for privacy.'
    }
  ];

  newComment = {
    name: '',
    message: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => new Popover(el, { trigger: 'focus', placement: 'top' }));
  }

  submitComment() {
    if (this.newComment.name && this.newComment.message) {
      this.comments.push({
        author: this.newComment.name,
        date: new Date().toLocaleDateString(),
        content: this.newComment.message
      });
      this.newComment = { name: '', message: '' };
    }
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
