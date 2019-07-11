function createGame() {
  let deck = createDeck();
  console.log(deck);
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
  console.log(player);
  console.log(dealer);
  console.log(deck);
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
function compareHands() {}
function printResults() {}
createGame();
