import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NewsArticlesService } from '../api/news-articles.service';

interface NewsArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  categories: string[] = ['Business', 'Health', 'Technology', 'Sports', 'Science', 'Entertainment']; 

  selectedCategory = 'Business'; // Kategori yang dipilih secara default
  topHeadlines: NewsArticle[] = [];
  filteredArticles: NewsArticle[] = []; // Artikel yang telah difilter
  isLoadingTopHeadlines = true;
  searchQuery = ''; // Query pencarian dari pengguna

  constructor(
    private articleService: NewsArticlesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTopHeadlines();
  }

  loadTopHeadlines() {
    this.articleService.getTopHeadlines().subscribe(
      (results) => {
        this.topHeadlines = results.articles;
        this.filteredArticles = results.articles; // Set filteredArticles ke topHeadlines awal
        this.isLoadingTopHeadlines = false;
        console.log(this.topHeadlines);
      },
      (error) => {
        console.error('Error fetching top headlines:', error);
        this.isLoadingTopHeadlines = false;
      }
    );
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterArticles(category);
  }

  filterArticles(category: string) {
    // Load articles based on selected category
    this.isLoadingTopHeadlines = true; // Set loading state to true
    this.articleService.getArticleByCategory(category).subscribe(
      (results) => {
        this.topHeadlines = results.articles;
        this.filteredArticles = results.articles; // Set filteredArticles ke hasil pencarian berdasarkan kategori
        this.isLoadingTopHeadlines = false; // Set loading state to false
        console.log(`Loaded articles for category '${category}':`, this.topHeadlines);
      },
      (error) => {
        console.error(`Error fetching articles in category '${category}':`, error);
        this.isLoadingTopHeadlines = false; // Set loading state to false
      }
    );
  }

  onLanguageChange(languageCode: string) {
    this.loadArticlesByLanguage(languageCode);
  }
  
  loadArticlesByLanguage(languageCode: string) {
    this.articleService.getArticlesByLanguage(languageCode).subscribe(
      (results) => {
        console.log(`Articles in language '${languageCode}':`, results.articles);
        this.topHeadlines = results.articles;
        this.filteredArticles = results.articles;
      },
      (error) => {
        console.error(`Error fetching articles in language '${languageCode}':`, error);
      }
    );
  }
  
  getDetails(selectedArticle: NewsArticle) {
    const params: NavigationExtras = {
      queryParams: {
        author: selectedArticle.author,
        content: selectedArticle.content,
        description: selectedArticle.description,
        publishedAt: selectedArticle.publishedAt,
        source: selectedArticle.source.name,
        title: selectedArticle.title,
        url: selectedArticle.url,
        urlToImage: selectedArticle.urlToImage
      }
    };
    this.router.navigate(['/detail'], { queryParams: params.queryParams });
  }

  // Method untuk menangani input pencarian
  handleSearchInput() {
    if (this.searchQuery.trim() === '') {
      this.filteredArticles = this.topHeadlines; // Jika query kosong, tampilkan kembali semua artikel
    }
  }

  // Method untuk melakukan pencarian berdasarkan query
  performSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query === '') {
      this.filteredArticles = this.topHeadlines; // Jika query kosong, tampilkan kembali semua artikel
    } else {
      this.filteredArticles = this.topHeadlines.filter(article =>
        (article.title && article.title.toLowerCase().includes(query)) || 
        (article.description && article.description.toLowerCase().includes(query))
      );
    }
  }
}
