// ========== СИСТЕМА СТРАНИЦ ==========
const PAGES = {
    MAIN: 'main',
    SHOP: 'shop',
    CASINO: 'casino',
    BATTLE: 'battle',
    PROFILE: 'profile',
    COLLECTION: 'collection',
    SETTINGS: 'settings',
    FRIENDS: 'friends'
};

let currentPage = PAGES.MAIN;

// ========== ИНИЦИАЛИЗАЦИЯ СТРАНИЦ ==========
function initPages() {
    console.log("Инициализация страниц...");
    
    // Создаем контейнер для страниц если его нет
    let pagesContainer = document.getElementById('pages-container');
    if (!pagesContainer) {
        pagesContainer = document.createElement('div');
        pagesContainer.id = 'pages-container';
        pagesContainer.style.cssText = 'min-height: 100vh;';
        document.querySelector('.app-container').insertBefore(pagesContainer, document.querySelector('.bottom-nav'));
    }
    
    // Создаем все страницы
    createAllPages();
    
    // Показываем главную страницу
    showPage(PAGES.MAIN);
}

// ========== СОЗДАНИЕ ВСЕХ СТРАНИЦ ==========
function createAllPages() {
    const container = document.getElementById('pages-container');
    if (!container) return;
    
    // Главная страница (перенесем текущий контент)
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const mainPage = document.createElement('div');
        mainPage.id = 'main-page';
        mainPage.className = 'page active';
        mainPage.innerHTML = mainContent.innerHTML;
        container.appendChild(mainPage);
        mainContent.remove();
    }
    
    // Создаем остальные страницы
    container.innerHTML += `
        <!-- Страница магазина -->
        <div id="shop-page" class="page" style="display: none;">
            <div class="page-header">
                <button class="back-btn" onclick="showPage('${PAGES.MAIN}')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-shopping-cart"></i> МАГАЗИН</h2>
                <div class="shop-balance">
                    <i class="fas fa-coins"></i> <span id="shop-gold">${game.gold}</span>
                </div>
            </div>
            <div class="shop-content" id="shop-content">
                <!-- Товары загрузятся через JS -->
            </div>
        </div>

        <!-- Страница казино -->
        <div id="casino-page" class="page" style="display: none;">
            <div class="page-header">
                <button class="back-btn" onclick="showPage('${PAGES.MAIN}')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-dice"></i> КАЗИНО</h2>
                <div class="casino-balance">
                    <i class="fas fa-coins"></i> <span id="casino-gold">${game.gold}</span>
                </div>
            </div>
            <div class="casino-content">
                <div class="casino-game" onclick="playSlotMachine()">
                    <div class="game-icon">🎰</div>
                    <h3>Слот-машина</h3>
                    <p>50💰 за спин</p>
                    <div class="game-odds">x2 - x100</div>
                </div>
                <div class="casino-game" onclick="playRoulette()">
                    <div class="game-icon">🎡</div>
                    <h3>Рулетка</h3>
                    <p>100💰 за ставку</p>
                    <div class="game-odds">x1.5 - x36</div>
                </div>
                <div class="casino-game" onclick="playBlackjack()">
                    <div class="game-icon">🃏</div>
                    <h3>Блэкджек</h3>
                    <p>200💰 минимальная</p>
                    <div class="game-odds">Против дилера</div>
                </div>
            </div>
        </div>

        <!-- Страница битвы -->
        <div id="battle-page" class="page" style="display: none;">
            <div class="page-header">
                <button class="back-btn" onclick="showPage('${PAGES.MAIN}')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-crosshairs"></i> БИТВА</h2>
            </div>
            <div class="battle-content">
                <div class="battle-mode" onclick="startDuel()">
                    <h3>⚔ Дуэль</h3>
                    <p>1 на 1 с другим игроком</p>
                    <div class="battle-reward">Награда: 100💰</div>
                </div>
                <div class="battle-mode" onclick="startTournament()">
                    <h3>🏆 Турнир</h3>
                    <p>16 игроков, выживает сильнейший</p>
                    <div class="battle-reward">Приз: 1000💰</div>
                </div>
                <div class="battle-mode" onclick="startClanWar()">
                    <h3>🛡 Клановая война</h3>
                    <p>5 на 5, захват территории</p>
                    <div class="battle-reward">Награда клану: 5000💰</div>
                </div>
            </div>
        </div>

        <!-- Страница профиля -->
        <div id="profile-page" class="page" style="display: none;">
            <div class="page-header">
                <button class="back-btn" onclick="showPage('${PAGES.MAIN}')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-user"></i> ПРОФИЛЬ</h2>
            </div>
            <div class="profile-content">
                <div class="profile-card">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}" 
                         alt="Аватар" 
                         class="profile-avatar"
                         id="profile-avatar">
                    <div class="profile-info">
                        <h3 id="profile-name">Игрок #${Math.floor(Math.random()*10000)}</h3>
                        <div class="profile-stats">
                            <div>Уровень: <span id="profile-level">${game.level}</span></div>
                            <div>Рейтинг: <span id="profile-rating">${game.rating}</span></div>
                            <div>Карт: <span id="profile-cards">${game.cards.length}</span></div>
                        </div>
                    </div>
                </div>
                <div class="profile-details">
                    <h3>📊 Статистика</h3>
                    <div class="stats-grid">
                        <div>Всего краж: <span id="profile-total-steals">${game.totalSteals}</span></div>
                        <div>Успешных: <span id="profile-success-steals">${game.successfulSteals}</span></div>
                        <div>Процент успеха: <span id="profile-success-rate">${game.totalSteals > 0 ? Math.round((game.successfulSteals/game.totalSteals)*100) : 0}%</span></div>
                        <div>Заработано голды: <span id="profile-total-gold">${game.gold}</span></div>
                    </div>
                </div>
                <button onclick="changeAvatar()" class="profile-btn">
                    <i class="fas fa-pencil-alt"></i> Сменить аватар
                </button>
            </div>
        </div>

        <!-- Страница коллекции -->
        <div id="collection-page" class="page" style="display: none;">
            <div class="page-header">
                <button class="back-btn" onclick="showPage('${PAGES.MAIN}')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-layer-group"></i> КОЛЛЕКЦИЯ</h2>
                <div class="collection-stats">
                    Карт: <span id="collection-total">${game.cards.length}</span>
                </div>
            </div>
            <div class="full-collection" id="full-collection">
                <!-- Все карты загрузятся через JS -->
            </div>
        </div>

        <!-- Страница друзей -->
        <div id="friends-page" class="page" style="display: none;">
            <div class="page-header">
                <button class="back-btn" onclick="showPage('${PAGES.MAIN}')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-users"></i> ДРУЗЬЯ</h2>
            </div>
            <div class="friends-content">
                <div class="referral-section">
                    <h3>👥 Пригласи друга</h3>
                    <div class="referral-code">
                        <code id="referral-code-display">BR-${Math.random().toString(36).substr(2, 8).toUpperCase()}</code>
                        <button onclick="copyReferralCode()" class="copy-btn">
                            <i class="fas fa-copy"></i> Копировать
                        </button>
                    </div>
                    <p class="referral-info">
                        Дайте эту ссылку другу. Когда он зарегистрируется, вы оба получите 500💰!
                    </p>
                </div>
                <div class="friends-list">
                    <h3>📋 Список друзей</h3>
                    <div id="friends-list">
                        <div class="empty-state">
                            <i class="fas fa-user-plus"></i>
                            <p>У вас пока нет друзей</p>
                            <p class="small">Пригласите друзей по реферальной ссылке</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Страница настроек -->
        <div id="settings-page" class="page" style="display: none;">
            <div class="page-header">
                <button class="back-btn" onclick="showPage('${PAGES.MAIN}')">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <h2><i class="fas fa-cog"></i> НАСТРОЙКИ</h2>
            </div>
            <div class="settings-content">
                <div class="settings-section">
                    <h3><i class="fas fa-volume-up"></i> Звук</h3>
                    <div class="setting-option">
                        <span>Громкость эффектов</span>
                        <input type="range" min="0" max="100" value="70" class="slider" id="sfx-volume">
                    </div>
                    <div class="setting-option">
                        <span>Громкость музыки</span>
                        <input type="range" min="0" max="100" value="50" class="slider" id="music-volume">
                    </div>
                </div>
                <div class="settings-section">
                    <h3><i class="fas fa-palette"></i> Внешний вид</h3>
                    <div class="theme-selector">
                        <button class="theme-option" onclick="changeTheme('dark')">
                            <div class="theme-preview dark"></div>
                            <span>Темная</span>
                        </button>
                        <button class="theme-option" onclick="changeTheme('light')">
                            <div class="theme-preview light"></div>
                            <span>Светлая</span>
                        </button>
                        <button class="theme-option" onclick="changeTheme('blue')">
                            <div class="theme-preview blue"></div>
                            <span>Синяя</span>
                        </button>
                    </div>
                </div>
                <div class="settings-section">
                    <h3><i class="fas fa-database"></i> Данные</h3>
                    <button onclick="exportSave()" class="data-btn">
                        <i class="fas fa-download"></i> Экспорт сохранения
                    </button>
                    <button onclick="importSave()" class="data-btn">
                        <i class="fas fa-upload"></i> Импорт сохранения
                    </button>
                    <button onclick="resetGame()" class="data-btn danger">
                        <i class="fas fa-trash"></i> Сбросить игру
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ========== УПРАВЛЕНИЕ СТРАНИЦАМИ ==========
function showPage(pageId) {
    console.log("Переход на страницу:", pageId);
    
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });
    
    // Показываем выбранную страницу
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
        
        // Обновляем данные на странице
        updatePageContent(pageId);
        
        // Обновляем активную кнопку в навигации
        updateNavigation(pageId);
        
        // Сохраняем текущую страницу
        currentPage = pageId;
        
        // Анимация появления
        targetPage.style.animation = 'fadeIn 0.3s ease';
    } else {
        console.error("Страница не найдена:", pageId);
        // Если страницы нет, показываем главную
        showPage(PAGES.MAIN);
    }
}

function updatePageContent(pageId) {
    switch(pageId) {
        case PAGES.SHOP:
            loadShopContent();
            break;
        case PAGES.CASINO:
            updateCasinoBalance();
            break;
        case PAGES.PROFILE:
            updateProfileContent();
            break;
        case PAGES.COLLECTION:
            loadFullCollection();
            break;
        case PAGES.FRIENDS:
            updateFriendsList();
            break;
    }
}

function updateNavigation(pageId) {
    // Обновляем нижнее меню
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Находим кнопку для этой страницы
    const navButton = Array.from(document.querySelectorAll('.nav-item')).find(btn => {
        return btn.getAttribute('onclick')?.includes(pageId) || 
               btn.getAttribute('onclick')?.includes(`'${pageId}'`);
    });
    
    if (navButton) {
        navButton.classList.add('active');
    }
}

// ========== ФУНКЦИИ ДЛЯ СТРАНИЦ ==========

// МАГАЗИН
function openShop() {
    showPage(PAGES.SHOP);
}

function loadShopContent() {
    const shopContent = document.getElementById('shop-content');
    if (!shopContent) return;
    
    const shopItems = [
        {
            id: 'basic_case',
            name: '📦 Обычный кейс',
            price: 100,
            description: 'Шанс: 70% common, 25% rare, 5% epic',
            color: '#3B82F6',
            icon: '📦'
        },
        {
            id: 'premium_case',
            name: '💎 Премиум кейс',
            price: 500,
            description: 'Шанс: 50% rare, 30% epic, 15% legendary, 5% mythic',
            color: '#8B5CF6',
            icon: '💎'
        },
        {
            id: 'energy_booster',
            name: '⚡ Бустер энергии',
            price: 50,
            description: '+50 энергии сразу',
            color: '#10B981',
            icon: '⚡'
        },
        {
            id: 'rating_booster',
            name: '⭐ Бустер рейтинга',
            price: 200,
            description: 'x2 рейтинг на 1 час',
            color: '#F59E0B',
            icon: '⭐'
        }
    ];
    
    shopContent.innerHTML = `
        <div class="shop-balance-display">
            <div>Ваш баланс:</div>
            <div class="balance-amount">
                <i class="fas fa-coins"></i> <span id="shop-balance-gold">${game.gold}</span>
            </div>
        </div>
        <div class="shop-items-grid">
            ${shopItems.map(item => `
                <div class="shop-item" onclick="buyItem('${item.id}')">
                    <div class="shop-item-icon" style="background: ${item.color}20; border-color: ${item.color}">
                        <span style="font-size: 32px;">${item.icon}</span>
                    </div>
                    <div class="shop-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <div class="shop-item-price">
                            <i class="fas fa-coins"></i> ${item.price}
                        </div>
                    </div>
                    <button class="buy-btn" onclick="event.stopPropagation(); buyItem('${item.id}')">
                        Купить
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

function buyItem(itemId) {
    const prices = {
        'basic_case': 100,
        'premium_case': 500,
        'energy_booster': 50,
        'rating_booster': 200
    };
    
    const price = prices[itemId];
    
    if (game.gold >= price) {
        game.gold -= price;
        
        switch(itemId) {
            case 'basic_case':
                game.inventory.basicCases = (game.inventory.basicCases || 0) + 1;
                showNotification('🎁 Кейс куплен!', 'Обычный кейс добавлен в инвентарь', 'success');
                break;
            case 'premium_case':
                game.inventory.premiumCases = (game.inventory.premiumCases || 0) + 1;
                showNotification('💎 Премиум кейс куплен!', 'Премиум кейс добавлен в инвентарь', 'success');
                break;
            case 'energy_booster':
                game.energy = Math.min(game.energy + 50, game.maxEnergy);
                showNotification('⚡ Энергия пополнена!', '+50 к энергии', 'success');
                break;
            case 'rating_booster':
                showNotification('⭐ Бустер активирован!', 'x2 рейтинг на 1 час', 'success');
                // Здесь можно добавить логику бустера
                break;
        }
        
        updateUI();
        loadShopContent(); // Обновляем магазин
    } else {
        showNotification('❌ Недостаточно голды', `Нужно ещё ${price - game.gold}💰`, 'error');
    }
}

// КАЗИНО
function openCasino() {
    showPage(PAGES.CASINO);
}

function updateCasinoBalance() {
    const casinoGold = document.getElementById('casino-gold');
    if (casinoGold) casinoGold.textContent = game.gold;
}

function playSlotMachine() {
    if (game.gold < 50) {
        showNotification('❌ Недостаточно голды', 'Нужно 50💰 для игры', 'error');
        return;
    }
    
    game.gold -= 50;
    
    // Анимация слот-машины
    showNotification('🎰 Слот-машина', 'Вращаем барабаны...', 'info');
    
    setTimeout(() => {
        const symbols = ['🍒', '🍋', '🍊', '⭐', '💎', '7️⃣'];
        const result = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        if (result[0] === result[1] && result[1] === result[2]) {
            // Джекпот
            const winAmount = 1000;
            game.gold += winAmount;
            showNotification('🎰 ДЖЕКПОТ!', `${result.join(' ')}\nВы выиграли ${winAmount}💰!`, 'success');
        } else if (result[0] === result[1] || result[1] === result[2]) {
            // Две одинаковые
            const winAmount = 100;
            game.gold += winAmount;
            showNotification('🎰 Выигрыш!', `${result.join(' ')}\nВы выиграли ${winAmount}💰!`, 'success');
        } else {
            showNotification('🎰 Попробуйте ещё!', `${result.join(' ')}\nК сожалению, вы проиграли`, 'warning');
        }
        
        updateUI();
        updateCasinoBalance();
    }, 2000);
}

// БИТВА
function openBattle() {
    showPage(PAGES.BATTLE);
}

function startDuel() {
    if (game.energy < 30) {
        showNotification('❌ Недостаточно энергии', 'Нужно 30⚡ для дуэли', 'error');
        return;
    }
    
    game.energy -= 30;
    
    showNotification('⚔ Поиск противника', 'Ищем достойного соперника...', 'info');
    
    setTimeout(() => {
        const opponentRating = game.rating + Math.floor(Math.random() * 300) - 150;
        const winChance = 0.5 + (game.rating - opponentRating) / 1000;
        
        if (Math.random() < winChance) {
            // Победа
            const ratingGain = Math.max(10, Math.floor((opponentRating - game.rating) / 10) + 15);
            const goldGain = 100;
            
            game.rating += ratingGain;
            game.gold += goldGain;
            
            showNotification('🎉 ПОБЕДА!', 
                `Вы победили противника с рейтингом ${opponentRating}\n+${ratingGain}⭐ +${goldGain}💰`, 
                'success');
        } else {
            // Поражение
            const ratingLoss = Math.max(5, Math.floor((game.rating - opponentRating) / 20));
            game.rating -= ratingLoss;
            
            showNotification('💀 Поражение', 
                `Проиграли противнику с рейтингом ${opponentRating}\n-${ratingLoss}⭐`, 
                'error');
        }
        
        updateUI();
    }, 1500);
}

// ПРОФИЛЬ
function openProfile() {
    showPage(PAGES.PROFILE);
}

function updateProfileContent() {
    // Обновляем статистику профиля
    const elements = {
        'profile-level': game.level,
        'profile-rating': game.rating,
        'profile-cards': game.cards.length,
        'profile-total-steals': game.totalSteals,
        'profile-success-steals': game.successfulSteals,
        'profile-success-rate': game.totalSteals > 0 ? Math.round((game.successfulSteals/game.totalSteals)*100) : 0,
        'profile-total-gold': game.gold
    };
    
    for (const [id, value] of Object.entries(elements)) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
}

function changeAvatar() {
    const avatars = [
        'https://api.dicebear.com/7.x/avataaars/svg?seed=skibidi',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=toilet',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=sigma',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=gyatt',
        'https://api.dicebear.com/7.x/avataaars/svg?seed=ohio'
    ];
    
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const avatarImg = document.getElementById('profile-avatar');
    if (avatarImg) {
        avatarImg.src = randomAvatar;
        showNotification('✅ Аватар изменен!', 'Новый крутой аватар установлен', 'success');
    }
}

// КОЛЛЕКЦИЯ
function openCollection() {
    showPage(PAGES.COLLECTION);
}

function loadFullCollection() {
    const collectionContainer = document.getElementById('full-collection');
    if (!collectionContainer) return;
    
    if (game.cards.length === 0) {
        collectionContainer.innerHTML = `
            <div class="empty-collection">
                <i class="fas fa-layer-group"></i>
                <h3>Коллекция пуста</h3>
                <p>Украдите первую карту на главной странице!</p>
            </div>
        `;
        return;
    }
    
    // Группируем карты по редкости
    const cardsByRarity = {};
    BRAINROT_CARDS.forEach(card => {
        if (!cardsByRarity[card.rarity]) cardsByRarity[card.rarity] = [];
        cardsByRarity[card.rarity].push(card);
    });
    
    let html = '';
    const rarityOrder = ['mythic', 'legendary', 'epic', 'rare', 'common'];
    
    rarityOrder.forEach(rarity => {
        if (cardsByRarity[rarity]) {
            html += `<h3 class="rarity-title rarity-${rarity}">${rarity.toUpperCase()}</h3>`;
            html += `<div class="rarity-cards">`;
            
            cardsByRarity[rarity].forEach(card => {
                const hasCard = game.cards.includes(card.id);
                html += `
                    <div class="collection-card-item ${hasCard ? 'owned' : 'missing'}">
                        <img src="${card.image}" alt="${card.title}">
                        <div class="card-status">
                            ${hasCard ? '✅' : '❌'}
                        </div>
                        <div class="card-name">${card.title}</div>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
    });
    
    collectionContainer.innerHTML = html;
}

