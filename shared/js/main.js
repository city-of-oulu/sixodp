var objectFitImages = require('object-fit-images');

$(function() {

  $('body').on('click', '.dropdown-toggle', function() {
    var $dd = $('#'+$(this).attr('data-toggle'));
    var closed = !$dd.hasClass('opened');

    $('.dropdown-menu').removeClass('opened');
    $('.dropdown-toggle').removeClass('active');
    $('.dropdown-toggle').attr('aria-expanded', 'false');
    if ( closed ) {
      $dd.addClass('opened');
      $(this).addClass('active');
      $(this).attr('aria-expanded', 'true');
    }
  });
});

$(function ($) {
  $(document).ready(function(){

    // Attempt to get the user language, datepicker will default to en-US if not successful
    var language = window.navigator.userLanguage || window.navigator.language;
    jQuery('.has-datepicker input').datepicker({
      format: 'yyyy-mm-dd',
      weekStart: 1,
      language: language,
      todayHighlight: true
    });

    // hide .navbar first
    $('.navbar-fixed-top').hide();

    // fade in .navbar
    $(function () {
      $(window).scroll(function () {
        // set distance user needs to scroll before we fadeIn navbar
        if ($(this).scrollTop() > 300) {
          $('.navbar-fixed-top').fadeIn();
        } else {
          $('.navbar-fixed-top').fadeOut();
        }
      });
    });

    $(".form-actions button[type=submit]").one('click', function() {
      $(this).append(' ').append($('<span id="loading-indicator" ' +
          'class="icon icon-spinner icon-spin"></span>') );
    });

    $( "#resource-edit" ).one('submit', function() {
      var fileInput = $('#resource-edit input:file').get(0);
      if(fileInput.files.length > 0) {
          var fileSize = fileInput.files[0].size;
          $('#field-file_size').val(fileSize);
          var html = $('<div class="upload-times"><ul>' +
              '<li>24/1 Mbit/s: ' + Math.ceil(fileSize / 125000 / 60) + ' min</li>' +
              '<li>10/10 Mbit/s: ' + Math.ceil(fileSize / 1250000 / 60) + ' min</li>' +
              '<li>100/100 Mbit/s: ' + Math.ceil(fileSize / 12500000 / 60) + ' min</li>' +
              '</ul></div>');

          $("#submit-info").append(html).show();
      }
    });

    // Show the show more -link only when the specified height is filled
    var showMoreTextContent = $(".show-more-content .text-content");
    if( showMoreTextContent.outerHeight() > $(".show-more-content").outerHeight() ) {
        $(".show-more").show();
        $(".fadeout").show();
    }

    $(".show-more").on("click", function() {
        var $this = $(this);
        var $content = $this.prev("div.show-more-content");
        var $fadeout = $content.find(".fadeout");

        if($(this).children(".show-more-link").css('display') !== 'none'){
            $fadeout.hide();
            $content.addClass("show-content");
            $content.removeClass("hide-content");
        } else {
            $fadeout.show();
            $content.addClass("hide-content");
            $content.removeClass("show-content");
        }
        $(this).children().toggle();
    });

    $(".image-modal-open").click(function() {
        var img = $(this)[0];

        var modal = document.getElementById('image-modal');
        var modalImg = document.getElementById("modal-image-placeholder");

        modal.style.display = "block";
        modalImg.src = img.src;

        var closeModal = document.getElementsByClassName("close")[0];
        closeModal.onclick = function() {
            modal.style.display = "none";
        }
    });

    var showOpenHorizaccordionButton = function(horizaccordionElement) {
      horizaccordionElement.find("#show-text").show();
      horizaccordionElement.find("#close-text").hide();
    }

    var showCloseHorizaccordionButton = function(horizaccordionElement) {
      horizaccordionElement.find("#show-text").hide();
      horizaccordionElement.find("#close-text").show();
    }

    // Toggle horizaccordion collapse button text
    $("#horizaccordion-collapse-btn").click(function() {
      if ( $(this).hasClass("collapsed") ) {
          return showCloseHorizaccordionButton($(this));
      }
      showOpenHorizaccordionButton($(this));
    });

    // Close horizaccordion if query parameters present
    if(window.location.search) {
      $('#horizaccordion').addClass('collapsed');
      $('#horizaccordion').removeClass('in');
      showOpenHorizaccordionButton($('#horizaccordion'));
    }

    // Polyfill object-fit
    objectFitImages();

  });
}(jQuery));