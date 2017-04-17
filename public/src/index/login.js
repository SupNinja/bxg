
// 定义模块，此模块用来实现登录功能
define(['jquery','cookie'],function($){
    $("#loginForm").on("submit",function(){
            var formData=$(this).serialize();
            $.ajax({
                type:"post",
                url:"/api/login",
                data:formData,
                success: function(info){
                    if(info.code==200){
                        alert("登录成功");
                        $.cookie("loginfo",JSON.stringify(info.result));
                        location.href="/";
                    }
                }
            })
            return false;
        })
})