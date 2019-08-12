

const form = document.querySelector('#myForm');
let shoppintList = [
    // {
    //     name: 'aveia',
    //     value: 2.5,
    //     quantity: 1
    // },
    // {
    //     name: 'Arroz',
    //     value: 2.33,
    //     quantity: 1
    // },
    // {
    //     name: 'Cafe',
    //     value: 4,
    //     quantity: 1
    // },
    // {
    //     name: 'Batata',
    //     value: 2.5,
    //     quantity: 1
    // },

]

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name');
    const value = document.querySelector('#value');

    shoppintList.push({
        name: name.value,
        value: value.value,
        quantity: 1
    })
    localStorage.setItem('list', JSON.stringify(shoppintList));
    name.value = '';
    value.value = '';
    renderList()
})

function increment(index) {
    shoppintList[index].quantity += 1;
    localStorage.setItem('list', JSON.stringify(shoppintList));
    renderList()
}
function decrement(index) {
    if (shoppintList[index].quantity > 0) {
        shoppintList[index].quantity -= 1;
        localStorage.setItem('list', JSON.stringify(shoppintList));
        renderList()
    }
}
function deleteItem(index) {
    shoppintList.splice(index, 1)
    localStorage.setItem('list', JSON.stringify(shoppintList));
    renderList()
}

function renderList() {
    if (shoppintList.length === 0) {
        shoppintList = JSON.parse(localStorage.getItem('list')) || []
    }
    const list = document.querySelector('#list');
    let total = 0;
    list.innerHTML = '';
    shoppintList.forEach((item, index) => {
        list.innerHTML += `
        <li class="${item.quantity === 0 ? 'small' : ''}">
            <strong>${item.name}</strong>
            <strong class="value">R$${item.value}</strong>
            <span class="quantity">QTD.${item.quantity}</span>
            <span class="subtotal">R$${item.quantity * item.value}</span>
            <div>
                <button class="btn plus" onclick="increment(${index})">+</button>
                <button  class="btn less" onclick="decrement(${index})">-</button>
                ${item.quantity === 0 ? `<button class="btn del" onclick="deleteItem(${index})">x</button>` : ''}
            </div>
        </li>`;
        total += (item.quantity * item.value)
    })
    list.innerHTML += `
    <li>
    <hr>
        <strong>Total</strong>
        <strong class="total">R$${total}</strong>
    </li>`;

}

renderList()
