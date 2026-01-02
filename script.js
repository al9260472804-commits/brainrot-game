// ========== СИСТЕМА СТРАНИЦ ==========
const PAGES = {
    MAIN: 'main',
    SHOP: 'shop',
    CASINO: 'casino',
    BATTLE: 'battle',
    PROFILE: 'profile',
    SETTINGS: 'settings',
    ARENA: 'arena',
    MINIGAMES: 'minigames'
};

let currentPage = PAGES.MAIN;

// ========== ИНИЦИАЛИЗАЦИЯ СТРАНИЦ ==========
function initializePages() {
    // Создаем контейнер для страниц
    const container = document.createElement('div');
    container.id = 'page-container';
    container.style.cssText = `
        position: relative;
        min-height: 100vh;
    `;
    document.querySelector('.container').prepend(container);
    
    // Создаем все страницы
    createAllPages();
    
    // Показываем главную страницу
    showPage(PAGES.MAIN);
}

// ========== СОЗДАНИЕ ВСЕХ СТРАНИЦ ==========
function createAllPages() {
    const container = document.getElementById('page-container');
    
    // Главная страница (уже есть в HTML)
    const mainPage = document.querySelector('.game-page');
    if (!mainPage) {
        container.innerHTML += createMainPage();
    }
    
    // Другие страницы
    container.innerHTML += `
        ${createShopPage()}
        ${createCasinoPage()}
        ${createBattlePage()}
        ${createProfilePage()}
        ${createSettingsPage()}
        ${createArenaPage()}
        ${createMinigamesPage()}
    `;
}

// ========== ШАБЛОНЫ СТРАНИЦ ==========
function createMainPage() {
    return `
        <div id="main-page" class="page active">
            <!-- Весь текущий контент из index.html -->
            <div class="header">...</div>
            <div class="main-card">...</div>
            <!-- и т.д. -->
        </div>
    `;
}

function createShopPage() {
    return `
        <div id="shop-page" class="page">
            <div class="shop-header">
                <button class="back-btn" onclick="showPage('main')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-shopping-cart"></i> МАГАЗИН МЕМОВ</h2>
                <div class="shop-gold">
                    <i class="fas fa-coins"></i> <span id="shop-gold">${game.gold}</span>
                </div>
            </div>
            
            <div class="shop-tabs">
                <button class="shop-tab active" onclick="openShopTab('cases')">🎁 Кейсы</button>
                <button class="shop-tab" onclick="openShopTab('cards')">🃏 Карты</button>
                <button class="shop-tab" onclick="openShopTab('boosters')">⚡ Бустеры</button>
                <button class="shop-tab" onclick="openShopTab('skins')">🎨 Скины</button>
            </div>
            
            <div class="shop-content">
                <div id="shop-cases" class="shop-tab-content active">
                    <div class="shop-items-grid">
                        <!-- Кейсы будут загружены через JS -->
                    </div>
                </div>
                
                <div id="shop-cards" class="shop-tab-content">
                    <div class="cards-market">
                        <!-- Карты на продажу -->
                    </div>
                </div>
                
                <!-- Остальные табы -->
            </div>
        </div>
    `;
}

function createCasinoPage() {
    return `
        <div id="casino-page" class="page">
            <div class="casino-header">
                <button class="back-btn" onclick="showPage('main')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-dice"></i> КАЗИНО МЕМОВ</h2>
                <div class="casino-balance">
                    <i class="fas fa-coins"></i> <span id="casino-balance">${game.gold}</span>
                </div>
            </div>
            
            <div class="casino-games">
                <div class="casino-game" onclick="startSlotMachine()">
                    <div class="game-icon">🎰</div>
                    <div class="game-title">Слот-машина</div>
                    <div class="game-desc">50💰 за спин</div>
                </div>
                
                <div class="casino-game" onclick="startRoulette()">
                    <div class="game-icon">🎡</div>
                    <div class="game-title">Рулетка</div>
                    <div class="game-desc">x2 - x10</div>
                </div>
                
                <div class="casino-game" onclick="startDiceGame()">
                    <div class="game-icon">🎲</div>
                    <div class="game-title">Кости</div>
                    <div class="game-desc">Против ИИ</div>
                </div>
            </div>
        </div>
    `;
}

