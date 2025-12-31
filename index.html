// ========== МЕГА ОБНОВЛЕНИЕ: BRAINROT STEALER ULTIMATE ==========
console.log("🚀 Brainrot Stealer Ultimate загружается...");

// ========== БАЗА ДАННЫХ ИГРЫ ==========
let game = {
    energy: 100,
    maxEnergy: 100,
    cards: [],
    rating: 1000,
    gold: 0,
    level: 1,
    exp: 0,
    totalSteals: 0,
    achievements: [],
    friends: [],
    referralCode: generateReferralCode(),
    clan: null,
    inventory: {
        cases: { basic: 1, premium: 0 },
        boosters: { rating: 0, energy: 0 }
    },
    dailyStreak: 0,
    lastLogin: null,
    settings: { sound: true, notifications: true }
};

// ========== 30+ КАРТОЧЕК С РЕДКОСТЯМИ ==========
const CARD_RARITIES = {
    common: { color: "#808080", chance: 0.6, value: 10 },
    rare: { color: "#4169E1", chance: 0.25, value: 50 },
    epic: { color: "#9370DB", chance: 0.1, value: 200 },
    legendary: { color: "#FFD700", chance: 0.04, value: 1000 },
    mythic: { color: "#FF4500", chance: 0.01, value: 5000 }
};

const BRAINROT_CARDS = [
    // COMMON (12 карт)
    { id: 1, title: "SKIBIDI TOILET", desc: "Туалет с головой", cost: 10, rarity: "common", image: "https://api.dicebear.com/7.x/shapes/svg?seed=skibidi1" },
    { id: 2, title: "GYATT", desc: "Сигма ризз в Огайо", cost: 12, rarity: "common", image: "https://api.dicebear.com/7.x/shapes/svg?seed=gyatt1" },
    { id: 3, title: "FANUM TAX", desc: "Fuming забирает еду", cost: 8, rarity: "common", image: "https://api.dicebear.com/7.x/shapes/svg?seed=fanum1" },
    { id: 4, title: "OHIO SKIBIDI", desc: "Странный туалет", cost: 15, rarity: "common", image: "https://api.dicebear.com/7.x/shapes/svg?seed=ohio1" },
    { id: 5, title: "SIGMA RIZZ", desc: "Правило 1", cost: 10, rarity: "common", image: "https://api.dicebear.com/7.x/shapes/svg?seed=sigma1" },
    { id: 6, title: "KEYS TO THE BMW", desc: "Ты получил ключи", cost: 20, rarity: "common", image: "https://api.dicebear.com/7.x/shapes/svg?seed=bmw1" },
    
    // RARE (10 карт)
    { id: 7, title: "SKIBIDI TITAN", desc: "Гигантский туалет", cost: 30, rarity: "rare", image: "https://api.dicebear.com/7.x/shapes/svg?seed=titan1" },
    { id: 8, title: "ULTRA GYATT", desc: "Максимальный gyatt", cost: 25, rarity: "rare", image: "https://api.dicebear.com/7.x/shapes/svg?seed=ultra1" },
    { id: 9, title: "CAMERON", desc: "Fanum's brother", cost: 28, rarity: "rare", image: "https://api.dicebear.com/7.x/shapes/svg?seed=cameron1" },
    { id: 10, title: "OHIO FINAL BOSS", desc: "Босс Огайо", cost: 35, rarity: "rare", image: "https://api.dicebear.com/7.x/shapes/svg?seed=boss1" },
    
    // EPIC (5 карт)
    { id: 11, title: "GOLDEN TOILET", desc: "Золотой туалет", cost: 50, rarity: "epic", image: "https://api.dicebear.com/7.x/shapes/svg?seed=golden1" },
    { id: 12, title: "SIGMA GRINDSET", desc: "Менталитет", cost: 45, rarity: "epic", image: "https://api.dicebear.com/7.x/shapes/svg?seed=grindset1" },
    
    // LEGENDARY (3 карты)
    { id: 13, title: "OMEGA SKIBIDI", desc: "Легенда вселенной", cost: 80, rarity: "legendary", image: "https://api.dicebear.com/7.x/shapes/svg?seed=omega1" },
    { id: 14, title: "SUPREME GYATT", desc: "Верховный gyatt", cost: 75, rarity: "legendary", image: "https://api.dicebear.com/7.x/shapes/svg?seed=supreme1" },
    
    // MYTHIC (2 карты)
    { id: 15, title: "GOD SKIBIDI", desc: "Божественный туалет", cost: 150, rarity: "mythic", image: "https://api.dicebear.com/7.x/shapes/svg?seed=god1" }
];

