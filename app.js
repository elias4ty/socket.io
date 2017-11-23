const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/',function(req,res){
  res.sendFile(__dirname+'/index.html')
});

io.on('connection',socket => {
  socket.on('go',msg =>{
    console.log('msg:' + msg)
    io.emit('back',msg)
  })
})
http.listen(3000,function(){
  console.log('listen at 3000')
})
