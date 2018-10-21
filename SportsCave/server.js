const mongo = require('mongodb').MongoClient;
const io = require('socket.io').listen(4000).sockets;


mongo.connect('mongodb://127.0.0.1/sportscavechat',  { useNewUrlParser: true }, function(err, client){
    if(err){
        throw err;
    }
    
    console.log('MongoDB connected....');

    io.on('connection', function(socket){
        let chat = client.db('sportscavechat').collection('chats');


        sendStatus = function(s){
            socket.emit('status',s);
        };


        chat.find().limit(100).sort({__id:1}).toArray(function(err, res)
        {
            if(err){
                throw err;
            }

            socket.emit('output', res);
        });

        socket.on('input', function(data){
            let name = data.name;
            let message = data.message;

            if(name == '' || message == ''){
                sendStatus('Please enter a name and message');
            } else{
                chat.insertOne({name: name, message: message}, function(){
                    io.emit('output', [data]);

                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                });
            }

        });

        socket.on('clear', function(data){

            chat.deleteMany({}, function(){
                socket.emit('cleared');
            });
        });
    });
});