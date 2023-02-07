let fullLang = navigator.language;
let lang = fullLang.substr(0, 2);
console.log('short lang', lang);
console.log('browser language', fullLang);

if (lang === 'pt') {
    window.location.href = "pt-BR/"
} else {
    window.location.href = "en/"
}