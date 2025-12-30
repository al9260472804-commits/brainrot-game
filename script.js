// Brainrot Stealer - УПРОЩЕННАЯ РАБОЧАЯ ВЕРСИЯ
console.log("Игра загружается...");

// ДАННЫЕ ИГРЫ
let game = {
    energy: 100,
    cards: [],
    rating: 1000,
    gold: 0,
    totalEnergySpent: 0
};

// КАРТОЧКИ
const BRAINROT_CARDS = [
    { id: 1, title: "SKIBIDI TOILET", desc: "Легендарный туалет-голова", cost: 15, image: "https://i.imgur.com/xK9T4hG.png" },
    { id: 2, title: "GYATT", desc: "Sigma rizz в Ohio", cost: 10, image: "https://i.imgur.com/y7WkL9p.png" },
    { id: 3, title: "FANUM TAX", desc: "Fuming забирает еду", cost: 8, image: "https://i.imgur.com/z8M9Q2r.png" }
];

let currentCard = BRAINROT_CARDS[0];

// ========== ОСНОВНЫЕ ФУНКЦИИ ==========

// ЗАГРУЗКА ИГРЫ
function loadGame() {
    const saved = localStorage.getItem('brainrot_v3');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            game = { ...game, ...data };
        } catch (e) {
            console.log("Начинаем новую игру");
        }
    }
    updateUI();
    updateCard();
}

// СОХРАНЕНИЕ
function saveGame() {
    localStorage.setItem('brainrot_v3', JSON.stringify(game));
}

// ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
function updateUI() {
    // Обновляем цифры
    const energyEl = document.getElementById('energy');
    const cardsEl = document.getElementById('cards-count');
    const ratingEl = document.getElementById('rating');
    const goldEl = document.getElementById('gold');
    
    if (energyEl) energyEl.textContent = game.energy;
    if (cardsEl) cardsEl.textContent = game.cards.length;
    if (ratingEl) ratingEl.textContent = game.rating;
    if (goldEl) goldEl.textContent = game.gold;
    
    // Обновляем коллекцию
    updateCollection();
    
    // Сохраняем
    saveGame();
}

// ОБНОВЛЕНИЕ КОЛЛЕКЦИИ
function updateCollection() {
    const grid = document.getElementById('collection');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (game.cards.length === 0) {
        grid.innerHTML = '<div style="color:#aaa; text-align:center; padding:30px; grid-column:1/4">Нет карт</div>';
        return;
    }
    
    // Показываем последние 6 карт
    game.cards.slice(-6).reverse().forEach(cardId => {
        const card = BRAINROT_CARDS.find(c => c.id === cardId);
        if (card) {
            const cardEl = document.createElement('div');
            cardEl.className = 'card-small';
            cardEl.innerHTML = `
                <img src="${card.image}" style="width:100%; height:80px; object-fit:cover; border-radius:8px;">
                <div style="font-size:12px; margin-top:5px;">${card.title}</div>
            `;
            grid.appendChild(cardEl);
        }
    });
}

// ОБНОВЛЕНИЕ КАРТЫ
function updateCard() {
    const titleEl = document.getElementById('card-title');
    const descEl = document.getElementById('card-desc');
    const costEl = document.getElementById('card-cost');
    const imageEl = document.getElementById('card-image');
    
    if (titleEl) titleEl.textContent = currentCard.title;
    if (descEl) descEl.textContent = currentCard.desc;
    if (costEl) costEl.textContent = currentCard.cost;
    if (imageEl) imageEl.src = currentCard.image;
}

// ========== ГЛАВНАЯ ФУНКЦИЯ - КРАЖА КАРТЫ ==========
function stealCard() {
    console.log("Кража карты:", currentCard.title);
    
    // Проверяем элементы
    const stealBtn = document.getElementById('steal-btn');
    if (!stealBtn) {
        console.error("Кнопка не найдена!");
        return;
    }
    
    // Проверка энергии
    if (game.energy < currentCard.cost) {
        alert('⚡ Нет энергии!');
        return;
    }
    
    // Тратим энергию
    game.energy -= currentCard.cost;
    game.totalEnergySpent += currentCard.cost;
    
    // Эффект кнопки
    stealBtn.style.transform = 'scale(0.95)';
    setTimeout(() => stealBtn.style.transform = 'scale(1)', 200);
    
    // Шанс успеха
    const isSuccess = Math.random() < 0.7;
    
    if (isSuccess) {
        if (!game.cards.includes(currentCard.id)) {
            // Новая карта
            game.cards.push(currentCard.id);
            game.rating += 50;
            game.gold += 10;
            alert(`🎉 УКРАЛ! ${currentCard.title}\n+50⭐ +10💰`);
        } else {
            // Карта уже есть
            game.rating += 10;
            game.gold += 5;
            alert(`✅ Уже есть!\n+10⭐ +5💰`);
        }
        
        // Меняем карту через секунду
        setTimeout(() => {
            currentCard = BRAINROT_CARDS[Math.floor(Math.random() * BRAINROT_CARDS.length)];
            updateCard();
        }, 1000);
        
    } else {
        // Неудача
        alert('❌ Не удалось украсть!');
    }
    
    // Обновляем всё
    updateUI();
}

