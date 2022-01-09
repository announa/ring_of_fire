import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
})
export class StartscreenComponent implements OnInit {
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
}
