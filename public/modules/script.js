let response = await fetch("../modules/dataJSON/data.json");
let json = await response.json();

json.menu = json.menu.map((product, index) => ({
    ...product,
    id: index
}))

const menuList = document.getElementById("contentID");
const basketList = document.getElementById("basket");

filterBtn(json.categories)
creatingProductElement(json.menu.filter((item) => item.category === "pizza"));

function creatingProductElement(menu) {
    menuList.innerHTML = "";
    for (let i = 0; i < menu.length; i++) {

        console.log('id', menu[i].id)

        const newDiv = document.createElement("div");
        newDiv.className = "product";

        // Preview
        const prudoctPreview = document.createElement("div");
        prudoctPreview.className = "product-prev";
        prudoctPreview.style = (`background-image:url('` + menu[i].image + `')`);

        // Name
        const prudoctName = document.createElement("div");
        prudoctName.className = "name-product";
        prudoctName.innerHTML = (`` + menu[i].name + ``);

        // Discription
        const prudoctDiscription = document.createElement("div");
        prudoctDiscription.className = "discription-product";
        prudoctDiscription.innerHTML = (`` + menu[i].description + ``);

        // Container Product Btn
        const containerProductBtn = document.createElement("div");
        containerProductBtn.className = "container-product-btn";

        // Pay Button
        const payButton = document.createElement("input");
        payButton.className = "pay-button";
        payButton.id = (`` + menu[i].category + i + ``);
        payButton.type = "button"
        payButton.value = (`` + menu[i].price + ` Р.`);

        // Pay Button
        const countProduct = document.createElement("input");
        countProduct.className = "text-input";
        countProduct.id = (`` + menu[i].id + ``);
        countProduct.type = "text"
        countProduct.value = (`1`);

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
                sandwichesFunction(i, item.categoryPrefix);
            } else {
                defaultFunction(item.name, item.price, item.id);
            }
        });
    }
}

function sandwichesFunction(i, categoryPrefix) {
    console.log(categoryPrefix + " | МОДАЛКА ОТКРЫТА | ID: " + i)
}

function defaultFunction(name, price, id) {
    let count = document.getElementById(id)
    if (count.value >= 20) {
        val = 20
    } else if (count.value <= 1) {
        var val = 1
    } else {
        var val = count.value;
    }
    const basketDiv = document.createElement("div");
    basketDiv.className = "product-basket";

    // Name
    const nameProductBasket = document.createElement("div");
    nameProductBasket.className = "";
    nameProductBasket.innerHTML = (`` + name + ``);

    // Count
    const countProductBasket = document.createElement("div");
    countProductBasket.className = "";
    countProductBasket.innerHTML = (val);

    basketDiv.appendChild(nameProductBasket);
    basketDiv.appendChild(countProductBasket);
    basketList.append(basketDiv);
}

function creatingModalElement() {
    // модалка
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