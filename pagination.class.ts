interface BtnOption {
    page: number|string
    disabled: boolean
}

class Pagination {
    el: HTMLElement
    page: number
    total: number
    callBack: Function
    constructor(option) {
        this.el = typeof option.el === 'string' ? document.querySelector(option.el) : option.el
        this.page = option.page || 1
        this.total = option.total || 1
        this.callBack = option.cb

        this.el.addEventListener('click', this.addEvent)
        this.refreshDom({page: this.page, total: this.total, enforce: true})
    }

    refreshDom({page = this.page, total = this.total, enforce = false}) {

        if (!enforce && page === this.page && total === this.total) {
            return
        }

        this.page = page
        this.total = total

        let template: Array<string> = ['<ul class="pagination justify-content-end">']
        template.push(page === 1
            ? this.createBtn({page: '&laquo;', disabled: true})
            : this.createBtn({page: '&laquo;', disabled: false}))
        let pages: Array<number|string> = [1]

        if (total <= 7) {
            for (var i = 2; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (page > 4) {
                pages.push('...')
            }
            let startPage: number = page - 1
            let endPage: number = page + 1

            if (page < 5) {
                startPage = 1
                endPage = 5
            }

            if (page > total - 4) {
                startPage = total - 4
                endPage = total
            }

            for (let i:number = startPage; i <= endPage; i++) {
                if (i <= 1) {
                    continue
                }
                if (i >= total) {
                    continue
                }
                pages.push(i)
            }

            if (page <= total - 4) {
                pages.push('...')
            }
            pages.push(total)
        }

        for (var i = 0; i < pages.length; i++) {
            template.push(this.createBtn({
                page: pages[i],
                disabled: pages[i] === page || typeof pages[i] === 'string'
            }))
        }
        template = template.concat(
            page === total
                            ? this.createBtn({page: '&raquo;', disabled: true})
                            : this.createBtn({page: '&raquo;', disabled: false}),
            '</ul>')
        this.el.innerHTML = template.join('')
    }

    createBtn(option: BtnOption) {
        let btn: string = '<li class="page-item'
        option.disabled && (btn += ' disabled')
        btn += '"><a class="page-link" href="#">' + option.page + '</a></li>'
        return btn
    }

    addEvent = (e: any) => {
        e.preventDefault();
        if (!e.target.classList.contains('page-link')) {
            // 如果被点击的元素不是page-link，则不进行任何操作
            return;
        }
        if (e.target.innerText === '«') {
            // 点击前一页按钮
            this.refreshDom({page: --this.page, total: this.total})
        } else if (e.target.innerText === '»') {
            // 点击后一页按钮
            this.refreshDom({page: ++this.page, total: this.total})
        } else {
            // 点击页码按钮
            this.refreshDom({page: Number(e.target.innerText), total: this.total})
        }
        this.callBack(this.page)
    }
}