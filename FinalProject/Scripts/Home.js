$(document).ready(function () {
    //$(".content #loginPage").hide();
    $(".content #accountInfoPage").hide();

    $("#existingUserLogInButton").click(function () {
        hideMessages();

        if (validateLoginInputs()) {
            var dataObject = {
                Username: $("#existingUserUserName").val(),
                Password: $("#existingUserPassword").val(),
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

        var dataObject = {
            Username: $("#newUserUserName").val(),
            Password: $("#newUserPassword").val(),
            EmailAdd: $("#newUserEmail").val(),
            EmailCon: $("#newUserEmailRepeat").val(),
        };

        $.ajax({
            url: window.FinalProjectUrl_CreateAccount,
            data: dataObject,
            success: successAccountCreate,
            dataType: "json"
        });
    });
});

function hideMessages() {
    $("#existingUserUserNameMessage").hide();
    $("#existingUserPasswordMessage").hide();
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

function existingUserLogInButtonProcessor(responseData) {
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