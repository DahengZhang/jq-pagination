# jq-pagination

引入 pagination.class.js 文件

页面初始化时调用

```
const p = new Pagination({el: '#pagination-one', cb: function(p) {
    // 用户切换页面时触发
    console.log('当前页面', p)
}})
```
参数说明
```
{
    el: document.getElementById('pagination-one'), // 传入 dom 元素或者 #id .class等
    page: 1, // 当前页码数，默认为1
    total: 1, // 总页码数，默认为1
    cb: function() {} // 页面切换触发的回掉函数
}
```
如果总页码数发生改变，或需要触发更新当前页面页码时，调用
```
p.refreshDom({
   page: 9, // 新的当前页面页码
   total: 9, // 新的总页码
   enforce: true // 默认为 `false` ，设置为 `true` 时，即使页码数和总页码数未发生改变时，也会重绘 `Dom`
})
```
