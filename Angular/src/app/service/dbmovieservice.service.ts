import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class DbmoviesService {

  moviesSortedByUser: Movie[]=[];
  sortedCriteria: String='';

  private movieListUrl = 'https://api.themoviedb.org/3/account/20163434/favorite/movies'; 
  private accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWM3YWVkYjk1YjRmYWQ0NjNkNmNhYjRmZTgwYTc4OSIsInN1YiI6IjY0YjRmZGFiMGU0ZmM4NTFhMGY0NDdkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GaTEqZciDUH7ENrNUOGVgeH7Lk_ZJiED1ovFv-QY3ws';

  constructor(private http: HttpClient) { }


  setMoviesByUser(movies: Movie[]) {
    this.moviesSortedByUser = movies;
  }
  getMoviesByUser() {
    return this.moviesSortedByUser;
  }

  setSortedCriteria(criteria: String) {
    this.sortedCriteria = criteria;
  }
  getSortedCriteria(){
    return this.sortedCriteria;
  }



  getFilms(): Observable<Movie[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.get<Movie[]>(this.movieListUrl, { headers });
  }
}