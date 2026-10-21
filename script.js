
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

music.volume = 0.4;

// Start playing from 30 seconds
const startTime = 10;

async function startMusic() {
    try {
        // Wait until the browser knows the song duration
        if (music.readyState < 1) {
            await new Promise((resolve) => {
                music.addEventListener("loadedmetadata", resolve, {
                    once: true
                });
                music.load();
            });
        }

        music.currentTime = Math.min(
            startTime,
            Math.max(0, music.duration - 1)
        );

        await music.play();
    } catch (error) {
        console.log("Autoplay may be blocked:", error);
    }

    updateButton();
}

function updateButton() {
    musicToggle.textContent = music.paused
        ? "🎵 Play Music"
        : "⏸️ Pause Music";
}

musicToggle.addEventListener("click", async () => {
    if (music.paused) {
        try {
            await music.play();
        } catch (error) {
            console.log("Unable to play music:", error);
        }
    } else {
        music.pause();
    }

    updateButton();
});

music.addEventListener("play", updateButton);
music.addEventListener("pause", updateButton);

startMusic();
