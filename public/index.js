const mymap = L.map("map").setView([41.33, 19.82], 13);

const nameVal = document.getElementsByClassName("name")[0];
const call = document.getElementsByClassName("call")[0];

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  minZoom: 13,
  maxZoom: 13,
}).addTo(mymap);

function generateLocation(location, data) {
  const [lat, lng] = location;
  L.marker([lat, lng]).addTo(mymap).bindPopup(data).openPopup();
}

const socket = io("192.168.1.76:3000");

function getLocation(ev) {
  ev.preventDefault();
  console.log(socket);
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    const nameValue = nameVal.value;
    generateLocation([latitude, longitude], "From my current location");
    socket.emit("location", {
      lat: latitude,
      lng: longitude,
      name: nameValue,
    });
  });
}

const map = document.getElementById("map");
// map.addEventListener("click", () => {
//   call.click();
// });
call.addEventListener("click", getLocation);

// generateLocation([41.33, 19.82], "Hi 1");
// generateLocation([41.33, 19.85], "Hi 1");
// generateLocation([41.33, 19.86], "Hi 1");
// generateLocation([41.33, 19.89], "Hi 1");
// generateLocation([41.33, 19.82], "Hi 1");
