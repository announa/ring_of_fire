import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss'],
})
export class GameoverComponent implements OnInit {
  @Output() gameOverReset = new EventEmitter<boolean>();

  constructor(private firestore: AngularFirestore, private router: Router) {}

  ngOnInit(): void {}

  startGame() {
    let game = new Game();
    console.log('Start Game');
    this.firestore
      .collection('games')
      .add(game.toJson())
      .then((gameInfo) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
  }

  resetGameOver(){
    this.gameOverReset.emit(false)
  }
}