// ========== АЧИВКИ ==========
const ACHIEVEMENTS = [
    { id: 1, name: "Первый шаг", desc: "Украсть первую карту", reward: 100, condition: (g) => g.totalSteals >= 1 },
    { id: 2, name: "Коллекционер", desc: "Собрать 5 карт", reward: 200, condition: (g) => g.cards.length >= 5 },
    { id: 3, name: "Богач", desc: "Заработать 1000 голды", reward: 500, condition: (g) => g.gold >= 1000 },
    { id: 4, name: "Энерджайзер", desc: "Потратить 500 энергии", reward: 300, condition: (g) => g.totalSteals * 10 >= 500 },
    { id: 5, name: "Легенда", desc: "Получить легендарную карту", reward: 1000, condition: (g) => g.cards.some(id => BRAINROT_CARDS.find(c => c.id === id)?.rarity === "legendary") }
];

// ========== СИСТЕМА УРОВНЕЙ ==========
function calculateLevel(exp) {
    return Math.floor(Math.sqrt(exp / 100)) + 1;
}

function addExp(amount) {
    game.exp += amount;
    const newLevel = calculateLevel(game.exp);
    if (newLevel > game.level) {
        game.level = newLevel;
        game.maxEnergy = 100 + (game.level * 10);
        game.energy = game.maxEnergy;
        showNotification(`🎉 Уровень ${game.level}!`, `Макс. энергия: ${game.maxEnergy}`);
    }
}

// ========== ФУНКЦИИ ГЕНЕРАЦИИ ==========
function generateReferralCode() {
    return 'BR-' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

function getRandomCard() {
    const rand = Math.random();
    let cumulative = 0;
    
    for (const [rarity, data] of Object.entries(CARD_RARITIES)) {
        cumulative += data.chance;
        if (rand <= cumulative) {
            const cardsOfRarity = BRAINROT_CARDS.filter(c => c.rarity === rarity);
            return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
        }
    }
    return BRAINROT_CARDS[0];
}

// ========== ЯДРО ИГРЫ ==========
let currentCard = getRandomCard();

function loadGame() {
    const saved = localStorage.getItem('brainrot_ultimate_v2');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            game = { ...game, ...data };
            
            // Проверка ежедневного стрика
            checkDailyStreak();
        } catch(e) {
            console.log("Новая игра");
        }
    }
    updateUI();
    updateCardDisplay();
    updateAchievementsDisplay();
}

function saveGame() {
    localStorage.setItem('brainrot_ultimate_v2', JSON.stringify(game));
}

