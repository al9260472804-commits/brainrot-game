// ========== BRAINROT STEALER - ЭРГОНОМИЧНАЯ ВЕРСИЯ ==========
console.log("🧠 Brainrot Stealer запускается...");

// ========== ИНИЦИАЛИЗАЦИЯ ==========
let game = {
    energy: 100,
    maxEnergy: 100,
    cards: [],
    rating: 1000,
    gold: 500,
    level: 1,
    exp: 0,
    totalSteals: 0,
    successfulSteals: 0,
    achievements: [1],
    friends: [],
    dailyStreak: 1,
    lastLogin: null,
    inventory: {
        basicCases: 0,
        premiumCases: 0
    }
};

// ========== КАРТОЧКИ С ИЗОБРАЖЕНИЯМИ ==========
const BRAINROT_CARDS = [
    {
        id: 1,
        title: "SKIBIDI TOILET",
        desc: "Туалет-голова из вселенной Skibidi",
        cost: 15,
        rarity: "legendary",
        image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        title: "GYATT",
        desc: "Sigma ризз в Огайо",
        cost: 12,
        rarity: "epic",
        image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        title: "FANUM TAX",
        desc: "Fuming забирает еду",
        cost: 10,
        rarity: "rare",
        image: "https://images.unsplash.com/photo-1611605698018-6c5a58c63d1a?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        title: "SIGMA MALE",
        desc: "Правило №1: Будь сигмой",
        cost: 8,
        rarity: "rare",
        image: "https://images.unsplash.com/photo-1611605698018-6c5a58c63d1a?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        title: "OHIO FINAL BOSS",
        desc: "Последний босс Огайо",
        cost: 20,
        rarity: "legendary",
        image: "https://images.unsplash.com/photo-1611605698018-6c5a58c63d1a?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        title: "RIZZLER",
        desc: "Мастер ризза",
        cost: 10,
        rarity: "common",
        image: "https://images.unsplash.com/photo-1611605698018-6c5a58c63d1a?w=400&h=300&fit=crop"
    }
];

// ========== ДОСТИЖЕНИЯ ==========
const ACHIEVEMENTS = [
    {
        id: 1,
        name: "Первая кража",
        desc: "Украсть свою первую карту",
        icon: "🎯",
        reward: 100,
        unlocked: false
    },
    {
        id: 2,
        name: "Коллекционер",
        desc: "Собрать 3 разные карты",
        icon: "📚",
        reward: 200,
        unlocked: false
    },
    {
        id: 3,
        name: "Богач",
        desc: "Накопить 1000 голды",
        icon: "💰",
        reward: 300,
        unlocked: false
    },
    {
        id: 4,
        name: "Энерджайзер",
        desc: "Потратить 500 энергии",
        icon: "⚡",
        reward: 150,
        unlocked: false
    },
    {
        id: 5,
        name: "Ветеран",
        desc: "Совершить 50 краж",
        icon: "🎖️",
        reward: 500,
        unlocked: false
    }
];

let currentCard = BRAINROT_CARDS[0];

// ========== ОСНОВНЫЕ ФУНКЦИИ ==========
function loadGame() {
    const saved = localStorage.getItem('brainrot_v4');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            game = { ...game, ...data };
        } catch (e) {
            console.log("Начинаем новую игру");
        }
    }
    
    // Проверяем ежедневную награду
    checkDailyReward();
    
    // Обновляем интерфейс
    updateUI();
    updateCurrentCard();
    updateCollectionGrid();
    updateAchievementsGrid();
}

function saveGame() {
    localStorage.setItem('brainrot_v4', JSON.stringify(game));
}

function updateUI() {
    // Обновляем статистику
    document.getElementById('energy').textContent = `${game.energy}/${game.maxEnergy}`;
    document.getElementById('cards-count').textContent = game.cards.length;
    document.getElementById('rating').textContent = game.rating;
    document.getElementById('gold').textContent = game.gold;
    
    // Обновляем детальную статистику
    document.getElementById('unique-cards').textContent = new Set(game.cards).size;
    document.getElementById('total-steals').textContent = game.totalSteals;
    document.getElementById('player-level').textContent = game.level;
    document.getElementById('achievements-count').textContent = game.achievements.length;
    
    // Сохраняем игру
    saveGame();
}

function updateCurrentCard() {
    // Выбираем случайную карту
    currentCard = BRAINROT_CARDS[Math.floor(Math.random() * BRAINROT_CARDS.length)];
    
    // Обновляем отображение
    document.getElementById('card-title').textContent = currentCard.title;
    document.getElementById('card-desc').textContent = currentCard.desc;
    document.getElementById('card-cost').textContent = currentCard.cost;
    document.getElementById('card-image').src = currentCard.image;
    document.getElementById('card-rarity').textContent = 
        currentCard.rarity === 'common' ? 'Обычная' :
        currentCard.rarity === 'rare' ? 'Редкая' :
        currentCard.rarity === 'epic' ? 'Эпическая' :
        currentCard.rarity === 'legendary' ? 'Легендарная' : 'Мифическая';
    
    // Обновляем класс редкости
    const rarityClass = `rarity-${currentCard.rarity}`;
    document.getElementById('card-rarity').className = `card-rarity ${rarityClass}`;
}

