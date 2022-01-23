const login = () => {
  const info = localStorage.getItem("info");
  const title = document.querySelector("#title");
  const h1 = title.parentNode
  const loginForm = document.querySelector("#loginForm");
  const logout = document.querySelector("#logout");
  console.log(h1)
  if (info) {
    title.innerText = info + "'s To Do List!!";
    h1.hidden = false;
    loginForm.hidden = true;
    logout.hidden = false;
  } else {
    h1.hidden = true;
    loginForm.hidden = false;
    logout.hidden = true;
  }
};
const logout = () => {
  const logout = document.querySelector("#logout");
  logout.addEventListener("click", () => {
    const title = document.querySelector("#title");
    localStorage.removeItem("info");
    title.innerText = "";
    login();
  });
};
const onGeoOk = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const API_key = "b4c90fda1994a2f3cabbe943453020ef"
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`
    fetch(url).then((response) => response.json()).then((data) => {
        const localInfo = document.querySelector("#localInfo")
        const city = localInfo.querySelector("#city")
        const weather = localInfo.querySelector("#weather")
        const temp = localInfo.querySelector("#temp")
        const temp_max = localInfo.querySelector("#max_temp")
        const temp_min = localInfo.querySelector("#min_temp")
        city.innerText = data.name
        if(data.weather[0].main == "Clear")weather.innerText = "weather: 🌞"
        if(data.weather[0].main == "Wind")weather.innerText = "weather: 🌫️"
        if(data.weather[0].main == "Clouds")weather.innerText = "weather: ☁️"
        if(data.weather[0].main == "Rain")weather.innerText = "weather: ☔"
        if(data.weather[0].main == "Snow")weather.innerText = "weather: ☃️"
        temp.innerText += data.main.temp + "˚C"
        temp_max.innerText += data.main.temp_max + "˚C"
        temp_min.innerText += data.main.temp_min + "˚C"
    })
}
const onGeoError = () => {
    alert("can't Find you")
}
const weather = () => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)

}
weather()
const moment = () => {
  const daylist = ["일", "월", "화", "수", "목", "금", "토"];
  const dateArticle = document.querySelector("#date");
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const day = now.getDay();
  const h1 = dateArticle.querySelector("h1");
  h1.innerText = `${year}년 ${month}월 ${date}일 ${daylist[day]}요일`;
  const h2 = dateArticle.querySelectorAll("h2");
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  let millisecond = now.getMilliseconds();
  const clock01 = h2[0];
  const clock02 = h2[1];
  const clock01span = clock01.querySelectorAll("span");
  clock01span[0].innerText = hour > 12 ? "Pm" : "Am";
  clock01span[1].innerText = hour > 12 ? hour - 12 : hour;
  clock01span[2].innerText = minute;
  clock01span[3].innerText = second;
  const clock02span = clock02.querySelectorAll("span");
  clock02span[0].innerText = hour > 10 ? hour : "0" + hour;
  clock02span[1].innerText = minute > 10 ? minute : "0" + minute;
  clock02span[2].innerText = second > 10 ? second : "0" + second;
  if (millisecond < 10) millisecond = "00" + millisecond;
  else if (millisecond < 100) millisecond = "0" + millisecond;
  clock02span[3].innerText = millisecond;
};
const clock = () => {
  setInterval(moment, 1);
};
const returnToDay = (event) => {
  const id = event.target.parentNode.id;
  const localToDay = localStorage.getItem("ToDay");
  const tempToDay = JSON.parse(localToDay);
  let returnToDayIndex = 0;
  tempToDay.forEach((element, index) => {
    if (element.id == id) returnToDayIndex = index;
  });
  const ToDo = tempToDay.splice(returnToDayIndex, 1)[0];
  localStorage.setItem("ToDay", JSON.stringify(tempToDay));
  const localToDo = localStorage.getItem("ToDo");
  const tempToDo = JSON.parse(localToDo);
  tempToDo.push(ToDo);
  console.log(ToDo);
  tempToDo.sort((a, b) => a.id - b.id);
  localStorage.setItem("ToDo", JSON.stringify(tempToDo));
  load();
};
const addToDay = (event) => {
  const id = event.target.parentNode.id;
  const localToDo = localStorage.getItem("ToDo");
  const tempToDo = JSON.parse(localToDo);
  let addToDayIndex = 0;
  tempToDo.forEach((element, index) => {
    if (element.id == id) addToDayIndex = index;
  });
  const addToDay = tempToDo.splice(addToDayIndex, 1)[0];
  localStorage.setItem("ToDo", JSON.stringify(tempToDo));
  const localToDay = localStorage.getItem("ToDay");
  const tempToDay = JSON.parse(localToDay);
  tempToDay.push(addToDay);
  localStorage.setItem("ToDay", JSON.stringify(tempToDay));
  load();
};
const delToDo = (event) => {
  const id = event.target.parentNode.id;
  localToDo = localStorage.getItem("ToDo");
  const tempToDo = JSON.parse(localToDo);
  let delIndex = 0;
  tempToDo.forEach((element, index) => {
    if (element.id == id) delIndex = index;
  });
  tempToDo.splice(delIndex, 1);
  localStorage.setItem("ToDo", JSON.stringify(tempToDo));
  load();
};
const toDayLoad = () => {
  const localToDay = localStorage.getItem("ToDay");
  if (localToDay != null) {
    const toDay = document.querySelector("#toDay");
    const ul = toDay.querySelector("ul");
    ul.innerHTML = "";
    const tempToDay = JSON.parse(localToDay);
    tempToDay.forEach((element) => {
      const li = document.createElement("li");
      li.id = element.id;
      li.innerText = element.value;
      const turnToDay = document.createElement("button");
      turnToDay.innerText = "↻";
      turnToDay.addEventListener("click", returnToDay);
      li.appendChild(turnToDay);
      ul.appendChild(li);
    });
  } else {
    localStorage.setItem("ToDay", JSON.stringify([]));
  }
};
const toDoLoad = () => {
  const localToDo = localStorage.getItem("ToDo");
  if (localToDo != null) {
    const toDo = document.querySelector("#toDo");
    const ul = toDo.querySelector("ul");
    ul.innerHTML = "";
    const tempToDo = JSON.parse(localToDo);
    tempToDo.forEach((element) => {
      const li = document.createElement("li");
      li.id = element.id;
      li.innerText = element.value;
      const check = document.createElement("button");
      check.innerText = "✔️";
      check.addEventListener("click", addToDay);
      li.appendChild(check);
      const del = document.createElement("button");
      del.innerText = "❌";
      del.addEventListener("click", delToDo);
      li.appendChild(del);
      ul.appendChild(li);
    });
  } else {
    localStorage.setItem("ToDo", JSON.stringify([]));
  }
};
const load = () => {
  toDayLoad();
  toDoLoad();
};

const app = () => {
  const loginForm = document.querySelector("#loginForm");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const input = form.querySelector("input");
    const value = input.value;
    localStorage.setItem("info", value);
    input.value = "";
    login();
  });
  const toDo = document.querySelector("#toDo");
  const form = toDo.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.querySelector("input");
    const value = input.value;
    input.value = "";
    const now = new Date();
    const id = now.getTime();
    const data = {};
    data.id = id;
    data.value = value;
    const localToDo = localStorage.getItem("ToDo");
    const tempToDo = JSON.parse(localToDo);
    tempToDo.push(data);
    tempToDo.sort((a, b) => a.id - b.id);
    localStorage.setItem("ToDo", JSON.stringify(tempToDo));
    load();
  });
  login();
  logout();
  clock();
  load();
};
