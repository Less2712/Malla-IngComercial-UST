
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
        { nombre: "Fundamentos de Microeconomía" },
        { nombre: "Contabilidad Financiera" },
        { nombre: "Cultura y Valores" },
        { nombre: "Taller de Desarrollo Personal 1" }
    ],
    "Semestre 3": [
        { nombre: "Estrategia Competitiva", prerequisitos: ["Administración Estratégica"] },
        { nombre: "Fundamentos de Marketing", prerequisitos: ["Administración Estratégica"] },
        { nombre: "Cálculo 1", prerequisitos: ["Matemática"] },
        { nombre: "Fundamentos de Macroeconomía" },
        { nombre: "Inglés Básico 1" },
        { nombre: "Persona y Sentido" },
        { nombre: "Taller de Desarrollo Personal 2" }
    ],
    "Semestre 4": [
        { nombre: "Derecho Comercial y Laboral" },
        { nombre: "Innovación en Modelos de Negocios", prerequisitos: ["Economía, Sustentabilidad y Emprendimiento"] },
        { nombre: "Estadística 1", prerequisitos: ["Matemática"] },
        { nombre: "Microeconomía", prerequisitos: ["Fundamentos de Microeconomía"] },
        { nombre: "Costo para la Toma de Decisiones", prerequisitos: ["Contabilidad Financiera"] },
        { nombre: "Inglés Básico 2", prerequisitos: ["Inglés Básico 1"] }
    ],
    "Semestre 5": [
        { nombre: "Gestión de Personas", prerequisitos: ["Derecho Comercial y Laboral", "Administración Estratégica"] },
        { nombre: "Gestión de la Innovación", prerequisitos: ["Innovación en Modelos de Negocios"] },
        { nombre: "Métodos Cuantitativos para la Gestión", prerequisitos: ["Cálculo 1", "Fundamentos de Microeconomía"] },
        { nombre: "Macroeconomía", prerequisitos: ["Fundamentos de Macroeconomía"] },
        { nombre: "Administración Financiera", prerequisitos: ["Costo para la Toma de Decisiones"] },
        { nombre: "Inglés Intermedio 1", prerequisitos: ["Inglés Básico 2"] }
    ],
    "Semestre 6": [
        { nombre: "Comportamiento y Desarrollo Organizacional", prerequisitos: ["Gestión de Personas"] },
        { nombre: "Investigación de Mercado", prerequisitos: ["Fundamentos de Marketing", "Estadística 1"] },
        { nombre: "Métodos Avanzados en Estadística", prerequisitos: ["Métodos Cuantitativos para la Gestión", "Estadística 1"] },
        { nombre: "Comercio Internacional", prerequisitos: ["Macroeconomía"] },
        { nombre: "Mercado de Capitales", prerequisitos: ["Estadística 1"] },
        { nombre: "Inglés Intermedio 2", prerequisitos: ["Inglés Intermedio 1"] }
    ],
    "Semestre 7": [
        { nombre: "Marketing Estratégico", prerequisitos: ["Investigación de Mercado"] },
        { nombre: "Econometría", prerequisitos: ["Métodos Cuantitativos para la Gestión", "Métodos Avanzados en Estadística"] },
        { nombre: "Gestión de Operaciones", prerequisitos: ["Métodos Cuantitativos para la Gestión"] },
        { nombre: "Electivo 1" },
        { nombre: "Finanzas Corporativas", prerequisitos: ["Mercado de Capitales"] },
        { nombre: "Inglés Avanzado 1", prerequisitos: ["Inglés Intermedio 2"] }
    ],
    "Semestre 8": [
        { nombre: "Gobernanza y Control Estratégico", prerequisitos: ["Estrategia Competitiva"] },
        { nombre: "Consultoría Aplicada a Organizaciones", prerequisitos: ["Gestión de la Innovación"] },
        { nombre: "Análisis de Datos", prerequisitos: ["Introducción al Análisis de Datos", "Estadística 1"] },
        { nombre: "Electivo 2" },
        { nombre: "Formulación y Evaluación de Proyectos", prerequisitos: ["Finanzas Corporativas"] },
        { nombre: "Inglés Avanzado 2", prerequisitos: ["Inglés Avanzado 1"] }
    ],
    "Semestre 9": [
        { nombre: "Ética y Responsabilidad Social", prerequisitos: ["Gobernanza y Control Estratégico"] },
        { nombre: "Políticas Públicas, Innovación y Emprendimiento", prerequisitos: ["Gestión de la Innovación", "Macroeconomía"] },
        { nombre: "Simulación de Negocio", prerequisitos: ["Análisis de Datos"] },
        { nombre: "Práctica Profesional" },
        { nombre: "Electivo 3" }
    ],
    "Semestre 10": [
        { nombre: "Seminario de Habilidades para la Gestión", prerequisitos: ["Gobernanza y Control Estratégico"] },
        { nombre: "Plan de Negocios", prerequisitos: ["Gobernanza y Control Estratégico", "Formulación y Evaluación de Proyectos"] },
        { nombre: "Electivo 4" }
    ]
};

const aprobados = new Set();

function crearMalla() {
    const container = document.getElementById("malla");
    container.innerHTML = "";

    const ramosIndex = {};
    const prerreqMap = {};

    for (const [semestre, ramos] of Object.entries(mallaData)) {
        const box = document.createElement("div");
        box.className = "semestre";
        const title = document.createElement("h2");
        title.textContent = semestre;
        box.appendChild(title);

        ramos.forEach(r => {
            const ramoDiv = document.createElement("div");
            ramoDiv.className = "ramo";
            ramoDiv.textContent = r.nombre;
            ramoDiv.dataset.nombre = r.nombre;

            if (r.prerequisitos) {
                ramoDiv.classList.add("locked");
                r.prerequisitos.forEach(p => {
                    if (!prerreqMap[p]) prerreqMap[p] = [];
                    prerreqMap[p].push(r.nombre);
                });
            }

            ramoDiv.addEventListener("click", () => {
                if (ramoDiv.classList.contains("locked")) return;

                ramoDiv.classList.toggle("approved");
                if (aprobados.has(r.nombre)) {
                    aprobados.delete(r.nombre);
                } else {
                    aprobados.add(r.nombre);
                }
                actualizarEstado();
            });

            ramosIndex[r.nombre] = ramoDiv;
            box.appendChild(ramoDiv);
        });

        container.appendChild(box);
    }

    function actualizarEstado() {
        for (const [semestre, ramos] of Object.entries(mallaData)) {
            ramos.forEach(r => {
                const div = ramosIndex[r.nombre];
                if (!r.prerequisitos) return;

                const desbloqueado = r.prerequisitos.every(p => aprobados.has(p));
                div.classList.toggle("locked", !desbloqueado);
            });
        }
    }

    actualizarEstado();
}

window.onload = crearMalla;

