function pagination(option, cb) {
    var el = typeof option.el === 'string' ? document.querySelector(option.el) : option.el;
    var template = [];
    var nowPage = Number(option.page) || 1;
    var totalPage = Number(option.total) || 1;

    createPageBtns();
    addEvent();

    function createPageBtns() {
        template = ['<ul class="pagination justify-content-end">']
        template.push(nowPage === 1 ? previousBtn(true) : previousBtn());
        var pageNumbers = [];
        if (totalPage <= 7) {
            for (var i = 1; i <= totalPage; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (nowPage > 4) {
                pageNumbers.push('...');
            }
            var startNumber = nowPage - 1;
            var endNumber = nowPage + 1;

            if (nowPage < 5) {
                startNumber = 1;
                endNumber = 5;
            }

            if (nowPage > totalPage - 4) {
                startNumber = totalPage - 4;
                endNumber = totalPage;
            }

            for (var i = startNumber; i <= endNumber; i++) {
                if (i <= 1) {
                    continue;
                }
                if (i >= totalPage) {
                    continue;
                }
                pageNumbers.push(i);
            }
            if (nowPage <= totalPage - 4) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPage);
        }
        for (var i = 0; i < pageNumbers.length; i++) {
            template.push(pageBtn(pageNumbers[i], pageNumbers[i] === nowPage));
        }
        template.push(nowPage === totalPage ? nextBtn(true) : nextBtn());
        template.push('</ul>');
        el.innerHTML = template.join('');
    }
    
    function addEvent() {
        el.addEventListener('click', e => {
            e.preventDefault();
            if (!e.target.classList.contains('page-link')) {
                // 如果被点击的元素不是page-link，则不进行任何操作
                return;
            }
            if (e.target.innerText === '«') {
                previous();
            } else if (e.target.innerText === '»') {
                next();
            } else {
                page(Number(e.target.innerText));
            }
        });
    }
    function previous() {
        if (nowPage <= 1) {
            return;
        }
        cb(--nowPage);
        createPageBtns();
    }
    function next() {
        if (nowPage >= totalPage) {
            return;
        }
        cb(++nowPage);
        createPageBtns()
    }
    function page(e) {
        cb(nowPage = e);
        createPageBtns();
    }
    function pageBtn(page, disabled) {
        !disabled && (disabled = isNaN(Number(page)));
        var btn = '<li class="page-item';
        !!disabled && (btn += ' disabled');
        btn += '"><a class="page-link" href="#">' + page + '</a></li>';
        return btn;
    }
    function previousBtn(disabled) {
        var btn = '<li class="page-item';
        !!disabled && (btn += ' disabled');
        btn += '"><a class="page-link" href="#">&laquo;</a></li>';
        return btn;
    }
    function nextBtn(disabled) {
        var btn = '<li class="page-item';
        !!disabled && (btn += ' disabled');
        btn += '"><a class="page-link" href="#">&raquo;</a></li>';
        return btn;
    }
}