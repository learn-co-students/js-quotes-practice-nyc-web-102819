// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded and parsed');
    let url = "http://localhost:3000/quotes?_embed=likes"
    let quoteListUl = document.getElementById("quote-list")
    let newQuoteForm = document.getElementById("new-quote-form")

    function getQuotes(){
        fetch(url)
        .then((response) => response.json())
        .then(function(quotes){
            quoteListUl.innerHTML = ""
            quotes.forEach(function (quote) {
                let quoteLi = document.createElement("li")
                quoteLi.className = 'quote-card'
                quoteLi.innerHTML = `
                    <blockquote class="blockquote">
                    <p class="mb-0">${quote.quote}</p>
                    <footer class="blockquote-footer">${quote.author}</footer>
                    <br>
                    <button class='btn-success' data-id=${quote.id}>Likes: <span data-id=${quote.id}>${quote.likes.length}</span></button>
                    <button data-id=${quote.id} class='btn-danger'>Delete</button>
                    <hr>
                    </blockquote>
                `
                quoteListUl.appendChild(quoteLi)
            })
        })
    }
        
    


    newQuoteForm.addEventListener("submit", function(e){
        e.preventDefault()
        let newQuote = e.target[0].value
        let newAuthor = e.target[1].value
        
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({quote: newQuote, author: newAuthor})
            })
            .then(response => console.log(response))
            .then(response => getQuotes())  
    })

   
    quoteListUl.addEventListener("click", function(e){
        if (e.target.innerText === "Delete") {
            quoteId = e.target.dataset.id
            fetch((`http://localhost:3000/quotes/${quoteId}`), {
                method: 'DELETE',
                })
                .then(response => console.log(response))
                .then(response => getQuotes())
        } else if (e.target.className == "btn-success") {
            quoteId = e.target.dataset.id
            fetch("http://localhost:3000/likes", {
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify({quoteId: parseInt(quoteId, 10)})
                
                })
                .then(response => console.log(response))
                .then(response => getQuotes())
            

        }
    })
    getQuotes()

});