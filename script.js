const apiKey = 'df4e1adf6ca88221f503f4902ac2172e';

function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherInfo = document.getElementById('weatherInfo');
    const errorMessage = document.getElementById('errorMessage');

    // Καθαρίζουμε τα παλιά μηνύματα
    weatherInfo.innerHTML = '';
    errorMessage.textContent = '';

    if (!city) {
        errorMessage.textContent = 'Παρακαλώ εισάγετε πόλη.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=el`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                errorMessage.textContent = `Σφάλμα: ${data.message}`;
                return;
            }

            const html = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <h3>${data.weather[0].description}</h3>
                <p>Θερμοκρασία: ${data.main.temp}°C</p>
                <p>Αίσθηση: ${data.main.feels_like}°C</p>
                <p>Υγρασία: ${data.main.humidity}%</p>
                <p>Άνεμος: ${data.wind.speed} m/s</p>
            `;
            weatherInfo.innerHTML = html;
        })
        .catch(err => {
            errorMessage.textContent = 'Πρόβλημα σύνδεσης με το API.';
            console.error(err);
        });
}





