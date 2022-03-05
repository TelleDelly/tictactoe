//Whitboarding
/*
3x3 playing board of clickable divs
two clickable divs at the start of the game to determine
who goes first

players will play untill someone ones or 9 turns have passed
turns %2 = 0 player 1s turn
turns %2 = 1 player 2s turn

players cannot place a marker on a square that is filled



resart button

*/
const winningX = 'XXX'
const winningO = 'OOO'

const player1 = {
    score: 0,
    symbol: '',
}

const player2 = {
    score: 0,
    symbol: '',
}

const gameObject = {
    turns: 0,
    ties: 0,
}

const board = document.querySelector('.board')
const resetButton = document.body.querySelector('#reset')
const player1Choice = document.body.querySelector('.choices')
const choosePopup = document.body.querySelector('.who-goes-first-init')
const ties = document.body.querySelector('.ties')
const playerTurn = document.body.querySelector('.which-turn')
const player1Score = document.querySelector('#player-1-score')
const player2Score = document.querySelector('#player-2-score')

const player1Turn = () => {
    return gameObject.turns % 2 === 0
}

const winCon = (event) => {
    let gameArr = event.path[1]
    let gameWon = false;
    // console.log(event.path[1].children[0].innerText)
    // console.log(gameArr.children[0].innerText, gameArr.children[1].innerText, gameArr.children[2].innerText )
    let row1 = gameArr.children[0].innerText + gameArr.children[1].innerText + gameArr.children[2].innerText 
    let row2 = gameArr.children[3].innerText + gameArr.children[4].innerText + gameArr.children[5].innerText
    let row3 = gameArr.children[6].innerText + gameArr.children[7].innerText + gameArr.children[8].innerText

    let col1 = gameArr.children[0].innerText + gameArr.children[3].innerText + gameArr.children[6].innerText
    let col2 = gameArr.children[1].innerText + gameArr.children[4].innerText + gameArr.children[7].innerText
    let col3 = gameArr.children[2].innerText + gameArr.children[5].innerText + gameArr.children[8].innerText

    let diag1 = gameArr.children[6].innerText + gameArr.children[4].innerText + gameArr.children[2].innerText
    let diag2 = gameArr.children[0].innerText + gameArr.children[4].innerText + gameArr.children[8].innerText

    if(row1== winningX || row2== winningX || row3== winningX || col1== winningX || col2== winningX || col3== winningX || diag1 == winningX|| diag2 == winningX){
        // console.log('X won')
        if(player1.symbol === 'X'){
            player1.score++
            player1Score.textContent = `Player 1 score: ${player1.score}`
            setTimeout(() => {
                alert('Player 1 wins')
                reset()}, 200)            

        } else {
            player2.score++
            player2Score.textContent = `Player 2 score: ${player2.score}`
            setTimeout(() => {
                alert('Player 2 wins')
                reset()}, 200)
        }
        gameWon = true
    } else if(row1 == winningO|| row2 == winningO|| row3== winningO || col1 == winningO|| col2 == winningO|| col3 == winningO|| diag1 == winningO|| diag2 == winningO){
        // console.log('O won')
        if(player1.symbol === 'O'){
            player1.score++
            player1Score.textContent = `Player 1 score: ${player1.score}`
            setTimeout(() => {
                alert('Player 1 wins')
                reset()}, 200)
        } else{
            player2.score++
            player2Score.textContent = `Player 2 score: ${player2.score}`
            setTimeout(() => {
                alert('Player 2 wins')
                reset()}, 200)
        }
        gameWon = true;
    }
    if(gameObject.turns >= 9 && !gameWon){
        gameObject.ties++;
        ties.textContent = `Ties: ${gameObject.ties}`
        setTimeout(() => {
            alert('Tie')
            reset()}, 200)
    }
}

const reset = () => {
    let divs = board.querySelectorAll('.square')
    divs.forEach(element => {
        element.childNodes[0].textContent = ''
    })
    gameObject.turns = 0
    choosePopup.className = 'who-goes-first-init'
    playerTurn.textContent = 'Player 1 turn'
}

player1Choice.addEventListener('click', (event) => {
    // console.log(event.path[1].classList)
    if(event.path[1].classList.contains('choose-x')){
        player1.symbol = 'X'
        player2.symbol = 'O'
    } 
    if(event.path[1].classList.contains('choose-o')) {
        player1.symbol = 'O'
        player2.symbol = 'X'
    }
    choosePopup.className = 'who-goes-first-final'
})

board.addEventListener('click', (event) =>{
    if(event.target.classList.contains('square')){
        // console.log(event)
        if(choosePopup.className == 'who-goes-first-init'){
            alert("Please select a symbol")
        } else {
            if(event.target.childNodes[0].textContent == ''){
                if(player1Turn()){
                    // console.log(event.target)
                    event.target.childNodes[0].innerText = player1.symbol
                    playerTurn.textContent = 'Player 2 turn'
                    
                } else {
                    // console.log(player2.symbol)
                    event.target.childNodes[0].innerText = player2.symbol
                    playerTurn.textContent = 'Player 1 turn'
                }
                gameObject.turns++;
                window.onload(winCon(event))       
            } else {
                alert("Invalid spot pick another one")
            }
        }
         
    }
})

resetButton.addEventListener('click', reset)



