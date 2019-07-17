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
                _this.refreshDom({ page: --_this.page, enforce: true });
            }
            else if (e.target.innerText === '»') {
                // 点击后一页按钮
                _this.refreshDom({ page: ++_this.page, enforce: true });
            }
            else {
                // 点击页码按钮
                _this.refreshDom({ page: Number(e.target.innerText), enforce: true });
            }
            _this.callBack(_this.page);
        };
        this.el = typeof option.el === 'string' ? document.querySelector(option.el) : option.el;
        this.page = option.page || 1;
        this.total = option.total || 1;
        this.callBack = option.cb;
        this.el.addEventListener('click', this.addEvent);
        this.refreshDom({ page: this.page, total: this.total, enforce: true });
    }
    Pagination.prototype.refreshDom = function (_a) {
        var _b = _a.page, page = _b === void 0 ? this.page : _b, _c = _a.total, total = _c === void 0 ? this.total : _c, _d = _a.enforce, enforce = _d === void 0 ? false : _d;
        if (!enforce && page === this.page && total === this.total) {
            return;
        }
        this.page = page;
        this.total = total;
        var template = ['<ul class="pagination justify-content-end">'];
        template.push(page === 1
            ? this.createBtn({ page: '&laquo;', disabled: true })
            : this.createBtn({ page: '&laquo;', disabled: false }));
        var pages = [1];
        if (total <= 7) {
            for (var i = 2; i <= total; i++) {
                pages.push(i);
            }
        }
        else {
            if (page > 4) {
                pages.push('...');
            }
            var startPage = page - 1;
            var endPage = page + 1;
            if (page < 5) {
                startPage = 1;
                endPage = 5;
            }
            if (page > total - 4) {
                startPage = total - 4;
                endPage = total;
            }
            for (var i_1 = startPage; i_1 <= endPage; i_1++) {
                if (i_1 <= 1) {
                    continue;
                }
                if (i_1 >= total) {
                    continue;
                }
                pages.push(i_1);
            }
            if (page <= total - 4) {
                pages.push('...');
            }
            pages.push(total);
        }
        for (var i = 0; i < pages.length; i++) {
            template.push(this.createBtn({
                page: pages[i],
                disabled: pages[i] === page || typeof pages[i] === 'string',
                selected: pages[i] === page
            }));
        }
        template = template.concat(page === total
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
