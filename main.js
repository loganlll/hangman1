const button = document.querySelector('button')


let wordArray = ['cat', 'dog', 'car', 'forest', 'computer', 'pizza', 'house', 'music', 'game', 'water', 'map', ]
let buttonClicked = false;


let randomWord = function () {
    let randomNumber = Math.floor(Math.random() * wordArray.length)
    return wordArray[randomNumber]
}




class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word
        this.remainingGuesses = remainingGuesses
        this.numberOfGuesses = 0
    }
    setBlanks() {
        let wordToArray = this.word.split('')
        wordToArray.forEach(function (letter) {
            var x = document.createElement("p");
            var t = document.createTextNode('_');
            x.appendChild(t);
            document.querySelector('#guess').appendChild(x);
        })
    }
    makeGuess(guess, span) {

        let wordToArray = this.word.split('')
        wordToArray.forEach(function (letter, index) {
            if (guess === letter) {
                document.getElementById('guess').getElementsByTagName('p')[index].innerHTML = guess
            }
        })


        if (!wordToArray.includes(guess) && this.numberOfGuesses <= 5 && guess.length <= 1) {
            this.numberOfGuesses++
            document.querySelector('#gallow').setAttribute('src', `img/${this.numberOfGuesses}.png`)
            this.remainingGuesses--

            if (span.tagName === 'SPAN') {
                span.style.color = 'red'
            }


        }

        if (this.numberOfGuesses === 6) {
            document.querySelector('#guess').innerHTML = ''
            var x = document.createElement("p");
            var t = document.createTextNode('Game Over!');
            x.appendChild(t);
            document.querySelector('#guess').appendChild(x);

            document.querySelector('button').innerHTML = 'Restart'
            button.addEventListener('click', () => {
                location.reload();
                this.setBlanks()
                // let man = document.querySelector('.man')
                // man.parentNode.removeChild(man)
                // let newGame = new Hangman(randomWord(), 6)
                // document.querySelector('#guess').innerHTML = ''
                // this.numberOfGuesses = 0;
                // this.setBlanks()
            })
        }



    }


}



let game1 = new Hangman(randomWord(), 6)

button.addEventListener('click', function () {
    if (!buttonClicked) {
        game1.setBlanks()
        buttonClicked = true;
    }

    document.querySelectorAll('span').forEach(function (spanItem) {
        spanItem.style.visibility = 'visible'
    })

})

document.querySelector('.alphabet').addEventListener('click', function (e) {
    // console.log(e)
    game1.makeGuess(e.target.textContent.toLowerCase(), e.target)
})