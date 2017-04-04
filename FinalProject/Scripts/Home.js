var loginHtml = '<div id="existingUsersContainer"> <p id="existingUsersInfo"> Already have an account with us? Returning users may log in by entering their site username and password </p> <div id="existingUserLoginControls"> <div id="existingUserUserNameControls"> <label for="existingUserUserName">Username</label> <input type="text" id="existingUserUserName" /> </div> <div id="existingUserPasswordControls"> <label for="existingUserPassword">Password</label> <input type="text" id="existingUserPassword" /> </div> <div id="existingUserLogInButton"> <button>Log In</button> </div> </div> </div> <div id="newUsersContainer"> <p id="newUsersInfo"> New users, please create a new account by providing us with some basic information </p> <div id="newUserLoginControls"> <div id="newUserUserNameControls"> <label for="newUserUserName">Username</label> <input type="text" id="newUserUserName" /> </div> <div id="newUserPasswordControls"> <label for="newUserPassword">Password</label> <input type="text" id="newUserPassword" /> </div> <div id="newUserEmailControls"> <label for="newUserEmail">E-mail Address</label> <input type="text" id="newUserEmail" /> </div> <div id="newUserEmailRepeatControls"> <label for="newUserEmailRepeat">Repeat E-mail Address</label> <input type="text" id="newUserEmailRepeat" /> </div> <div id="newUserCreateAccountControls"> <button id="newUserCreateAccountButton">CreateAccount</button> </div> </div> </div>';
var accountInfoHtml = '<div> Made it to account info ... now I just need to add something here </div>';

$(document).ready(function () {
    $(".content").html(loginHtml);
});

$("#newUserCreateAccountButton").click(function () {
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

function successAccountCreate() {
    $(".content").html(accountInfoHtml);
}