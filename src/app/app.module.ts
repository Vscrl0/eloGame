import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgxChessBoardModule } from "ngx-chess-board";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GuesserComponent } from './guesser/guesser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartScreenComponent } from './start-screen/start-screen.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuesserComponent,
    StartScreenComponent,
    EndComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot(),
    FormsModule,
	ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
