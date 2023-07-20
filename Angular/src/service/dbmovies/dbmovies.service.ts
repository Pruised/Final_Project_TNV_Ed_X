import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '';

@Injectable({
  providedIn: 'root'
})
export class DbmoviesService {

  private movieList = 'https://api.themoviedb.org/3/account/20163434/favorite/movies'; 


  constructor(private http: HttpClient) { }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.movieList);
  }
}
