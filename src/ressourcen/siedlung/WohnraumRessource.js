import SiedlungRessource from './SiedlungRessource.js'

const WOHNRAUM_ID = 'wohnraum'
const ANZAHL_WOHNRAUM_ID = 'anzahl-wohnraum'
const VERWENDETER_WOHNRAUM_ID = 'verwendeter-wohnraum'
const WOHNHAUS_1_BAUEN_ID = 'wohnhaus-1-bauen'
const WOHNHAUS_1_BAUEN_KOSTEN_ID = 'wohnhaus-1-bauen-kosten'

const TEMPLATE = `
    <div class="row" id="${WOHNRAUM_ID}">
        <div class="col-2">Wohnraum</div>
        <div class="col-3"><span id="${ANZAHL_WOHNRAUM_ID}">0</span></div>
        <div class="col-3"><span id="${VERWENDETER_WOHNRAUM_ID}">0</span></div>
        <div class="col-4">
            <div class="row">
                <button
                    type="button"
                    class="btn btn-primary"
                    id="${WOHNHAUS_1_BAUEN_ID}">
                    <i class="bi bi-arrow-up-square"></i> Wohnhaus 1 bauen
                </button>
            </div>
            <div class="row">
                <span id="${WOHNHAUS_1_BAUEN_KOSTEN_ID}"> Kosten:</span>
            </div>
        </div>
    </div>
`

export default class WohnraumRessource extends SiedlungRessource {
    kosten = {
        holz: 20,
        stein: 10,
        fleisch: 0
    }

    constructor(data) {
        super(data, TEMPLATE)

        this.wohnraumElement = this.getElement(WOHNRAUM_ID)
        this.anzahlWohnraumElement = this.getElement(ANZAHL_WOHNRAUM_ID)
        this.verwendeterWohnraumElement = this.getElement(VERWENDETER_WOHNRAUM_ID)
        this.wohnhaus1BauenElement = this.getElement(WOHNHAUS_1_BAUEN_ID)
        this.wohnhaus1BauenKostenElement = this.getElement(WOHNHAUS_1_BAUEN_KOSTEN_ID)

        this.wohnhaus1BauenElement.addEventListener('click', () => {
            this.baueWohnraum()
        })

        this.updateUI()
    }

    baueWohnraum() {
        const menge = 3
        if (this.data.holz >= this.kosten.holz && this.data.stein >= this.kosten.stein && this.data.fleisch >= this.kosten.fleisch) {
            this.data.wohnraum += menge
            this.data.holz -= this.kosten.holz
            this.data.stein -= this.kosten.stein
            this.data.fleisch -= this.kosten.fleisch
        }
        this.globalUiUpdate()
    }

    updateUI() {
        this.anzahlWohnraumElement.textContent = this.data.wohnraum
        this.verwendeterWohnraumElement.textContent = this.data.arbeiter + ' bewohnt (' + (this.data.wohnraum - this.data.arbeiter) + ' frei)'
        this.wohnhaus1BauenKostenElement.textContent = ' Kosten: ' + this.kosten.holz + ' Holz, ' + this.kosten.stein + ' Stein, ' + this.kosten.fleisch + ' Fleisch'
        this.wohnhaus1BauenElement.disabled = this.data.holz < this.kosten.holz || this.data.stein < this.kosten.stein || this.data.fleisch < this.kosten.fleisch
    }
}
