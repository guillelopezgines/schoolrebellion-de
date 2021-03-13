$(document).ready(function() {
  $(".container").stick_in_parent();

  var check = function(){
    if(!$('.section.support img').is(":visible")){
      $('.section.support .text').hide();
    } else {
      $('.section.support .text').show();
    }
  };

  $(document)
    .on('change', 'select[data-location]', function(e){
      window.location.href = $(this).val();
    })
    .on('keyup', '[type=text][data-target]', function(e){
      var el = $(this).attr('data-target');
      $(el).html($(this).val());
    })
    .on('change', 'select[data-target]', function(e){
      var el = $(this).attr('data-target');
      $(el).html($(this).val());
    })
    .on('change', '[type=checkbox][data-target]', function(e){
      var el = $(this).attr('data-target');
      if($(this).prop("checked")){
        $(el).show();
      } else {
        $(el).hide();
      }
      check();
    })
    .on('change', '[type=file][data-target][data-parent]', function(e){
      var input = this,
          el = $(this).attr('data-target'),
          $el = $(el),
          $parent = $($(this).attr('data-parent'));
      if (input.files && input.files[0]) {
        if($el.length == 0){
          $el = $('<img>').addClass(el);
          $parent.append($el);
        }
        var reader = new FileReader();
        reader.onload = function(e) {
          $el.attr('src', e.target.result);
          check();
        }
        reader.readAsDataURL(input.files[0]); // convert to base64 string
      }
    })
    .on('click', '.download', function(e){
      e.preventDefault();
      $('body,html').animate({ scrollTop: 0 }, { duration: 0 });
      $('body').addClass('downloading');

      var scale = window.is_touch_device && $(window).width() <= 500 ? 0.5 : 1;
      html2canvas(document.querySelector(".poster"), {scale: scale}).then(canvas => {
        Canvas2Image.saveAsPNG(canvas, 2 * 1685, 2 * 2450);
        $('body').removeClass('downloading');
      });
    });
});