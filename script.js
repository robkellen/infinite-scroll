// Unsplash API
const count = 10;
const apiKey = "wQvzQgnv1Af-Wo2UPdzlvKs3NP-cKCvXFTg078nscS0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    //  catch error here
  }
}

getPhotos();
