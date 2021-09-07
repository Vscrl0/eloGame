import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndComponent } from './end/end.component';
import { GuesserComponent } from './guesser/guesser.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
	{ path: "", component: StartScreenComponent },
	{ path: "guess", component: GuesserComponent },
	{ path: "end", component: EndComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
