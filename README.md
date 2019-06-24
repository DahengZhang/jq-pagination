# jq-pagination

引入 pagination.js 文件

在获取接口，并计算好总也码数和当前也码数后，调用

```
pagination({el: document.getElementById('pagination-one'), page: 1, total: 0}, function(e) {
    console.log('当前页面', e)
})
```

```
{
  el: document.getElementById('pagination-one'), // 传入 dom 元素或者挂在点 id(string类型)
  page: 1, // 当前页码数
  total: 0 // 总页码数
}
```
