/*!
 * VERSION: 0.4.0
 * DATE: 2016-07-09
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
/* eslint-disable */
var _gsScope =
  'undefined' != typeof module && module.exports && 'undefined' != typeof global
    ? global
    : this || window;
!(function(a) {
  'use strict';
  var b = a.GreenSockGlobals || a,
    c = function(a) {
      var c,
        d = a.split('.'),
        e = b;
      for (c = 0; c < d.length; c++) e[d[c]] = e = e[d[c]] || {};
      return e;
    },
    d = c('com.greensock.utils'),
    e = function(a) {
      var b = a.nodeType,
        c = '';
      if (1 === b || 9 === b || 11 === b) {
        if ('string' == typeof a.textContent) return a.textContent;
        for (a = a.firstChild; a; a = a.nextSibling) c += e(a);
      } else if (3 === b || 4 === b) return a.nodeValue;
      return c;
    },
    f = document,
    g = f.defaultView ? f.defaultView.getComputedStyle : function() {},
    h = /([A-Z])/g,
    i = function(a, b, c, d) {
      var e;
      return (
        (c = c || g(a, null))
          ? ((a = c.getPropertyValue(b.replace(h, '-$1').toLowerCase())),
            (e = a || c.length ? a : c[b]))
          : a.currentStyle && ((c = a.currentStyle), (e = c[b])),
        d ? e : parseInt(e, 10) || 0
      );
    },
    j = function(a) {
      return a.length &&
        a[0] &&
        ((a[0].nodeType && a[0].style && !a.nodeType) ||
          (a[0].length && a[0][0]))
        ? !0
        : !1;
    },
    k = function(a) {
      var b,
        c,
        d,
        e = [],
        f = a.length;
      for (b = 0; f > b; b++)
        if (((c = a[b]), j(c)))
          for (d = c.length, d = 0; d < c.length; d++) e.push(c[d]);
        else e.push(c);
      return e;
    },
    l = /(?:\r|\n|\s\s|\t\t)/g,
    m = ')eefec303079ad17405c',
    n = /(?:<br>|<br\/>|<br \/>)/gi,
    o = f.all && !f.addEventListener,
    p =
      " style='position:relative;display:inline-block;" +
      (o ? "*display:inline;*zoom:1;'" : "'"),
    q = function(a, b) {
      a = a || '';
      var c = -1 !== a.indexOf('++'),
        d = 1;
      return (
        c && (a = a.split('++').join('')),
        function() {
          return (
            '<' + b + p + (a ? " class='" + a + (c ? d++ : '') + "'>" : '>')
          );
        }
      );
    },
    r = (d.SplitText = b.SplitText = function(a, b) {
      if (('string' == typeof a && (a = r.selector(a)), !a))
        throw 'cannot split a null element.';
      (this.elements = j(a) ? k(a) : [a]),
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this._originals = []),
        (this.vars = b || {}),
        this.split(b);
    }),
    s = function(a, b, c) {
      var d = a.nodeType;
      if (1 === d || 9 === d || 11 === d)
        for (a = a.firstChild; a; a = a.nextSibling) s(a, b, c);
      else (3 === d || 4 === d) && (a.nodeValue = a.nodeValue.split(b).join(c));
    },
    t = function(a, b) {
      for (var c = b.length; --c > -1; ) a.push(b[c]);
    },
    u = function(a, b, c, d, h) {
      n.test(a.innerHTML) && (a.innerHTML = a.innerHTML.replace(n, m));
      var j,
        k,
        o,
        p,
        r,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D = e(a),
        E = b.span ? 'span' : 'div',
        F = b.type || b.split || 'chars,words,lines',
        G = -1 !== F.indexOf('lines') ? [] : null,
        H = -1 !== F.indexOf('words'),
        I = -1 !== F.indexOf('chars'),
        J = 'absolute' === b.position || b.absolute === !0,
        K = b.wordDelimiter || ' ',
        L = ' ' !== K ? '' : J ? '&#173; ' : ' ',
        M = -999,
        N = g(a),
        O = i(a, 'paddingLeft', N),
        P = i(a, 'borderBottomWidth', N) + i(a, 'borderTopWidth', N),
        Q = i(a, 'borderLeftWidth', N) + i(a, 'borderRightWidth', N),
        R = i(a, 'paddingTop', N) + i(a, 'paddingBottom', N),
        S = i(a, 'paddingLeft', N) + i(a, 'paddingRight', N),
        T = i(a, 'textAlign', N, !0),
        U = 0.2 * i(a, 'fontSize'),
        V = a.clientHeight,
        W = a.clientWidth,
        X = b.span ? '</span>' : '</div>',
        Y = q(b.wordsClass, E),
        Z = q(b.charsClass, E),
        $ = -1 !== (b.linesClass || '').indexOf('++'),
        _ = b.linesClass,
        aa = -1 !== D.indexOf('<'),
        ba = !0,
        ca = [],
        da = [],
        ea = [];
      for (
        !b.reduceWhiteSpace != !1 && (D = D.replace(l, '')),
          $ && (_ = _.split('++').join('')),
          aa && (D = D.split('<').join('{{LT}}')),
          j = D.length,
          p = Y(),
          r = 0;
        j > r;
        r++
      )
        if (((v = D.charAt(r)), ')' === v && D.substr(r, 20) === m))
          (p += (ba ? X : '') + '<BR/>'),
            (ba = !1),
            r !== j - 20 &&
              D.substr(r + 20, 20) !== m &&
              ((p += ' ' + Y()), (ba = !0)),
            (r += 19);
        else if (
          v === K &&
          D.charAt(r - 1) !== K &&
          r !== j - 1 &&
          D.substr(r - 20, 20) !== m
        ) {
          for (p += ba ? X : '', ba = !1; D.charAt(r + 1) === K; )
            (p += L), r++;
          (')' !== D.charAt(r + 1) || D.substr(r + 1, 20) !== m) &&
            ((p += L + Y()), (ba = !0));
        } else
          '{' === v && '{{LT}}' === D.substr(r, 6)
            ? ((p += I ? Z() + '{{LT}}</' + E + '>' : '{{LT}}'), (r += 5))
            : (p += I && ' ' !== v ? Z() + v + '</' + E + '>' : v);
      for (
        a.innerHTML = p + (ba ? X : ''),
          aa && s(a, '{{LT}}', '<'),
          u = a.getElementsByTagName('*'),
          j = u.length,
          w = [],
          r = 0;
        j > r;
        r++
      )
        w[r] = u[r];
      if (G || J)
        for (r = 0; j > r; r++)
          (x = w[r]),
            (o = x.parentNode === a),
            (o || J || (I && !H)) &&
              ((y = x.offsetTop),
              G &&
                o &&
                Math.abs(y - M) > U &&
                'BR' !== x.nodeName &&
                ((k = []), G.push(k), (M = y)),
              J &&
                ((x._x = x.offsetLeft),
                (x._y = y),
                (x._w = x.offsetWidth),
                (x._h = x.offsetHeight)),
              G &&
                ((H !== o && I) || (k.push(x), (x._x -= O)),
                o && r && (w[r - 1]._wordEnd = !0),
                'BR' === x.nodeName &&
                  x.nextSibling &&
                  'BR' === x.nextSibling.nodeName &&
                  G.push([])));
      for (r = 0; j > r; r++)
        (x = w[r]),
          (o = x.parentNode === a),
          'BR' !== x.nodeName
            ? (J &&
                ((A = x.style),
                H ||
                  o ||
                  ((x._x += x.parentNode._x), (x._y += x.parentNode._y)),
                (A.left = x._x + 'px'),
                (A.top = x._y + 'px'),
                (A.position = 'absolute'),
                (A.display = 'block'),
                (A.width = x._w + 1 + 'px'),
                (A.height = x._h + 'px')),
              H
                ? o && '' !== x.innerHTML
                  ? da.push(x)
                  : I && ca.push(x)
                : o
                ? (a.removeChild(x), w.splice(r--, 1), j--)
                : !o &&
                  I &&
                  ((y = !G && !J && x.nextSibling),
                  a.appendChild(x),
                  y || a.appendChild(f.createTextNode(' ')),
                  ca.push(x)))
            : G || J
            ? (a.removeChild(x), w.splice(r--, 1), j--)
            : H || a.appendChild(x);
      if (G) {
        for (
          J &&
            ((z = f.createElement(E)),
            a.appendChild(z),
            (B = z.offsetWidth + 'px'),
            (y = z.offsetParent === a ? 0 : a.offsetLeft),
            a.removeChild(z)),
            A = a.style.cssText,
            a.style.cssText = 'display:none;';
          a.firstChild;

        )
          a.removeChild(a.firstChild);
        for (C = ' ' === K && (!J || (!H && !I)), r = 0; r < G.length; r++) {
          for (
            k = G[r],
              z = f.createElement(E),
              z.style.cssText =
                'display:block;text-align:' +
                T +
                ';position:' +
                (J ? 'absolute;' : 'relative;'),
              _ && (z.className = _ + ($ ? r + 1 : '')),
              ea.push(z),
              j = k.length,
              u = 0;
            j > u;
            u++
          )
            'BR' !== k[u].nodeName &&
              ((x = k[u]),
              z.appendChild(x),
              C && (x._wordEnd || H) && z.appendChild(f.createTextNode(' ')),
              J &&
                (0 === u &&
                  ((z.style.top = x._y + 'px'), (z.style.left = O + y + 'px')),
                (x.style.top = '0px'),
                y && (x.style.left = x._x - y + 'px')));
          0 === j && (z.innerHTML = '&nbsp;'),
            H ||
              I ||
              (z.innerHTML = e(z)
                .split(String.fromCharCode(160))
                .join(' ')),
            J && ((z.style.width = B), (z.style.height = x._h + 'px')),
            a.appendChild(z);
        }
        a.style.cssText = A;
      }
      J &&
        (V > a.clientHeight &&
          ((a.style.height = V - R + 'px'),
          a.clientHeight < V && (a.style.height = V + P + 'px')),
        W > a.clientWidth &&
          ((a.style.width = W - S + 'px'),
          a.clientWidth < W && (a.style.width = W + Q + 'px'))),
        t(c, ca),
        t(d, da),
        t(h, ea);
    },
    v = r.prototype;
  (v.split = function(a) {
    this.isSplit && this.revert(),
      (this.vars = a || this.vars),
      (this._originals.length = this.chars.length = this.words.length = this.lines.length = 0);
    for (var b = this.elements.length; --b > -1; )
      (this._originals[b] = this.elements[b].innerHTML),
        u(this.elements[b], this.vars, this.chars, this.words, this.lines);
    return (
      this.chars.reverse(),
      this.words.reverse(),
      this.lines.reverse(),
      (this.isSplit = !0),
      this
    );
  }),
    (v.revert = function() {
      if (!this._originals) throw "revert() call wasn't scoped properly.";
      for (var a = this._originals.length; --a > -1; )
        this.elements[a].innerHTML = this._originals[a];
      return (
        (this.chars = []),
        (this.words = []),
        (this.lines = []),
        (this.isSplit = !1),
        this
      );
    }),
    (r.selector =
      a.$ ||
      a.jQuery ||
      function(b) {
        var c = a.$ || a.jQuery;
        return c
          ? ((r.selector = c), c(b))
          : 'undefined' == typeof document
          ? b
          : document.querySelectorAll
          ? document.querySelectorAll(b)
          : document.getElementById('#' === b.charAt(0) ? b.substr(1) : b);
      }),
    (r.version = '0.4.0');
})(_gsScope),
  (function(a) {
    'use strict';
    var b = function() {
      return (_gsScope.GreenSockGlobals || _gsScope)[a];
    };
    'function' == typeof define && define.amd
      ? define([], b)
      : 'undefined' != typeof module &&
        module.exports &&
        (module.exports = b());
  })('SplitText');
