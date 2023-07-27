import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../@shared/services/rating.service';
import { HttpClient } from '@angular/common/http';
import { Rating } from 'src/app/models/rating';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'tnv-favorites-movies',
  templateUrl: './favorites-movies.component.html',
  styleUrls: ['./favorites-movies.component.scss']
})

  
export class FavoritesMoviesComponent implements OnInit{
  currentUser!: User;
  reviews: Rating[] =[];
  review!: Rating;
  rating :number =0;

  constructor(private ratingService: RatingService,httpClient:HttpClient, private router:Router){   
  this.currentUser= JSON.parse(localStorage.getItem("user") || '') as User;
  }

  
  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.ratingService.getRatings(this.currentUser.id).subscribe({
      next: (res: Rating[]) => {
        console.log('Risposta dal server:', res);
        this.reviews = res;
        console.log('Lista preferiti recuperata:', this.reviews);
      },
      error: (error: any) => {
        console.log('Errore nel recupero dei dati', error);
      }
    });
  }
   
  
}







