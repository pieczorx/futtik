
    /*Want to help? We have a bug bounty program you can join at https://www.funcaptcha.com/whitehat/ or contact us at whitehat@funcaptcha.com*/
    X2LL.I4R = "split";
X2LL.i8P = "complete";
X2LL.V4R = "replace";
"length" = "length";
X2LL.e4R = ',';

function X2LL() {}
X2LL.Q4R = "get_html";
X2LL.C0P = "readyState";
X2LL.B4R = "refresh_session";
X2LL.r4R = "prototype";
X2LL.C4R = "querySelectorAll";
FunCaptcha[X2LL.r4R][X2LL.B4R] = function() {
    this[X2LL.Q4R]();
};
(function(r8R, B8R) {
    var X4R = "createStyleSheet";
    if (document[X2LL.C4R]) return;
    r8R = document, B8R = r8R[X4R]();
    r8R[X2LL.C4R] = function(Q8R, a8R, V8R, C8R, X8R) {
        var J4R = "removeRule";
        var h4R = "k";
        var q4R = "currentStyle";
        var i4R = 'k:v';
        var u4R = "addRule";
        var c4R = '[htmlFor';
        var a4R = "all";
        X8R = r8R[a4R], a8R = [], Q8R = Q8R[X2LL.V4R](/\[for\b/gi, c4R)[X2LL.I4R](X2LL.e4R);
        for (V8R = Q8R["length"]; V8R--;) {
            B8R[u4R](Q8R[V8R], i4R);
            for (C8R = X8R["length"]; C8R--;) X8R[C8R][q4R][h4R] && a8R.push(X8R[C8R]);
            B8R[J4R](0);
        }
        return a8R;
    };
}());

function FunCaptcha(w5R) {
    var U8P = "code";
    var e8P = "charAt";
    var I8P = "setup_callback";
    var y5P = "2d";
    var d5P = "getContext";
    var D5P = "canvas";
    var R5P = "charCodeAt";
    var E0P = "getElementsByTagName";
    var S0P = "type";
    var e0P = "parse";
    var N1P = "onSessionSetupResponse";
    var p1P = "body";
    var L1P = 'script';
    var T1P = "FunCaptcha: Error returned on server setup.";
    var s1P = "handleSetupSessionError";
    var G1P = "construct_bootstrap";
    var o1P = "LIMITED";
    var f1P = "error";
    var Y1P = "construct_html";
    var U1P = "token";
    var O1P = "f_true";
    var "fp_vals" = "fp_vals";
    var g1P = "join";
    var h1P = "value";
    var u1P = "hasOwnProperty";
    var X1P = "isFPValidForSuppress";
    var C1P = "canvasSupported";
    var Q1P = "createEvent";
    var r1P = "postMessage";
    var W2P = "forEach";
    var d2P = "passValues";
    var T2P = "getFP";
    var G2P = '';
    var o2P = ':';
    var f2P = "port";
    var Y2P = "hostname";
    var U2P = "//";
    var m2P = "protocol";
    var K2P = "origin";
    var l2P = "location";
    var w2P = "FunCaptcha: No public key has been set. You can get your public key at www.funcaptcha.com. Please add this to the 'funcaptcha' element as an attribute called 'data-pkey'.";
    var v2P = "log";
    var R2P = "data-pkey";
    var H2P = "getAttribute";
    var E2P = ".";
    var F2P = "#";
    var O2P = "querySelector";
    var A2P = "getElementById";
    var k2P = "remove";
    var S2P = "#FunCaptcha-Token";
    var g2P = "cleanup_html";
    var J2P = "bootstrapped";
    var M2P = "onshown";
    var h2P = "onsuppress";
    var i2P = "surl";
    var u2P = "target_html";
    var z2P = "query_data";
    var e2P = "script";
    var I2P = "exec";
    var c2P = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
    var V2P = "src";
    var a2P = 'script[src*=funcaptcha\\.com\\/fc\\/api]';
    var X2P = '=';
    var C2P = '&';
    var B2P = "get_query_data";
    var r2P = "find_onload";
    var j4R = "innerHTML";
    var b4R = true;
    var y4R = "appendChild";
    var D4R = "createElement";
    var P4R = "get_outer_html";
    var p4R = "Android";
    var t4R = "indexOf";
    var n4R = "slice";
    var x4R = "android_ver";
    var Z4R = /MSIE (.*?);/;
    var L4R = "match";
    var T4R = "userAgent";
    var s4R = "documentMode";
    var G4R = "msie";
    var o4R = "simulate_rate_limit";
    var Y4R = "is_bootstrapped";
    var m4R = "onload_retry";
    var K4R = "data";
    var l4R = "language";
    var w4R = "https://funcaptcha.com";
    var v4R = "fc_api_server";
    var R4R = "/fc/api/";
    var H4R = "api_target";
    var E4R = null;
    var F4R = "public_key";
    var O4R = "funcaptcha";
    var A4R = "target";
    var k4R = "loaded_callback";
    var S4R = "callback";
    var g4R = "";
    var d8R = 200;
    var x8R = 63;
    var R8R = 20;
    var E8R = 16;
    var o5R = g4R;
    var U5R;
    var K5R;
    var Y5R = this;
    this[S4R];
    this[k4R];
    this[A4R] = O4R;
    this[F4R] = E4R;
    this[H4R] = R4R;
    this[v4R] = w4R;
    this[l4R];
    this[K4R];
    this[m4R] = 0;
    this["fp_result"] = {};
    this[Y4R] = false;
    this[o4R] = false;
    this[G4R] = document[s4R];
    if (!this[G4R]) {
        var T5R = navigator[T4R][L4R](Z4R);
        if (T5R) this[G4R] = T5R[1];
    }
    try {
        this[x4R] = parseFloat(navigator[T4R][n4R](navigator[T4R][t4R](p4R) + 8));
    } catch (D5R) {}
    this[P4R] = function(d5R) {
        var N4R = "outerHTML";
        return d5R[N4R] || function(b5R) {
            var W4R = "cloneNode";
            var d4R = 'div';
            var y5R = document[D4R](d4R),
                W5R;
            y5R[y4R](b5R[W4R](b4R));
            W5R = y5R[j4R];
            y5R = E4R;
            return W5R;
        }(d5R);
    };
    this[r2P] = function() {
        fc_obj = this;
        try {
            window[o5R]();
        } catch (j5R) {
            var W8R = 500;
            fc_obj[m4R]++;
            if (fc_obj[m4R] < R8R) setTimeout(function() {
                fc_obj[r2P]();
            }, W8R);
        }
    };
    this[B2P] = function(X9R) {
        var Q2P = '?';
        var r9R = [],
            B9R;
        var C9R = X9R[n4R](X9R[t4R](Q2P) + 1)[X2LL.I4R](C2P);
        for (var Q9R = 0; Q9R < C9R["length"]; Q9R++) {
            B9R = C9R[Q9R][X2LL.I4R](X2P);
            r9R.push(B9R[0]);
            r9R[B9R[0]] = B9R[1];
        }
        return r9R;
    };
    var L5R = document[X2LL.C4R](a2P);
    if (L5R["length"] === 1) {
        var P5R = L5R[0][V2P];
        var x5R = c2P;
        var s5R = x5R[I2P](P5R)[0];
        if (s5R) this[v4R] = s5R;
    }
    if (!w5R) {
        var G5R = document[X2LL.C4R](e2P);
        for (var f5R = G5R["length"] - 1; f5R >= 0; f5R--)
            if (this[P4R](G5R[f5R])[t4R](this[H4R]) != -1) {
                this[z2P] = this[B2P](G5R[f5R][V2P]);
                if (this[z2P][F4R]) this[F4R] = this[z2P][F4R];
                if (this[z2P][u2P]) this[A4R] = this[z2P][u2P];
                if (this[z2P][l4R]) this[l4R] = this[z2P][l4R];
                if (this[z2P][i2P]) this[v4R] = this[z2P][i2P];
                if (this[z2P]["onload"]) o5R = this[z2P]["onload"];
                if (this[z2P][h2P]) U5R = this[z2P][h2P];
                if (this[z2P][M2P]) K5R = this[z2P][M2P];
                if (this[z2P][K4R]) this[K4R] = this[z2P][K4R];
                if (this[z2P][J2P]) this[Y4R] = b4R;
                if (this[z2P][o4R]) this[o4R] = b4R;
                if (this[z2P][g2P]) document[X2LL.C4R](S2P)[0][k2P]();
            }
        if (o5R) {
            this[r2P]();
            return;
        }
        var l5R = document[A2P](this[A4R]);
        if (!l5R && document[O2P]) {
            l5R = document[O2P](F2P + this[A4R]);
            if (!l5R) l5R = document[O2P](E2P + this[A4R]);
        }
        if (!l5R) return;
        if (!this[F4R]) this[F4R] = l5R[H2P](R2P);
    }
    if (!this[F4R])
        if (!w5R || !w5R[F4R]) {
            this[v2P](w2P);
            return;
        } else this[F4R] = w5R[F4R];
    if (w5R && w5R[u2P]) this[A4R] = w5R[u2P];
    if (w5R && w5R[l4R]) this[l4R] = w5R[l4R];
    if (w5R && w5R[i2P]) this[v4R] = w5R[i2P];
    if (w5R && w5R[K4R]) this[K4R] = w5R[K4R];
    if (w5R && w5R[h2P]) U5R = w5R[h2P];
    if (w5R && w5R[M2P]) K5R = w5R[M2P];
    if (!window[l2P][K2P]) window[l2P][K2P] = window[l2P][m2P] + U2P + window[l2P][Y2P] + (window[l2P][f2P] ? o2P + window[l2P][f2P] : G2P);
    var n5R = window[l2P][K2P];
    var t5R = navigator[T4R];
    var N5R = "js";
    this[X2LL.Q4R] = function() {
        var c0P = "application/x-www-form-urlencoded; charset=UTF-8";
        var V0P = "Content-Type";
        var a0P = "setRequestHeader";
        var B0P = "XMLHttpRequest";
        var r0P = "send";
        var j1P = "POST";
        var b1P = "open";
        var W1P = "ontimeout";
        var y1P = "timeout";
        var d1P = "onprogress";
        var D1P = "onerror";
        var P1P = "XDomainRequest";
        var t1P = "?callback=fcJSONPCallback&";
        var n1P = "/fc/gt2/public_key/";
        var x1P = 'src';
        var Z1P = "setAttribute";
        var m1P = "fcJSONPCallback";
        var K1P = "]";
        var l1P = "data[";
        var w1P = "random";
        var J1P = '::';
        var M1P = 'P';
        var q1P = 'CFP';
        var i1P = "key";
        var z1P = "vals";
        var V1P = "fc_nosuppress=1";
        var a1P = "href";
        var N2P = "userbrowser";
        var P2P = "site";
        var p2P = "public_key/";
        var t2P = 'bootstrapped/';
        var n2P = "/fc/gt2/";
        var x2P = "https://roblox-api.funcaptcha.com";
        var Z2P = "63E4117F-E727-42B4-6DAA-C8448E9B137F";
        var L2P = "9F35E182-C93C-EBCC-A31D-CF8ED317B996";
        var j8R = 10000;
        var a9R = this;
        this[T2P]();
        if (a9R[F4R] == L2P || a9R[F4R] == Z2P) a9R[v4R] = x2P;
        var O9R = a9R[v4R] + n2P + (this[Y4R] ? t2P : G2P) + p2P + a9R[F4R];
        var e9R = {};
        var I9R = [{
            key: F4R,
            value: a9R[F4R]
        }, {
            key: P2P,
            value: n5R
        }, {
            key: N2P,
            value: t5R
        }, {
            key: o4R,
            value: !this[Y4R] && this[o4R] ? 1 : 0
        }];

        //torobie 222
        var u9R = [{
            key: "api_type",
            value: "js"
        }];

        if (a9R[l4R]) I9R.push({
            key: l4R,
            value: a9R[l4R]
        });
        if (a9R[d2P]) Object["keys"](a9R[d2P])[W2P](function(E9R) {
            I9R.push({
                key: E9R,
                value: a9R[d2P][E9R]
            });
        });
        if (typeof FunCaptchaBootstrap != "undefined")
            for (var A9R in FunCaptchaBootstrap) I9R.push({
                key: A9R,
                value: FunCaptchaBootstrap[A9R]
            });
        if (window["JSON"]) {
            if (window[r1P] && "function" === typeof document[Q1P] && this[C1P]() && !(a9R[G4R] < 9) && !(a9R[x4R] < 3) && this[X1P]() && window[l2P][a1P][t4R](V1P) == -1) u9R.push({
                key: "p",
                value: 1
            });
            if (this["fp_result"]["fp"]["fp"]) {
                u9R.push({
                    key: "f",
                    value: this["fp_result"]["fp"]["fp"]
                });
                var i9R = [];
                for (var z9R in this["fp_result"]["fp"][z1P]) {
                    if (!this["fp_result"]["fp"][z1P][u1P](z9R)) continue;
                    var c9R = this["fp_result"]["fp"][z1P][z9R];
                    switch (c9R[i1P]) {
                        case q1P:
                            i9R.push(c9R[i1P] + o2P + p5R(c9R[h1P]));
                            break;
                        case M1P:
                            var M9R = [];
                            for (var J9R in c9R[h1P]) {
                                if (!c9R[h1P][u1P](J9R)) continue;
                                var g9R = c9R[h1P][J9R];
                                g9R && M9R.push(g9R[X2LL.I4R](J1P)[0]);
                            }
                            i9R.push(c9R[i1P] + o2P + M9R[g1P](X2LL.e4R));
                            break;
                        default:
                            i9R.push(c9R[i1P] + o2P + c9R[h1P]);
                            break;
                    }
                }
                u9R.push({
                    key: "fe",
                    value: i9R
                });
            }

            if (this[C1P]()) {
              u9R.push({
                  key: "cs",
                  value: 1
              });
            }

            if (this["fp_result"]["fp_vals"][O1P]) {
              u9R.push({
                  key: "fb",
                  value: 1
              });
            }

            var F9R = JSON.stringify(u9R);
            e9R.bda = m5R.encode(F9R);
        } else if (this["fp_result"]["fp"]["fp"]) I9R.push({
            key: "f",
            value: this["fp_result"]["fp"]["fp"]
        });
        I9R.push({
            key: "rnd",
            value: Math[w1P]()
        });
        for (var k9R in I9R) e9R[I9R[k9R][i1P]] = I9R[k9R][h1P];
        if (a9R[K4R])
            if (a9R[K4R] === Object(a9R[K4R]))
                for (var z9R in a9R[K4R]) {
                    if (!a9R[K4R][u1P](z9R)) continue;
                    e9R[l1P + z9R + K1P] = a9R[K4R][z9R];
                } else e9R[K4R] = a9R[K4R];
        var q9R = [];
        for (var h9R in e9R) {
            if (!e9R[u1P](h9R)) continue;
            q9R.push(h9R + X2P + encodeURIComponent(e9R[h9R]));
        }
        try {
            if (this[G4R] && this[G4R] <= 7) {
                window[m1P] = function(H9R) {
                    if (H9R && H9R[U1P]) a9R[Y1P](H9R);
                    else if (H9R[f1P] && H9R[f1P] === o1P) this[G1P](H9R);
                    else {
                        this[s1P](H9R);
                        a9R[v2P](T1P);
                    }
                };
                var S9R = document[D4R](L1P);
                S9R[Z1P](x1P, a9R[v4R] + n1P + a9R[F4R] + t1P + q9R[g1P](C2P));
                document[p1P][y4R](S9R);
                return;
            }
        } catch (R9R) {}
        if (this[G4R] && this[G4R] <= 9 && window[P1P]) {
            var V9R = new XDomainRequest();
            V9R["onload"] = function() {
                a9R[N1P](V9R);
            };
            V9R[D1P] = function() {};
            V9R[d1P] = function() {};
            V9R[y1P] = j8R;
            V9R[W1P] = function() {};
            V9R[b1P](j1P, O9R);
            V9R[r0P](q9R[g1P](C2P));
            return;
        }
        var V9R;
        if (window[B0P]) V9R = new XMLHttpRequest();
        V9R["onreadystatechange"] = function() {
            var X0P = "status";
            if (this[X2LL.C0P] == 4 && this[X0P] == d8R) a9R[N1P](V9R);
        };
        V9R[b1P](j1P, O9R, b4R);
        V9R[a0P](V0P, c0P);
        V9R[r0P](q9R[g1P](C2P));
    };
    this[N1P] = function(l9R) {
        var I0P = "responseText";
        var w9R = l9R[I0P];
        var v9R = JSON[e0P](w9R);
        if (v9R)
            if (v9R[U1P]) this[Y1P](v9R);
            else if (v9R[f1P] && v9R[f1P] === o1P) this[G1P](v9R);
        else this[s1P](v9R);
        else this[s1P](w9R);
    };
    this[s1P] = function(m9R, K9R) {
        this[v2P](T1P);
        throw K9R;
    };
    this[G1P] = function(f9R) {
        var q0P = "bootstrap";
        var i0P = '" frameborder="0" scrolling="no" style="width: 308px; height:408px; border-style: none;"> </iframe> <div style="width: 306px;height: 60px;border-style: none;bottom: 12px;left: 25px;margin: 5px 0 0 0;padding: 0px;right: 25px;background: #ffffff;border: 1px solid #f7f7f7;border-radius: 5px;"> <input type="text" id="fc-token" name="fc-token" placeholder="Copy verification code into here" style="width: 270px;height: 24px;border: 1px solid #f7f7f7;border-radius: 5px;padding: 10px;margin: 7px;resize: none;font-size: 11px;-webkit-font-smoothing: antialiased;color: #212121;background: #f7f7f7;text-align: center;"></div>';
        var u0P = "bootstrap_uri";
        var z0P = '<iframe src="';
        if (msie) {
            var o9R = z0P + f9R[u0P] + i0P;
            var U9R = document[A2P](this[A4R]);
            if (!U9R && document[O2P]) {
                var U9R = document[O2P](F2P + this[A4R]);
                if (!U9R) U9R = document[O2P](E2P + this[A4R]);
            }
            if (U9R) U9R[j4R] = o9R;
        } else {
            var Y9R = document[D4R](L1P);
            Y9R[j4R] = f9R[q0P];
            document[p1P][y4R](Y9R);
        }
    };
    this[Y1P] = function(T9R) {
        var R0P = "insertBefore";
        var H0P = "parentNode";
        var F0P = "challenge_url";
        var O0P = "challenge_url_cdn";
        var A0P = "async";
        var k0P = 'text/javascript';
        var g0P = "fc-script";
        var J0P = "id";
        var M0P = "'>";
        var h0P = "<div id='FunCaptcha'></div><input type='hidden' id='FunCaptcha-Token' name='fc-token' value='";
        var Z9R = this;
        var x9R = h0P + T9R[U1P] + M0P;
        var G9R = document[A2P](this[A4R]);
        if (!G9R && document[O2P]) {
            var G9R = document[O2P](F2P + this[A4R]);
            if (!G9R) G9R = document[O2P](E2P + this[A4R]);
        }
        if (!G9R) return false;
        G9R[j4R] = x9R;
        var s9R = document[D4R](L1P);
        s9R[J0P] = g0P;
        s9R[S0P] = k0P;
        s9R[A0P] = b4R;
        s9R[V2P] = T9R[O0P] ? T9R[O0P] : Z9R[v4R] + T9R[F0P];
        var L9R = document[E0P](L1P)[0];
        L9R[H0P][R0P](s9R, L9R);
    };
    this[T2P] = function() {
        var K0P = "getScreen";
        var l0P = "hasFakeResolution";
        var w0P = "hasFakeOS";
        var v0P = "hasFakeBrowser";
        if (!this["fp_result"]["fp"]) {
            var n9R = new t9R();
            this["fp_result"]["fp"] = n9R[T2P]();
            this["fp_result"]["fp_vals"] = {
                f_true: n9R[v0P]() || n9R[w0P]() || n9R[l0P]() ? b4R : n9R[K0P]() ? false : b4R
            };
        }

        function t9R() {
            var d6P = "x64Fmix";
            var D6P = "x64Xor";
            var N6P = "x64LeftShift";
            var P6P = "x64Rotl";
            var p6P = "x64Multiply";
            var t6P = 0xffff;
            var n6P = "x64Add";
            var V6P = "map";
            var a6P = "call";
            var C6P = "sortPlugins";
            var W7P = "isIE";
            var q3P = "toString";
            var j9P = "plugins";
            var d9P = "msMaxTouchPoints";
            var D9P = "maxTouchPoints";
            var N9P = "ontouchstart";
            var P9P = "Other";
            var m9P = "toLowerCase";
            var K9P = "~";
            var W5P = "style";
            var N5P = "platform";
            var T5P = "availHeight";
            var s5P = "availWidth";
            var G5P = "width";
            var o5P = "height";
            var l5P = "unknown";
            var H5P = "hash";
            var F5P = "x64hash128";
            var A5P = "each";
            var k5P = "hasSwfObj";
            var g5P = "getHardwareConcrun";
            var M5P = "getTouch";
            var q5P = "getPluginsKey";
            var u5P = "getJSFonts";
            var V5P = "canvasFP";
            var X5P = "getPlatformKey";
            var Q5P = "getCPUClass";
            var r5P = "getOpenDB";
            var b0P = "getBehaviour";
            var y0P = "getIndexedDB";
            var D0P = "getLocalStorage";
            var P0P = "getSessionStorage";
            var t0P = "getTimeOffset";
            var x0P = "getAvailableScreen";
            var T0P = "getPixelRatio";
            var G0P = "getDepth";
            var f0P = "getLANG";
            var U0P = "getDNT";
            var n8R = 64;
            var U8R = 33;
            var m8R = 32;
            var K8R = 31;
            var F8R = 15;
            var g8R = 10;
            this[T2P] = function() {
                var E5P = "~~~";
                var S5P = "SWF";
                var J5P = "H";
                var h5P = "T";
                var i5P = "P";
                var z5P = "JSF";
                var e5P = "FB";
                var I5P = "FOS";
                var c5P = "FR";
                var a5P = "CFP";
                var C5P = "PK";
                var B5P = "CPUC";
                var j0P = "ODB";
                var W0P = "B";
                var d0P = "IDB";
                var N0P = "LS";
                var p0P = "SS";
                var n0P = "TO";
                var Z0P = "AS";
                var L0P = "S";
                var s0P = "PR";
                var o0P = "D";
                var Y0P = "L";
                var m0P = "DNT";
                var p9R = [];
                p9R.push({
                    key: m0P,
                    value: this[U0P]()
                });
                p9R.push({
                    key: Y0P,
                    value: this[f0P]()
                });
                p9R.push({
                    key: o0P,
                    value: this[G0P]()
                });
                p9R.push({
                    key: s0P,
                    value: this[T0P]()
                });
                p9R.push({
                    key: L0P,
                    value: this[K0P]()
                });
                p9R.push({
                    key: Z0P,
                    value: this[x0P]()
                });
                p9R.push({
                    key: n0P,
                    value: this[t0P]()
                });
                p9R.push({
                    key: p0P,
                    value: this[P0P]()
                });
                p9R.push({
                    key: N0P,
                    value: this[D0P]()
                });
                p9R.push({
                    key: d0P,
                    value: this[y0P]()
                });
                p9R.push({
                    key: W0P,
                    value: this[b0P]()
                });
                p9R.push({
                    key: j0P,
                    value: this[r5P]()
                });
                p9R.push({
                    key: B5P,
                    value: this[Q5P]()
                });
                p9R.push({
                    key: C5P,
                    value: this[X5P]()
                });
                p9R.push({
                    key: a5P,
                    value: this[V5P]()
                });
                p9R.push({
                    key: c5P,
                    value: this[l0P]()
                });
                p9R.push({
                    key: I5P,
                    value: this[w0P]()
                });
                p9R.push({
                    key: e5P,
                    value: this[v0P]()
                });
                p9R.push({
                    key: z5P,
                    value: this[u5P]()
                });
                p9R.push({
                    key: i5P,
                    value: this[q5P]()
                });
                p9R.push({
                    key: h5P,
                    value: this[M5P]()
                });
                p9R.push({
                    key: J5P,
                    value: this[g5P]()
                });
                p9R.push({
                    key: S5P,
                    value: this[k5P]()
                });
                var P9R = [];
                this[A5P](p9R, function(D9R) {
                    var O5P = ";";
                    var d9R = D9R[h1P];
                    if (typeof D9R[h1P][g1P] !== "undefined") d9R = D9R[h1P][g1P](O5P);
                    P9R.push(d9R);
                });
                var N9R = this[F5P](P9R[g1P](E5P), K8R);
                return {
                    "fp": N9R,
                    "vals": p9R
                };
            };
            this[H5P] = function() {
                var y9R = 0,
                    W9R, b9R;
                if (this["length"] === 0) return y9R;
                for (W9R = 0; W9R < this["length"]; W9R++) {
                    b9R = this[R5P](W9R);
                    y9R = (y9R << 5) - y9R + b9R;
                    y9R |= 0;
                }
                return y9R;
            };
            this[U0P] = function() {
                var w5P = "msDoNotTrack";
                var v5P = "doNotTrack";
                if (navigator[v5P]) return navigator[v5P];
                else if (navigator[w5P]) return navigator[w5P];
                else if (window[v5P]) return window[v5P];
                else return l5P;
            };
            this[f0P] = function() {
                var U5P = "systemLanguage";
                var m5P = "browserLanguage";
                var K5P = "userLanguage";
                return navigator[l4R] || navigator[K5P] || navigator[m5P] || navigator[U5P] || g4R;
            };
            this[G0P] = function() {
                var Y5P = "colorDepth";
                return screen[Y5P] || -1;
            };
            this[T0P] = function() {
                var f5P = "devicePixelRatio";
                return window[f5P] || g4R;
            };
            this[K0P] = function() {
                var j9R = screen[o5P] > screen[G5P] ? [screen[o5P], screen[G5P]] : [screen[G5P], screen[o5P]];
                if (typeof j9R !== "undefined") return j9R;
                return false;
            };
            this[x0P] = function() {
                var r3R;
                if (screen[s5P] && screen[T5P]) r3R = screen[T5P] > screen[s5P] ? [screen[T5P], screen[s5P]] : [screen[s5P], screen[T5P]];
                if (typeof r3R !== "undefined") return r3R;
                return false;
            };
            this[t0P] = function() {
                var L5P = "getTimezoneOffset";
                return new Date()[L5P]();
            };
            this[P0P] = function() {
                var Z5P = "sessionStorage";
                try {
                    return !!window[Z5P];
                } catch (B3R) {
                    return b4R;
                }
            };
            this[D0P] = function() {
                var x5P = "localStorage";
                try {
                    return !!window[x5P];
                } catch (Q3R) {
                    return b4R;
                }
            };
            this[y0P] = function() {
                var n5P = "indexedDB";
                try {
                    return !!window[n5P];
                } catch (C3R) {
                    return b4R;
                }
            };
            this[b0P] = function() {
                var t5P = "addBehavior";
                if (document[p1P] && document[p1P][t5P]) return b4R;
                else return false;
            };
            this[r5P] = function() {
                var p5P = "openDatabase";
                return window[p5P] ? b4R : false;
            };
            this[Q5P] = function() {
                var P5P = "cpuClass";
                if (navigator[P5P]) return navigator[P5P];
                else return l5P;
            };
            this[X5P] = function() {
                if (navigator[N5P]) return navigator[N5P];
                else return l5P;
            };
            this[C1P] = function() {
                var X3R = document[D4R](D5P);
                return !!(X3R[d5P] && X3R[d5P](y5P));
            };
            this[V5P] = function() {
                var l9P = "toDataURL";
                var w9P = "canvas fp:";
                var v9P = "rgb(255,255,0)";
                var R9P = "rgb(0,255,255)";
                var H9P = "fill";
                var E9P = "closePath";
                var F9P = "PI";
                var O9P = "arc";
                var A9P = "beginPath";
                var k9P = "rgb(255,0,255)";
                var S9P = "multiply";
                var g9P = "globalCompositeOperation";
                var J9P = "18pt Arial";
                var M9P = "rgba(102, 204, 0, 0.2)";
                var h9P = "Cwm fjordbank glyphs vext quiz, \ud83d\ude03";
                var q9P = "fillText";
                var i9P = "11pt no-real-font-123";
                var u9P = "font";
                var z9P = "#069";
                var e9P = "fillRect";
                var I9P = "#f60";
                var c9P = "fillStyle";
                var V9P = "alphabetic";
                var a9P = "textBaseline";
                var X9P = "canvas winding:no";
                var C9P = "canvas winding:yes";
                var Q9P = "evenodd";
                var B9P = "isPointInPath";
                var r9P = "rect";
                var j5P = "inline";
                var b5P = "display";
                var b8R = 2000;
                var P8R = 125;
                var p8R = 100;
                var t8R = 75;
                var Z8R = 62;
                var T8R = 50;
                var G8R = 45;
                var w8R = 25;
                if (this[C1P]()) {
                    var c3R = [];
                    var V3R = document[D4R](D5P);
                    V3R[G5P] = b8R;
                    V3R[o5P] = d8R;
                    V3R[W5P][b5P] = j5P;
                    var a3R = V3R[d5P](y5P);
                    a3R[r9P](0, 0, g8R, g8R);
                    a3R[r9P](2, 2, 6, 6);
                    c3R.push(a3R[B9P](5, 5, Q9P) === false ? C9P : X9P);
                    a3R[a9P] = V9P;
                    a3R[c9P] = I9P;
                    a3R[e9P](P8R, 1, Z8R, R8R);
                    a3R[c9P] = z9P;
                    a3R[u9P] = i9P;
                    a3R[q9P](h9P, 2, F8R);
                    a3R[c9P] = M9P;
                    a3R[u9P] = J9P;
                    a3R[q9P](h9P, 4, G8R);
                    a3R[g9P] = S9P;
                    a3R[c9P] = k9P;
                    a3R[A9P]();
                    a3R[O9P](T8R, T8R, T8R, 0, Math[F9P] * 2, b4R);
                    a3R[E9P]();
                    a3R[H9P]();
                    a3R[c9P] = R9P;
                    a3R[A9P]();
                    a3R[O9P](p8R, T8R, T8R, 0, Math[F9P] * 2, b4R);
                    a3R[E9P]();
                    a3R[H9P]();
                    a3R[c9P] = v9P;
                    a3R[A9P]();
                    a3R[O9P](t8R, p8R, T8R, 0, Math[F9P] * 2, b4R);
                    a3R[E9P]();
                    a3R[H9P]();
                    a3R[c9P] = k9P;
                    a3R[O9P](t8R, t8R, t8R, 0, Math[F9P] * 2, b4R);
                    a3R[O9P](t8R, t8R, w8R, 0, Math[F9P] * 2, b4R);
                    a3R[H9P](Q9P);
                    c3R.push(w9P + V3R[l9P]());
                    return c3R[g1P](K9P);
                } else return false;
            };
            this[l0P] = function() {
                if (screen[G5P] < screen[s5P]) return b4R;
                if (screen[o5P] < screen[T5P]) return b4R;
                return false;
            };
            this[w0P] = function() {
                var b9P = "ipod";
                var W9P = "pike";
                var y9P = "other";
                var p9P = "Mac";
                var t9P = "mac";
                var n9P = "iOS";
                var x9P = "ipad";
                var Z9P = "iphone";
                var L9P = "Linux";
                var T9P = "linux";
                var s9P = "android";
                var G9P = "Windows";
                var o9P = "win";
                var f9P = "Windows Phone";
                var Y9P = "windows phone";
                var U9P = "oscpu";
                var u3R = navigator[T4R][m9P]();
                var z3R = navigator[U9P];
                var e3R = navigator[N5P][m9P]();
                var I3R;
                if (u3R[t4R](Y9P) >= 0) I3R = f9P;
                else if (u3R[t4R](o9P) >= 0) I3R = G9P;
                else if (u3R[t4R](s9P) >= 0) I3R = p4R;
                else if (u3R[t4R](T9P) >= 0) I3R = L9P;
                else if (u3R[t4R](Z9P) >= 0 || u3R[t4R](x9P) >= 0) I3R = n9P;
                else if (u3R[t4R](t9P) >= 0) I3R = p9P;
                else I3R = P9P;
                var i3R;
                if (N9P in window || navigator[D9P] > 0 || navigator[d9P] > 0) i3R = b4R;
                else i3R = false;
                if (i3R && I3R !== f9P && I3R !== p4R && I3R !== n9P && I3R !== P9P && I3R !== G9P) return b4R;
                if (typeof z3R !== "undefined") {
                    z3R = z3R[m9P]();
                    if (z3R[t4R](o9P) >= 0 && I3R !== G9P && I3R !== f9P) return b4R;
                    if (z3R[t4R](T9P) >= 0 && I3R !== L9P && I3R !== p4R) return b4R;
                    if (z3R[t4R](t9P) >= 0 && I3R !== p9P && I3R !== n9P) return b4R;
                    if (z3R[t4R](o9P) === 0 && z3R[t4R](T9P) === 0 && z3R[t4R](t9P) >= 0 && I3R !== y9P) return b4R;
                }
                if (e3R[t4R](o9P) >= 0 && I3R !== G9P && I3R !== f9P) return b4R;
                if ((e3R[t4R](T9P) >= 0 || e3R[t4R](s9P) >= 0 || e3R[t4R](W9P) >= 0) && I3R !== L9P && I3R !== p4R) return b4R;
                if ((e3R[t4R](t9P) >= 0 || e3R[t4R](x9P) >= 0 || e3R[t4R](b9P) >= 0 || e3R[t4R](Z9P) >= 0) && I3R !== p9P && I3R !== n9P) return b4R;
                if (e3R[t4R](o9P) === 0 && e3R[t4R](T9P) === 0 && e3R[t4R](t9P) >= 0 && I3R !== y9P) return b4R;
                if (typeof navigator[j9P] === "undefined" && I3R !== G9P && I3R !== f9P) return b4R;
                return false;
            };
            this[v0P] = function() {
                var h3P = "a";
                var i3P = "20030107";
                var u3P = "Internet Explorer";
                var z3P = "trident";
                var e3P = "Safari";
                var I3P = "safari";
                var c3P = "Chrome";
                var V3P = "chrome";
                var a3P = "Opera";
                var X3P = "opr";
                var C3P = "opera";
                var Q3P = "Firefox";
                var B3P = "firefox";
                var r3P = "productSub";
                var f8R = 39;
                var Y8R = 37;
                var h3R = navigator[T4R][m9P]();
                var g3R = navigator[r3P];
                var q3R;
                if (h3R[t4R](B3P) >= 0) q3R = Q3P;
                else if (h3R[t4R](C3P) >= 0 || h3R[t4R](X3P) >= 0) q3R = a3P;
                else if (h3R[t4R](V3P) >= 0) q3R = c3P;
                else if (h3R[t4R](I3P) >= 0) q3R = e3P;
                else if (h3R[t4R](z3P) >= 0) q3R = u3P;
                else q3R = P9P;
                if ((q3R === c3P || q3R === e3P || q3R === a3P) && g3R !== i3P) return b4R;
                var M3R = eval[q3P]()["length"];
                if (M3R === Y8R && q3R !== e3P && q3R !== Q3P && q3R !== P9P) return b4R;
                if (M3R === f8R && q3R !== u3P && q3R !== P9P) return b4R;
                if (M3R === U8R && q3R !== c3P && q3R !== a3P && q3R !== P9P) return b4R;
                var J3R;
                try {
                    throw h3P;
                } catch (S3R) {
                    var M3P = "toSource";
                    try {
                        S3R[M3P]();
                        J3R = b4R;
                    } catch (k3R) {
                        J3R = false;
                    }
                }
                if (J3R && q3R !== Q3P && q3R !== P9P) return b4R;
                return false;
            };
            this[u5P] = function(n3R) {
                var y7P = "removeChild";
                var d7P = "offsetHeight";
                var D7P = "offsetWidth";
                var p7P = "fontFamily";
                var o7P = "div";
                var f7P = "72px";
                var Y7P = "mmmmmmmmmmlli";
                var U7P = "Wingdings 3";
                var m7P = "Wingdings 2";
                var K7P = "Wingdings";
                var l7P = "Verdana";
                var w7P = "Trebuchet MS";
                var v7P = "Times New Roman PS";
                var R7P = "Times New Roman";
                var H7P = "Times";
                var E7P = "Tahoma";
                var F7P = "Segoe UI Symbol";
                var O7P = "Segoe UI Semibold";
                var A7P = "Segoe UI Light";
                var k7P = "Segoe UI";
                var S7P = "Segoe Script";
                var g7P = "Segoe Print";
                var J7P = "Palatino Linotype";
                var M7P = "Palatino";
                var h7P = "MYRIAD PRO";
                var q7P = "MYRIAD";
                var i7P = "MS Serif";
                var u7P = "MS Sans Serif";
                var z7P = "MS Reference Sans Serif";
                var e7P = "MS PGothic";
                var I7P = "MS Outlook";
                var c7P = "MS Gothic";
                var V7P = "Monotype Corsiva";
                var a7P = "Monaco";
                var X7P = "Microsoft Sans Serif";
                var C7P = "Lucida Sans Unicode";
                var Q7P = "Lucida Sans Typewriter";
                var B7P = "Lucida Sans";
                var r7P = "Lucida Handwriting";
                var j3P = "LUCIDA GRANDE";
                var b3P = "Lucida Fax";
                var W3P = "Lucida Console";
                var y3P = "Lucida Calligraphy";
                var d3P = "Lucida Bright";
                var D3P = "Impact";
                var N3P = "Helvetica Neue";
                var P3P = "Helvetica";
                var p3P = "Georgia";
                var t3P = "Geneva";
                var n3P = "Garamond";
                var x3P = "Courier New";
                var Z3P = "Courier";
                var L3P = "Consolas";
                var T3P = "Comic Sans MS";
                var s3P = "Comic Sans";
                var G3P = "Century Schoolbook";
                var o3P = "Century Gothic";
                var f3P = "Century";
                var Y3P = "Cambria Math";
                var U3P = "Cambria";
                var m3P = "Calibri";
                var K3P = "Bookman Old Style";
                var l3P = "Book Antiqua";
                var w3P = "Bitstream Vera Sans Mono";
                var v3P = "Arial Unicode MS";
                var R3P = "Arial Rounded MT Bold";
                var H3P = "Arial Narrow";
                var E3P = "Arial MT";
                var F3P = "Arial Hebrew";
                var O3P = "Arial Black";
                var A3P = "Arial";
                var k3P = "Andale Mono";
                var S3P = "serif";
                var g3P = "sans-serif";
                var J3P = "monospace";
                var A3R = [J3P, g3P, S3P];
                var O3R = [k3P, A3P, O3P, F3P, E3P, H3P, R3P, v3P, w3P, l3P, K3P, m3P, U3P, Y3P, f3P, o3P, G3P, s3P, T3P, L3P, Z3P, x3P, n3P, t3P, p3P, P3P, N3P, D3P, d3P, y3P, W3P, b3P, j3P, r7P, B7P, Q7P, C7P, X7P, a7P, V7P, c7P, I7P, e7P, z7P, u7P, i7P, q7P, h7P, M7P, J7P, g7P, S7P, k7P, A7P, O7P, F7P, E7P, H7P, R7P, v7P, w7P, l7P, K7P, m7P, U7P];
                var T3R = Y7P;
                var x3R = f7P;
                if (!document[E0P](p1P)[0]) return false;
                var E3R = document[E0P](p1P)[0];
                var R3R = document[D4R](o7P);
                var v3R = document[D4R](o7P);
                var w3R = {};
                var m3R = {};
                var l3R = function() {
                    var t7P = "normal";
                    var n7P = "lineHeight";
                    var x7P = "fontSize";
                    var Z7P = "-9999px";
                    var L7P = "left";
                    var T7P = "absolute";
                    var s7P = "position";
                    var G7P = "span";
                    var t3R = document[D4R](G7P);
                    t3R[W5P][s7P] = T7P;
                    t3R[W5P][L7P] = Z7P;
                    t3R[W5P][x7P] = x3R;
                    t3R[W5P][n7P] = t7P;
                    t3R[j4R] = T3R;
                    return t3R;
                };
                var Y3R = function(P3R, N3R) {
                    var N7P = "',";
                    var P7P = "'";
                    var p3R = l3R();
                    p3R[W5P][p7P] = P7P + P3R + N7P + N3R;
                    return p3R;
                };
                var f3R = function() {
                    var y3R = [];
                    for (var D3R = 0, W3R = A3R["length"]; D3R < W3R; D3R++) {
                        var d3R = l3R();
                        d3R[W5P][p7P] = A3R[D3R];
                        R3R[y4R](d3R);
                        y3R.push(d3R);
                    }
                    return y3R;
                };
                var o3R = function() {
                    var r7R = {};
                    for (var b3R = 0, C7R = O3R["length"]; b3R < C7R; b3R++) {
                        var B7R = [];
                        for (var j3R = 0, X7R = A3R["length"]; j3R < X7R; j3R++) {
                            var Q7R = Y3R(O3R[b3R], A3R[j3R]);
                            v3R[y4R](Q7R);
                            B7R.push(Q7R);
                        }
                        r7R[O3R[b3R]] = B7R;
                    }
                    return r7R;
                };
                var G3R = function(c7R) {
                    var V7R = false;
                    for (var a7R = 0; a7R < A3R["length"]; a7R++) {
                        V7R = c7R[a7R][D7P] !== w3R[A3R[a7R]] || c7R[a7R][d7P] !== m3R[A3R[a7R]];
                        if (V7R) return V7R;
                    }
                    return V7R;
                };
                var K3R = f3R();
                E3R[y4R](R3R);
                for (var F3R = 0, L3R = A3R["length"]; F3R < L3R; F3R++) {
                    w3R[A3R[F3R]] = K3R[F3R][D7P];
                    m3R[A3R[F3R]] = K3R[F3R][d7P];
                }
                var Z3R = o3R();
                E3R[y4R](v3R);
                var U3R = [];
                for (var H3R = 0, s3R = O3R["length"]; H3R < s3R; H3R++)
                    if (G3R(Z3R[O3R[H3R]])) U3R.push(O3R[H3R]);
                E3R[y7P](v3R);
                E3R[y7P](R3R);
                return U3R;
            };
            this[W7P] = function() {
                var Q6P = "test";
                var B6P = /Trident/;
                var r6P = "Netscape";
                var j7P = "Microsoft Internet Explorer";
                var b7P = "appName";
                if (navigator[b7P] === j7P) return b4R;
                if (navigator[b7P] === r6P && B6P[Q6P](navigator[T4R])) return b4R;
                return false;
            };
            this[C6P] = function() {
                return 1;
            };
            this[A5P] = function(I7R, u7R, i7R) {
                var X6P = "nativeForEach";
                if (I7R === E4R) return;
                if (this[X6P] && I7R[W2P] === this[X6P]) I7R[W2P](u7R, i7R);
                else if (I7R["length"] === +I7R["length"]) {
                    for (var e7R = 0, q7R = I7R["length"]; e7R < q7R; e7R++)
                        if (u7R[a6P](i7R, I7R[e7R], e7R, I7R) === {}) return;
                } else
                    for (var z7R in I7R)
                        if (I7R[u1P](z7R))
                            if (u7R[a6P](i7R, I7R[z7R], z7R, I7R) === {}) return;
            };
            this[V6P] = function(M7R, J7R, g7R) {
                var c6P = "nativeMap";
                var h7R = [];
                if (M7R == E4R) return h7R;
                if (this[c6P] && M7R[V6P] === this[c6P]) return M7R[V6P](J7R, g7R);
                this[A5P](M7R, function(S7R, k7R, A7R) {
                    h7R[h7R["length"]] = J7R[a6P](g7R, S7R, k7R, A7R);
                });
                return h7R;
            };
            this[q5P] = function() {
                var f6P = "name";
                var Y6P = "sort";
                var U6P = "rmocx.RealPlayer G2 Control.1";
                var m6P = "rmocx.RealPlayer G2 Control";
                var K6P = "WMPlayer.OCX";
                var l6P = "TDCCtl.TDCCtl";
                var w6P = "Skype.Detection";
                var v6P = "ShockwaveFlash.ShockwaveFlash";
                var R6P = "Shell.UIHelper";
                var H6P = "SWCtl.SWCtl";
                var E6P = "Scripting.Dictionary";
                var F6P = "RealVideo.RealVideo(tm) ActiveX Control (32-bit)";
                var O6P = "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)";
                var A6P = "RealPlayer";
                var k6P = "QuickTimeCheckObject.QuickTimeCheck.1";
                var S6P = "QuickTime.QuickTime";
                var g6P = "PDF.PdfCtrl";
                var J6P = "Msxml2.XMLHTTP";
                var M6P = "Msxml2.DOMDocument";
                var h6P = "MacromediaFlashPaper.MacromediaFlashPaper";
                var q6P = "DevalVRXCtrl.DevalVRXCtrl.1";
                var i6P = "AgControl.AgControl";
                var u6P = "Adodb.Stream";
                var z6P = "AcroPDF.PDF";
                var e6P = "ActiveXObject";
                var I6P = "getOwnPropertyDescriptor";
                if (this[W7P]()) {
                    var E7R = [];
                    if (Object[I6P] && Object[I6P](window, e6P) || e6P in window) {
                        var H7R = [z6P, u6P, i6P, q6P, h6P, M6P, J6P, g6P, S6P, k6P, A6P, O6P, F6P, E6P, H6P, R6P, v6P, w6P, l6P, K6P, m6P, U6P];
                        E7R = this[V6P](H7R, function(v7R) {
                            try {
                                new ActiveXObject(v7R);
                                return v7R;
                            } catch (w7R) {
                                return E4R;
                            }
                        });
                    }
                    return E7R;
                } else {
                    var O7R = [];
                    for (var F7R = 0, R7R = navigator[j9P]["length"]; F7R < R7R; F7R++) O7R.push(navigator[j9P][F7R]);
                    if (this[C6P]()) O7R = O7R[Y6P](function(l7R, K7R) {
                        if (l7R[f6P] > K7R[f6P]) return 1;
                        if (l7R[f6P] < K7R[f6P]) return -1;
                        return 0;
                    });
                    return this[V6P](O7R, function(m7R) {
                        var T6P = "::";
                        var s6P = "description";
                        var G6P = ",";
                        var U7R = this[V6P](m7R, function(Y7R) {
                            var o6P = "suffixes";
                            return [Y7R[S0P], Y7R[o6P]][g1P](K9P);
                        })[g1P](G6P);
                        return [m7R[f6P], m7R[s6P], U7R][g1P](T6P);
                    }, this);
                }
            };
            this[M5P] = function() {
                var L6P = "TouchEvent";
                var f7R = 0;
                var o7R = false;
                if (typeof navigator[D9P] !== "undefined") f7R = navigator[D9P];
                else if (typeof navigator[d9P] !== "undefined") f7R = navigator[d9P];
                try {
                    document[Q1P](L6P);
                    o7R = b4R;
                } catch (s7R) {}
                var G7R = N9P in window;
                return [f7R, o7R, G7R];
            };
            this[g5P] = function() {
                var Z6P = "hardwareConcurrency";
                if (navigator[Z6P]) return navigator[Z6P];
                return l5P;
            };
            this[k5P] = function() {
                var x6P = "swfobject";
                return typeof window[x6P] !== "undefined";
            };
            this[n6P] = function(L7R, Z7R) {
                L7R = [L7R[0] >>> E8R, L7R[0] & t6P, L7R[1] >>> E8R, L7R[1] & t6P];
                Z7R = [Z7R[0] >>> E8R, Z7R[0] & t6P, Z7R[1] >>> E8R, Z7R[1] & t6P];
                var T7R = [0, 0, 0, 0];
                T7R[3] += L7R[3] + Z7R[3];
                T7R[2] += T7R[3] >>> E8R;
                T7R[3] &= t6P;
                T7R[2] += L7R[2] + Z7R[2];
                T7R[1] += T7R[2] >>> E8R;
                T7R[2] &= t6P;
                T7R[1] += L7R[1] + Z7R[1];
                T7R[0] += T7R[1] >>> E8R;
                T7R[1] &= t6P;
                T7R[0] += L7R[0] + Z7R[0];
                T7R[0] &= t6P;
                return [T7R[0] << E8R | T7R[1], T7R[2] << E8R | T7R[3]];
            }, this[p6P] = function(n7R, t7R) {
                n7R = [n7R[0] >>> E8R, n7R[0] & t6P, n7R[1] >>> E8R, n7R[1] & t6P];
                t7R = [t7R[0] >>> E8R, t7R[0] & t6P, t7R[1] >>> E8R, t7R[1] & t6P];
                var x7R = [0, 0, 0, 0];
                x7R[3] += n7R[3] * t7R[3];
                x7R[2] += x7R[3] >>> E8R;
                x7R[3] &= t6P;
                x7R[2] += n7R[2] * t7R[3];
                x7R[1] += x7R[2] >>> E8R;
                x7R[2] &= t6P;
                x7R[2] += n7R[3] * t7R[2];
                x7R[1] += x7R[2] >>> E8R;
                x7R[2] &= t6P;
                x7R[1] += n7R[1] * t7R[3];
                x7R[0] += x7R[1] >>> E8R;
                x7R[1] &= t6P;
                x7R[1] += n7R[2] * t7R[2];
                x7R[0] += x7R[1] >>> E8R;
                x7R[1] &= t6P;
                x7R[1] += n7R[3] * t7R[1];
                x7R[0] += x7R[1] >>> E8R;
                x7R[1] &= t6P;
                x7R[0] += n7R[0] * t7R[3] + n7R[1] * t7R[2] + n7R[2] * t7R[1] + n7R[3] * t7R[0];
                x7R[0] &= t6P;
                return [x7R[0] << E8R | x7R[1], x7R[2] << E8R | x7R[3]];
            }, this[P6P] = function(P7R, p7R) {
                p7R %= n8R;
                if (p7R === m8R) return [P7R[1], P7R[0]];
                else if (p7R < m8R) return [P7R[0] << p7R | P7R[1] >>> m8R - p7R, P7R[1] << p7R | P7R[0] >>> m8R - p7R];
                else {
                    p7R -= m8R;
                    return [P7R[1] << p7R | P7R[0] >>> m8R - p7R, P7R[0] << p7R | P7R[1] >>> m8R - p7R];
                }
            }, this[N6P] = function(D7R, N7R) {
                N7R %= n8R;
                if (N7R === 0) return D7R;
                else if (N7R < m8R) return [D7R[0] << N7R | D7R[1] >>> m8R - N7R, D7R[1] << N7R];
                else return [D7R[1] << N7R - m8R, 0];
            }, this[D6P] = function(d7R, y7R) {
                return [d7R[0] ^ y7R[0], d7R[1] ^ y7R[1]];
            }, this[d6P] = function(W7R) {
                var j6P = 0x1a85ec53;
                var b6P = 0xc4ceb9fe;
                var W6P = 0xed558ccd;
                var y6P = 0xff51afd7;
                W7R = this[D6P](W7R, [0, W7R[0] >>> 1]);
                W7R = this[p6P](W7R, [y6P, W6P]);
                W7R = this[D6P](W7R, [0, W7R[0] >>> 1]);
                W7R = this[p6P](W7R, [b6P, j6P]);
                W7R = this[D6P](W7R, [0, W7R[0] >>> 1]);
                return W7R;
            }, this[F5P] = function(b7R, V6R) {
                var c8P = "00000000";
                var V8P = 0x38495ab5;
                var a8P = 0x52dce729;
                var X8P = 0xff;
                var C8P = 0x2745937f;
                var Q8P = 0x4cf5ad43;
                var B8P = 0x114253d5;
                var r8P = 0x87c37b91;
                var L8R = 56;
                var s8R = 48;
                var o8R = 40;
                var l8R = 27;
                var v8R = 24;
                var O8R = 14;
                var A8R = 13;
                var S8R = 11;
                b7R = b7R || g4R;
                V6R = V6R || 0;
                var c6R = b7R["length"] % E8R;
                var I6R = b7R["length"] - c6R;
                var C6R = [0, V6R];
                var Q6R = [0, V6R];
                var r6R = [0, 0];
                var B6R = [0, 0];
                var X6R = [r8P, B8P];
                var a6R = [Q8P, C8P];
                for (var j7R = 0; j7R < I6R; j7R = j7R + E8R) {
                    r6R = [b7R[R5P](j7R + 4) & X8P | (b7R[R5P](j7R + 5) & X8P) << 8 | (b7R[R5P](j7R + 6) & X8P) << E8R | (b7R[R5P](j7R + 7) & X8P) << v8R, b7R[R5P](j7R) & X8P | (b7R[R5P](j7R + 1) & X8P) << 8 | (b7R[R5P](j7R + 2) & X8P) << E8R | (b7R[R5P](j7R + 3) & X8P) << v8R];
                    B6R = [b7R[R5P](j7R + 12) & X8P | (b7R[R5P](j7R + A8R) & X8P) << 8 | (b7R[R5P](j7R + O8R) & X8P) << E8R | (b7R[R5P](j7R + F8R) & X8P) << v8R, b7R[R5P](j7R + 8) & X8P | (b7R[R5P](j7R + 9) & X8P) << 8 | (b7R[R5P](j7R + g8R) & X8P) << E8R | (b7R[R5P](j7R + S8R) & X8P) << v8R];
                    r6R = this[p6P](r6R, X6R);
                    r6R = this[P6P](r6R, K8R);
                    r6R = this[p6P](r6R, a6R);
                    C6R = this[D6P](C6R, r6R);
                    C6R = this[P6P](C6R, l8R);
                    C6R = this[n6P](C6R, Q6R);
                    C6R = this[n6P](this[p6P](C6R, [0, 5]), [0, a8P]);
                    B6R = this[p6P](B6R, a6R);
                    B6R = this[P6P](B6R, U8R);
                    B6R = this[p6P](B6R, X6R);
                    Q6R = this[D6P](Q6R, B6R);
                    Q6R = this[P6P](Q6R, K8R);
                    Q6R = this[n6P](Q6R, C6R);
                    Q6R = this[n6P](this[p6P](Q6R, [0, 5]), [0, V8P]);
                }
                r6R = [0, 0];
                B6R = [0, 0];
                switch (c6R) {
                    case F8R:
                        B6R = this[D6P](B6R, this[N6P]([0, b7R[R5P](j7R + O8R)], s8R));
                    case O8R:
                        B6R = this[D6P](B6R, this[N6P]([0, b7R[R5P](j7R + A8R)], o8R));
                    case A8R:
                        B6R = this[D6P](B6R, this[N6P]([0, b7R[R5P](j7R + 12)], m8R));
                    case 12:
                        B6R = this[D6P](B6R, this[N6P]([0, b7R[R5P](j7R + S8R)], v8R));
                    case S8R:
                        B6R = this[D6P](B6R, this[N6P]([0, b7R[R5P](j7R + g8R)], E8R));
                    case g8R:
                        B6R = this[D6P](B6R, this[N6P]([0, b7R[R5P](j7R + 9)], 8));
                    case 9:
                        B6R = this[D6P](B6R, [0, b7R[R5P](j7R + 8)]);
                        B6R = this[p6P](B6R, a6R);
                        B6R = this[P6P](B6R, U8R);
                        B6R = this[p6P](B6R, X6R);
                        Q6R = this[D6P](Q6R, B6R);
                    case 8:
                        r6R = this[D6P](r6R, this[N6P]([0, b7R[R5P](j7R + 7)], L8R));
                    case 7:
                        r6R = this[D6P](r6R, this[N6P]([0, b7R[R5P](j7R + 6)], s8R));
                    case 6:
                        r6R = this[D6P](r6R, this[N6P]([0, b7R[R5P](j7R + 5)], o8R));
                    case 5:
                        r6R = this[D6P](r6R, this[N6P]([0, b7R[R5P](j7R + 4)], m8R));
                    case 4:
                        r6R = this[D6P](r6R, this[N6P]([0, b7R[R5P](j7R + 3)], v8R));
                    case 3:
                        r6R = this[D6P](r6R, this[N6P]([0, b7R[R5P](j7R + 2)], E8R));
                    case 2:
                        r6R = this[D6P](r6R, this[N6P]([0, b7R[R5P](j7R + 1)], 8));
                    case 1:
                        r6R = this[D6P](r6R, [0, b7R[R5P](j7R)]);
                        r6R = this[p6P](r6R, X6R);
                        r6R = this[P6P](r6R, K8R);
                        r6R = this[p6P](r6R, a6R);
                        C6R = this[D6P](C6R, r6R);
                }
                C6R = this[D6P](C6R, [0, b7R["length"]]);
                Q6R = this[D6P](Q6R, [0, b7R["length"]]);
                C6R = this[n6P](C6R, Q6R);
                Q6R = this[n6P](Q6R, C6R);
                C6R = this[d6P](C6R);
                Q6R = this[d6P](Q6R);
                C6R = this[n6P](C6R, Q6R);
                Q6R = this[n6P](Q6R, C6R);
                return (c8P + (C6R[0] >>> 0)[q3P](E8R))[n4R](-8) + (c8P + (C6R[1] >>> 0)[q3P](E8R))[n4R](-8) + (c8P + (Q6R[0] >>> 0)[q3P](E8R))[n4R](-8) + (c8P + (Q6R[1] >>> 0)[q3P](E8R))[n4R](-8);
            };
        }
        return this["fp_result"];
    };
    this[X1P] = function(e6R) {
        return this["fp_result"]["fp_vals"] && !this["fp_result"]["fp_vals"][O1P] && this["fp_result"]["fp"] && this["fp_result"]["fp"]["fp"];
    };
    this[I8P] = function(u6R, i6R) {
        var w8P = 'fc_shown';
        var v8P = "function";
        var R8P = 'fc_suppressed';
        var H8P = 'onmessage';
        var E8P = "attachEvent";
        var F8P = 'message';
        var O8P = "addEventListener";

        function q6R(A6R) {
            var A8P = "finished_loading_game";
            var k8P = "fallbackType";
            var S8P = "fallback_type";
            var g8P = "original_session_token";
            var J8P = "deviceList";
            var M8P = "device_list";
            var h8P = "restart";
            var q8P = "session_timeout";
            var u8P = "msg";
            var z8P = '{';
            if (A6R[K2P] == z6R[v4R]) {
                var k6R;
                var S6R = A6R[K4R];
                if (S6R[e8P](0) === z8P) try {
                    k6R = JSON[e0P](S6R);
                    S6R = k6R[u8P];
                } catch (O6R) {}
                if (u6R)
                    if (S6R == X2LL.i8P) u6R();
                if (S6R == q8P)
                    if (Y5R[X2LL.Q4R]) Y5R[X2LL.Q4R]();
                if (S6R == h8P) {
                    z6R[d2P] = z6R[d2P] || {};
                    z6R[d2P][M8P] = k6R[J8P];
                    z6R[d2P][g8P] = k6R[U1P];
                    z6R[d2P][S8P] = k6R[k8P];
                    if (Y5R[X2LL.Q4R]) Y5R[X2LL.Q4R]();
                }
                if (i6R)
                    if (S6R == A8P) i6R();
            }
        }
        var z6R = this;
        if (window[r1P]) {
            if (window[O8P]) window[O8P](F8P, q6R, false);
            else if (window[E8P]) window[E8P](H8P, q6R);
            if (!(z6R[G4R] < 9) && !(z6R[x4R] < 3)) {
                window[O8P](R8P, function(h6R) {
                    if (u6R) u6R();
                    try {
                        if (typeof U5R === v8P) U5R();
                        else window[U5R]();
                    } catch (M6R) {}
                });
                if (K5R) window[O8P](w8P, function(J6R) {
                    try {
                        if (typeof K5R === v8P) K5R();
                        else window[K5R]();
                    } catch (g6R) {}
                });
            }
        }
    };
    this[v2P] = function(F6R) {
        var l8P = "console";
        if (window[l8P]) console[v2P](F6R);
    };
    this[C1P] = function() {
        var E6R = document[D4R](D5P);
        return !!(E6R[d5P] && E6R[d5P](y5P));
    };
    var p5R = function(R6R) {
        var K8P = "reduce";
        if (!R6R) return G2P;
        if (Array[X2LL.r4R][K8P]) return R6R[X2LL.I4R](g4R)[K8P](function(l6R, K6R) {
            l6R = (l6R << 5) - l6R + K6R[R5P](0);
            return l6R & l6R;
        }, 0);
        var H6R = 0;
        if (R6R["length"] === 0) return H6R;
        for (var v6R = 0; v6R < R6R["length"]; v6R++) {
            var w6R = R6R[R5P](v6R);
            H6R = (H6R << 5) - H6R + w6R;
            H6R = H6R & H6R;
        }
        return H6R;
    };
    var Z5R = {};

    Z5R.encode = function(U6R) {
        var m8P = "fromCharCode";
        var N8R = 128;
        var m6R = U6R[X2LL.V4R](/[\u0080-\u07ff]/g, function(f6R) {
            var D8R = 192;
            var Y6R = f6R[R5P](0);
            return String[m8P](D8R | Y6R >> 6, N8R | Y6R & x8R);
        });
        m6R = m6R[X2LL.V4R](/[\u0800-\uffff]/g, function(G6R) {
            var y8R = 224;
            var o6R = G6R[R5P](0);
            return String[m8P](y8R | o6R >> 12, N8R | o6R >> 6 & x8R, N8R | o6R & x8R);
        });
        return m6R;
    };

    var m5R = {};

    //torobie
    m5R.encode = function(P6R, n6R) {
        n6R = typeof n6R == "undefined" ? false : n6R;
        var d6R, y6R, W6R, Z6R, j6R, b6R, N6R, D6R, p6R = [],
            t6R = g4R,
            s6R, T6R, x6R;

        var L6R = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        T6R = n6R ? Z5R.encode(P6R) : P6R;

        s6R = T6R.length % 3;
        if (s6R > 0)
            while (s6R++ < 3) {
                t6R += "=";
                T6R += "\x00";
            }
        for (s6R = 0; s6R < T6R.length; s6R += 3) {
            d6R = T6R[R5P](s6R);
            y6R = T6R[R5P](s6R + 1);
            W6R = T6R[R5P](s6R + 2);
            Z6R = d6R << E8R | y6R << 8 | W6R;
            j6R = Z6R >> 18 & x8R;
            b6R = Z6R >> 12 & x8R;
            N6R = Z6R >> 6 & x8R;
            D6R = Z6R & x8R;
            p6R[s6R / 3] = L6R[e8P](j6R) + L6R[e8P](b6R) + L6R[e8P](N6R) + L6R[e8P](D6R);
        }
        x6R = p6R[g1P](g4R);
        x6R = x6R[n4R](0, x6R["length"] - t6R["length"]) + t6R;
        return x6R;
    };
    if (w5R && w5R[S4R]) {
        this[S4R] = w5R[S4R];
        if (w5R[k4R]) this[k4R] = w5R[k4R];
        this[I8P](this[S4R], this[k4R]);
    } else this[I8P]();
    this[X2LL.Q4R]();
}
if (document[X2LL.C0P] === X2LL.i8P) FunCaptcha();
else if (window["onload"]) window["onload"] = function() {
    FunCaptcha();
};
else document["onreadystatechange"] = function() {
    if (document[X2LL.C0P] == X2LL.i8P) FunCaptcha();
};
