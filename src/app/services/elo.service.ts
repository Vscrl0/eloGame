import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Game from '../models/game';

@Injectable({
	providedIn: 'root'
})
export class EloService {
	gameCount!: number;
	prevScore = 0;
	scores!: Array<Array<number>>;

	getElo$: Observable<number>;
	getGame$: Observable<any>;
	private getEloSubject = new Subject<any>();
	private getGameSubject = new Subject<any>();

	constructor(private http: HttpClient, private router: Router) {
		this.getElo$ = this.getEloSubject.asObservable();
		this.getGame$ = this.getGameSubject.asObservable();
		this.clearBoard();
	}

	getElo(data: number) {
		this.getEloSubject.next(data);
	}
	// getGame(data: any) {
	// 	this.getGameSubject.next(data);
	// }

	nextGame() {
		this.http.get("http://35.224.173.125/").subscribe(res => {
			this.getGameSubject.next(res);
		});
	}

	startGame(gameCount: number) {
		this.gameCount = gameCount;
		console.log("games: " + gameCount);
		this.prevScore = 0;
		this.scores = [];
		this.nextGame();
		this.router.navigate(["guess"]);
	}

	addScore(me: number, real: number, points: number) {
		this.scores.push([me, real, points]);
		this.prevScore += points;
	}

	goHome() {
		this.router.navigate([""]);
	}

	clearBoard() {
		this.getGameSubject.next(new Game());
	}
}
