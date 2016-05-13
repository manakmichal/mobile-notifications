var notifications = JSON.parse(window.localStorage.getItem("not-builder"));

if(!notifications){
  notifications = []
} else {
  showNotifications();
}

function save(title, description){
  var time = new Date();

  var item = {
    title: title,
    description: description,
    time: time.getFullYear()+"-"+(time.getMonth() < 10 ? "0"+time.getMonth() : time.getMonth())+"-"+(time.getDate() < 10 ? "0"+time.getDate() : time.getDate())
  };

  notifications.push(item);
  window.localStorage.setItem("not-builder", JSON.stringify(notifications));

  showNotifications();
}

function showNotifications(){
  var notificationsList = $(".notifications ul");

  notificationsList.html("");

  $.each(notifications, function(i, val){
    var obj = $('<li><div class="notification big"><span></span><div><h1></h1><p></p></div><time>Datum</time><span class="material-icons close" title="Smazat">close</span></div></li>');

    obj.attr("data-id", i);

    $("h1", obj).text(val.title);
    $("p", obj).text(val.description);
    $("time", obj).text(val.time);

    obj.click(function(event){
      if(!$(event.target).hasClass("close")){
        $(".phone .notification input[name=title]").val($(this).find("h1").text());
        $(".phone .notification input[name=description]").val($(this).find("p").text());
      }
    });

    $(".close", obj).click(function(){
      var result = confirm("Opravdu jí chceš smazat?"),
          item = $(this).parent().parent();

      if(result){
        notifications.splice(item.data("id"), 1);
        window.localStorage.setItem("not-builder", JSON.stringify(notifications));
        item.fadeOut(500).end().remove();
      }
    });

    obj.appendTo(notificationsList);
  });
}
