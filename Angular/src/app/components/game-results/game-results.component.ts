import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbmoviesService } from 'src/app/service/dbmovieservice.service';
import { GiocaComponent } from '../gioca/gioca.component';

@Component({
  selector: 'tnv-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent {

  constructor(private router: Router) {}
  ngOnInit() {
  }
}