// ========== УПРАВЛЕНИЕ СТРАНИЦАМИ ==========
function showPage(pageName) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Показываем нужную страницу
    const page = document.getElementById(pageName + '-page');
    if (page) {
        page.classList.add('active');
        page.style.display = 'block';
        
        // Анимация появления
        page.style.animation = 'slideInRight 0.3s ease';
        
        // Обновляем данные на странице
        updatePageData(pageName);
    }
    
    currentPage = pageName;
    
    // Обновляем активную кнопку в навигации
    updateNavButtons();
}

function updatePageData(pageName) {
    switch(pageName) {
        case PAGES.SHOP:
            document.getElementById('shop-gold').textContent = game.gold;
            loadShopItems();
            break;
        case PAGES.CASINO:
            document.getElementById('casino-balance').textContent = game.gold;
            break;
        case PAGES.PROFILE:
            updateProfilePage();
            break;
    }
}

// ========== МАГАЗИН С ТОВАРАМИ ==========
function loadShopItems() {
    const casesGrid = document.querySelector('#shop-cases .shop-items-grid');
    if (!casesGrid) return;
    
    const shopCases = [
        {
            id: 'basic_case',
            name: '📦 Обычный кейс',
            price: 100,
            desc: 'Шанс: 70% common, 25% rare, 5% epic',
            color: '#4169E1',
            onBuy: () => buyCase('basic')
        },
        {
            id: 'premium_case',
            name: '💎 Премиум кейс',
            price: 500,
            desc: 'Шанс: 50% rare, 30% epic, 15% legendary, 5% mythic',
            color: '#9370DB',
            onBuy: () => buyCase('premium')
        },
        {
            id: 'legendary_case',
            name: '👑 Легендарный кейс',
            price: 2000,
            desc: 'Гарантированная легендарная карта!',
            color: '#FFD700',
            onBuy: () => buyCase('legendary')
        },
        {
            id: 'mystery_case',
            name: '❓ Загадочный кейс',
            price: 300,
            desc: 'Случайная редкость от common до mythic!',
            color: '#FF00FF',
            onBuy: () => buyCase('mystery')
        }
    ];
    
    casesGrid.innerHTML = shopCases.map(caseItem => `
        <div class="shop-item" onclick="buyWithConfirmation('${caseItem.id}', ${caseItem.price})">
            <div class="shop-item-header" style="border-color: ${caseItem.color}">
                <div class="shop-item-icon">${caseItem.name.split(' ')[0]}</div>
                <div class="shop-item-name">${caseItem.name}</div>
            </div>
            <div class="shop-item-price">
                <i class="fas fa-coins"></i> ${caseItem.price}
            </div>
            <div class="shop-item-desc">${caseItem.desc}</div>
            <button class="buy-btn" onclick="event.stopPropagation(); buyWithConfirmation('${caseItem.id}', ${caseItem.price})">
                Купить
            </button>
        </div>
    `).join('');
    
    // Загружаем карты на продажу
    loadShopCards();
}

// ========== КАЗИНО И МИНИ-ИГРЫ ==========
function startSlotMachine() {
    if (game.gold < 50) {
        showNotification("❌ Недостаточно голды", "Нужно минимум 50💰");
        return;
    }
    
    game.gold -= 50;
    updateUI();
    
    // Анимация слот-машины
    const slots = ['🍆', '🍑', '💩', '👑', '💎', '🔥'];
    let result = [];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            result.push(slots[Math.floor(Math.random() * slots.length)]);
            
            if (i === 2) {
                // Все три слота остановились
                checkSlotResult(result);
            }
        }, i * 500);
    }
}

