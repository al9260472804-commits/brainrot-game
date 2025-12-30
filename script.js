// Brainrot Stealer - РАБОЧАЯ ВЕРСИЯ
let energy = 100;
let cards = [];
let rating = 1000;
let gold = 0;
let unlockedAchievements = [];

const allCards = [
    { id: 1, title: "SKIBIDI TOILET", desc: "Легендарный туалет-голова", cost: 15, image: "https://i.imgur.com/xK9T4hG.png" },
    { id: 2, title: "GYATT", desc: "Sigma rizz в Ohio", cost: 10, image: "https://i.imgur.com/y7WkL9p.png" },
    { id: 3, title: "FANUM TAX", desc: "Fuming забирает еду", cost: 8, image: "https://i.imgur.com/z8M9Q2r.png" }
];

let currentCard = allCards[0];

// Достижения
const achievements = [
    { id: 1, icon: "🎮", name: "Новичок", desc: "Украсть первую карту", condition: () => cards.length >= 1, reward: 50 },
    { id: 2, icon: "🏆", name: "Коллекционер", desc: "Собрать 3 карты", condition: () => cards.length >= 3, reward: 100 },
    { id: 3, icon: "⚡", name: "Энергия", desc: "Потратить 50 энергии", condition: () => totalEnergySpent >= 50, reward: 75 }
];

let totalEnergySpent = 0;

// ========== БАЗОВЫЕ ФУНКЦИИ ==========

// Загрузка игры
function loadGame() {
    const saved = localStorage.getItem('brainrot_save');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            energy = data.energy || 100;
            cards = data.cards || [];
            rating = data.rating || 1000;
            gold = data.gold || 0;
            unlockedAchievements = data.achievements || [];
            totalEnergySpent = data.totalEnergySpent || 0;
        } catch (e) {
            console.log('Ошибка загрузки, начинаем заново');
        }
    }
    updateUI();
    updateAchievements();
}

// Сохранение игры
function saveGame() {
    const data = {
        energy,
        cards,
        rating,
        gold,
        achievements: unlockedAchievements,
        totalEnergySpent
    };
    localStorage.setItem('brainrot_save', JSON.stringify(data));
}

// Обновление интерфейса
function updateUI() {
    document.getElementById('energy').textContent = energy;
    document.getElementById('cards-count').textContent = cards.length;
    document.getElementById('rating').textContent = rating;
    document.getElementById('gold').textContent = gold;
    
    // Обновляем коллекцию
    updateCollection();
    
    // Сохраняем игру
    saveGame();
}

// Обновление коллекции
function updateCollection() {
    const grid = document.getElementById('collection');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (cards.length === 0) {
        grid.innerHTML = '<p style="color:#aaa; text-align:center; grid-column:1/4; padding:30px;">Нет карт</p>';
        return;
    }
    
    // Показываем последние 6 карт
    cards.slice(-6).reverse().forEach(cardId => {
        const card = allCards.find(c => c.id === cardId);
        if (card) {
            const div = document.createElement('div');
            div.className = 'card-small';
            div.innerHTML = `
                <img src="${card.image}" style="width:100%; height:80px; object-fit:cover; border-radius:8px;">
                <div style="font-size:12px; margin-top:5px;">${card.title}</div>
            `;
            grid.appendChild(div);
        }
    });
}

// Показать уведомление
function showNotification(text) {
    alert(text); // Простой alert вместо сложной системы
}

// Обновление карты
function updateCard() {
    document.getElementById('card-title').textContent = currentCard.title;
    document.getElementById('card-desc').textContent = currentCard.desc;
    document.getElementById('card-cost').textContent = currentCard.cost;
    document.getElementById('card-image').src = currentCard.image;
}

// ========== ГЛАВНАЯ ФУНКЦИЯ - КРАЖА КАРТЫ ==========
function stealCard() {
    console.log('Кража карты...');
    
    // Проверка энергии
    if (energy < currentCard.cost) {
        showNotification('⚡ Нет энергии!');
        return;
    }
    
    // Тратим энергию
    energy -= currentCard.cost;
    totalEnergySpent += currentCard.cost;
    
    // Эффект кнопки
    const btn = document.getElementById('steal-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
    
    // Шанс успеха 70%
    if (Math.random() < 0.7) {
        if (!cards.includes(currentCard.id)) {
            // Новая карта
            cards.push(currentCard.id);
            rating += 50;
            gold += 10; // Немного голды за новую карту
            showNotification(`🎉 УКРАЛ! ${currentCard.title} (+50⭐ +10💰)`);
        } else {
            // Карта уже есть
            rating += 10;
            gold += 5;
            showNotification(`✅ Уже есть! (+10⭐ +5💰)`);
        }
        
        // Новая карта через секунду
        setTimeout(() => {
            currentCard = allCards[Math.floor(Math.random() * allCards.length)];
            updateCard();
        }, 1000);
        
    } else {
        // Неудача
        showNotification('❌ Не удалось украсть!');
    }
    
    // Обновляем всё
    updateUI();
    updateAchievements();
}

// ========== НОВЫЕ ФУНКЦИИ ==========

// Обновление достижений
function updateAchievements() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    achievements.forEach(ach => {
        const isUnlocked = ach.condition();
        const isNew = isUnlocked && !unlockedAchievements.includes(ach.id);
        
        if (isNew) {
            unlockedAchievements.push(ach.id);
            gold += ach.reward;
            showNotification(`🏆 Достижение "${ach.name}"! +${ach.reward}💰`);
        }
        
        const div = document.createElement('div');
        div.className = 'achievement' + (isUnlocked ? ' unlocked' : '');
        div.innerHTML = `
            <div style="font-size:24px">${ach.icon}</div>
            <div style="font-weight:bold; font-size:14px">${ach.name}</div>
            <div style="font-size:10px">${ach.desc}</div>
        `;
        grid.appendChild(div);
    });
}

