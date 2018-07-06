var express = require("express");
var path = require('path');
var app = express();

app.set("view engine", 'ejs');  // 设置 view engine, 使用ejs模版引擎
app.set("views", path.resolve(__dirname,'views'))  // 设置views，模版放置的地方 
app.use(express.static('assets')); // 静态文件

// use和get的区别是use是模糊匹配，/ 表示匹配所有路径，第一个参数不写默认就是/
app.use('/', function(req, res, next) {
	console.log('匹配所有路径，一般用作拦截器、日志统计等场合。')
	next(); // 必须调用next()才会继续后面的匹配，否则到此为止
});

app.get('/', function(req, res){
	console.log('进入首页');
    res.send("<h1>欢迎访问！</h1>");
});

// 使用EJS模板
app.get('/ejs.html', function(req, res){
	res.render('index.ejs', {
		list: ['张三', '李四', '王二麻子'],　　　　
　　});
});

app.get("/test",function(req,res) {
	// send 和 write的区别是，send和end都只能调用一次，write可以调用多次，send还会自动设置Content-Type
    res.write(req.originalUrl + "\n");   //    /admin/aa/bb/cc/dd
    res.write(req.baseUrl + "\n");  //   /admin
    res.write(req.path + "\n");   //    /aa/bb/cc/dd
    res.end("你好");
}); 

//使用正则匹配学号
app.get(/^\/student\/([\d]{10})$/,function(req,res){
    res.send("学生信息，学号" + req.params[0]);
});

app.get("/blog/:title",function(req, res){
	res.send("文章标题：" + req.params.title);
});

// 如果走到这里还没有匹配到，那么返回404
app.use(function(request, response) {
    response.statusCode = 404;
    response.end("404!");
});


app.listen(3000, () => {
	console.log('server listen on : http://localhost:' + 3000);
});

