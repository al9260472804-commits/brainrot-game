// ========== ДАННЫЕ ИГРЫ ==========
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
    theme: 'dark'
};

// МАССИВ КАРТ С ИЗОБРАЖЕНИЯМИ
const CARDS = [
    { 
        id: 1, 
        title: "SKIBIDI TOILET", 
        desc: "Легендарный туалет-голова", 
        cost: 15, 
        rarity: "legendary", 
        image: "https://i.postimg.cc/FRvLpwbn/7b34bc0e90379c9ae9c0a862ba990f96.jpg" 
    },
    { 
        id: 2, 
        title: "GYATT", 
        desc: "Sigma ризз в Ohio", 
        cost: 10, 
        rarity: "epic", 
        image: "https://i.imgur.com/y7WkL9p.png" 
    },
    { 
        id: 3, 
        title: "FANUM TAX", 
        desc: "Fuming забирает еду", 
        cost: 8, 
        rarity: "rare", 
        image: "https://i.imgur.com/z8M9Q2r.png" 
    },
    { 
        id: 4, 
        title: "OHIO SKIBIDI", 
        desc: "Странный туалет", 
        cost: 12, 
        rarity: "rare", 
        image: "https://i.imgur.com/L4e5V7j.png" 
    },
    { 
        id: 5, 
        title: "SIGMA RIZZ", 
        desc: "Правило 1", 
        cost: 10, 
        rarity: "common", 
        image: "https://i.imgur.com/W9Kc3Lm.png" 
    },
    { 
        id: 6, 
        title: "KEYS TO THE BMW", 
        desc: "Ты получил ключи", 
        cost: 20, 
        rarity: "legendary", 
        image: "https://i.imgur.com/Q2M8vF9.png" 
    }
];

let currentCard = CARDS[0];

// ========== ЗАГРУЗКА И СОХРАНЕНИЕ ==========
function loadGame() {
    const saved = localStorage.getItem('brainrot_final');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            game = { ...game, ...data };
        } catch(e) {
            console.log("Начинаем новую игру");
        }
    }
    
    // Применяем тему
    setTheme(game.theme || 'dark');
    
    updateUI();
    loadCollection();
    loadShopItems();
}

function saveGame() {
    localStorage.setItem('brainrot_final', JSON.stringify(game));
}

// ========== ОБНОВЛЕНИЕ ИНТЕРФЕЙСА ==========
function updateUI() {
    // Магазин и казино
    document.getElementById('shop-balance').textContent = game.gold;
    document.getElementById('casino-balance').textContent = game.gold;
    
    // Полная статистика
    document.getElementById('stats-energy').textContent = game.energy;
    document.getElementById('stats-cards').textContent = game.cards.length;
    document.getElementById('stats-rating').textContent = game.rating;
    document.getElementById('stats-gold').textContent = game.gold;
    document.getElementById('stats-total-steals').textContent = game.totalSteals;
    document.getElementById('stats-success-steals').textContent = game.successfulSteals;
    document.getElementById('stats-level').textContent = game.level;
    document.getElementById('stats-unique-cards').textContent = new Set(game.cards).size;
    
    saveGame();
}

