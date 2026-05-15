const output = document.getElementById('output');
const input = document.getElementById('cmdInput');
const terminalBody = document.getElementById('terminalBody');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const welcomeTextEl = document.getElementById('welcomeText');
const yearSpan = document.getElementById('year');

// Автоматический год
yearSpan.textContent = new Date().getFullYear();

// Эффект печати приветствия
const welcomeMsg = 'Привет! Я Тася — начинающий C++ разработчик.';
let charIndex = 0;
function typeWriter() {
    if (charIndex < welcomeMsg.length) {
        welcomeTextEl.textContent += welcomeMsg.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
    } else {
        welcomeTextEl.classList.remove('typewriter'); // убираем курсор после печати
    }
}
window.addEventListener('load', typeWriter);

// Данные для команд
const data = {
    help: `Доступные команды:
  help      - показать это сообщение
  about     - обо мне
  skills    - навыки
  projects  - проекты
  contact   - контакты
  clear     - очистить экран`,
    about: `Имя: Тася
Образование: СПБПУ, направление "МАТОБЕС"
Курс: изучаю C++, алгоритмы, структуры данных.
Увлечён системным программированием и разработкой высокопроизводительных приложений.`,
    skills: `C++ (STL, CMake, многопоточность)
C (базовые знания)
Python (скрипты, автоматизация)
Git, GitHub Actions, CI/CD
Linux (bash, командная строка)`,
    projects: `1. Консольная игра "Змейка" (C++, ncurses) — [ссылка на репозиторий]
2. Парсер логов (C++, регулярные выражения) — [ссылка]
3. Калькулятор с обратной польской записью (C++, стек) — [ссылка]
4. Лабораторная CV (этот проект) — CI/CD, GitHub Pages`,
    contact: `Email:ognevadragoziy@yandex.ru
Telegram: @PenBalfour
GitHub: github.com/TaisiyPshennova
Свяжись со мной — буду рад сотрудничеству и обмену опытом!`
};

// Обработка команд
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = input.value.trim().toLowerCase();
        if (cmd === '') return;

        // Вывод строки с командой
        appendLine(`$ ${cmd}`, 'cmd');

        if (cmd === 'clear') {
            output.innerHTML = '';
        } else if (data[cmd]) {
            appendLine(data[cmd], 'output-text');
        } else {
            appendLine(`Команда не найдена: ${cmd}. Введи help для списка.`, 'error');
        }

        input.value = '';
        // Автопрокрутка вниз
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

function appendLine(text, className = '') {
    const p = document.createElement('p');
    p.className = `line ${className}`;
    p.textContent = text;
    output.appendChild(p);
}

// Кнопка "наверх"
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Фокус на input при клике в любом месте терминала
terminalBody.addEventListener('click', () => input.focus());
