let response = await fetch("../modules/data.json");
let json = await response.json();
let productIdFix = 1; // Херня которая фиксит отображение продукта для кнопок

console.log(json)


const menuList = document.getElementById("contentID");

creatingProductElement(json.menu);

function creatingProductElement(menu) {
    menuList.innerHTML = ""; // очистка от предыдущего меню
    console.log(menu.length)
    console.log(menu)
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
            <input class="product_count" type="number" value="0" min="0" max="20">
            <input class="pay_button" id="` + menu[i].category + i + `" type="button" value="Добавить в корзину ` + menu[i].category + `"/>
        `

        menuList.append(newDiv);
        if (menu[i].category === "sandwiches") {
            modal(i + productIdFix)
        } else if (menu[i].category != "sandwiches") {
            modal(i + productIdFix)
        }
    }
}



function modal(i) {
    if (document.querySelectorAll("sandwiches" + i)){
        var btn = document.querySelectorAll("sandwiches" + i)
        btn.onclick = function () {
            let productId = (i - productIdFix)
            console.log('sandwiches' + productId)
        }
    } else {
        var btn = document.querySelectorAll("salds" + i)
        btn.onclick = function () {
            let productId = (i - productIdFix)
            console.log("Добавлено в карзину salds" + productId)
        }
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

const Filter = document.getElementById("pizzaFilter");
if (Filter)
    pizzaFilter.addEventListener("click", () =>
        creatingProductElement(json.menu.filter((item) => item.category === "pizza"))
    );

const shaurmaFilter = document.getElementById("shaurmaFilter");
shaurmaFilter.addEventListener("click", () =>
    creatingProductElement(json.menu.filter((item) => item.category === "shaurma"))
);

const burgerFilter = document.getElementById("burgerFilter");
burgerFilter.addEventListener("click", () =>
    creatingProductElement(json.menu.filter((item) => item.category === "burgers"))
);

const saladFilter = document.getElementById("saladFilter");
saladFilter.addEventListener("click", () =>
    creatingProductElement(json.menu.filter((item) => item.category === "salads"))
);

const drinkFilter = document.getElementById("drinkFilter");
drinkFilter.addEventListener("click", () =>
    creatingProductElement(json.menu.filter((item) => item.category === "drinks"))
);

const chickenFilter = document.getElementById("chickenFilter");
chickenFilter.addEventListener("click", () =>
    creatingProductElement(json.menu.filter((item) => item.category === "chicken"))
);

const sandwichFilter = document.getElementById("sandwichFilter");
sandwichFilter.addEventListener("click", () =>
    creatingProductElement(json.menu.filter((item) => item.category === "sandwiches"))
);

const clearFilter = document.getElementById("clearFilter");
clearFilter.addEventListener("click", () =>
    creatingProductElement(json.menu)
);