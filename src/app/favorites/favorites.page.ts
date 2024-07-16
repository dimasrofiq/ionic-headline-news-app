import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteArticles: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadFavoriteArticles();
  }

  loadFavoriteArticles() {
    this.favoriteArticles = JSON.parse(localStorage.getItem('favoriteArticles') || '[]');
  }

  removeFromFavorites(article:any) {
    // Filter out the article to remove
    this.favoriteArticles = this.favoriteArticles.filter(fav => fav.title !== article.title);
    // Update local storage
    localStorage.setItem('favoriteArticles', JSON.stringify(this.favoriteArticles));
  }
}
