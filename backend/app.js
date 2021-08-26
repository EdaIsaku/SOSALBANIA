const mymap = L.map("map").setView([41.33, 19.82], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

// L.marker([41.33, 19.82])
//   .addTo(mymap)
//   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
//   .openPopup();

function generateLocation(location, data) {
  const [lat, lng] = location;
  L.marker([lat, lng]).addTo(mymap).bindPopup(data).openPopup();
}

const socket = io("192.168.1.76:3000");
socket.on("connect", () => {
  // console.log("this is id", );
  socket.emit("backend_id", socket.id);
});

socket.on("locationFromUser", (data) => {
  const { lat, lng, name } = data;
  console.log(data);
  generateLocation([lat, lng], name);
});

// socket.on("connection", () => {
//   console.log("connected");
// });
// generateLocation([41.33, 19.85], "Hi 1");
// generateLocation([41.33, 19.86], "Hi 1");
// generateLocation([41.33, 19.89], "Hi 1");
// generateLocation([41.33, 19.82], "Hi 1");
