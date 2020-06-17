//site setings
const apiId = '2a4a207e504ae6c48ab505a543702a9d';
let SiteLang = 'en';
let TypeTemperature;
let ErrorNotFoundEN = 'Settlement is not found';
let ErrorEmptyFieldEN = 'Field is empty';


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
        const getJsonWeather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${InputCity.value}&lang=${SiteLang}&units=metric&appid=${apiId}`);
        const data = await getJsonWeather.json();
        return await setWeatherData(data);
    } catch (e) {
        if(e instanceof TypeError) {
            InputMessageBox.style.visibility = 'visible';
            InputMessageBox.innerHTML = ErrorNotFoundEN;
        }
    }
}

function auditField () {
    if(InputCity.value == '') {
        InputMessageBox.style.visibility = 'visible';
        InputMessageBox.innerHTML = ErrorEmptyFieldEN;
    } else {
        InputMessageBox.style.visibility = 'hidden';
        queryWeather()
    }
}

SearchBtn.addEventListener('click', auditField)
InputCity.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') auditField();
})


function setWeatherData (dataWeather) {
                                                                                                    console.log(dataWeather)
    NameCity.innerHTML = `${dataWeather.name}, ${dataWeather.sys.country}`;

    for(let i of dataWeather.weather){
        StateWeather.innerHTML = i.description;

        if(i.icon == '01d') WeatherIcon.style.backgroundImage = 'url(style/01d.png)';
        if(i.icon == '01n') WeatherIcon.style.backgroundImage = 'url(style/02d.png)';
        if(i.icon == '02d') WeatherIcon.style.backgroundImage = 'url(style/02d.png)';
        if(i.icon == '02n') WeatherIcon.style.backgroundImage = 'url(style/01d.png)';
        if(i.icon == '03d') WeatherIcon.style.backgroundImage = 'url(style/03d.png)';
        if(i.icon == '03n') WeatherIcon.style.backgroundImage = 'url(style/03d.png)';
        if(i.icon == '04d') WeatherIcon.style.backgroundImage = 'url(style/04d.png)';
        if(i.icon == '04n') WeatherIcon.style.backgroundImage = 'url(style/04d.png)';
        if(i.icon == '09d') WeatherIcon.style.backgroundImage = 'url(style/09d.png)';
        if(i.icon == '09n') WeatherIcon.style.backgroundImage = 'url(style/09d.png)';
        if(i.icon == '10d') WeatherIcon.style.backgroundImage = 'url(style/10d.png)';
        if(i.icon == '10n') WeatherIcon.style.backgroundImage = 'url(style/10d.png)';
        if(i.icon == '11d') WeatherIcon.style.backgroundImage = 'url(style/11d.png)';
        if(i.icon == '11n') WeatherIcon.style.backgroundImage = 'url(style/11d.png)';
        if(i.icon == '13d') WeatherIcon.style.backgroundImage = 'url(style/13d.png)';
        if(i.icon == '13n') WeatherIcon.style.backgroundImage = 'url(style/13d.png)';
        if(i.icon == '50d') WeatherIcon.style.backgroundImage = 'url(style/50d.png)';
        if(i.icon == '50n') WeatherIcon.style.backgroundImage = 'url(style/50d.png)';
    }
    Temperature.innerHTML = dataWeather.main.temp + '<sup class="TemprtrSup">&degC</sup>';
}



        // switch(i.icon) {
        //     case '01d': WeatherIcon.style.backgroundImage = 'url(style/01d.png)';
        //     case '01n': WeatherIcon.style.backgroundImage = 'url(style/01n.png)';
        //     case '02d': WeatherIcon.style.backgroundImage = 'url(style/02d.png)';
        //     case '02n': WeatherIcon.style.backgroundImage = 'url(style/02n.png)';
        //     case '03d': WeatherIcon.style.backgroundImage = 'url(style/03d.png)';
        //     case '03n': WeatherIcon.style.backgroundImage = 'url(style/03n.png)';
        //     case '04d': WeatherIcon.style.backgroundImage = 'url(style/04d.png)';
        //     case '04n': WeatherIcon.style.backgroundImage = 'url(style/04n.png)';
        //     case '09d': WeatherIcon.style.backgroundImage = 'url(style/09d.png)';
        //     case '09n': WeatherIcon.style.backgroundImage = 'url(style/09n.png)';
        //     case '10d': WeatherIcon.style.backgroundImage = 'url(style/10d.png)';
        //     case '10n': WeatherIcon.style.backgroundImage = 'url(style/10n.png)';
        //     case '11d': WeatherIcon.style.backgroundImage = 'url(style/11d.png)';
        //     case '11n': WeatherIcon.style.backgroundImage = 'url(style/11n.png)';
        //     case '13d': WeatherIcon.style.backgroundImage = 'url(style/13d.png)';
        //     case '13n': WeatherIcon.style.backgroundImage = 'url(style/13n.png)';
        //     case '50d': WeatherIcon.style.backgroundImage = 'url(style/50d.png)';
        //     case '50n': WeatherIcon.style.backgroundImage = 'url(style/50n.png)';
        // }