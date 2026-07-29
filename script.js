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

/* ==========================================================
   RANDOM MESSAGE HELPER
========================================================== */

let previousMessage = "";

function getRandomMessage() {

    let message;

    do {

        message = birthdayMessages[
            Math.floor(Math.random() * birthdayMessages.length)
        ];

    } while (
        birthdayMessages.length > 1 &&
        message === previousMessage
    );

    previousMessage = message;

    return message;

}

/* ==========================================================
   LOAD TODAY'S CELEBRANTS
========================================================== */

let todaysCelebrants = [];

async function loadCelebrants() {

    try {

        const response = await fetch("celebrants.json");

        if (!response.ok) {
            throw new Error("Unable to load celebrants.json");
        }

        const celebrants = await response.json();

        const today = new Date();

        const todayString =
            `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        todaysCelebrants =
            celebrants.filter(person => person.birthday === todayString);

        updateTitle(todaysCelebrants);

    } catch (error) {

        console.error(error);

        document.getElementById("title").textContent =
            "🎂 Happy Birthday! 🎂";

        document.getElementById("birthday-message").textContent =
            "Unable to load today's celebrants.";

    }

}

/* ==========================================================
   UPDATE TITLE & FIRST MESSAGE
========================================================== */

function updateTitle(celebrantsToday) {

    const title = document.getElementById("title");
    const message = document.getElementById("birthday-message");

    if (celebrantsToday.length === 0) {

        title.textContent = "🎂 Happy Birthday! 🎂";

        message.textContent =
            "Wishing everyone celebrating today a wonderful birthday filled with love, happiness, and blessings.";

        return;

    }

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

    title.textContent =
        `🎉 Happy Birthday, ${formattedNames}! 🎉`;

    message.textContent = getRandomMessage();

}

/* ==========================================================
   INITIAL LOAD
========================================================== */

loadCelebrants();

/* ==========================================================
   CHANGE MESSAGE EVERY 10 SECONDS
========================================================== */

const birthdayMessage = document.getElementById("birthday-message");

setInterval(() => {

    if (!todaysCelebrants.length) return;

    birthdayMessage.style.opacity = 0;

    setTimeout(() => {

        birthdayMessage.textContent = getRandomMessage();
        birthdayMessage.style.opacity = 1;

    }, 800);

}, 10000);

/* ==========================================================
   COLORS
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

function animate() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {

        p.x += p.dx;
        p.y += p.dy;

        p.dy += 0.05;
        p.life--;

        ctx.globalAlpha = p.life / 100;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

    });

    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);

}

animate();

/* ==========================================================
   ADD CELEBRANT MODAL
========================================================== */

const addCelebrantBtn = document.getElementById("addCelebrantBtn");
const celebrantModal = document.getElementById("celebrantModal");
const closeModal = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelBtn");
const celebrantForm = document.getElementById("celebrantForm");

// Open modal
addCelebrantBtn.addEventListener("click", () => {

    celebrantModal.classList.add("show");

    document.getElementById("nickname").focus();

});

// Close modal
function hideModal() {

    celebrantModal.classList.remove("show");

    celebrantForm.reset();

}

// X button
closeModal.addEventListener("click", hideModal);

// Cancel button
cancelBtn.addEventListener("click", hideModal);

// Click outside modal
celebrantModal.addEventListener("click", (event) => {

    if (event.target === celebrantModal) {
        hideModal();
    }

});

// ESC key
document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        celebrantModal.classList.contains("show")
    ) {

        hideModal();

    }

});

/* ==========================================================
   SAVE CELEBRANT
========================================================== */

celebrantForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nickname =
        document.getElementById("nickname").value.trim();

    const birthday =
        document.getElementById("birthday").value.trim();

    if (!nickname || !birthday) {

        alert("Please complete all fields.");
        return;

    }

    try {

        // Create form data
        const formData = new URLSearchParams();

        formData.append("name", nickname);
        formData.append("birthday", birthday);

        // Send to Google Apps Script
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbwWtmu9j_umIJG8CYvfgdofzTXSvSlOymlFjD2hf6PoRgBih6Jzn_JUYOSksNe_8QnH/exec",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        if (result.success) {

            alert("Celebrant added successfully!");

            hideModal();

            // Reload the celebrants
            loadCelebrants();

        } else {

            alert(result.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to save celebrant.");

    }

});
