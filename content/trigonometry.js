// In content/trigonometry.js

const cheatSheetContent = `
    <div class="prose max-w-none">
        <h1>Matric Maths: The Trigonometry Cheat Sheet</h1>
        <p>This guide simplifies trigonometry by focusing on core tools and strategies for exam problems.</p>
        
        <h2>Part 1: The Grade 11 Toolkit</h2>
        <p>These rules work for <strong>ANY</strong> triangle:</p>
        <ul class="list-disc pl-5">
            <li><strong>Sine Rule:</strong> Use when you have a "matching pair" (an angle and its opposite side). <code>a/sin(A) = b/sin(B)</code></li>
            <li><strong>Cosine Rule:</strong> Use with two sides and the angle between them, OR all three sides. <code>a² = b² + c² - 2bc*cos(A)</code></li>
            <li><strong>Area Rule:</strong> Use with two sides and the angle between them to find the area. <code>Area = 0.5*a*b*sin(C)</code></li>
        </ul>
        <p><strong>Core Identities:</strong> <code>tan(θ) = sin(θ)/cos(θ)</code> and <code>sin²(θ) + cos²(θ) = 1</code>.</p>

        <h2>Part 2: Grade 12 Power-Ups</h2>
        <p>Use these to expand or simplify complex expressions. Match the pattern in the question to the formula.</p>
        <ul class="list-disc pl-5">
            <li><strong>Compound Angles:</strong> e.g., <code>sin(A+B) = sin(A)cos(B) + cos(A)sin(B)</code></li>
            <li><strong>Double Angles:</strong> e.g., <code>cos(2A) = 2cos²(A) - 1</code></li>
        </ul>

        <h2>Part 3: The 3D Problem-Solving Strategy</h2>
        <ol>
            <li>Identify the two triangles and the <strong>shared side</strong> connecting them.</li>
            <li>Use the triangle with more info to find the length of the shared side.</li>
            <li>Use that shared side in the second triangle to find the final answer.</li>
        </ol>
    </div>
`;

const workedExamplesContent = `
    <div class="prose max-w-none">
        <h1>Trigonometry Worked Examples</h1>
        <p>See how the theory from the Cheat Sheet is applied to real problems.</p>
        
        <h3>1. Simplification using Double Angles</h3>
        <div class="p-4 border rounded-lg bg-gray-50">
            <p><strong>Question:</strong> Simplify <code>sin(2x) / (1 + cos(2x))</code> to a single ratio.</p>
            <p><strong>Answer:</strong> tan(x)</p>
        </div>

        <h3>2. Solving 2D Triangles</h3>
         <div class="p-4 border rounded-lg bg-gray-50">
            <p><strong>Question:</strong> In triangle ABC, AB=7, BC=9, and angle B=80°. Find the length of AC.</p>
            <p><strong>Answer:</strong> AC = 10.4 cm</p>
        </div>
    </div>
`;

const practiceDrillQuestions = [
    {
        section: "Section 1: Identities",
        question: "Prove the identity: (1 - cos²x) / (sinx * cosx) = tanx",
        answer: "LHS = (sin²x) / (sinx * cosx) = sinx / cosx = tanx = RHS"
    },
    {
        section: "Section 1: Identities",
        question: "If cos(25°) = p, express cos(50°) in terms of 'p'.",
        answer: "cos(50°) = cos(2 * 25°) = 2cos²(25°) - 1 = 2p² - 1"
    },
    {
        section: "Section 2: 2D Triangles",
        question: "In ΔXYZ, ∠X=50°, ∠Y=75°, and side z=9 cm. Find the length of side 'x'.",
        answer: "x = 7.1 cm"
    },
    {
        section: "Section 3: 3D Problems",
        question: "A vertical pole PQ is on a horizontal plane PRS. The angle of elevation from R to Q is y. ∠PSR=x, ∠PRS=z, and SR=d. Show that PQ = (d*sinx*tany) / sin(x+z).",
        answer: "First find PR using the Sine Rule in ΔPRS, then use tan(y) = PQ/PR in ΔPQR."
    }
];

const pastPapersContent = `
    <div class="prose max-w-none">
        <h1>Trigonometry Past Paper Linker</h1>
        <p>Trigonometry questions are typically found in <strong>Paper 2</strong> of the NSC exams.</p>
        <ul class="list-disc pl-5">
            <li><strong>Nov 2023 (Paper 2):</strong> Q5 (Identities & General Solution), Q6 (Trig Graphs), Q7 (3D Problems).</li>
            <li><strong>Nov 2022 (Paper 2):</strong> Q5 (Simplification), Q6 (Graphs), Q7 (3D Problems).</li>
        </ul>
    </div>
`;

export const trigonometryPack = {
    title: "Trigonometry",
    cheatSheet: cheatSheetContent,
    workedExamples: workedExamplesContent,
    practiceDrill: practiceDrillQuestions,
    pastPapers: pastPapersContent
};
