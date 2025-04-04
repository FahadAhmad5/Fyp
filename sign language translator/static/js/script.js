// static/js/script.js

// Get video element
const videoElement = document.getElementById('video');

// Check if webcam access is available
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            // Assign the stream to the video element
            videoElement.srcObject = stream;
        })
        .catch(function (error) {
            console.error('Error accessing webcam:', error);
        });
} else {
    console.error('Webcam access is not supported.');
}

// Function to update translation text
function updateTranslation(translation) {
    const translationElement = document.getElementById('translation');
    translationElement.textContent = translation;
}

// Function to handle translation updates (replace with your logic)
function handleTranslationUpdate() {
    const translation = 'Translation Text'; // Replace with actual translation
    updateTranslation(translation);
}

// Call the translation update function at a regular interval (e.g., every second)
setInterval(handleTranslationUpdate, 1000);
