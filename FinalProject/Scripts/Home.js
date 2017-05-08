$(document).ready(function () {
    //$(".content #loginPage").hide();
    $(".content #accountInfoPage").hide();

    $("#existingUserLogInButton").click(function () {
        hideMessages();

        if (validateLoginInputs()) {
            var dataObject = {
                Username: $("#existingUserUserName").val().trim(),
                Password: $("#existingUserPassword").val().trim(),
            };

            $.ajax({
                url: window.FinalProjectUrl_Login,
                data: dataObject,
                success: existingUserLogInButtonProcessor,
                dataType: "json"
            });
        }
    });

    $("#newUserCreateAccountButton").click(function () {
        hideMessages();

        if (validateCreationInputs()) {
            var dataObject = {
                Username: $("#newUserUserName").val().trim(),
                Password: $("#newUserPassword").val().trim(),
                EmailAdd: $("#newUserEmail").val().trim(),
                EmailCon: $("#newUserEmailRepeat").val().trim(),
            };

            $.ajax({
                url: window.FinalProjectUrl_CreateAccount,
                data: dataObject,
                success: successAccountCreate,
                dataType: "json"
            });
        }
    });
});

function hideMessages() {
    $("#existingUserUserNameMessage").hide();
    $("#existingUserPasswordMessage").hide();

    $("#newUserUserNameMessage").hide();
    $("#newUserPasswordMessage").hide();
    $("#newUserEmailMessage").hide();
    $("#newUserEmailRepeatMessage").hide();
}

function validateLoginInputs() {
    if ($("#existingUserUserName").val().trim() === "") {
        $("#existingUserUserNameMessage").html("Please enter a user name");
        $("#existingUserUserNameMessage").show();
        return false;
    }
    if ($("#existingUserPassword").val().trim() === "") {
        $("#existingUserPasswordMessage").html("Please enter a password");
        $("#existingUserPasswordMessage").show();
        return false;
    }
    return true;
}

function validateCreationInputs() {
    if ($("#newUserUserName").val().trim() === "") {
        $("#newUserUserNameMessage").html("Please enter a user name");
        $("#newUserUserNameMessage").show();
        return false;
    }
    if ($("#newUserPassword").val().trim() === "") {
        $("#newUserPasswordMessage").html("Please enter a password");
        $("#newUserPasswordMessage").show();
        return false;
    }
    if ($("#newUserEmail").val().trim() === "") {
        $("#newUserEmailMessage").html("Please enter an email address");
        $("#newUserEmailMessage").show();
        return false;
    }
    if ($("#newUserEmailRepeat").val().trim() === "") {
        $("#newUserEmailRepeatMessage").html("Please re-enter the email address");
        $("#newUserEmailRepeatMessage").show();
        return false;
    }
    return true;
}

function existingUserLogInButtonProcessor(responseData) {
    // dsatnic 2017-05-08: not sure why the ajax is not auto parsing the JSON; however, this works
    responseData = jQuery.parseJSON(responseData);
    if (responseData.Message === "Success") {

    } else {
        if (responseData.Username === "Invalid") {
            $("#existingUserUserNameMessage").html("The username you entered is invalid");
            $("#existingUserUserNameMessage").show();
        }
        else if (responseData.Password === "Wrong") {
            $("#existingUserPasswordMessage").html("The password you entered is wrong");
            $("#existingUserPasswordMessage").show();
        }
    }

}

function successAccountCreate(responseData) {
    $(".content #loginPage").hide();
    $(".content #accountInfoPage").show();
}