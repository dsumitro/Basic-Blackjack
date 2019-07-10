class Card {
    constructor(suit,weight){
        this.suit = suit;
        this.weight = weight;
    }
  };
 
 class Deck {
     cards = [];
     //removedCards = [];
     constructor(){
        const cardRank = [1,2,3,4,5,6,7,8,9,"Jack","Queen","King","Ace"];
        const cardSuit = ["Clubs","Spades","Hearts","Diamonds"];
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 13;j++ ){
                this.cards.push(new Card(cardSuit[i],cardRank[j]));
            }
        }
        this.shuffle();
     }
     shuffle(){
         this.cards.sort(()=> Math.random()-0.5);
     }
     removeCards(){
         console.log("Not implemented yet.")
     }
     getCard(){
         return this.cards.shift();
     }
 }
 /*-----------------------------
 //let asdf = new Deck();
 //asdf.getCards();
 //*/
 class CardHolder {
     hand = [];
     constructor() {
        // Nothing for me
     }
     getHandValue(){
        // Returns total value of hand
        let value = 0;
        this.hand.forEach((card)=>{
            
            value += this.convertValue(card.weight);
        })
        return value;
     }
     convertValue(value){
        switch (value) {

            case "Ace":
                return 11;
                break;
            case "King":
            case "Queen":
            case "Jack":
                return 10;
                break;
            default:
                return value;
                break;
        }
     }
     addToHand(card){         
         this.hand.push(card);
     }
     getHand(){
         return this.hand;
     }
 }
 /*-------------------------
let asdf = new CardHolder();
asdf.addToHand(new Card("heart",10));
asdf.addToHand(new Card("spade",2));
asdf.addToHand(new Card("spade",'Ace'));
asdf.addToHand(new Card("Club",'King'));
asdf.addToHand(new Card("spade",6));
asdf.getHand();
//*/
class Dealer extends CardHolder{
    drawCard(deck,hand){
        hand.addToHand(deck.getCard());
    }
}

/*-------------------
let dck = new Deck();
console.log(dck);
let asdf = new Dealer();
let ply = new CardHolder();
asdf.drawCard(dck,asdf);
asdf.drawCard(dck,ply);
asdf.drawCard(dck,asdf);
asdf.drawCard(dck,ply);
console.log('Dealer')
console.log(asdf.getHand());
console.log(asdf.getHandValue())
console.log('Player')
console.log(ply.getHand())
console.log(ply.getHandValue())

//*/
class GameState {
    constructor(){
        this.deck = new Deck();
        this.dealer = new Dealer();
        this.player = new CardHolder();
    }
    gameLoop(){
        this.openingTitle();
        // Draws
        this.dealer.drawCard(this.deck,this.player);
        this.dealer.drawCard(this.deck,this.dealer);
        this.dealer.drawCard(this.deck,this.player);
        this.dealer.drawCard(this.deck,this.dealer);
        this.printOutAllHands();
        this.checkWinCondition();
        
    }
    openingTitle(){
        console.log("BASIC Blackjack")
    }
    printOutAllHands(){
        console.log("Dealer's Hand")
        console.log(this.dealer.getHand())
        console.log(`Dealer's Value: ${this.dealer.getHandValue()}`)
        console.log("Your Hand")
        console.log(this.player.getHand())
        console.log(`Your Value: ${this.player.getHandValue()}`)

    }
    checkWinCondition(){
        // Compare
        if(this.dealer.getHandValue() > 21){
            console.log("DEALER IS OVER 21, DEALER LOSE.")
        }
        else if(this.player.getHandValue() > 21){
            console.log("YOU ARE OVER 21, YOU LOSE")
        }
        else if(this.dealer.getHandValue() < this.player.getHandValue()){
            console.log("YOU WON, DEALER LOSE.")
        }
        else if (this.dealer.getHandValue() === this.player.getHandValue()){
            console.log("ITS A TIE...");
        }
        else{
            console.log("DEALER WON, YOU LOSE");
        }
    }
}

let asdf = new GameState();
asdf.gameLoop();