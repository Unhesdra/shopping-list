const submitButton = document.getElementById("item-form-submit");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const itemName = document.getElementById("input-item-name").value;
    const itemUrl = document.getElementById("input-url").value;
    const itemPrice = document.getElementById("input-price").value;
    const itemImage = ""; //document.getElementById("input-image").value;
    
    sendItemDataToBackend(itemName, itemUrl, itemPrice, itemImage);
});

async function sendItemDataToBackend(itemName, itemUrl, itemPrice, itemImage) {
    const response = await fetch("http://localhost:8080/shoppingList/newItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: `{
            "itemName": "${itemName}",
            "url": "${itemUrl}",
            "price": "${itemPrice}",
            "image": "${itemImage}"
        }`
    })
    .catch((error) => {
        console.log("Error sending information to Back-end");
        console.log(error);
    });

    const responseBody = await response.json();
    showAddedItem(responseBody);
}

function showAddedItem(responseBody) {
    const addItemForm = document.getElementById("add-item-form");
    const itemDisplay = document.getElementById("item-display")

    addItemForm.style.display = "none";
    itemDisplay.style.display = "flex";

    const cardTitle = itemDisplay.querySelector(".card-title");
    const unorderedList = itemDisplay.querySelector(".list-group");

    cardTitle.innerHTML = responseBody.itemName;
    unorderedList.innerHTML = `
    <li class="item-description">URL: ${responseBody.url}</li>
    <li class="item-description">Price: $${responseBody.price}</li>
    `;

    localStorage.setItem("item", JSON.stringify(responseBody));
}