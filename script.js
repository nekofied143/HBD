async function loadCelebrants() {

    const response = await fetch("celebrants.json");
    const celebrants = await response.json();

    const today = new Date();
    const todayString =
        `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const todaysCelebrants =
        celebrants.filter(person => person.birthday === todayString);

    updateTitle(todaysCelebrants);

}

function updateTitle(celebrantsToday) {

    const title = document.getElementById("title");

    if (celebrantsToday.length === 0) {
        title.textContent = "🎂 Happy Birthday! 🎂";
        return;
    }

    const names = celebrantsToday.map(person => person.name);

    const formatted =
        names.length === 1
            ? names[0]
            : names.length === 2
                ? names.join(" & ")
                : `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;

    title.textContent = `🎉 Happy Birthday, ${formatted}! 🎉`;

}

loadCelebrants();

/* ==========================================================
   BALLOONS
========================================================== */

const colors = [
    "#ff4d6d",
    "#ffbe0b",
    "#00bbf9",
    "#8338ec",
    "#06d6a0",
    "#fb5607"
];

function createBalloon() {

    const balloon = document.createElement("div");

    balloon.className = "balloon";

    balloon.style.left = `${Math.random() * 100}vw`;

    balloon.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    balloon.style.animationDuration =
        `${8 + Math.random() * 8}s`;

    balloon.addEventListener("click", () => {

        balloon.classList.add("pop");

        setTimeout(() => {
            balloon.remove();
            createBalloon();
        }, 300);

    });

    document.body.appendChild(balloon);

}

const balloonCount =
    window.innerWidth < 600 ? 10 : 20;

for (let i = 0; i < balloonCount; i++) {
    createBalloon();
}

/* ==========================================================
   SPARKLES
========================================================== */

function createSparkles() {

    for (let i = 0; i < 120; i++) {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;

        sparkle.style.animationDelay =
            `${Math.random() * 2}s`;

        document.body.appendChild(sparkle);
    }

}

createSparkles();

/* ==========================================================
   FIREWORKS
========================================================== */

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

function launchFirework() {

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.5;

    const amount =
        window.innerWidth < 600 ? 35 : 80;

    for (let i = 0; i < amount; i++) {

        particles.push({

            x,
            y,

            dx: (Math.random() - 0.5) * 8,
            dy: (Math.random() - 0.5) * 8,

            life: 100,

            color:
                colors[Math.floor(Math.random() * colors.length)]

        });

    }

}

setInterval(launchFirework, 1200);
