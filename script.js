const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const quoteContainer = document.getElementById('quote-container')
const loader = document.getElementById('loader')


function showLoader() {
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoader() {
    if(!loader.hidden) {
    loader.hidden = true
    quoteContainer.hidden = false
    }
}


// Get QUote from API
async function getQuote() {
    showLoader()
    const proxyUrl = 'https://secret-ocean-49799.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    
    try {
        const response =  await fetch(proxyUrl + apiUrl)
        const data  = await response.json()
        console.log(data)
        if(data.quoteAuthor === ''){
            quoteAuthor.innerText = 'Unknown'
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
            
        } else {
            quoteText.classList.remove('long-quote')
        }
        
        quoteText.innerText = data.quoteText

        removeLoader()
    }catch(error) {
        
        console.log('Whoops cant get quote', error)
    }
    
}

// Calling getQuote method
getQuote()

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click',getQuote)