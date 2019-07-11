
/**Class representing a playing card */
class Card {
    /**
     * Creates a card
     * @param {String} suit - The suit of a card such as "Clubs","Hearts","Spades", or "Diamonds".
     * @param {value} weight - The value of the card such as 2-10, Jack, Queen, King, or ACE.
     */
    constructor(suit,weight){
        this.suit = suit;
        this.weight = weight;
    }
  };

/**Class representing a deck of cards */
 class Deck {
     cards = [];
     /**
      * Creates a deck of cards
      */
     constructor(){
        const ranks = [1,2,3,4,5,6,7,8,9,"Jack","Queen","King","Ace"];
        const suits = ["Clubs","Spades","Hearts","Diamonds"];

        ranks.forEach((rank)=>{
            suits.forEach((suit)=>{
                this.cards.push(new Card(suit,rank));
            })
        })
        this.shuffle();
     }
     /**
      * Shuffles deck of cards
      */
     shuffle(){
         this.cards.sort(()=> Math.random()-0.5);
     }
     /**
      * Returns a card from the deck.
      * @returns {Card} A Card from the deck
      */
     getCard(){
         return this.cards.shift();
     }
 }

/**Represents an Person who holds a hand of cards */
 class CardHolder {
     
     constructor(){
        this.hand = [];
        this.handValue = 0;

     }
     /**
      * Adds a card to the Hand
      * @param {Card} card A card object
      */
     addToHand(card){         
        this.hand.push(card);
        this.handValue = this.calculateValue();
    }

     /**
      * Gets the total value of the hand
      * @returns {int} The sum of all the values of the cards on hand
      */
     calculateValue(){
        // Returns total value of hand
        return this.hand.reduce((accumulator,currentValue) => accumulator + this.convertValue(currentValue.weight),0)        
     }
     /**
      * Converts Blackjack card values into a calculatable value.
      * @param {value} value Takes in either integers 1-9 or string values of either Jack, Queen, King, Ace
      * @returns {int} Total value of the hand
      */
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

     getHandValue(){
         return this.handValue;
     }
     
     /**
      * Returns all cards from hand
      * @returns An array of card objects
      */
     getHand(){
         return this.hand;
     }
     printHand(){
         return this.hand.map((card)=>{
            return `${card.weight} of ${card.suit}`;
         })
     }
 }
 /**Represents a blackjack card dealer*/
class Dealer extends CardHolder{
    /**
     * Draws one card from the deck and gives it to the hand
     * @param {Deck} deck A deck of cards
     * @param {CardHolder} hand A player
     */
    drawCard(deck,hand){
        hand.addToHand(deck.getCard());
    }
}
/**Represents the Gamestate logic */
class GameState {
    constructor(){
        this.deck = new Deck();
        this.dealer = new Dealer();
        this.player = new CardHolder();
    }
    /**
     * Plays out the game of blackjack one time
     */
    gameLoop(){
        this.openingTitle();
    
        this.dealer.drawCard(this.deck,this.player);
        this.dealer.drawCard(this.deck,this.dealer);
        this.dealer.drawCard(this.deck,this.player);
        this.dealer.drawCard(this.deck,this.dealer);
        this.printOutAllHands();
        // Game Loop
        this.checkWinCondition();
    }
    openingTitle(){
        console.clear()
        console.log(
        ".------..------..------..------..------.     .------..------..------..------.\n"+
        "|B.--. ||L.--. ||A.--. ||C.--. ||K.--. |.-.  |J.--. ||A.--. ||C.--. ||K.--. |\n"+
        "| :(): || :/ : || (  ) || :/ : || :/ : ((5)) | :(): || (  ) || :/ : || :/ : |\n"+
        "| ()() || (__) || :  : || :  : || :  : |'-.-.| ()() || :  : || :  : || :  : |\n"+
        "| '--'B|| '--'L|| '--'A|| '--'C|| '--'K| ((2)) '--'J|| '--'A|| '--'C|| '--'K|\n"+
        "`------'`------'`------'`------'`------'  '-'`------'`------'`------'`------'");
    }
    printOutAllHands(){
        console.log("Dealer's Hand")
        console.log(this.dealer.printHand());
        console.log(`Dealer's Value: ${this.dealer.getHandValue()}`)
        console.log(" ");
        console.log("Your Hand")
        console.log(this.player.printHand());
        console.log(`Your Value: ${this.player.getHandValue()}`)

    }
    checkWinCondition(){
        const dealersScore = this.dealer.getHandValue();
        const playerScore = this.player.getHandValue();

        if(dealersScore > 21){
            console.log('\x1b[5m\x1b[32m%s\x1b[0m','\tDEALER IS OVER 21, DEALER LOSES. YOU WIN!');
        }
        else if(playerScore > 21){
            console.log('\x1b[5m\x1b[31m%s\x1b[0m',"\tYOU ARE OVER 21, YOU LOSE")
        }
        else if(playerScore > dealersScore){
            console.log('\x1b[5m\x1b[32m%s\x1b[0m',"\tYOU WON")
        }
        else if (dealersScore === playerScore){
            console.log('\x1b[5m\x1b[31m%s\x1b[0m',"\tITS A TIE...");
        }
        else{
            console.log('\x1b[5m\x1b[31m%s\x1b[0m',"\tDEALER WON, YOU LOSE");
        }
    }
}
// Start the game
new GameState().gameLoop();