// min funktion för att visa klockan och datum på min dashboard
function displayTimeFromAPI() {
  const clock = document.getElementById('clock');
  // Hämta tid och datum 
  fetch('https://worldtimeapi.org/api/ip') 
    .then(response => response.json())
    .then(data => {
      const time = new Date(data.datetime);
      const options = {hour: 'numeric', minute: 'numeric'};
      const formattedTime = time.toLocaleTimeString(undefined, options);
      const formattedDate = time.toLocaleDateString();
      clock.textContent = `${formattedTime} - ${formattedDate}`;
    })
    .catch(error => {
      console.error('Det gick inte att hämta tid och datum:', error);
    });
}

// Uppdatera klockan från API:et varje sekund
setInterval(displayTimeFromAPI, 1000);

// Visa klockan från API:et när sidan laddas för första gången
displayTimeFromAPI();

// min section för att fixa min titel redigebar
const titleChange = document.getElementById('title-change');

titleChange.addEventListener('input', function() {
  // Spara ändringar direkt när användaren skriver
  saveTitle();
});

titleChange.addEventListener('blur', function() {
  // Spara ändringar när användaren klickar utanför rubriken
  saveTitle();
});

function saveTitle() {
  // Hämta det redigerbara textinnehållet och spara det i localStorage
  const editedTitle = titleChange.textContent;
  localStorage.setItem('dashboardTitle', editedTitle);
}

// Ladda in den sparade rubriken vid sidans laddning
window.addEventListener('DOMContentLoaded', function() {
  const savedTitle = localStorage.getItem('dashboardTitle');
  if (savedTitle) {
    titleChange.textContent = savedTitle;
  }
});

// min JS för card1
const linkForm = document.getElementById('linkForm');
const linkList = document.getElementById('linkList');

linkForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Hämta värdena från formuläret
  const linkTitle = document.getElementById('linkTitle').value;
  const linkURL = document.getElementById('linkURL').value;

  // Lägg till länken till listan om rubrik och URL är ifyllda
  if (linkTitle && linkURL) {
    addLinkToList(linkTitle, linkURL);
    linkForm.reset(); // Återställ formuläret efter att länken har lagts till
  }
});

// Funktion för att lägga till länken till listan
function addLinkToList(title, url) {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = url;
  link.textContent = title;
  link.target = '_blank';

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '&times;'; // Lägg till ett kryss (X)
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function() {
    listItem.remove(); // Ta bort länken från listan
  });

  listItem.appendChild(link);
  listItem.appendChild(deleteButton);
  linkList.appendChild(listItem);
}

// min JS för card2 

const weatherInfo = document.getElementById('weatherInfo');

function displayWeatherInfo(latitude, longitude) {
  const apiKey = '5d408fe9708a1050a9d2d90f5e57e751';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const city = data.name;
      const temperatureCelsius = data.main.temp;
      const weatherDescription = data.weather[0].description;

      const weatherHTML = `
        <p>Plats: ${city}</p>
        <p>Temperatur: ${temperatureCelsius}°C</p>
        <p>Väderbeskrivning: ${weatherDescription}</p>
      `;

      weatherInfo.innerHTML = weatherHTML;
    })
    .catch(error => {
      console.error('Det gick inte att hämta väderinformation:', error);
      weatherInfo.textContent = 'Kunde inte hämta väderinformation.';
    });
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      displayWeatherInfo(latitude, longitude);
    }, error => {
      console.error('Platshämtning misslyckades:', error);
      weatherInfo.textContent = 'Platshämtning misslyckades.';
    });
  } else {
    weatherInfo.textContent = 'Din webbläsare stödjer inte platstjänster.';
  }
}

getWeatherByLocation();


// min JS för Card3

const apiKey = 'f4427e11f1194234b8a954aaac72fac8';
const country = 'se'; 
const newsList = document.getElementById('newsList');

const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;

    articles.forEach(article => {
      const { title, description, url } = article;

      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3><a href="${url}" target="_blank">${title}</a></h3>
        <p>${description}</p>
      `;

      newsList.appendChild(listItem);
    });
  })
  .catch(error => {
    console.error('Det gick inte att hämta nyheter:', error);
    const errorMessage = document.createElement('li');
    errorMessage.textContent = 'Kunde inte hämta nyheter.';
    newsList.appendChild(errorMessage);
  });

  // Min JS för Card4

  const noteArea = document.getElementById('noteArea');

// Funktion för att spara anteckningen i localStorage
function saveNote() {
  localStorage.setItem('userNote', noteArea.value);
}

// Funktion för att hämta och visa sparad anteckning från localStorage
function displaySavedNote() {
  const savedNote = localStorage.getItem('userNote');
  if (savedNote) {
    noteArea.value = savedNote;
  }
}

// Lyssna på ändringar i textarean och spara anteckningen kontinuerligt
noteArea.addEventListener('input', () => {
  saveNote();
});

// Visa den sparade anteckningen vid sidans laddning
displaySavedNote();


// min JS för knapp

function getRandomImage() {
  const apiKey = 'NKdkGe1I8CNk0n05w6BDGfNYbWbtQFxo5uXX5wkw9oo';
  const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.urls.regular;

      // Använd bildens URL som bakgrund för dashboarden
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
    })
    .catch(error => {
      console.error('Det gick inte att hämta bild:', error);
      // Hantera eventuella fel här, t.ex. visa ett meddelande för användaren
    });
}





