// ДАННЫЕ ИГРЫ
const BRAINROT_CARDS = [
    { id: 1, title: "SKIBIDI TOILET", desc: "Легендарный туалет-голова", cost: 15, image: "https://i.imgur.com/xK9T4hG.png" },
    { id: 2, title: "GYATT", desc: "Sigma rizz в Ohio", cost: 10, image: "https://i.imgur.com/y7WkL9p.png" },
    { id: 3, title: "FANUM TAX", desc: "Fuming забирает еду", cost: 8, image: "https://i.imgur.com/z8M9Q2r.png" },
    { id: 4, title: "OHIO SKIBIDI", desc: "Странный туалет", cost: 12, image: "https://i.imgur.com/xK9T4hG.png" },
    { id: 5, title: "SIGMA RIZZ", desc: "Правило 1", cost: 10, image: "https://i.imgur.com/y7WkL9p.png" },
    { id: 6, title: "KEYS TO THE BMW", desc: "Ты получил ключи", cost: 20, image: "https://i.imgur.com/z8M9Q2r.png" }
];

let currentCard = BRAINROT_CARDS[0];

// ЗАГРУЗКА КОЛЛЕКЦИИ
function loadCollection() {
    const grid = document.getElementById('collection-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (game.cards.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:20px; color:#cbd5e0;">Коллекция пуста</div>';
        return;
    }
    
    // Показываем последние 6 карт
    game.cards.slice(-6).reverse().forEach(cardId => {
        const card = BRAINROT_CARDS.find(c => c.id === cardId);
        if (card) {
            const cardEl = document.createElement('div');
            cardEl.style.cssText = `
                background: #4a5568;
                border-radius: 8px;
                overflow: hidden;
                border: 2px solid #9f7aea;
            `;
            cardEl.innerHTML = `
                <img src="${card.image}" style="width:100%; height:80px; object-fit:cover;">
                <div style="padding:5px; font-size:10px; text-align:center; color:#f7fafc;">${card.title}</div>
            `;
            grid.appendChild(cardEl);
        }
    });
}

// ЗАГРУЗКА ПОЛНОЙ КОЛЛЕКЦИИ
function loadFullCollection() {
    const container = document.getElementById('full-collection');
    if (!container) return;
    
    container.innerHTML = '';
    
    BRAINROT_CARDS.forEach(card => {
        const hasCard = game.cards.includes(card.id);
        const cardEl = document.createElement('div');
        cardEl.style.cssText = `
            background: #4a5568;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid ${hasCard ? '#48bb78' : '#e53e3e'};
            opacity: ${hasCard ? '1' : '0.5'};
        `;
        cardEl.innerHTML = `
            <img src="${card.image}" style="width:100%; height:100px; object-fit:cover;">
            <div style="padding:5px; text-align:center;">
                <div style="font-size:12px; color:#f7fafc;">${card.title}</div>
                <div style="font-size:10px; color:${hasCard ? '#48bb78' : '#e53e3e'};">
                    ${hasCard ? '✅ Есть' : '❌ Нет'}
                </div>
            </div>
        `;
        container.appendChild(cardEl);
    });
}

// ЗАГРУЗКА МАГАЗИНА
function loadShopItems() {
    const container = document.getElementById('shop-items');
    if (!container) return;
    
    const shopItems = [
        {
            name: "⚡ 50 энергии",
            price: 25,
            desc: "Восстановить энергию",
            action: () => buyEnergy(50)
        },
        {
            name: "📦 Случайная карта",
            price: 100,
            desc: "Шанс на редкую карту",
            action: () => buyRandomCard()
        },
        {
            name: "💎 Премиум кейс",
            price: 500,
            desc: "Гарантированно редкая+",
            action: () => buyPremiumCase()
        },
        {
            name: "⭐ x2 Рейтинг (1 час)",
            price: 200,
            desc: "Удвоение рейтинга за победы",
            action: () => buyRatingBoost()
        }
    ];
    
    container.innerHTML = shopItems.map(item => `
        <div style="background: linear-gradient(135deg, #2d3748, #4a5568); padding: 15px; border-radius: 12px; border: 2px solid #4299e1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <div>
                    <div style="font-weight: bold; color: #f7fafc;">${item.name}</div>
                    <div style="font-size: 14px; color: #cbd5e0;">${item.desc}</div>
                </div>
                <div style="color: #f6e05e; font-weight: bold; font-size: 20px;">
                    <i class="fas fa-coins"></i> ${item.price}
                </div>
            </div>
            <button onclick="purchaseItem(${shopItems.indexOf(item)})" 
                    style="background: #48bb78; color: white; border: none; padding: 10px; border-radius: 8px; width: 100%; cursor: pointer; font-weight: bold;">
                Купить
            </button>
        </div>
    `).join('');
}

