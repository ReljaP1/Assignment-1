var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs')
//const tweets = require('./favs.json');
const { response } = require('express');
const { data } = require('jquery');
app.set("view engine", "ejs")

let tweets = [];
fs.readFile('./favs.json', 'utf-8',(err, jsonString) =>{

if(err){
    console.error(err)
    return
}
try{
   var data = JSON.parse(jsonString)
   tweets = data
    console.log(tweets);
} catch(err){
    console.error(err);
}
} )


var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());


app.get('/tweets', function(req, res) {
    res.send({ tweets: tweets });
});

app.get('/tweets/:id', function(req, res, next){
    var searchKey = req.params.id
    var result = 0;
    for(var i = 0; i < tweets.length; i++){
        if(tweets[i].id_str === searchKey){
            result = i
        }
    }

    res.send({tweet: tweets[result]})
})
//create tweet  
app.post('/tweets/:id/:text', function(req, res, next) {
    var tweetID = req.params.id;
    var tweetText = req.params.text;

    tweets.push({
        id: tweetID,
        text: tweetText,
        created_at: unknown
    });

    res.send('Successfully created tweet!');
});

//update screenname
app.put('/tweets/:oldName/:newName', function(req, res) {
    var searchKey = req.params.oldName
    var result = -1;
    for(var i = 0; i < tweets.length; i++){
        if(tweets[i].user.name === searchKey){
            result = i
        }
    }
    if(result != -1){
        tweets[result].user.screen_name = req.params.newName
        res.send('Succesfully updated username!');
    }
    else{
        res.send('Username not found!');
    }

});


app.delete('/tweets/:id', function(req, res) {
    var searchKey = req.params.id
    var result = -1;
    for(var i = 0; i < tweets.length; i++){
        if(tweets[i].id === searchKey){
            result = i
        }
    }
    if(result != -1){
        tweets = tweets.filter((tweet)=> tweet.id_str !== searchKey)
        res.send('Successfully deleted tweet!');
    }
    else{
        res.send('Tweet ID was not found!');
    }

});

console.log(tweets)
app.listen(PORT, function() {
    console.log('Server listening on ' + PORT);
});