import { Component, Input } from '@angular/core';

@Component({
  selector: 'tnv-favorites-movies-item',
  templateUrl: './favorites-movies-item.component.html',
  styleUrls: ['./favorites-movies-item.component.scss']
})
export class FavoritesMoviesItemComponent {

@Input() myMovieReview :any | undefined;

constructor(){

}


}
