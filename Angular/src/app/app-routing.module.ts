import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@core/helpers/auth-guard";
import { LoginComponent } from "./@shared/components/login/login.component";
import { MainPageComponent } from "./components/main-page/main-page.component";
import { RegisterComponent } from "./@shared/components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RankingsComponent } from "./components/rankings/rankings.component";
import { GiocaComponent } from './components/gioca/gioca.component';
import { GameResultsComponent } from "./components/game-results/game-results.component";
import { GameResultsItemDetailsComponent } from "./components/game-results-item-details/game-results-item-details.component";
import { FavoritesMoviesComponent } from "./components/favorites-movies/favorites-movies.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: "",
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "welcome", component: WelcomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "rankings", component: RankingsComponent },
      { path: "gioca", component: GiocaComponent },
      { path: "result", component: GameResultsComponent },
      { path: "result/movie/:id", component: GameResultsItemDetailsComponent },
      { path: "favorites", component: FavoritesMoviesComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: "", redirectTo: "welcome", pathMatch: 'full' },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