function updateUI() {
    // Обновляем все показатели
    const elements = {
        'energy': game.energy + '/' + game.maxEnergy,
        'cards-count': game.cards.length,
        'rating': game.rating,
        'gold': game.gold,
        'level': game.level,
        'exp': game.exp + '/' + (game.level * game.level * 100),
        'referral-code': game.referralCode,
        'daily-streak': game.dailyStreak
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
    
    // Обновляем коллекцию
    updateCollection();
    
    // Сохраняем
    saveGame();
}

// ========== СИСТЕМА КРАЖИ (УЛУЧШЕННАЯ) ==========
function stealCard() {
    if (game.energy < currentCard.cost) {
        showNotification("❌ Недостаточно энергии!", "Подождите или посмотрите рекламу");
        return;
    }
    
    // Анимация
    const btn = document.getElementById('steal-btn');
    btn.style.transform = 'scale(0.9)';
    
    game.energy -= currentCard.cost;
    game.totalSteals++;
    
    // Шанс успеха в зависимости от редкости
    const baseChance = 0.7;
    const rarityModifier = {
        common: 1.0,
        rare: 0.8,
        epic: 0.6,
        legendary: 0.4,
        mythic: 0.2
    };
    
    const success = Math.random() < (baseChance * rarityModifier[currentCard.rarity]);
    
    setTimeout(() => {
        if (success) {
            const alreadyHave = game.cards.includes(currentCard.id);
            
            if (!alreadyHave) {
                game.cards.push(currentCard.id);
                game.rating += currentCard.cost * 3;
                game.gold += currentCard.cost * 2;
                addExp(currentCard.cost * 5);
                
                showNotification("🎉 Успех!", `Вы украли: ${currentCard.title}\n+${currentCard.cost * 3}⭐ +${currentCard.cost * 2}💰`);
            } else {
                game.rating += currentCard.cost;
                game.gold += currentCard.cost;
                addExp(currentCard.cost);
                
                showNotification("✅ Уже есть!", `Дубликат: ${currentCard.title}\n+${currentCard.cost}⭐ +${currentCard.cost}💰`);
            }
        } else {
            showNotification("❌ Провал!", "Карта оказалась слишком защищенной!");
        }
        
        // Новая карта
        currentCard = getRandomCard();
        updateCardDisplay();
        updateUI();
        checkAchievements();
        
        btn.style.transform = 'scale(1)';
    }, 300);
}

// ========== СИСТЕМА ДРУЗЕЙ И РЕФЕРАЛОВ ==========
function copyReferralLink() {
    const link = `https://t.me/your_bot?start=${game.referralCode}`;
    navigator.clipboard.writeText(link);
    showNotification("🔗 Ссылка скопирована!", "Отправьте другу");
}

function addFriend(code) {
    if (code === game.referralCode) {
        showNotification("❌ Ошибка", "Нельзя добавить себя!");
        return;
    }
    
    if (!game.friends.includes(code)) {
        game.friends.push(code);
        game.gold += 500;
        showNotification("👥 Друг добавлен!", "+500💰 за приглашение");
        updateUI();
    }
}

// ========== МАГАЗИН И КЕЙСЫ ==========
function openShop() {
    const shopHTML = `
        <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:1000; display:flex; align-items:center; justify-content:center; padding:20px;">
            <div style="background:linear-gradient(135deg, #1a1a2e, #16213e); padding:30px; border-radius:25px; border:3px solid #00ff88; max-width:500px; width:100%; max-height:90vh; overflow-y:auto;">
                <h2 style="color:#00ff88; text-align:center; margin-bottom:20px;">🛒 МАГАЗИН BRAINROT</h2>
                
                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:15px; margin-bottom:20px; text-align:center;">
                    <div style="font-size:24px; color:#ffd700;">💰 ${game.gold} голды</div>
                </div>
                
                <h3 style="color:#ff0080;">🎁 Кейсы</h3>
                <div style="display:grid; gap:15px; margin:20px 0;">
                    <div onclick="buyCase('basic')" style="background:linear-gradient(45deg, #4169E1, #4A90E2); padding:20px; border-radius:15px; cursor:pointer; border:2px solid #fff;">
                        <div style="font-size:20px;">📦 Обычный кейс</div>
                        <div style="color:#ffd700;">100💰</div>
                        <div style="font-size:12px; opacity:0.8;">Шанс: 70% common, 25% rare, 5% epic</div>
                    </div>
                    
                    <div onclick="buyCase('premium')" style="background:linear-gradient(45deg, #9370DB, #8A2BE2); padding:20px; border-radius:15px; cursor:pointer; border:2px solid #FFD700;">
                        <div style="font-size:20px;">💎 Премиум кейс</div>
                        <div style="color:#ffd700;">500💰</div>
                        <div style="font-size:12px; opacity:0.8;">Шанс: 50% rare, 30% epic, 15% legendary, 5% mythic</div>
                    </div>
                </div>
                
                <h3 style="color:#ff0080;">⚡ Бустеры</h3>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:20px 0;">
                    <div onclick="buyBooster('energy')" style="background:rgba(0,255,136,0.1); padding:15px; border-radius:10px; text-align:center; cursor:pointer; border:1px solid #00ff88;">
                        <div>⚡ +50 энергии</div>
                        <div style="color:#ffd700;">50💰</div>
                    </div>
                    <div onclick="buyBooster('rating')" style="background:rgba(255,215,0,0.1); padding:15px; border-radius:10px; text-align:center; cursor:pointer; border:1px solid #FFD700;">
                        <div>⭐ x2 рейтинг (1 час)</div>
                        <div style="color:#ffd700;">200💰</div>
                    </div>
                </div>
                
                <button onclick="closeModal()" style="background:#ff0080; color:white; border:none; padding:15px; width:100%; border-radius:10px; font-size:18px; cursor:pointer; margin-top:20px;">
                    Закрыть магазин
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', shopHTML);
}

function buyCase(type) {
    const prices = { basic: 100, premium: 500 };
    
    if (game.gold >= prices[type]) {
        game.gold -= prices[type];
        
        // Открытие кейса
        let card;
        if (type === 'basic') {
            const rand = Math.random();
            if (rand < 0.7) card = getRandomCardByRarity('common');
            else if (rand < 0.95) card = getRandomCardByRarity('rare');
            else card = getRandomCardByRarity('epic');
        } else {
            const rand = Math.random();
            if (rand < 0.5) card = getRandomCardByRarity('rare');
            else if (rand < 0.8) card = getRandomCardByRarity('epic');
            else if (rand < 0.95) card = getRandomCardByRarity('legendary');
            else card = getRandomCardByRarity('mythic');
        }
        
        const alreadyHave = game.cards.includes(card.id);
        if (!alreadyHave) {
            game.cards.push(card.id);
        }
        
        closeModal();
        showCaseAnimation(card, alreadyHave);
        updateUI();
    } else {
        showNotification("❌ Недостаточно голды!", "Заработайте больше");
    }
}

// ========== АНИМАЦИИ И ЭФФЕКТЫ ==========
function showCaseAnimation(card, duplicate) {
    const animationHTML = `
        <div id="case-animation" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); z-index:2000; display:flex; align-items:center; justify-content:center;">
            <div style="text-align:center; animation: pulse 1s infinite;">
                <div style="font-size:40px; margin-bottom:20px;">${duplicate ? '🔄' : '🎁'}</div>
                <div style="font-size:24px; color:#ffd700; margin-bottom:10px;">${card.title}</div>
                <div style="font-size:18px; color:${CARD_RARITIES[card.rarity].color}">${card.rarity.toUpperCase()}</div>
                <div style="margin-top:20px; font-size:16px;">${duplicate ? 'Дубликат! +200💰' : 'НОВАЯ КАРТА!'}</div>
                <button onclick="document.getElementById('case-animation').remove()" style="background:#00ff88; color:black; border:none; padding:10px 30px; border-radius:10px; margin-top:30px; cursor:pointer;">
                    Продолжить
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', animationHTML);
}

