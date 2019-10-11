//添加
$('#addCategory').on('submit', function() {
        var formData = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/categories',
            data: formData,
            success: function() {
                location.reload();
            }
        });
        return false;
    })
    //展示
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        console.log(response);
        var html = template('categoryListTpl', response);
        $('#categoryBox').html(html)
    }
})

//编辑
$('#categoryBox').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/categories/' + id,
            success: function(response) {
                console.log(response);
                var html = template('modifyCategoryTpl', response)
                $('#formBox').html(html)

            }
        })
    })
    //修改
$('#formBox').on('submit', '#modifyCategory', function() {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'put',
            url: '/categories/' + id,
            data: formData,
            success: function(response) {
                location.reload();

            }
        })
        return false;
    })
    //删除
$('#categoryBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    if (confirm('确定要删除吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})