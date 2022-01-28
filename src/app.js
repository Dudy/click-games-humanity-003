import WohnraumRessource from './ressourcen/siedlung/WohnraumRessource.js'
import ArbeiterRessource from './ressourcen/siedlung/ArbeiterRessource.js'
import HolzRessource from './ressourcen/rohstoffe/HolzRessource.js'
import SteinRessource from './ressourcen/rohstoffe/SteinRessource.js'
import FleischRessource from './ressourcen/rohstoffe/FleischRessource.js'

const zeitpunktElement = document.getElementById('zeitpunkt')

const data = {
    tick: 0,
    wohnraum: 0,
    freierWohnraum: function () {
        return this.wohnraum - this.arbeiter
    },
    arbeiter: 0,
    freieArbeiter: function () {
        return this.arbeiter - this.holzArbeiter - this.steinArbeiter - this.fleischArbeiter
    },
    holz: 21,
    holzArbeiter: 0,
    holzArbeiterZuweisen: function (menge) {
        if (this.freieArbeiter() >= menge) {
            this.holzArbeiter += menge
        }
    },
    holzArbeiterFreigeben: function (menge) {
        if (this.holzArbeiter >= menge) {
            this.holzArbeiter -= menge
        }
    },
    stein: 11,
    steinArbeiter: 0,
    steinArbeiterZuweisen: function (menge) {
        if (this.freieArbeiter() >= menge) {
            this.steinArbeiter += menge
        }
    },
    steinArbeiterFreigeben: function (menge) {
        if (this.steinArbeiter >= menge) {
            this.steinArbeiter -= menge
        }
    },
    fleisch: 10,
    fleischArbeiter: 0,
    fleischArbeiterZuweisen: function (menge) {
        if (this.freieArbeiter() >= menge) {
            this.fleischArbeiter += menge
        }
    },
    fleischArbeiterFreigeben: function (menge) {
        if (this.fleischArbeiter >= menge) {
            this.fleischArbeiter -= menge
        }
    }
}

const wohnraumRessource = new WohnraumRessource(data)
const arbeiterRessource = new ArbeiterRessource(data)

const holzRessource = new HolzRessource(data)
const steinRessource = new SteinRessource(data)
const fleischRessource = new FleischRessource(data)

const createEmitter = function (type, payload) {
    return function () {
        window.dispatchEvent(new CustomEvent(type, { detail: payload }))
    }
}

const init = function () {
    document.getElementById('siedlung').appendChild(wohnraumRessource.getDomElement())
    document.getElementById('siedlung').appendChild(arbeiterRessource.getDomElement())

    document.getElementById('ressourcen').appendChild(holzRessource.getDomElement())
    document.getElementById('ressourcen').appendChild(steinRessource.getDomElement())
    document.getElementById('ressourcen').appendChild(fleischRessource.getDomElement())

    window.addEventListener('updateUI', updateUI)
}

const tick = function () {
    data.tick += 1
    data.holz += data.holzArbeiter
    data.stein += data.steinArbeiter
    data.fleisch += data.fleischArbeiter
    zeitpunktElement.textContent = data.tick
}

const updateUI = function () {
    wohnraumRessource.updateUI()
    arbeiterRessource.updateUI()

    holzRessource.updateUI()
    steinRessource.updateUI()
    fleischRessource.updateUI()
}

const mainLoop = function () {
    tick()
    updateUI()
    setTimeout(mainLoop, 1000)
}

init()

setTimeout(mainLoop, 0)

// TODO
// - Das Erzeugen von irgendwas sollte auch Zeit kosten. Am besten mit CSS animiertem Balken bis Vollendung.
// - Alles auf "Resource" als externes Modul umstellen.
// - Veränderungen an "data" könnten theoretisch nebenläufig geschehen, so dass ein WorkerThread eine
//   Resource verändert und ein Mausklick auch. Beide Handler prüfen zunächst (gleichzeitig), ob genug
//   Ressourcen vorhanden sind, was erfolgreich ist. Dann werden beide die Ressource erniedrigen, das kann
//   dann aber unter null gehen.
//   Verwende Queue, Semaphore, Singleton oder irgendwas, um data-Änderungen atomar zu machen.
// - Erlaube kürzere Ticks.
// - neuer Punkt bei "Siedlung: Kapital"
// - anstatt Überschrift "Aktionen" (ganz unten): "Forschung"
// - verwende die SieldungRessource auch als root-UI für den ganzen Siedlungsblock
// - entferne alle Klassen, die ES6 Module sind schon gescoped, da braucht's keine Klassen
//   mehr (nur die exportierten Dinger müssen eindeutig sein)
// - Definiere den Startzustand in einem JSON File. Lies es und erzeuge daraus generisch alle
//   Ressourcen. Es sieht so aus, als gäbe es im Prinzip nur eine Art Siedlungsressource, denn alle
//   Subressourcen unterscheiden sich nur im Namen.
