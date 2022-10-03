let response = await fetch("../modules/dataJSON/data.json");
let json = await response.json();
let value;

let constructorModal = {
    Id: 1,
    stepID1: 0,
    
};

json.menu = json.menu.map((product, index) => ({
    ...product,
    id: index
}))

const menuList = document.getElementById("contentID");
const basketList = document.getElementById("basket");
const bodyModal = document.getElementById("forModal");

filterBtn(json)
creatingProductElement(json.menu.filter((item) => item.category === "pizza"), json);

function creatingProductElement(menu, json) {
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

        // Container Product Btn
        const containerProductBtn = document.createElement("div");
        containerProductBtn.className = "container-product-btn";


        // Button Minus
        const minusButton = document.createElement("button");
        minusButton.className = "button-plus-minus"
        minusButton.textContent = "-"
        minusButton.addEventListener("click", () => {
            if (countProduct.value <= 1) countProduct.value = 1
            else countProduct.value = parseInt(countProduct.value) - 1
        })

        // Button Plus
        const plusButton = document.createElement("button");
        plusButton.className = "button-plus-minus"
        plusButton.textContent = "+"
        plusButton.addEventListener("click", () => {
            if (countProduct.value >= 20) countProduct.value = 20
            else countProduct.value = parseInt(countProduct.value) + 1
        })

        // Count Product
        const countProduct = document.createElement("input");
        countProduct.className = "text-input";
        countProduct.id = menu[i].id;
        countProduct.type = "number"
        countProduct.value = 1;
        countProduct.addEventListener("input", () => {
            if (countProduct.value >= 20) countProduct.value = 20
            else if (countProduct.value <= 1) countProduct.value = 1
        })

        // Pay Button
        const payButton = document.createElement("button");
        payButton.className = "pay-button";
        payButton.id = menu[i].category + i;
        payButton.type = "button"
        payButton.textContent = "В корзину"

        //addNode
        newDiv.appendChild(prudoctPreview);
        newDiv.appendChild(priceProduct);
        newDiv.appendChild(prudoctName);
        newDiv.appendChild(prudoctDiscription);
        newDiv.appendChild(countText);
        newDiv.appendChild(container);
        container.appendChild(payButton);
        container.appendChild(containerProductBtn);
        containerProductBtn.appendChild(countProduct);
        containerProductBtn.appendChild(minusButton);
        containerProductBtn.appendChild(plusButton);
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
                    json: json,
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
    const newModal = document.createElement("div");
    newModal.id = "modal"

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    const modalResize = document.createElement("div");
    modalResize.className = "modal-resize";

    const upContent = document.createElement("div");
    upContent.className = "modal-top-description";
    upContent.textContent = `Проверьте и добавьте в корзину`

    const closeButton = document.createElement("button")
    closeButton.addEventListener("click", () => {
        newModal.remove()
    })
    closeButton.className = "modal-close"

    const svgClose = document.createElement("img")
    svgClose.src = "modules/svg/close.svg"

    const downContent = document.createElement("div");
    downContent.className = "modal-down-content";
    downContent.id = "inModal"

    newModal.appendChild(modalContent);
    modalContent.appendChild(modalResize);
    modalResize.appendChild(upContent);
    modalResize.appendChild(downContent);
    upContent.appendChild(closeButton);
    closeButton.appendChild(svgClose);
    bodyModal.before(newModal);

    greatingWindowInModal(params, {
        id: downContent.id,
    })
}