// ========== ДОСТИЖЕНИЯ ==========
function checkAchievements() {
    ACHIEVEMENTS.forEach(ach => {
        if (!game.achievements.includes(ach.id) && ach.condition(game)) {
            game.achievements.push(ach.id);
            game.gold += ach.reward;
            showNotification(`🏆 Достижение: ${ach.name}`, `+${ach.reward}💰\n${ach.desc}`);
        }
    });
}

// ========== ЕЖЕДНЕВНЫЕ НАГРАДЫ ==========
function checkDailyStreak() {
    const today = new Date().toDateString();
    const last = game.lastLogin;
    
    if (!last) {
        game.dailyStreak = 1;
    } else if (last === today) {
        // Уже получал сегодня
    } else {
        const lastDate = new Date(last);
        const diff = (new Date() - lastDate) / (1000 * 60 * 60 * 24);
        
        if (diff === 1) {
            game.dailyStreak++;
        } else {
            game.dailyStreak = 1;
        }
    }
    
    game.lastLogin = today;
}

function claimDailyReward() {
    const today = new Date().toDateString();
    if (game.lastLogin === today) {
        showNotification("❌ Уже получено", "Возвращайтесь завтра!");
        return;
    }
    
    const reward = 50 + (game.dailyStreak * 10);
    game.gold += reward;
    game.energy += 30;
    if (game.energy > game.maxEnergy) game.energy = game.maxEnergy;
    
    showNotification(`🎁 Ежедневная награда!`, `Стрик: ${game.dailyStreak} дней\n+${reward}💰 +30⚡`);
    
    checkDailyStreak();
    updateUI();
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function getRandomCardByRarity(rarity) {
    const cards = BRAINROT_CARDS.filter(c => c.rarity === rarity);
    return cards[Math.floor(Math.random() * cards.length)];
}

function showNotification(title, message) {
    // Создаем уведомление
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        border-left: 5px solid #00ff88;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    notif.innerHTML = `
        <div style="font-weight:bold; color:#00ff88;">${title}</div>
        <div style="margin-top:5px; font-size:14px;">${message}</div>
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

function closeModal() {
    const modals = document.querySelectorAll('div[style*="position:fixed"]');
    modals.forEach(modal => modal.remove());
}

// ========== ОБНОВЛЕНИЕ ОТОБРАЖЕНИЯ ==========
function updateCardDisplay() {
    const card = currentCard;
    const rarityColor = CARD_RARITIES[card.rarity].color;
    
    document.getElementById('card-title').textContent = card.title;
    document.getElementById('card-desc').textContent = card.desc;
    document.getElementById('card-cost').textContent = card.cost;
    document.getElementById('card-image').src = card.image;
    
    // Обновляем цвет рамки
    const cardElement = document.querySelector('.card');
    if (cardElement) {
        cardElement.style.borderColor = rarityColor;
    }
}

function updateCollection() {
    const grid = document.getElementById('collection');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (game.cards.length === 0) {
        grid.innerHTML = '<div style="color:#aaa; text-align:center; padding:30px;">Нет карт</div>';
        return;
    }
    
    // Группируем по редкости
    const cardsByRarity = {};
    game.cards.forEach(cardId => {
        const card = BRAINROT_CARDS.find(c => c.id === cardId);
        if (card) {
            if (!cardsByRarity[card.rarity]) cardsByRarity[card.rarity] = [];
            cardsByRarity[card.rarity].push(card);
        }
    });
    
    // Сортируем по редкости
    const rarityOrder = ['mythic', 'legendary', 'epic', 'rare', 'common'];
    
    rarityOrder.forEach(rarity => {
        if (cardsByRarity[rarity]) {
            const section = document.createElement('div');
            section.innerHTML = `<h4 style="color:${CARD_RARITIES[rarity].color}; margin:10px 0 5px 0;">${rarity.toUpperCase()} (${cardsByRarity[rarity].length})</h4>`;
            grid.appendChild(section);
            
            const cardsGrid = document.createElement('div');
            cardsGrid.style.display = 'grid';
            cardsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
            cardsGrid.style.gap = '10px';
            cardsGrid.style.marginBottom = '20px';
            
            cardsByRarity[rarity].forEach(card => {
                const cardEl = document.createElement('div');
                cardEl.className = 'card-small';
                cardEl.style.border = `2px solid ${CARD_RARITIES[rarity].color}`;
                cardEl.innerHTML = `
                    <img src="${card.image}" style="width:100%; height:80px; object-fit:cover; border-radius:8px;">
                    <div style="font-size:10px; margin-top:3px; color:${CARD_RARITIES[rarity].color}">${card.title}</div>
                `;
                cardsGrid.appendChild(cardEl);
            });
            
            grid.appendChild(cardsGrid);
        }
    });
}

function updateAchievementsDisplay() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    ACHIEVEMENTS.forEach(ach => {
        const unlocked = game.achievements.includes(ach.id);
        const achEl = document.createElement('div');
        achEl.className = 'achievement';
        achEl.style.cssText = `
            background: ${unlocked ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.05)'};
            border: 2px solid ${unlocked ? '#00ff88' : '#555'};
            border-radius: 10px;
            padding: 10px;
            text-align: center;
            opacity: ${unlocked ? '1' : '0.6'};
        `;
        
        achEl.innerHTML = `
            <div style="font-size:16px; font-weight:bold; color:${unlocked ? '#00ff88' : '#aaa'}">${ach.name}</div>
            <div style="font-size:12px; margin:5px 0;">${ach.desc}</div>
            <div style="color:#ffd700; font-size:14px;">+${ach.reward}💰</div>
            ${unlocked ? '<div style="color:#00ff88; font-size:10px;">✔ Получено</div>' : ''}
        `;
        
        grid.appendChild(achEl);
    });
}

// ========== PvP СИСТЕМА (УПРОЩЕННАЯ) ==========
function startPvP() {
    showNotification("⚔ PvP Бой", "Поиск противника...");
    
    setTimeout(() => {
        const opponentRating = game.rating + Math.floor(Math.random() * 500) - 250;
        const winChance = 0.5 + (game.rating - opponentRating) / 1000;
        
        if (Math.random() < winChance) {
            const reward = 100;
            game.rating += 50;
            game.gold += reward;
            showNotification("🎉 Победа!", `Вы победили противника с рейтингом ${opponentRating}\n+50⭐ +${reward}💰`);
        } else {
            game.rating -= 25;
            showNotification("💀 Поражение", `Противник рейтингом ${opponentRating} оказался сильнее\n-25⭐`);
        }
        updateUI();
    }, 1500);
}

// ========== ТАБЫ И НАВИГАЦИЯ ==========
function showTab(tabName) {
    // Скрываем все табы
    ['collection-tab', 'friends-tab', 'achievements-tab', 'clan-tab'].forEach(tab => {
        const el = document.getElementById(tab);
        if (el) el.style.display = 'none';
    });
    
    // Показываем выбранный таб
    const activeTab = document.getElementById(tabName + '-tab');
    if (activeTab) activeTab.style.display = 'block';
    
    // Обновляем активную кнопку
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.style.background = '';
    });
    event.target.style.background = '#00ff88';
}

// ========== ЗАГРУЗКА И ВЫГРУЗКА ==========
window.addEventListener('DOMContentLoaded', function() {
    console.log("Запуск Brainrot Stealer Ultimate...");
    
    // Назначаем обработчики
    document.getElementById('steal-btn').onclick = stealCard;
    
    // Загружаем игру
    loadGame();
    
    // Авто-восстановление энергии
    setInterval(() => {
        if (game.energy < game.maxEnergy) {
            game.energy++;
            updateUI();
        }
    }, 30000); // Каждые 30 секунд
    
    // Проверяем ежедневную награду при загрузке
    setTimeout(() => {
        if (!game.lastLogin || game.lastLogin !== new Date().toDateString()) {
            showNotification("🎁 Доступна награда", "Нажмите кнопку 'Ежедневная награда'");
        }
    }, 1000);
});

// ========== ГЛОБАЛЬНЫЙ ЭКСПОРТ ==========
window.stealCard = stealCard;
window.openShop = openShop;
window.closeModal = closeModal;
window.buyCase = buyCase;
window.claimDailyReward = claimDailyReward;
window.copyReferralLink = copyReferralLink;
window.startPvP = startPvP;
window.showTab = showTab;
