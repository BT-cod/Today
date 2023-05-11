import './App.css';
import axios from "axios";
import { TbHandClick } from 'react-icons/tb';
import { MdLocationPin } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { CiCalendarDate } from 'react-icons/ci';
import { FcGlobe } from 'react-icons/fc';
import clear from './images/clear.png'
import clouds from './images/clouds.png'
import drizzle from './images/drizzle.png'
import mist from './images/mist.png'
import rain from './images/rain.png'
import snow from './images/snow.png'


function App() {

  window.onload=function(){
    LIVE();
    liveData();
    }

  const LIVE = () => {
    axios.get("https://ipapi.co/json/")
  .then((res) => {
    document.getElementById("live").innerHTML = `You are in ${res.data.city}`
    document.getElementById("loca").innerHTML = `${res.data.region}`

  })
}
    const liveData = () => {
    const today = new Date();
          let h = today.getHours();
          let m = today.getMinutes();
          let s = today.getSeconds();
          let y = today.getFullYear();
          let mo = today.getMonth();
          let d = today.getDate();
          let da = today.getDay();
          m = checkTime(m);
          s = checkTime(s);
          if(da === 1)da = "Monday"
          else if(da === 2)da = "Tuesday"
          else if(da === 3)da = "Wednesday"
          else if(da === 4)da = "Thursday"
          else if(da === 5)da = "Friday"
          else if(da === 6)da = "Saturday"
          else da = "Sunday"
          document.getElementById('time').innerHTML =  h + ":" + m + ":" + s;
          document.getElementById('date').innerHTML =  d + "/" + mo + "/" + y + "-" + da;
          setTimeout(liveData, 1000);
  }
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
  }
  const handleSearch = () => {

    if(document.getElementById("iptUid").value === ""){
      alert("Enter City Name For Details")
    }
    else{
  var cityVal = document.getElementById("iptUid").value
  var cityHead = document.getElementById("city")
  let image = document.getElementById("weatherImg")
  var hum = document.getElementById("humidity")
  var win = document.getElementById("wind")
  var tem = document.getElementById("temp")
  var condi = document.getElementById("text")
  axios.get(`http://api.weatherapi.com/v1/current.json?key=a37c63ad900949cba1850210231105&q=${cityVal}&aqi=no`)
  .then((response) => {
    cityHead.innerHTML = (response.data.location.name);
    if(response.data.current.condition.code === 1003 || response.data.current.condition.code === 1003 || response.data.current.condition.code === 1009 || 
      response.data.current.condition.code ===  1030){
      image.src = mist
    }
    else if(response.data.current.condition.code === 1000){
      image.src = clear
    }
    else if(response.data.current.condition.code === 1069 || response.data.current.condition.code ===  1063 || 
      response.data.current.condition.code ===  1150 || response.data.current.condition.code ===  1153 || response.data.current.condition.code ===  1189){
      image.src = drizzle
    }
    else if(response.data.current.condition.code === 1114 || response.data.current.condition.code ===  1066 || 
      response.data.current.condition.code ===  1117 || response.data.current.condition.code ===  1204 || response.data.current.condition.code ===  1207 || 
      response.data.current.condition.code ===  1210 || response.data.current.condition.code ===  1216 || response.data.current.condition.code ===  1213 || 
      response.data.current.condition.code ===  1219 || response.data.current.condition.code ===  1222 || response.data.current.condition.code ===  1225 || 
      response.data.current.condition.code ===  1237 || response.data.current.condition.code ===  1249 || response.data.current.condition.code ===  1252 || 
      response.data.current.condition.code ===  1255 || response.data.current.condition.code ===  1258 || response.data.current.condition.code ===  1261 || 
      response.data.current.condition.code ===  1264 || response.data.current.condition.code ===  1282){
      image.src = snow
    }
    else if(response.data.current.condition.code === 1087 || response.data.current.condition.code ===  1180 || response.data.current.condition.code ===  1183 || 
      response.data.current.condition.code ===  1186 || response.data.current.condition.code ===  1192 || response.data.current.condition.code ===  1195 || 
      response.data.current.condition.code ===  1198 || response.data.current.condition.code ===  1201 || response.data.current.condition.code ===  1240 || 
      response.data.current.condition.code ===  1243 || response.data.current.condition.code ===  1246 || response.data.current.condition.code ===  1273 || 
      response.data.current.condition.code ===  1276){
      image.src = rain
    }
    else{
      image.src = clouds
    }
    console.log(response.data)
    document.getElementById("iptUid").value = '';
     hum.innerHTML = `Humidity  : ${response.data.current.humidity} %`
     win.innerHTML = `Wind  : ${response.data.current.wind_kph}kph`
     tem.innerHTML = `Temperature  : ${response.data.current.temp_c} °C`
     condi.innerHTML = `${response.data.current.condition.text} weather`
  });
  }
  }

  return (
    <>
    <div className="App">
      <div className='todayThings'>
        <div class="content" >
        <h2>TODAY</h2>
        <h2>TODAY</h2>
        </div>
        <div className='current'>
          <div className='titleCls'>
         <p id='live'></p>
         <FcGlobe size={35} className='globe rotate'/>
         </div>
         <span className='span1'><AiOutlineFieldTime size={20}/>
         <p id='time'>00-00-00</p>
         </span>
         <span className='span2'><CiCalendarDate size={20}/>
         <p id='date'>00/00/0000</p>
         </span>
         <span className='span3'><MdLocationPin size={20}/>
         <p id='loca'>location</p>
         </span>
        </div>
      </div>
      <div className="weatherCard">
      <input type="text" placeholder="Search City" className="iptCls" id="iptUid"/>
     <button className='btnCls' onClick={handleSearch}>< TbHandClick color='white' size={20}/></button>
      <div className='dataCls'>
        <img src={clear} alt="weather" className='images' id='weatherImg'/>
      </div>
      <div className='city'>
          <h3 id='city'>City Name</h3>
          <label id="text" htmlFor="city">Condition</label>
      </div>
      <div className='details'>
        <p id='humidity'>Humidity : </p>
        <p id='wind'>Wind : </p>
        <p id='temp'>Temperature  :  </p>
      </div>
      </div>
    </div>
    </>
  );
}

export default App;
