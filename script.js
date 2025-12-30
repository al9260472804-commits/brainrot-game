// Игра Brainrot Stealer
let energy = 100;
let cards = [];
let rating = 1000;

const allCards = [
    { id: 1, title: "SKIBIDI TOILET", desc: "Легендарный туалет-голова", cost: 15, image: "https://i.imgur.com/xK9T4hG.png" },
    { id: 2, title: "GYATT", desc: "Sigma rizz в Ohio", cost: 10, image: "https://i.imgur.com/y7WkL9p.png" },
    { id: 3, title: "FANUM TAX", desc: "Fuming забирает еду", cost: 8, image: "https://i.imgur.com/z8M9Q2r.png" }
];

let currentCard = allCards[0];

// Загрузка сохранения
function loadGame() {
    const saved = localStorage.getItem('brainrot');
    if (saved) {
        const data = JSON.parse(saved);
        energy = data.energy || 100;
        cards = data.cards || [];
        rating = data.rating || 1000;
    }
    updateUI();
}

// Сохранение игры
function saveGame() {
    const data = { energy, cards, rating };
    localStorage.setItem('brainrot', JSON.stringify(data));
}

// Обновление интерфейса
function updateUI() {
    document.getElementById('energy').textContent = energy;
    document.getElementById('cards').textContent = cards.length;
    document.getElementById('rating').textContent = rating;
    
    // Инвентарь
    const inventory = document.getElementById('inventory');
    inventory.innerHTML = '';
    
    if (cards.length === 0) {
        inventory.innerHTML = '<p style="color:#aaa; grid-column:1/4">Нет карт</p>';
    } else {
        cards.slice(-6).reverse().forEach(cardId => {
            const card = allCards.find(c => c.id === cardId);
            if (card) {
                const div = document.createElement('div');
                div.className = 'card-small';
                div.innerHTML = `<img src="${card.image}"><div>${card.title}</div>`;
                inventory.appendChild(div);
            }
        });
    }
    
    saveGame();
}

// Кража карты
function stealCard() {
    if (energy < currentCard.cost) {
        alert('⚡ Нет энергии!');
        return;
    }
    
    energy -= currentCard.cost;
    
    // Эффект кнопки
    const btn = document.getElementById('steal-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
    
    // Шанс 70%
    if (Math.random() < 0.7) {
        if (!cards.includes(currentCard.id)) {
            cards.push(currentCard.id);
            rating += 50;
            alert('🎉 УКРАЛ! ' + currentCard.title + ' (+50⭐)');
        } else {
            rating += 10;
            alert('✅ Уже есть! (+10⭐)');
        }
        
        // Новая карта
        currentCard = allCards[Math.floor(Math.random() * allCards.length)];
        updateCard();
        
    } else {
        alert('❌ Не удалось!');
    }
    
    updateUI();
}

// Обновление карты
function updateCard() {
    document.getElementById('card-title').textContent = currentCard.title;
    document.getElementById('card-desc').textContent = currentCard.desc;
    document.getElementById('cost').textContent = currentCard.cost;
    document.getElementById('card-image').src = currentCard.image;
}

// Восстановление энергии
setInterval(() => {
    if (energy < 100) {
        energy++;
        updateUI();
    }
}, 60000);

// Запуск игры
window.onload = function() {
    loadGame();
    updateCard();
};
const allCards = [
    // Старые карточки...
    
    // Новые карточки:
    {
        id: 6,
        title: "RIZZLER",
        desc: "Ultimate rizz god",
        cost: 20,
        image: "https://i.imgur.com/ТВОЙ_КОД1.png"
    },
    {
        id: 7,
        title: "SIGMA GRINDSET",
        desc: "Wake up at 4AM",
        cost: 18,
        image: "https://i.imgur.com/ТВОЙ_КОД2.png"
    },
    {
        id: 8,
        title: "WHAT THE DOG DOIN",
        desc: "Собака делает что-то странное",
        cost: 12,
        image: "https://i.imgur.com/ТВОЙ_КОД3.png"
    }
];
