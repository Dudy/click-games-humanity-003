import RohstoffRessource from './RohstoffRessource.js'

const MAIN_ID = 'holz'
const ANZAHL_ID = 'anzahl-holz'
const ZUGEWIESENE_ARBEITER_ID = 'zugewiesene-arbeiter-holz'
const ARBEITER_ZUWEISEN_ID = 'holz-arbeiter-zuweisen'
const ARBEITER_FREIGEBEN_ID = 'holz-arbeiter-freigeben'

const TEMPLATE = `
    <div class="row" id="${MAIN_ID}">
            <div class="col-2">Holz</div>
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

export default class HolzRessource extends RohstoffRessource {
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
        this.data.holzArbeiterZuweisen(menge)
        this.globalUiUpdate()
    }

    arbeiterFreigeben() {
        const menge = 1
        this.data.holzArbeiterFreigeben(menge)
        this.globalUiUpdate()
    }

    updateUI() {
        this.anzahlElement.textContent = this.data.holz
        this.zugewieseneArbeiterElement.textContent = this.data.holzArbeiter
        this.arbeiterZuweisenElement.disabled = this.data.freieArbeiter() === 0
        this.arbeiterFreigebenElement.disabled = this.data.holzArbeiter === 0
    }
}
