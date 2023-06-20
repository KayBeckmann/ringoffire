import { Component, OnInit, inject } from "@angular/core";
import { Game } from "src/models/game";
import { MatDialog } from "@angular/material/dialog";
import { DialogAddPlayerComponent } from "../dialog-add-player/dialog-add-player.component";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  game: Game = new Game();
  currentCard: string = ``;
  firestore: Firestore = inject(Firestore);
  game$: Observable<any>; // Observable -> Bekommt ein Update bei Änderung
  gameCollection = collection(this.firestore, `games`);

  constructor(public router: ActivatedRoute, public dialog: MatDialog) {
    this.game$ = collectionData(this.gameCollection, { idField: "id" });
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.loadGame(params);
    });
  }

  newGame() {
    this.game = new Game();
    setDoc(doc(this.gameCollection), this.game.toJson());
  }

  loadGame(gameId) {
    this.game$.forEach((game) => {
      if (game[0].id == gameId.id) {
        this.game.players = game[0].players;
        this.game.stack = game[0].stack;
        this.game.playedCards = game[0].playedCards;
        this.game.currentPlayer = game[0].currentPlayer;
      }
    });

    console.log(this.game);
  }

  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.game.currentPlayer =
          (this.game.currentPlayer + 1) % this.game.players.length;
      }, 1000);
    }
  }

  dropCard() {
    this.pickCardAnimation = false;
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