function checkSlotResult(symbols) {
    const [a, b, c] = symbols;
    let win = 0;
    
    if (a === b && b === c) {
        // Джекпот!
        win = 1000;
    } else if (a === b || b === c || a === c) {
        // Две одинаковых
        win = 100;
    }
    
    if (win > 0) {
        game.gold += win;
        showNotification("🎰 ДЖЕКПОТ!", `Вы выиграли ${win}💰!\n${symbols.join(' ')}`);
    } else {
        showNotification("🎰 Неудача", `Попробуйте еще раз!\n${symbols.join(' ')}`);
    }
    
    updateUI();
}

// ========== БОЕВАЯ АРЕНА ==========
function createArenaPage() {
    return `
        <div id="arena-page" class="page">
            <div class="arena-header">
                <button class="back-btn" onclick="showPage('main')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-crosshairs"></i> БОЕВАЯ АРЕНА</h2>
                <div class="arena-stats">
                    Побед: <span id="arena-wins">0</span>
                </div>
            </div>
            
            <div class="arena-modes">
                <div class="arena-mode active" onclick="startArenaBattle('1v1')">
                    <div class="mode-icon">⚔️</div>
                    <div class="mode-title">1 vs 1</div>
                    <div class="mode-desc">Дуэль с игроком</div>
                </div>
                
                <div class="arena-mode" onclick="startArenaBattle('royale')">
                    <div class="mode-icon">👑</div>
                    <div class="mode-title">Баттл-рояль</div>
                    <div class="mode-desc">100 игроков</div>
                </div>
                
                <div class="arena-mode" onclick="startArenaBattle('clan')">
                    <div class="mode-icon">🛡️</div>
                    <div class="mode-title">Клановая война</div>
                    <div class="mode-desc">5 vs 5</div>
                </div>
            </div>
            
            <div class="arena-leaderboard">
                <h3><i class="fas fa-crown"></i> ТОП ИГРОКОВ</h3>
                <div id="arena-top-players">
                    <!-- Загрузятся через JS -->
                </div>
            </div>
        </div>
    `;
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
window.addEventListener('DOMContentLoaded', function() {
    console.log("Запуск с системой страниц...");
    
    // Инициализируем страницы
    initializePages();
    
    // Загружаем игру
    loadGame();
    
    // Назначаем обработчики для навигации
    setupNavigation();
    
    console.log("Система страниц запущена!");
});

// ========== НАВИГАЦИОННОЕ МЕНЮ ==========
function createNavigation() {
    const navHTML = `
        <nav class="main-nav">
            <button class="nav-btn active" onclick="showPage('main')">
                <i class="fas fa-home"></i>
                <span>Главная</span>
            </button>
            <button class="nav-btn" onclick="showPage('shop')">
                <i class="fas fa-shopping-cart"></i>
                <span>Магазин</span>
            </button>
            <button class="nav-btn" onclick="showPage('casino')">
                <i class="fas fa-dice"></i>
                <span>Казино</span>
            </button>
            <button class="nav-btn" onclick="showPage('battle')">
                <i class="fas fa-crosshairs"></i>
                <span>Битва</span>
            </button>
            <button class="nav-btn" onclick="showPage('profile')">
                <i class="fas fa-user"></i>
                <span>Профиль</span>
            </button>
        </nav>
    `;
    
    document.querySelector('.container').innerHTML += navHTML;
}

function updateNavButtons() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`.nav-btn[onclick*="${currentPage}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Добавляем в конце файла:
window.showPage = showPage;
window.startSlotMachine = startSlotMachine;
window.buyWithConfirmation = function(itemId, price) {
    if (game.gold >= price) {
        game.gold -= price;
        
        // В зависимости от itemId
        switch(itemId) {
            case 'basic_case':
                buyCase('basic');
                break;
            case 'premium_case':
                buyCase('premium');
                break;
            // и т.д.
        }
        
        updateUI();
        showNotification("✅ Покупка успешна!", `Куплен: ${itemId}`);
    } else {
        showNotification("❌ Недостаточно голды", `Нужно: ${price}💰`);
    }
};
