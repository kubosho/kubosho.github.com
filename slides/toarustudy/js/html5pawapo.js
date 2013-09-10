var html5pawapo = (function () {
    function html5pawapo(parentElm, childElms) {
        this.parentElm = parentElm;
        this.childElms = childElms;
    }
    html5pawapo.prototype.initialize = function () {
        this.currentPage = this.getCurrentPage();
        this.parentElm = document.getElementById("slides");
        this.childElms = document.getElementsByClassName("slide");

        this.setAdjustWindow();
        this.selectPage(this.currentPage - 1);
    };

    html5pawapo.prototype.setAdjustWindow = function (elm) {
        if (typeof elm === "undefined") { elm = this.parentElm; }
        var width = window.innerWidth;
        var height = window.innerHeight;

        elm.style.width = width + "px";
        elm.style.height = height + "px";
    };

    html5pawapo.prototype.getCurrentPage = function () {
        return parseInt(location.hash.replace(/^#page/, "")) || 1;
    };

    html5pawapo.prototype.selectPage = function (num) {
        var elm = this.childElms[num];
        this.hidePageAll(this.childElms);
        this.showPage(elm);
    };

    html5pawapo.prototype.nextPage = function () {
        if (this.currentPage !== this.childElms.length) {
            this.currentPage += 1;
            location.hash = "page" + this.currentPage;
            this.selectPage(this.currentPage - 1);
        }
    };

    html5pawapo.prototype.prevPage = function () {
        if (this.currentPage - 1 !== 0) {
            this.currentPage -= 1;
            location.hash = "page" + this.currentPage;
            this.selectPage(this.currentPage - 1);
        }
    };

    html5pawapo.prototype.hidePage = function (elm) {
        elm.classList.add("hidden");
        elm.classList.remove("visible");
    };

    html5pawapo.prototype.hidePageAll = function (elms) {
        var _this = this;
        Array.prototype.forEach.call(elms, function (elm) {
            _this.hidePage(elm);
        });
    };

    html5pawapo.prototype.showPage = function (elm) {
        elm.classList.add("visible");
        elm.classList.remove("hidden");
    };

    html5pawapo.prototype.keyBoardNavigation = function (event) {
        event.preventDefault();

        switch (event.keyCode) {
            case 78:
            case 74:
            case 39:
                this.nextPage();
                break;
            case 80:
            case 75:
            case 37:
                this.prevPage();
                break;
        }
    };
    return html5pawapo;
})();

(function () {
    var that = this;

    document.addEventListener("DOMContentLoaded", function () {
        var html5pawapo = new that.html5pawapo();
        html5pawapo.initialize();
        document.addEventListener("keydown", function (event) {
            return html5pawapo.keyBoardNavigation(event);
        }, false);
        html5pawapo.parentElm.addEventListener("click", function () {
            return html5pawapo.nextPage();
        }, false);
        window.addEventListener("resize", function () {
            return html5pawapo.setAdjustWindow();
        }, false);
    }, false);
})();
//@ sourceMappingURL=html5pawapo.js.map
