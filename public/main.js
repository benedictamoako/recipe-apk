document.querySelectorAll(".delete-recipe").forEach(item => {
    item.addEventListener("click", function () {
        if (confirm("Delete Recipe?")) {
            console.log("Deleting Recipe....")
            // window.location.href='/';
        } else {
            console.log(console.error("Unable to delete recipe"));
        }
    })
})



var editId = document.getElementById("edit-form-id");
var editNameId = document.getElementById("edit-form-name");
var editIngredientsId = document.getElementById("edit-form-ingredients");
var editDirectionsId = document.getElementById("edit-form-directions");

document.querySelectorAll(".edit-recipe").forEach(item => {
    item.addEventListener("click", function () {
        nameValue = item.dataset.name;
        ingredientsValue = item.dataset.ingredients;
        directionsValue = item.dataset.directions;
        idValue = item.dataset.id;

        editNameId.value = nameValue;
        editIngredientsId.value = ingredientsValue;
        editDirectionsId.value = directionsValue;
        editId.value = idValue;
    })
})