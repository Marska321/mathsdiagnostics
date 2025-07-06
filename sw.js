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

con
