import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { DbmoviesService } from 'src/app/service/dbmovieservice.service';

@Component({
  selector: 'tnv-game-results-item-details',
  templateUrl: './game-results-item-details.component.html',
  styleUrls: ['./game-results-item-details.component.scss']
})
export class GameResultsItemDetailsComponent implements OnInit {
movieId : number;
movie:Movie | undefined;

  constructor(private activatedRoute: ActivatedRoute,private dbmoviesService: DbmoviesService ){
    this.movieId=this.activatedRoute.snapshot.params['id'];
    }

  ngOnInit(): void {
    this.getFilm();
  }


    getFilm() {
      this.dbmoviesService.getFilm(this.movieId).subscribe({
        next: (res:Movie) => {
          this.movie = (res);
          console.log('film recuperato\'API:', this.movie);
        },
        error: (error : Movie) => {
          console.error('Si è verificato un errore nel recupero del film:', error);
        }
      });
  
    }
}
