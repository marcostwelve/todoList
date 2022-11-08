const texto = document.querySelector('input');
const btnInsert = document.querySelector('.divInsert button');
const btnDeleteAll = document.querySelector('.header button');
const ul = document.querySelector('ul');

var itensBD = [];

btnDeleteAll.onclick = () => {
    itensBD = [];
    updateBD();
}

texto.addEventListener('keypress', e => {
    if(e.key == 'Enter' && texto.value != '') {
        setItemBD();
    }
});

btnInsert.onclick = () => {
    if(texto.value != '') {
        setItemBD();
    }
}

function setItemBD() {
    if(itensBD.length >= 20) {
        alert('Limite máximo de 20 itens atingido!');
        return;
    }

    itensBD.push({'item': texto.value, 'status': ''});
    updateBD();
}

function updateBD() {
    localStorage.setItem('todolist', JSON.stringify(itensBD));
    loadItens();
}

function loadItens() {
    ul.innerHTML = "";
    itensBD = JSON.parse(localStorage.getItem('todolist')) ?? []
    itensBD.forEach((item, i) => {
        insertItemTela(item.item, item.status, i)
    });
}

function insertItemTela(text, status, i) {
    const li = document.createElement('li');

    li.innerHTML = `
        <div class="divLi">
            <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
            <span data-si=${i}>${text}</span>
            <button onclick="removeItem(${i})" data-i=${i}><i class="bx bx-trash"></i></button>
        </div>
        `

        ul.appendChild(li);

        if(status) {
            document.querySelector(`[data-si="${i}"]`).classList.add('line-through');
        }
        else {
            document.querySelector(`[data-si="${i}"]`).classList.remove('line-through');
        }

        texto.value = "";

}

function done(chk, i) {
    if(chk.checked) {
        itensBD[i].status = 'checked';
    }
    else {
        itensBD[i].status = '';
    }

    updateBD();
}

function removeItem(i) {
    itensBD.splice(i, 1);
    updateBD();
}

loadItens();