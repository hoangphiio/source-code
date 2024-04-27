export default function TextModule() {
  //- Show more Text
  $(document).ready(function () {
    (function () {
      var showChar = 250;
      var ellipsestext = "...";

      $(".desc-viewmore").each(function () {
        var content = $(this).html();
        if (content.length > showChar) {
          var c = content.substr(0, showChar);
          var h = content;
          var html =
            '<div class="truncate-text" style="display:block">' +
            c +
            '<span class="moreellipses">' +
            ellipsestext +
            '<a href="#!" class="moreless more">View More</a></span></span></div><div class="truncate-text" style="display:none">' +
            h +
            '<a href="#!" class="moreless less">Less</a></span></div>';

          $(this).html(html);
        }
      });

      $(".moreless").click(function () {
        var thisEl = $(this);
        var cT = thisEl.closest(".truncate-text");
        var tX = ".truncate-text";

        if (thisEl.hasClass("less")) {
          cT.prev(tX).toggle();
          cT.slideToggle();
        } else {
          cT.toggle();
          cT.next(tX).fadeToggle();
        }
        return false;
      });
    })();
  });

  $(document).ready(function () {
    $(".view-more").click(function () {
      $(".skill-btn").addClass("btn-hidden");
      $(".skill-detail").slideToggle("flow");

      // Thay đổi nội dung của nút từ "View More" thành "View Less"
      $(this).text(function (i, text) {
        return text === "View More" ? "View Less" : "View More";
      });
    });
  });
}
