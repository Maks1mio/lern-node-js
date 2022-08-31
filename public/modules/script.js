let response = await fetch("../modules/data.json");
let json = await response.json();
console.log(json)

const menuList = document.getElementById("contentID");

addElement(json.menu);

function addElement(menu) {
    menuList.innerHTML = ""; // очистка от предыдущего меню

    for (let i = 0; i < menu.length; i++) {
        console.log(menu[i].image)
        let newDiv = document.createElement("div");
        newDiv.className = "product";
        newDiv.innerHTML =
            `
            <div style="background-image:url('` + menu[i].image + `');" class="product_prev">
            </div>
            <div class="name_product">
            ` + menu[i].name + `
            </div>
            <div class="line"></div>
            <div class="discription_product">` + menu[i].description + `</div>
            <div class="line"></div>
            <div class="price_product">
                Цена: ` + menu[i].price + ` Р.
            </div>
            <input class="product_count" type="number" min="0" max="20">
            <input type="button" value="Добавить в корзину" id="` + i + `" onclick="dropPay(id)"/>
        `

        menuList.appendChild(newDiv);
    }
}

function dropPay(id) {
    console.log("ID: " + id + " Название товара: " + json[id].name)
}

const pizzaFilter = document.getElementById("pizzaFilter");
pizzaFilter.addEventListener("click", () =>
    addElement(json.menu.filter((item) => item.category === "pizza"))
);

const shaurmaFilter = document.getElementById("shaurmaFilter");
shaurmaFilter.addEventListener("click", () =>
    addElement(json.menu.filter((item) => item.category === "shaurma"))
);

const burgerFilter = document.getElementById("burgerFilter");
burgerFilter.addEventListener("click", () =>
    addElement(json.menu.filter((item) => item.category === "burgers"))
);

const saladFilter = document.getElementById("saladFilter");
saladFilter.addEventListener("click", () =>
    addElement(json.menu.filter((item) => item.category === "salads"))
);

const drinkFilter = document.getElementById("drinkFilter");
drinkFilter.addEventListener("click", () =>
    addElement(json.menu.filter((item) => item.category === "drinks"))
);

const chickenFilter = document.getElementById("chickenFilter");
chickenFilter.addEventListener("click", () =>
    addElement(json.menu.filter((item) => item.category === "chicken"))
);

const sandwichFilter = document.getElementById("sandwichFilter");
sandwichFilter.addEventListener("click", () =>
    addElement(json.menu.filter((item) => item.category === "sandwiches"))
);

const clearFilter = document.getElementById("clearFilter");
clearFilter.addEventListener("click", () =>
    addElement(json.menu)
);
