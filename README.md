# jq-pagination

引入 pagination.class.js 文件

页面初始化时调用

```
const p = new Pagination({el: '#pagination-one', cb: function(p) {
    // 用户切换页面时触发
    console.log('当前页面', p)
}})
```

```
{
  el: document.getElementById('pagination-one'), // 传入 dom 元素或者 #id .class等
  page: 1, // 当前页码数，默认为1
  total: 1, // 总页码数，默认为1
  cb: function() {} // 页面切换触发的回掉函数
}
```
