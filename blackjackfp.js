function createGame() {
  let deck = createDeck();
  let result = createCardHolder(deck);
  // TODO: IMPROVE ON THIS DEAN
  const player = { hand: [], handValue: 0 };
  player.hand = result.hand;
  player.handValue = result.handValue;
  deck = result.newDeck;
  //-----------------------------------
  result = createCardHolder(deck);
  // TODO: IMPROVE ON THIS DEAN
  const dealer = { hand: [], handValue: 0 };
  dealer.hand = result.hand;
  dealer.handValue = result.handValue;
  deck = result.newDeck;
  //-----------------------------------
  const winningMessage = compareHands(player, dealer);
  printGame(player, dealer, winningMessage);
}
function createDeck() {
  const cards = [];
  const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Jack', 'Queen', 'King', 'Ace'];
  const suits = ['Clubs', 'Spades', 'Hearts', 'Diamonds'];

  weights.forEach(weight => {
    suits.forEach(suit => {
      cards.push({ suit, weight });
    });
  });
  return shuffle(cards);
}
function shuffle(cards) {
  return cards.sort(() => Math.random() - 0.5);
}
function createCardHolder(deck) {
  const result = drawCard(deck);
  const { hand } = result;
  const { newDeck } = result;
  const handValue = calculateValue(hand);
  return { newDeck, hand, handValue };
}
function drawCard(deck) {
  const hand = deck.slice(0, 2);
  const newDeck = pureSpliceThatWeDidntTakeFromAndrew(deck);
  return { hand, newDeck };
}
function pureSpliceThatWeDidntTakeFromAndrew(deck) {
  return [...deck.slice(2)];
}
function calculateValue(hand) {
  return hand.reduce(
    (accumulator, currentValue) =>
      accumulator + getCardValue(currentValue.weight),
    0
  );
}
function getCardValue(weight) {
  if (typeof weight === 'string') {
    const weights = {
      Jack: 10,
      Queen: 10,
      King: 10,
      Ace: 11,
    };
    return weights[weight];
  }
  return weight;
}
function compareHands(p1, p2) {
  // plater 1 player
  // player 2 is dealer
  const player1Score = p1.handValue;
  const player2Score = p2.handValue;
  if (player2Score > 21) {
    return '\tDEALER IS OVER 21, DEALER LOSES. YOU WIN!';
  }
  if (player1Score > 21) {
    return '\tYOU ARE OVER 21, YOU LOSE';
  }
  if (player1Score > player2Score) {
    return '\tYOU WON';
  }
  if (player1Score === player2Score) {
    return '\tITS A TIE...';
  }
  return '\tDEALER WON, YOU LOSE';
}
function printGame(player1, player2, winningMessage) {
  console.clear();
  console.log(
    '.------..------..------..------..------.     .------..------..------..------.\n' +
      '|B.--. ||L.--. ||A.--. ||C.--. ||K.--. |.-.  |J.--. ||A.--. ||C.--. ||K.--. |\n' +
      '| :(): || :/ : || (  ) || :/ : || :/ : ((5)) | :(): || (  ) || :/ : || :/ : |\n' +
      "| ()() || (__) || :  : || :  : || :  : |'-.-.| ()() || :  : || :  : || :  : |\n" +
      "| '--'B|| '--'L|| '--'A|| '--'C|| '--'K| ((2)) '--'J|| '--'A|| '--'C|| '--'K|\n" +
      "`------'`------'`------'`------'`------'  '-'`------'`------'`------'`------'"
  );
  console.log("Dealer's Hand:");
  console.log(`\t${player2.hand[0].weight} of ${player2.hand[0].suit}`);
  console.log(`\t${player2.hand[1].weight} of ${player2.hand[1].suit}`);
  console.log(`Dealer's Score: ${player2.handValue}`);
  console.log();
  console.log("Player's Hand:");
  console.log(`\t${player1.hand[0].weight} of ${player1.hand[0].suit}`);
  console.log(`\t${player1.hand[1].weight} of ${player1.hand[1].suit}`);
  console.log(`Player's Score: ${player1.handValue}`);
  console.log(winningMessage);
}
createGame();
