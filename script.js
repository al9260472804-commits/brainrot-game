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
// Заработок энергии
function watchAdForEnergy() {
    if (confirm('Посмотреть рекламу 30 секунд за +20 энергии?')) {
        // Тут можно подключить рекламную сеть
        energy += 20;
        if (energy > 100) energy = 100;
        updateUI();
        showNotification('+20⚡ за просмотр рекламы!');
    }
}

function dailyReward() {
    const lastReward = localStorage.getItem('lastRewardDate');
    const today = new Date().toDateString();
    
    if (lastReward !== today) {
        energy += 50;
        if (energy > 100) energy = 100;
        localStorage.setItem('lastRewardDate', today);
        updateUI();
        showNotification('🎁 Ежедневная награда: +50⚡!');
    } else {
        showNotification('❌ Уже получал награду сегодня!');
    }
}

function inviteFriend() {
    const link = `https://t.me/твой_бот?start=ref_${Date.now()}`;
    prompt('Отправь эту ссылку другу:', link);
    showNotification('Когда друг зайдет по ссылке, получишь +100⚡');
}
// Система достижений
const achievements = [
    { id: 1, icon: "🎮", name: "Новичок", desc: "Украсть первую карту", condition: () => cards.length >= 1, reward: 50 },
    { id: 2, icon: "🏆", name: "Коллекционер", desc: "Собрать 5 карт", condition: () => cards.length >= 5, reward: 100 },
    { id: 3, icon: "⚡", name: "Энерджайзер", desc: "Потратить 100 энергии", condition: () => totalEnergySpent >= 100, reward: 75 },
    { id: 4, icon: "👑", name: "Чемпион", desc: "Достичь 5000 рейтинга", condition: () => rating >= 5000, reward: 200 },
    { id: 5, icon: "💰", name: "Богач", desc: "Заработать 1000 голды", condition: () => gold >= 1000, reward: 300 }
];

let unlockedAchievements = [];
let totalEnergySpent = 0;
let gold = 0;

function updateAchievements() {
    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = '';
    
    achievements.forEach(ach => {
        const isUnlocked = ach.condition();
        const div = document.createElement('div');
        div.className = `achievement ${isUnlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div style="font-size:24px">${ach.icon}</div>
            <div style="font-weight:bold">${ach.name}</div>
            <div style="font-size:12px">${ach.desc}</div>
        `;
        grid.appendChild(div);
        
        // Награда за новое достижение
        if (isUnlocked && !unlockedAchievements.includes(ach.id)) {
            unlockedAchievements.push(ach.id);
            gold += ach.reward;
            showNotification(`🏆 Достижение "${ach.name}"! +${ach.reward}💰`);
        }
    });
}

// В функции stealCard() добавь:
function stealCard() {
    // ... существующий код ...
    totalEnergySpent += currentCard.cost; // Добавить эту строку
    updateAchievements(); // Добавить эту строку
}
// Магазин
function openShop() {
    document.getElementById('shop-modal').style.display = 'block';
    document.getElementById('gold-amount').textContent = gold;
}

function closeShop() {
    document.getElementById('shop-modal').style.display = 'none';
}

function buyItem(type, price) {
    if (gold < price) {
        showNotification('❌ Недостаточно голды!');
        return;
    }
    
    gold -= price;
    
    switch(type) {
        case 'energy':
            energy += 50;
            if (energy > 100) energy = 100;
            showNotification('✅ Куплено 50⚡!');
            break;
        case 'case':
            const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
            if (!cards.includes(randomCard.id)) {
                cards.push(randomCard.id);
                showNotification(`🎁 Получена карта: ${randomCard.title}!`);
            } else {
                gold += 30; // Компенсация
                showNotification('🎁 Карта уже есть! +30💰');
            }
            break;
        case 'boost':
            // Активируем буст на 1 час
            showNotification('🔥 Буст активирован! x2 рейтинг на 1 час!');
            break;
    }
    
    updateUI();
    closeShop();
}
const API_URL = "http://localhost:8000"; // Или твой хостинг

// Отправка данных на сервер
async function saveToServer() {
    const userData = {
        user_id: 123, // Получить из Telegram
        username: gameData.username,
        energy: gameData.energy,
        cards: gameData.cards,
        rating: gameData.rating,
        gold: gold
    };
    
    try {
        const response = await fetch(`${API_URL}/save`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        console.log('Данные сохранены на сервере');
    } catch (error) {
        console.error('Ошибка сохранения:', error);
    }
}

// Загрузка лидерборда
async function loadLeaderboard() {
    try {
        const response = await fetch(`${API_URL}/leaderboard`);
        const leaderboard = await response.json();
        console.log('Лидерборд:', leaderboard);
    } catch (error) {
        console.error('Ошибка загрузки лидерборда:', error);
    }
}
