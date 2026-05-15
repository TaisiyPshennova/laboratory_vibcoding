document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const input = document.getElementById('cmdInput');
    const terminalBody = document.getElementById('terminalBody');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const welcomeTextEl = document.getElementById('welcomeText');
    const yearSpan = document.getElementById('year');

    yearSpan.textContent = new Date().getFullYear();

    const welcomeMsg = 'Привет! Я Тася Пшеннова — студентка СПбПУ, направление МОАИС.';
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < welcomeMsg.length) {
            welcomeTextEl.textContent += welcomeMsg.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        } else {
            welcomeTextEl.classList.remove('typewriter');
        }
    }
    typeWriter(); // запускаем сразу после готовности DOM

    const data = {
        help: `Доступные команды:\n  help      - показать это сообщение\n  about     - обо мне\n  skills    - навыки\n  projects  - проекты\n  contact   - контакты\n  clear     - очистить экран`,
        about: `Имя: Пшеннова Таисия (Тася)\nУниверситет: СПбПУ Петра Великого\nНаправление: Математическое обеспечение и администрирование информационных систем\nКурс: изучаю C++, алгоритмы, базы данных, веб-технологии.\nИнтересуюсь системным программированием и автоматизацией.`,
        skills: `C++ (STL, базовые алгоритмы)\nC (основы)\nPython (скрипты, автоматизация)\nSQL (базовые запросы)\nGit, GitHub, CI/CD\nLinux (bash, командная строка)\nАнглийский язык (Intermediate)`,
        projects: `1. Лабораторная работа "CV в стиле терминала" (этот проект) — CI/CD, GitHub Pages\n2. Консольная утилита обработки текста (C++)\n3. Моделирование банковской очереди (C++, ООП)\n4. Мини-сайт портфолио (HTML/CSS/JS)`,
        contact: `Email: ognevadragoziy@yandex.ru\nTelegram: @PenBalfour\nGitHub: github.com/твой-username (замени на свой)\nРада новым знакомствам и предложениям о сотрудничестве!`
    };

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = input.value.trim().toLowerCase();
            if (cmd === '') return;
            appendLine(`$ ${cmd}`, 'cmd');
            if (cmd === 'clear') {
                output.innerHTML = '';
            } else if (data[cmd]) {
                appendLine(data[cmd], 'output-text');
            } else {
                appendLine(`Команда не найдена: ${cmd}. Введи help для списка.`, 'error');
            }
            input.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    function appendLine(text, className = '') {
        const p = document.createElement('p');
        p.className = `line ${className}`;
        p.textContent = text;
        output.appendChild(p);
    }

    window.addEventListener('scroll', () => {
        scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    terminalBody.addEventListener('click', () => input.focus());
});
