import SiedlungRessource from './SiedlungRessource.js'

const ARBEITER_ID = 'arbeiter'
const ANZAHL_ARBEITER_ID = 'anzahl-arbeiter'
const ZUGEWIESENE_ARBEITER_ID = 'zugewiesene-arbeiter'
const ARBEITER_ERZEUGEN_ID = 'arbeiter-erzeugen'
const ARBEITER_ERZEUGEN_KOSTEN_ID = 'arbeiter-erzeugen-kosten'

const TEMPLATE = `
    <div class="row" id="${ARBEITER_ID}">
        <div class="col-2">Arbeiter</div>
        <div class="col-3"><span id="${ANZAHL_ARBEITER_ID}">0</span></div>
        <div class="col-3"><span id="${ZUGEWIESENE_ARBEITER_ID}">0</span></div>
        <div class="col-4">
            <div class="row">
                <button
                    type="button"
                    class="btn btn-primary"
                    id="${ARBEITER_ERZEUGEN_ID}">
                    <i class="bi bi-arrow-up-square"></i> Arbeiter erzeugen
                </button>
            </div>
            <div class="row">
                <span id="${ARBEITER_ERZEUGEN_KOSTEN_ID}"> Kosten:</span>
            </div>
        </div>
    </div>
    `

export default class ArbeiterRessource extends SiedlungRessource {
    kosten = {
        holz: 1,
        stein: 1,
        fleisch: 5
    }

    constructor(data) {
        super(data, TEMPLATE)

        this.arbeiterElement = this.getElement(ARBEITER_ID)
        this.anzahlArbeiterElement = this.getElement(ANZAHL_ARBEITER_ID)
        this.arbeiterErzeugenElement = this.getElement(ARBEITER_ERZEUGEN_ID)
        this.arbeiterErzeugenKostenElement = this.getElement(ARBEITER_ERZEUGEN_KOSTEN_ID)
        this.zugewieseneArbeiterElement = this.getElement(ZUGEWIESENE_ARBEITER_ID)

        this.arbeiterErzeugenElement.addEventListener('click', () => {
            this.erzeugeArbeiter()
        })

        this.updateUI()
    }

    erzeugeArbeiter() {
        const menge = 1
        if (this.data.holz >= this.kosten.holz && this.data.stein >= this.kosten.stein && this.data.fleisch >= this.kosten.fleisch) {
            this.data.arbeiter += menge
            this.data.holz -= this.kosten.holz
            this.data.stein -= this.kosten.stein
            this.data.fleisch -= this.kosten.fleisch
        }

        this.globalUiUpdate()
    }

    updateUI() {
        this.anzahlArbeiterElement.textContent = this.data.arbeiter
        this.zugewieseneArbeiterElement.textContent =
            this.data.holzArbeiter + this.data.steinArbeiter + this.data.fleischArbeiter + ' zugewiesen ' + '(' + (this.data.arbeiter - this.data.holzArbeiter - this.data.steinArbeiter - this.data.fleischArbeiter) + ' frei)'
        this.arbeiterErzeugenKostenElement.textContent = ' Kosten: ' + this.kosten.holz + ' Holz, ' + this.kosten.stein + ' Stein, ' + this.kosten.fleisch + ' Fleisch'
        this.arbeiterErzeugenElement.disabled = this.data.wohnraum - this.data.arbeiter < 1 || this.data.holz < this.kosten.holz || this.data.stein < this.kosten.stein || this.data.fleisch < this.kosten.fleisch
    }
}
