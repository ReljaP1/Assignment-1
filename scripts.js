$(function() {
    // get all ids
    $('#getID-button').on('click', function() {
        $.ajax({
            url: '/tweets',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                
                tbodyEl.html('');
                console.log(response)
                response.tweets.forEach((tweet) => {
                    tbodyEl.append('\
                        <tr>\
                            <td class="tweetUserID">' + tweet.user.id + '</td>\
                        </tr>\
                    ');
                });
            }
        });
    });
    //get all tweets
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/tweets',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                
                tbodyEl.html('');
                console.log(response)
                response.tweets.forEach((tweet) => {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id" id="id">' + tweet.id + '</td>\
                            <td class="created at">' + tweet.created_at + '</td>\
                            <td><input type="text" class="name" value="' + tweet.text + '"></td>\
                        </tr>\
                    ');
                });
            }
        });
    });
    //search for tweet
    $('#search-button').on('click', function() {
        
        var searchInput = $('#search-id').val();
        console.log(searchInput)
        
        $.ajax({
            url: `/tweets/${searchInput}`,
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                
                tbodyEl.html('');
                console.log(response)
               
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + response.tweet.id + '</td>\
                            <td class="created at">' + response.tweet.created_at + '</td>\
                            <td><input type="text" class="name" value="' + response.tweet.text + '"></td>\
                        </tr>\
                    ');
                
            }
        });
    });

    // create tweet
    $('#create-button').on('click', function(event) {
        event.preventDefault();
        var tweetID = $('#create-tweetID').val();
        var tweetText = $('#create-tweetText').val();
        console.log(tweetID, tweetText)
        
        $.ajax({
            url: `/tweets/${tweetID}/${tweetText}`,
            contentType: 'application/json',
            data: JSON.stringify({  tweetID: tweetID,
                                    tweetText: tweetText}),
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // update screen name
    $('#update-button').on('click', function(event) {
        event.preventDefault();
        var oldName = $('#oldName').val();
        var newName = $('#newName').val();
        console.log(oldName, newName)
        
        $.ajax({
            url: `/tweets/${oldName}/${newName}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
            }
        });
    });

    // delete
    $('table').on('click', function() {
        var rowEle = $('#delete-button').closest('tr');
        var id = rowEle.find('.id').text();
        
        $.ajax({
            url: `/tweets/${id}`,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});
