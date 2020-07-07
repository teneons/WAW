//site settings
const apiId = '2a4a207e504ae6c48ab505a543702a9d';

let Body = document.body;
Body.onload = () => {
    let valueTmpPoint = localStorage.getItem('tempPoint');
    continueCode: if(valueTmpPoint == 1) {
        break continueCode;
    } else if (valueTmpPoint != 1) {
        localStorage.setItem('tempPoint', 1);
        localStorage.setItem('language', 'en');
        localStorage.setItem('Temerature', 'C');
        localStorage.setItem('Theme', 'Light');
    }
}


let SettingsSiteLang = localStorage.getItem('language');
console.log(SettingsSiteLang)

let LangEN = ['What About the Weather?', 'Input settlement..', 'Settlement is not found', 'Field is empty', 'Search', 'Humidity', 'SpeedWind', 'Visibility', 'Pressure']
let LangUA = ['Що по погоді?', 'Введіть населений пункт..', 'Населений пункт не знайдено', 'Пусте поле', 'Пошук', 'Вологість', 'Шв. вітру', 'Видимість', 'Тиск'];
let LangNOW;

if(SettingsSiteLang == 'en') {
    LangNOW = LangEN;
} else if (SettingsSiteLang == 'ua') {
    LangNOW = LangUA;
}


let TaglineText = document.querySelector('.TaglineText');
//input part
let SettingsBtn = document.querySelector('.SettingsBtn');
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
let SpeedWind = document.querySelector('.SpeedWind');
let Pressure = document.querySelector('.Pressure');
let Visibility = document.querySelector('.Visibility');

//main lang. audit
TaglineText.innerText = LangNOW[0];
InputCity.innerText.placeholder = LangNOW[1];
SearchBtn.innerText = LangNOW[4];
document.querySelector('.HumidityTxt').innerText = LangNOW [5];
document.querySelector('.SpeedWindTxt').innerText = LangNOW[6];
document.querySelector('.VisibilityTxt').innerText = LangNOW[7];
document.querySelector('.PressureTxt').innerText = LangNOW [8];

//checking field at - empty
function auditField () {
    if(InputCity.value == '') {
        InputMessageBox.style.visibility = 'visible';
        InputMessageBox.innerHTML = LangNOW[3];
    } else {
        InputMessageBox.style.visibility = 'hidden';
        queryWeather();
    }
}

//determine metric
let SettingsUnitsMetric;
if(localStorage.getItem('Temerature') == 'C') {
    SettingsUnitsMetric = 'Metric';
} else if(localStorage.getItem('Temerature') == 'F') {
    SettingsUnitsMetric = 'Imperial';
}

//query
async function queryWeather() {
    try{
        InputMessageBox.style.visibility = 'hidden';
        const getJsonWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${InputCity.value}&lang=${SettingsSiteLang}&units=${SettingsUnitsMetric}&appid=${apiId}`);
        const data = await getJsonWeather.json();
        return await setWeatherData(data), await getLatLonData(data.name);
    } catch (e) {
        if(e instanceof TypeError) {
            WeatherCard.style.visibility = 'hidden';
            WeatherCard.style.animationName = '';
            InputMessageBox.style.visibility = 'visible';
            InputMessageBox.innerHTML = LangNOW[2];

            //if city is false - clear input
            InputCity.value = '';
        }
    }
}

//btn actions
SearchBtn.addEventListener('click', auditField)
InputCity.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') auditField();
})

//map part
async function getLatLonData(cityName) {
    let nominatimQ = await fetch(`https://nominatim.openstreetmap.org/?addressdetails=0&q='${cityName}'&format=json&limit=1`);
    let dataCity = await nominatimQ.json();
    let fourCords;
    for (let i of dataCity) {
        fourCords = i.boundingbox;
    }

    //set to url for map
    document.querySelector('.JustMap').src = `https://www.openstreetmap.org/export/embed.html?bbox=${fourCords[2]}%2C${fourCords[0]}%2C${fourCords[3]}%2C${fourCords[1]}&amp;layer=mapnik`;
}

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

    //show Celsius / Fahrenheit 
    let CelFah;
    if(localStorage.getItem('Temerature') == 'C') {
        CelFah = '&degC'
    } else if(localStorage.getItem('Temerature') == 'F') {
        CelFah = '&degF'
    }
    Temperature.innerHTML = Math.round(dataWeather.main.temp) + `<sup class="TemprtrSup">${CelFah}</sup>`;

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
        SpeedWind.innerHTML = `${dataWeather.wind.speed} mil/h`;
        Visibility.innerHTML = `${dataWeather.visibility} m`;
        Pressure.innerHTML = `${dataWeather.main.pressure} hPa`;
    } else if(SettingsSiteLang == 'ua') {
        SpeedWind.innerHTML = `${Math.ceil(dataWeather.wind.speed * 3.6)} км/г`;
        Visibility.innerHTML = `${Math.round(dataWeather.visibility / 1000)} км`;
        Pressure.innerHTML = `${Math.round(dataWeather.main.pressure * 0.75006375541921)} мм.рт.ст.`;
    }

    if(dataWeather.visibility == undefined) {
        Visibility.innerHTML = `..`;
        Visibility.style.borderColor = '#000000';
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

//site settings
let SettingsWindow = document.querySelector('.SettingsWindow');
let BtnSaveSettings = document.querySelector('.BtnSaveSettings');
let SetLangEN = document.querySelector('.SetLangEN');
let SetLangUA = document.querySelector('.SetLangUA');
let TemeratureF = document.querySelector('.TemeratureF');
let TemeratureC = document.querySelector('.TemeratureC');
let ThemeLight = document.querySelector('.ThemeLight');
let ThemeDark = document.querySelector('.ThemeDark');

SettingsBtn.addEventListener('click', () => {
    SettingsWindow.style.animationName = 'showSettingsWindow';
    SettingsWindow.style.visibility = 'visible';
})

BtnSaveSettings.addEventListener('click', () => {
    SettingsWindow.style.visibility = 'hidden';
})

if (localStorage.language == 'en') {
    SetLangEN.checked = true;
    SetLangUA.checked = false;
} else if (localStorage == 'ua') {
    SetLangUA.checked = true;
    SetLangEN.checked = false;
}