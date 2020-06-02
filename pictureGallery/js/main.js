$(document).ready(function(){

    // Initialize select dropdowns
    $('select').formSelect();
  
    let consentOverlay = $('.consent-overlay')
  
    // Show overlay on selecton
    $('.age-select').change(function () {
      if (this.value === "1") {
        consentOverlay.show('fast')
      }
    });
  
    // Hide overlay
    consentOverlay.click(function () {
      consentOverlay.hide('fast')
    })
  
    $('.ok-consent').click(function () {
      consentOverlay.hide('fast')
    })
  
    $('.consent-overlay .box').click(function (event) {
      event.stopPropagation()
    })
  
    $('#password2').keyup(function () {
      let password1 = $('#password1').val()
      let password2 = $('#password2').val()
      let error = $('#password-error')
  
      if (password1 !== password2) {
        error.show()
      } else {
        error.hide()
      }
    })
  });