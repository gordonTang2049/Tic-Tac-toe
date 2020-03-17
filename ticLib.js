
function cleanerFn(){
    return {
        elementsIdReset: (collectionOfElements) => {
            collectionOfElements.forEach( (element) => element.dataset.id = 'reset')        

        }, 
        emptyChildElements: (collectionOfElements) => {
            collectionOfElements.forEach( (element) => $(element).empty() )           
        }
            
    }

}



function elementsEventListenerHandler(){
    return{
        elementsEventListenerAdder: (collectionOfElements, fn) => {
            collectionOfElements.forEach ( 
                function(element){
                    element.addEventListener('click', fn)
                }
            )
                    
        },
        groupEventListenerRemover: (collectionOfElements, fn) => {
                    collectionOfElements.forEach ( 
                        function(element){
                            element.removeEventListener('click', fn)
                        }
                    )
                }
          
            }
    }



    

function operatorFn(){
        let remover = elementsEventListenerHandler()

    return {
        ...elementsEventListenerHandler(),
                randomPlayerNum: () => {
            let ranNum = Math.round((Math.random() * 10) + 0.5);
            return ranNum%2
            },
        oOrXFirst: (counter) => {
            return counter === 0 ? alert('O start first') : alert('X start first')
            },
            
       isWinOrDraw: (playerNum, playerSelectedGrids, wCombo, numberOfGame, boxElement, fn) => {
                let win = false
            wCombo.forEach( (setOfCombo) => {

                console.log(`${win} win var`)

                let winningCounter = 0
                let winningNumber = 0
                
                

                for(let i = 0; i < playerSelectedGrids.length; i++){
                    winningNumber = setOfCombo.indexOf(playerSelectedGrids[i])

                    if(winningNumber !== -1){
                        winningCounter++
                        
                    }
                    
                }
                    
                if(winningCounter === 3 && playerNum === 0){
                    alert(`O is the winner`)
                    win = true
                    //
                    remover.groupEventListenerRemover(boxElement, fn)
                }else if (winningCounter === 3 && playerNum === 1){
                    alert(`X is the winner`)
                    win = true
                    //
                    remover.groupEventListenerRemover(boxElement, fn)
                            
                }

            })
                if(win === false && numberOfGame === 9){
                    // When player wins at the end, it will show draw but actually winning (fix bug)

                    alert(`DRAW`)
                    win = true
                    remover.groupEventListenerRemover(boxElement, fn)
                        }

       }
    }
}