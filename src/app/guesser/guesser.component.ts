import { Component, OnInit } from '@angular/core';
import { EloService } from '../services/elo.service';

@Component({
  selector: 'app-guesser',
  templateUrl: './guesser.component.html',
  styleUrls: ['./guesser.component.css']
})
export class GuesserComponent implements OnInit {
  avgElo = 0;
  score = 0;
  guess = 0;
  constructor(private eloService: EloService) { }

  ngOnInit(): void {

  }
  ngDoCheck(): void {
    this.eloService.getElo$.subscribe( data => {this.avgElo = data as number;})
  }
  setScore(elo: number) {
    this.score = Math.max(0,2000 - Math.abs(elo - this.avgElo));
  }
}
