const CACHE_NAME = "simple-food-v8";
const URLS_TO_CACHE = [
  "/simple-food/",
  "/simple-food/nav.html",
  "/simple-food/index.html",
  "/simple-food/pages/home.html",
  "/simple-food/pages/salad.html",
  "/simple-food/pages/bread.html",
  "/simple-food/pages/meat.html",
  "/simple-food/pages/contact.html",
  "/simple-food/pages/detail.html",
  "/simple-food/css/materialize.min.css",
  "/simple-food/css/style.css",
  "/simple-food/js/materialize.min.js",
  "/simple-food/js/script.js",
  "/simple-food/manifest.json",
  "/simple-food/icons/android/mipmap-hdpi/ic_launcher.png",
  "/simple-food/icons/android/mipmap-mdpi/ic_launcher.png",
  "/simple-food/icons/android/mipmap-xhdpi/ic_launcher.png",
  "/simple-food/icons/android/mipmap-xxhdpi/ic_launcher.png",
  "/simple-food/icons/android/mipmap-xxxhdpi/ic_launcher.png",
  "/simple-food/icons/icon.png",
  "/simple-food/icons/AppIcon.appiconset/50.png",
  "/simple-food/icons/AppIcon.appiconset/57.png",
  "/simple-food/icons/AppIcon.appiconset/58.png",
  "/simple-food/icons/AppIcon.appiconset/60.png",
  "/simple-food/icons/AppIcon.appiconset/64.png",
  "/simple-food/icons/AppIcon.appiconset/72.png",
  "/simple-food/icons/AppIcon.appiconset/76.png",
  "/simple-food/icons/AppIcon.appiconset/80.png",
  "/simple-food/icons/AppIcon.appiconset/87.png",
  "/simple-food/icons/AppIcon.appiconset/100.png",
  "/simple-food/icons/AppIcon.appiconset/114.png",
  "/simple-food/icons/AppIcon.appiconset/152.png",
  "/simple-food/icons/AppIcon.appiconset/167.png",
  "/simple-food/icons/AppIcon.appiconset/180.png",
  "/simple-food/icons/AppIcon.appiconset/256.png",
  "/simple-food/icons/AppIcon.appiconset/1024.png",
  "/simple-food/logo.png",
  "/simple-food/images/bread/baked-baking.jpg",
  "/simple-food/images/bread/bread-wicker.jpg",
  "/simple-food/images/bread/four-pastries.jpg",
  "/simple-food/images/bread/round-bread.jpg",
  "/simple-food/images/bread/sliced-bread.jpg",
  "/simple-food/images/bread/three-bread.jpg",
  "/simple-food/images/meat/steak-meat-raw.jpg",
  "/simple-food/images/meat/sliced-meats.jpg",
  "/simple-food/images/meat/photo-of-steak-and-french-fries.jpg",
  "/simple-food/images/meat/food-steak-meat-raw.jpg",
  "/simple-food/images/meat/asparagus-barbecue.jpg",
  "/simple-food/images/meat/cooked-meat.jpg",
  "/simple-food/images/salad/assorted-salads-on-bowls.jpg",
  "/simple-food/images/salad/sliced-tomato-and-avocado-on-white-plate.jpg",
  "/simple-food/images/salad/spinach-chicken-pomegranate-salad.jpg",
  "/simple-food/images/salad/vegetable-dish.jpg",
  "/simple-food/images/salad/vegetable-salad.jpg",
  "/simple-food/images/salad/vegetable-salad-on-top-of-white-ceramic-plate.jpg",
  "/simple-food/images/category/vegetable-salad-by-ella-olsson.jpg",
  "/simple-food/images/category/round-bread-on-white-surface-by-mariana-kurnyk.jpg",
  "/simple-food/images/category/steak-food-by-malidate-van.jpg",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) return response;
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) return caches.delete(cacheName);
        })
      );
    })
  );
});
