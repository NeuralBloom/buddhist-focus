class MeditationTimer {
    constructor() {
        this.duration = 0;
        this.remaining = 0;
        this.isRunning = false;
        this.timer = null;
        this.bellSound = new Audio('sounds/meditation-bell.mp3');
    }

    setDuration(minutes) {
        this.duration = minutes * 60;
        this.remaining = this.duration;
    }

    start() {
        if (!this.isRunning && this.remaining > 0) {
            this.isRunning = true;
            this.bellSound.play();
            this.timer = setInterval(() => this.tick(), 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timer);
        }
    }

    resume() {
        if (!this.isRunning && this.remaining > 0) {
            this.isRunning = true;
            this.timer = setInterval(() => this.tick(), 1000);
        }
    }

    stop() {
        this.isRunning = false;
        clearInterval(this.timer);
        this.remaining = this.duration;
        this.updateDisplay();
    }

    tick() {
        if (this.remaining > 0) {
            this.remaining--;
            this.updateDisplay();
        } else {
            this.bellSound.play();
            this.stop();
        }
    }

    updateDisplay() {
        const minutes = Math.floor(this.remaining / 60);
        const seconds = this.remaining % 60;
        const display = document.getElementById('meditation-timer');
        if (display) {
            display.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}

const meditationTimer = new MeditationTimer();

function openMeditationModal() {
    document.getElementById('meditation-modal').classList.remove('hidden');
}

function closeMeditationModal() {
    document.getElementById('meditation-modal').classList.add('hidden');
    meditationTimer.stop();
}

function startMeditation() {
    const duration = document.getElementById('meditation-duration').value;
    if (duration > 0) {
        meditationTimer.setDuration(duration);
        meditationTimer.start();
        document.getElementById('meditation-timer').classList.remove('hidden');
        document.getElementById('start-meditation').textContent = 'Pause';
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('meditation-btn').addEventListener('click', openMeditationModal);
    document.getElementById('start-meditation').addEventListener('click', startMeditation);
});
