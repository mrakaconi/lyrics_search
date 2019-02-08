
const naslovPesme = document.getElementById("naslov-pesme")
const tekstPesme = document.getElementById("tekst-pesme")
const forma = document.getElementById("forma")
const trazeniIzvodjac = document.getElementById("trazeni-izvodjac")
const trazenaPesma = document.getElementById("trazena-pesma")
const dugme = document.getElementById("dugme")
const readmore = document.getElementById("readmore")

function ucitajPodatke() {
    const izvodjac = trazeniIzvodjac.value
    const pesma = trazenaPesma.value
    const url = `https://api.lyrics.ovh/v1/${izvodjac}/${pesma}`
    fetch(url)
        .then(response => response.json())
        .then(objekat => {
            naslovPesme.innerText = izvodjac + ' - ' + pesma
            tekstPesme.innerText = objekat.lyrics ? objekat.lyrics : "Nema pesme"
        });

    const url1 = `https://en.wikipedia.org/w/api.php?action=query&titles=${izvodjac}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`

    fetch(url1)
        .then(response => response.json())    
        .then(podatak => {
            const pages = podatak.query.pages;
            const clanak = Object.values(pages)[0];
            const imgSrc = clanak.thumbnail.source;
            document.getElementById('slika').innerHTML = `<img src="${imgSrc}" alt="${clanak.title}">`
            document.getElementById('o-izvodjacu').innerHTML = clanak.extract.substr(0, 1000);
            console.log(podatak);
        });

}


forma.addEventListener('submit', function (e) {
    e.preventDefault();
    readmore.classList.toggle("show")
    readmorehref.setAttribute('href', `https://en.wikipedia.org/wiki/${trazeniIzvodjac.value}`);
    ucitajPodatke();
});
