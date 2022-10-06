$(document).ready(function () {
  $("#input").emojioneArea({
    pickerPosition: "bottom",
  });
  $("#chatBtn").click(function () {
    $(".emojionearea-editor").html("");
  });
});
