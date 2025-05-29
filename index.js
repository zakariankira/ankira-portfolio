document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  function typeWriterEffect(element, html, speed = 10, callback) {
    element.innerHTML = '';
    let tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const nodes = Array.from(tempDiv.childNodes);
    let i = 0;
    function typeNode() {
      if (i < nodes.length) {
        const node = nodes[i].cloneNode(true);
        // Only animate element nodes
        if (node.nodeType === 1) {
          node.style.opacity = '0';
          node.style.display = '';
          element.appendChild(node);
          setTimeout(() => {
            node.style.transition = 'opacity 0.5s';
            node.style.opacity = '1';
            i++;
            setTimeout(typeNode, speed * 20);
          }, 10);
        } else {
          // For text nodes or comments, just append
          element.appendChild(node);
          i++;
          setTimeout(typeNode, speed * 2);
        }
      } else if (callback) {
        callback();
      }
    }
    typeNode();
  }

  function smoothLanguageSwitchWithType(targetUrl, newLang) {
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    [header, main, footer].forEach(el => {
      if (el) el.style.transition = 'opacity 0.7s';
      if (el) el.style.opacity = '0';
    });
    setTimeout(() => {
      fetch(targetUrl)
        .then(response => response.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newHeader = doc.querySelector('header');
          const newMain = doc.querySelector('main');
          const newFooter = doc.querySelector('footer');
          if (header && newHeader) header.innerHTML = '';
          if (main && newMain) main.innerHTML = '';
          if (footer && newFooter) footer.innerHTML = '';
          [header, main, footer].forEach(el => {
            if (el) el.style.opacity = '1';
          });
          if (header && newHeader) {
            typeWriterEffect(header, newHeader.innerHTML, 2, () => {
              if (main && newMain) {
                typeWriterEffect(main, newMain.innerHTML, 2, () => {
                  if (footer && newFooter) {
                    typeWriterEffect(footer, newFooter.innerHTML, 2, () => {
                      reapplyEvents(newLang);
                    });
                  } else {
                    reapplyEvents(newLang);
                  }
                });
              } else {
                reapplyEvents(newLang);
              }
            });
          }
        });
    }, 700);
  }

  function reapplyEvents(newLang) {
    const langBtn = document.getElementById('lang-switch');
    if (langBtn) {
      langBtn.onclick = () => {
        smoothLanguageSwitchWithType(newLang === 'fr' ? 'index.html' : 'Index-fr.html', newLang === 'fr' ? 'en' : 'fr');
      };
    }
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // Language switcher logic for two-button switch
function setLangSwitcherActive() {
  const isFrench = document.documentElement.lang === 'fr';
  const btnEn = document.getElementById('lang-switch-en');
  const btnFr = document.getElementById('lang-switch-fr');
  if (btnEn && btnFr) {
    if (isFrench) {
      btnFr.classList.add('active');
      btnEn.classList.remove('active');
    } else {
      btnEn.classList.add('active');
      btnFr.classList.remove('active');
    }
  }
}
setLangSwitcherActive();

const btnEn = document.getElementById('lang-switch-en');
const btnFr = document.getElementById('lang-switch-fr');
if (btnEn) {
  btnEn.onclick = () => {
    if (document.documentElement.lang === 'en') return;
    window.location.href = 'index.html';
  };
}
if (btnFr) {
  btnFr.onclick = () => {
    if (document.documentElement.lang === 'fr') return;
    window.location.href = 'Index-fr.html';
  };
}

  const langBtn = document.getElementById('lang-switch');
  if (langBtn) {
    langBtn.onclick = () => {
      const isFrench = document.documentElement.lang === 'fr';
      smoothLanguageSwitchWithType(isFrench ? 'index.html' : 'Index-fr.html', isFrench ? 'en' : 'fr');
    };
  }
