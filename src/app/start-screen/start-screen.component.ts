import { Component, OnInit } from '@angular/core';
import { EloService } from '../services/elo.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {
	gameCount!:number;

  constructor(public eloService: EloService) { }

  ngOnInit(): void {
  }

  startGame(count:number){
	this.eloService.startGame(!count?5:count);
  }

}
