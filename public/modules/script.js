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

        const priceProduct = document.createElement("div")
        priceProduct.className = "price-name"
        priceProduct.textContent = `${menu[i].price}руб`;

        // Name
        const prudoctName = document.createElement("div");
        prudoctName.className = "name-product";
        prudoctName.textContent = menu[i].name;

        // Discription
        const prudoctDiscription = document.createElement("div");
        prudoctDiscription.className = "discription-product";
        prudoctDiscription.textContent = menu[i].description;

        // Description count text
        const countText = document.createElement("div")
        countText.className = "count-text";
        countText.textContent = "Количество"

        // Container
        const container = document.createElement("div")
        container.className = "content-container";

        // // Container Product Btn
        // const containerProductBtn = document.createElement("div");
        // containerProductBtn.className = "container-product-btn";

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

        // Pay Button
        const payButton = document.createElement("input");
        payButton.className = "pay-button";
        payButton.id = menu[i].category + i;
        payButton.type = "button"
        payButton.value = ":)";

        //addNode
        newDiv.appendChild(prudoctPreview);
        newDiv.appendChild(priceProduct);
        newDiv.appendChild(prudoctName);
        newDiv.appendChild(prudoctDiscription);
        newDiv.appendChild(countText);
        newDiv.appendChild(container);
        container.appendChild(countProduct);
        container.appendChild(payButton);
        // containerProductBtn.appendChild(payButton);
        // containerProductBtn.appendChild(countProduct);
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
                creatingModalElement({
                    name: item.name,
                    price: item.price,
                    id: item.id,
                    countProductValue: countProduct.value
                });
            } else {
                addingProductToTheBasket({
                    name: item.name,
                    price: item.price,
                    id: item.id,
                    countProductValue: countProduct.value
                });

            }
        });
    }
}

function addingProductToTheBasket(params) {
    let allPrice = (params.price * params.countProductValue)
    const basketDiv = document.createElement("div");
    basketDiv.className = "product-basket";

    // Delete
    const deleteProduct = document.createElement("button");
    deleteProduct.className = "trash-button";
    deleteProduct.addEventListener("click", () => {
        removeProductPriceFromBasket(allPrice)
        basketDiv.remove()
    })

    // Svg
    const svgTrash = document.createElement("img")
    svgTrash.src = "modules/svg/trash.svg"

    // Name
    const nameProductBasket = document.createElement("div");
    nameProductBasket.className = "";
    nameProductBasket.innerHTML = params.name;

    // Count
    const countProductBasket = document.createElement("div");
    countProductBasket.className = "";
    countProductBasket.textContent = params.countProductValue;

    basketDiv.appendChild(deleteProduct);
    deleteProduct.appendChild(svgTrash);
    basketDiv.appendChild(nameProductBasket);
    basketDiv.appendChild(countProductBasket);
    basketList.append(basketDiv);

    setProductPriceFroBasket(allPrice)
}

function setProductPriceFroBasket(allPrice) {
    sum.innerHTML = +sum.innerText + allPrice
}

function removeProductPriceFromBasket(allPrice) {
    sum.innerText = +sum.innerText - allPrice
}

function creatingModalElement(params) {
    let allPrice = (params.price * params.countProductValue)
    const newModal = document.createElement("div");
    newModal.id = "modal"

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const modalResize = document.createElement("div");
    modalResize.className = "modal-resize";

    const upContent = document.createElement("div");
    upContent.className = "";
    upContent.textContent = `${params.name}: ${params.countProductValue}`

    const downContent = document.createElement("div");
    downContent.className = "";
    downContent.textContent = allPrice

    newModal.appendChild(modalContent);
    modalContent.appendChild(modalResize);
    modalResize.appendChild(upContent);
    modalResize.appendChild(downContent);
    bodyModal.before(newModal);

    setTimeout(() => {
        newModal.remove()
        addingProductToTheBasket(params)
    }, 2000);
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

    // переделать

    for (let g = 0; g < categories.length; g++) {
        categories[g].id.addEventListener("click", () =>
            creatingProductElement(json.menu.filter((item) => item.category === categories[g].filter))
        );
    }
}