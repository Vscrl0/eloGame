import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuesserComponent } from './guesser/guesser.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
//   {path:"home", component:HomeComponent},
  {path:"guess", component:GuesserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
