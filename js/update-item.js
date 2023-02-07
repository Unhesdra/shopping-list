const submitButton = document.getElementById("item-form-submit");
const updateButton = document.getElementById("update-item-button");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const currentItem = JSON.parse(localStorage.getItem("item"));

    const itemId = currentItem.id;
    let itemName = document.getElementById("input-item-name").value;
    let itemUrl = document.getElementById("input-url").value;
    let itemPrice = document.getElementById("input-price").value;
    let itemImage = ""; //document.getElementById("input-image").value;

    if(!itemName || itemName.length === 0) {
        itemName = currentItem.itemName;
    }
    if(!itemUrl || itemUrl.length === 0) {
        itemUrl = currentItem.url;
    }
    if(!itemPrice ?? itemPrice.length === 0) {
        itemPrice = currentItem.price;
    }
    if(!itemImage ?? itemImage.length === 0) {
        itemImage = currentItem.image;
    }
    
    sendItemDataToBackend(itemId, itemName, itemUrl, itemPrice, itemImage);
});

async function sendItemDataToBackend(itemId, itemName, itemUrl, itemPrice, itemImage) {
    const response = await fetch("http://localhost:8080/shoppingList/updateItem", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: `{
            "id": "${itemId}",
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

    localStorage.setItem("newItem", JSON.stringify(responseBody));
}