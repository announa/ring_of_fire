import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  profilePictures = ['female.png', 'male.jpg','cat.png', 'dog.png', 'owl.png', 'dragonfly.png', 'tiger.png', 'hummingbird.png']
  constructor() { }

  ngOnInit(): void {
  }

}
