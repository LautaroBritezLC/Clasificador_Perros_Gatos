// import '../css/base.css';
// import '../css/layout.css';
// import '../css/components.css';
// import '../css/animations.css';
import { initCamera } from './camera.js';
import { initAnimations } from './animations.js';
import { initClassifier, setupPrediction, predecir } from './classifier.js';

document.addEventListener('DOMContentLoaded', async () => {
  initAnimations();
  initCamera();
  await initClassifier(); // Esperamos que cargue el modelo

  const canvas = document.getElementById("canvasElement");
  const otroCanvas = document.createElement("canvas");
  otroCanvas.width = 100;
  otroCanvas.height = 100;

  // 🔗 Enlazamos los canvas con classifier.js
  setupPrediction(canvas, otroCanvas);

  // 🎯 Conectamos el botón con la función de predicción
  document.getElementById("captureButton").addEventListener("click", () => {
    const ctx = canvas.getContext("2d");
    const ctx2 = otroCanvas.getContext("2d");

    // 🖼️ Copiamos el canvas visible al oculto (100x100) para procesar
    ctx2.drawImage(canvas, 0, 0, 100, 100);
    predecir();
  });

  // ✨ Bonus: mostrar el otroCanvas en pantalla si querés verlo
  // document.body.appendChild(otroCanvas);
});
