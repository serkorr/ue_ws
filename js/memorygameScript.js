function askUsername() {
    let username = prompt("Please enter your username", "");
    if (username != null) 
    {
        document.getElementById("player").innerHTML = username;
    }
}

var unfoundBg = "pics/memoryBg.png"
var foundBg = "pics/memoryBgI.png"

var timerInterval;

document.addEventListener("DOMContentLoaded", () => {

    // TIME
    var seconds = 0;
    var time = document.getElementById("time");
    
    function incTime() {
        seconds += 1;
        time.innerText = seconds;
    }

    timerInterval = setInterval(incTime, 1000);
    /////////////////////


    // CARDS
    cards = [
        {id: "1", image: "pics/card1.png"},
        {id: "1", image: "pics/card16.png"},
        {id: "2", image: "pics/card2.png"},
        {id: "2", image: "pics/card15.png"},
        {id: "3", image: "pics/card3.png"},
        {id: "3", image: "pics/card14.png"},
        {id: "4", image: "pics/card4.png"},
        {id: "4", image: "pics/card13.png"},
        {id: "5", image: "pics/card5.png"},
        {id: "5", image: "pics/card12.png"},
        {id: "6", image: "pics/card6.png"},
        {id: "6", image: "pics/card11.png"},
        {id: "7", image: "pics/card7.png"},
        {id: "7", image: "pics/card10.png"},
        {id: "8", image: "pics/card8.png"},
        {id: "8", image: "pics/card9.png"},
    ];

    var cardHeight = 60;
    var cardWidth = 60;

    function fisherYatesShuffle(arr){
        for (i = arr.length -1; i > 0; i--) {
            j = Math.floor(Math.random() * i)
            k = arr[i]
            arr[i] = arr[j]
            arr[j] = k
        }
    };

    fisherYatesShuffle(cards);


    const board = document.getElementById("spielbereich");
    const attemptsCounter = document.getElementById("attempts");  

    var attempts = 0;
    attemptsCounter.textContent = attempts;

    var foundCards = 0;

    function createBoard(){
        for (var i = 0; i < cards.length; i++) {
            var card = document.createElement("img");
            card.setAttribute("src", unfoundBg);
            card.setAttribute("id", i);
            card.addEventListener("click", flipCard);

            board.appendChild(card);
        }
    }


    var flippedCards = [];

    function flipCard(){
        if(flippedCards.length != 2)
        {
            var id = this.getAttribute("id");

            if(this.getAttribute("src") != foundBg && !this.classList.contains("disabled"))
            {
                flippedCards.push(id);

                this.setAttribute("src", cards[id].image);
                this.classList.add("disabled");

                if(flippedCards.length == 2)
                {
                    setTimeout(checkForMatch, 800);
                }
            }
        }
    }


    function checkForMatch(){
        attempts++;
        attemptsCounter.textContent = attempts;

        var cardsOnBoard = document.querySelectorAll("img")
        
        if(cards[flippedCards[0]].id == cards[flippedCards[1]].id)
        {
            foundCards++;

            cardsOnBoard[flippedCards[0]].setAttribute("src", foundBg);
            cardsOnBoard[flippedCards[1]].setAttribute("src", foundBg);
        }
        else{
            cardsOnBoard[flippedCards[0]].setAttribute("src", unfoundBg);
            cardsOnBoard[flippedCards[0]].classList.remove("disabled");

            cardsOnBoard[flippedCards[1]].setAttribute("src", unfoundBg);
            cardsOnBoard[flippedCards[1]].classList.remove("disabled");
        }
        
        flippedCards = [];
        
        if(foundCards == cards.length/2)
        {
            clearInterval(timerInterval);
            alert("GOOD JOB!");
        }
    }


    createBoard();

});


