// --- [START] main.js (Upgraded Version) ---

// --- Step 1: Import Content ---
// We will import our learning content from other files.
// Make sure you have created the file 'content/calculus.js'.
// Note: Your browser will require you to load this as a module in your HTML.
// In index.html, change your script tag to: <script type="module" src="main.js"></script>
import { calculusPack } from './content/calculus.js';


// --- DOM Element Selection ---
// The main 'app' container will now hold all our different views.
const app = document.getElementById('app');

// We still need the original screen elements for the diagnostic
const welcomeScreen = document.getElementById('welcome-screen');
const diagnosticScreen = document.getElementById('diagnostic-screen');
// The 'resultsScreen' is now replaced by the dashboard, but we keep the variable for now.
const resultsScreen = document.getElementById('results-screen');


// --- DATA & STATE (No changes here) ---
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
    // Your existing questions array... (omitted for brevity, no changes needed)
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
    {
        title: "Algebra Check-in",
        text: "If (x - 5)(x + 2) = 0, what are the values of x?",
        type: 'mcq',
        topic: 'algebra',
        options: [ { text: "x = 5 and x = -2", correct: true }, { text: "x = -5 and x = 2", correct: false }, { text: "x = 5 and x = 2", correct: false }, { text: "x = -5 and x = -2", correct: false }, ]
    },
    {
        title: "Functions Check-in",
        text: "What type of graph does the equation y = 2x² - 3x + 1 represent?",
        type: 'mcq',
        topic: 'functions',
        options: [ { text: "A straight line", correct: false }, { text: "A parabola", correct: true }, { text: "A hyperbola", correct: false }, { text: "An exponential curve", correct: false }, ]
    },
    {
        title: "Calculus Check-in",
        text: "What is the derivative of f(x) = 3x²?",
        type: 'mcq',
        topic: 'calculus',
        options: [ { text: "f'(x) = 3x", correct: false }, { text: "f'(x) = 2x", correct: false }, { text: "f'(x) = 6x", correct: true }, { text: "f'(x) = x²", correct: false }, ]
    },
    {
        title: "Trigonometry Check-in",
        text: "In a right-angled triangle, which ratio represents sin(θ)?",
        type: 'mcq',
        topic: 'trigonometry',
        options: [ { text: "Adjacent / Hypotenuse", correct: false }, { text: "Opposite / Adjacent", correct: false }, { text: "Opposite / Hypotenuse", correct: true }, { text: "Adjacent / Opposite", correct: false }, ]
    }
];
let currentQuestionIndex = 0;
let selectedAnswers = new Set();


// --- DIAGNOSTIC QUIZ FUNCTIONS (Mostly unchanged) ---
function startDiagnostic() {
    for (const key in capsTopics) { capsTopics[key].score = 0; }
    currentQuestionIndex = 0;
    // We now hide the entire app container and then show the specific screen
    app.innerHTML = ''; // Clear the main container
    app.appendChild(diagnosticScreen); // Add the diagnostic screen back
    diagnosticScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    // This function remains the same as your original.
    // ... (your existing showQuestion logic)
    const question = questions[currentQuestionIndex];
    const progressBar = diagnosticScreen.querySelector('#progress-bar');
    const questionTitle = diagnosticScreen.querySelector('#question-title');
    const questionText = diagnosticScreen.querySelector('#question-text');
    const optionsContainer = diagnosticScreen.querySelector('#options-container');
    const nextBtn = diagnosticScreen.querySelector('#next-btn');

    selectedAnswers.clear();
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionTitle.textContent = question.title;
    questionText.textContent = question.text;
    optionsContainer.innerHTML = '';

    if (question.type === 'recognition') {
        nextBtn.disabled = false;
        // ... (rest of your recognition logic)
    } else if (question.type === 'mcq') {
        nextBtn.disabled = true;
        // ... (rest of your mcq logic)
    }
}

