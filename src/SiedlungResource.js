export default class SiedlungResource {
    data
    domElement

    constructor(data, globalUiUpdater, template) {
        this.data = data
        this.globalUiUpdater = globalUiUpdater
        this.domElement = document.createRange().createContextualFragment(template)
    }

    createEmitter(type, payload) {
        return function () {
            window.dispatchEvent(new CustomEvent(type, { detail: payload }))
        }
    }

    getDomElement() {
        return this.domElement
    }

    getElement(id) {
        return this.domElement.getElementById(id)
    }

    globalUiUpdate() {
        this.globalUiUpdater()
    }
}
