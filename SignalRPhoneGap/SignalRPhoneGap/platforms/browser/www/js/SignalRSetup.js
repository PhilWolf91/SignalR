    var appConfig = {
        'serverUrl': "http://wolf-signalrserver.azurewebsites.net"
    }

    var initiateSignalR = function(){
        if ($.signalR) {

        }
        
        var username = prompt("username");
        var success = `
                    <div class ="serverMessage">
                        <span>--- WELCOME, ${username} ---</span>
                    </div>
                `
        $('#chatbox').append(success)




    $.connection.hub.logging = true
            $.connection.hub.qs = { 'username': username }
            $.connection.hub.url = appConfig.serverUrl + "/signalr";
            var chatHub = $.connection.chatHub

            chatHub.client.broadcastMessage = function (name, message) {
                console.log("Data Incoming ---- Name: " + name + " Message: " + message);
                var message = `
                    <div class="row">
                        <span class="col-sm-2">${name}:</span> 
                        <span class="col-sm-9"> ${message}</span>
                    </div>
                `
                $('#chatbox').append(message)
            }


            $('#messageButton').on('click', function () {
                chatHub.server.send(username, $('#messageBox').val())
            })
            $('#messageForm').on('submit', function (e) {
                e.preventDefault();
                chatHub.server.send(username, $('#messageBox').val())
            })

            $.connection.hub.start({ withCredentials: false, jsonp: true })
                .done(function () {
                    console.log("Connected successfully to SignalR");
                    var success = `
                        <div class ="serverMessage">
                            <span>--- Successfully connected to the server ---</span>
                        </div>
                    `
                    $('#chatbox').append(success)
                })
                .fail(function (err) {
                    console.log("Unable to connect to SignalR")
                    alert(err);
                })
    }
        