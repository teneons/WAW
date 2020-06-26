//site settings
const apiId = '2a4a207e504ae6c48ab505a543702a9d';
let SettingsSiteLang = 'en';
    let ErrorNotFoundEN = 'Settlement is not found';
    let ErrorEmptyFieldEN = 'Field is empty';

let SettingsUnitsMetric = 'metric';
let SettingsUnitsImperial = 'imperial';

let SettingsUIModeLight = 'Light';
let SettingsUIModeBlack = 'Black';

//input part
let InputCity = document.querySelector('.InputCity');
let SearchBtn = document.querySelector('.SearchBtn');
let InputMessageBox = document.querySelector('.InputMessageBox');
//show part
let WeatherCard = document.querySelector('.WeatherCard');
let NameCity = document.querySelector('.NameCity');
let WeatherIcon = document.querySelector('.WeatherIcon');
let JustIcon = document.querySelector('.JustIcon');
let StateWeather = document.querySelector('.StateWeather');
let Temperature = document.querySelector('.Temperature');
let TemprtrSup = document.querySelector('.TemprtrSup');
//additional part
let SunriseTime = document.querySelector('.SunriseTime');
let SunsetTime = document.querySelector('.SunsetTime');
let ProgressDay = document.querySelector('.ProgressDay');
let Humidity = document.querySelector('.Humidity');
let Pressure = document.querySelector('.Pressure');
let Visibility = document.querySelector('.Visibility');
let SpeedWind = document.querySelector('.SpeedWind');


//checking field at - empty
function auditField () {
    if(InputCity.value == '') {
        InputMessageBox.style.visibility = 'visible';
        InputMessageBox.innerHTML = ErrorEmptyFieldEN;
    } else {
        InputMessageBox.style.visibility = 'hidden';
        queryWeather()
    }
}

