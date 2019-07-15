import List from '/src/components/list/list.js';
import { openDB } from '/node_modules/idb/build/esm/index.js';
import checkConnectivity  from '/src/connection.js';
import uuidv4 from "./helpers/uuidv4";

(async function (document) {

    const app = document.querySelector('#app');
    const btnNew = app.querySelector('#newItem');
    const skeleton = app.querySelector('.skeleton');
    const todoListPage = app.querySelector('[page=todoList]');
    const todoList = app.querySelector('#todoList');
    const url = 'http://localhost:3000/items';

    const getData = await fetch(url, { method: 'get' })
        .then(res => res.json())
        .catch(error => console.log(error));

    checkConnectivity();
    document.addEventListener('connection-changed', async ({ detail }) => {
        if(items !== undefined){
            items.forEach(async item => {
                const getExist = await fetch(url + "/" + item.id, { method: 'get' })
                    .then(res => res.json());
                if(!getExist.id){
                    await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(item)
                    }).then(res => res.json());
                }
            });
        }

        if(!detail) {
            console.log('Connection is changed to slow');
        }
    });

    skeleton.removeAttribute('active');
    todoListPage.setAttribute('active', '');

    const database = await openDB('app-store', 1, {
        upgrade(db) {
            db.createObjectStore('items');
        }
    });
    const items = await database.get('items', 'items');

    if(items !== undefined){
        await database.put('items', getData, 'items');
    } else {
        await database.put('items', [], 'items');
    }

    btnNew.addEventListener('click', async function () {
        let li = document.createElement('li');
        let value = document.getElementById('input').value;
        let text = document.createTextNode(value);
        li.appendChild(text);
        if (value === '') {
            alert('Input Empty, you must write something');
            return false;
        } else {
            document.getElementById('todoList').appendChild(li).classList.add("item-list");
        }
        document.getElementById("input").value = "";

        let newItem = {
            "id": uuidv4(),
            "title": value,
            "state": false
        };

        items.push(newItem);
        await database.put('items', items, 'items');
    });

    try {
        if(items !== undefined) {
            items.forEach(item => {
                const listElement = new List();
                listElement.initList(item.id, item.title, item.state, listElement);
                todoList.appendChild(listElement);
                return listElement;
            });
        } else {
            const listElement = new List();
            todoListPage.appendChild(listElement);
            return listElement;
        }
    } catch (error) {
        console.log(error.toString());
    }

})(document);
