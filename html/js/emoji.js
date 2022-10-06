$(document).ready(function () {
  $("#input").emojioneArea({
    pickerPosition: "bottom",
  });
  $("#chatBtn").click(() => {
    $(".emojionearea-editor").html("");
  });
});
