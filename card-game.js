document.addEventListener("DOMContentLoaded", function(event) {
    //number of turns in the game, ends after 26
    let turns = 0;
    //scores for the game
    let pScore = 0;
    let cScore = 0;

    const dealButton = document.getElementById("deal");
    const hitButton = document.getElementById("hit");
    const stayButton = document.getElementById("stay");

    //arrays store the decks for the player and computer
    player = [];
    computer = [];
    //shuffles and deals a deck of cards to player and computer when button is clicked
    dealButton.addEventListener("click", function() {
        //resets the game
        turns = 0;
        pScore = 0;
        cScore = 0;
        //creates a deck of 52 cards with ranks and suits
        deck.load();
        //shuffles the deck of cards
        for(i = 0; i < 52; i++) {
            const temp = Math.floor(Math.random() * (i + 1));
            const swap = deck.cards[temp];
            deck.cards[temp] = deck.cards[i];
            deck.cards[i] = swap;
        }
        //splits the deck between player and computer
        for(i = 0; i < 26; i++) {
            player[i] = deck.cards[i];
            computer[i] = deck.cards[i + 26];
        }
        //hides deal button and displays next card button
        dealButton.style.display = "none";
        hitButton.style.display = "block";
        stayButton.style.display = "block";
    });

    //deals the next card for each player when the button is clicked
    hitButton.addEventListener("click", function() {
        let pCard = document.getElementById("playerCard");
        let cCard = document.getElementById("computerCard");
        let result = document.getElementById("result");
        let pSc = document.getElementById("pScore");
        let cSc = document.getElementById("cScore");

        let pRank = player[turns].rank;
        let pSuit = player[turns].suit;
        let cRank = computer[turns].rank;
        let cSuit = computer[turns].suit;


        //deals the cards
        pCard.innerHTML = translateR(pRank) + " OF " +  translateS(pSuit);
        cCard.innerHTML = translateR(cRank) + " OF " +  translateS(cSuit);
        pCard.style.color = suitColor(pSuit);
        cCard.style.color = suitColor(cSuit);

        //decides the winner, ties go to higher suit
        if(pRank > cRank) {
            result.innerHTML = "PLAYER WINS";
            pScore++;
        } else if(pRank == cRank) {
            if(pSuit > cSuit) {
                result.innerHTML = "PLAYER WINS";
                pScore++;
            } else {
                result.innerHTML = "COMPUTER WINS";
                cScore++;
            }
        } else {
            result.innerHTML = "COMPUTER WINS";
            cScore++;
        }
        pSc.innerHTML = "Score: " + pScore;
        cSc.innerHTML = "Score: " + cScore;
        //increments turns
        turns++;
        document.getElementById("turns").innerHTML = "Turn: " + turns;

        //ends game and displays results
        if(turns > 25) {
            if(pScore > cScore) {
                result.innerHTML = "GAME OVER. PLAYER WINS!";
            } else if(pScore == cScore) {
                result.innerHTML = "GAME OVER. TIE!";
            } else {
                result.innerHTML = "GAME OVER. COMPUTER WINS!";
            }
            hitButton.style.display = "none";
            stayButton.style.display = "none";
            dealButton.style.display = "block";
        }

        //translates suits to strings
        function translateS (s) {
            switch (s) {
                case 0:
                    suit = "SPADES";
                    break;
                case 1:
                    suit = "CLUBS";
                    break;
                case 2:
                    suit = "DIAMONDS";
                    break;
                case 3:
                    suit = "HEARTS";
                    break;
            }
            return suit;
        }
        //translates face cards to strings
        function translateR (r) {
            switch (r) {
                case 11:
                    rank = "JACK";
                    break;
                case 12:
                    rank = "QUEEN";
                    break;
                case 13:
                    rank = "KING";
                    break;
                case 14:
                    rank = "ACE";
                    break;
                default:
                    rank = r;
                    break;
            }
            return rank;
        }
        //changes color based on suit
        function suitColor (s) {
            switch (s) {
                default:
                    color = "black";
                    break;
                case 2:
                    color = "red";
                    break;
                case 3:
                    color = "red";
                    break;
            }
            return color;
        }
    });
});