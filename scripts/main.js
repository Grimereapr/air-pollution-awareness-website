// Load JSON content dynamically
fetch('data/content.json')
  .then(response => response.json())
  .then(data => {
    const { about } = data;
    document.getElementById('causes').innerHTML = `<h3>Causes</h3>${about.causes.map(item => `<p>${item}</p>`).join('')}`;
    document.getElementById('effects').innerHTML = `<h3>Effects</h3>${about.effects.map(item => `<p>${item}</p>`).join('')}`;
    document.getElementById('solutions').innerHTML = `<h3>Solutions</h3>${about.solutions.map(item => `<p>${item}</p>`).join('')}`;
  });

// AQI Checker
document.getElementById('check-aqi').addEventListener('click', () => {
  const city = document.getElementById('city-input').value;

  if (!city) {
    document.getElementById('aqi-result').textContent = 'Please enter a city name.';
    return;
  }

  // Mock or live API call
  fetch('mock/mock-aqi.json') // Replace with live API if available
    .then(response => response.json())
    .then(data => {
      const { aqi, status } = data.data;
      document.getElementById('aqi-result').innerHTML = `City: ${city}<br>AQI: ${aqi}<br>Status: ${status}`;
    })
    .catch(() => {
      document.getElementById('aqi-result').textContent = 'Failed to fetch AQI data.';
    });
});

