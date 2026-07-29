let todaysCelebrants = [];

async function loadCelebrants() {

    const response = await fetch("celebrants.json");
    const celebrants = await response.json();

    const today = new Date();

    const todayString =
        `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    todaysCelebrants =
        celebrants.filter(person => person.birthday === todayString);

    updateTitle(todaysCelebrants);

}

// Change the greeting every 10 seconds
setInterval(() => {

    if (todaysCelebrants.length > 0) {
        updateTitle(todaysCelebrants);
    }

}, 10000);


/* ==========================================================
   RANDOM HEARTFELT MESSAGES
========================================================== */

const birthdayMessages = [
    "May your special day be filled with love, laughter, and unforgettable memories. Happy Birthday!",
    "Wishing you endless happiness, good health, and countless blessings on your birthday and always.",
    "May this new chapter of your life bring exciting opportunities, success, and beautiful moments.",
    "Another wonderful year begins today. May all your dreams and aspirations come true.",
    "May every candle on your cake bring a new reason to smile and celebrate life.",
    "Here's to another year of laughter, love, and cherished memories. Happy Birthday!",
    "May your birthday be as wonderful, kind, and inspiring as you are.",
    "Wishing you peace, joy, prosperity, and all the happiness your heart can hold.",
    "May today remind you how loved and appreciated you are by everyone around you.",
    "Celebrate today knowing that brighter days and greater blessings are ahead. Happy Birthday!",
    "May your journey ahead be filled with exciting adventures, genuine friendships, and lasting happiness.",
    "Sending you warm wishes for a birthday filled with love, hope, and endless smiles.",
    "May every moment of your special day bring happiness that lasts throughout the year.",
    "You deserve all the joy and success life has to offer. Have an amazing birthday!",
    "May God's grace continue to guide, protect, and bless you every day of your life.",
    "Your kindness and positivity make the world brighter. Wishing you a truly wonderful birthday!",
    "May your heart be filled with gratitude, your home with laughter, and your life with blessings.",
    "Every birthday is a fresh beginning. May this year be your happiest and most successful yet.",
    "May today be the start of another year filled with love, peace, and unforgettable memories.",
    "Happy Birthday! May your life continue to overflow with happiness, success, and abundant blessings."
];


function updateTitle(celebrantsToday) {

    const title = document.getElementById("title");
    const message = document.getElementById("birthday-message");

    if (celebrantsToday.length === 0) {

        title.textContent = "🎂 Happy Birthday! 🎂";

        message.textContent =
            "Wishing everyone celebrating today a wonderful birthday filled with love, happiness, and blessings.";

        return;
    }

    // Format celebrant names
    const names = celebrantsToday.map(person => person.name);

    let formattedNames;

    if (names.length === 1) {

        formattedNames = names[0];

    } else if (names.length === 2) {

        formattedNames = names.join(" & ");

    } else {

        formattedNames =
            names.slice(0, -1).join(", ") +
            " & " +
            names[names.length - 1];

    }

    title.textContent = `🎉 Happy Birthday, ${formattedNames}! 🎉`;

    // Pick ONE random heartfelt message
    const randomMessage =
        birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];

    message.textContent = randomMessage;

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