function handleNextQuestion() {
    // This function remains the same as your original.
    // ... (your existing handleNextQuestion logic)
    const question = questions[currentQuestionIndex];
    if (question.type === 'recognition') {
        selectedAnswers.forEach(selectedIndex => {
            const topic = question.options[selectedIndex].topic;
            capsTopics[topic].score += 1;
        });
    } else if (question.type === 'mcq') {
        const selectedIndex = selectedAnswers.values().next().value;
        if (selectedIndex !== undefined && question.options[selectedIndex].correct) {
            capsTopics[question.topic].score += 2;
        }
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}


// --- [MODIFIED] - The showResults function is now upgraded ---
function showResults() {
    // Calculate results
    const sortedTopics = Object.values(capsTopics).sort((a, b) => b.score - a.score);

    // Step 1: Save the results to the browser's local storage
    saveResultsToStorage(sortedTopics);

    // Step 2: Instead of showing the old results screen, render the new dashboard
    showDashboard();
}


// --- [NEW] - PWA View Management Functions ---

/**
 * Saves the diagnostic results to the browser's localStorage.
 * @param {Array} results - The array of topic objects with their scores.
 */
function saveResultsToStorage(results) {
    localStorage.setItem('mathsDiagnosticResults', JSON.stringify(results));
}

/**
 * Renders the main dashboard view into the 'app' container.
 */
function showDashboard() {
    // Hide all original screens
    welcomeScreen.classList.add('hidden');
    diagnosticScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');

    // Get results from storage
    const results = JSON.parse(localStorage.getItem('mathsDiagnosticResults'));
    if (!results) {
        showWelcome(); // If no results, show welcome screen
        return;
    }

    let strongCount = results.filter(topic => topic.score > 0).length;
    const percentage = Math.round((strongCount / results.length) * 100);

    // Build the dashboard HTML as a string
    const dashboardHTML = `
        <div class="fade-in p-4 md:p-6 space-y-6">
            <div class="text-center">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Your Revision Dashboard</h1>
                <p class="text-lg text-gray-600 mt-2">You're showing strength in ${percentage}% of topics! Let's get to work on the rest.</p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-md">
                <h2 class="text-xl font-bold mb-4">Your Personalised Revision Plan</h2>
                <div class="space-y-3">
                    ${results.map(topic => {
                        const isStrong = topic.score > 0;
                        const topicKey = topic.name.split(',')[0].toLowerCase().replace(/ /g, '');
                        return `
                        <div class="p-4 rounded-lg flex items-center justify-between ${isStrong ? 'bg-green-50' : 'bg-yellow-50'}">
                            <span class="font-medium ${isStrong ? 'text-green-800' : 'text-yellow-800'}">${topic.name}</span>
                            ${!isStrong ? `<button data-topic="${topicKey}" class="focus-btn bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all">Start Module</button>` : `<span class="font-bold text-green-800">Strength</span>`}
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <button id="retake-diagnostic-btn" class="w-full text-indigo-600 font-semibold py-3">Retake Diagnostic Test</button>
        </div>
    `;

    // Set the main app container's content to our new dashboard
    app.innerHTML = dashboardHTML;

    // Add event listeners for the new buttons
    document.querySelectorAll('.focus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const topic = e.target.dataset.topic;
            if (topic === 'calculus') {
                showFocusArea(calculusPack);
            } else {
                alert(topic.charAt(0).toUpperCase() + topic.slice(1) + ' pack coming soon!');
            }
        });
    });

    document.getElementById('retake-diagnostic-btn').addEventListener('click', () => {
        localStorage.removeItem('mathsDiagnosticResults');
        showWelcome();
    });
}

/**
 * Renders the learning module for a specific topic.
 * @param {object} pack - The content pack for the topic (e.g., calculusPack).
 */
function showFocusArea(pack) {
    const focusAreaHTML = `
        <div class="fade-in p-4 md:p-6 space-y-6">
            <button id="back-to-dashboard" class="text-indigo-600 font-semibold mb-4">&larr; Back to Dashboard</button>
            <div class="bg-white p-6 rounded-2xl shadow-md">
                <!-- Placeholder for tabbed navigation -->
                <div class="border-b border-gray-200 mb-4">
                    <nav class="flex space-x-4" aria-label="Tabs">
                        <button class="tab-btn active-tab" data-content="cheatSheet">Cheat Sheet</button>
                        <button class="tab-btn" data-content="workedExamples">Examples</button>
                        <button class="tab-btn" data-content="practiceDrill">Drill</button>
                        <button class="tab-btn" data-content="pastPapers">Past Papers</button>
                    </nav>
                </div>
                <div id="tab-content" class="prose max-w-none">
                    ${pack.cheatSheet}
                </div>
            </div>
        </div>
    `;
    app.innerHTML = focusAreaHTML;

    // Add event listeners for tabs
    const tabContainer = document.getElementById('tab-content');
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active tab style
            document.querySelector('.active-tab').classList.remove('active-tab');
            e.target.classList.add('active-tab');
            // Update content
            const contentKey = e.target.dataset.content;
            tabContainer.innerHTML = pack[contentKey]; // Note: for the drill, you'll need to render it interactively
        });
    });

    document.getElementById('back-to-dashboard').addEventListener('click', showDashboard);
}

/**
 * Shows the initial welcome screen.
 */
function showWelcome() {
    app.innerHTML = ''; // Clear app
    welcomeScreen.classList.remove('hidden');
    app.appendChild(welcomeScreen); // Add welcome screen back
    // Re-add event listener since we cleared the innerHTML
    app.querySelector('#start-btn').addEventListener('click', startDiagnostic);
}


// --- App Initialization ---
// This code runs when the entire page has loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user has taken the diagnostic before
    if (localStorage.getItem('mathsDiagnosticResults')) {
        // If they have, take them straight to their dashboard
        showDashboard();
    } else {
        // Otherwise, show the welcome screen to start the quiz
        showWelcome();
    }
});
