self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("json-cache").then((cache) => {
        return cache.addAll(["/json/"]); // Add the directory where your JSON files are stored
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);
  
    // Check if the request is for a JSON file from your specified directory
    if (requestUrl.pathname.startsWith("/json/")) {
      event.respondWith(
        caches.match(event.request).then((response) => {
          if (response) {
            // Return cached response if available
            return response;
          }
  
          // If not in cache, fetch from network and update cache
          return fetch(event.request).then((networkResponse) => {
            // Clone the response to store in cache
            const clonedResponse = networkResponse.clone();
  
            caches.open("json-cache").then((cache) => {
              cache.put(event.request, clonedResponse);
            });
  
            return networkResponse;
          });
        })
      );
    }
  });
  