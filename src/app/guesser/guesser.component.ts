import { Component, OnInit } from '@angular/core';
import { EloService } from '../services/elo.service';

@Component({
	selector: 'app-guesser',
	templateUrl: './guesser.component.html',
	styleUrls: ['./guesser.component.css']
})
export class GuesserComponent implements OnInit {
	avgElo = 0;
	score = -1;
	guess = 0;
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
		this.score = Math.max(0, 2000 - Math.abs(elo - this.avgElo));
		this.totalScore += this.score;
	}

	nextGame() {
		this.score = -1;
		this.eloService.nextGame();
	}
}
