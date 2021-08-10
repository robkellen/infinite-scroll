const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let isInitialLoad = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArr = [];

// Unsplash API
let initialCount = 5;
const apiKey = "wQvzQgnv1Af-Wo2UPdzlvKs3NP-cKCvXFTg078nscS0";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// update url with new count after initial load
function updateApiUrlCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArr.length;
  // run function to map object in photos array
  photosArr.map((photo) => {
    // create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // put <img> inside <a>, then put both inside the imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArr = await response.json();
    displayPhotos();
    // update api url with new count after initial 5 images have loaded, then set isInitialLoad to false so it continues to add 30 images when user nears bottom of page
    if (isInitialLoad) {
      updateApiUrlCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    //  catch error here
    throw new Error(error);
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Page Load
getPhotos();
