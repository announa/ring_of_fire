import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game';


@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrls: ['./player-mobile.component.scss']
})
export class PlayerMobileComponent implements OnInit {
  @Input() game!: Game;
  constructor() { }

  ngOnInit(): void {
  }

  editPlayer(playerId: number){
    console.log('edit Player ' + playerId)
  }
}
