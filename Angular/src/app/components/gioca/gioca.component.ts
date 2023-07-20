import { Component, OnInit } from '@angular/core';
import { DbmoviesService } from '../../service/dbmovieservice.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-gioca',
  templateUrl: './gioca.component.html',
  styleUrls: ['./gioca.component.scss']
})
export class GiocaComponent implements OnInit {

  movies: Movie[] | undefined;

  constructor(private dbmoviesService: DbmoviesService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.dbmoviesService.getFilms().subscribe({
      next: (response: any) => {
        this.movies = response.results;
        console.log('Dati recuperati dall\'API:', this.movies);
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel recupero dei film:', error);
      }
    });
  }
}
