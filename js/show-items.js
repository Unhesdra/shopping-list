async function getItemsList() {
    const response = await fetch("http://localhost:8080/shoppingList/getList");

    const vapo = await response.json();
    console.log(vapo);
    console.log(vapo.content[0]);
}

getItemsList();