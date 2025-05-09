// import * as tf from '@tensorflow/tfjs';
import { showLoadingAnimation, hideLoadingAnimation, showResultAnimation } from './animations.js';



let modelo = null;
let canvas = null;
let otrocanvas = null;

export async function initClassifier() {
  try {
    console.log("🔁 Cargando modelo...");
    modelo = await tf.loadGraphModel("Clasificador_Perros_Gatos/model.json");
    console.log("✅ Modelo cargado correctamente:", modelo);
  } catch (error) {
    console.error("❌ Error cargando el modelo:", error);
  }
}

export function setupPrediction(c1, c2) {
  canvas = c1;
  otrocanvas = c2;
}

export function predecir() {
  if (!modelo || !canvas || !otrocanvas) {
    console.error("❌ No se puede predecir: modelo o canvas no definidos.");
    return;
  }

  // Mostrar la animación de carga
  showLoadingAnimation();

  const ctx2 = otrocanvas.getContext("2d");
  const imgData = ctx2.getImageData(0, 0, 100, 100);

  let arr = [], arr100 = [];

  for (let p = 0; p < imgData.data.length; p += 4) {
    const gris = (imgData.data[p] + imgData.data[p + 1] + imgData.data[p + 2]) / (3 * 255);
    arr100.push([gris]);
    if (arr100.length === 100) {
      arr.push(arr100);
      arr100 = [];
    }
  }

  const tensor = tf.tensor4d([arr]);
  const resultado = modelo.predict(tensor).dataSync();
  const confianza = resultado[0];
  const porcentaje = Math.round(confianza * 100);
  const respuesta = confianza <= 0.5 ? "🐱 Gato" : "🐶 Perro";

  // Mostrar resultado
  document.getElementById("resultText").innerText = respuesta;
  document.getElementById("resultPlaceholder").style.display = "none";
  document.getElementById("resultDisplay").style.display = "block";
  document.getElementById("confidenceValue").innerText = `Confianza del modelo: ${porcentaje}%`;
  // Animación icono
  showResultAnimation(respuesta.includes("Perro") ? "dog" : "cat");

  // Mostrar barra con la confianza calculada
  const bar = document.getElementById("confidenceBar");
  bar.style.transition = "width 1s ease-in-out";
  bar.style.width = `${Math.round(confianza * 100)}%`;

  // Ocultar animación de procesamiento (por si la querés usar para resetear algo)
  hideLoadingAnimation();

  console.log("📷 Predicción:", respuesta, "| Confianza:", confianza);
}

