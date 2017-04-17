//检测用户是否登录，如果没登录跳转至登录页
//检测用户是否登录：
//1 当服务器存储了一个session后，浏览器会设置一个名叫PHPSESSID的cookie
//2 只要检测PHPSESSID是否存在就可以判断用户是否登录过

//通过document.cookie 可以读取本地存的cookie
if(document.cookie.indexOf("PHPSESSID")==-1 && location.pathname!="/login"){
	location.href="/login";
}

var loginfo = $.cookie('loginfo') && JSON.parse($.cookie('loginfo'));
//退出登录
$("#logout").on("click",function(){
	$.ajax({
		url:"/api/logout",
		type:"post",
		success:function (info){
			if(info.code==200){
				alert("退出成功！");
				location.href="/login";
			}
		}
	})
})