(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();let c=null,d=!1;function h(){const t=document.getElementById("cameraButton"),e=document.getElementById("captureButton");document.getElementById("videoElement");const o=document.querySelector(".camera-placeholder");t.addEventListener("click",async()=>{if(d)E(),o.style.display="flex",e.disabled=!0,t.querySelector(".button-text").textContent="Activar Cámara",d=!1;else try{await v(),o.style.display="none",e.disabled=!1,t.querySelector(".button-text").textContent="Desactivar Cámara",d=!0}catch(a){console.error("Error accessing camera:",a),b()}}),e.addEventListener("click",()=>{d&&B()})}async function v(){const t=document.getElementById("videoElement");try{const e={video:{width:{ideal:1280},height:{ideal:720},facingMode:"user"}};return c=await navigator.mediaDevices.getUserMedia(e),t.srcObject=c,new Promise(o=>{t.onloadedmetadata=()=>{t.play(),o()}})}catch(e){throw console.error("Error starting camera:",e),e}}function E(){const t=document.getElementById("videoElement");c&&(c.getTracks().forEach(e=>e.stop()),t.srcObject=null,c=null)}function B(){const t=document.getElementById("videoElement"),e=document.getElementById("canvasElement"),o=document.getElementById("captureButton");if(!c)return;const a=e.getContext("2d");e.width=t.videoWidth,e.height=t.videoHeight,a.translate(e.width,0),a.scale(-1,1),a.drawImage(t,0,0,e.width,e.height);const n=e.toDataURL("image/png");o.disabled=!0;const r=new CustomEvent("image-captured",{detail:{imageData:n}});document.dispatchEvent(r),setTimeout(()=>{o.disabled=!1},2e3)}function b(){const t=document.querySelector(".camera-placeholder");t.innerHTML=`
    <div class="camera-icon" style="border-color: var(--color-error);"></div>
    <p>No se pudo acceder a la cámara. Por favor, verifica los permisos.</p>
  `}function I(){x(),w()}function x(){const t=document.getElementById("dogAnimation"),e=document.getElementById("catAnimation"),o=document.createElement("div");o.className="pet-face dog-face",o.innerHTML=`
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `,t.appendChild(o);const a=document.createElement("div");a.className="pet-face cat-face",a.innerHTML=`
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `,e.appendChild(a);const n=document.createElement("style");n.textContent=`
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
  `,document.head.appendChild(n),[t,e].forEach(r=>{r.style.transition="transform 0.3s ease",r.addEventListener("mouseover",()=>{r.style.transform="scale(1.1)"}),r.addEventListener("mouseout",()=>{r.style.transform="scale(1)"})})}function w(){const t=document.querySelectorAll(".hero, .camera-section, .result-section"),e=new IntersectionObserver(o=>{o.forEach(a=>{a.isIntersecting&&(a.target.style.opacity="1",a.target.style.transform="translateY(0)")})},{threshold:.1});t.forEach(o=>{o.style.opacity="0",o.style.transform="translateY(20px)",o.style.transition="opacity 0.5s ease, transform 0.5s ease",e.observe(o)})}function C(){const t=document.getElementById("resultDisplay"),e=document.getElementById("resultPlaceholder"),o=document.getElementById("confidenceBar");e.style.display="none",t.style.display="flex",t.classList.add("processing"),o.style.width="0%"}function L(){document.getElementById("resultDisplay").classList.remove("processing")}function P(t){const e=document.getElementById("resultIcon");e.className="result-icon pet",t==="dog"?e.classList.add("dog-animation"):e.classList.add("cat-animation"),e.innerHTML=`
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `}let l=null,f=null,u=null;async function A(){try{console.log("🔁 Cargando modelo..."),l=await tf.loadGraphModel("Clasificador_Perros_Gatos/model.json"),console.log("✅ Modelo cargado correctamente:",l)}catch(t){console.error("❌ Error cargando el modelo:",t)}}function D(t,e){f=t,u=e}function M(){if(!l||!f||!u){console.error("❌ No se puede predecir: modelo o canvas no definidos.");return}C();const e=u.getContext("2d").getImageData(0,0,100,100);let o=[],a=[];for(let i=0;i<e.data.length;i+=4){const y=(e.data[i]+e.data[i+1]+e.data[i+2])/765;a.push([y]),a.length===100&&(o.push(a),a=[])}const n=tf.tensor4d([o]),s=l.predict(n).dataSync()[0],g=Math.round(s*100),m=s<=.5?"🐱 Gato":"🐶 Perro";document.getElementById("resultText").innerText=m,document.getElementById("resultPlaceholder").style.display="none",document.getElementById("resultDisplay").style.display="block",document.getElementById("confidenceValue").innerText=`Confianza del modelo: ${g}%`,P(m.includes("Perro")?"dog":"cat");const p=document.getElementById("confidenceBar");p.style.transition="width 1s ease-in-out",p.style.width=`${Math.round(s*100)}%`,L(),console.log("📷 Predicción:",m,"| Confianza:",s)}document.addEventListener("DOMContentLoaded",async()=>{I(),h(),await A();const t=document.getElementById("canvasElement"),e=document.createElement("canvas");e.width=100,e.height=100,D(t,e),document.getElementById("captureButton").addEventListener("click",()=>{t.getContext("2d"),e.getContext("2d").drawImage(t,0,0,100,100),M()})});
