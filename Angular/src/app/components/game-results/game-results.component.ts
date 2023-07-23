import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DbmoviesService } from 'src/app/service/dbmovieservice.service';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'tnv-game-results',
  templateUrl:'./game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent {

  movie:Movie|undefined;
  sortedCriteria=this.dbmoviesService.getSortedCriteria();
  sortedMoviesByUser =this.dbmoviesService.getMoviesByUser();
  sortedMoviesByCalculator=[...this.sortedMoviesByUser]
  currentUser: Partial<User> = {};
  

  constructor(private dbmoviesService: DbmoviesService,private router: Router, private authService: AuthService) {}

  ngOnInit() {
  this.compareMovies(this.sortedMoviesByUser,this.sortedMoviesByCalculator)
  console.log(this.currentUser.movies)
  
    
  }

  sortMovies(movies: Movie[]) { 
    if (this.sortedCriteria === "Data d'uscita") {
      movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    } else if (this.sortedCriteria === "popolarità") {
      movies.sort((a, b) => b.popularity - a.popularity);
    }
    return movies;
  }

  compareMovies(sortedMoviesByUser: Movie[],sortedMoviesByCalculator:Movie[]){
    let count: number=0;
    this.sortMovies(sortedMoviesByCalculator);
    this.currentUser = this.authService.getCurrentUser();

    for (let i = 0; i < sortedMoviesByCalculator.length; i++) {
      if (sortedMoviesByCalculator[i] === sortedMoviesByUser[i]) {
        count++;
        sortedMoviesByCalculator[i].video=true;
      }
    }
    this.currentUser.movies = count;
    return sortedMoviesByCalculator;
  }

    

onClicked(id: number){
  this.router.navigateByUrl(`/results/movieDetails${id}` );
  console.log(id)
  }
}





  



  


