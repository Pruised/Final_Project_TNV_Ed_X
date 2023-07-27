import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class DbmoviesService {

  moviesSortedByUser: Movie[]=[];
  sortedCriteria: string='';

  private movieUrl='https://api.themoviedb.org/3/movie';
  private movieListUrl = 'https://api.themoviedb.org/3/account/20163434/favorite/movies'; 
  private accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWM3YWVkYjk1YjRmYWQ0NjNkNmNhYjRmZTgwYTc4OSIsInN1YiI6IjY0YjRmZGFiMGU0ZmM4NTFhMGY0NDdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GaTEqZciDUH7ENrNUOGVgeH7Lk_ZJiED1ovFv-QY3ws';

  constructor(private http: HttpClient) { 
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const storedMovies = localStorage.getItem('moviesSortedByUser');
    if (storedMovies) {
      this.moviesSortedByUser = JSON.parse(storedMovies);
    }

    const storedCriteria = localStorage.getItem('sortedCriteria');
    if (storedCriteria) {
      this.sortedCriteria = storedCriteria;
    }
  }
  saveToLocalStorage() {
    localStorage.setItem('moviesSortedByUser', JSON.stringify(this.moviesSortedByUser));
    localStorage.setItem('sortedCriteria', this.sortedCriteria);
  }

  setMoviesByUser(movies: Movie[]) {
    this.moviesSortedByUser = movies;
    this.saveToLocalStorage(); 
  }
  getMoviesByUser() {
    return this.moviesSortedByUser;
    
  }

  setSortedCriteria(criteria: string) {
    this.sortedCriteria = criteria;
    this.saveToLocalStorage();
  }
  getSortedCriteria(){
    return this.sortedCriteria;
  }

  getMovies(): Observable<Movie[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Movie[]>(this.movieListUrl, { headers });
  }

  getMovie(id: number): Observable<Movie> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Movie>(`${this.movieUrl}/${id}`, { headers });
  }
}