/**
 * Animations module - Handles UI animations and visual effects
 */

export function initAnimations() {
  animatePets();
  initScrollAnimations();
}

/**
 * Initialize and control pet animations
 */
function animatePets() {
  const dogAnimation = document.getElementById('dogAnimation');
  const catAnimation = document.getElementById('catAnimation');
  
  // Add face elements to dog animation
  const dogFace = document.createElement('div');
  dogFace.className = 'pet-face dog-face';
  dogFace.innerHTML = `
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `;
  dogAnimation.appendChild(dogFace);
  
  // Add face elements to cat animation
  const catFace = document.createElement('div');
  catFace.className = 'pet-face cat-face';
  catFace.innerHTML = `
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `;
  catAnimation.appendChild(catFace);
  
  // Apply CSS to pet faces
  const style = document.createElement('style');
  style.textContent = `
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
  `;
  document.head.appendChild(style);
  
  // Add hover effects
  [dogAnimation, catAnimation].forEach(pet => {
    pet.style.transition = 'transform 0.3s ease';
    
    pet.addEventListener('mouseover', () => {
      pet.style.transform = 'scale(1.1)';
    });
    
    pet.addEventListener('mouseout', () => {
      pet.style.transform = 'scale(1)';
    });
  });
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
  const sections = document.querySelectorAll('.hero, .camera-section, .result-section');
  
  // Simple intersection observer for fade-in effects
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1 }
  );
  
  // Setup initial styles and observe each section
  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
  });
}

/**
 * Show loading animation in result area
 */
export function showLoadingAnimation() {
  const resultDisplay = document.getElementById('resultDisplay');
  const resultPlaceholder = document.getElementById('resultPlaceholder');
  const confidenceBar = document.getElementById('confidenceBar');
  
  resultPlaceholder.style.display = 'none';
  resultDisplay.style.display = 'flex';
  resultDisplay.classList.add('processing');
  
  // Reset confidence bar
  confidenceBar.style.width = '0%';
}

/**
 * Hide loading animation in result area
 */
export function hideLoadingAnimation() {
  const resultDisplay = document.getElementById('resultDisplay');
  resultDisplay.classList.remove('processing');
}

/**
 * Show happy animation when result is shown
 * @param {string} petType - Either 'dog' or 'cat'
 */
export function showResultAnimation(petType) {
  const resultIcon = document.getElementById('resultIcon');
  
  // Limpiar clases anteriores
  resultIcon.className = 'result-icon pet'; // ← importante: agregar "pet"

  // Agregar clase específica de tipo
  if (petType === 'dog') {
    resultIcon.classList.add('dog-animation');
  } else {
    resultIcon.classList.add('cat-animation');
  }

  // Agregar cara
  resultIcon.innerHTML = `
    <div class="pet-eye left"></div>
    <div class="pet-eye right"></div>
    <div class="pet-nose"></div>
    <div class="pet-mouth"></div>
  `;
}
