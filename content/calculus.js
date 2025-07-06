// In content/calculus.js

// We use backticks (`) for template literals, which makes it easy to have multi-line strings.
const cheatSheetContent = `
    <div class="prose max-w-none">
        <h1>Matric Maths: The Calculus Cheat Sheet</h1>
        <p>This isn't just a list of formulas. It's a guide to understanding the <em>ideas</em> behind Calculus so you can solve exam problems with confidence.</p>
        
        <h2>Part 1: The Big Idea - What IS Calculus?</h2>
        <p>At its heart, Calculus is the <strong>mathematics of change</strong>. For Matric, this means finding the <strong>gradient (steepness)</strong> at any single point on a curved graph and using that to find turning points and solve optimisation problems.</p>
        
        <h2>Part 2: The Derivative - Your Gradient Machine</h2>
        <p>The <strong>Derivative</strong>, written as <strong>f'(x)</strong>, is a formula that gives you the gradient of the tangent at any x-value.</p>
        <h3>Method 1: First Principles (The Long Way)</h3>
        <p>The formula is: <code>f'(x) = lim(h→0) [f(x+h) - f(x)] / h</code>. You must know this for the exam.</p>
        <h3>Method 2: The Power Rule (The Fast Way)</h3>
        <p>If <code>f(x) = ax^n</code>, then <code>f'(x) = n * ax^(n-1)</code>. This is your go-to method.</p>

        <h2>Part 3: The 3 Big Exam Questions</h2>
        <ol>
            <li><strong>Finding the Equation of a Tangent Line:</strong> Get a point (x, y) and a gradient (m) from f'(x), then use y - y₁ = m(x - x₁).</li>
            <li><strong>Analysing Cubic Functions:</strong> Find intercepts, then find turning points by setting f'(x) = 0.</li>
            <li><strong>Optimisation Problems:</strong> Create a formula for what you want to maximise/minimise, get it into one variable, differentiate, and set to 0.</li>
        </ol>
    </div>
`;

const workedExamplesContent = `
    <div class="prose max-w-none">
        <h1>Calculus Worked Example Library</h1>
        <p>This is where the theory from the Cheat Sheet becomes practice. Follow these examples step-by-step to see how to solve common exam problems.</p>
        
        <h3>1. Finding the Equation of a Tangent Line</h3>
        <div class="p-4 border rounded-lg bg-gray-50">
            <p><strong>Question:</strong> Find the equation of the tangent line to the curve f(x) = x² - 3x + 5 at the point where x=4.</p>
            <p><strong>Answer:</strong> y = 5x - 11</p>
        </div>

        <h3>2. Analysing Cubic Functions</h3>
         <div class="p-4 border rounded-lg bg-gray-50">
            <p><strong>Question:</strong> Fully analyse and sketch the graph of f(x) = x³ - 6x² + 9x.</p>
            <p><strong>Answer Summary:</strong> Y-int (0,0), X-int (0,0) and (3,0), Turning points (1,4) and (3,0).</p>
        </div>

        <h3>3. Optimisation Problems</h3>
         <div class="p-4 border rounded-lg bg-gray-50">
            <p><strong>Question:</strong> A box is made from a 12cm by 12cm piece of cardboard by cutting squares of side 'x' from the corners. Find 'x' for maximum volume.</p>
            <p><strong>Answer:</strong> x = 2 cm.</p>
        </div>
    </div>
`;

// UPDATED: The practice drill is now a structured array of objects.
const practiceDrillQuestions = [
    {
        section: "Section 1: Tangent Lines",
        type: 'challenge',
        question: "Find the coordinates of the point(s) on the curve g(x) = (1/3)x³ - x² - 3x where the tangent is horizontal.",
        answer: "(3, -9) and (-1, 5/3)"
    },
    {
        section: "Section 2: Cubic Functions",
        type: 'application',
        question: "For k(x) = x³ + x² - 5x + 3, find the coordinates of the turning points.",
        answer: "(1, 0) and (-5/3, 256/27)"
    },
    {
        section: "Section 3: Optimisation",
        type: 'application',
        question: "A rectangular garden against a wall needs fencing on 3 sides. With 80m of fencing, what dimensions give the maximum area?",
        answer: "20m by 40m"
    }
];

const pastPapersContent = `
    <div class="prose max-w-none">
        <h1>Calculus Past Paper Linker</h1>
        <p>Use this list to find and practice real calculus questions from previous NSC Final Exams. This proves that the skills you've just practiced are exactly what you need.</p>
        <ul class="list-disc pl-5">
            <li><strong>Nov 2023 (Paper 1):</strong> Q8 (First Principles), Q9 (Cubic Functions), Q10 (Optimisation).</li>
            <li><strong>Nov 2022 (Paper 1):</strong> Q8 (Differentiation), Q9 (Cubic & Tangents), Q10 (Optimisation).</li>
            <li><strong>Nov 2021 (Paper 1):</strong> Q7 (First Principles), Q8 (Cubic Functions), Q9 (Optimisation).</li>
        </ul>
        <p class="mt-4 text-sm text-gray-600">You can find these official papers on the Department of Basic Education's website.</p>
    </div>
`;

// This "exports" the content so other files can import it.
export const calculusPack = {
    title: "Calculus",
    cheatSheet: cheatSheetContent,
    workedExamples: workedExamplesContent,
    practiceDrill: practiceDrillQuestions, // Now an array
    pastPapers: pastPapersContent
};
