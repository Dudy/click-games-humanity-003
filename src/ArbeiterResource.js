import SiedlungResource from './SiedlungResource.js'

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
            <button
                type="button"
                class="btn btn-primary"
                id="${ARBEITER_ERZEUGEN_ID}">
                <i class="bi bi-arrow-up-square"></i> Arbeiter erzeugen
            </button>
            <span id="${ARBEITER_ERZEUGEN_KOSTEN_ID}"> Kosten:</span>
        </div>
    </div>
    `

export default class ArbeiterResource extends SiedlungResource {
    kosten = {
        holz: 1,
        stein: 1,
        fleisch: 10
    }

    constructor(data) {
        super(data, TEMPLATE)

        this.arbeiterElement = this.getElement(ARBEITER_ID)
        this.anzahlArbeiterElement = this.getElement(ANZAHL_ARBEITER_ID)
        this.arbeiterErzeugenElement = this.getElement(ARBEITER_ERZEUGEN_ID)
        this.arbeiterErzeugenKostenElement = this.getElement(ARBEITER_ERZEUGEN_KOSTEN_ID)
        this.zugewieseneArbeiterElement = this.getElement(ZUGEWIESENE_ARBEITER_ID)

        this.arbeiterErzeugenElement.addEventListener(
            'click',
            this.createEmitter('arbeitererzeugung', {
                typ: 'arbeiter',
                menge: 1
            })
        )
    }

    getTemplate() {
        return this.template
    }

    getKosten() {
        return this.kosten
    }

    doArbeiterErzeugen(menge) {
        if (this.data.holz >= this.kosten.holz && this.data.stein >= this.kosten.stein && this.data.fleisch >= this.kosten.fleisch) {
            this.data.arbeiter += menge
            this.data.holz -= this.kosten.holz
            this.data.stein -= this.kosten.stein
            this.data.fleisch -= this.kosten.fleisch
        }
    }

    getFreieArbeiter() {
        return this.data.arbeiter - this.data.holzArbeiter - this.data.steinArbeiter - this.data.fleischArbeiter
    }

    updateUI() {
        this.anzahlArbeiterElement.textContent = this.data.arbeiter
        this.zugewieseneArbeiterElement.textContent =
            this.data.holzArbeiter + this.data.steinArbeiter + this.data.fleischArbeiter + ' zugewiesen ' + '(' + (this.data.arbeiter - this.data.holzArbeiter - this.data.steinArbeiter - this.data.fleischArbeiter) + ' frei)'
        this.arbeiterErzeugenKostenElement.textContent = ' Kosten: ' + this.data.kosten.arbeiter.holz + ' Holz, ' + this.data.kosten.arbeiter.stein + ' Stein, ' + this.data.kosten.arbeiter.fleisch + ' Fleisch'
        this.arbeiterErzeugenElement.disabled =
            this.data.freierWohnraum() === 0 || this.data.holz < this.data.kosten.arbeiter.holz || this.data.stein < this.data.kosten.arbeiter.stein || this.data.fleisch < this.data.kosten.arbeiter.fleisch
    }
}
