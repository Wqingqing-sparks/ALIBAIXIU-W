// 当表单发生提交行为的时候
$('#userForm').on('submit', function() {
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送添加用户的请求
    $.ajax({
            type: 'post',
            url: '/users',
            data: formData,
            success: function() {
                // 刷新页面
                location.reload();
            },
            error: function() {
                $('.alert-danger').show()
            }
        })
        // 阻止表单的默认提交行为
    return false;
});
//当客户选择文件上传的时候
$('#modifyBox').on('change', '#avatar', function() {
    console.log(this.files[0]);
    //    创建一个formdata表单提交事件，添加一个图像属性
    // $('#avatar') 的response第一个属性
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
});
//向服务器索要用户列表数据 
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        console.log(response);
        var html = template('userTpl', { data: response })
        $('#userBox').html(html); //注册用户展示在页面
    }
}); //用户修改
//当编辑按钮被点击的时候由于js默认的时间冒泡到父级userBox上，就会触发userbox的function
//通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html)

        }
    })
});
//为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function(response) {
                location.reload()
            },

        })
        return falsse;
    })
    //删除
$('#userBox').on('click', '.delete', function() {
        if (confirm('确定要删除吗')) {
            var id = $(this).attr('data-id')
            $.ajax({
                type: 'delete',
                url: '/users/' + id,
                success: function() {
                    location.reload()
                }
            })
        }
    })
    // 全选按钮
var selectAll = $('#selectAll')
var deleteMany = $('#deleteMany')
selectAll.on('change', function() {
    var status = $(this).prop('checked') //获取全选按钮的状态
        //获取到所有用户 并将用户的状态和全选按钮保持一致

    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    $('#userBox').find('input').prop('checked', status)
})
$('#userBox').on('change', '.userStatus', function() {
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)

    } else {
        selectAll.prop('checked', false)
    }

    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});
deleteMany.on('click', function() {
    var ids = [];
    var checkedUser = $('#userBox').find('input').filter(':checked')
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'))
    })
    if (confirm('想好要批量删除了吗？')) {
        $.ajax({
            type: 'delete',
            url: '  /users/' + ids.join('-'),
            success: function() {
                location.reload()
            }
        })
    }
})