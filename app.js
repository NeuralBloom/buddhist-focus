// app.js
let currentTeachings = null;
let currentCategory = 'all';

async function loadTeachings() {
    try {
        const response = await fetch('data/teachings.json');
        currentTeachings = await response.json();
        updateCategoryList();
        updateDailyTeaching();
    } catch (error) {
        console.error('Error loading teachings:', error);
        document.getElementById('daily-teaching').textContent = 'Error loading teachings. Please try again later.';
    }
}

function updateCategoryList() {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '<button class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded" onclick="selectCategory(\'all\')">All Teachings</button>';
    
    for (const category in currentTeachings.categories) {
        const displayName = category.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        categoryList.innerHTML += `
            <button class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded" 
                    onclick="selectCategory('${category}')">
                ${displayName}
            </button>`;
    }
}

function selectCategory(category) {
    currentCategory = category;
    updateDailyTeaching();
    closeModal();
}

function getRandomTeaching() {
    if (currentCategory === 'all') {
        // Collect all teachings from main array and all categories
        let allTeachings = [...currentTeachings.teachings];
        
        // Add teachings from each category
        for (const category in currentTeachings.categories) {
            allTeachings = allTeachings.concat(currentTeachings.categories[category]);
        }
        
        // Return a random teaching from the combined array
        return allTeachings[Math.floor(Math.random() * allTeachings.length)];
    } else {
        // If a specific category is selected, return from that category
        const teachings = currentTeachings.categories[currentCategory];
        return teachings[Math.floor(Math.random() * teachings.length)];
    }
}

function updateDailyTeaching() {
    const teaching = getRandomTeaching();
    const teachingDiv = document.getElementById('daily-teaching');
    const sourceDiv = document.getElementById('teaching-source');
    const practiceDiv = document.getElementById('daily-practice');
    const categoryTag = document.getElementById('category-tag');

    // Update quote and source
    teachingDiv.textContent = teaching.quote;
    sourceDiv.textContent = `- ${teaching.source}`;
    
    // Handle different types of practice content
    if (typeof teaching.practice === 'string') {
        practiceDiv.textContent = teaching.practice;
    } else if (teaching.practice && teaching.method) {
        let practiceHtml = `${teaching.practice}<br><br>`;
        
        // Handle different method formats
        if (Array.isArray(teaching.method)) {
            practiceHtml += teaching.method.join('<br>');
        } else {
            for (const [key, value] of Object.entries(teaching.method)) {
                practiceHtml += `<strong>${key}:</strong> ${value}<br>`;
            }
        }
        
        practiceDiv.innerHTML = practiceHtml;
    }

    // Handle additional teaching content
    let additionalContent = '';
    
    if (teaching.explanation) {
        additionalContent += `<div class="mt-4 text-gray-600"><strong>Explanation:</strong> ${teaching.explanation}</div>`;
    }
    
    if (teaching.tips && Array.isArray(teaching.tips)) {
        additionalContent += `
            <div class="mt-4">
                <strong>Tips:</strong>
                <ul class="list-disc list-inside ml-4 mt-2">
                    ${teaching.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>`;
    }
    
    if (teaching.instructions && Array.isArray(teaching.instructions)) {
        additionalContent += `
            <div class="mt-4">
                <strong>Instructions:</strong>
                <ol class="list-decimal list-inside ml-4 mt-2">
                    ${teaching.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </div>`;
    }

    // Add additional content if it exists
    if (additionalContent) {
        practiceDiv.innerHTML += additionalContent;
    }
    
    // Set category tag
    if (currentCategory === 'all') {
        // Try to detect which category this teaching came from
        let foundCategory = 'General';
        for (const category in currentTeachings.categories) {
            if (currentTeachings.categories[category].some(t => t.quote === teaching.quote)) {
                foundCategory = category.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                break;
            }
        }
        categoryTag.textContent = foundCategory;
    } else {
        categoryTag.textContent = currentCategory.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    // Add fade-in animation
    teachingDiv.classList.add('fade-in');
    setTimeout(() => teachingDiv.classList.remove('fade-in'), 500);
}

function openModal() {
    document.getElementById('category-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('category-modal').classList.add('hidden');
}

function saveReflection() {
    const reflection = document.getElementById('reflection').value;
    if (reflection) {
        const date = new Date().toLocaleDateString();
        const reflections = JSON.parse(localStorage.getItem('reflections') || '{}');
        reflections[date] = reflection;
        localStorage.setItem('reflections', JSON.stringify(reflections));
        document.getElementById('reflection').value = '';
        
        // Show save confirmation
        const button = document.querySelector('button:contains("Save Reflection")');
        const originalText = button.textContent;
        button.textContent = 'Saved!';
        button.classList.add('bg-green-700');
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-700');
        }, 2000);
    }
}

// Error handling function
function handleError(error, message = 'An error occurred. Please try again.') {
    console.error(error);
    // You could add more sophisticated error handling here
    alert(message);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize event listeners
        document.getElementById('category-btn').addEventListener('click', openModal);
        document.getElementById('random-btn').addEventListener('click', updateDailyTeaching);
        
        // Load initial teachings
        loadTeachings();
    } catch (error) {
        handleError(error, 'Error initializing application. Please refresh the page.');
    }
});

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getRandomTeaching,
        updateDailyTeaching,
        selectCategory,
        loadTeachings
    };
}
