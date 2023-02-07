let fullLang = navigator.language;
let canonLang = Intl.getCanonicalLocales(fullLang);
let lang = fullLang.substr(0, 2);
console.log('short lang', lang);
console.log('browser language', fullLang);
console.log('locales from data file', canonLang);

if (lang === 'pt') {
    window.location.href = "pt-BR/index.html"
} else {
    window.location.href = "en/index.html"
}