
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

    const izvodjacWiki = document.getElementById("trazeni-izvodjac").value;
    const url1 = `https://en.wikipedia.org/w/api.php?action=query&titles=${izvodjacWiki}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`

    fetch(url1)
        .then(response => response.json())
        .then(podatak => {
            const pages = podatak.query.pages;
            const clanak = Object.values(pages)[0];
            document.getElementById('o-izvodjacu').innerHTML = clanak.extract.substr(0, 1000);
        })

}


forma.addEventListener('submit', function (e) {
    e.preventDefault();
    readmore.classList.toggle("show")
    console.log(trazeniIzvodjac.value);
    readmorehref.setAttribute('href', `https://en.wikipedia.org/wiki/${trazeniIzvodjac.value}`);
    ucitajPodatke();
});
