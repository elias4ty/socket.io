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

  socket.on('typing',function(){
    console.log('typing')
    socket.emit('opp')
  })

  socket.on('type end',function(){
    console.log('type end')
    socket.emit('opp end')
  })

  let iterator = comet(socket);
  setInterval(iterator.goNext,1000)
})

function comet(socket){
    var i = 0;

    return {
      goNext(){
          ++i;
        if(i<=10){
          console.log(`第${i}次推送数据`)
          socket.emit('comet',`第${i}次推送数据`)
        }else{
          clearInterval(this)
        }
      }
    }
}
http.listen(3000,function(){
  console.log('listen at 3000')
})
