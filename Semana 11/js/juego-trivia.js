document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "¿Cuál de estos juegos es conocido por su mecánica de 'colocación de trabajadores'?",
            options: ["Catan", "Ticket to Ride", "Agricola", "Dixit"],
            answer: "Agricola"
        },
        {
            question: "¿Qué juego popular implica construir rutas de trenes a través de Norteamérica?",
            options: ["Pandemic", "Ticket to Ride", "Scythe", "Azul"],
            answer: "Ticket to Ride"
        },
        {
            question: "En 'Catan', ¿qué recurso NO se produce en la isla básica?",
            options: ["Madera", "Ladrillo", "Oro", "Trigo"],
            answer: "Oro"
        },
        {
            question: "¿Qué significa 'Eurogame' en el contexto de los juegos de mesa?",
            options: ["Juegos exclusivamente diseñados en Europa", "Juegos con mucha interacción directa y conflicto", "Juegos que enfatizan la estrategia y minimizan la suerte", "Juegos cooperativos"],
            answer: "Juegos que enfatizan la estrategia y minimizan la suerte"
        },
        {
            question: "El juego 'Wingspan' se centra en la temática de:",
            options: ["Construcción de ciudades", "Aves y ornitología", "Exploración espacial", "Fantasía medieval"],
            answer: "Aves y ornitología"
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOptionButton = null;

    const questionEl = document.getElementById('question');
    const optionsContainerEl = document.getElementById('options-container');
    const submitButtonEl = document.getElementById('submit-answer');
    const feedbackEl = document.getElementById('feedback');
    const scoreEl = document.getElementById('score');
    const nextButtonEl = document.getElementById('next-question');
    const finalMessageEl = document.getElementById('final-message');
    const triviaContainerEl = document.getElementById('trivia-container');

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionEl.textContent = currentQuestion.question;
            optionsContainerEl.innerHTML = '';
            selectedOptionButton = null;
            submitButtonEl.disabled = true;
            feedbackEl.textContent = '';
            submitButtonEl.style.display = 'inline-block';
            nextButtonEl.style.display = 'none';

            currentQuestion.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = () => {
                    if (selectedOptionButton) {
                        selectedOptionButton.classList.remove('selected');
                    }
                    button.classList.add('selected');
                    selectedOptionButton = button;
                    submitButtonEl.disabled = false;
                };
                optionsContainerEl.appendChild(button);
            });
        } else {
            showFinalScore();
        }
    }

    function handleSubmit() {
        if (!selectedOptionButton) return;

        const currentQuestion = questions[currentQuestionIndex];
        const userAnswer = selectedOptionButton.textContent;
        
        // Deshabilitar todos los botones de opción
        Array.from(optionsContainerEl.children).forEach(btn => btn.disabled = true);

        if (userAnswer === currentQuestion.answer) {
            score++;
            feedbackEl.textContent = "¡Correcto!";
            feedbackEl.style.color = 'green';
            selectedOptionButton.classList.add('correct');
        } else {
            feedbackEl.textContent = `Incorrecto. La respuesta era: ${currentQuestion.answer}`;
            feedbackEl.style.color = 'red';
            selectedOptionButton.classList.add('incorrect');
            // Marcar la correcta también
            Array.from(optionsContainerEl.children).forEach(btn => {
                if(btn.textContent === currentQuestion.answer) {
                    btn.classList.add('correct');
                }
            });
        }
        scoreEl.textContent = `Puntuación: ${score}`;
        submitButtonEl.style.display = 'none';
        nextButtonEl.style.display = 'inline-block';

        if (currentQuestionIndex === questions.length - 1) {
            nextButtonEl.textContent = "Ver Resultados Finales";
        }
    }

    function handleNextQuestion() {
        currentQuestionIndex++;
        // Habilitar botones de opción (aunque se recrean en loadQuestion)
        Array.from(optionsContainerEl.children).forEach(btn => btn.disabled = false);
        loadQuestion();
    }

    function showFinalScore() {
        triviaContainerEl.style.display = 'none';
        finalMessageEl.style.display = 'block';
        let message = `¡Trivia completada! Tu puntuación final es: ${score} de ${questions.length}.<br>`;
        if (score === questions.length) {
            message += "¡Felicidades, eres un Maestro del Tablero! 🏆 (Simulado: +20 Puntos de Fidelidad)";
        } else if (score >= questions.length / 2) {
            message += "¡Buen trabajo! Sigue aprendiendo. (Simulado: +10 Puntos de Fidelidad)";
        } else {
            message += "¡Sigue jugando y aprendiendo más sobre juegos de mesa!";
        }
        finalMessageEl.innerHTML = message;
    }
    
    if (questionEl) { // Asegurarse que estamos en la página del juego
        submitButtonEl.addEventListener('click', handleSubmit);
        nextButtonEl.addEventListener('click', handleNextQuestion);
        loadQuestion();
    }
});