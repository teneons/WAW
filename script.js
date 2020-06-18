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
let StateWeather = document.querySelector('.StateWeather');
let Temperature = document.querySelector('.Temperature');


//query
async function queryWeather() {
    try{
        InputMessageBox.style.visibility = 'hidden';
        const getJsonWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${InputCity.value}&lang=${SiteLang}&units=${UnitsImperial}&appid=${apiId}`);
        const data = await getJsonWeather.json();
        return await setWeatherData(data);
    } catch (e) {
        if(e instanceof TypeError) {
            InputMessageBox.style.visibility = 'visible';
            InputMessageBox.innerHTML = ErrorNotFoundEN;
        }
    }
}

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

//btn actions
SearchBtn.addEventListener('click', auditField)
InputCity.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') auditField();
})

//show data on card
function setWeatherData (dataWeather) {
                                                                                                    console.log(dataWeather)
    NameCity.innerHTML = `${dataWeather.name}, ${dataWeather.sys.country}`;

    for(let i of dataWeather.weather){
        StateWeather.innerHTML = i.description;

        if(i.icon == '01d') WeatherIcon.style.backgroundImage = 'url(media/01d.png)';
        if(i.icon == '01n') WeatherIcon.style.backgroundImage = 'url(media/01n.png)';
        if(i.icon == '02d') WeatherIcon.style.backgroundImage = 'url(media/02d.png)';
        if(i.icon == '02n') WeatherIcon.style.backgroundImage = 'url(media/02n.png)';
        if(i.icon == '03d') WeatherIcon.style.backgroundImage = 'url(media/03n.png)';
        if(i.icon == '03n') WeatherIcon.style.backgroundImage = 'url(media/03n.png)';
        if(i.icon == '04d') WeatherIcon.style.backgroundImage = 'url(media/04n.png)';
        if(i.icon == '04n') WeatherIcon.style.backgroundImage = 'url(media/04n.png)';
        if(i.icon == '09d') WeatherIcon.style.backgroundImage = 'url(media/09n.png)';
        if(i.icon == '09n') WeatherIcon.style.backgroundImage = 'url(media/09n.png)';
        if(i.icon == '10d') WeatherIcon.style.backgroundImage = 'url(media/10d.png)';
        if(i.icon == '10n') WeatherIcon.style.backgroundImage = 'url(media/10d.png)';
        if(i.icon == '11d') WeatherIcon.style.backgroundImage = 'url(media/11n.png)';
        if(i.icon == '11n') WeatherIcon.style.backgroundImage = 'url(media/11n.png)';
        if(i.icon == '13d') WeatherIcon.style.backgroundImage = 'url(media/13d.png)';
        if(i.icon == '13n') WeatherIcon.style.backgroundImage = 'url(media/13d.png)';
        if(i.icon == '50d') WeatherIcon.style.backgroundImage = 'url(media/50n.png)';
        if(i.icon == '50n') WeatherIcon.style.backgroundImage = 'url(media/50n.png)';
    }
    Temperature.innerHTML = dataWeather.main.temp + '<sup class="TemprtrSup">&degC</sup>';
}