// ========== КРАЖА КАРТЫ ==========
function stealCard() {
    if (game.energy < currentCard.cost) {
        showNotification("❌ Недостаточно энергии!", "error");
        return;
    }

    const btn = document.querySelector('.steal-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> КРАЖА...';
    btn.disabled = true;

    game.energy -= currentCard.cost;
    game.totalSteals++;

    setTimeout(() => {
        const success = Math.random() < 0.7;

        if (success) {
            game.successfulSteals++;
            const alreadyHave = game.cards.includes(currentCard.id);

            if (!alreadyHave) {
                game.cards.push(currentCard.id);
                game.rating += 50;
                game.gold += 20;
                showNotification(`🎉 УКРАЛ! ${currentCard.title} (+50⭐ +20💰)`, "success");
            } else {
                game.rating += 15;
                game.gold += 10;
                showNotification(`✅ Дубликат! (+15⭐ +10💰)`, "warning");
            }
            loadCollection();
        } else {
            showNotification('❌ Не удалось украсть!', "error");
        }

        // Новая карта
        currentCard = CARDS[Math.floor(Math.random() * CARDS.length)];
        updateCardDisplay();
        updateUI();

        // Возвращаем кнопку
        btn.innerHTML = originalHTML;
        btn.disabled = false;
    }, 1000);
}

function updateCardDisplay() {
    document.getElementById('card-title').textContent = currentCard.title;
    document.getElementById('card-description').textContent = currentCard.desc;
    document.getElementById('card-cost').textContent = currentCard.cost;
    document.getElementById('card-image').src = currentCard.image;
    document.getElementById('rarity-badge').textContent = 
        currentCard.rarity === 'common' ? 'ОБЫЧНАЯ' :
        currentCard.rarity === 'rare' ? 'РЕДКАЯ' :
        currentCard.rarity === 'epic' ? 'ЭПИЧЕСКАЯ' : 'ЛЕГЕНДАРНАЯ';
}

// ========== КОЛЛЕКЦИЯ ==========
function loadCollection() {
    const grid = document.getElementById('collection-grid');
    if (!grid) return;

    grid.innerHTML = '';

    if (game.cards.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:#aaa;">Коллекция пуста</div>';
        return;
    }

    game.cards.slice(-6).reverse().forEach(cardId => {
        const card = CARDS.find(c => c.id === cardId);
        if (card) {
            const cardEl = document.createElement('div');
            cardEl.className = 'collection-card';
            cardEl.innerHTML = `
                <img src="${card.image}">
                <div style="font-size:10px; text-align:center; margin-top:5px;">${card.title}</div>
            `;
            grid.appendChild(cardEl);
        }
    });
}

function loadFullCollection() {
    const container = document.getElementById('full-collection');
    if (!container) return;

    let html = '';
    
    CARDS.forEach(card => {
        const hasCard = game.cards.includes(card.id);
        html += `
            <div style="background:${hasCard ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.05)'}; border:2px solid ${hasCard ? '#00ff88' : '#555'}; border-radius:10px; padding:10px; opacity:${hasCard ? '1' : '0.6'}">
                <img src="${card.image}" style="width:100%; height:100px; object-fit:cover; border-radius:8px;">
                <div style="text-align:center; margin-top:5px;">
                    <div style="font-size:12px; color:${hasCard ? '#00ff88' : '#aaa'}">${card.title}</div>
                    <div style="font-size:10px; color:${hasCard ? '#00ff88' : '#e53e3e'}">${hasCard ? '✅ Есть' : '❌ Нет'}</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ========== МАГАЗИН ==========
function loadShopItems() {
    const container = document.getElementById('shop-items');
    if (!container) return;

    const items = [
        { name: "⚡ 50 энергии", price: 25, desc: "Восстановить энергию", action: () => buyEnergy(50) },
        { name: "📦 Случайная карта", price: 100, desc: "Шанс на редкую карту", action: () => buyRandomCard() },
        { name: "💎 Премиум кейс", price: 500, desc: "Гарантированно редкая+", action: () => buyPremiumCase() },
        { name: "⭐ x2 Рейтинг", price: 200, desc: "Удвоение на 1 час", action: () => buyRatingBoost() }
    ];

    container.innerHTML = items.map(item => `
        <div class="shop-item" onclick="buyShopItem(${items.indexOf(item)})">
            <div class="shop-item-header">
                <div class="shop-item-icon">${item.name.split(' ')[0]}</div>
                <div>
                    <div style="font-weight:bold; color:white;">${item.name}</div>
                    <div style="font-size:12px; color:#aaa;">${item.desc}</div>
                </div>
            </div>
            <div class="shop-item-price">
                <i class="fas fa-coins"></i> ${item.price}
            </div>
        </div>
    `).join('');
}

function buyShopItem(index) {
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
        showNotification('✅ Покупка успешна!', 'success');
    } else {
        showNotification(`❌ Недостаточно голды! Нужно: ${item.price}`, 'error');
    }
}

function buyEnergy(amount) {
    game.energy = Math.min(game.energy + amount, game.maxEnergy);
}

function buyRandomCard() {
    const card = CARDS[Math.floor(Math.random() * CARDS.length)];
    if (!game.cards.includes(card.id)) {
        game.cards.push(card.id);
        showNotification(`🎁 Получена карта: ${card.title}!`, 'success');
    } else {
        game.gold += 50;
        showNotification('🔄 Дубликат! +50💰', 'warning');
    }
    loadCollection();
}

function buyPremiumCase() {
    // Даем 3 случайные карты
    let newCards = 0;
    for (let i = 0; i < 3; i++) {
        const card = CARDS[Math.floor(Math.random() * CARDS.length)];
        if (!game.cards.includes(card.id)) {
            game.cards.push(card.id);
            newCards++;
        }
    }
    showNotification(`💎 Премиум кейс открыт! Получено ${newCards} новых карт!`, 'success');
    loadCollection();
}

function buyRatingBoost() {
    showNotification('⭐ Бустер рейтинга активирован на 1 час!', 'success');
    // Здесь можно добавить логику бустера
}

// ========== КАЗИНО ==========
function playSlotMachine() {
    if (game.gold < 50) {
        showNotification('❌ Нужно 50💰!', 'error');
        return;
    }

    game.gold -= 50;
    updateUI();
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
        showNotification('❌ Нужно 100💰!', 'error');
        return;
    }

    game.gold -= 100;
    updateUI();
    showNotification('🎡 Ставка принята...', 'info');

    setTimeout(() => {
        const winChance = Math.random();
        if (winChance < 0.1) {
            const win = 3600;
            game.gold += win;
            showNotification(`🎡 ВЫИГРЫШ x36! +${win}💰`, 'success');
        } else if (winChance < 0.3) {
            const win = 300;
            game.gold += win;
            showNotification(`🎡 Выигрыш x3! +${win}💰`, 'success');
        } else if (winChance < 0.6) {
            const win = 150;
            game.gold += win;
            showNotification(`🎡 Выигрыш x1.5! +${win}💰`, 'success');
        } else {
            showNotification('🎡 К сожалению, вы проиграли', 'error');
        }
        updateUI();
    }, 2000);
}

function playDice() {
    if (game.gold < 50) {
        showNotification('❌ Нужно 50💰!', 'error');
        return;
    }

    game.gold -= 50;
    updateUI();
    showNotification('🎲 Бросаем кости...', 'info');

    setTimeout(() => {
        const playerRoll = Math.floor(Math.random() * 6) + 1;
        const aiRoll = Math.floor(Math.random() * 6) + 1;

        if (playerRoll > aiRoll) {
            const win = 100;
            game.gold += win;
            showNotification(`🎲 Выиграли! Вы: ${playerRoll} vs ИИ: ${aiRoll} +${win}💰`, 'success');
        } else if (playerRoll < aiRoll) {
            showNotification(`🎲 Проиграли! Вы: ${playerRoll} vs ИИ: ${aiRoll}`, 'error');
        } else {
            game.gold += 50; // Возвращаем ставку при ничье
            showNotification(`🎲 Ничья! Вы: ${playerRoll} vs ИИ: ${aiRoll} Ставка возвращена`, 'warning');
        }
        updateUI();
    }, 1500);
}

// ========== СТРАНИЦЫ И НАВИГАЦИЯ ==========
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(page + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(btn => 
        btn.getAttribute('onclick')?.includes(page) || 
        btn.querySelector('span')?.textContent.toLowerCase().includes(page)
    );
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

function openShop() { 
    showPage('shop'); 
}

function openCasino() { 
    showPage('casino'); 
}

function openInventory() { 
    showPage('inventory'); 
    loadFullCollection();
}

// ========== МОДАЛЬНЫЕ ОКНА ==========
function openStats() {
    document.getElementById('stats-modal').classList.add('active');
}

function openSettings() {
    document.getElementById('settings-modal').classList.add('active');
}

function closeModal(modal) {
    document.getElementById(modal + '-modal').classList.remove('active');
}

// ========== УВЕДОМЛЕНИЯ ==========
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const colors = {
        success: '#00ff88',
        error: '#ff0080',
        warning: '#ffd700',
        info: '#4169e1'
    };
    
    notification.style.borderLeftColor = colors[type] || colors.info;
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// ========== НАСТРОЙКИ ==========
function setTheme(theme) {
    game.theme = theme;
    
    const themes = {
        dark: ['#0a0e17', '#1a1a2e', '#16213e'],
        light: ['#f0f0f0', '#ffffff', '#e0e0e0'],
        purple: ['#0a0a1a', '#1a003a', '#2a003a']
    };
    
    const colors = themes[theme] || themes.dark;
    document.body.style.background = colors[0];
    
    // Обновляем цвета карточек
    document.querySelectorAll('.steal-card').forEach(card => {
        card.style.background = `linear-gradient(135deg, ${colors[1]}, ${colors[2]})`;
    });
    
    saveGame();
}

function setVolume(value) {
    // Здесь можно добавить управление звуком
    console.log('Громкость установлена:', value);
}

// ========== ЕЖЕДНЕВНАЯ НАГРАДА ==========
function dailyReward() {
    const today = new Date().toDateString();
    const lastReward = localStorage.getItem('brainrot_daily');
    
    if (lastReward !== today) {
        game.energy += 50;
        game.gold += 100;
        if (game.energy > game.maxEnergy) game.energy = game.maxEnergy;
        localStorage.setItem('brainrot_daily', today);
        updateUI();
        showNotification('🎁 Ежедневная награда! +50⚡ +100💰', 'success');
    } else {
        showNotification('❌ Уже получали награду сегодня', 'warning');
    }
}

// ========== УПРАВЛЕНИЕ ДАННЫМИ ==========
function exportSave() {
    const saveData = JSON.stringify(game);
    const blob = new Blob([saveData], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `brainrot_save_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    showNotification('💾 Сохранение экспортировано', 'success');
}

function importSave() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const saveData = JSON.parse(event.target.result);
                game = { ...game, ...saveData };
                localStorage.setItem('brainrot_final', JSON.stringify(game));
                updateUI();
                loadCollection();
                showNotification('💾 Сохранение загружено!', 'success');
            } catch(err) {
                showNotification('❌ Ошибка загрузки файла', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function resetGame() {
    if (confirm("⚠️ Вы уверены? Это удалит весь ваш прогресс!")) {
        localStorage.removeItem('brainrot_final');
        localStorage.removeItem('brainrot_daily');
        location.reload();
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
window.addEventListener('load', function() {
    loadGame();
    updateCardDisplay();
    
    // Восстановление энергии каждые 30 секунд
    setInterval(() => {
        if (game.energy < game.maxEnergy) {
            game.energy++;
            updateUI();
        }
    }, 30000);
    
    showNotification('🎮 Добро пожаловать в Brainrot Stealer!', 'info');
});

// ДЕЛАЕМ ФУНКЦИИ ДОСТУПНЫМИ ИЗ HTML
window.stealCard = stealCard;
window.dailyReward = dailyReward;
window.openShop = openShop;
window.openCasino = openCasino;
window.openInventory = openInventory;
window.openSettings = openSettings;
window.openStats = openStats;
window.showPage = showPage;
window.closeModal = closeModal;
window.buyShopItem = buyShopItem;
window.playSlotMachine = playSlotMachine;
window.playRoulette = playRoulette;
window.playDice = playDice;
window.setTheme = setTheme;
window.setVolume = setVolume;
window.exportSave = exportSave;
window.importSave = importSave;
window.resetGame = resetGame;
// ========== ИНТЕРАКТИВНАЯ ОБУЧАЛКА ==========
let tutorialStep = 0;
let tutorialActive = false;

// Запуск обучалки
function startInteractiveTutorial() {
    if (tutorialActive) return;
    
    tutorialActive = true;
    tutorialStep = 1;
    document.getElementById('interactive-tutorial').style.display = 'block';
    
    // Показываем первый шаг
    showTutorialStep(1);
    
    // Блокируем взаимодействие с элементами подсказки
    document.querySelectorAll('button, .nav-btn, .stats-btn').forEach(el => {
        el.style.pointerEvents = 'none';
    });
}

// Показать шаг обучалки
function showTutorialStep(step) {
    // Скрываем все шаги
    document.querySelectorAll('.tutorial-step').forEach(el => {
        el.style.display = 'none';
    });
    
    // Показываем текущий шаг
    const stepEl = document.getElementById(`step-${step}`);
    if (stepEl) {
        stepEl.style.display = 'block';
        
        // Позиционируем подсказку
        positionTutorialStep(step);
    }
}

// Позиционирование подсказок
function positionTutorialStep(step) {
    let targetElement;
    let tutorialStepEl = document.getElementById(`step-${step}`);
    
    switch(step) {
        case 1: // Кнопка кражи
            targetElement = document.querySelector('.steal-btn');
            if (targetElement && tutorialStepEl) {
                const rect = targetElement.getBoundingClientRect();
                tutorialStepEl.style.top = rect.top + 'px';
                tutorialStepEl.style.left = rect.left + 'px';
                tutorialStepEl.style.width = rect.width + 'px';
                tutorialStepEl.style.height = rect.height + 'px';
            }
            break;
            
        case 2: // Кнопка статистики
            targetElement = document.querySelector('.stats-btn');
            if (targetElement && tutorialStepEl) {
                const rect = targetElement.getBoundingClientRect();
                tutorialStepEl.style.top = rect.top + 'px';
                tutorialStepEl.style.left = rect.left + 'px';
                tutorialStepEl.style.width = rect.width + 'px';
                tutorialStepEl.style.height = rect.height + 'px';
            }
            break;
            
        case 3: // Нижнее меню
            targetElement = document.querySelector('.bottom-nav');
            if (targetElement && tutorialStepEl) {
                const rect = targetElement.getBoundingClientRect();
                tutorialStepEl.style.top = rect.top + 'px';
                tutorialStepEl.style.left = rect.left + 'px';
                tutorialStepEl.style.width = rect.width + 'px';
                tutorialStepEl.style.height = rect.height + 'px';
            }
            break;
            
        case 4: // Быстрые действия
            targetElement = document.querySelector('.quick-actions');
            if (targetElement && tutorialStepEl) {
                const rect = targetElement.getBoundingClientRect();
                tutorialStepEl.style.top = rect.top + 'px';
                tutorialStepEl.style.left = rect.left + 'px';
                tutorialStepEl.style.width = rect.width + 'px';
                tutorialStepEl.style.height = rect.height + 'px';
            }
            break;
    }
}

// Следующий шаг
function nextTutorialStep() {
    tutorialStep++;
    
    if (tutorialStep <= 4) {
        showTutorialStep(tutorialStep);
    } else {
        finishTutorial();
    }
}

// Завершение обучалки
function finishTutorial() {
    tutorialActive = false;
    document.getElementById('interactive-tutorial').style.display = 'none';
    
    // Разблокируем элементы
    document.querySelectorAll('button, .nav-btn, .stats-btn').forEach(el => {
        el.style.pointerEvents = 'auto';
    });
    
    // Сохраняем, что обучалка пройдена
    localStorage.setItem('brainrot_interactive_tutorial_completed', 'true');
    
    // Показываем кнопку повтора
    document.getElementById('tutorial-redo-btn').style.display = 'block';
    
    showNotification('🎓 Обучение завершено! Удачи в игре!', 'success');
}

// Пропустить обучалку
function skipTutorial() {
    if (confirm('Пропустить обучение?')) {
        finishTutorial();
    }
}

// Проверка при загрузке
function checkInteractiveTutorial() {
    const tutorialCompleted = localStorage.getItem('brainrot_interactive_tutorial_completed');
    const gameStarted = localStorage.getItem('brainrot_final');
    
    // Показываем обучалку только новым игрокам
    if (!tutorialCompleted && !gameStarted) {
        // Запускаем с небольшой задержкой, чтобы страница загрузилась
        setTimeout(() => {
            startInteractiveTutorial();
        }, 1000);
    } else {
        // Показываем кнопку для повторного прохождения
        document.getElementById('tutorial-redo-btn').style.display = 'block';
    }
}

// Добавляем кнопку в настройки для повторного прохождения
function addTutorialToSettings() {
    const settingsSection = document.querySelector('.settings-section:last-child');
    if (settingsSection) {
        const tutorialBtn = document.createElement('button');
        tutorialBtn.className = 'data-btn';
        tutorialBtn.style.background = '#00ff88';
        tutorialBtn.style.color = '#000';
        tutorialBtn.innerHTML = '<i class="fas fa-graduation-cap"></i> Пройти обучение';
        tutorialBtn.onclick = function() {
            if (confirm('Пройти обучение заново?')) {
                startInteractiveTutorial();
            }
        };
        settingsSection.appendChild(tutorialBtn);
    }
}

// ========== ОБНОВЛЯЕМ ИНИЦИАЛИЗАЦИЮ ==========
window.addEventListener('load', function() {
    loadGame();
    updateCardDisplay();
    
    // Добавляем кнопку в настройки
    addTutorialToSettings();
    
    // Проверяем интерактивную обучалку
    checkInteractiveTutorial();
    
    // Восстановление энергии
    setInterval(() => {
        if (game.energy < game.maxEnergy) {
            game.energy++;
            updateUI();
        }
    }, 30000);
    
    // Приветственное уведомление
    showNotification('🎮 Добро пожаловать в Brainrot Stealer!', 'info');
});

// Добавляем функции в глобальную область
window.startInteractiveTutorial = startInteractiveTutorial;
window.nextTutorialStep = nextTutorialStep;
window.skipTutorial = skipTutorial;

// Обработка ресайза
window.addEventListener('resize', function() {
    if (tutorialActive) {
        positionTutorialStep(tutorialStep);
    }
});