//query
async function queryWeather() {
    try{
        InputMessageBox.style.visibility = 'hidden';
        const getJsonWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${InputCity.value}&lang=${SettingsSiteLang}&units=${SettingsUnitsMetric}&appid=${apiId}`);
        const data = await getJsonWeather.json();
        return await setWeatherData(data);
    } catch (e) {
        if(e instanceof TypeError) {
            WeatherCard.style.visibility = 'hidden';
            WeatherCard.style.animationName = '';
            InputMessageBox.style.visibility = 'visible';
            InputMessageBox.innerHTML = ErrorNotFoundEN;
            InputCity.value = '';
        }
    }
}

//btn actions
SearchBtn.addEventListener('click', auditField)
InputCity.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') auditField();
})


//show data on card
function setWeatherData (dataWeather) {
    WeatherCard.style.visibility = 'visible';
    WeatherCard.style.animationName = 'crawlLine';
    //out city name
    NameCity.innerHTML = `${dataWeather.name}, ${dataWeather.sys.country}`;

    //out icon and description (because they are into one array)
    for(let i of dataWeather.weather) {
        StateWeather.innerHTML = i.description;

        if(i.icon == '01d') JustIcon.style.backgroundImage = 'url(media/01d.png)';
        if(i.icon == '01n') JustIcon.style.backgroundImage = 'url(media/01n.png)';
        if(i.icon == '02d') JustIcon.style.backgroundImage = 'url(media/02d.png)';
        if(i.icon == '02n') JustIcon.style.backgroundImage = 'url(media/02n.png)';
        if(i.icon == '03d') JustIcon.style.backgroundImage = 'url(media/03n.png)';
        if(i.icon == '03n') JustIcon.style.backgroundImage = 'url(media/03n.png)';
        if(i.icon == '04d') JustIcon.style.backgroundImage = 'url(media/04n.png)';
        if(i.icon == '04n') JustIcon.style.backgroundImage = 'url(media/04n.png)';
        if(i.icon == '09d') JustIcon.style.backgroundImage = 'url(media/09n.png)';
        if(i.icon == '09n') JustIcon.style.backgroundImage = 'url(media/09n.png)';
        if(i.icon == '10d') JustIcon.style.backgroundImage = 'url(media/10d.png)';
        if(i.icon == '10n') JustIcon.style.backgroundImage = 'url(media/10d.png)';
        if(i.icon == '11d') JustIcon.style.backgroundImage = 'url(media/11n.png)';
        if(i.icon == '11n') JustIcon.style.backgroundImage = 'url(media/11n.png)';
        if(i.icon == '13d') JustIcon.style.backgroundImage = 'url(media/13d.png)';
        if(i.icon == '13n') JustIcon.style.backgroundImage = 'url(media/13d.png)';
        if(i.icon == '50d') JustIcon.style.backgroundImage = 'url(media/50n.png)';
        if(i.icon == '50n') JustIcon.style.backgroundImage = 'url(media/50n.png)';
    }

    //out temperature
    if(dataWeather.main.temp < 0) {
        Temperature.style.color = '#999999';
    }
    if(dataWeather.main.temp >= 0) {
        Temperature.style.color = '#FFA724';
    }
    Temperature.innerHTML = Math.round(dataWeather.main.temp) + '<sup class="TemprtrSup">&degC</sup>';

    //SunRaiseSet
    let sunrise = dataWeather.sys.sunrise;
    let sunset = dataWeather.sys.sunset;
    let newSunrise = new Date (1000 * sunrise);
    let newSunset = new Date (1000 * sunset);

    SunriseTime.innerHTML = `${newSunrise.getHours()}:${newSunrise.getMinutes()}`;
    SunsetTime.innerHTML = `${newSunset.getHours()}:${newSunset.getMinutes()}`;

    //progress rar day
    let strSunrise = `${newSunrise.getHours()}.${newSunrise.getMinutes()}`;
    let strSunset = `${newSunset.getHours()}.${newSunset.getMinutes()}`;
    let d = new Date();
    let timeNow = `${d.getHours()}.${d.getMinutes()}`;

    let fullDay = strSunset - strSunrise;
    let dayConducted = timeNow - strSunrise;

    let dayPassInPercent = Math.round((dayConducted / fullDay) * 100);
    ProgressDay.style.width = `${dayPassInPercent}%`;

    //convert & out Additional info
    Humidity.innerHTML = `${dataWeather.main.humidity}%`;

    if(SettingsSiteLang == 'en') {
        SpeedWind.innerHTML = `${dataWeather.wind.speed} m/s`;
        Visibility.innerHTML = `${dataWeather.visibility} m`;
        Pressure.innerHTML = `${dataWeather.main.pressure} hPa`;
    } else if(SettingsSiteLang == 'ua') {
        Visibility.innerHTML = `${Math.round(dataWeather.visibility / 1000)} км`;
        SpeedWind.innerHTML = `${dataWeather.wind.speed * 3.6} км/г`;
        Pressure.innerHTML = `${Math.round(dataWeather.main.pressure * 0.75006375541921)} мм.рт.ст.`;
    }

    if(dataWeather.visibility == undefined) {
        Visibility.innerHTML = `X`;
    }

    //change circle color for additional info
    if(dataWeather.main.humidity >= 80) {
        Humidity.style.borderColor = '#34A853';
    } else if(dataWeather.main.humidity >= 60 && dataWeather.main.humidity < 80) {
        Humidity.style.borderColor = '#FBBC05';
    } else if(dataWeather.main.humidity < 60) {
        Humidity.style.borderColor = '#EA4335';
    }

    if(dataWeather.wind.speed <= 9) {
        SpeedWind.style.borderColor = '#34A853';
    } else if(dataWeather.wind.speed >= 10 && dataWeather.wind.speed <= 20) {
        SpeedWind.style.borderColor = '#FBBC05';
    } else if(dataWeather.wind.speed > 20) {
        SpeedWind.style.borderColor = '#EA4335';
    }

    if(dataWeather.visibility >= 9000) {
        Visibility.style.borderColor = '#34A853';
    } else if(dataWeather.visibility >= 3000 && dataWeather.visibility < 9000) {
        Visibility.style.borderColor = '#FBBC05';
    } else if(dataWeather.visibility < 2000) {
        Visibility.style.borderColor = '#EA4335';
    }

}
