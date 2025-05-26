import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-blog-list',
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css'
})
export class BlogListComponent {

  posts = [
    {
      title: 'AI-Powered Siri Unveiled at WWDC',
      date: 'May 20, 2025',
      description: 'Apple revealed a privacy-focused, on-device AI overhaul of Siri at WWDC 2025.',
      image: 'https://source.unsplash.com/featured/?apple,ai',
      link: '/post/1'
    },
    {
      title: 'Google Gemini 2 Goes Multimodal',
      date: 'May 18, 2025',
      description: 'Gemini 2 introduces real-time image and code understanding with improved accuracy.',
      image: 'https://source.unsplash.com/featured/?google,gemini',
      link: '/post/2'
    },
    {
      title: 'ChatGPT Gets Memory and Voice',
      date: 'May 15, 2025',
      description: 'OpenAI rolls out long-term memory and natural voice interaction to ChatGPT Pro users.',
      image: 'https://source.unsplash.com/featured/?openai,chatgpt',
      link: '/post/3'
    }
  ];

}
