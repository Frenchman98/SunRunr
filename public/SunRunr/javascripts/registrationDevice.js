var divToChange = $("#ifFailure");

function submitRegister() {
	let deviceId = $('#registerId').val();
    let username = window.localStorage.getItem('username');   //Get user email address from localStorage  

  	if (!isValidInput()) return;

    $.ajax({
    url: '/devices/register',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({username:username, deviceId:deviceId}),
    dataType: 'json'
    })
      .done(registerSuccess)
      .fail(registerError);
}

function registerSuccess(data, textStatus, jqXHR) {
  if (data.success) {  
    window.location.replace("homepage.html");
  }
  else {
    divToChange.html("<span class='red-text text-darken-2'>Error: " + data.message + "</span>");
    divToChange.show();
  }
}

function registerError(jqXHR, textStatus, errorThrown) {
  if (jqXHR.statusCode == 404) {
    divToChange.html("<span class='red-text text-darken-2'>Server could not be reached.</p>");
	divToChange.show();
  }
  else {
    divToChange.html("<span class='red-text text-darken-2'>Error: " + jqXHR.responseJSON.message + "</span>");
    divToChange.show();
  }
}
  
function isValidInput() {
  let isValid = true;
  let deviceId = $('#registerId').val();
  let failHTML = '';

  let deviceIdRe = /^[0-9a-f]{24}$/;

	if (!deviceIdRe.test(deviceId)) {
		$('#regDevice').addClass('error');
    	failHTML += ("<p><span class='red-text text-darken-2'>Please enter valid Device ID that contains only hexadecimal characters.</span></p>");
		isValid = false;
	}
	else {
		$('#regDevice').removeClass('error');
	}
	
	if (deviceId.length() != 24) {
    	$('#regDevice').addClass('error');
    	failHTML += ("<p><span class='red-text text-darken-2'>Device ID must be exactly 24 characters.</span></p>");
		isValid = false;
    }
    else {
        $('#regDevice').removeClass('error');
    }
    
	if (isValid == false) {
		divToChange.html(failHTML);
    	divToChange.show();
	}
	
  	return isValid;
}

$(function () {
	if (window.localStorage.getItem('authToken')) {
		window.location.replace('homepage.html'); // Detects if user is already logged in and redirects them if they are
	}
	else {
		$('.registerButton').click(submitRegister);
		$('#password').keypress(function(event) {
			if( event.which === 13 ) {
				submitRegister();
			}
		});
	}
});

function openNav() { document.getElementById("menu").style.width = "250px";}

function closeNav() {document.getElementById("menu").style.width = "0";}

function logout(){
    document.getElementById("demo").style.color = "red";
    window.localStorage.removeItem('authToken');
    window.location.replace('login.html');
}