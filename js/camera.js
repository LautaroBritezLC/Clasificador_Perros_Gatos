/**
 * Camera module - Handles camera access and image capture
 */

let videoStream = null;
let isActive = false;

/**
 * Initialize camera functionality and attach event listeners
 */
export function initCamera() {
  const cameraButton = document.getElementById('cameraButton');
  const captureButton = document.getElementById('captureButton');
  const videoElement = document.getElementById('videoElement');
  const cameraPlaceholder = document.querySelector('.camera-placeholder');

  // Camera button click event
  cameraButton.addEventListener('click', async () => {
    if (!isActive) {
      try {
        await startCamera();
        cameraPlaceholder.style.display = 'none';
        captureButton.disabled = false;
        cameraButton.querySelector('.button-text').textContent = 'Desactivar Cámara';
        isActive = true;
      } catch (error) {
        console.error('Error accessing camera:', error);
        showCameraError();
      }
    } else {
      stopCamera();
      cameraPlaceholder.style.display = 'flex';
      captureButton.disabled = true;
      cameraButton.querySelector('.button-text').textContent = 'Activar Cámara';
      isActive = false;
    }
  });

  // Capture button click event
  captureButton.addEventListener('click', () => {
    if (isActive) {
      captureImage();
    }
  });
}

/**
 * Start the camera and set up video stream
 */
async function startCamera() {
  const videoElement = document.getElementById('videoElement');
  
  try {
    const constraints = {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      }
    };
    
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = videoStream;
    
    return new Promise((resolve) => {
      videoElement.onloadedmetadata = () => {
        videoElement.play();
        resolve();
      };
    });
  } catch (error) {
    console.error('Error starting camera:', error);
    throw error;
  }
}

/**
 * Stop the camera and release resources
 */
function stopCamera() {
  const videoElement = document.getElementById('videoElement');
  
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoElement.srcObject = null;
    videoStream = null;
  }
}

/**
 * Capture an image from the video stream and trigger classification
 */
function captureImage() {
  const videoElement = document.getElementById('videoElement');
  const canvasElement = document.getElementById('canvasElement');
  const captureButton = document.getElementById('captureButton');
  
  if (!videoStream) return;
  
  // Set canvas dimensions
  const context = canvasElement.getContext('2d');
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  
  // Mirror the image horizontally to correct the inversion
  context.translate(canvasElement.width, 0);
  context.scale(-1, 1);
  
  // Draw the current video frame to the canvas
  context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  
  // Get the image data
  const imageData = canvasElement.toDataURL('image/png');
  
  // Disable capture button and show processing state
  captureButton.disabled = true;
  
  // Trigger classification event
  const classifyEvent = new CustomEvent('image-captured', { detail: { imageData } });
  document.dispatchEvent(classifyEvent);
  
  // Re-enable capture button after a short delay
  setTimeout(() => {
    captureButton.disabled = false;
  }, 2000);
}

/**
 * Display camera error message
 */
function showCameraError() {
  const cameraPlaceholder = document.querySelector('.camera-placeholder');
  cameraPlaceholder.innerHTML = `
    <div class="camera-icon" style="border-color: var(--color-error);"></div>
    <p>No se pudo acceder a la cámara. Por favor, verifica los permisos.</p>
  `;
}