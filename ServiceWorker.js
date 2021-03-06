const fileName = "worker-v-1";

const cacheFiles = [
    './',
     "./index.html",
    "./css/styles.css",
    "./css/secondStyle.css",
     "./data/restaurants.json",
    "./img/1.jpg",
    "./img/2.jpg",
    "./img/3.jpg",
    "./img/4.jpg",
    "./img/5.jpg",
    "./img/6.jpg",
    "./img/7.jpg",
    "./img/8.jpg",
    "./img/9.jpg",
    "./img/10.jpg",
    "./img/icon.png",
    "./js/dbhelper.js",
    "./js/main.js",
    "./js/restaurant_info.js",
    "./restaurant.html?id=1",
    "./restaurant.html?id=2",
    "./restaurant.html?id=3",
    "./restaurant.html?id=4",
    "./restaurant.html?id=5",
    "./restaurant.html?id=6",
    "./restaurant.html?id=7",
    "./restaurant.html?id=8",
    "./restaurant.html?id=9",
    "./restaurant.html?id=10",
    "./manifest.json",
    "./restaurant.html",
    "https://unpkg.com/leaflet@1.3.1/dist/images/marker-shadow.png",
    "https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon-2x.png",
    "https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png",
    "https://unpkg.com/leaflet@1.3.1/dist/leaflet.js",
    "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css",
]

//Pull data from local machine first

self.addEventListener("fetch", (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request)
        .then(response => {
            return response || fetch(e.request);
        })
    )
})

//Installing service worker 
self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(fileName)
        .then(cache => {
            return cache.addAll(cacheFiles);
        }).catch((err)=>console.log(err))
    )
})

//also activate service worker 
self.addEventListener('activate', event => {

    event.waitUntil(
        caches.keys().then((cacheNames) => {

            return Promise.all(
                cacheNames.filter(cacheName => {
                    
                    return cacheName.startsWith('worker') && cacheName !== fileName;
                }).map(newCache => {
                    return caches.delete(newCache);
                })
            )
        })
    )

})
