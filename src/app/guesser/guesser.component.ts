import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EloService } from '../services/elo.service';

@Component({
	selector: 'app-guesser',
	templateUrl: './guesser.component.html',
	styleUrls: ['./guesser.component.css']
})
export class GuesserComponent implements OnInit {
	avgElo = 0;
	score = -1;
	guess = new FormControl();
	totalScore = 0;
	constructor(private eloService: EloService) { }

	ngOnInit(): void {
		if (!this.eloService.gameCount) {
			this.eloService.goHome();
		}
	}
	ngDoCheck(): void {
		this.eloService.getElo$.subscribe(data => { this.avgElo = data as number; })
	}
	setScore(elo: number) {
		console.log(this.guess+":"+elo);
		
		//this.score = Math.abs(elo - this.avgElo);
		// this.score = Math.max(0, 2000 - Math.abs(elo - this.avgElo));
		this.score = Math.floor(1000/(Math.sqrt(0.00002*Math.pow((this.avgElo-elo), 2) + 1)));
		this.totalScore += this.score;
	}

	nextGame() {
		this.score = -1;
		this.guess.setValue("");
		this.eloService.nextGame();
	}
}
