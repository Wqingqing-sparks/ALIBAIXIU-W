 $.ajax({
     type: 'get',
     url: '/posts',
     success: function(response) {
         console.log(response);
         var html = template('postsTpl', response);
         $('#postsBox').html(html)
         var page = template('pageTpl', response);
         $('#page').html(page)
     }
 });

 function formateDate(date) {
     //  console.log(date);
     date = new Date(date);
     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
 }

 function changePage(page) {
     $.ajax({
         type: 'get',
         url: '/posts',
         data: {
             page: page,
         },
         success: function(response) {
             console.log(response);
             var html = template('postsTpl', response);
             $('#postsBox').html(html)
             var page = template('pageTpl', response);
             $('#page').html(page)
         }
     });
 }

 $.ajax({
     type: 'get',
     url: '/categories',
     success: function(response) {
         console.log(response)
         var html = template('categoryTpl', { data: response });
         $('#categoryBox').html(html);
     }
 })
 $('#filterForm').on('submit', function() {
     // 获取到管理员选择的过滤条件
     var formData = $(this).serialize();
     // 向服务器端发送请求 根据条件索要文章列表数据
     $.ajax({
         type: 'get',
         url: '/posts',
         data: formData,
         success: function(response) {
             var html = template('postsTpl', response);
             $('#postsBox').html(html);
             var page = template('pageTpl', response);
             $('#page').html(page);
         }
     });
     // 阻止表单默认提交行为
     return false;
 });