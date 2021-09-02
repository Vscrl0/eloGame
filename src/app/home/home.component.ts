import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HistoryMove, NgxChessBoardService, PieceIconInput } from 'ngx-chess-board';
import { NgxChessBoardView } from 'ngx-chess-board';
import Game from '../models/game';
import { EloService } from '../services/elo.service';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	icons: PieceIconInput;
	moves!: Array<HistoryMove>;
	movePointer = new FormControl(0);
	pgn = "";
	pgnSplit = this.pgn.split(' ');
	pgnSplitWithoutNums!: Array<string>;
	pgnScore = "";
	avgElo!: number;

	constructor(private boardService: NgxChessBoardService, public eloService: EloService) {
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
	// ngOnInit(): void {
	// }
	ngAfterViewInit() {
		// this.reset();
		this.board.setFEN("8/8/p2p1QNK/n2r2R1/bqkp2B1/r2b2N1/p2n1BPR/8 w - - 0 1");
	}
	// ngDoCheck(): void {
	// }
	ngOnInit(): void {
		this.eloService.getGame$.subscribe(res => {
			console.log("Start again");
			
			this.pgn = (res as Game).pgn;
			console.log(this.pgn);

			this.board.setPGN(this.pgn);
			this.moves = this.board.getMoveHistory();
			console.log(this.moves.length)
			this.avgElo = Math.floor(((res as Game).white_elo + (res as Game).black_elo) / 2)
			this.eloService.getElo(this.avgElo);
			//this.movePointer=new FormControl(0,[Validators.max(this.moves.length),Validators.min(0)]);

			this.reset();
			this.pgnSplit = this.pgn.replace(/-/g, '‑').split(' ')
			this.pgnSplitWithoutNums = [];
			for (let move of this.pgnSplit) {
				if (!this.isNumber(move)) {
					this.pgnSplitWithoutNums.push(move);
				}
			}
			this.pgnScore = this.pgnSplitWithoutNums.pop() as string;
		});
	}


	reset() {
		this.board.reset();
		this.movePointer.setValue(0);
	}
	prev() {
		if (this.movePointer.value !== 0) {
			this.board.undo();
			this.movePointer.setValue(this.movePointer.value - 1);
		}
	}
	next() {
		if (this.movePointer.value !== this.moves.length) {
			this.board.move(this.moves[this.movePointer.value].move);
			this.movePointer.setValue(this.movePointer.value + 1);
		}
	}
	end() {
		this.board.setPGN(this.pgn);
		this.movePointer.setValue(this.moves.length);
	}
	goto(i: number) {
		if (i <= 0) {
			this.reset();
		}
		else if (i >= this.moves.length) {
			this.end();
		}
		else {
			let sp = this.pgn.split(" ");
			let newI = i + Math.floor((i - 1) / 2) + 1;
			//l);

			this.board.setPGN(sp.slice(0, newI).join(' '));

			this.movePointer.setValue(i);
		}
	}


	isNumber(s: string): boolean {
		if (s.endsWith(".")) {
			return true;
		}
		return false;
	}

}
