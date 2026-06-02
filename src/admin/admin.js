import './admin.scss';

jQuery(function ($) {
  $('body').addClass('about-php');

  $('.copy-settings-form').on('submit', function () {
    const text = $(this).data('confirm');
    var c = confirm(text);
    if (!c) {
      return false;
    }
  });
});