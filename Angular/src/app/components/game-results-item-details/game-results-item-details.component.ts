import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from 'src/app/@shared/services/rating.service';
import { Movie } from 'src/app/models/movie';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';
import { DbmoviesService } from 'src/app/services/dbmovieservice.service';

@Component({
  selector: 'tnv-game-results-item-details',
  templateUrl: './game-results-item-details.component.html',
  styleUrls: ['./game-results-item-details.component.scss']
})
export class GameResultsItemDetailsComponent implements OnInit {
  movieId!: number;
  isFormValid: boolean = false;
  comment: string = '';
  rating: number = 0;
  isFavorite: boolean = false;
  currentUser!: User;
  movie: Partial<Movie> = {};
    /*adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
    catch: false
  };*/
  review: Rating = {  // Inizializzazione dell'oggetto review
    idRating: 0,
    userId: 0,
    movieId: 0,
    ratingStars: 0,
    textComment: ''
  };


  constructor(private activatedRoute: ActivatedRoute, private dbmoviesService: DbmoviesService,
    private ratingService: RatingService, private httpClient: HttpClient, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem("user") || '') as User;
    this.movieId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getMovie();
    this.isAlreadyFavourite();
  }

  getMovie() {
    this.dbmoviesService.getMovie(this.movieId).subscribe({
      next: (res: Movie) => {
        this.movie = res;
        console.log('film recuperato\'API:', this.movie);
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel recupero del film:', error);
      }
    });
  }

  onRatingChange(value: number) {
    this.rating = value;
    this.checkFormValidity();
  }

  onCommentChange(event: Event) {
    const inputElement = event.target as HTMLTextAreaElement;
    this.comment = inputElement.value;
    this.checkFormValidity();
  }

  


  checkFormValidity() {
    // Controllo se il commento è presente e la valutazione è stata fatta
    this.isFormValid = !!this.comment && !!this.rating;
  }


  isAlreadyFavourite() {
    this.ratingService.getRating(this.currentUser.id, this.movieId).subscribe({
      next: (res: Rating) => {
        this.review = res;
        this.isFavorite = true; // Film trovato nei preferiti
        console.log('recensione trovata:', this.review);
        this.comment=this.review.textComment;
        this.rating=this.review.ratingStars;
      },
      error: (error: 404) => {
        console.log('recensione non trovata o problemi col server', error);
      }
    });
  }
  
  addToFavorites() {
    this.review.movieId = this.movieId;
    this.review.userId = this.currentUser.id;
    this.review.textComment = this.comment;
    this.review.ratingStars = this.rating;

    this.ratingService.addRating(this.review).subscribe({
      next: (res: Rating) => {
        this.review = res;
        this.router.navigateByUrl("/result");
        setTimeout(() => {
          alert("Film aggiunto alla lista dei preferiti");
        }, 50);
      },
      error: (error: any) => {
        console.error('Si è verificato un errore nel salvataggio:', error);
      }
    });
  }
}
