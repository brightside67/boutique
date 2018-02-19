let doc = window.document;


if (doc.addEventListener) {
  doc.addEventListener('DOMContentLoaded', function() {
    console.log('DOM complete');

  });

} else {
  alert('Пожалуйста, обновите ваш браузер для полноценной работы сайта. Please, renew your web browser for better performance.')
}
