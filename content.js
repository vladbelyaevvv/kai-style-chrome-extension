'use strict';

(function nightVision() {
    const THEME_CLASS = 'nv-on';

    const css = `
        .${THEME_CLASS},
        .${THEME_CLASS} body, 
        .${THEME_CLASS} div, 
        .${THEME_CLASS} footer,
        .${THEME_CLASS} .section .nav .active,
        .${THEME_CLASS} .section .nav a,
        .${THEME_CLASS} .kai-btn-block,
        .${THEME_CLASS} .breadcrumb {  
            background-color: black !important; 
        } 
        
        .${THEME_CLASS} #btns .slick-disabled{
            background: black !important;
        }

        .${THEME_CLASS} p,
        .${THEME_CLASS} .date,
        .${THEME_CLASS} .time_label {
            color: #39ff14 !important; 
        } 

        .${THEME_CLASS} a:link, 
        .${THEME_CLASS} a:visited, 
        .${THEME_CLASS} a:hover, 
        .${THEME_CLASS} a:active { 
            color: red !important; 
        }

        /*.${THEME_CLASS} li {
          background-color: #000 !important;    
          color: #39ff14 !important;      
          border-left: 3px solid red !important;  
          font-size: 14px !important; 
          font-style: italic !important;
          font-weight: bold !important;
          text-decoration: underline !important;
          border-radius: 4px !important;
          box-shadow: 0 0 6px  rgba(57,255,20,.5) !important;
        }*/
      `;

  // вставка style в страницу
  function ensureStyle() {
    if (document.getElementById('nv-style')) return; // если уже есть то выходим

    const styleEl = document.createElement('style'); // создаем тег style
    styleEl.id = 'nv-style'; 
    styleEl.textContent = css; // кладем текст css
    document.head.appendChild(styleEl); // добавление style в head
  }

  // включение\выключение темы
  function setEnabled(on) {
    document.documentElement.classList.toggle(THEME_CLASS, on); // то есть у тега <html> добавляем и убираем 'nv-on'
    try { localStorage.setItem('nv-enabled', on ? '1' : '0'); } catch {} // хранение состояния

    const btn = document.getElementById('nv-toggle-btn'); // получаем уже существующую кнопку
    if (btn) {
      btn.title = on ? 'Night Vision: ON' : 'Night Vision: OFF';
      btn.style.boxShadow = on ? '0 0 0 2px #39ff13 inset' : 'none'; //свечение при включении
    }

    const liNodes = document.querySelectorAll('.section .nav li, .breadcrumb li, li');
    liNodes.forEach((li) => {
    if (on) { // применение стилей к найденным li
      li.style.backgroundColor = '#000';
      li.style.color = '#39ff14';
      li.style.borderLeft = '3px solid red';
      li.style.fontSize = '14px';
      li.style.fontStyle = 'italic';
      li.style.fontWeight = 'bold';
      li.style.textDecoration = 'underline';
      li.style.borderRadius = '4px';
      li.style.boxShadow = '0 0 6px rgba(57,255,20,.5)';

      // пример использования children: часто у <li> первый ребёнок — <a>, перекрасим ссылку
      const first = li.children && li.children[0]; // если есть ребенок, то берем первого ребенка 
      if (first && first.tagName === 'A') { // прговеряем что first есть(ребенок нашелся на предыдущей строчке) и если тэг называется a то делаем ww
        first.style.color = '#e72545ff'; // немного отличается от красного 
      }

      // пример использования parentElement: пометим родительский список тонкой зеленой рамкой
      const ul = li.parentElement;
      if (ul && (ul.tagName === 'UL' || ul.tagName === 'OL')) {
        ul.style.outline = '1px dashed rgba(57,255,20,.3)'; 
      }
    } else {// снимаем только то, что ставили
      li.style.backgroundColor = '';
      li.style.color = '';
      li.style.borderLeft = '';
      li.style.fontSize = '';
      li.style.fontStyle = '';
      li.style.fontWeight = '';
      li.style.textDecoration = '';
      li.style.borderRadius = '';
      li.style.boxShadow = '';

      const first = li.children && li.children[0];
      if (first && first.tagName === 'A') {
        first.style.color = '';
      }

      const ul = li.parentElement;
      if (ul && (ul.tagName === 'UL' || ul.tagName === 'OL')) {
        ul.style.outline = '';
      }
    }
    });
  }
  // вставка кнопки на  страницу
  function mountButton() {
    if (document.getElementById('nv-toggle-btn')) return; // если уже есть то выходим

    const btn = document.createElement('button'); // созадем кнопку
    btn.id = 'nv-toggle-btn';
    btn.type = 'button';
    btn.textContent = 'NV'; // текст в кнопке
    Object.assign(btn.style, { // грубо говоря копируем в btn.style второй аргумент функции
      width: '30px',
      height: '30px',
      padding: '0',
      background: '#0b2a57',
      color: 'white',
      cursor: 'pointer',
      marginLeft: '6px',
      lineHeight: '1',
      border: '1px solid #2e6fd4',
      borderRadius: '4px'
    });

    btn.addEventListener('click', () => {
      const next = !document.documentElement.classList.contains(THEME_CLASS);
      setEnabled(next);
    });

    const infoLinks = document.querySelector('.info_links'); // ищем кнопку для слабовидящих 
    if (infoLinks) {
      infoLinks.insertAdjacentElement('afterend', btn); // вставляем после кнопки для слабовидящих
    } else { // есои вдруг на странице нет кнопки для слабовидящих
      // запасной вариант
      Object.assign(btn.style, { position: 'fixed', top: '10px', right: '10px', zIndex: '99999' });
      (document.body || document.documentElement).appendChild(btn);
    }
  }

  // приведение программы в состояние готовности(иниициализация)
  function init() {
    ensureStyle(); // вставляем style
    mountButton();  // добавляем кнопку
    const saved = localStorage.getItem('nv-enabled') === '1'; // начальное значение переключателя
    setEnabled(saved); // восстановление режима 
  }

  if (document.readyState === 'loading') { // ждет пока DOM построится
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();