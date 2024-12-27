// Fetch the content from the mock AQI JSON file
fetch('data/content.json')
  .then(response => response.json())
  .then(data => {
    const { about } = data;
    document.getElementById('causes').innerHTML = `<h3>Causes</h3>${about.causes.map(item => `<p>${item}</p>`).join('')}`;
    document.getElementById('effects').innerHTML = `<h3>Effects</h3>${about.effects.map(item => `<p>${item}</p>`).join('')}`;
    document.getElementById('solutions').innerHTML = `<h3>Solutions</h3>${about.solutions.map(item => `<p>${item}</p>`).join('')}`;
  });
fetch('mock/mock-aqi.json')
  .then(response => response.json())
  .then(data => {
    const { cities } = data;

    // Dynamically create a list of cities and their AQI data
    const cityList = document.createElement('div');
    cityList.className = 'city-list';

    cities.forEach(city => {
      const cityDiv = document.createElement('div');
      cityDiv.className = 'city';
      cityDiv.innerHTML = `
        <h3>${city.name}</h3>
        <p>AQI: ${city.aqi}</p>
        <p>Status: ${city.status}</p>
      `;
      cityList.appendChild(cityDiv);
    });

    // Append the city list to the AQI result section
    document.getElementById('aqi-result').appendChild(cityList);
  })
  .catch(error => {
    console.error('Error loading the AQI data:', error);
    document.getElementById('aqi-result').textContent = 'Failed to load AQI data.';
  });

// AQI Checker functionality
document.getElementById('check-aqi').addEventListener('click', () => {
  const cityInput = document.getElementById('city-input').value.trim();

  if (!cityInput) {
    document.getElementById('aqi-result').textContent = 'Please enter a city name.';
    return;
  }

  // Check if the entered city matches any city in the mock data
  fetch('mock/mock-aqi.json') // Replace this with real API call later if you have the API key
    .then(response => response.json())
    .then(data => {
      const cityData = data.cities.find(city => city.name.toLowerCase() === cityInput.toLowerCase());

      if (cityData) {
        const { aqi, status } = cityData;
        document.getElementById('aqi-result').innerHTML = `
          <p>City: ${cityInput}</p>
          <p>AQI: ${aqi}</p>
          <p>Status: ${status}</p>
        `;
      } else {
        document.getElementById('aqi-result').textContent = 'City not found in the AQI data.';
      }
    })
    .catch(() => {
      document.getElementById('aqi-result').textContent = 'Failed to fetch AQI data.';
    });
});