function greatingWindowInModal(params, elemId) {
    const modalWindow = document.getElementById(elemId.id)

    const steps = [{
            id: 'stepID0',
            name: 'Размер'
        },
        {
            id: 'stepID1',
            name: 'Хлеб'
        },
        {
            id: 'stepID2',
            name: 'Овощи'
        },
        {
            id: 'stepID3',
            name: 'Соусы'
        },
        {
            id: 'stepID4',
            name: 'Начинка'
        },
    ]

    const borderSteps = document.createElement("div");
    borderSteps.className = "border-step"

    for (let g = 0; g < steps.length; g++) {
        const stepContaine = document.createElement("div")
        stepContaine.className = "step-container"
        stepContaine.id = steps[g].id;

        const rectangle = document.createElement("div")
        rectangle.className = "step-rectangle"

        const stepName = document.createElement("div")
        stepName.className = "step-name"
        stepName.textContent = steps[g].name;

        stepContaine.appendChild(rectangle);
        stepContaine.appendChild(stepName);
        borderSteps.append(stepContaine);
    }

    modalWindow.append(borderSteps);

    stepSize(params, elemId);
}

function stepSize(params, elemId) {
    const newModal = document.getElementById("modal");

    const modalWindow = document.getElementById(elemId.id)

    const selectContent = document.createElement("div")
    selectContent.className = "select-content";
    selectContent.id = "selectContentId";

    const selectStep = document.createElement("div")
    selectStep.className = "select-steps";
    selectContent.id = "selectStepId";

    const rectangleModalUp = document.createElement("div")
    rectangleModalUp.className = "rectangle-modal";

    const scroller = document.createElement("div")
    scroller.className = "scroller";

    const rectangleModalDown = document.createElement("div")
    rectangleModalDown.className = "rectangle-modal";

    const sortFlex = document.createElement("div")
    sortFlex.className = "sort-flex";

    for (let i = 0; i < params.json.sizes.length; i++) {
 
        const productModal = document.createElement("div")
        productModal.className = "product-modal";
        productModal.id = "productModalID" + i;
        // if (i == localStorage.getItem()) {
        //     productModal.style.background = "#c43d33";
        //     console.log(localStorage.stepID0)
        // }
        productModal.addEventListener("click", () => {
            constructorModal.stepID1 = i;
            ChangeProduc(constructorModal.stepID1);
            // step(params, elemId);
        })

        const productModalPrev = document.createElement("div")
        productModalPrev.className = "product-modal-prev";
        if (constructorModal.Id = 1) {
            constructorModal.imageID1 = params.json.sizes[i].image
            productModalPrev.style = `background-image:url(${constructorModal.imageID1})`;
        }

        const priceName = document.createElement("span")
        priceName.className = "price-name";
        if (constructorModal.Id = 1) {
            constructorModal.priceID1 = params.json.sizes[i].price;
            priceName.textContent = `${constructorModal.priceID1}руб`;
        }

        const nameProduct = document.createElement("span")
        nameProduct.className = "name-product"
        if (constructorModal.Id = 1) {
            constructorModal.nameID1 = params.json.sizes[i].name
            nameProduct.textContent = constructorModal.nameID1;
        }

        sortFlex.appendChild(productModal);
        productModal.appendChild(productModalPrev);
        productModal.appendChild(priceName);
        productModal.appendChild(nameProduct);
    }

    const stepButtonBack = document.createElement("button")
    stepButtonBack.className = "step-button";
    if (constructorModal.Id = 1) {
        stepButtonBack.textContent = "ЗАКРЫТЬ"
        stepButtonBack.addEventListener("click", () => {
            newModal.remove();
        })
    }

    const stepButtonNext = document.createElement("button")
    stepButtonNext.className = "step-button";
    stepButtonNext.textContent = "ВПЕРЕД"

    modalWindow.append(selectContent);
    selectContent.appendChild(rectangleModalUp);
    selectContent.appendChild(scroller);
    scroller.appendChild(sortFlex);
    selectContent.appendChild(rectangleModalDown);
    modalWindow.append(selectStep);
    selectStep.appendChild(stepButtonBack);
    selectStep.appendChild(stepButtonNext);
}

function ChangeProduc(item) {
    console.log(item)
    // serlectItem = document.getElementById("");
}

function filterBtn(json) {
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
            creatingProductElement(json.menu.filter((item) => item.category === categories[g].filter), json)
        );
    }
}