// Заработок энергии (простые функции)
function watchAdForEnergy() {
    if (confirm('Посмотреть рекламу 30 секунд за +20 энергии?')) {
        energy += 20;
        if (energy > 100) energy = 100;
        updateUI();
        showNotification('+20⚡ за просмотр рекламы!');
    }
}

function dailyReward() {
    const today = new Date().toDateString();
    const lastReward = localStorage.getItem('lastReward');
    
    if (lastReward !== today) {
        energy += 50;
        gold += 25;
        if (energy > 100) energy = 100;
        localStorage.setItem('lastReward', today);
        updateUI();
        showNotification('🎁 Ежедневная награда: +50⚡ +25💰!');
    } else {
        showNotification('❌ Уже получал награду сегодня!');
    }
}

// Магазин (упрощенный)
function openShop() {
    const shopHTML = `
        <div style="background:rgba(0,0,0,0.9); position:fixed; top:0; left:0; width:100%; height:100%; z-index:1000; display:flex; align-items:center; justify-content:center;">
            <div style="background:#1a1a2e; padding:30px; border-radius:20px; border:3px solid #00ff88; max-width:400px; width:90%;">
                <h2 style="color:#00ff88; text-align:center;">🛒 МАГАЗИН</h2>
                <p style="text-align:center; font-size:20px;">💰 Голда: ${gold}</p>
                
                <div style="margin:20px 0;">
                    <div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin:10px 0; cursor:pointer;" onclick="buyEnergy()">
                        <div style="display:flex; justify-content:space-between;">
                            <span>⚡ 50 энергии</span>
                            <span style="color:#ffd700;">25💰</span>
                        </div>
                    </div>
                    
                    <div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin:10px 0; cursor:pointer;" onclick="buyCard()">
                        <div style="display:flex; justify-content:space-between;">
                            <span>🎁 Случайная карта</span>
                            <span style="color:#ffd700;">100💰</span>
                        </div>
                    </div>
                </div>
                
                <button onclick="closeShop()" style="background:#ff0080; color:white; border:none; padding:15px; border-radius:10px; width:100%; font-size:18px; cursor:pointer;">
                    Закрыть
                </button>
            </div>
        </div>
    `;
    
    const shop = document.createElement('div');
    shop.innerHTML = shopHTML;
    shop.id = 'shop-modal';
    document.body.appendChild(shop);
}

function closeShop() {
    const shop = document.getElementById('shop-modal');
    if (shop) shop.remove();
}

function buyEnergy() {
    if (gold >= 25) {
        gold -= 25;
        energy += 50;
        if (energy > 100) energy = 100;
        updateUI();
        showNotification('✅ Куплено 50⚡!');
        closeShop();
    } else {
        showNotification('❌ Недостаточно голды!');
    }
}

function buyCard() {
    if (gold >= 100) {
        gold -= 100;
        const randomCard = allCards[Math.floor(Math.random() * allCards.length)];
        
        if (!cards.includes(randomCard.id)) {
            cards.push(randomCard.id);
            showNotification(`🎁 Получена карта: ${randomCard.title}!`);
        } else {
            gold += 40; // Компенсация
            showNotification('🎁 Карта уже есть! +40💰');
        }
        
        updateUI();
        closeShop();
    } else {
        showNotification('❌ Недостаточно голды!');
    }
}

// ========== ЗАПУСК ИГРЫ ==========

// Восстановление энергии
setInterval(() => {
    if (energy < 100) {
        energy++;
        updateUI();
    }
}, 60000); // +1 энергия в минуту

// Запуск при загрузке
window.onload = function() {
    console.log('Игра загружается...');
    
    // Назначаем обработчик кнопке
    const stealBtn = document.getElementById('steal-btn');
    if (stealBtn) {
        stealBtn.addEventListener('click', stealCard);
        console.log('Обработчик кнопки назначен');
    } else {
        console.error('Кнопка не найдена!');
        // Создаем кнопку если её нет
        const btn = document.createElement('button');
        btn.id = 'steal-btn';
        btn.textContent = 'УКРАСТЬ КАРТУ';
        btn.onclick = stealCard;
        document.querySelector('.card').appendChild(btn);
    }
    
    // Загружаем игру
    loadGame();
    updateCard();
    
    console.log('Игра готова!');
};

// Экспортируем для отладки
window.game = {
    stealCard,
    updateUI,
    watchAdForEnergy,
    dailyReward,
    openShop
};
