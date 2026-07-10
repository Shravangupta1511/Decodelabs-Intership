let coordinates = listing.geometry.coordinates;

const map = L.map("map").setView([coordinates[1], coordinates[0]], 9);

const redIcon = L.icon({
  iconUrl: "/images/marker-icon-2x-red.png",
  shadowUrl: "/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
  },
).addTo(map);

L.marker([coordinates[1], coordinates[0]], { icon: redIcon }).addTo(map)
  .bindPopup(` <h5>${listing.title}</h5>
    <p>Exact location will be provided after booking.</p>`);
