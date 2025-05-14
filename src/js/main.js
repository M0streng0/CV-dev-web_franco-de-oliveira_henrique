// Variables globales
let questionnaire = [];
let currentQuestionIndex = 0;
let userAnswers = '';
let isBruteForcing = false;

// Fonctions d'effets de bande dessinée
function createBangEffect(event) {
  // Créer l'élément
  const bang = document.createElement('div');
  
  // Mots aléatoires de BD
  const comicWords = ['BANG!', 'POW!', 'BAM!', 'BOOM!', 'ZAP!', 'WHAM!', 'KABOOM!'];
  const randomWord = comicWords[Math.floor(Math.random() * comicWords.length)];
  
  // Couleurs aléatoires
  const colors = ['#FF5252', '#FFEB3B', '#2196F3', '#4CAF50', '#9C27B0'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  // Rotation aléatoire
  const rotation = Math.random() * 30 - 15;
  
  // Définir le contenu et le style
  bang.textContent = randomWord;
  bang.style.position = 'absolute';
  bang.style.left = `${event.pageX - 50}px`;
  bang.style.top = `${event.pageY - 50}px`;
  bang.style.fontFamily = "'Bangers', cursive";
  bang.style.fontSize = '3rem';
  bang.style.color = randomColor;
  bang.style.textShadow = '3px 3px 0 #000';
  bang.style.transform = `rotate(${rotation}deg)`;
  bang.style.pointerEvents = 'none';
  bang.style.zIndex = '9999';
  bang.style.transition = 'all 0.5s ease-out';
  bang.style.opacity = '1';
  
  // Ajouter au document
  document.body.appendChild(bang);
  
  // Animer et supprimer
  setTimeout(() => {
    bang.style.opacity = '0';
    bang.style.transform = `rotate(${rotation}deg) scale(2)`;
    setTimeout(() => {
      document.body.removeChild(bang);
    }, 500);
  }, 100);
}

// Fonctions de calculatrice
function calculate(operation) {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  let result;
  
  if (isNaN(num1) || isNaN(num2)) {
    document.getElementById('result').textContent = "Veuillez entrer des nombres valides";
    return;
  }
  
  switch (operation) {
    case 'add':
      result = num1 + num2;
      break;
    case 'subtract':
      result = num1 - num2;
      break;
    case 'multiply':
      result = num1 * num2;
      break;
    case 'divide':
      if (num2 === 0) {
        document.getElementById('result').textContent = "Impossible de diviser par zéro";
        return;
      }
      result = num1 / num2;
      break;
  }
  
  document.getElementById('result').textContent = result;
}

// Fonctions de quiz
async function loadQuestions() {
  try {
    const response = await fetch('/src/static/data/questions.json');
    if (!response.ok) {
      throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    questionnaire = await response.json();
    displayQuestion(0);
  } catch (error) {
    console.error('Impossible de charger les questions:', error);
    document.getElementById('question-container').innerHTML = `
      <div class="comic-panel bg-red-100">
        <p class="text-red-600">Erreur lors du chargement des questions. Veuillez réessayer plus tard.</p>
      </div>
    `;
  }
}

function displayQuestion(index) {
  if (index >= questionnaire.length) {
    checkContactPage();
    return;
  }
  
  const question = questionnaire[index];
  const questionContainer = document.getElementById('question-container');
  
  let answersHTML = '';
  question.reponses.forEach(answer => {
    answersHTML += `
      <button class="comic-btn btn-primary mb-2 mr-2" 
              onclick="answerQuestion(${question.qid}, ${answer.rid})">
        ${answer.rlabel}
      </button>
    `;
  });
  
  questionContainer.innerHTML = `
    <div class="speech-bubble mb-6">
      <h3 class="text-xl font-bold mb-4">${question.qlabel}</h3>
      <div class="flex flex-wrap">
        ${answersHTML}
      </div>
    </div>
  `;
}

function answerQuestion(qid, rid) {
  userAnswers += `A${qid}_${rid}_`;
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questionnaire.length) {
    displayQuestion(currentQuestionIndex);
  } else {
    checkContactPage();
  }
}

function checkContactPage() {
  // Supprimer le tiret bas final
  userAnswers = userAnswers.slice(0, -1);
  
  // Vérifier si la page avec les réponses correctes existe
  const contactPage = `${userAnswers}.html`;
  
  fetch(contactPage)
    .then(response => {
      if (response.ok) {
        window.location.href = contactPage;
      } else {
        document.getElementById('question-container').innerHTML = `
          <div class="comic-panel bg-yellow-100">
            <p class="text-xl font-bold text-yellow-800">
              D'après vos réponses, vous n'avez pas les autorisations nécessaires pour contacter Captain America.
              Seuls les vrais alliés connaissent les bonnes réponses!
            </p>
          </div>
        `;
      }
    })
    .catch(() => {
      document.getElementById('question-container').innerHTML = `
        <div class="comic-panel bg-yellow-100">
          <p class="text-xl font-bold text-yellow-800">
            D'après vos réponses, vous n'avez pas les autorisations nécessaires pour contacter Captain America.
            Seuls les vrais alliés connaissent les bonnes réponses!
          </p>
        </div>
      `;
    });
}

// Fonctions de force brute
function startBruteForce() {
  if (isBruteForcing) return;
  
  isBruteForcing = true;
  const statusElement = document.getElementById('bruteforce-status');
  const progressBar = document.getElementById('hack-progress');
  const statusText = document.getElementById('hack-status');
  
  statusElement.classList.remove('hidden');
  
  let progress = 0;
  let attempts = 0;
  const totalCombinations = 27; // 3 questions avec 3 réponses chacune: 3^3
  const correctCombination = "A1_2_A2_1_A3_2"; // Vibranium, Bucky Barnes, Avengers Assemble!
  
  // Générer des combinaisons aléatoires pour l'affichage
  function generateRandomCombo() {
    const q1 = Math.floor(Math.random() * 3) + 1;
    const q2 = Math.floor(Math.random() * 3) + 1;
    const q3 = Math.floor(Math.random() * 3) + 1;
    return `A1_${q1}_A2_${q2}_A3_${q3}`;
  }
  
  const interval = setInterval(() => {
    attempts++;
    progress = Math.min(100, Math.floor((attempts / totalCombinations) * 100));
    
    // Mettre à jour la barre de progression
    progressBar.style.width = `${progress}%`;
    
    // Mettre à jour le texte d'état avec des animations de "piratage"
    let currentAttempt = generateRandomCombo();
    statusText.innerHTML = `Tentative ${attempts}/${totalCombinations}: Test de ${currentAttempt}... Accès refusé!<br>` + statusText.innerHTML.split('<br>').slice(0, 4).join('<br>');
    
    // Simuler la découverte de la bonne combinaison
    if (progress >= 75 && Math.random() > 0.7) {
      clearInterval(interval);
      
      // Afficher le message de succès
      statusText.innerHTML = `CONTOURNEMENT HYDRA RÉUSSI! Combinaison trouvée: ${correctCombination}<br>` + statusText.innerHTML;
      progressBar.style.width = '100%';
      progressBar.classList.remove('bg-comic-red');
      progressBar.classList.add('bg-green-500');
      
      // Rediriger après un court délai pour un effet dramatique
      setTimeout(() => {
        bruteForceContact();
      }, 1500);
    }
    
    // Abandonner après toutes les tentatives
    if (progress >= 100) {
      clearInterval(interval);
      isBruteForcing = false;
    }
    
  }, 200); // Mise à jour toutes les 200ms pour un effet visuel agréable
}

// Navigation directe vers la page de contact après force brute
function bruteForceContact() {
  window.location.href = "A1_2_A2_1_A3_2.html";
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  // Ajouter l'effet bang au clic - fonctionne sur toutes les pages
  document.addEventListener('click', createBangEffect);
  
  const currentPage = window.location.pathname.split('/').pop();
  
  if (currentPage === 'index.html' || currentPage === '') {
    // Initialiser le système d'onglets
    const tabButtons = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = document.querySelector(button.dataset.tabTarget);
        
        tabContents.forEach(content => {
          content.classList.add('hidden');
        });
        
        tabButtons.forEach(btn => {
          btn.classList.remove('active', 'btn-active');
        });
        
        target.classList.remove('hidden');
        button.classList.add('active', 'btn-active');
        
        // Charger les questions quand l'onglet contact est cliqué
        if (button.dataset.tabTarget === '#contact') {
          loadQuestions();
        }
      });
    });
    
    // Activer l'onglet par défaut
    document.querySelector('[data-tab-target="#home"]').click();
  }
}); 