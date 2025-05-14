let videoStream = null;
let isActive = false;
let usingFrontCamera = false; // 🔄 Inicialmente usamos cámara trasera

export function initCamera() {
  const cameraButton = document.getElementById('cameraButton');
  const captureButton = document.getElementById('captureButton');
  const switchCameraButton = document.getElementById('switchCameraButton');
  const cameraPlaceholder = document.querySelector('.camera-placeholder');

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

  captureButton.addEventListener('click', () => {
    if (isActive) captureImage();
  });

  // Nuevo botón para cambiar cámara
  if (switchCameraButton) {
    switchCameraButton.addEventListener('click', async () => {
      usingFrontCamera = !usingFrontCamera;
      await restartCamera();
    });
  }
}

async function startCamera() {
  const videoElement = document.getElementById('videoElement');

  try {
    const constraints = {
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: usingFrontCamera ? 'user' : 'environment' // 🔄
      }
    };

    videoStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = videoStream;

        // ✅ aplicar clase mirror dinámicamente
    if (usingFrontCamera) {
      videoElement.classList.add('mirror');
    } else {
      videoElement.classList.remove('mirror');
    }

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

function stopCamera() {
  const videoElement = document.getElementById('videoElement');
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    videoElement.srcObject = null;
    videoStream = null;
  }
}

async function restartCamera() {
  stopCamera();
  await startCamera();
}

function captureImage() {
  const videoElement = document.getElementById('videoElement');
  const canvasElement = document.getElementById('canvasElement');
  const captureButton = document.getElementById('captureButton');

  if (!videoStream) return;

  const context = canvasElement.getContext('2d');
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;

  context.save(); // 🔁 Guardar estado actual

  if (usingFrontCamera) {
    // Solo espejar si es la cámara frontal
    context.translate(canvasElement.width, 0);
    context.scale(-1, 1);
  }

  context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  context.restore(); // 🔁 Restaurar estado

  const imageData = canvasElement.toDataURL('image/png');

  captureButton.disabled = true;
  const classifyEvent = new CustomEvent('image-captured', { detail: { imageData } });
  document.dispatchEvent(classifyEvent);

  setTimeout(() => {
    captureButton.disabled = false;
  }, 2000);
}


function showCameraError() {
  const cameraPlaceholder = document.querySelector('.camera-placeholder');
  cameraPlaceholder.innerHTML = `
    <div class="camera-icon" style="border-color: var(--color-error);"></div>
    <p>No se pudo acceder a la cámara. Por favor, verifica los permisos.</p>
  `;
}
