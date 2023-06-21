import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-game-info",
  templateUrl: "./game-info.component.html",
  styleUrls: ["./game-info.component.scss"]
})
export class GameInfoComponent implements OnChanges {
  cardAction = [
    {
      title: "Waterfall",
      description:
        "Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on."
    },
    { title: "You", description: "You decide who drinks" },
    { title: "Me", description: "Congrats! Drink a shot!" },
    {
      title: "Category",
      description:
        "Come up with a category (e.g. Colors). Each player must enumerate one item from the category."
    },
    {
      title: "Bust a jive",
      description:
        "Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. "
    },
    { title: "Chicks", description: "All girls drink." },
    {
      title: "Heaven",
      description: "Put your hands up! The last player drinks!"
    },
    {
      title: "Mate",
      description:
        "Pick a mate. Your mate must always drink when you drink and the other way around."
    },
    { title: "Thumbmaster", description: "" },
    { title: "Men", description: "All men drink." },
    { title: "Quizmaster", description: "" },
    {
      title: "Never have i ever...",
      description:
        "Say something you nnever did. Everyone who did it has to drink."
    },
    {
      title: "Rule",
      description:
        "Make a rule. Everyone needs to drink when he breaks the rule."
    }
  ];

  title: string = "Please add the players";
  description: string =
    "First add all players. After that, the first player will pick a card.";
  split: string[];
  index: number;
  @Input() card: string;

  ngOnInit() {}

  ngOnChanges() {
    this.split = this.card.split("_");
    this.card = this.split[1];
    this.index = Number(this.card) - 1;
    this.title = this.cardAction[this.index].title
      ? this.cardAction[this.index].title
      : "Please add the players";
    this.description = this.cardAction[this.index].description
      ? this.cardAction[this.index].description
      : "First add all players. After that, the first player will pick a card.";
  }
}
