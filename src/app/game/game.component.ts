import { Component, OnInit, inject } from "@angular/core";
import { Game } from "src/models/game";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPlayerComponent } from "../dialog-add-player/dialog-add-player.component";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { __values } from "tslib";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  game: Game = new Game();
  firestore: Firestore = inject(Firestore);
  game$: Observable<any>; // Observable -> Bekommt ein Update bei Änderung
  gameCollection = collection(this.firestore, `games`);
  gameID: any = "";

  constructor(public router: ActivatedRoute, public dialog: MatDialog) {
    this.game$ = collectionData(this.gameCollection, { idField: "id" });

    const ID: any = this.router.params["value"].id;

    this.game$.forEach((element) => {
      for (let index = 0; index < element.length; index++) {
        if (element[index].id == ID) {
          this.game.players = element[index].players;
          this.game.stack = element[index].stack;
          this.game.playedCards = element[index].playedCards;
          this.game.currentPlayer = element[index].currentPlayer;
          this.game.pickCardAnimation = element[index].pickCardAnimation;
          this.game.currentCard = element[index].currentCard;
          this.gameID = ID;
        }
      }
    });
  }

  ngOnInit(): void {}

  updateGame() {
    updateDoc(doc(this.firestore, "games", this.gameID), this.game.toJson());
  }

  pickCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.updateGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
        this.game.currentPlayer =
          (this.game.currentPlayer + 1) % this.game.players.length;
        this.updateGame();
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name) => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }
}
