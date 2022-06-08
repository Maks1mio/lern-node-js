const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const usersCounter = document.getElementById("countAllUsers");

let my_div = newDiv = null;
let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
users.forEach(addElement);
UserCounterArray();

// github api search

async function getInfo() {
        let potUrl = "https://api.github.com/users/" + searchInput.value;

        let url = await fetch(potUrl);
        let response = await url.json();

        return {
                login: response.login,
                avatar_url: response.avatar_url,
                html_url: response.html_url,
                location: response.location
        };
}

// add user button

async function addUser() {
        let user = await getInfo();

        if (!user.login) {
                console.log("Invalid username");
                return;
        }
        if (checkDuplicate(user)) {
                console.log("User is already added");
                return;
        }

        saveUser(user);
        addElement(user);
        UserCounterArray();
}

//check duplicate user 

function checkDuplicate(user) {
        let duplicate = users.filter(duplicate => duplicate.login === user.login);
        if (duplicate.length > 0) {
                return true;
        }
        return false;
}

// add user element to the page

function addElement(user) {
        let newDiv = document.createElement("div");
        newDiv.className = "boxContent";

        let newImg = document.createElement("img");
        newImg.className = "userAvatar";
        newImg.src = user.avatar_url;

        let newSpan = document.createElement("span");
        newSpan.className = "nameText";
        if (user.location !== null) {
                newSpan.innerHTML = user.login + " (" + user.location + ")";
        } else {
                newSpan.innerHTML = user.login;
        }

        let openProfileButton = document.createElement("button");
        openProfileButton.className = "button";
        openProfileButton.innerText = "Profile";
        openProfileButton.addEventListener("click", () => {
                window.open(user.html_url);
        });

        let newButton = document.createElement("button");
        newButton.className = "button";
        newButton.innerText = "Delete";
        newButton.addEventListener("click", function () {
                users = users.filter(toDelete => toDelete.login !== user.login);
                localStorage.setItem("users", JSON.stringify(users));
                newDiv.remove();
                UserCounterArray();
        });

        let newInput = document.createElement("input");
        newInput.className = "input";
        newInput.type = "text";

        let divBackground = document.createElement("div");
        divBackground.className = "background";
        divBackground.style = `
        background: linear-gradient(to left, #2f2f2fa6, #2f2f2f), url(${user.avatar_url});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        height: 50px;
        filter: blur(4px);
        position: absolute;
        left: 50px;
        z-index: 1;
        right: 50px;
        border-radius: 6px;
        clip-path: border-box;
        `;


        document.getElementById("contentID").appendChild(newDiv, my_div);
        newDiv.appendChild(newImg);
        newDiv.appendChild(newSpan);
        newDiv.appendChild(openProfileButton);
        newDiv.appendChild(newButton);
        newDiv.appendChild(divBackground);
}

// user counter

function UserCounterArray() {
        usersCounter.innerText = "Find: " + users.length;
}

// save user to local storage

function saveUser(user) {
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

}

// search button

searchButton.addEventListener("click", addUser);




