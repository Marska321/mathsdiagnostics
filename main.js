// --- [START] main.js ---

// --- DOM Element Selection ---
// It's good practice to select all your needed HTML elements at the top.
// Make sure your index.html file has elements with these exact IDs.
const app = document.getElementById('app');
const welcomeScreen = document.getElementById('welcome-screen');
const diagnosticScreen = document.getElementById('diagnostic-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const progressBar = document.getElementById('progress-bar');
const questionContainer = document.getElementById('question-container');
const questionTitle = document.getElementById('question-title');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

const resultsSummary = document.getElementById('results-summary');
const resultsList = document.getElementById('results-list');

// --- [END] DOM Element Selection ---

// --- DATA: CAPS Curriculum Topics and Questions ---
// This is the core data for your application.
const capsTopics = {
    algebra: { name: "Algebra, Equations & Inequalities", score: 0 },
    patterns: { name: "Number Patterns & Sequences", score: 0 },
    functions: { name: "Functions & Graphs", score: 0 },
    finance: { name: "Financial Maths", score: 0 },
    calculus: { name: "Calculus", score: 0 },
    probability: { name: "Probability", score: 0 },
    geometry: { name: "Euclidean & Analytical Geometry", score: 0 },
    trigonometry: { name: "Trigonometry", score: 0 },
};

const questions = [
    // Stage 1: Recognition
    {
        title: "Recognition Round",
        text: "Which of these concepts look familiar to you? (Select all that apply)",
        type: 'recognition',
        options: [
            { text: "The Quadratic Formula: x = [-b ± √(b²-4ac)] / 2a", topic: 'algebra' },
            { text: "Arithmetic & Geometric Sequences", topic: 'patterns' },
            { text: "Parabolas, Hyperbolas, and Exponential Graphs", topic: 'functions' },
            { text: "Simple & Compound Interest Formulas", topic: 'finance' },
            { text: "Finding the derivative using f'(x)", topic: 'calculus' },
            { text: "Tree Diagrams", topic: 'probability' },
            { text: "The equation of a circle: (x-a)² + (y-b)² = r²", topic: 'geometry' },
            { text: "SOH CAH TOA", topic: 'trigonometry' },
        ]
    },
    // Stage 2: Simple Application Questions
    {
        title: "Algebra Check-in",
        text: "If (x - 5)(x + 2) = 0, what are the values of x?",
        type: 'mcq',
        topic: 'algebra',
        options: [
            { text: "x = 5 and x = -2", correct: true },
            { text: "x = -5 and x = 2", correct: false },
            { text: "x = 5 and x = 2", correct: false },
            { text: "x = -5 and x = -2", correct: false },
        ]
    },
    {
        title: "Functions Check-in",
        text: "What type of graph does the equation y = 2x² - 3x + 1 represent?",
        type: 'mcq',
        topic: 'functions',
        options: [
            { text: "A straight line", correct: false },
            { text: "A parabola", correct: true },
            { text: "A hyperbola", correct: false },
            { text: "An exponential curve", correct: false },
        ]
    },
    {
        title: "Calculus Check-in",
        text: "What is the derivative of f(x) = 3x²?",
        type: 'mcq',
        topic: 'calculus',
        options: [
            { text: "f'(x) = 3x", correct: false },
            { text: "f'(x) = 2x", correct: false },
            { text: "f'(x) = 6x", correct: true },
            { text: "f'(x) = x²", correct: false },
        ]
    },
    {
        title: "Trigonometry Check-in",
        text: "In a right-angled triangle, which ratio represents sin(θ)?",
        type: 'mcq',
        topic: 'trigonometry',
        options: [
            { text: "Adjacent / Hypotenuse", correct: false },
            { text: "Opposite / Adjacent", correct: false },
            { text: "Opposite / Hypotenuse", correct: true },
            { text: "Adjacent / Opposite", correct: false },
        ]
    }
];

// --- State Management ---
// These variables will track the user's progress through the quiz.
let currentQuestionIndex = 0;
let selectedAnswers = new Set();

// --- Main Functions ---
// These are the function implementations your review mentioned were missing.

/**
 * Resets state and transitions from the welcome screen to the first question.
 */
function startDiagnostic() {
    // Reset scores for a fresh start
    for (const key in capsTopics) {
        capsTopics[key].score = 0;
    }
    currentQuestionIndex = 0;

    // Transition UI screens
    welcomeScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    diagnosticScreen.classList.remove('hidden');
    diagnosticScreen.classList.add('fade-in');
    
    showQuestion();
}

/**
 * Displays the current question and its options.
 */
function showQuestion() {
    selectedAnswers.clear();
    const question = questions[currentQuestionIndex];
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Populate question text
    questionTitle.textContent = question.title;
    questionText.textContent = question.text;
    optionsContainer.innerHTML = ''; // Clear previous options

    // Handle 'recognition' question type (multiple selections)
    if (question.type === 'recognition') {
        nextBtn.disabled = false;
        nextBtn.classList.remove('bg-gray-300', 'text-gray-500');
        nextBtn.classList.add('bg-indigo-600', 'text-white', 'hover:bg-indigo-700');
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = "w-full text-left p-4 border rounded-lg transition-colors duration-200 hover:bg-indigo-50";
            button.textContent = option.text;
            button.dataset.topic = option.topic;
            button.onclick = () => {
                button.classList.toggle('bg-indigo-100');
                button.classList.toggle('border-indigo-500');
                if (selectedAnswers.has(index)) {
                    selectedAnswers.delete(index);
                } else {
                    selectedAnswers.add(index);
                }
            };
            optionsContainer.appendChild(button);
        });
    } 
    // Handle 'mcq' question type (single selection)
    else if (question.type === 'mcq') {
        nextBtn.disabled = true;
        nextBtn.classList.add('bg-gray-300', 'text-gray-500');
        nextBtn.classList.remove('bg-indigo-600', 'text-white', 'hover:bg-indigo-700');

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = "w-full text-left p-4 border rounded-lg transition-colors duration-200 hover:bg-indigo-50";
            button.textContent = option.text;
            button.dataset.correct = option.correct;
            button.onclick = () => {
                // Disable all buttons after one is clicked to prevent changing answer
                Array.from(optionsContainer.children).forEach(btn => {
                    btn.disabled = true;
                    btn.classList.add('opacity-70');
                });
                
                // Style the selected button based on correctness
                if(option.correct) {
                    button.classList.add('bg-green-100', 'border-green-500');
                } else {
                    button.classList.add('bg-red-100', 'border-red-500');
                }
                
                selectedAnswers.add(index);
                nextBtn.disabled = false; // Enable the 'Next' button
                nextBtn.classList.remove('bg-gray-300', 'text-gray-500');
                nextBtn.classList.add('bg-indigo-600', 'text-white', 'hover:bg-indigo-700');
            };
            optionsContainer.appendChild(button);
        });
    }

    // After all options are appended:
    if (optionsContainer.firstChild) {
        optionsContainer.firstChild.focus();
    }
}

