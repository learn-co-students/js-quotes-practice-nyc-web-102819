// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 

//fetch from 'http://localhost:3000/quotes?_embed=likes'
//create ul with specific structure √
//append ul to container √
//print all quotes √

//add event listener to submit √
//create post request √
//append to container √

//add event listener to click for delete and likes √
//assign data-id
//find parent node
//delete request on target √
//remove from dom √

//assign dataset to likes √
//find like node √
//send post request to likes page and update db
//update likes in span √

document.addEventListener('DOMContentLoaded', function () {
let quoteList = document.getElementById('quote-list')
let form = document.getElementById("new-quote-form")

    function getQuotes() {
        fetch('http://localhost:3000/quotes?_embed=likes')
        .then(function(response) {
        return response.json();
        })
        .then(function(quotes) {
        quotes.forEach(function(quote) {
            appendQuote(quote)
            });  
        })
        }

getQuotes()

    function appendQuote(quote) {
        let ul = document.createElement('ul')
        ul.innerHTML = `
            <li class='quote-card'>
            <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success' data-quote-id=${quote.id}>Likes: <span>0</span></button>
            <button class='btn-danger'data-quote-id=${quote.id}>Delete</button>
            </blockquote>
            </li> 
            `
        quoteList.append(ul)
        }

    form.addEventListener('submit', function(e){
        e.preventDefault()
        let quote = e.target[0].value
        let author = e.target[1].value
        let newQuote = {quote: `${quote}`, author: `${author}`}
        
        fetch('http://localhost:3000/quotes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuote)
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(quote) {
            appendQuote(quote)
            form.reset()
        })
        
    })

    document.addEventListener("click", function(e) {
       //let span = document.getElementsByTagName('span')[0]
        if (e.target.innerText === "Delete") {
            e.target.parentNode.parentNode.remove()
            //debugger
            fetch(`http://localhost:3000/quotes/${e.target.dataset.quoteId}`, {
            method: 'DELETE'
            })
        }
         else if (e.target.className == "btn-success") {
             //console.log(e.target)
             //debugger 
             //e.target.childNodes[1].innerText++ + 1
        //or      e.target.childNodes[1].innerText = parseInt(e.target.childNodes[1].innerText) + 1

            fetch('http://localhost:3000/likes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
          body: JSON.stringify ({ quoteId: parseInt(`${e.target.dataset.quoteId}`), createdAt: 12345})
         })
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                e.target.childNodes[1].innerText++ + 1
            })
            }
        })
        
})