// ДРУЗЬЯ
function openFriends() {
    showPage(PAGES.FRIENDS);
}

function copyReferralCode() {
    const code = document.getElementById('referral-code-display')?.textContent || 'BRAINROT-123';
    navigator.clipboard.writeText(`https://brainrot-game.com?ref=${code}`);
    showNotification('🔗 Ссылка скопирована!', 'Отправьте другу, чтобы получить бонусы', 'success');
}

// НАСТРОЙКИ
function openSettings() {
    showPage(PAGES.SETTINGS);
}

function changeTheme(theme) {
    const themes = {
        dark: ['#0A0E17', '#111827', '#1A2236'],
        light: ['#F9FAFB', '#F3F4F6', '#FFFFFF'],
        blue: ['#0F172A', '#1E293B', '#334155']
    };
    
    const root = document.documentElement;
    const themeColors = themes[theme] || themes.dark;
    
    root.style.setProperty('--bg-primary', themeColors[0]);
    root.style.setProperty('--bg-secondary', themeColors[1]);
    root.style.setProperty('--bg-card', themeColors[2]);
    
    localStorage.setItem('brainrot-theme', theme);
    showNotification('🎨 Тема изменена', `Активирована ${theme} тема`, 'success');
}

// ========== ИНИЦИАЛИЗАЦИЯ ИГРЫ ==========
window.addEventListener('DOMContentLoaded', function() {
    console.log("Запуск Brainrot Stealer...");
    
    // Инициализируем страницы
    initPages();
    
    // Назначаем обработчики кнопкам
    setupEventListeners();
    
    // Загружаем игру
    loadGame();
    
    // Авто-восстановление энергии
    setInterval(() => {
        if (game.energy < game.maxEnergy) {
            game.energy++;
            updateUI();
        }
    }, 30000);
    
    console.log("Игра запущена!");
});

