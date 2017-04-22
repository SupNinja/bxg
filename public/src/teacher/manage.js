
define(['jquery', '../utils', 'template', 'validate', 'form','datepicker', 'language'], function ($, utils, template) {
    // 设置导航
    utils.setMenu('/teacher/index');

    // 由于添加操作和编辑操作页面布局一类似的
    // 那么为了方便就使用了同一页面
    // 逻辑是互影响的，所以分别处理

    var teacherManage = $('#teacherManage'),
        tc_id = utils.qs('tc_id'),
        html, tips;

    if (tc_id) { // 编辑

        // 根据讲师的ID，查询讲的原始信息，然后进行修改
        // http://api.botue.com/teacher/edit
        // /api http://api.botue.com
        $.ajax({
            url: '/api/teacher/edit',
            type: 'get',
            data: { tc_id: tc_id },
            success: function (info) {
                tips = '修改成功';
                // 在原有数据上追加数据
                info.result.btnText = ' 修 改 ';
                info.result.title = '讲师修改';
                info.result.action = '/api/teacher/update';
                // 
                html = template('manageTpl', info.result);
                // 追加DOM
                teacherManage.html(html);

                //处理表单(验证＋提交)
                dealForm();
            }
        });
    } else {
        tips = "添加成功";
        html = template('manageTpl', {
            btnText: ' 添 加 ',
            title: '讲师添加',
            action: '/api/teacher/add'
        });

        teacherManage.html(html);

        dealForm();
    }

    function dealForm() {
        teacherManage.find('form').validate({
            sendForm: false,
            onKeyup: true,
            eachValidField: function () {
                // this指的合法的表单项
                $(this).next().addClass('glyphicon-ok').removeClass('glyphicon-remove')
                    .parents('.form-group').addClass('has-success').removeClass('has-error');
            },
            eachInvalidField: function () {
                // 
                $(this).next().addClass('glyphicon-remove').removeClass('glyphicon-ok')
                    .parents('.form-group').addClass('has-error').removeClass('has-success');
            },
            valid: function () {
                // 所有表单项都合法，可以提交表单
                // 在此的this指当前表单
                $(this).ajaxSubmit({
                    // url: '/api/teacher/add',
                    type: 'post',
                    success: function (info) {
                        // console.log(info);
                        if (info.code == 200) {
                            alert(tips);
                        }
                    }
                });
            },
            description: {
                name: {
                    required: '用户名不能为空'
                },
                pass: {
                    required: '密码不能为空',
                    pattern: '密码只能为字母和数字且长度不能小于6位'
                }
            }
        });
    }
});