import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  currentCard: string = '';
  cardPicked= false;
  constructor() { 
    this.game = new Game;
  }

  ngOnInit(): void {
  }

  takeCard(){
    this.currentCard = this.game.stack.pop();
    this.cardPicked = true;
  }

}