function setupEventListeners() {
    // Кнопка кражи
    const stealBtn = document.getElementById('steal-btn');
    if (stealBtn) {
        stealBtn.addEventListener('click', stealCard);
    }
    
    // Быстрые действия на главной
    const dailyBtn = document.querySelector('.action-daily');
    if (dailyBtn) dailyBtn.onclick = dailyReward;
    
    const shopBtn = document.querySelector('.action-shop');
    if (shopBtn) shopBtn.onclick = openShop;
    
    const casinoBtn = document.querySelector('.action-casino');
    if (casinoBtn) casinoBtn.onclick = openCasino;
    
    const friendsBtn = document.querySelector('.action-friends');
    if (friendsBtn) friendsBtn.onclick = openFriends;
}

// ========== ГЛОБАЛЬНЫЙ ЭКСПОРТ ФУНКЦИЙ ==========
window.showPage = showPage;
window.openShop = openShop;
window.openCasino = openCasino;
window.openBattle = openBattle;
window.openProfile = openProfile;
window.openFriends = openFriends;
window.openCollection = openCollection;
window.openSettings = openSettings;

window.buyItem = buyItem;
window.playSlotMachine = playSlotMachine;
window.startDuel = startDuel;
window.changeAvatar = changeAvatar;
window.copyReferralCode = copyReferralCode;
window.changeTheme = changeTheme;

// Добавляем недостающие функции для нижнего меню
document.addEventListener('DOMContentLoaded', function() {
    // Назначаем обработчики для нижнего меню
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        if (onclick && onclick.includes("showPage")) {
            // Уже есть обработчик
        } else {
            // Назначаем обработчик в зависимости от текста
            const text = btn.textContent.trim().toLowerCase();
            if (text.includes('главн')) btn.onclick = () => showPage('main');
            else if (text.includes('коллекц')) btn.onclick = () => showPage('collection');
            else if (text.includes('магазин')) btn.onclick = openShop;
            else if (text.includes('битв')) btn.onclick = openBattle;
            else if (text.includes('профиль')) btn.onclick = openProfile;
        }
    });
});
