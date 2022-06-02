const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

let my_div = newDiv = null;
let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
users.forEach(addElement);

async function getInfo() {
        let potUrl = "https://api.github.com/users/" + searchInput.value;

        let url = await fetch(potUrl);
        let response = await url.json();

        return {
                login: response.login,
                avatar_url: response.avatar_url
        };
}

async function addUser() {
        let user = await getInfo();
        if (user.login) {
                addElement(user);
                saveUser(user);
        }
}

function addElement(user) {
        let newDiv = document.createElement("div");
        newDiv.className = "boxContent";

        let newImg = document.createElement("img");
        newImg.className = "userAvatar";
        newImg.src = user.avatar_url;

        let newSpan = document.createElement("span");
        newSpan.className = "nameText";
        newSpan.innerText = user.login;

        let newButton = document.createElement("button");
        newButton.className = "deleteButton";
        newButton.innerText = "Delete";
        newButton.addEventListener("click", function () {
                users = users.filter(toDelete => toDelete.login !== user.login);
                localStorage.setItem("users", JSON.stringify(users));
                newDiv.remove();
        });

        document.body.insertBefore(newDiv, my_div);
        newDiv.appendChild(newImg);
        newDiv.appendChild(newSpan);
        newDiv.appendChild(newButton);
}

function saveUser(user) {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
}

searchButton.addEventListener("click", addUser);