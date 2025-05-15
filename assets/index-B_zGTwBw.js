(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=o(a);fetch(a.href,s)}})();let i=null,m=!1,l=!1;switchCameraButton.disabled=!0;function b(){const t=document.getElementById("cameraButton"),e=document.getElementById("captureButton"),o=document.getElementById("switchCameraButton"),n=document.querySelector(".camera-placeholder");o.disabled=!0,t.addEventListener("click",async()=>{if(m)h(),n.style.display="flex",e.disabled=!0,o.disabled=!0,t.querySelector(".button-text").textContent="Activar Cámara",m=!1;else try{await y(),n.style.display="none",e.disabled=!1,o.disabled=!1,t.querySelector(".button-text").textContent="Desactivar Cámara",m=!0}catch(a){console.error("Error accessing camera:",a),I()}}),e.addEventListener("click",()=>{m&&w()}),o&&o.addEventListener("click",async()=>{l=!l,await B()})}async function y(){const t=document.getElementById("videoElement");try{const e={video:{width:{ideal:1280},height:{ideal:720},facingMode:l?"user":"environment"}};return i=await navigator.mediaDevices.getUserMedia(e),t.srcObject=i,l?t.classList.add("mirror"):t.classList.remove("mirror"),new Promise(o=>{t.onloadedmetadata=()=>{t.play(),o()}})}catch(e){throw console.error("Error starting camera:",e),e}}function h(){const t=document.getElementById("videoElement");i&&(i.getTracks().forEach(e=>e.stop()),t.srcObject=null,i=null)}async function B(){h(),await y()}function w(){const t=document.getElementById("videoElement"),e=document.getElementById("canvasElement"),o=document.getElementById("captureButton");if(!i)return;const n=e.getContext("2d");e.width=t.videoWidth,e.height=t.videoHeight,n.save(),l&&(n.translate(e.width,0),n.scale(-1,1)),n.drawImage(t,0,0,e.width,e.height),n.restore();const a=e.toDataURL("image/png");o.disabled=!0;const s=new CustomEvent("image-captured",{detail:{imageData:a}});document.dispatchEvent(s),setTimeout(()=>{o.disabled=!1},2e3)}function I(){const t=document.querySelector(".camera-placeholder");t.innerHTML=`
    <div class="camera-icon" style="border-color: var(--color-error);"></div>
    <p>No se pudo acceder a la cámara. Por favor, verifica los permisos.</p>
  `}function C(){x(),L()}function x(){const t=document.getElementById("dogAnimation"),e=document.getElementById("catAnimation"),o=document.createElement("div");o.className="pet-face dog-face",o.innerHTML=`
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `,t.appendChild(o);const n=document.createElement("div");n.className="pet-face cat-face",n.innerHTML=`
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `,e.appendChild(n);const a=document.createElement("style");a.textContent=`
    .pet-face {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
    }
    
    .pet-eye {
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: #111;
      border-radius: 50%;
      top: 40%;
    }
    
    .pet-eye.left {
      left: 35%;
    }
    
    .pet-eye.right {
      right: 35%;
    }
    
    .dog-face .pet-nose {
      position: absolute;
      width: 14px;
      height: 8px;
      background-color: #111;
      border-radius: 50%;
      top: 55%;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .cat-face .pet-nose {
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #111;
      border-radius: 50%;
      top: 55%;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .pet-mouth {
      position: absolute;
      width: 20px;
      height: 10px;
      border-bottom: 2px solid #111;
      border-radius: 50%;
      top: 65%;
      left: 50%;
      transform: translateX(-50%);
    }
    
    .dog-animation:hover, .cat-animation:hover {
      transform: scale(1.1);
    }
  `,document.head.appendChild(a),[t,e].forEach(s=>{s.style.transition="transform 0.3s ease",s.addEventListener("mouseover",()=>{s.style.transform="scale(1.1)"}),s.addEventListener("mouseout",()=>{s.style.transform="scale(1)"})})}function L(){const t=document.querySelectorAll(".hero, .camera-section, .result-section"),e=new IntersectionObserver(o=>{o.forEach(n=>{n.isIntersecting&&(n.target.style.opacity="1",n.target.style.transform="translateY(0)")})},{threshold:.1});t.forEach(o=>{o.style.opacity="0",o.style.transform="translateY(20px)",o.style.transition="opacity 0.5s ease, transform 0.5s ease",e.observe(o)})}function P(){const t=document.getElementById("resultDisplay"),e=document.getElementById("resultPlaceholder"),o=document.getElementById("confidenceBar");e.style.display="none",t.style.display="flex",t.classList.add("processing"),o.style.width="0%"}function A(){document.getElementById("resultDisplay").classList.remove("processing")}function D(t){const e=document.getElementById("resultIcon");e.className="result-icon pet",t==="dog"?e.classList.add("dog-animation"):e.classList.add("cat-animation"),e.innerHTML=`
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `}let u=null,v=null,f=null;async function M(){try{console.log("🔁 Cargando modelo..."),u=await tf.loadGraphModel("/Clasificador_Perros_Gatos/model.json"),console.log("✅ Modelo cargado correctamente:",u)}catch(t){console.error("❌ Error cargando el modelo:",t)}}function O(t,e){v=t,f=e}function S(){if(!u||!v||!f){console.error("❌ No se puede predecir: modelo o canvas no definidos.");return}P();const e=f.getContext("2d").getImageData(0,0,100,100);let o=[],n=[];for(let c=0;c<e.data.length;c+=4){const E=(e.data[c]+e.data[c+1]+e.data[c+2])/765;n.push([E]),n.length===100&&(o.push(n),n=[])}const a=tf.tensor4d([o]),r=u.predict(a).dataSync()[0],p=Math.round(r<=.5?(1-r)*100:r*100);console.log("🔎 Valor del modelo (sigmoid):",r);const d=r<=.5?"🐱 Gato":"🐶 Perro";console.log("📷 Predicción:",d,"| Confianza:",r),document.getElementById("resultText").innerText=d,document.getElementById("resultPlaceholder").style.display="none",document.getElementById("resultDisplay").style.display="block",document.getElementById("confidenceValue").innerText=`Confianza del modelo: ${p}%`,D(d.includes("Perro")?"dog":"cat");const g=document.getElementById("confidenceBar");g.style.transition="width 1s ease-in-out",g.style.width=`${p}%`,A(),console.log("📷 Predicción:",d,"| Confianza:",r)}document.addEventListener("DOMContentLoaded",async()=>{C(),b(),await M();const t=document.getElementById("canvasElement"),e=document.createElement("canvas");e.width=100,e.height=100,O(t,e),document.getElementById("captureButton").addEventListener("click",()=>{t.getContext("2d"),e.getContext("2d").drawImage(t,0,0,100,100),S()})});
