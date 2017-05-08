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
                success: newUserCreateButtonProcessor,
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
    //dsatnic 2017-05-08: I need to handle here because the server does not check for nulls in the request
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
    //dsatnic 2017-05-08: I need to handle this possibility because this is not handled server side and results in a 500 error
    if ($("#newUserEmail").val().trim() === "" && $("#newUserEmailRepeat").val().trim() !== "") {
        $("#newUserEmailMessage").html("Please enter an email address");
        $("#newUserEmailMessage").show();
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
            $("#existingUserUserNameMessage").html("Must be an existing account username");
            $("#existingUserUserNameMessage").show();
        }
        else if (responseData.Password === "Wrong") {
            $("#existingUserPasswordMessage").html("Wrong password for existing account");
            $("#existingUserPasswordMessage").show();
        }
    }

}

function newUserCreateButtonProcessor(responseData) {
    // dsatnic 2017-05-08: not sure why the ajax is not auto parsing the JSON; however, this works
    responseData = jQuery.parseJSON(responseData);
    if (responseData.Message === "Success") {

    } else {
        if (responseData.Username !== "Good") {
            if (responseData.Username === "Invalid") {
                $("#newUserUserNameMessage").html("Must be at least 6 characters");
            }
            else if (responseData.Username === "Exists") {
                $("#newUserUserNameMessage").html("Username is already taken");
            } else {
                $("#newUserUserNameMessage").html(responseData.Username);
            }
            $("#newUserUserNameMessage").show();
        }
        if (responseData.Password !== "Good") {
            if (responseData.Password === "Invalid") {
                $("#newUserPasswordMessage").html("Must be at least 6 characters");
            } else {
                $("#newUserPasswordMessage").html(responseData.Password);
            }
            $("#newUserPasswordMessage").show();
        }
        if (responseData.EmailAdd !== "Good") {
            if (responseData.EmailAdd === "Invalid") {
                $("#newUserEmailMessage").html("Must have a value and contain \"@\"");
            } else {
                $("#newUserEmailMessage").html(responseData.EmailAdd);
            }
            $("#newUserEmailMessage").show();
        }
        if (responseData.EmailCon !== "Good") {
            if (responseData.EmailCon === "Invalid") {
                $("#newUserEmailRepeatMessage").html("Must have a value");
            }
            else if (responseData.EmailCon === "Mismatch") {
                $("#newUserEmailRepeatMessage").html("Must match EmailAdd");
            } else {
                $("#newUserEmailRepeatMessage").html(responseData.EmailCon);
            }
            $("#newUserEmailRepeatMessage").show();
        }
    }
}

function successAccountCreate(responseData) {
    $(".content #loginPage").hide();
    $(".content #accountInfoPage").show();
}