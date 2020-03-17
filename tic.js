//Variable Declaration
var spanTag = document.createElement('span')
var listofSubBoxes = document.querySelectorAll('.box > div')
var startButton = document.querySelector('.startGame')
var resetHalButton = document.querySelector('.resetHal')

// switchCounter 1 / 0 
var switchCounter = 0;

//Counter Variable for vaildate winner Draw and how many game
var counterO = []
var counterX = []
const winningCobo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8] ]

var gameCounter = 0;
// variable for Draw counter 
var winner = 0


//Cleaner
var cleaner = cleanerFn()
//Handling event listener in a group
var groupListener = elementsEventListenerHandler()
var operator = operatorFn()


//reset Event, addEventListener will execute function immediately if you pass a variable
// you must wrap another function outside to not immidately execute
resetHalButton.addEventListener('click', function() {
            
            //Make sure all global variables are clean & grid is clean
            counterO = []
            counterX = []
            gameCounter = 0

            cleaner.emptyChildElements(listofSubBoxes)
            // Draw counter variable
            winner = 0
                        
            //Make sure all Div ids are empty
            cleaner.elementsIdReset(listofSubBoxes)

            //Re establish grid event listener
            groupListener.elementsEventListenerAdder(listofSubBoxes, ox)
})

//startGame function  -> 1. Clean the grid, randomly pick player & message who starts
var startGame = () => {
        
        
        //Make sure all global variables are clean & grid is clean
        counterO = []
        counterX = []
        cleaner.emptyChildElements(listofSubBoxes)
        gameCounter = 0

         // Draw counter variable
         winner = 0

        //Make sure all div id to reset
        cleaner.elementsIdReset(listofSubBoxes)
        
        //Re establish grid event listener
        groupListener.elementsEventListenerAdder(listofSubBoxes, ox)

        // randomly pick player
        switchCounter = operator.randomPlayerNum()
        operator.oOrXFirst(switchCounter)
            
} 

//startGame Button event
startButton.addEventListener('click', startGame)



// Main Function for Game play,  Switch user by switchCounter 1/0,  0 = O, 1 = X

function ox(){
        
        // this.childNodes.length prevent repeat entry of O or X, switchCounter for switching 
        if(this.childNodes.length === 0 && switchCounter === 0){

            // switchCounter = 0 , Need A message div who's turn(I am too lazy for that, you guys guess it who's turn now)
            //appendChild(spanTag.cloneNode())  you must clone new Node for different parent element
            let newSpan = this.appendChild(spanTag.cloneNode())
            // add O class to child Node 
            newSpan.classList.add("o")
            // store id to parent to track user 
            this.dataset.id = switchCounter

                
            
            // pushing grid number into an array for Vaildation
            listofSubBoxes.forEach(function(item){

                    // to validate which number push to the array
                    // I use id to track user, id default value is reset,
                    //1 is X player
                    //As this is O player, it must have id, it must not be 1, it must not be repeated number
                if(item.dataset.id !== 'reset' && Number(item.dataset.id) !== 1  && counterO.indexOf(Number(item.className)) === -1){

                    let gridNumber = Number(item.className)
                    counterO.push(gridNumber)
                    
                }
                })
            

            print(`gameCounter ${gameCounter}`)
            gameCounter++
            operator.isWinOrDraw(switchCounter, counterO, winningCobo, gameCounter, listofSubBoxes, ox) 
            
            print(`gameCounter ${gameCounter}`)

            switchCounter++
            

        }else if(this.childNodes.length === 0 && switchCounter === 1){
            // switchCounter = 1 , Need A message div who's turn
            let newSpan = this.appendChild(spanTag.cloneNode())
            newSpan.classList.add("x")
            this.dataset.id = switchCounter
            

            // print(this.value)
            // print(this.className)
            listofSubBoxes.forEach( (item) => print(`${item.dataset.id} ${item.className}  `) )

             // pushing grid number into an array for check
            listofSubBoxes.forEach(function(item){
                if(item.dataset.id !== 'reset' && Number(item.dataset.id) !== 0  && counterX.indexOf(Number(item.className)) === -1){

                    let gridNumber = Number(item.className)
                    counterX.push(gridNumber)
                }
                
            
                })
                
            print(counterX)

                
            print(`gameCounter ${gameCounter}`)
            gameCounter++
            operator.isWinOrDraw(switchCounter, counterX, winningCobo, gameCounter, listofSubBoxes, ox) 
            
            print(`gameCounter ${gameCounter}`)

            switchCounter--
                       
            
        }

}

//for printing too lazy for console.log
function print(item){ console.log(item)}
     
