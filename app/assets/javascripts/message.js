$(function(){
  function buildHTML(message){
    if(message.content){
      var content = `<div class="lower-message__content">${message.content}</div>`
    } else {
      var content = ""
    }
    if(message.image_url != null){
      var image = `<div class="lower-message__image"><img src="${message.image_url}"></div>`
    } else {
      var image = ""
    }
    var html = `<div class="message">
  <div class="upper-message">
    <div class="upper-message__user-name">
      ${message.user_name}
    </div>
    <div class="upper-message__date">
      ${message.created_at}
    </div>
  </div>
  <div class="lower-message">
    ${content}
    ${image}
  </div>
</div>`
    return html;
  };

  $("#sendBtn").submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      type: "post",
      url: url,
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html);
      $("#sendBtn")[0].reset();
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 500);
    })
    .fail(function(){
      alert("メッセージ入力もしくは画像選択してください");
    })
    .always(function(){
      $(".form__submit").removeAttr("disabled");
    })
  })
})
