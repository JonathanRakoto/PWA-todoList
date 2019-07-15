import { LitElement, html, css } from 'lit-element'

export default class List extends LitElement {

    constructor() {
        super();

        this.id = "";
        this.title = "";
        this.state = "";
    }

    static get properties() {
        return {
            id: { type: String },
            title: { type: String },
            state: { type: Boolean }
        }
    }

    initList(id, title, state){
        this.id = id;
        this.title = title;
        this.state = state;
    }

    static get styles() {
        return css`
            li {
                padding-left: 10px;
            }
            button {
            }
            `
    }

    async delete(id){
        let remove = document.querySelector('#button-' + id);
        remove.addEventListener('click', async function() {
            await fetch('http://localhost:3000/items', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: id})
            })
                .then(res => res.text())
        })
    }

    render(){
     return html`
        <li id="${this.id}">${this.title}</li>
        <button id="button-${this.id}" @click=${this.delete(this.id)}>Remove</button>
    `;
    }
}

customElements.define('app-list', List);
