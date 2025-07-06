// In content/analytical-geometry.js

const cheatSheetContent = `
    <div class="prose max-w-none">
        <h1>Analytical Geometry Cheat Sheet</h1>
        <p>Analytical Geometry uses algebra to solve problems about geometric shapes. The key is knowing which formula to use and when.</p>
        
        <h2>The 4 Core Tools</h2>
        <ul class="list-disc pl-5">
            <li><strong>Distance Formula:</strong> For length. <code>d = √((x₂-x₁)² + (y₂-y₁)²)</code></li>
            <li><strong>Gradient Formula:</strong> For steepness. <code>m = (y₂-y₁) / (x₂-x₁)</code></li>
            <li><strong>Midpoint Formula:</strong> For the center. <code>M = ((x₁+x₂)/2, (y₁+y₂)/2)</code></li>
            <li><strong>Equation of a Line:</strong> Needs a point and a gradient. <code>y - y₁ = m(x - x₁)</code></li>
        </ul>

        <h2>Key Properties</h2>
        <ul class="list-disc pl-5">
            <li><strong>Angle of Inclination:</strong> <code>tan(θ) = m</code>. Connects gradient to angles.</li>
            <li><strong>Parallel Lines (||):</strong> Same gradient. <code>m₁ = m₂</code></li>
            <li><strong>Perpendicular Lines (⊥):</strong> Gradients multiply to -1. <code>m₁ * m₂ = -1</code></li>
        </ul>

        <h2>The Circle</h2>
        <p>A tangent is always perpendicular to the radius at the point of contact.</p>
        <ul class="list-disc pl-5">
            <li><strong>Center (0,0):</strong> <code>x² + y² = r²</code></li>
            <li><strong>Center (a,b):</strong> <code>(x-a)² + (y-b)² = r²</code></li>
        </ul>
    </div>
`;

const workedExamplesContent = `
    <div class="prose max-w-none">
        <h1>Analytical Geometry Worked Examples</h1>
        <p>See how the core formulas are applied to solve exam-style problems.</p>
        
        <h3>1. Multi-part Question</h3>
        <div class="p-4 border rounded-lg bg-gray-50">
            <p><strong>Question:</strong> Given points A(-2, 5) and B(6, 1), find the length, midpoint, gradient of AB, and the equation of a line perpendicular to AB passing through C(3, -3).</p>
            <p><strong>Answers:</strong> Length = √80, Midpoint = (2, 3), Gradient = -1/2, Equation = y = 2x - 9</p>
        </div>

        <h3>2. Circle and Tangent</h3>
         <div class="p-4 border rounded-lg bg-gray-50">
            <p><strong>Question:</strong> For a circle (x-1)² + (y+2)² = 25, find the center, radius, and the equation of the tangent at point T(4, 2).</p>
            <p><strong>Answers:</strong> Center = (1, -2), Radius = 5, Tangent Equation = y = -3/4x + 5</p>
        </div>
    </div>
`;

const practiceDrillQuestions = [
    {
        section: "Section 1: The Core Toolkit",
        question: "Triangle ABC has vertices A(1, 4), B(-2, -2), and C(4, 1). Prove that it is an isosceles triangle.",
        answer: "Show that length AB = length BC = √45."
    },
    {
        section: "Section 2: Angles and Lines",
        question: "A line has a gradient of -3. Find its angle of inclination.",
        answer: "θ = 108.4°"
    },
    {
        section: "Section 3: Circles",
        question: "The line segment joining P(-2, 3) and Q(4, 5) is a diameter of a circle. Find the equation of the circle.",
        answer: "(x-1)² + (y-4)² = 10"
    }
];

const pastPapersContent = `
    <div class="prose max-w-none">
        <h1>Analytical Geometry Past Paper Linker</h1>
        <p>These questions are typically found in <strong>Paper 2</strong> of the NSC exams, usually as Q3 and Q4.</p>
        <ul class="list-disc pl-5">
            <li><strong>Nov 2023 (Paper 2):</strong> Q3 (Quadrilaterals), Q4 (Circles).</li>
            <li><strong>Nov 2022 (Paper 2):</strong> Q3 (Inclination & Area), Q4 (Circles & Tangents).</li>
        </ul>
    </div>
`;

export const analyticalGeometryPack = {
    title: "Analytical Geometry",
    cheatSheet: cheatSheetContent,
    workedExamples: workedExamplesContent,
    practiceDrill: practiceDrillQuestions,
    pastPapers: pastPapersContent
};
