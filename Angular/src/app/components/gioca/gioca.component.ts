import { Component, OnInit } from '@angular/core';
import { DbmoviesService } from '../../service/dbmovieservice.service';
import { Movie} from '../../models/movie';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gioca',
  templateUrl: './gioca.component.html',
  styleUrls: ['./gioca.component.scss'],
  
})
export class GiocaComponent implements OnInit {


  movies!: Movie[] ;
  criteria:String[]=["popolarità","Data d'uscita"]; 
  sortCriteria =this.shuffleArray(this.criteria)[0];
  moviesByUser: Movie[]=[];
  isSubmitPressed: boolean = false;
  


  constructor(private dbmoviesService: DbmoviesService,private router: Router) {}

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.dbmoviesService.getFilms().subscribe({
      next: (res:any) => {
        this.movies = this.shuffleArray(res.results).slice(0,10);
        console.log('Dati recuperati dall\'API:', this.movies);
      },
      error: (error : any) => {
        console.error('Si è verificato un errore nel recupero dei film:', error);
      }
    });


  }

  drop(event: CdkDragDrop<{ title: string; poster: string }[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    this.moviesByUser=this.movies.slice();
  }


  shuffleArray(movies: any []) {
    return movies.sort(()=> Math.random()-0.5);
  }

  sortMovies(movies: Movie[]): Movie[] { 
    // Ordina la lista in base al primo criterio random (0: anno di uscita, 1: popolarità)
    if (this.sortCriteria === "Data d'uscita") {
      movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
    } else if (this.sortCriteria === "popolarità") {
      movies.sort((a, b) => b.popularity - a.popularity);
    }
    return movies;


  }
  checkMoviesByUser() {
    this.isSubmitPressed= true;
    console.log('film ordinati dall utente',this.moviesByUser);
    console.log('film ordinati dal calcolatore',this.sortMovies(this.movies));
  }


  navigateToResults() {
    // Naviga verso il componente di destinazione
    this.router.navigate(['/results']); 
  }
}
