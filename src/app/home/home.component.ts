import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HistoryMove, NgxChessBoardService, PieceIconInput } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';
import Game from '../models/game';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	icons: PieceIconInput;
	moves!: Array<HistoryMove>;
	movePointer = 0;
  pgn = "";
  pgnSplit = this.pgn.split(' ');
  pgnSplitWithoutNums!: Array<string>;
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
	@ViewChild('board', { static: false }) board!: NgxChessBoardView;
	ngOnInit(): void {
	}
  ngAfterViewInit() {
    this.reset();
  }

	reset() {
		this.board.reset();
	}
	loadGame() {
		this.http.get("http://35.224.173.125/").subscribe(res => {
			this.pgn = (res as Game).pgn;
			this.board.setPGN(this.pgn);
			this.moves = this.board.getMoveHistory();
			this.board.reset();
      this.pgnSplit = this.pgn.replace(/-/g, '‑').split(' ')
      this.pgnSplitWithoutNums = [];
      for(let move of this.pgnSplit) {
        if (!this.isNumber(move)) {
          this.pgnSplitWithoutNums.push(move);
        }
      }
		});
	}


	prev() {
		if (this.movePointer !== 0) {
			this.board.undo();
			this.movePointer--;
		}
	}
	next() {
		if(this.movePointer!==this.moves.length){
			this.board.move(this.moves[this.movePointer].move);
			this.movePointer++;

		}
	}
  isNumber(s : string) : boolean {
    if (s.endsWith(".")){
      return true;
    }
    return false;
  }
 
}
