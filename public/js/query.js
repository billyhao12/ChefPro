$(document).ready(() => {
  $("#dishSearch").submit(event => {
    event.preventDefault();
    const dish = $("[name='Title']")
      .val()
      .trim();
    window.location = "/recipes/" + dish;
  });
});
