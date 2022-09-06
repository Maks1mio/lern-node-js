let response = await fetch("../modules/data.json");
let json = await response.json();   
console.log(json)

const menuList = document.getElementById("contentID");
const modal = $.modal(open)

addElement(json.menu);

function addElement(menu) {
    menuList.innerHTML = ""; // очистка от предыдущего меню

    for (let i = 0; i < menu.length; i++) {
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
            <div class="line">
            
            </div>
            <div class="price_product">
                Цена: ` + menu[i].price + ` Р.
            </div>
            <input class="product_count" type="number" min="0" max="20">
            <input class="pay_button" type="button" value="Добавить в корзину" data-btn="` + menu[i].name + `"/>
        `

        menuList.appendChild(newDiv);
    }
}

document.addEventListener("click", event => {
    const btnType = event.target.dataset.btn
    for (let i = 0; i < json.menu.length; i++) {
        if (btnType === json.menu[i].name) {
            console.log(json.menu[i].name)
        }
    }
})

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
