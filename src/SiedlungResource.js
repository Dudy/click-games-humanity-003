export default class SiedlungResource {
    data
    domElement

    constructor(data, template) {
        this.data = data

        console.log(template)

        this.domElement = document
            .createRange()
            .createContextualFragment(template)
    }

    createEmitter(type, payload) {
        return function() {
            window.dispatchEvent(new CustomEvent(type, { detail: payload }))
        }
    }

    getDomElement() {
        return this.domElement
    }

    getElement(id) {
        return this.domElement.getElementById(id)
    }
}
