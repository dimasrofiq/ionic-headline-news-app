import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsArticlesService {

  constructor(private httpClient: HttpClient) { }
  
  selectedCategory = "business"; // default category
  topHeadlines = [];

  getTopHeadlines(): Observable<any> {
    return this.httpClient.get(`${environment.url_base}/top-headlines?country=in&apiKey=${environment.api_key}`);
  }

  getArticleByCategory(category: string): Observable<any> {
    return this.httpClient.get(`${environment.url_base}/top-headlines?country=in&category=${category}&apiKey=${environment.api_key}`);
  }

  searchNews(query: string): Observable<any> {
    return this.httpClient.get(`${environment.url_base}/everything?q=${query}&apiKey=${environment.api_key}`);
  }
  getArticlesByLanguage(languageCode: string): Observable<any> {
    return this.httpClient.get(`${environment.url_base}/top-headlines?language=${languageCode}&apiKey=${environment.api_key}`);
  }
  
  
}
