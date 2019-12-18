// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
 
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    let list = document.getElementById('quote-list')

    
    function addQuote(quote) {
        list.innerHTML += `
        <li class='quote-card' data-id = ${quote.id} data-likes = ${quote.likes.length}>
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
        </blockquote>
        </li>
        `
    }
    
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(response => response.json())
    .then(data => {
        
        // console.log(data)
        // console.dir(data[0])
        // console.log(data[0].id)
        // console.log(data[0].author)
        // console.log(data[0].quote)
        // console.log(data[0].likes.length)
        
        data.forEach(quote => {
            addQuote(quote)       
        })
    })

    
    let form = document.getElementById('new-quote-form')

    form.addEventListener("submit", e => {
        e.preventDefault()

        // console.dir(e.target[0].value)
        // console.dir(e.target[1].value)

        fetch("http://localhost:3000/quotes",{
            method: "POST",
            headers: {
                "Accept":"application/json",
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                quote: e.target[0].value,
                author: e.target[1].value,
                likes: []
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            addQuote(data)
        })
    })

    list.addEventListener("click", e => {
        console.log(e.target.className)
        console.log(e.target.parentNode.parentNode)
        console.log(e.target.parentNode.parentNode.dataset.id)
        console.log(e.target.parentNode.parentNode.dataset.likes)
        console.log(e.target.innerText)
        

        if (e.target.className === "btn-danger"){
            e.target.parentNode.parentNode.remove()

            fetch(`http://localhost:3000/quotes/${e.target.parentNode.parentNode.dataset.id}`,{
                method: "DELETE"
            })
        }

        if (e.target.className === "btn-success"){
            console.log("like++")
            fetch("http://localhost:3000/likes",{
                method: "POST",
                headers: {
                    "Accept":"application/json",
                    "Content-type":"application/json"
                },
                body: JSON.stringify({
                    quoteId: parseInt(e.target.parentNode.parentNode.dataset.id),
                    cratedAt: Date.now()
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let likes = parseInt(e.target.parentNode.parentNode.dataset.likes)
                e.target.innerText = `Likes: ${likes += 1}`

            })
        }
    })














 // end of master DOM window
})