/**
 * Processes the answer to the current question and moves to the next, or shows results.
 */
function handleNextQuestion() {
    const question = questions[currentQuestionIndex];

    // Prevent moving forward if nothing is selected in recognition
    if (question.type === 'recognition' && selectedAnswers.size === 0) {
        alert('Please select at least one concept you recognize before continuing.');
        return;
    }

    // Score the answer based on question type
    if (question.type === 'recognition') {
        selectedAnswers.forEach(selectedIndex => {
            const topic = question.options[selectedIndex].topic;
            capsTopics[topic].score += 1; // Give a point for recognition
        });
    } else if (question.type === 'mcq') {
        const selectedIndex = selectedAnswers.values().next().value;
        if (selectedIndex !== undefined && question.options[selectedIndex].correct) {
            capsTopics[question.topic].score += 2; // Give more points for a correct answer
        }
    }

    currentQuestionIndex++;

    // Decide whether to show the next question or the final results
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }

    // Move this line after incrementing:
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

/**
 * Calculates and displays the final results and revision plan.
 */
function showResults() {
    // Transition UI
    diagnosticScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    resultsScreen.classList.add('fade-in');
    progressBar.style.width = '100%';

    let strongCount = 0;
    // Sort topics by score to show strengths first
    const sortedTopics = Object.values(capsTopics).sort((a, b) => b.score - a.score);

    resultsList.innerHTML = ''; // Clear previous results
    sortedTopics.forEach(topic => {
        const isStrong = topic.score > 0; // Simple logic: any points mean some familiarity
        if (isStrong) strongCount++;

        const resultItem = document.createElement('div');
        resultItem.className = `p-4 rounded-lg flex items-center justify-between ${isStrong ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} border`;
        
        const topicName = document.createElement('span');
        topicName.className = `font-medium ${isStrong ? 'text-green-800' : 'text-yellow-800'}`;
        topicName.textContent = topic.name;

        const topicStatus = document.createElement('span');
        topicStatus.className = `font-bold px-3 py-1 rounded-full text-sm ${isStrong ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`;
        topicStatus.textContent = isStrong ? 'Strength' : 'Focus Area';

        resultItem.appendChild(topicName);
        resultItem.appendChild(topicStatus);
        resultsList.appendChild(resultItem);
    });
    
    // Create a personalized summary message
    const percentage = Math.round((strongCount / Object.keys(capsTopics).length) * 100);
    resultsSummary.textContent = `Amazing work! You're already showing strength in ${percentage}% of the core topics. Focus on the yellow areas to make your revision super effective.`;
}

// PWA Install Prompt Logic
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.style.display = 'block';
  }
});

const installBtn = document.getElementById('install-btn');
if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      installBtn.style.display = 'none';
      deferredPrompt = null;
    }
  });
}

// --- Event Listeners ---
// This connects the buttons in your HTML to the JavaScript functions.
startBtn.addEventListener('click', startDiagnostic);
nextBtn.addEventListener('click', handleNextQuestion);
restartBtn.addEventListener('click', () => {
     // A simple page reload is the easiest way to reset the state for this MVP
    window.location.reload();
});

// --- [END] main.js ---

if (!app || !welcomeScreen || !diagnosticScreen || !resultsScreen ||
    !startBtn || !nextBtn || !restartBtn ||
    !progressBar || !questionContainer || !questionTitle || !questionText || !optionsContainer ||
    !resultsSummary || !resultsList) {
    throw new Error('One or more required DOM elements are missing. Please check your HTML IDs.');
}
