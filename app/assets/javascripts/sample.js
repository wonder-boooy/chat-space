$(document).on("turbolinks:load",function(){

  $("#sendBtn").submit(function(e){
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "",
      data: " ~ ",
      dataType: " ~ ",
      processData: false,
      contentType: false
    })

    .done(function(data){

    })

    .fail(function(){

    });

  })
});
