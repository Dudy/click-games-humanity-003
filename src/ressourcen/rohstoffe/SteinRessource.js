import RohstoffRessource from './RohstoffRessource.js'

const MAIN_ID = 'stein'
const ANZAHL_ID = 'anzahl-stein'
const ZUGEWIESENE_ARBEITER_ID = 'zugewiesene-arbeiter-stein'
const ARBEITER_ZUWEISEN_ID = 'stein-arbeiter-zuweisen'
const ARBEITER_FREIGEBEN_ID = 'stein-arbeiter-freigeben'

const TEMPLATE = `
    <div class="row" id="${MAIN_ID}">
            <div class="col-2">Stein</div>
            <div class="col-3"><span id="${ANZAHL_ID}">0</span></div>
            <div class="col-3"><span id="${ZUGEWIESENE_ARBEITER_ID}">0</span></div>
            <div class="col-4">
                <button
                    type="button"
                    class="btn btn-primary"
                    id="${ARBEITER_ZUWEISEN_ID}">
                    <i class="bi bi-arrow-up-square"></i> Arbeiter zuweisen
                </button>
                <button
                    type="button"
                    class="btn btn-primary"
                    id="${ARBEITER_FREIGEBEN_ID}">
                    <i class="bi bi-arrow-down-square"></i> Arbeiter freigeben
                </button>
            </div>
        </div>
    `

export default class SteinRessource extends RohstoffRessource {
    constructor(data) {
        super(data, TEMPLATE)

        this.anzahlElement = this.getElement(ANZAHL_ID)
        this.zugewieseneArbeiterElement = this.getElement(ZUGEWIESENE_ARBEITER_ID)
        this.arbeiterZuweisenElement = this.getElement(ARBEITER_ZUWEISEN_ID)
        this.arbeiterFreigebenElement = this.getElement(ARBEITER_FREIGEBEN_ID)

        this.arbeiterZuweisenElement.addEventListener('click', () => {
            this.arbeiterZuweisen()
        })
        this.arbeiterFreigebenElement.addEventListener('click', () => {
            this.arbeiterFreigeben()
        })
    }

    arbeiterZuweisen() {
        const menge = 1
        this.data.steinArbeiterZuweisen(menge)
        this.globalUiUpdate()
    }

    arbeiterFreigeben() {
        const menge = 1
        this.data.steinArbeiterFreigeben(menge)
        this.globalUiUpdate()
    }

    updateUI() {
        this.anzahlElement.textContent = this.data.stein
        this.zugewieseneArbeiterElement.textContent = this.data.steinArbeiter
        this.arbeiterZuweisenElement.disabled = this.data.freieArbeiter() === 0
        this.arbeiterFreigebenElement.disabled = this.data.steinArbeiter === 0
    }
}
