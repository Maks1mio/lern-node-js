let response = await fetch("../modules/data.json");
let json = await response.json();

const menuList = document.getElementById("contentID");

creatingProductElement(json.menu.filter((item) => item.category === "pizza"));

function creatingProductElement(menu) {
    menuList.innerHTML = "";
    for (let i = 0; i < menu.length; i++) {

        // Product
        const newDiv = document.createElement("div");
        newDiv.className = "product";

        // Prudoct Preview
        const prudoctPreview = document.createElement("div");
        prudoctPreview.className = "product_prev";
        prudoctPreview.style = (`background-image:url('` + menu[i].image + `')`);

        // Prudoct Name
        const prudoctName = document.createElement("div");
        prudoctName.className = "name_product";
        prudoctName.innerHTML = (`` + menu[i].name + ``);

        // Prudoct Discription
        const prudoctDiscription = document.createElement("div");
        prudoctDiscription.className = "discription_product";
        prudoctDiscription.innerHTML = (`` + menu[i].description + ``);

        // Container Product Btn
        const containerProductBtn = document.createElement("div");
        containerProductBtn.className = "container_product_btn";

        // Pay Button
        const payButton = document.createElement("input");
        payButton.className = "pay_button";
        payButton.id = (`` + menu[i].category + i + ``);
        payButton.type = "button"
        payButton.value = (`` + menu[i].price + ` Р.`);

        //addNode
        newDiv.appendChild(prudoctPreview);
        newDiv.appendChild(prudoctName);
        newDiv.appendChild(prudoctDiscription);
        newDiv.appendChild(containerProductBtn);
        containerProductBtn.appendChild(payButton);
        menuList.append(newDiv);

        // Нажатие на кнопки
        const item = {
            categoryPrefix: menu[i].category + i,
            category: menu[i].category
        };

        payButton.addEventListener("click", () => {

            if (item.category === "sandwiches") {
                sandwichesFunction(i, item.categoryPrefix);
            } else {
                defaultFunction(i, item.categoryPrefix);
            }
        });
    }
}

function sandwichesFunction(i, categoryPrefix) {
    console.log(categoryPrefix + " | МОДАЛКА ОТКРЫТА | ID: " + i)
}

function defaultFunction(i, categoryPrefix) {
    console.log(categoryPrefix + " | НЕ МОДАЛКА! | ID: " + i)
}

function creatingModalElement() {
    // Модалка
}

const Filter = document.getElementById("pizzaFilter", "sandwichFilter", "chickenFilter", "drinkFilter", "shaurmaFilter", "burgerFilter", "saladFilter");
if (Filter) {
    pizzaFilter.addEventListener("click", () =>
        creatingProductElement(json.menu.filter((item) => item.category === "pizza"))
    );
    sandwichFilter.addEventListener("click", () =>
        creatingProductElement(json.menu.filter((item) => item.category === "sandwiches"))
    );
    chickenFilter.addEventListener("click", () =>
        creatingProductElement(json.menu.filter((item) => item.category === "chicken"))
    );
    drinkFilter.addEventListener("click", () =>
        creatingProductElement(json.menu.filter((item) => item.category === "drinks"))
    );
    shaurmaFilter.addEventListener("click", () =>
        creatingProductElement(json.menu.filter((item) => item.category === "shaurma"))
    );
    burgerFilter.addEventListener("click", () =>
        creatingProductElement(json.menu.filter((item) => item.category === "burgers"))
    );
    saladFilter.addEventListener("click", () =>
        creatingProductElement(json.menu.filter((item) => item.category === "salads"))
    );
}