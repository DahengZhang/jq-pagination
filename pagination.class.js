var Pagination = /** @class */ (function () {
    function Pagination(option) {
        var _this = this;
        this.addEvent = function (e) {
            e.preventDefault();
            if (!e.target.classList.contains('page-link')) {
                // 如果被点击的元素不是page-link，则不进行任何操作
                return;
            }
            if (e.target.innerText === '«') {
                // 点击前一页按钮
                _this.refreshDom({ page: --_this.page, total: _this.total });
            }
            else if (e.target.innerText === '»') {
                // 点击后一页按钮
                _this.refreshDom({ page: ++_this.page, total: _this.total });
            }
            else {
                // 点击页码按钮
                _this.refreshDom({ page: Number(e.target.innerText), total: _this.total });
            }
            _this.callBack(_this.page);
        };
        this.el = typeof option.el === 'string' ? document.querySelector(option.el) : option.el;
        this.page = option.page || 1;
        this.total = option.total || 1;
        this.callBack = option.cb;
        this.el.addEventListener('click', this.addEvent);
        this.refreshDom({ page: this.page, total: this.total });
    }
    Pagination.prototype.refreshDom = function (option) {
        option.page ? (this.page = option.page) : (option.page = this.page);
        option.total ? (this.total = option.total) : (option.total = this.total);
        var template = ['<ul class="pagination justify-content-end">'];
        template.push(option.page === 1
            ? this.createBtn({ page: '&laquo;', disabled: true })
            : this.createBtn({ page: '&laquo;', disabled: false }));
        var pages = [1];
        if (option.total <= 7) {
            for (var i = 2; i <= option.total; i++) {
                pages.push(i);
            }
        }
        else {
            if (option.page > 4) {
                pages.push('...');
            }
            var startPage = option.page - 1;
            var endPage = option.page + 1;
            if (option.page < 5) {
                startPage = 1;
                endPage = 5;
            }
            if (option.page > option.total - 4) {
                startPage = option.total - 4;
                endPage = option.total;
            }
            for (var i_1 = startPage; i_1 <= endPage; i_1++) {
                if (i_1 <= 1) {
                    continue;
                }
                if (i_1 >= option.total) {
                    continue;
                }
                pages.push(i_1);
            }
            if (option.page <= option.total - 4) {
                pages.push('...');
            }
            pages.push(option.total);
        }
        for (var i = 0; i < pages.length; i++) {
            template.push(this.createBtn({
                page: pages[i],
                disabled: pages[i] === option.page || typeof pages[i] === 'string'
            }));
        }
        template = template.concat(option.page === option.total
            ? this.createBtn({ page: '&raquo;', disabled: true })
            : this.createBtn({ page: '&raquo;', disabled: false }), '</ul>');
        this.el.innerHTML = template.join('');
    };
    Pagination.prototype.createBtn = function (option) {
        var btn = '<li class="page-item';
        option.disabled && (btn += ' disabled');
        btn += '"><a class="page-link" href="#">' + option.page + '</a></li>';
        return btn;
    };
    return Pagination;
}());
