import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseSaveService {


  constructor(private firestore: AngularFirestore) { }

  saveGameToDataBase(currentGame: string, game: any){
    this.firestore
    .collection('games')
    .doc(currentGame)
    .update(game.toJson());

    console.log('game saved')
  }
}
