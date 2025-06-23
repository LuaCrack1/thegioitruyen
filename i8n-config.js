i18next
  .use(i18nextHttpBackend)
  .use(i18nextBrowserLanguageDetector)
  .init({
    fallbackLng: 'vi',
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}.json'
    }
  }, function(err, t) {
    updateContent();
  });

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.innerText = i18next.t(el.getAttribute('data-i18n'));
  });
}

document.getElementById("languageSelect").addEventListener("change", function () {
  const lang = this.value;
  i18next.changeLanguage(lang, updateContent);
});

document.addEventListener("DOMContentLoaded", () => {
  const langs = ['vi', 'en', 'ja', 'fr', 'ko', 'zh'];
  const select = document.getElementById("languageSelect");
  langs.forEach(code => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.text = code.toUpperCase();
    select.appendChild(opt);
  });
  select.value = i18next.language || 'vi';
});