// ========== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ==========

// РЕКЛАМА ЗА ЭНЕРГИЮ
function watchAdForEnergy() {
    if (confirm('Посмотреть рекламу 30 секунд за +20 энергии?')) {
        game.energy += 20;
        if (game.energy > 100) game.energy = 100;
        updateUI();
        alert('+20⚡ за просмотр рекламы!');
    }
}

// ЕЖЕДНЕВНАЯ НАГРАДА
function dailyReward() {
    const today = new Date().toDateString();
    const lastReward = localStorage.getItem('brainrot_daily');
    
    if (lastReward !== today) {
        game.energy += 50;
        game.gold += 25;
        if (game.energy > 100) game.energy = 100;
        localStorage.setItem('brainrot_daily', today);
        updateUI();
        alert('🎁 Ежедневная награда!\n+50⚡ +25💰');
    } else {
        alert('❌ Уже получал награду сегодня!');
    }
}

// МАГАЗИН
function openShop() {
    const shopHTML = `
        <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); z-index:1000; display:flex; align-items:center; justify-content:center;">
            <div style="background:#1a1a2e; padding:30px; border-radius:20px; border:3px solid #00ff88; max-width:400px; width:90%;">
                <h2 style="color:#00ff88; text-align:center;">🛒 МАГАЗИН</h2>
                <p style="text-align:center; font-size:24px; color:#ffd700;">💰 Голда: ${game.gold}</p>
                
                <div style="margin:20px 0;">
                    <div onclick="buyEnergy()" style="background:rgba(255,255,255,0.1); padding:20px; border-radius:15px; margin:10px 0; cursor:pointer; text-align:center;">
                        <div style="font-size:20px;">⚡ 50 энергии</div>
                        <div style="color:#ffd700; font-size:18px;">25💰</div>
                    </div>
                    
                    <div onclick="buyCard()" style="background:rgba(255,255,255,0.1); padding:20px; border-radius:15px; margin:10px 0; cursor:pointer; text-align:center;">
                        <div style="font-size:20px;">🎁 Случайная карта</div>
                        <div style="color:#ffd700; font-size:18px;">100💰</div>
                    </div>
                </div>
                
                <button onclick="closeShop()" style="background:#ff0080; color:white; border:none; padding:15px; border-radius:10px; width:100%; font-size:18px; cursor:pointer; margin-top:10px;">
                    Закрыть
                </button>
            </div>
        </div>
    `;
    
    // Удаляем старый магазин если есть
    const oldShop = document.getElementById('shop-modal');
    if (oldShop) oldShop.remove();
    
    // Создаем новый
    const shop = document.createElement('div');
    shop.id = 'shop-modal';
    shop.innerHTML = shopHTML;
    document.body.appendChild(shop);
}

function closeShop() {
    const shop = document.getElementById('shop-modal');
    if (shop) shop.remove();
}

function buyEnergy() {
    if (game.gold >= 25) {
        game.gold -= 25;
        game.energy += 50;
        if (game.energy > 100) game.energy = 100;
        updateUI();
        alert('✅ Куплено 50⚡!');
        closeShop();
    } else {
        alert('❌ Недостаточно голды!');
    }
}

function buyCard() {
    if (game.gold >= 100) {
        game.gold -= 100;
        const randomCard = BRAINROT_CARDS[Math.floor(Math.random() * BRAINROT_CARDS.length)];
        
        if (!game.cards.includes(randomCard.id)) {
            game.cards.push(randomCard.id);
            alert(`🎁 Получена карта: ${randomCard.title}!`);
        } else {
            game.gold += 40;
            alert('🎁 Карта уже есть! +40💰');
        }
        
        updateUI();
        closeShop();
    } else {
        alert('❌ Недостаточно голды!');
    }
}

// ========== ЗАПУСК ИГРЫ ==========

// ВОССТАНОВЛЕНИЕ ЭНЕРГИИ
setInterval(() => {
    if (game.energy < 100) {
        game.energy++;
        updateUI();
    }
}, 60000);

// КОГДА СТРАНИЦА ПОЛНОСТЬЮ ЗАГРУЖЕНА
window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM загружен, запускаем игру...");
    
    // Назначаем обработчик кнопке кражи
    const stealBtn = document.getElementById('steal-btn');
    if (stealBtn) {
        console.log("Кнопка найдена, назначаем обработчик...");
        // Два способа на всякий случай
        stealBtn.onclick = stealCard;
        stealBtn.addEventListener('click', stealCard);
    } else {
        console.error("Кнопка 'steal-btn' не найдена в DOM!");
    }
    
    // Загружаем игру
    loadGame();
    
    console.log("Игра запущена!");
});

// Экспортируем функции глобально
window.stealCard = stealCard;
window.watchAdForEnergy = watchAdForEnergy;
window.dailyReward = dailyReward;
window.openShop = openShop;
window.closeShop = closeShop;
window.buyEnergy = buyEnergy;
window.buyCard = buyCard;
