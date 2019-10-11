$.ajax({
        type: 'get',
        url: '/categories',
        success: function(response) {
            console.log(response);
            var html = template('categoryTpl', {
                data: response
            });
            console.log(html);

            $('#category').html(html)
        }
    })
    //文章图片封面的上传
$('#feature').on('change', function() {
        var file = this.files[0]
        console.log(file);

        var formData = new FormData();
        formData.append('cover', file);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                $('#pic').attr('src', response[0].cover).show();
                $('#thumbnail').val(response[0].cover)
            }
        })
    })
    //添加文章
$('#addForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        },

    });
    return false;
})

//文章编辑
var id = getUrlParams('id');
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function(response) {
            // console.log(response);
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories) {

                    response.categories = categories;
                    console.log(response)

                }
            })
            var html = template('modifyForm', response)
                // console.log(html);


        }
    })
}

//获取地址栏传入的属性值  用来区分是否为添加文章还是修改文章
function getUrlParams(name) {
    // console.log(location.search.substr(1).split('&'))
    var paramsAry = location.search.substr(1).split('&');
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1;
}