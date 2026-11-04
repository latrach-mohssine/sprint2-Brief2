/////////////////////////////////////////////joueur vs ordinateur
export function duel(carteJoueur, cartOrdinateur) {
  if (carteJoueur === "Empereur" && cartOrdinateur === "Citoyen") {
    return "victoire";
  }
  if (carteJoueur === "Empereur" && cartOrdinateur === "Esclave") {
    return "défaite";
  }
  if (carteJoueur === "Citoyen" && cartOrdinateur === "Citoyen") {
    return "égalité";
  }
  if (carteJoueur === "Citoyen" && cartOrdinateur === "Esclave") {
    return "victoire";
  }
  if (carteJoueur === "Citoyen" && cartOrdinateur === "Empereur") {
    return "défaite";
  }
  if (carteJoueur === "Esclave" && cartOrdinateur === "Citoyen") {
    return "défaite";
  }
  if (carteJoueur === "Esclave" && cartOrdinateur === "Empereur") {
    return "victoire";
  }
}

/////////////////////////////////////////////// hands ////////////////////////////////////////

export function createHand(camp) {
  const arrayEsclave = [
    { type: "Citoyen", id: "Citoyen_1" },
    { type: "Citoyen", id: "Citoyen_2" },
    { type: "Citoyen", id: "Citoyen_3" },
    { type: "Citoyen", id: "Citoyen_4" },
    { type: "Esclave", id: "Esclave" },
  ];
  const arrayEmpereur = [
    { type: "Citoyen", id: "Citoyen_1" },
    { type: "Citoyen", id: "Citoyen_2" },
    { type: "Citoyen", id: "Citoyen_3" },
    { type: "Citoyen", id: "Citoyen_4" },
    { type: "Empereur", id: "Empereur" },
  ];
  if (camp === "Empereur") {
    return arrayEmpereur;
  } else {
    return arrayEsclave;
  }
}
export function getCamp(roundNumber) {
  const groub = Math.ceil(roundNumber / 3);
  if (groub % 2 === 0) {
    return "Esclave";
  } else {
    return "Empereur";
  }
}
export function getGroup(roundNumber) {
  return Math.ceil(roundNumber / 3);
}
export function getFirstSide(duelNumber) {
  if (duelNumber % 2 === 0) {
    return "Esclave";
  } else {
    return "Empereur";
  }
}
export function getPoints(winnerCamp) {
  if (winnerCamp === "Esclave") {
    return 5;
  } else {
    return 1;
  }
}
export function pickRandomCard(hand) {
  const index = Math.floor(Math.random() * hand.length);
  return hand[index];
}
export function createInitialState() {
  const playerCamp = getCamp(1);
  const computerCamp = playerCamp === "Empereur" ? "Esclave" : "Empereur";
  return {
    roundNumber: 1,
    duelNumber: 1,
    playerHand: createHand(playerCamp),
    computerHand: createHand(computerCamp),
    playerScore: 0,
    computerScore: 0,
    roundOver: false,
    lastDuel: null,
  };
}
export function playDuel(state, playerCardId) {
  let playerCard;
  for (const card of state.playerHand) {
    if (card.id === playerCardId) {
      playerCard = card;
      break;
    }
  }
  if (!playerCard) {
    return state;
  }
  const computerCard = pickRandomCard(state.computerHand);
  const result = duel(playerCard.type, computerCard.type);
  const playerCamp = getCamp(state.roundNumber);
  const computerCamp = playerCamp === "Empereur" ? "Esclave" : "Empereur";
  const newPlayerHand = state.playerHand.filter(
    (cards) => cards.id !== playerCard.id,
  );
  const newComputerHand = state.computerHand.filter(
    (cards) => cards.id !== computerCard.id,
  );
  if (result === "égalité") {
    return {
      ...state,
      duelNumber: state.duelNumber + 1,
      computerHand: newComputerHand,
      playerHand: newPlayerHand,
      roundOver: false,
      lastDuel: {
        playerCard: playerCard,
        computerCard: computerCard,
        result: result,
      },
    };
  }
  const winnerCamp = result === "victoire" ? playerCamp : computerCamp;
  const point = getPoints(winnerCamp);
  return {
    ...state,
    playerHand: newPlayerHand,
    computerHand: newComputerHand,
    playerScore:
      result === "victoire" ? state.playerScore + point : state.playerScore,
    computerScore:
      result === "défaite" ? state.computerScore + point : state.computerScore,
    roundOver: true,
    lastDuel: {
      playerCard: playerCard,
      computerCard: computerCard,
      result: result,
    },
  };
}



export function startNextRound(state){
    const nextRoundNumber = state.roundNumber+1
    const playerCamp = getCamp(nextRoundNumber)
    const computerCamp = playerCamp === "Empereur" ? "Esclave" : "Empereur";
    const computerHand = createHand(computerCamp)
    const playerHand = createHand(playerCamp)
    return  {
        ...state,
        roundNumber: nextRoundNumber,
        duelNumber: 1,
        playerHand: playerHand,
        computerHand: computerHand,
        roundOver: false,
        lastDuel: null
    }
}

export function isMatchOver(state){
const matchOver = (state.roundNumber === 12) &&  (state.roundOver === true) ? true : false;
return matchOver;
}
export function getMatchResult(state){
      if (state.playerScore > state.computerScore) {
    return "victoire";
  }
  if (state.playerScore < state.computerScore) {
    return "défaite";
  }
  if (state.playerScore === state.computerScore) {
    return "égalité";
  }
}