function updateCollectionGrid() {
    const grid = document.getElementById('collection-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Берем последние 6 карт или все, если меньше
    const cardsToShow = game.cards.slice(-6);
    
    if (cardsToShow.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                <i class="fas fa-layer-group" style="font-size: 32px; margin-bottom: 12px; opacity: 0.5;"></i>
                <div>Коллекция пуста</div>
                <div style="font-size: 14px; margin-top: 8px;">Украдите первую карту!</div>
            </div>
        `;
        return;
    }
    
    // Показываем карты
    cardsToShow.forEach(cardId => {
        const card = BRAINROT_CARDS.find(c => c.id === cardId);
        if (card) {
            const cardElement = document.createElement('div');
            cardElement.className = 'collection-card';
            cardElement.innerHTML = `
                <img src="${card.image}" class="collection-card-img" alt="${card.title}">
                <div class="collection-card-info">
                    <div class="collection-card-title">${card.title}</div>
                </div>
            `;
            grid.appendChild(cardElement);
        }
    });
}

function updateAchievementsGrid() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    ACHIEVEMENTS.forEach(achievement => {
        const isUnlocked = game.achievements.includes(achievement.id);
        
        const achievementElement = document.createElement('div');
        achievementElement.style.cssText = `
            background: ${isUnlocked ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface)'};
            border: 1px solid ${isUnlocked ? '#10B981' : 'var(--border-light)'};
            border-radius: var(--radius-md);
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            opacity: ${isUnlocked ? '1' : '0.7'};
        `;
        
        achievementElement.innerHTML = `
            <div style="font-size: 24px;">${achievement.icon}</div>
            <div style="flex: 1;">
                <div style="font-weight: 600; color: var(--text-primary);">${achievement.name}</div>
                <div style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${achievement.desc}</div>
                <div style="display: flex; justify-content: space-between; margin-top: 8px;">
                    <span style="font-size: 12px; color: ${isUnlocked ? '#10B981' : 'var(--text-muted)'};">
                        ${isUnlocked ? '✅ Получено' : '🔒 Не получено'}
                    </span>
                    <span style="color: #F59E0B; font-weight: 600; font-size: 14px;">
                        +${achievement.reward} <i class="fas fa-coins" style="font-size: 12px;"></i>
                    </span>
                </div>
            </div>
        `;
        
        grid.appendChild(achievementElement);
    });
}

// ========== ГЛАВНАЯ ФУНКЦИЯ - КРАЖА ==========
function stealCard() {
    const stealBtn = document.getElementById('steal-btn');
    
    // Проверка энергии
    if (game.energy < currentCard.cost) {
        showNotification('❌ Недостаточно энергии', `Нужно ${currentCard.cost}⚡, у вас ${game.energy}⚡`, 'error');
        return;
    }
    
    // Анимация кнопки
    stealBtn.style.transform = 'scale(0.95)';
    stealBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> КРАДУ...';
    stealBtn.disabled = true;
    
    // Затраты энергии
    game.energy -= currentCard.cost;
    game.totalSteals++;
    
    setTimeout(() => {
        // Шанс успеха зависит от редкости
        const rarityChance = {
            common: 0.8,
            rare: 0.7,
            epic: 0.6,
            legendary: 0.5,
            mythic: 0.4
        };
        
        const successChance = rarityChance[currentCard.rarity] || 0.5;
        const isSuccess = Math.random() < successChance;
        
        if (isSuccess) {
            game.successfulSteals++;
            
            // Проверяем, есть ли уже такая карта
            const alreadyHave = game.cards.includes(currentCard.id);
            
            if (!alreadyHave) {
                // Новая карта!
                game.cards.push(currentCard.id);
                game.rating += currentCard.cost * 3;
                game.gold += currentCard.cost * 2;
                game.exp += currentCard.cost * 5;
                
                showNotification(
                    '🎉 Успешная кража!',
                    `Вы украли: ${currentCard.title}<br>+${currentCard.cost * 3}⭐ +${currentCard.cost * 2}💰`,
                    'success'
                );
            } else {
                // Дубликат
                game.rating += currentCard.cost;
                game.gold += currentCard.cost;
                game.exp += currentCard.cost;
                
                showNotification(
                    '✅ Карта уже есть',
                    `Дубликат: ${currentCard.title}<br>+${currentCard.cost}⭐ +${currentCard.cost}💰`,
                    'warning'
                );
            }
        } else {
            // Неудача
            showNotification(
                '❌ Карта ускользнула',
                `${currentCard.title} оказался слишком быстрым!`,
                'error'
            );
        }
        
        // Проверяем достижения
        checkAchievements();
        
        // Обновляем уровень
        checkLevelUp();
        
        // Обновляем интерфейс
        updateUI();
        updateCollectionGrid();
        
        // Новая карта
        setTimeout(() => {
            updateCurrentCard();
            
            // Восстанавливаем кнопку
            stealBtn.innerHTML = '<i class="fas fa-hand-sparkles"></i> УКРАСТЬ КАРТУ';
            stealBtn.style.transform = 'scale(1)';
            stealBtn.disabled = false;
        }, 1000);
        
    }, 1500);
}

// ========== ДОСТИЖЕНИЯ И УРОВНИ ==========
function checkAchievements() {
    const unlocked = [];
    
    // Первая кража
    if (game.totalSteals >= 1 && !game.achievements.includes(1)) {
        unlocked.push(1);
    }
    
    // 3 разные карты
    const uniqueCards = new Set(game.cards).size;
    if (uniqueCards >= 3 && !game.achievements.includes(2)) {
        unlocked.push(2);
    }
    
    // 1000 голды
    if (game.gold >= 1000 && !game.achievements.includes(3)) {
        unlocked.push(3);
    }
    
    // 500 потраченной энергии
    if (game.totalSteals * 15 >= 500 && !game.achievements.includes(4)) {
        unlocked.push(4);
    }
    
    // 50 краж
    if (game.totalSteals >= 50 && !game.achievements.includes(5)) {
        unlocked.push(5);
    }
    
    // Награждаем за новые достижения
    unlocked.forEach(achievementId => {
        const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
        if (achievement) {
            game.achievements.push(achievementId);
            game.gold += achievement.reward;
            
            showNotification(
                '🏆 Новое достижение!',
                `${achievement.name}<br>+${achievement.reward}💰`,
                'success'
            );
        }
    });
    
    if (unlocked.length > 0) {
        updateAchievementsGrid();
    }
}

function checkLevelUp() {
    const newLevel = Math.floor(Math.sqrt(game.exp / 100)) + 1;
    
    if (newLevel > game.level) {
        game.level = newLevel;
        game.maxEnergy = 100 + (game.level * 10);
        game.energy = game.maxEnergy;
        
        showNotification(
            '🎉 Уровень повышен!',
            `Теперь вы ${game.level} уровня!<br>Макс. энергия: ${game.maxEnergy}⚡`,
            'success'
        );
    }
}

// ========== ЕЖЕДНЕВНАЯ НАГРАДА ==========
function checkDailyReward() {
    const today = new Date().toDateString();
    
    if (!game.lastLogin) {
        game.lastLogin = today;
        return;
    }
    
    if (game.lastLogin !== today) {
        const lastDate = new Date(game.lastLogin);
        const todayDate = new Date();
        const diffTime = todayDate - lastDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            game.dailyStreak++;
        } else {
            game.dailyStreak = 1;
        }
        
        game.lastLogin = today;
    }
}

function dailyReward() {
    const today = new Date().toDateString();
    
    if (game.lastLogin === today) {
        showNotification('❌ Уже получено', 'Возвращайтесь завтра!', 'warning');
        return;
    }
    
    const baseReward = 50;
    const streakBonus = game.dailyStreak * 5;
    const totalReward = baseReward + streakBonus;
    
    game.gold += totalReward;
    game.energy = Math.min(game.energy + 30, game.maxEnergy);
    game.lastLogin = today;
    
    showNotification(
        '🎁 Ежедневная награда!',
        `Стрик: ${game.dailyStreak} дней<br>+${totalReward}💰 +30⚡`,
        'success'
    );
    
    updateUI();
}

// ========== АВТО-ВОССТАНОВЛЕНИЕ ЭНЕРГИИ ==========
setInterval(() => {
    if (game.energy < game.maxEnergy) {
        game.energy++;
        updateUI();
    }
}, 30000); // +1 энергия каждые 30 секунд

// ========== ЗАПУСК ИГРЫ ==========
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализируем игру...');
    
    // Назначаем обработчик кнопке кражи
    const stealBtn = document.getElementById('steal-btn');
    if (stealBtn) {
        stealBtn.addEventListener('click', stealCard);
    }
    
    // Загружаем игру
    loadGame();
    
    // Показываем приветственное сообщение
    setTimeout(() => {
        showNotification(
            '🎮 Добро пожаловать!',
            'Крадите карты, собирайте коллекцию и становитесь легендой!',
            'info'
        );
    }, 1000);
    
    console.log('Игра запущена!');
});

// ========== ГЛОБАЛЬНЫЙ ЭКСПОРТ ==========
window.stealCard = stealCard;
window.dailyReward = dailyReward;
window.openShop = openShop;
window.openCasino = openCasino;
window.openFriends = openFriends;
window.showCollection = showCollection;
window.buyCase = buyCase;
window.buyEnergy = buyEnergy;
window.closeModal = closeModal;
window.showPage = showPage;

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function showNotification(title, message, type) {
    if (typeof window.showNotification === 'function') {
        window.showNotification(title, message, type);
    } else {
        // Запасной вариант
        alert(`${title}\n${message}`);
    }
}
