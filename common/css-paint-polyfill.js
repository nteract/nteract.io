!(function() {
  function e(e, t) {
    var n = new XMLHttpRequest();
    (n.onreadystatechange = function() {
      4 === n.readyState && t(n.responseText);
    }),
      n.open("GET", e, !0),
      n.send();
  }
  function t(e, t, n) {
    Object.defineProperty ? Object.defineProperty(e, t, n) : (e[t] = n.get());
  }
  var n;
  window.CSS || (window.CSS = {}),
    "paintWorklet" in window.CSS ||
      t(window.CSS, "paintWorklet", {
        get: function() {
          return n || (n = new F());
        }
      });
  var r = "css-paint-polyfill",
    i = document.createElement(r);
  (i.style.cssText = "display: none;"), document.documentElement.appendChild(i);
  var o = document.createElement("style");
  (o.id = r), i.appendChild(o);
  var a = o.sheet,
    s = i.style,
    l = [],
    u = /(paint\(|-moz-element\(#paint-|-webkit-canvas\(paint-|[('"]blob:[^'"#]+#paint=|[('"]data:image\/paint-)/,
    c = "getCSSCanvasContext" in document,
    d = (s.backgroundImage = "-moz-element(#" + r + ")") === s.backgroundImage;
  s.cssText = "";
  var p = !0,
    v = window.requestAnimationFrame || setTimeout,
    f =
      "function" == typeof Promise
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout,
    h = function() {
      return window.devicePixelRatio || 1;
    },
    g = {},
    m = {},
    y = 0;
  function $(e) {
    var t = (e.bit ^= 1);
    return e.instances[t] || (e.instances[t] = new e.Painter());
  }
  function b(e, t) {
    var n = e.cssText;
    !0 === t.isNew && u.test(n) && n !== (n = T(n)) && (e = x(e, n));
    var r,
      i,
      o,
      a = e.selectorText,
      s = A(e.style);
    if (
      ((r = null == t.counters[a] ? (t.counters[a] = 1) : ++t.counters[a]),
      null != m[(i = "sheet" + t.sheetId + "\n" + a + "\n" + r)])
    ) {
      if ((o = m[i]).selector === a)
        return (o.rule = e), void (o.cssText !== s && t.toProcess.push(o));
      t.toRemove.push(o);
    } else
      (o = m[i] = { key: i, selector: a, cssText: s, properties: {}, rule: e }),
        t.toProcess.push(o.selector);
  }
  function w() {
    for (
      var e = [].slice.call(document.styleSheets),
        t = {
          toProcess: [],
          toRemove: [],
          counters: {},
          isNew: !1,
          sheetId: null
        },
        n = 0;
      n < e.length;
      n++
    ) {
      var r = e[n].ownerNode;
      (t.sheetId = r.$$paintid),
        (t.isNew = null == t.sheetId),
        (t.isNew && ((t.sheetId = r.$$paintid = ++y), !1 === R(r))) ||
          P(r.sheet, b, t);
    }
    for (var i = t.toRemove.length; i--; ) delete m[t.toRemove[i].key];
    t.toProcess.length > 0 &&
      (function(e) {
        for (var t = document.querySelectorAll(e), n = 0; n < t.length; n++)
          N(t[n]);
      })(t.toProcess.join(", "));
  }
  function P(e, t, n) {
    var r = [[0, e.cssRules]],
      i = r[0],
      o = i[1];
    if (o)
      for (var a = 0; r.length > 0; a++)
        if (a >= o.length) {
          r.pop();
          var s = r.length;
          s > 0 && ((o = (i = r[s - 1])[1]), (a = i[0]));
        } else {
          i[0] = a;
          var l = o[a];
          if (1 === l.type) {
            var u = t(l, n);
            void 0 !== u && (n = u);
          } else l.cssRules && l.cssRules.length > 0 && r.push([0, l.cssRules]);
        }
    return n;
  }
  function x(e, t) {
    for (
      var n = e.parentStyleSheet,
        r = e.parentRule,
        i = (r || n).cssRules,
        o = i.length - 1,
        a = 0;
      a <= o;
      a++
    )
      if (i[a] === e) {
        (r || n).deleteRule(a), (o = a);
        break;
      }
    if (null != t) {
      if (r) {
        var s = r.appendRule(t);
        return r.cssRules[s];
      }
      return n.insertRule(t, o), n.cssRules[o];
    }
  }
  function R(t, n) {
    if (t.href) return e(t.href, C), !1;
    for (var r = t.childNodes.length; r--; ) {
      var i = t.childNodes[r].nodeValue,
        o = T(i);
      o !== i && (t.childNodes[r].nodeValue = o);
    }
  }
  function C(e) {
    var t = document.createElement("style");
    (t.disabled = !0),
      (t.$$paintid = ++y),
      t.appendChild(document.createTextNode(T(e))),
      (document.head || document.createElement("head")).appendChild(t);
    var n,
      r = [];
    for (P(t.sheet, S, r); (n = r.pop()); ) x(n, null);
    w(), (t.disabled = !1);
  }
  function S(e, t) {
    u.test(e.cssText) || t.push(e);
  }
  function T(e) {
    return e.replace(
      /(;|,|\b)paint\s*\(\s*(['"]?)(.+?)\2\s*\)(;|,|!|\b)/,
      "$1url(data:image/paint-$3,=)$4"
    );
  }
  var k,
    E,
    O = [];
  function N(e) {
    !0 !== e.$$paintPending &&
      ((e.$$paintPending = !0), 1 === O.push(e) && f(I));
  }
  function I() {
    for (var e; (e = O.pop()); ) U(e);
  }
  function L(e, t, n) {
    for (
      var r = e.length,
        i = function() {
          --r || t.apply(null, n || l);
        },
        o = 0;
      o < e.length;
      o++
    ) {
      var a = new Image();
      (a.onload = i), (a.onerror = onerror), (a.src = e[o]);
    }
  }
  function V(e) {
    var n = e.$$paintId;
    return (
      null == n &&
        ((n = e.$$paintId = ++D),
        (function(e) {
          if (!0 === p) return;
          if (e.style.ownerElement === e) return;
          t(e.style, "ownerElement", { value: e });
        })(e)),
      n
    );
  }
  function j(e) {
    var t = e.$$paintRule,
      n = V(e);
    if (null == t) {
      e.hasAttribute("data-css-paint") || e.setAttribute("data-css-paint", n);
      var r = a.insertRule(
        '[data-css-paint="' + D + '"] {}',
        a.cssRules.length
      );
      t = e.$$paintRule = a.cssRules[r];
    }
    return t;
  }
  function A(e) {
    var t = e.cssText;
    if (t) return t;
    t = "";
    for (var n = 0, r = void 0; n < e.length; n++)
      0 !== n && (t += " "),
        (t += r = e[n]),
        (t += ":"),
        (t += e.getPropertyValue(r)),
        (t += ";");
    return t;
  }
  function U(e) {
    var t = getComputedStyle(e);
    if (e.$$paintObservedProperties)
      for (var n = 0; n < e.$$paintObservedProperties.length; n++) {
        var r = e.$$paintObservedProperties[n];
        if (t.getPropertyValue(r) !== e.$$paintedPropertyValues[r]) {
          M(e, t);
          break;
        }
      }
    else if (e.$$paintId || u.test(A(t))) return void M(e, t);
    e.$$paintPending = !1;
  }
  var z = {
      get: function(e) {
        return e in E ? E[e] : (E[e] = k.getPropertyValue(e));
      }
    },
    D = 0;
  function M(e, t) {
    o.disabled = !0;
    var n,
      r = (k = null == t ? getComputedStyle(e) : t);
    E = {};
    var a = [];
    e.$$paintPending = !1;
    for (
      var s = {
          width: parseFloat(z.get("width")),
          height: parseFloat(z.get("height"))
        },
        l = h(),
        u = e.$$paintedProperties,
        p = 0;
      p < r.length;
      p++
    ) {
      for (
        var v = r[p],
          f = z.get(v),
          m = /(,|\b|^)url\((['"]?)((?:-moz-element\(#|-webkit-canvas\()paint-\d+-([^;,]+)\)|(?:data:image\/paint-|blob:[^'"#]+#paint=)([^"';, ]+)[;,].*?)\2\)(,|\b|$)/g,
          y = "",
          b = 0,
          w = [],
          P = !1,
          x = !1,
          R = void 0,
          C = void 0;
        (C = m.exec(f));

      ) {
        !1 === x && (R = V(e)), (x = !0), (y += f.substring(0, C.index));
        var S = C[4] || C[5],
          T = C[3],
          O = g[S];
        O.Painter.inputProperties && a.push.apply(a, O.Painter.inputProperties);
        var N = O.Painter.contextOptions || {},
          I = $(O),
          A = !1 === N.scaling ? 1 : l;
        !0 === N.nativePixels && ((s.width *= l), (s.height *= l), (A = 1));
        var U = A * s.width,
          D = A * s.height,
          M = e.$$paintContext,
          F = "paint-" + R + "-" + S;
        if (M && M.canvas && M.canvas.width == U && M.canvas.height == D)
          M.clearRect(0, 0, U, D);
        else {
          if (!0 === c) M = document.getCSSCanvasContext("2d", F, U, D);
          else {
            var W = document.createElement("canvas");
            (W.id = F),
              (W.width = U),
              (W.height = D),
              !0 === d && ((W.style.display = "none"), i.appendChild(W)),
              (M = W.getContext("2d"));
          }
          (e.$$paintContext = M),
            (M.imageSmoothingEnabled = !1),
            1 !== A && M.scale(A, A);
        }
        if (
          (M.save(),
          M.beginPath(),
          I.paint(M, s, z),
          M.closePath(),
          M.restore(),
          "resetTransform" in M && M.resetTransform(),
          (y += C[1]),
          !0 === c)
        )
          (y += "-webkit-canvas(" + F + ")"), (P = null == C[4]);
        else if (!0 === d)
          (y += "-moz-element(#" + F + ")"), (P = null == C[4]);
        else {
          var G = M.canvas
            .toDataURL("image/png")
            .replace("/png", "/paint-" + S);
          if (
            ("function" == typeof MSBlobBuilder && (G = q(G, S)),
            w.push(G),
            (y += 'url("' + G + '")'),
            G !== T || !n)
          ) {
            var H = T ? T.indexOf("#") : -1;
            ~H && URL.revokeObjectURL(T.substring(0, H)), (P = !0);
          }
          T = G;
        }
        (y += C[6]), (b = C.index + C[0].length);
      }
      !1 !== x || null == u || null == u[v]
        ? ((y += f.substring(b)),
          P &&
            (n || (n = j(e)),
            null == u && (u = e.$$paintedProperties = {}),
            (u[v] = !0),
            0 === w.length ? B(n.style, v, y) : L(w, B, [n.style, v, y])))
        : (n || (n = j(e)), n.style.removeProperty(v));
    }
    e.$$paintObservedProperties = 0 === a.length ? null : a;
    for (var X = (e.$$paintedPropertyValues = {}), J = 0; J < a.length; J++) {
      var K = a[J];
      X[K] = z.get(K);
    }
    o.disabled = !1;
  }
  function q(e, t) {
    for (
      var n = atob(e.split(",")[1]), r = new Uint8Array(n.length), i = 0;
      i < n.length;
      i++
    )
      r[i] = n.charCodeAt(i);
    return URL.createObjectURL(new Blob([r])) + "#paint=" + t;
  }
  function B(e, t, n) {
    e.setProperty(t, n, "important");
  }
  var F = function() {
    v(w);
    var e = document.createElement("x-a");
    document.body.appendChild(e);
    var n = !1;
    new MutationObserver(function(e) {
      if (!0 !== n) {
        n = !0;
        for (var t = 0; t < e.length; t++) {
          var r = e[t];
          if (r.addedNodes)
            for (var i = r.addedNodes, o = 0; o < i.length; o++)
              1 === i[o].nodeType && N(i[o]);
          1 === r.target.nodeType && N(r.target);
        }
        n = !1;
      }
    }).observe(document.body, { childList: !0, attributes: !0, subtree: !0 }),
      (e.style.cssText = "color: red;"),
      setTimeout(function() {
        if (((p = "$$paintPending" in e), document.body.removeChild(e), !p)) {
          var n = Object.getOwnPropertyDescriptor(
              CSSStyleDeclaration.prototype,
              "cssText"
            ),
            r = n.set;
          (n.set = function(e) {
            return this.ownerElement && N(this.ownerElement), r.call(this, e);
          }),
            t(CSSStyleDeclaration.prototype, "cssText", n);
        }
      });
  };
  F.prototype.addModule = function(n) {
    var r = this;
    e(n, function(e) {
      var n = {
        registerPaint: function(e, t) {
          !(function(e, t, n) {
            g[e] = {
              worklet: n,
              Painter: t,
              properties: t.inputProperties
                ? [].slice.call(t.inputProperties)
                : [],
              bit: 0,
              instances: []
            };
          })(e, t, { context: n, realm: o });
        }
      };
      t(n, "devicePixelRatio", { get: h }), (n.self = n);
      var o = new function(e, t) {
        var n = document.createElement("iframe");
        (n.style.cssText =
          "position:absolute; left:0; top:-999px; width:1px; height:1px;"),
          t.appendChild(n);
        var r = n.contentWindow,
          i = r.document,
          o = "var window,$hook";
        for (var a in r) a in e || "eval" === a || ((o += ","), (o += a));
        for (var s in e) (o += ","), (o += s), (o += "=self."), (o += s);
        var l = i.createElement("script");
        l.appendChild(
          i.createTextNode(
            'function $hook(self,console) {"use strict";\n\t\t' +
              o +
              ";return function() {return eval(arguments[0])}}"
          )
        ),
          i.body.appendChild(l),
          (this.exec = r.$hook(e, console));
      }(n, i);
      (e = (r.transpile || String)(e)), o.exec(e);
    });
  };
})();
