class MeditationTimer {
    constructor() {
        this.duration = 0;
        this.remaining = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.timer = null;
        this.bellSound = new Audio('sounds/meditation-bell.mp3');
    }

    setDuration(minutes) {
        this.duration = minutes * 60;
        this.remaining = this.duration;
        this.updateDisplay();
    }

    start() {
        if (!this.isRunning && this.remaining > 0) {
            this.isRunning = true;
            this.isPaused = false;
            this.playStartBell();
            this.timer = setInterval(() => this.tick(), 1000);
            this.updateButtonStates();
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.isPaused = true;
            clearInterval(this.timer);
            this.updateButtonStates();
        }
    }

    resume() {
        if (!this.isRunning && this.remaining > 0) {
            this.isRunning = true;
            this.isPaused = false;
            this.timer = setInterval(() => this.tick(), 1000);
            this.updateButtonStates();
        }
    }

    restart() {
        this.stop();
        this.remaining = this.duration;
        this.start();
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        clearInterval(this.timer);
        this.remaining = this.duration;
        this.updateDisplay();
        this.updateButtonStates();
    }

    playStartBell() {
        setTimeout(() => {
            this.bellSound.play();
        }, 500);
    }

    playEndBell() {
        this.bellSound.play();
    }

    tick() {
        if (this.remaining > 0) {
            this.remaining--;
            this.updateDisplay();
        } else {
            this.playEndBell();
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

    updateButtonStates() {
        const startButton = document.getElementById('start-meditation');
        const pauseButton = document.getElementById('pause-meditation');
        const restartButton = document.getElementById('restart-meditation');
        
        if (this.isRunning) {
            startButton.classList.add('hidden');
            pauseButton.classList.remove('hidden');
        } else {
            startButton.classList.remove('hidden');
            pauseButton.classList.add('hidden');
        }
        
        if (this.isPaused) {
            startButton.textContent = 'Resume';
            restartButton.classList.remove('hidden');
        } else {
            startButton.textContent = 'Start';
            if (!this.isRunning) {
                restartButton.classList.add('hidden');
            }
        }
    }
}

const meditationTimer = new MeditationTimer();

function openMeditationModal() {
    document.getElementById('meditation-modal').classList.remove('hidden');
    document.getElementById('meditation-timer').classList.remove('hidden');
    meditationTimer.setDuration(document.getElementById('meditation-duration').value);
}

function closeMeditationModal() {
    document.getElementById('meditation-modal').classList.add('hidden');
    meditationTimer.stop();
}

function handleStartPause() {
    if (!meditationTimer.isRunning && !meditationTimer.isPaused) {
        const duration = document.getElementById('meditation-duration').value;
        if (duration > 0) {
            meditationTimer.setDuration(duration);
            meditationTimer.start();
        }
    } else if (meditationTimer.isPaused) {
        meditationTimer.resume();
    }
}

function handlePause() {
    meditationTimer.pause();
}

function handleRestart() {
    meditationTimer.restart();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('meditation-btn').addEventListener('click', openMeditationModal);
    document.getElementById('start-meditation').addEventListener('click', handleStartPause);
    document.getElementById('pause-meditation').addEventListener('click', handlePause);
    document.getElementById('restart-meditation').addEventListener('click', handleRestart);
});
