// In content/calculus.js

// We use backticks (`) for template literals, which makes it easy to have multi-line strings.
const cheatSheetContent = `
  <h1>Matric Maths: The Calculus Cheat Sheet</h1>
  <p>This isn't just a list of formulas. It's a guide to understanding the <em>ideas</em> behind Calculus...</p>
  <!-- Paste the rest of the cheat sheet HTML/Markdown here -->
`;

const workedExamplesContent = `
  <h1>Calculus Worked Example Library</h1>
  <p>Follow these examples step-by-step...</p>
  <!-- Paste the rest of the worked examples HTML/Markdown here -->
`;

const practiceDrillQuestions = [
    // This is the array of question objects from the practice drill document
    {
        section: 1,
        type: 'warm-up',
        question: 'Find the derivative, f\'(x), for f(x) = 5x^2 - 7x + 2',
        answer: 'f\'(x) = 10x - 7'
    },
    // ... add all other practice questions here
];

const pastPapersContent = `
  <h1>Calculus Past Paper Linker</h1>
  <p>Use this list to find and practice real calculus questions...</p>
  <!-- Paste the rest of the past paper linker HTML/Markdown here -->
`;


// This "exports" the content so other files can import it.
export const calculusPack = {
    cheatSheet: cheatSheetContent,
    workedExamples: workedExamplesContent,
    practiceDrill: practiceDrillQuestions,
    pastPapers: pastPapersContent
};
