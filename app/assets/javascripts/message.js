$(function(){
  function buildHTML(message){
    var content = message.content ? `<div class="lower-message__content">${message.content}</div>` : ""
    var image = message.image_url != null ? `<div class="lower-message__image"><img src="${message.image_url}"></div>` : ""
    var html = `<div class="message", data-message-id=${message.id}>
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
  // Sendボタンで発火する非同期通信
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
  });
  setInterval(autoUpdate, 5000);
  // 自動更新処理
  function autoUpdate(){
    if(window.location.href.match(/\/groups\/\d*\/messages/)){
      var id = $(".message").last().data("messageId");
      $.ajax({
        type: "get",
        url: location.href,
        data: {id: id},
        dataType: "json"
      })
      .done(function(data){
        var insertHTML = '';
        data.forEach(function(message){
          insertHTML += buildHTML(message);
          $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 500);
        });
        $(".messages").append(insertHTML);
      })
      .fail(function(){
        alert("自動更新に失敗しました")
      })
    } else {
      clearInterval(interval)
    }
  }
})
