class html5pawapo {
    private currentPage : number;

    constructor(private parentElm: HTMLElement, private childElms: NodeList) {}

    // 初期化
    initialize() : void {
        this.currentPage = this.getCurrentPage();
        this.parentElm = document.getElementById("slides");
        this.childElms = document.getElementsByClassName("slide");

        this.setAdjustWindow();
        this.selectPage(this.currentPage - 1);
    }

    // ウインドウの幅に要素の高さと幅をあわせる
    setAdjustWindow(elm: HTMLElement = this.parentElm) : void {
        var width = window.innerWidth;
        var height = window.innerHeight;

        elm.style.width = width + "px";
        elm.style.height = height + "px";
    }

    // 現在のページを取得する
    getCurrentPage() : number {
        return parseInt(location.hash.replace(/^#page/, "")) || 1;
    }

    // 引数で指定されたページにclassを設定する
    selectPage(num: number) : void {
        var elm = this.childElms[num];
        this.hidePageAll(this.childElms);
        this.showPage(<HTMLElement>elm);
    }

    // 次のページへ移動する
    nextPage() : void {
        if (this.currentPage !== this.childElms.length) {
            this.currentPage += 1;
            location.hash = "page" + this.currentPage;
            this.selectPage(this.currentPage - 1);
        }
    }

    // 前のページへ移動する
    prevPage() : void {
        if (this.currentPage - 1 !== 0) {
            this.currentPage -= 1;
            location.hash = "page" + this.currentPage;
            this.selectPage(this.currentPage - 1);
        }
    }

    // ページを非表示にする
    hidePage(elm: HTMLElement) : void {
        elm.classList.add("hidden");
        elm.classList.remove("visible");
    }

    // ページを全て非表示にする
    hidePageAll(elms: NodeList) : void {
        Array.prototype.forEach.call(elms, (elm) => {
            this.hidePage(elm);
        });
    }

    // ページを表示する
    showPage(elm: HTMLElement) : void {
        elm.classList.add("visible");
        elm.classList.remove("hidden");
    }

    // キーボードによる操作を可能にする
    keyBoardNavigation(event: KeyboardEvent) : void {
        switch (event.keyCode) {
            case 78: // n
            case 74: // j
            case 39: // ->
                this.nextPage();
                break;
            case 80: // p
            case 75: // k
            case 37: // <-
                this.prevPage();
                break;
        }
    }
}

(function () {
    var that = this;

    document.addEventListener("DOMContentLoaded", () => {
        var html5pawapo = new that.html5pawapo();
        html5pawapo.initialize();
        document.addEventListener("keydown", event => html5pawapo.keyBoardNavigation(event), false);
        document.addEventListener("click", () => html5pawapo.nextPage(), false);
        window.addEventListener("resize", () => html5pawapo.setAdjustWindow(), false);
    }, false);
})();