// ПОКУПКИ В МАГАЗИНЕ
function purchaseItem(index) {
    const items = [
        { price: 25, action: () => buyEnergy(50) },
        { price: 100, action: () => buyRandomCard() },
        { price: 500, action: () => buyPremiumCase() },
        { price: 200, action: () => buyRatingBoost() }
    ];
    
    const item = items[index];
    
    if (game.gold >= item.price) {
        game.gold -= item.price;
        item.action();
        updateUI();
        loadShopItems();
    } else {
        showNotification(`Недостаточно голды! Нужно: ${item.price}`, 'error');
    }
}

function buyEnergy(amount) {
    game.energy = Math.min(game.energy + amount, 100);
    showNotification(`+${amount} энергии!`, 'success');
}

function buyRandomCard() {
    const randomCard = BRAINROT_CARDS[Math.floor(Math.random() * BRAINROT_CARDS.length)];
    const alreadyHave = game.cards.includes(randomCard.id);
    
    if (!alreadyHave) {
        game.cards.push(randomCard.id);
        showNotification(`Получена карта: ${randomCard.title}!`, 'success');
    } else {
        game.gold += 50; // Компенсация за дубликат
        showNotification('Дубликат! +50💰', 'warning');
    }
    loadCollection();
}

function buyPremiumCase() {
    if (game.gold >= 500) {
        game.gold -= 500;
        // Даем 3 случайные карты
        for (let i = 0; i < 3; i++) {
            const randomCard = BRAINROT_CARDS[Math.floor(Math.random() * BRAINROT_CARDS.length)];
            if (!game.cards.includes(randomCard.id)) {
                game.cards.push(randomCard.id);
            }
        }
        showNotification('Премиум кейс открыт! Получено 3 карты!', 'success');
        loadCollection();
        updateUI();
    }
}

// КАЗИНО
function playSlotMachine() {
    if (game.gold < 50) {
        showNotification('Нужно 50💰 для игры!', 'error');
        return;
    }
    
    game.gold -= 50;
    updateUI();
    
    // Анимация
    showNotification('🎰 Вращаем барабаны...', 'info');
    
    setTimeout(() => {
        const symbols = ['🍒', '🍋', '🍊', '⭐', '💎', '7️⃣'];
        const result = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        if (result[0] === result[1] && result[1] === result[2]) {
            const win = 1000;
            game.gold += win;
            showNotification(`🎰 ДЖЕКПОТ! ${result.join(' ')} +${win}💰`, 'success');
        } else if (result[0] === result[1] || result[1] === result[2]) {
            const win = 100;
            game.gold += win;
            showNotification(`🎰 Выигрыш! ${result.join(' ')} +${win}💰`, 'success');
        } else {
            showNotification(`🎰 ${result.join(' ')} Попробуйте еще!`, 'warning');
        }
        updateUI();
    }, 1500);
}

