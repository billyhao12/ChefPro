$(document).ready(() => {
  $("#addRecipe").on("submit", event => {
    event.preventDefault();

    const recipeData = {
      title: $("[name='title']")
        .val()
        .trim(),
      author: $("[name='author']")
        .val()
        .trim(),
      ingredients: $("[name='ingredients']")
        .val()
        .trim(),
      instructions: $("[name='instructions']")
        .val()
        .trim()
    };

    $.ajax({
      url: "/api/addRecipe",
      method: "POST",
      data: recipeData
    }).then(() => {
      location.reload();
    });
  });
});
