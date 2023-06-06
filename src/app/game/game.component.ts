import { Component, OnInit } from "@angular/core";
import { Game } from "src/models/game";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  game: Game = new Game();
  currentCard: string = ``;

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 5000);
    }
  }

  dropCard() {
    this.pickCardAnimation = false;
  }
}
