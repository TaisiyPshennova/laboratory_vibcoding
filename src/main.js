const output = document.getElementById('output');
const input = document.getElementById('cmdInput');
const terminalBody = document.getElementById('terminalBody');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const welcomeTextEl = document.getElementById('welcomeText');
const yearSpan = document.getElementById('year');


// Автоматический год
yearSpan.textContent = new Date().getFullYear();

// Эффект печати приветствия
const welcomeMsg = 'Привет! Я Тася Пшеннова — студентка СПбПУ, направление МОАИС.';
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
    about: `Имя: Пшеннова Таисия (Тася)
Университет: СПбПУ Петра Великого
Направление: Математическое обеспечение и администрирование информационных систем
Курс: изучаю C++, алгоритмы, базы данных, веб-технологии.
Интересуюсь системным программированием и автоматизацией.`,
    skills: `C++ (STL, базовые алгоритмы)
C (основы)
Python (скрипты, автоматизация)
SQL (базовые запросы)
Git, GitHub, CI/CD
Linux (bash, командная строка)
Английский язык (Intermediate)`,
    projects: `1. Лабораторная работа "CV в стиле терминала" (этот проект) — CI/CD, GitHub Pages
2. Консольная утилита обработки текста (C++)
3. Моделирование банковской очереди (C++, ООП)
4. Мини-сайт портфолио (HTML/CSS/JS)`,
    contact: `Email: ognevadragoziy@yandex.ru
Telegram: @PenBalfour
GitHub: github.com/TaissiyPshennova
Рада новым знакомствам и предложениям о сотрудничестве!`
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
