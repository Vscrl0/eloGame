import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Game from '../models/game';

@Injectable({
	providedIn: 'root'
})
export class EloService {
	gameCount!:number;

	getElo$: Observable<number>;
	getGame$: Observable<any>;
	private getEloSubject = new Subject<any>();
	private getGameSubject = new Subject<any>();

	constructor(private http: HttpClient, private router: Router) {
		this.getElo$ = this.getEloSubject.asObservable();
		this.getGame$ = this.getGameSubject.asObservable();
	}

	getElo(data: number) {
		this.getEloSubject.next(data);
	}
	// getGame(data: any) {
	// 	this.getGameSubject.next(data);
	// }

	nextGame() {
		this.http.get("http://35.224.173.125/").subscribe(res=>{
			console.log("hit api");
			this.getGameSubject.next(res);
			
		});
	}

	startGame(gameCount:number){
		this.gameCount=gameCount;
		this.nextGame();
		this.router.navigate(["guess"]);
	}
}
