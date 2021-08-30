import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NgxChessBoardService} from 'ngx-chess-board';
import {NgxChessBoardView} from 'ngx-chess-board';
import Game from '../models/game';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private boardService: NgxChessBoardService, private http: HttpClient) { }
  @ViewChild('board', {static: false}) board!: NgxChessBoardView;
  ngOnInit(): void {
    
  }
  reset() {
    this.board.reset();
  }
  loadGame() {
    let pgn = "";
    this.http.get("http://35.224.173.125/").subscribe( res => { 
      pgn = (res as Game).pgn;
      this.board.setPGN(pgn);
      console.log(this.board.getMoveHistory());

  
  });

  }
}
