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
