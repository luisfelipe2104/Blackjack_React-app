import { useState, useEffect } from 'react'
import React from 'react'

// -----------------------------------------------------------------------------------------
// loads the page with the button already disbled

export function loadButtonDisabled(){ 
    document.getElementById("stay").disabled = true
    document.getElementById("hit").disabled = true
}

// -----------------------------------------------------------------------------------------
// deck of cards

let deck = ['2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', 
    '8♠', '9♠','10♠', '2♥', '3♥', 
    '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦',
    'Q♣', 'J♣', 'K♣', 'A♣', 'Q♠', 'J♠', 'K♠', 'A♠', 'Q♥', 'J♥', 'K♥', 'A♥', 'Q♦', 'J♦', 'K♦', 'A♦']

// -----------------------------------------------------------------------------------------
// playe hand and dealer hand
let playerHand = []
let dealerHand = []

// -----------------------------------------------------------------------------------------
// Main game

export function Game(){
// -----------------------------------------------------------------------------------------
// useState variables

    let [number, setNumber] = useState(0)
    let updateNumber = () => {
        setNumber(number += 1)
    }
    let [totalPlayerHand, setTotalPlayerHand] = useState(0)
    let [totalDealerHand, setTotalDealerHand] = useState(0)
    let [UplayerHand, setPlayerHand] = useState([])
    let [UdealerHand, setDealerHand] = useState([])
    let [message, setMessage] = useState("")
    let [gambiarra2, setGambiarra2] = useState("")
    let [playerWins, setPlayerWins] = useState(0)
    let [dealerWins, setDealerWins] = useState(0)

// -----------------------------------------------------------------------------------------
// deal cards

function dealCard(turn){
    // in case the deck is empty
    if(deck.length == 0){
        console.log("The deck ran out of card ahhhhhhhhhhhhhhhhhhhhhh")
        deck = ['2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', 
        '8♠', '9♠','10♠', '2♥', '3♥', 
        '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦',
        'Q♣', 'J♣', 'K♣', 'A♣', 'Q♠', 'J♠', 'K♠', 'A♠', 'Q♥', 'J♥', 'K♥', 'A♥', 'Q♦', 'J♦', 'K♦', 'A♦']
    }

    // picks a random number beetween 0 and the length of the deck
    let i = Math.floor(Math.random() * (deck.length - 1))
    // picks a random card
    let card = deck[i]
    // deal the card 
    turn.push(card)
    let index = deck.indexOf(card)
    // removes the card
    deck.splice(index, 1)

    // reveals the dealerHand depending on the total of each hand
    let gambiarra
    if(dealerHand.length == 2){ 
        gambiarra = [dealerHand[0]]
    }
    else{
        gambiarra = dealerHand
    }

    // updates the display of the dealerHand and playerHand
    setDealerHand(gambiarra)
    setPlayerHand(playerHand)
    
    setTotalDealerHand(total(dealerHand))
    setTotalPlayerHand(total(playerHand))
}

// -----------------------------------------------------------------------------------------
// calculates the total of each hand

function total(turn){
    let total = 0
    
    for(let i = 0; i < turn.length; i++){
        // in case it's a number
        if(parseInt(turn[i][0]) >= 2){
            total += parseInt(turn[i][0])
        }

        // in case it's 10
        else if(parseInt(turn[i][0, 1]) === 10){
            total += parseInt(turn[i][0, 1])
        }

        // in case it's 'A'
        else if(turn[i][0] == 'A'){
            if(total < 11){
                total += 11
            }
            else if(total > 10){
                total += 1
            }
        }

        // in case it's a face
        else{
            total += 10
        }
    }
    return total
}

// -----------------------------------------------------------------------------------------
// checks the winner and display the message

function checkWinner(){ 
    // alert("ola")
    updateNumber()
    if(total(playerHand) == total(dealerHand)){
        setMessage("Tie!")
    }

    else if(total(playerHand) == 21){
        setMessage("Blackjack! You win!")
        setPlayerWins(playerWins + 1)
    }

    else if(total(dealerHand) == 21){
        setMessage("Blackjack! Dealer wins!")
        setDealerWins(dealerWins + 1)
    }

    else if(total(playerHand) > 21){
        setMessage("You bust! Dealer wins!")
        setDealerWins(dealerWins + 1)
    }

    else if(total(dealerHand) > 21){
        setMessage("Dealer busts! You win!")
        setPlayerWins(playerWins + 1)
    }

    else if(21 - total(dealerHand) < 21 - total(playerHand)){
        setMessage("Dealer wins!")
        setDealerWins(dealerWins + 1)
    }

            
    else if(21 - total(dealerHand) > 21 - total(playerHand)){
        setMessage("You win!")
        setPlayerWins(playerWins + 1)
    }

}

// -----------------------------------------------------------------------------------------

// erases the message of the winner
    const updateMessage = () => {
        setMessage("")
    }

// -----------------------------------------------------------------------------------------
// starts the game

function play(){
    // total of dealer hand
    setGambiarra2("?")
    // erases the message of the winner
    updateMessage()
    console.log("message", message)
    playerHand = []
    dealerHand = []

    // starts the game dealing 2 cards for each hand
    for(let i=0; i<2; i++){
        dealCard(dealerHand, deck)
        dealCard(playerHand, deck)
    }
    console.log("playerHand", UplayerHand)
    console.log("dealerHand", UdealerHand)
    console.log("deck", deck)
    console.log("total playerHand", total(playerHand))
    console.log("total dealerHand esse aq", dealerHand[0])

    // disables play and enables stay and hit
    document.getElementById("play").disabled = true
    document.getElementById("stay").disabled = false
    document.getElementById("hit").disabled = false

    // reveals the dealerHand depending on game situation
    let gambiarra
    if(dealerHand.length == 2){ 
        gambiarra = [dealerHand[0]]
    }
    else{
        gambiarra = dealerHand
    }

    setDealerHand(gambiarra)
    setPlayerHand(playerHand)

    
    setTotalDealerHand(total(dealerHand))
    setTotalPlayerHand(total(playerHand))

    // in case there's a blackjack it ends the game
    if(total(playerHand) >= 21 || total(dealerHand) >= 21){
        playerIn = false
        dealerIn = false
        document.getElementById("stay").disabled = true
        document.getElementById("hit").disabled = true
        document.getElementById("play").disabled = false
        checkWinner()
        setGambiarra2(String(total(dealerHand)))
    }
}

// ----------------------------------------------------------------------------------------------------
// Stay or Hit

let playerIn = true
let dealerIn = true
function StayOrHit(stayOrHit){
    // in case there's a blackjack it ends the game
    if(total(playerHand) >= 21 || total(dealerHand) >= 21){
        playerIn = false
        dealerIn = false
        setDealerHand(dealerHand)
        document.getElementById("stay").disabled = true
        document.getElementById("hit").disabled = true
        document.getElementById("play").disabled = false
        checkWinner()
        setGambiarra2(String(total(dealerHand)))
    }

    if(total(playerHand) < 21){ 
        // hit
        if(stayOrHit == "2"){
            dealCard(playerHand, deck)
        }
        // stay
        else if(stayOrHit == "1"){
            playerIn = false
            while(dealerIn && !playerIn){
                if(total(dealerHand) < 17){
                    dealCard(dealerHand, deck)
                }
                else{
                    dealerIn = false
                }
            }
        }
    }
    
    // in case the player busts
    else if(total(playerHand) > 21){
        playerIn = false
        while(dealerIn && !playerIn){
            if(total(dealerHand) < 17){
                dealCard(dealerHand, deck)
            }
            else{
                dealerIn = false
            }
        }
    }

    // in case the dealer has already 16
    if(total(dealerHand) > 16){
        dealerIn = false
    }

    // in case there's a blackjack it ends the game
    if(total(playerHand) >= 21 || total(dealerHand) >= 21){
        playerIn = false
        dealerIn = false
        setDealerHand(dealerHand)
        setGambiarra2(String(total(dealerHand)))
    }

    // in case there's a blackjack it ends the game
    if(!playerIn && !dealerIn){
        document.getElementById("stay").disabled = true
        document.getElementById("hit").disabled = true
        document.getElementById("play").disabled = false
        setDealerHand(dealerHand)
        checkWinner()
        setGambiarra2(String(total(dealerHand)))
    }

    console.log("playerHand", UplayerHand)
    console.log("dealerHand", UdealerHand)
    console.log("deck", deck)
    console.log("total playerHand", total(playerHand))
    console.log("total dealerHand", total(dealerHand))
}

// -----------------------------------------------------------------------------
// displays the card on the screen

    const showCard = (card) => {
        return(
            <div className="carddd col-3 w-100 h-50">
                <p className="number">{card}</p>
                <p className="number2">{card}</p>
            </div>  
        )
    }

// -----------------------------------------------------------------------------------
// the page  

return (
    <div className="container-fluid">

        <div className='row'> 
            <div className="gambiarra col-lg-3 col-sm-12">
                <h1 className='red2'>{message}</h1>
                <h1 className="blue2">Player Wins: {playerWins}</h1>
                <h1 className="red">Dealer Wins: {dealerWins}</h1>
                <div className='containerButton h-100 row align-items-center justify-content-center'>
                    <button id="play" className='btn btn-success h-25 col-2 mb-auto mt-auto' onClick={play}>Play</button>
                    <button id="stay" className='btn btn-primary mx-5 h-25 col-2 mb-auto mt-auto' value="1" onClick={ (e) => {StayOrHit(e.target.value); updateNumber() }}>Stay</button>
                    <button id="hit" className='btn btn-danger h-25 col-2 mb-auto mt-auto' value="2" onClick={ (e) => {StayOrHit(e.target.value); updateNumber() }}>Hit</button>
                </div>
            </div>

            <div className='containerrr container'>

                    <h1 className='red row'>Dealer:{gambiarra2}</h1>
                <div className="mb-5 my-5 row justify-content-center">
                    <p className="row">{UdealerHand.map(showCard)}</p>
                    {/* <p>{totalDealerHand}</p> */}
                </div>

                        <h1 className='blue row'>Player: <strong>{totalPlayerHand}</strong></h1>
                    <div className="row justify-content-center my-5">
                        <p className="row">{UplayerHand.map(showCard)}</p>
                        {/* <p>{totalPlayerHand}</p> */}
                    </div>

                </div>
        
        </div>
    </div>
  );

  

}

