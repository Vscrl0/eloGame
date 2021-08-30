import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NgxChessBoardService, PieceIconInput} from 'ngx-chess-board';
import {NgxChessBoardView} from 'ngx-chess-board';
import Game from '../models/game';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	icons:PieceIconInput;
  constructor(private boardService: NgxChessBoardService, private http: HttpClient) {
		this.icons = {
        blackBishopUrl: 'assets/img/bB.png',
        blackKingUrl: 'assets/img/bK.png',
        blackKnightUrl: 'assets/img/bN.png',
        blackPawnUrl: 'assets/img/bP.png',
        blackQueenUrl: 'assets/img/bQ.png',
        blackRookUrl: 'assets/img/bR.png',
        whiteBishopUrl: 'assets/img/wB.png',
        whiteKingUrl: 'assets/img/wK.png',
        whiteKnightUrl: 'assets/img/wN.png',
        whitePawnUrl: 'assets/img/wP.png',
        whiteQueenUrl: 'assets/img/wQ.png',
        whiteRookUrl: 'assets/img/wR.png'
    };
   }
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
