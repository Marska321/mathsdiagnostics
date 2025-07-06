// --- [START] main.js (Fully Interactive Version) ---

// --- Step 1: Import Content ---
import { calculusPack } from './content/calculus.js';

// --- DOM Element Selection ---
const app = document.getElementById('app');
const welcomeScreen = document.getElementById('welcome-screen');
const diagnosticScreen = document.getElementById('diagnostic-screen');
const resultsScreen = document.getElementById('results-screen'); // Kept for initial structure

// --- DATA & STATE ---
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

// --- DIAGNOSTIC QUIZ FUNCTIONS ---
function startDiagnostic() {
    for (const key in capsTopics) { capsTopics[key].score = 0; }
    currentQuestionIndex = 0;
    app.innerHTML = '';
    app.appendChild(diagnosticScreen);
    diagnosticScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
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
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = "w-full text-left p-4 border rounded-lg transition-colors duration-200 hover:bg-indigo-50";
            button.textContent = option.text;
            button.onclick = () => {
                button.classList.toggle('bg-indigo-100');
                button.classList.toggle('border-indigo-500');
                selectedAnswers.has(index) ? selectedAnswers.delete(index) : selectedAnswers.add(index);
            };
            optionsContainer.appendChild(button);
        });
    } else if (question.type === 'mcq') {
        nextBtn.disabled = true;
        nextBtn.classList.add('bg-gray-300', 'text-gray-500');
        nextBtn.classList.remove('bg-indigo-600', 'text-white');
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = "w-full text-left p-4 border rounded-lg transition-colors duration-200 hover:bg-indigo-50";
            button.textContent = option.text;
            button.onclick = () => {
                Array.from(optionsContainer.children).forEach(btn => btn.disabled = true);
                button.classList.add(option.correct ? 'bg-green-100' : 'bg-red-100');
                selectedAnswers.add(index);
                nextBtn.disabled = false;
                nextBtn.classList.remove('bg-gray-300', 'text-gray-500');
                nextBtn.classList.add('bg-indigo-600', 'text-white');
            };
            optionsContainer.appendChild(button);
        });
    }
}

function handleNextQuestion() {
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

function showResults() {
    const sortedTopics = Object.values(capsTopics).map(t => ({ name: t.name, score: t.score })).sort((a, b) => b.score - a.score);
    saveResultsToStorage(sortedTopics);
    showDashboard();
}

// --- PWA View Management Functions ---
function saveResultsToStorage(results) {
    localStorage.setItem('mathsDiagnosticResults', JSON.stringify(results));
}

function showDashboard() {
    const results = JSON.parse(localStorage.getItem('mathsDiagnosticResults'));
    if (!results) { showWelcome(); return; }

    const strongCount = results.filter(topic => topic.score > 0).length;
    const percentage = Math.round((strongCount / results.length) * 100);

    const dashboardHTML = `
        <div class="fade-in p-4 md:p-6 space-y-6">
            <div class="text-center">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Your Revision Dashboard</h1>
                <p class="text-lg text-gray-600 mt-2">You're showing strength in ${percentage}% of topics! Let's get to work.</p>
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
                        </div>`;
                    }).join('')}
                </div>
            </div>
            <button id="retake-diagnostic-btn" class="w-full text-indigo-600 font-semibold py-3">Retake Diagnostic Test</button>
        </div>`;
    app.innerHTML = dashboardHTML;
    
    document.querySelectorAll('.focus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const topic = e.target.dataset.topic;
            if (topic === 'calculus') { showFocusArea(calculusPack); }
            else { alert(topic.charAt(0).toUpperCase() + topic.slice(1) + ' pack coming soon!'); }
        });
    });
    document.getElementById('retake-diagnostic-btn').addEventListener('click', () => {
        localStorage.removeItem('mathsDiagnosticResults');
        showWelcome();
    });
}

function showFocusArea(pack) {
    const focusAreaHTML = `
        <div class="fade-in p-4 md:p-6 space-y-6">
            <button id="back-to-dashboard" class="text-indigo-600 font-semibold mb-4">&larr; Back to Dashboard</button>
            <div class="bg-white p-6 rounded-2xl shadow-md">
                <h1 class="text-2xl font-bold mb-4">${pack.title} Focus Pack</h1>
                <div class="border-b border-gray-200 mb-4">
                    <nav class="flex space-x-2 md:space-x-4" aria-label="Tabs">
                        <button class="tab-btn active-tab" data-content-key="cheatSheet">Cheat Sheet</button>
                        <button class="tab-btn" data-content-key="workedExamples">Examples</button>
                        <button class="tab-btn" data-content-key="practiceDrill">Drill</button>
                        <button class="tab-btn" data-content-key="pastPapers">Past Papers</button>
                    </nav>
                </div>
                <div id="tab-content">${pack.cheatSheet}</div>
            </div>
        </div>`;
    app.innerHTML = focusAreaHTML;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelector('.active-tab').classList.remove('active-tab');
            e.target.classList.add('active-tab');
            const contentKey = e.target.dataset.contentKey;
            
            if (contentKey === 'practiceDrill') {
                renderPracticeDrill(pack.practiceDrill);
            } else {
                document.getElementById('tab-content').innerHTML = pack[contentKey];
            }
        });
    });
    document.getElementById('back-to-dashboard').addEventListener('click', showDashboard);
}

function renderPracticeDrill(drillQuestions) {
    const tabContent = document.getElementById('tab-content');
    let drillHTML = `<div class="space-y-6">`;
    drillQuestions.forEach((q, index) => {
        drillHTML += `
            <div class="p-4 border rounded-lg">
                <p class="font-semibold text-gray-500 text-sm">${q.section}</p>
                <p class="my-2">${q.question}</p>
                <button data-answer-id="${index}" class="show-answer-btn text-sm text-indigo-600 font-semibold">Show Answer</button>
                <p id="answer-${index}" class="hidden mt-2 p-2 bg-green-50 text-green-800 rounded">${q.answer}</p>
            </div>
        `;
    });
    drillHTML += `</div>`;
    tabContent.innerHTML = drillHTML;

    document.querySelectorAll('.show-answer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const answerId = e.target.dataset.answerId;
            const answerEl = document.getElementById(`answer-${answerId}`);
            answerEl.classList.toggle('hidden');
            e.target.textContent = answerEl.classList.contains('hidden') ? 'Show Answer' : 'Hide Answer';
        });
    });
}

function showWelcome() {
    app.innerHTML = '';
    const welcomeHTML = `
        <div id="welcome-screen" class="text-center space-y-6 fade-in">
            <div class="flex justify-center">
                <div class="bg-indigo-100 text-indigo-600 p-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
            </div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900">Matric Maths Confidence Builder</h1>
            <p class="text-lg text-gray-600">Finals are coming, but you've got this. Let's find your strengths and create a smart revision plan in just 5 minutes.</p>
            <button id="start-btn" class="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300">Let's Get Started</button>
        </div>
    `;
    app.innerHTML = welcomeHTML;
    app.querySelector('#start-btn').addEventListener('click', startDiagnostic);
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('mathsDiagnosticResults')) {
        showDashboard();
    } else {
        showWelcome();
    }
});
