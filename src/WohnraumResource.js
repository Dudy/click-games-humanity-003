import SiedlungResource from './SiedlungResource.js'

export default class WohnraumResource extends SiedlungResource {
    static WOHNRAUM_ID = 'wohnraum'
    static ANZAHL_WOHNRAUM_ID = 'anzahl-wohnraum'
    static VERWENDETER_WOHNRAUM_ID = 'verwendeter-wohnraum'
    static WOHNHAUS_1_BAUEN_ID = 'wohnhaus-1-bauen'
    static WOHNHAUS_1_BAUEN_KOSTEN_ID = 'wohnhaus-1-bauen-kosten'

    static TEMPLATE = `
        <div class="row" id="${WohnraumResource.WOHNRAUM_ID}">
            <div class="col-2">Wohnraum</div>
            <div class="col-3"><span id="${WohnraumResource.ANZAHL_WOHNRAUM_ID}">0</span></div>
            <div class="col-3"><span id="${WohnraumResource.VERWENDETER_WOHNRAUM_ID}">0</span></div>
            <div class="col-4">
                <button
                    type="button"
                    class="btn btn-primary"
                    id="${WohnraumResource.WOHNHAUS_1_BAUEN_ID}">
                    <i class="bi bi-arrow-up-square"></i> Wohnhaus 1 bauen
                </button>
                <span id="${WohnraumResource.WOHNHAUS_1_BAUEN_KOSTEN_ID}"> Kosten:</span>
            </div>
        </div>
    `

    kosten = {
        holz: 20,
        stein: 10,
        fleisch: 0
    }

    constructor(data, globalUiUpdater) {
        super(data, globalUiUpdater, WohnraumResource.TEMPLATE)

        this.wohnraumElement = this.getElement(WohnraumResource.WOHNRAUM_ID)
        this.anzahlWohnraumElement = this.getElement(WohnraumResource.ANZAHL_WOHNRAUM_ID)
        this.verwendeterWohnraumElement = this.getElement(WohnraumResource.VERWENDETER_WOHNRAUM_ID)
        this.wohnhaus1BauenElement = this.getElement(WohnraumResource.WOHNHAUS_1_BAUEN_ID)
        this.wohnhaus1BauenKostenElement = this.getElement(WohnraumResource.WOHNHAUS_1_BAUEN_KOSTEN_ID)

        this.wohnhaus1BauenElement.addEventListener('click', () => {
            this.baueWohnraum()
        })
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
