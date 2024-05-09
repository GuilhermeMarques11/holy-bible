const chapterNumber = document.getElementById('chapter');
const btnSubmit = document.getElementById('submit');
const passagem = document.querySelector('.passagem');
const bookSelect = document.getElementById('bookSelect');
const ShowverseOfTheDay = document.querySelector('.verseOfTheDay');
const verseInfo = document.querySelector('.verseInfo');
const allVerses = document.querySelectorAll('p');
const books = [
    { name: "Gênesis", abbreviation: "gn" },
    { name: "Êxodo", abbreviation: "ex" },
    { name: "Levítico", abbreviation: "lv" },
    { name: "Números", abbreviation: "nm" },
    { name: "Deuteronômio", abbreviation: "dt" },
    { name: "Josué", abbreviation: "js" },
    { name: "Juízes", abbreviation: "jz" },
    { name: "Rute", abbreviation: "rt" },
    { name: "1 Samuel", abbreviation: "1sm" },
    { name: "2 Samuel", abbreviation: "2sm" },
    { name: "1 Reis", abbreviation: "1rs" },
    { name: "2 Reis", abbreviation: "2rs" },
    { name: "1 Crônicas", abbreviation: "1cr" },
    { name: "2 Crônicas", abbreviation: "2cr" },
    { name: "Esdras", abbreviation: "ed" },
    { name: "Neemias", abbreviation: "ne" },
    { name: "Ester", abbreviation: "et" },
    { name: "Jó", abbreviation: "jó" },
    { name: "Salmos", abbreviation: "sl" },
    { name: "Provérbios", abbreviation: "pv" },
    { name: "Eclesiastes", abbreviation: "ec" },
    { name: "Cânticos", abbreviation: "ct" },
    { name: "Isaías", abbreviation: "is" },
    { name: "Jeremias", abbreviation: "jr" },
    { name: "Lamentações", abbreviation: "lm" },
    { name: "Ezequiel", abbreviation: "ez" },
    { name: "Daniel", abbreviation: "dn" },
    { name: "Oséias", abbreviation: "os" },
    { name: "Joel", abbreviation: "jl" },
    { name: "Amós", abbreviation: "am" },
    { name: "Obadias", abbreviation: "ob" },
    { name: "Jonas", abbreviation: "jn" },
    { name: "Miquéias", abbreviation: "mq" },
    { name: "Naum", abbreviation: "na" },
    { name: "Habacuque", abbreviation: "hc" },
    { name: "Sofonias", abbreviation: "sf" },
    { name: "Ageu", abbreviation: "ag" },
    { name: "Zacarias", abbreviation: "zc" },
    { name: "Malaquias", abbreviation: "ml" },
    { name: "Mateus", abbreviation: "mt" },
    { name: "Marcos", abbreviation: "mc" },
    { name: "Lucas", abbreviation: "lc" },
    { name: "João", abbreviation: "jo" },
    { name: "Atos", abbreviation: "at" },
    { name: "Romanos", abbreviation: "rm" },
    { name: "1 Coríntios", abbreviation: "1co" },
    { name: "2 Coríntios", abbreviation: "2co" },
    { name: "Gálatas", abbreviation: "gl" },
    { name: "Efésios", abbreviation: "ef" },
    { name: "Filipenses", abbreviation: "fp" },
    { name: "Colossenses", abbreviation: "cl" },
    { name: "1 Tessalonicenses", abbreviation: "1ts" },
    { name: "2 Tessalonicenses", abbreviation: "2ts" },
    { name: "1 Timóteo", abbreviation: "1tm" },
    { name: "2 Timóteo", abbreviation: "2tm" },
    { name: "Tito", abbreviation: "tt" },
    { name: "Filemom", abbreviation: "fm" },
    { name: "Hebreus", abbreviation: "hb" },
    { name: "Tiago", abbreviation: "tg" },
    { name: "1 Pedro", abbreviation: "1pe" },
    { name: "2 Pedro", abbreviation: "2pe" },
    { name: "1 João", abbreviation: "1jo" },
    { name: "2 João", abbreviation: "2jo" },
    { name: "3 João", abbreviation: "3jo" },
    { name: "Judas", abbreviation: "jd" },
    { name: "Apocalipse", abbreviation: "ap" }
];
books.forEach(book => {
    const option = document.createElement('option');
    option.value = book.abbreviation;
    option.textContent = book.name;
    bookSelect.appendChild(option);
})

function handleClick(event) {
    event.preventDefault();
    buscaPassagem(bookSelect.value, chapterNumber.value);
}

function buscaPassagem(book, chapter) {
    fetch (`https://www.abibliadigital.com.br/api/verses/nvi/${book}/${chapter}`)
    .then(r => r.json())
    .then(data => {
       let versiculos = '';

       data.verses.forEach(versiculo => {
        versiculos += `<p><span style="color: red">${versiculo.number}</span> ${versiculo.text}</p>`;
       });

       passagem.innerHTML = versiculos;
    })
    .catch(error => {
        console.log('Erro ao tentar encontrar uma passagem', error);
        passagem.innerText = 'Nenhuma passagem encontrada';
    })
}

chapterNumber.addEventListener('change', handleClick);

function verseOfTheDay(bookName, bookChapter, bookVerse) {
    fetch(`https://www.abibliadigital.com.br/api/verses/nvi/${bookName}/${bookChapter}/${bookVerse}`)
    .then(r => r.json())
    .then(verseData => {
        ShowverseOfTheDay.innerHTML = `<p><span style="color:red;">${verseData.number}</span> ${verseData.text}</p>`;
        fetch(`https://www.abibliadigital.com.br/api/books/${bookName}`)
        .then(r => r.json())
        .then(bookData => {
            const bookName = bookData.name;
            verseInfo.innerHTML = `<p style="color: #3949ab;">${bookName} ${bookChapter}:${bookVerse}</p>`;
        })
        .catch(error => {
            console.log("Não foi possível exibir as informações do versículo do dia", error);
            ShowverseOfTheDay.innerText = "";
        });
    })
    .catch(error => {
        console.log("Não foi possível exibir o versículo do dia", error);
        ShowverseOfTheDay.innerText = "Não foi possível exibir o versículo do dia"
    })
}

verseOfTheDay('sl', '73', '25');