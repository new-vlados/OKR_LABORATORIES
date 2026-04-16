document.addEventListener("DOMContentLoaded", () => {
    // 1. Зміна фону сторінки на 30 секунд
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#e0f7fa"; // Світло-блакитний відтінок
    setTimeout(() => {
        document.body.style.backgroundColor = originalBg;
    }, 30000); // 30 секунд

    // 2. Функції, змінні, умови, цикли
    // Власна функція «Діалог з користувачем»
    function userDialog() {
        let attempts = 3;
        let isCorrect = false;
        
        while (attempts > 0 && !isCorrect) {
            let answer = prompt(`Вікторина: Скільки грамів важить стандартний м'ячик для настільного тенісу? (Залишилось спроб: ${attempts})`, "");
            
            if (answer === null) break; // Якщо натиснули "Скасувати"
            
            if (answer.trim() === "2.7" || answer.trim() === "2,7") {
                alert("Абсолютно правильно!");
                isCorrect = true;
            } else {
                attempts--;
                if (attempts > 0) alert("Неправильно. Спробуйте ще раз!");
                else alert("Спроби вичерпано. Правильна відповідь: 2.7 г.");
            }
        }
    }

    // Інформація про розробника (з параметром за замовчуванням)
    function showDeveloperInfo(lastName, firstName, position = "Front-end розробник") {
        const devBlock = document.createElement("div");
        devBlock.innerHTML = `<p style="text-align: right; font-size: 0.9em; color: #004080; margin-top: 15px;">Розробив: <strong>${lastName} ${firstName}</strong> (${position})</p>`;
        document.body.append(devBlock); // Метод вставки node.append()
    }

    // Порівняння двох рядків
    function compareStrings(str1, str2) {
        if (str1.length > str2.length) {
            alert(`Довший рядок: "${str1}"`);
        } else if (str2.length > str1.length) {
            alert(`Довший рядок: "${str2}"`);
        } else {
            alert("Рядки однакової довжини!");
        }
    }

    // Виклик функцій
    showDeveloperInfo("Новохатський", "Владислав");
     compareStrings("Топспін", "Підрізка");

    // 3. BOM та DOM маніпуляції
    // BOM: об'єкт location
    const rulesBtn = document.createElement('button');
    rulesBtn.textContent = "Перейти до правил гри";
    rulesBtn.style.cssText = "display: block; margin: 10px auto; padding: 8px 16px; background-color: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer;";
    rulesBtn.onclick = () => location.assign('rules.html');
    
    const header = document.querySelector('h1');
    header.after(rulesBtn); // Метод вставки node.after()

    // DOM: getElementById, createElement, createTextNode, prepend
    const highlightTextP = document.getElementById('highlight-text');
    if (highlightTextP) {
        const extraInfo = document.createElement('span');
        const textNode = document.createTextNode("Цікавий факт: ");
        extraInfo.style.fontWeight = "bold";
        extraInfo.style.color = "#d2691e";
        extraInfo.appendChild(textNode);
        highlightTextP.prepend(extraInfo); // Метод вставки node.prepend()
    }

    // DOM: querySelectorAll, innerHTML, textContent
    const listItems = document.querySelectorAll('.styled-list li');
    if (listItems.length >= 2) {
        // Замінюємо HTML-вміст
        listItems[0].innerHTML = 'Міжнародна федерація настільного тенісу (<a href="https://www.ittf.com" target="_blank">ITTF</a>) - Головний керуючий орган';
        // Замінюємо суто текстовий вміст
        listItems[1].textContent = "Федерація настільного тенісу України (ФНТУ) - Національний орган";
    }

    // DOM: nodeValue (Властивість текстового вузла)
    const h2Element = document.querySelector('h2');
    if (h2Element && h2Element.firstChild.nodeType === Node.TEXT_NODE) {
        h2Element.firstChild.nodeValue = "Асоціації та факти "; 
    }

    // DOM: replaceWith
    const factBadge = document.getElementById('fact-badge');
    if (factBadge) {
        const newBadge = document.createElement('span');
        newBadge.className = 'absolute-badge';
        newBadge.style.backgroundColor = '#2e8b57';
        newBadge.textContent = 'Оновлено!';
        factBadge.replaceWith(newBadge); // Метод заміни node.replaceWith()
    }

    // DOM: outerHTML
    const firstP = document.querySelector('.content-box p');
    if (firstP) {
        // Замінюємо абзац на новий, зберігаючи його вміст, але додаючи легкий стиль
         firstP.outerHTML = `<p id="highlight-text" style="border-left: 5px solid #004080; background-color: #e6f2ff; padding: 15px;">${firstP.innerHTML}</p>`;
    }

    // DOM: node.remove()
    // Створюємо елемент і одразу його видаляємо, щоб не ламати верстку
    const tempDiv = document.createElement('div');
    tempDiv.textContent = "Цей елемент буде видалено";
    document.body.append(tempDiv);
    tempDiv.remove(); // Метод видалення

    // Кнопка для запуску вікторини
    const quizButton = document.createElement('button');
    quizButton.textContent = "Пройти вікторину про теніс";
    quizButton.style.cssText = "padding: 8px 16px; background-color: #ff4500; color: white; border: none; border-radius: 4px; cursor: pointer; display: block; margin-top: 15px;";
    quizButton.onclick = userDialog;
    
    const contentBox = document.querySelector('.content-box.clearfix');
    contentBox.append(quizButton);
});