function playRoulette() {
    if (game.gold < 100) {
        showNotification('Нужно 100💰 для игры!', 'error');
        return;
    }
    
    game.gold -= 100;
    updateUI();
    
    showNotification('🎡 Ставка сделана...', 'info');
    
    setTimeout(() => {
        const winChance = Math.random();
        if (winChance < 0.1) {
            const win = 3600; // x36
            game.gold += win;
            showNotification(`🎡 ВЫИГРЫШ x36! +${win}💰`, 'success');
        } else if (winChance < 0.3) {
            const win = 300; // x3
            game.gold += win;
            showNotification(`🎡 Выигрыш x3! +${win}💰`, 'success');
        } else if (winChance < 0.6) {
            const win = 150; // x1.5
            game.gold += win;
            showNotification(`🎡 Выигрыш x1.5! +${win}💰`, 'success');
        } else {
            showNotification('🎡 К сожалению, вы проиграли', 'error');
        }
        updateUI();
    }, 2000);
}

// ЕЖЕДНЕВНАЯ НАГРАДА
function dailyReward() {
    const today = new Date().toDateString();
    const lastReward = localStorage.getItem('brainrot_daily');
    
    if (lastReward !== today) {
        game.energy += 50;
        game.gold += 100;
        if (game.energy > 100) game.energy = 100;
        localStorage.setItem('brainrot_daily', today);
        updateUI();
        showNotification('🎁 Ежедневная награда! +50⚡ +100💰', 'success');
    } else {
        showNotification('❌ Уже получали награду сегодня', 'warning');
    }
}

// КРАЖА КАРТЫ (ОСНОВНАЯ ФУНКЦИЯ)
function stealCard() {
    const btn = document.getElementById('steal-btn');
    
    if (game.energy < currentCard.cost) {
        showNotification('Недостаточно энергии!', 'error');
        return;
    }
    
    // Анимация
    btn.style.transform = 'scale(0.95)';
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> КРАЖА...';
    
    game.energy -= currentCard.cost;
    game.totalSteals = (game.totalSteals || 0) + 1;
    
    setTimeout(() => {
        const success = Math.random() < 0.7;
        
        if (success) {
            const alreadyHave = game.cards.includes(currentCard.id);
            
            if (!alreadyHave) {
                game.cards.push(currentCard.id);
                game.rating += 50;
                game.gold += 20;
                showNotification(`🎉 УКРАЛ! ${currentCard.title} (+50⭐ +20💰)`, 'success');
            } else {
                game.rating += 15;
                game.gold += 10;
                showNotification(`✅ Дубликат! (+15⭐ +10💰)`, 'warning');
            }
            
            loadCollection();
        } else {
            showNotification('❌ Не удалось украсть!', 'error');
        }
        
        // Меняем карту
        currentCard = BRAINROT_CARDS[Math.floor(Math.random() * BRAINROT_CARDS.length)];
        updateCardDisplay();
        updateUI();
        
        // Возвращаем кнопку
        btn.innerHTML = '<i class="fas fa-hand-sparkles"></i> УКРАСТЬ КАРТУ';
        btn.style.transform = 'scale(1)';
        btn.disabled = false;
    }, 1000);
}

// ОБНОВЛЕНИЕ КАРТЫ
function updateCardDisplay() {
    document.getElementById('card-title').textContent = currentCard.title;
    document.getElementById('card-desc').textContent = currentCard.desc;
    document.getElementById('card-cost').textContent = currentCard.cost;
    document.getElementById('card-image').src = currentCard.image;
}

// ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
window.addEventListener('DOMContentLoaded', function() {
    // Загружаем игру
    if (typeof loadGame === 'function') {
        loadGame();
    }
    
    // Обновляем карту
    updateCardDisplay();
    
    // Восстановление энергии каждую минуту
    setInterval(() => {
        if (game.energy < 100) {
            game.energy++;
            updateUI();
        }
    }, 60000);
});

// ДЕЛАЕМ ФУНКЦИИ ГЛОБАЛЬНЫМИ
window.stealCard = stealCard;
window.dailyReward = dailyReward;
window.openShop = openShop;
window.openInventory = openInventory;
window.openCasino = openCasino;
window.openSettings = openSettings;
window.closeModal = closeModal;
window.setTheme = setTheme;
window.purchaseItem = purchaseItem;
window.playSlotMachine = playSlotMachine;
window.playRoulette = playRoulette;
