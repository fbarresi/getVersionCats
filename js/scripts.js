$(function() {

    $("#subscribeForm input").jqBootstrapValidation({
      preventSubmit: true,
      submitError: function($form, event, errors) {
        // additional error messages or events
      },
      submitSuccess: function($form, event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var email = $("input#email").val();

        $this = $("#sendSubscriptionButton");
        $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        $.ajax({
          url: "https://ypxrndgn2k.execute-api.eu-central-1.amazonaws.com/default/versioncats-subscribe?email="+email,
          type: "GET",
          cache: false,
          dataType: 'jsonp',
          crossDomain : true,
          success: function() {
            setSuccess('#success');
            //clear all fields
            $('#subscribeForm').trigger("reset");
          },
          error: function(e) {
            if(e.status == 200){
                setSuccess('#success');
            }
            else{
                setError('#success');
            }
            //clear all fields
            $('#subscribeForm').trigger("reset");
          },
          complete: function() {
            setTimeout(function() {
              $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
            }, 1000);
          }
        });
      },
      filter: function() {
        return $(this).is(":visible");
      },
    });
  
    $("#getUpdateForm input").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
          // additional error messages or events
        },
        submitSuccess: function($form, event) {
          event.preventDefault(); // prevent default submit behaviour
          // get values from FORM
          var email = $("input#emailUpdate").val();
  
          $this = $("#sendUpdateButton");
          $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
          $.ajax({
            url: "https://ypxrndgn2k.execute-api.eu-central-1.amazonaws.com/default/versioncats-subscribe?email="+email,
            type: "GET",
            cache: false,
            dataType: 'jsonp',
            crossDomain : true,
            success: function() {
              setSuccess('#successUpdate');
              //clear all fields
              $('#getUpdateForm').trigger("reset");
            },
            error: function(e) {
              if(e.status == 200){
                  setSuccess('#successUpdate');
              }
              else{
                  setError('#successUpdate');
              }
              //clear all fields
              $('#getUpdateForm').trigger("reset");
            },
            complete: function() {
              setTimeout(function() {
                $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
              }, 1000);
            }
          });
        },
        filter: function() {
          return $(this).is(":visible");
        },
      });

    $("a[data-toggle=\"tab\"]").click(function(e) {
      e.preventDefault();
      $(this).tab("show");
    });
  });
  
  /*When clicking on Full hide fail/success boxes */
  $('#email').focus(function() {
    $('#success').html('');
  });

  $('#emailUpdate').focus(function() {
    $('#successUpdate').html('');
  });
  
  function setError(tag){
    $(tag).html("<div class='alert alert-danger'>");
    $(tag+' > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
      .append("</button>");
    $(tag+' > .alert-danger').append($("<strong>").text("Sorry, it seems that the server is not responding. Please try again later!"));
    $(tag+' > .alert-danger').append('</div>');
  }

  function setSuccess(tag){
    $(tag).html("<div class='alert alert-success'>");
    $(tag+' > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
    $(tag+' > .alert-success')
        .append("<strong>Thank you!</strong>");
    $(tag+' > .alert-success')
        .append('</div>');
  }