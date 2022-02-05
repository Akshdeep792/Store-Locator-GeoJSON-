mapboxgl.accessToken =
'pk.eyJ1IjoiY29kZWtpbmciLCJhIjoiY2t6NmpyZ3ZhMHptMTJxcnhzaDJiNnlpZSJ9.vn8_IgG9kcnCuwcgvTocWQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [76.7821, 30.3752]
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();

  const stores = await data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeName: store.storeName,
        icon: 'shop'
      }
    };
  });
console.log(stores);
  loadMap(stores);
}

// Load map with stores
function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeName}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();
