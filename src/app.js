import WohnraumResource from './WohnraumResource.js'
import ArbeiterResource from './ArbeiterResource.js'

const zeitpunktElement = document.getElementById('zeitpunkt')

const anzahlHolzElement = document.getElementById('anzahl-holz')
const zugewieseneArbeiterHolzElement = document.getElementById('zugewiesene-arbeiter-holz')
const holzArbeiterZuweisenElement = document.getElementById('holz-arbeiter-zuweisen')
const holzArbeiterFreigebenElement = document.getElementById('holz-arbeiter-freigeben')

const anzahlSteineElement = document.getElementById('anzahl-steine')
const zugewieseneArbeiterSteinElement = document.getElementById('zugewiesene-arbeiter-stein')
const steinArbeiterZuweisenElement = document.getElementById('stein-arbeiter-zuweisen')
const steinArbeiterFreigebenElement = document.getElementById('stein-arbeiter-freigeben')

const anzahlFleischElement = document.getElementById('anzahl-fleisch')
const zugewieseneArbeiterFleischElement = document.getElementById('zugewiesene-arbeiter-fleisch')
const fleischArbeiterZuweisenElement = document.getElementById('fleisch-arbeiter-zuweisen')
const fleischArbeiterFreigebenElement = document.getElementById('fleisch-arbeiter-freigeben')

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

const createEmitter = function (type, payload) {
    return function () {
        window.dispatchEvent(new CustomEvent(type, { detail: payload }))
    }
}

const init = function () {
    document.getElementById('siedlung').appendChild(wohnraumResource.getDomElement())
    document.getElementById('siedlung').appendChild(arbeiterResource.getDomElement())

    holzArbeiterZuweisenElement.addEventListener('click', createEmitter('arbeiterzuweisung', { typ: 'holz', menge: 1 }))
    holzArbeiterFreigebenElement.addEventListener('click', createEmitter('arbeiterfreigabe', { typ: 'holz', menge: 1 }))
    steinArbeiterZuweisenElement.addEventListener('click', createEmitter('arbeiterzuweisung', { typ: 'stein', menge: 1 }))
    steinArbeiterFreigebenElement.addEventListener('click', createEmitter('arbeiterfreigabe', { typ: 'stein', menge: 1 }))
    fleischArbeiterZuweisenElement.addEventListener('click', createEmitter('arbeiterzuweisung', { typ: 'fleisch', menge: 1 }))
    fleischArbeiterFreigebenElement.addEventListener('click', createEmitter('arbeiterfreigabe', { typ: 'fleisch', menge: 1 }))

    const dataArbeiterzuweisung = function (event) {
        switch (event.detail.typ) {
            case 'holz':
                data.holzArbeiterZuweisen(event.detail.menge)
                break
            case 'stein':
                data.steinArbeiterZuweisen(event.detail.menge)
                break
            case 'fleisch':
                data.fleischArbeiterZuweisen(event.detail.menge)
                break
        }
        updateUI()
    }
    window.addEventListener('arbeiterzuweisung', dataArbeiterzuweisung)

    const dataArbeiterfreigabe = function (event) {
        switch (event.detail.typ) {
            case 'holz':
                data.holzArbeiterFreigeben(event.detail.menge)
                break
            case 'stein':
                data.steinArbeiterFreigeben(event.detail.menge)
                break
            case 'fleisch':
                data.fleischArbeiterFreigeben(event.detail.menge)
                break
        }
        updateUI()
    }
    window.addEventListener('arbeiterfreigabe', dataArbeiterfreigabe)
}

const tick = function () {
    data.tick += 1
    data.holz += data.holzArbeiter
    data.stein += data.steinArbeiter
    data.fleisch += data.fleischArbeiter
    zeitpunktElement.textContent = data.tick
}

const updateUI = function () {
    wohnraumResource.updateUI()
    arbeiterResource.updateUI()

    anzahlHolzElement.textContent = data.holz
    zugewieseneArbeiterHolzElement.textContent = data.holzArbeiter
    holzArbeiterZuweisenElement.disabled = data.freieArbeiter() === 0
    holzArbeiterFreigebenElement.disabled = data.holzArbeiter === 0

    anzahlSteineElement.textContent = data.stein
    zugewieseneArbeiterSteinElement.textContent = data.steinArbeiter
    steinArbeiterZuweisenElement.disabled = data.freieArbeiter() === 0
    steinArbeiterFreigebenElement.disabled = data.steinArbeiter === 0

    anzahlFleischElement.textContent = data.fleisch
    zugewieseneArbeiterFleischElement.textContent = data.fleischArbeiter
    fleischArbeiterZuweisenElement.disabled = data.freieArbeiter() === 0
    fleischArbeiterFreigebenElement.disabled = data.fleischArbeiter === 0
}

const globalUiUpdater = () => {
    updateUI()
}

const wohnraumResource = new WohnraumResource(data, globalUiUpdater)
const arbeiterResource = new ArbeiterResource(data, globalUiUpdater)

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
