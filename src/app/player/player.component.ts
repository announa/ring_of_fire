import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() game!: Game;

  constructor() {}

  ngOnInit(): void {
  }

  editPlayer(playerId: number){
    console.log('edit Player ' + playerId)
  }
}
