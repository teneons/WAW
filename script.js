//site setings
const apiId = '2a4a207e504ae6c48ab505a543702a9d';
let SiteLang = 'en';
let TypeTemperature;
let ErrorNotFoundEN = 'Settlement is not found';
let ErrorEmptyFieldEN = 'Field is empty';


//input part
let FormSearchBlock = document.querySelector('.FormSearchBlock');
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
        // switch(i.icon) {
        //     case '02d': WeatherIcon.style.backgroundColor = 'yellow';
        //     default: WeatherIcon.style.backgroundColor = 'red';
        // }

        if(i.icon == '02d') {
            WeatherIcon.style.backgroundImage = '../style/icon.png';
        }
    }

    StateWeather.innerHTML = dataWeather.weather.description;
    Temperature.innerHTML = dataWeather.main.temp + '<sup class="TemprtrSup">&degC</sup>';
}