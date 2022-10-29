const countries = {
    "am-ET": "Amharski",
    "ar-SA": "Arabski",
    "be-BY": "Białoruski",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bośniacki",
    "ca-ES": "Kataloński",
    "cop-EG": "Koptyjski",
    "cs-CZ": "Czeski",
    "cy-GB": "Walijski",
    "da-DK": "Duński",
    "dz-BT": "Dzongkha",
    "de-DE": "Niemiecki",
    "dv-MV": "Malediwski",
    "el-GR": "Grecki",
    "en-GB": "Angielski",
    "es-ES": "Hiszpański",
    "et-EE": "Estoński",
    "eu-ES": "Basque",
    "fa-IR": "Perski",
    "fi-FI": "Fiński",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "Francuski",
    "gl-ES": "Galicyjski",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrajski",
    "hi-IN": "Hinduski",
    "hr-HR": "Chorwacki",
    "hu-HU": "Węgierski",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kanadyński",
    "ko-KR": "Koreański",
    "ku-TR": "Kurdish",
    "ky-KG": "Kirgiski",
    "la-VA": "Latin",
    "lo-LA": "Laotański",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malajski",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepalski",
    "niu-NU": "Niuean",
    "nl-NL": "Holenderski",
    "no-NO": "Norweski",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polski",
    "pt-PT": "Portugalski",
    "rn-BI": "Kirundi",
    "ro-RO": "Rumuński",
    "ru-RU": "Rosyjski",
    "sg-CF": "Sango",
    "si-LK": "Syngaleski",
    "sk-SK": "Słowacki",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalski",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turecki",
    "uk-UA": "Ukraiński",
    "uz-UZ": "Uzbekcki",
    "vi-VN": "Wietmański",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zuluski"
}
const fromText = document.querySelector('.from-text'),
toText = document.querySelector('.to-text'),
selectTag = document.querySelectorAll("select"),
exchangeIcon = document.querySelector('.exchange'),
translateBtn = document.querySelector('button'),
icons = document.querySelectorAll('.row i')
translateBtn.disabled = true

fromText.addEventListener('keyup', () => {
    if(fromText.value != "") {
        translateBtn.disabled = false
    } else {
        translateBtn.disabled = true
    }
})
selectTag.forEach((tag, id) => {
    for(const key in countries) {
        let selected;
        if(id == 0 && key == "pl-PL") {
            selected = "selected"
        } else if(id == 1 && key == "en-GB") {
            selected = "selected"
        }
        let option = `<option value="${key}" ${selected}>${countries[key]}`
        tag.insertAdjacentHTML("beforeend", option)
    }
})

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value
    selectTag[0].value = selectTag[1].value
    toText.value = tempText
    selectTag[1].value = tempLang
})
translateBtn.addEventListener('click', () => {
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    toText.setAttribute('placeholder', 'Tłumaczenie...')
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText
    })
})

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                fromText.select()
                document.execCommand('copy')
            } else {
                navigator.clipboard.writeText(toText.value)
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value
            }
            speechSynthesis.speak(utterance)
        }
    })
})