
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
    // 1. Події mouseover/mouseout та властивості event.target, event.relatedTarget
    const galleryContainer = document.getElementById('equipment-gallery');
    
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseover', function(event) {
            // event.target - елемент, на який ми навели
            let targetCard = event.target.closest('.gallery-item');
            
            if (!targetCard) return; // Якщо навели не на картку
            
            // event.relatedTarget - елемент, з якого прийшов курсор
            let related = event.relatedTarget;
            
            // Змінюємо стилі
            targetCard.style.borderColor = '#ff4500';
            targetCard.style.backgroundColor = '#fff5ee';
            targetCard.style.transform = 'translateY(-5px)';
            targetCard.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });

        galleryContainer.addEventListener('mouseout', function(event) {
            let targetCard = event.target.closest('.gallery-item');
            
            if (!targetCard) return;

            // event.relatedTarget - елемент, на який перейшов курсор
            let related = event.relatedTarget;

            // Якщо курсор перейшов на дочірній елемент всередині тієї ж картки - ігноруємо
            if (related && targetCard.contains(related)) return;

            // Повертаємо початкові стилі
            targetCard.style.borderColor = 'transparent';
            targetCard.style.backgroundColor = '#e8f4f8';
            targetCard.style.transform = 'translateY(0)';
            targetCard.style.boxShadow = 'none';
        });
    }

    // 2. Drag-and-drop через події миші (mousedown, mousemove, mouseup)
    const ball = document.getElementById('ping-pong-ball');
    const tableContainer = document.getElementById('table-container');

    if (ball && tableContainer) {
        ball.ondragstart = () => false;

        ball.addEventListener('mousedown', function(event) {
            // Отримуємо координати відносно вікна браузера (viewport)
            let ballRect = ball.getBoundingClientRect();
            let shiftX = event.clientX - ballRect.left;
            let shiftY = event.clientY - ballRect.top;

            function moveAt(clientX, clientY) {
                let tableRect = tableContainer.getBoundingClientRect();
                
                // Використовуємо clientX/clientY
                let newLeft = clientX - tableRect.left - shiftX;
                let newTop = clientY - tableRect.top - shiftY;

                // Межі столу
                if (newLeft < 0) newLeft = 0;
                if (newTop < 0) newTop = 0;
                if (newLeft > tableContainer.offsetWidth - ball.offsetWidth) {
                    newLeft = tableContainer.offsetWidth - ball.offsetWidth;
                }
                if (newTop > tableContainer.offsetHeight - ball.offsetHeight) {
                    newTop = tableContainer.offsetHeight - ball.offsetHeight;
                }

                ball.style.left = newLeft + 'px';
                ball.style.top = newTop + 'px';
            }

            function onMouseMove(event) {
                //передаємо clientX та clientY
                moveAt(event.clientX, event.clientY);
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            });
        });
    }
});
