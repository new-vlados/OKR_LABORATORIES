
//Обробник через атрибут (викликається з HTML)
function showCheerMessage() {
    document.getElementById('cheer-text').style.display = 'inline';
}

document.addEventListener("DOMContentLoaded", () => {
  
    // Обробник події через властивість DOM
    const cheerBtn = document.getElementById('cheer-btn');
    const cheerText = document.getElementById('cheer-text');
    
    if (cheerBtn) {
        // Коли мишка прибирається з кнопки, ховаємо текст
        cheerBtn.onmouseout = function() {
            cheerText.style.display = 'none';
        };
    }

    //addEventListener та різні обробники для однієї події
    const subscribeBtn = document.getElementById('subscribe-btn');
    if (subscribeBtn) {
        // Перший обробник
        const showThanksAlert = () => alert("Дякуємо! Ви успішно підписалися на новини зі світу настільного тенісу.");
        // Другий обробник
        const changeBtnColor = () => subscribeBtn.style.backgroundColor = "#2e8b57";
        
        subscribeBtn.addEventListener('click', showThanksAlert);
        subscribeBtn.addEventListener('click', changeBtnColor);
    }

    //Об'єкт-обробник, handleEvent, currentTarget, removeEventListener
    const trainingBtn = document.getElementById('training-btn');
    
    const trainingModeObj = {
        handleEvent(event) {
            // Виводимо елемент, на якому спрацював обробник
            console.log(`Подія спрацювала на елементі: ${event.currentTarget.tagName}`);
            alert("Тренувальний режим активовано! Подачі завантажено в робота.");
            
            event.currentTarget.style.backgroundColor = "#808080";
            event.currentTarget.textContent = "Тренування йде...";
            
            // Видаляємо обробник (кнопка спрацює лише один раз)
            trainingBtn.removeEventListener('click', this);
        }
    };

    if (trainingBtn) {
        trainingBtn.addEventListener('click', trainingModeObj);
    }

    //Делегування подій (підсвічування списку)
    const playersList = document.getElementById('players-list');
    let selectedPlayer = null;

    if (playersList) {
        playersList.onclick = function(event) {
            let target = event.target;
            
            // Якщо клік був не по тегу LI – ігноруємо
            if (target.tagName !== 'LI') return;
            
            highlightPlayer(target);
        };
    }

    function highlightPlayer(liNode) {
        if (selectedPlayer) {
            selectedPlayer.style.backgroundColor = ''; // Знімаємо виділення з попереднього
            selectedPlayer.style.fontWeight = 'normal';
        }
        selectedPlayer = liNode;
        selectedPlayer.style.backgroundColor = '#fff5ee'; // Легке помаранчеве підсвічування
        selectedPlayer.style.fontWeight = 'bold';
    }


    //Меню з делегуванням та атрибутами data-*
    const matchMenu = document.getElementById('match-menu');
    
    class MatchController {
        constructor(elem) {
            this._elem = elem;
            elem.onclick = this.onClick.bind(this); // Прив'язуємо контекст
        }

        start() { alert("Матч розпочато! Рахунок 0:0. Подача гравця 1."); }
        pause() { alert("Тайм-аут 1 хвилина. Гравці радяться з тренерами."); }
        end() { alert("Матч завершено! Тиснемо руки."); }

        onClick(event) {
            // Зчитуємо data-action атрибут клікнутої кнопки
            let action = event.target.dataset.action;
            if (action && this[action]) {
                this[action](); // Викликаємо відповідний метод
            }
        }
    }

    if (matchMenu) {
        new MatchController(matchMenu);
    }


    //Патерн "Поведінка" (Behavior) через data-*
    // Вішаємо один глобальний обробник на весь документ
    document.addEventListener('click', function(event) {
        let target = event.target;
        
        // Шукаємо елементи з атрибутом data-behavior="tooltip"
        if (target.dataset.behavior === 'tooltip') {
            let tooltipText = target.dataset.tooltip;
            alert(`Довідка: ${tooltipText}`);
        }
    });

});