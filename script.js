let deckId
let scoreComp =0
let scoreMe =0

const remainingCardsEl = document.getElementById("remaining-cards")
const whoWinsEl = document.getElementById("who-wins")
const btnDraw = document.getElementById("btn-draw")
const cardImg1 = document.getElementById("card-img-1")
const cardImg2 = document.getElementById("card-img-2")


document.getElementById("new-deck").addEventListener("click", () => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            deckId = data.deck_id
            btnDraw.disabled = false;
            scoreComp=0
            scoreMe=0
            cardImg1.innerHTML= ""
            cardImg2.innerHTML= ""
            whoWinsEl.innerText="Draw Cards"
        })
})

btnDraw.addEventListener("click", ()=>{
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res=> res.json())
    .then(data => {
        // console.log(data)
        
        remainingCardsEl.innerHTML=`Remaining Cards: ${data.remaining}`
        whoWinsEl.innerText = determineCardWinner(data.cards[0], data.cards[1])

        cardImg1.innerHTML= `
            <img src = ${data.cards[0].image}>
            <p>Computer: ${scoreComp}</p>
            `
        cardImg2.innerHTML= `
            <img src = ${data.cards[1].image}>
            <p>Me: ${scoreMe}</p>
            `

        if (data.remaining===0){
            btnDraw.disabled=true;
            let finalWinner
            
            if (scoreMe > scoreComp)
                finalWinner = "You Won!"
            else if(scoreComp > scoreMe)
                finalWinner = "Computer Won!"
            else finalWinner= "its a tie"

            document.getElementById("final").innerText= finalWinner

        } 
    } )

})



function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
     
    if (card1ValueIndex > card2ValueIndex) {
        scoreComp++;
        return("Computer wins!")
        
    } else if (card1ValueIndex < card2ValueIndex) {
        scoreMe++;
        return("You won!")
    } else {
        return("It's a tie!")
    }
}
