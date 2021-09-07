import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuesserComponent } from './guesser/guesser.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
	{ path: "", component: StartScreenComponent },
	{ path: "guess", component: GuesserComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
