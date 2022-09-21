let response = await fetch("../modules/dataJSON/data.json");
let json = await response.json();
let value;

json.menu = json.menu.map((product, index) => ({
    ...product,
    id: index
}))

const menuList = document.getElementById("contentID");
const basketList = document.getElementById("basket");
const bodyModal = document.getElementById("forModal");

filterBtn(json.categories)
creatingProductElement(json.menu.filter((item) => item.category === "pizza"));

function creatingProductElement(menu) {
    menuList.innerHTML = "";
    for (let i = 0; i < menu.length; i++) {
        console.log(menu[i].id)
        console.log(i)
        const newDiv = document.createElement("div");
        newDiv.className = "product";

        // Preview
        const prudoctPreview = document.createElement("div");
        prudoctPreview.className = "product-prev";
        prudoctPreview.style = `background-image:url('` + menu[i].image + `')`;

        // Name
        const prudoctName = document.createElement("div");
        prudoctName.className = "name-product";
        prudoctName.innerHTML = menu[i].name;

        // Discription
        const prudoctDiscription = document.createElement("div");
        prudoctDiscription.className = "discription-product";
        prudoctDiscription.innerHTML = menu[i].description;

        // Container Product Btn
        const containerProductBtn = document.createElement("div");
        containerProductBtn.className = "container-product-btn";

        // Pay Button
        const payButton = document.createElement("input");
        payButton.className = "pay-button";
        payButton.id = menu[i].category + i;
        payButton.type = "button"
        payButton.value = menu[i].price;

        // Count Product
        const countProduct = document.createElement("input");
        countProduct.className = "text-input";
        countProduct.id = menu[i].id;
        countProduct.type = "number"
        countProduct.value = 1;
        countProduct.addEventListener("input", () => {
            if (countProduct.value >= 20) {
                countProduct.value = 20
            } else if (countProduct.value <= 1) {
                countProduct.value = 1
            }
        })

        //addNode
        newDiv.appendChild(prudoctPreview);
        newDiv.appendChild(prudoctName);
        newDiv.appendChild(prudoctDiscription);
        newDiv.appendChild(containerProductBtn);
        containerProductBtn.appendChild(payButton);
        containerProductBtn.appendChild(countProduct);
        menuList.append(newDiv);

        // Нажатие на кнопки
        const item = {
            name: menu[i].name,
            price: menu[i].price,
            id: menu[i].id,
            categoryPrefix: menu[i].category + i,
            category: menu[i].category
        };
        payButton.addEventListener("click", () => {
            if (item.category === "sandwiches") {
                creatingModalElement(item.name, item.price, item.id, countProduct.value);
            } else {
                defaultFunction(item.name, item.price, item.id, countProduct.value);
            }
        });
    }
}

function defaultFunction(name, price, id, count) {
    const basketDiv = document.createElement("div");
    basketDiv.className = "product-basket";

    // Name
    const nameProductBasket = document.createElement("div");
    nameProductBasket.className = "";
    nameProductBasket.innerHTML = `Товар: ${name}`;

    // Count
    const countProductBasket = document.createElement("div");
    countProductBasket.className = "";
    countProductBasket.textContent = `Цена: ${price * count}, Кол: ${count}`;

    basketDiv.appendChild(nameProductBasket);
    basketDiv.appendChild(countProductBasket);
    basketList.append(basketDiv);
}

function creatingModalElement(name, price, id, count) {
    const newModal = document.createElement("div");
    newModal.id = "modal"

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const modalResize = document.createElement("div");
    modalResize.className = "modal-resize";

    const upContent = document.createElement("div");
    upContent.className = "";
    upContent.textContent = `${name}: ${count}`

    const downContent = document.createElement("div");
    downContent.className = "";
    downContent.textContent = price

    newModal.appendChild(modalContent);
    modalContent.appendChild(modalResize);
    modalResize.appendChild(upContent);
    modalResize.appendChild(downContent);
    bodyModal.before(newModal);

    setTimeout(() => {
        // newModal.remove();
    }, 3000);
}

function filterBtn() {
    const categories = [{
            id: pizzaFilter,
            filter: 'pizza'
        },
        {
            id: sandwichFilter,
            filter: 'sandwiches'
        },
        {
            id: chickenFilter,
            filter: 'chicken'
        },
        {
            id: drinkFilter,
            filter: 'drinks'
        },
        {
            id: shaurmaFilter,
            filter: 'shaurma'
        },
        {
            id: burgerFilter,
            filter: 'burgers'
        },
        {
            id: saladFilter,
            filter: 'salads'
        },
    ]

    for (let g = 0; g < categories.length; g++) {
        categories[g].id.addEventListener("click", () =>
            creatingProductElement(json.menu.filter((item) => item.category === categories[g].filter))
        );
    }
}