
const mallaData = {
    "Semestre 1": [
        { nombre: "Fundamentos de Administración" },
        { nombre: "Economía, Sustentabilidad y Emprendimiento" },
        { nombre: "Introducción al Análisis de Datos" },
        { nombre: "Introducción a la Matemática" },
        { nombre: "Contabilidad" },
        { nombre: "Taller de Competencias Comunicativas" },
        { nombre: "Taller de Competencias para el Aprendizaje" }
    ],
    "Semestre 2": [
        { nombre: "Administración Estratégica", prerequisitos: ["Fundamentos de Administración"] },
        { nombre: "Matemática", prerequisitos: ["Introducción a la Matemática"] },
        { nombre: "Introducción al Análisis de Datos" },
        { nombre: "Fundamentos de Microeconomía" },
        { nombre: "Contabilidad Financiera" },
        { nombre: "Cultura y Valores" },
        { nombre: "Taller de Desarrollo Personal 1" }
    ]
    // Puedes agregar más semestres manualmente siguiendo esta estructura
};

const container = document.getElementById("malla");

for (const [semestre, ramos] of Object.entries(mallaData)) {
    const box = document.createElement("div");
    box.className = "semestre";
    const title = document.createElement("h2");
    title.textContent = semestre;
    box.appendChild(title);

    ramos.forEach(r => {
        const ramoDiv = document.createElement("div");
        ramoDiv.className = "ramo";
        ramoDiv.innerHTML = `<strong>${r.nombre}</strong>`;
        if (r.prerequisitos) {
            ramoDiv.innerHTML += `<br><small>Prerrequisitos: ${r.prerequisitos.join(", ")}</small>`;
        }
        box.appendChild(ramoDiv);
    });

    container.appendChild(box);
}
