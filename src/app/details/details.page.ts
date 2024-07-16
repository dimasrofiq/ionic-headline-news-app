import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  author: any;
  title: any;
  content: any;
  description: any;
  publishedAt: any;
  url: any;
  image: any;
  source: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.author = params['author'];
      this.title = params['title'];
      this.content = params['content'];
      this.description = params['description'];
      this.publishedAt = params['publishedAt'];
      this.url = params['url'];
      this.image = params['urlToImage'];
      this.source = params['source'];
    });
  }

  addToFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favoriteArticles') || '[]') as any[];
    const article = {
      title: this.title,
      author: this.author,
      description: this.description,
      publishedAt: this.publishedAt,
      url: this.url,
      image: this.image,
      source: this.source
    };
    favorites.push(article);
    localStorage.setItem('favoriteArticles', JSON.stringify(favorites));
  }
}
