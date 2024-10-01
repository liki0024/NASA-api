// async function fetchAPOD() {
//     const apiKey = "103KunKoX3nLa0q0WXCwc7S1Fd7takwQz4ayuaMC"
//     const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         displayAPOD(data);
//     } catch (error) {
//         console.error('Error fetching the APOD data:', error);
//         document.getElementById('content').innerHTML = '<p>Failed to load data</p>';
//     }
// }

// function displayAPOD(data) {
//     const contentDiv = document.getElementById('content');
//     const media = data.media_type === 'video' ? `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>` : `<img src="${data.url}" alt="${data.title}">`;

//     const apodInfo = `
//         <h2>${data.title}</h2>
//         <p>${data.date}</p>
//         ${media}
//         <p>${data.explanation}</p>
//     `;

//     contentDiv.innerHTML = apodInfo;
// }

// fetchAPOD();








document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm === '') {
        alert('Please enter a search term');
        return;
    }

    const apiKey = "103KunKoX3nLa0q0WXCwc7S1Fd7takwQz4ayuaMC"
    const url = `https://images-api.nasa.gov/search?q=${searchTerm}`;

    // Show loading indicator
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsDiv.innerHTML = '<p>Error fetching data. Please try again later.</p>';
        });
});

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';  // Clear previous results

    const items = data.collection.items;
    if (items.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    items.forEach(item => {
        const title = item.data[0].title;
        const description = item.data[0].description || 'No description available';
        const imageUrl = item.links ? item.links[0].href : '';

        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
            ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
        `;
        resultsDiv.appendChild(resultItem);
    });
}

// Add event listener for Enter key press
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('search-button').click();
    }
});
