let response = await fetch("../modules/data.json");
let json = await response.json();
console.log(json)

addElement(json);

function addElement(json) {
    for (let i = 0; i < json.menu.length; i++) {
        console.log(json.menu[i].image)
        let newDiv = document.createElement("div");
        newDiv.className = "product";
        newDiv.innerHTML =
            `
                        <div style="background-image:url('` + json.menu[i].image + `');" class="product_prev">
                        </div>
                        <div class="name_product">
                        ` + json.menu[i].name + `
                        </div>
                        <div class="line"></div>
                        <div class="discription_product">` + json.menu[i].description + `</div>
                        <div class="line"></div>
                        <div class="price_product">
                            Цена: ` + json.menu[i].price + ` Р.
                        </div>
                        <input class="product_count" type="number" min="0" max="20">
                        <input type="button" value="Добавить в корзину" id="` + i + `" onclick="dropPay(id)"/>
        `


        document.getElementById("contentID").appendChild(newDiv);
    }
}

function dropPay(id) {
    console.log("ID: " + id + " Название товара: " + json[id].name)
}

const filterButton = document.getElementById("filterButton");

filterButton.addEventListener("click", filter);

function filter() {
    const elements = json.menu.filter((item) => item.category === "sandwiches")
    console.log(elements)
    document.getElementById("contentID").innerHTML = "";

    for (let i = 0; i < elements.length; i++) {
        console.log(elements[i].image)
        let newDiv = document.createElement("div");
        newDiv.className = "product";
        newDiv.innerHTML =
            `
                            <div style="background-image:url('` + elements[i].image + `');" class="product_prev">
                            </div>
                            <div class="name_product">
                            ` + elements[i].name + `
                            </div>
                            <div class="line"></div>
                            <div class="discription_product">` + elements[i].description + `</div>
                            <div class="line"></div>
                            <div class="price_product">
                                Цена: ` + elements[i].price + ` Р.
                            </div>
                            <input class="product_count" type="number" min="0" max="20">
                            <input type="button" value="Добавить в корзину" id="` + i + `" onclick="dropPay(id)"/>
            `


        document.getElementById("contentID").appendChild(newDiv);
    }
}


