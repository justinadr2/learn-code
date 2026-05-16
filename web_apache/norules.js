! function() {
    var n, e, t = "legacy-browser-notification",
        o = "legacy-browser-notification-text",
        i = "legacy-browser-notification-close",
        r = "notifications.recommendationBrowserForPlaying",
        a = "notifications.recommendationBrowserForSamsungPlaying",
        c = {
            chrome: {
                href: "https://www.google.com/chrome/",
                title: "Google Chrome"
            },
            firefox: {
                href: "https://www.mozilla.org/firefox/new/",
                title: "Firefox"
            },
            safari: {
                href: "https://www.apple.com/safari/",
                title: "Safari"
            }
        },
        l = "legacyBrowserRecommendationDismissed",
        s = function() {
            try {
                window.localStorage.setItem(l, "true"), window.localStorage.setItem("".concat(l, "_expires"), String(Date.now() + 6048e5))
            } catch (n) {}
        },
        d = (e = f({
            [r]: "You’re using an outdated browser. To avoid any problems, we strongly recommend using {#chrome/} or {#firefox/}",
            [a]: "To avoid any problems with quality, we strongly recommend using {#chrome/}"
        } [n = /SamsungBrowser/i.test(navigator.userAgent || "") ? a : r]), {
            messageId: n,
            textHtml: e
        }),
        p = d.messageId,
        m = d.textHtml;

    function f(n) {
        if (!n) return "";
        for (var e = n.split(/\{#(chrome|firefox|safari)\/\}/g), t = "", o = 0; o < e.length; o++) {
            var i = e[o],
                r = o % 2 != 0 && i in c;
            if (o % 2 == 0) i && (t += g(i));
            else if (r) {
                var a = c[i];
                t += '<a href="'.concat(a.href, '" target="_blank" rel="nofollow noopener noreferrer" style="color:inherit;text-decoration:underline">').concat(g(a.title), "</a>")
            }
        }
        return t
    }

    function g(n) {
        return String(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }
    window.LEGACY && ! function() {
        try {
            var n = window.localStorage.getItem("".concat(l, "_expires"));
            if (!n) return !1;
            var e = Number(n);
            return !Number.isNaN(e) && (e < Date.now() ? (window.localStorage.removeItem(l), window.localStorage.removeItem("".concat(l, "_expires")), !1) : null != window.localStorage.getItem(l))
        } catch (n) {
            return !1
        }
    }() && (window.I18N_SCRIPT_PROMISE || Promise.resolve()).then((function() {
        try {
            var n = window.I18n.trans({
                messageId: p,
                currentLocale: window.SUBDOMAIN
            });
            return n ? f(n) : m
        } catch (n) {
            return m
        }
    })).catch((function() {
        return m
    })).then((function(n) {
        ! function() {
            try {
                var n = window.svgLoader;
                "function" == typeof(null == n ? void 0 : n.importIcon) && (n.importIcon("exclamation"), n.importIcon("close-ds"))
            } catch (n) {}
        }();
        var e = document.createElement("template");
        e.innerHTML = function() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                e = "#434343";
            return '\n    <div\n      id="'.concat(t, '"\n      role="status"\n      aria-live="polite"\n      style="\n        display:flex;\n        background:').concat("#ffe180", ";\n        color:").concat(e, ';\n        box-shadow:0 1px 0 rgba(0,0,0,.08);\n        width:100%;\n        flex: 0 0 auto;\n        align-items: flex-start;\n      ">\n\n      <div\n        style="\n          display:flex;\n          flex-direction:row;\n          align-items: flex-start;\n          justify-content:center;\n          gap:0 12px;\n          padding: 4px 0 4px 12px;\n          flex: 1 0 0;\n          align-self: stretch;\n        "\n      >\n        <style>\n          #').concat(o, " { font-size: 14px; line-height: 20px; }\n          @media (min-width: 1023px) {\n            #").concat(o, ' { font-size: 16px; line-height: 22px; }\n          }\n        </style>\n        <svg \n          viewBox="0 0 24 24" \n          aria-hidden="true" \n          style="\n            width:20px;\n            min-width: 20px;\n            height:20px;\n            color:').concat(e, ';\n            display:block;\n            top: 10px;\n            position: relative;\n          ">\n          <use href="#icons-exclamation" xlink:href="#icons-exclamation"></use>\n        </svg>\n        <div\n          id="').concat(o, '"\n          style="\n            color: ').concat(e, ';\n            flex-flow: row wrap;\n            gap: 8px 12px;\n            padding-bottom: 8px;\n            padding-top: 8px;\n          "\n        >').concat(n, '</div>\n      </div>\n      <button\n        id="').concat(i, '"\n        type="button"\n        aria-label="Close"\n        style="\n          position:relative;\n          top: 8px;\n          right: 8px;\n          padding-left: 16px;\n          background:transparent;\n          border:0;\n          color:').concat(e, ';\n          cursor:pointer;\n          font-size:20px;\n          line-height:1;\n          opacity:.7;\n        "\n      >\n        <svg \n          viewBox="0 0 24 24"\n          aria-hidden="true"\n          style="\n            width:20px;\n            height:20px;\n            display:block;\n            min-width: 20px;\n          ">\n          <use href="#icons-close-ds" xlink:href="#icons-close-ds"></use>\n        </svg>\n      </button>\n    </div>\n  ')
        }(n).trim();
        var r = e.content.firstElementChild;
        if (r && r instanceof HTMLElement && !document.getElementById(t)) {
            var a = document.getElementById("legacy-browser-notification-root");
            if (a) a.appendChild(r);
            else {
                var c = document.getElementById("body");
                (null == c ? void 0 : c.parentNode) ? c.parentNode.insertBefore(r, c): document.body.firstChild ? document.body.insertBefore(r, document.body.firstChild) : document.body.appendChild(r)
            }
            var l = document.getElementById(i);
            l && l.addEventListener("click", (function() {
                var n = document.getElementById(t);
                n && (n.style.display = "none"), s()
            }))
        }
    }))
}()