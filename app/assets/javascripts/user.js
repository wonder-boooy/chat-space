$(function(){
  var search_list = $("#chat-group-users");

  function appendList(user) {
    var userList = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">${user.name}</p>
  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
</div>`;
    search_list.append(userList);
    return search_list;
  };
  function appendNoList() {
    var userList = `<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">一致するユーザーはいません</p>`;
    search_list.append(userList);
    return search_list;
  };
  function addUser(id, name) {
    var userList = `<div class="chat-group-form__field--right">
      <div class="chat-group-user clearfix js-chat-member" id="#chat-group-user-8">
        <input name="group[user_ids][]", type="hidden", value="${id}">
        <p class="chat-group-user__name">${name}</p>
        <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
      </div>
    </div>`;
    $("#group-user").append(userList);
    console.log($("#group-user"));
    return $("#group-user");
  };
  $("#user-search-field").keyup(function(){
    var input = $(this).val();
    $.ajax({
      type: 'get',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(data){
      search_list.empty();
      if (data.length !== 0){
        data.forEach(function(user){
          appendList(user);
        });
      } else {
        appendNoList();
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました")
    })
    .always(function(){
    });
  });
  $(document).on("click", ".chat-group-user__btn--add", function(){
    addUser($(this).data('user-id'), $(this).data('user-name'));
    search_list.empty();
    $("#user-search-field").val("");
  });
  $(document).on("click", ".js-remove-btn", function(){
    console.log(this);
    $(this).parent().parent().remove();
  });
});
