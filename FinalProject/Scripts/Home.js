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

    $("#existingUserNewData_AddButton").click(function () {
        hideMessages();

        if (validateNewValuePairsInputs()) {
            var dataObject = {
                Username: $("#accountName").text().trim(),
                ElementName: $("#elementName").val().trim(),
                ElementValue: $("#elementValue").val().trim()
            };

            $.ajax({
                url: window.FinalProjectUrl_AddOrUpdateElement,
                data: dataObject,
                success: existingUserNewDataButtonProcessor,
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

    $("#elementNameMessage").hide();
    $("#elementValueMessage").hide();
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

function validateNewValuePairsInputs() {
    //dsatnic 2017-05-08: I need to handle here because the server does not check for nulls in the request
    if ($("#elementName").val().trim() === "") {
        $("#elementNameMessage").html("Please enter an element name");
        $("#elementNameMessage").show();
        return false;
    }
    if ($("#elementValue").val().trim() === "") {
        $("#elementValueMessage").html("Please enter an element value");
        $("#elementValueMessage").show();
        return false;
    }
    return true;
}

function existingUserLogInButtonProcessor(responseData) {
    // dsatnic 2017-05-08: not sure why the ajax is not auto parsing the JSON; however, this works
    responseData = jQuery.parseJSON(responseData);
    if (responseData.Message === "Success") {
        getAccountInformation("login");
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
        getAccountInformation("create");
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

function existingUserNewDataButtonProcessor(responseData) {
    var originalResponseData = responseData;
    // dsatnic 2017-05-08: not sure why the ajax is not auto parsing the JSON; however, this works
    responseData = jQuery.parseJSON(responseData);
    if (responseData.Message === "Success") {
        successProcessor(originalResponseData);
    } else {
        if (responseData.Error.trim() === "Cannot Have Spaces In Element Name") {
            $("#elementNameMessage").html("Cannot Have Spaces In Element Name");
            $("#elementNameMessage").show();
        }
        else if (responseData.Error.trim() === "Cannot Change Username") {
            $("#elementNameMessage").html("Cannot Change Username");
            $("#elementNameMessage").show();
        }
    }
}

function getAccountInformation(action) {
    var userName; 
    if (action === "login") {
        userName = $("#existingUserUserName").val().trim();
    } else {
        userName = $("#newUserUserName").val().trim();
    }
    var dataObject = {
        Username: userName,
    };

    $.ajax({
        url: window.FinalProjectUrl_GetAccountInformation,
        data: dataObject,
        success: successProcessor,
        dataType: "json"
    });
}

function successProcessor(responseData) {
    // dsatnic 2017-05-08: not sure why the ajax is not auto parsing the JSON; however, this works
    responseData = jQuery.parseJSON(responseData);
    var payload = jQuery.parseJSON(responseData.Payload);

    $("#existingValuePairsContainer").empty();

    $.each(payload.account, function (name, value) {
        if (name === "username") {
            $("#existingValuePairsContainer").append('<p id="accountNameLabel">Account Name</p>');
            $("#existingValuePairsContainer").append('<p id="accountName">'+ value + '</p>');
            return true;
        }
        if (name === "password") {
            return true;
        }
        var displayName = name;
        if (name === "emailadd") {
            displayName = "EMailAddress";
        }

        var valueToAppend = '<div class="existingUserData"><label for="existingUser' + name + '">' + displayName + '</label>';
        valueToAppend += '<input type="text" id="existingUser' + name + '" class="userInput" value="' + value + '" />';
        valueToAppend += '<input type="hidden" value="' + name + '" />';
        valueToAppend += '<button id="existingUser' + name + '_Button">Update</button></div>';

        $("#existingValuePairsContainer").append(valueToAppend);
    });

    $(".content #loginPage").hide();
    $("body").addClass("specialFontCase");
    $(".content #accountInfoPage").show();

    $("#existingValuePairsContainer button").click(function (e) {
        hideMessages();

        var dataObject = {
            Username: $("#accountName").text().trim(),
            ElementName: e.currentTarget.previousSibling.value,
            ElementValue: e.currentTarget.previousSibling.previousSibling.value.trim()
        };

        $.ajax({
            url: window.FinalProjectUrl_AddOrUpdateElement,
            data: dataObject,
            success: successProcessor,
            dataType: "json"
        });
    });
}

