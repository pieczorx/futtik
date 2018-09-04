/*Want to help? We have a bug bounty program you can join at https://www.funcaptcha.com/whitehat/ or contact us at whitehat@funcaptcha.com*/
(function() {
    var V3 = 'script';
    function l5(V5) {
        var a8 = "action";
        var e8 = "detail";
        document[q2](R8)[H8][D8]({
            msg: r8,
            action: V5[e8][a8]
        }, q8);
    }
    function C5() {
        var O9 = '2d';
        var T3 = "getContext";
        var Z3 = 'canvas';
        var Q1 = document[A2](Z3);
        return !!(Q1[T3] && Q1[T3](O9));
    }
    var n3 = "getElementsByTagName";
    function M5(n1, K1) {
        if (n1)
            document[q2](z8)[V8][t8] = n1 + G8;
        if (K1)
            document[q2](z8)[V8][W8] = K1 + G8;
    }
    var R3 = "pk";
    function z5() {
        var y0 = "getExtraData";
        var b0 = 'undefined';
        if (!(typeof fcExtra === b0))
            if (Object(fcExtra))
                fcExtra[y0]();
    }
    var J0 = "length";
    var U0 = "removeChild";
    var F0 = "parentNode";
    var p0 = "innerHTML";
    var z0 = "opacity";
    var e0 = "*";
    function i5(O1, H1) {
        var f3 = '</div>';
        var l3 = '	<input type="text" id="FunCaptcha-Token" name="fc-token" placeholder="Copy verification code in here" style="width: 270px;height: 24px;border: 1px solid #f7f7f7;border-radius: 5px;padding: 10px;margin: 7px;resize: none;font-size: 11px;-webkit-font-smoothing: antialiased;color: #212121;background: #f7f7f7;text-align: center;">';
        var I3 = '<div style="width: 306px;height: 60px;border-style: none;bottom: 12px;left: 25px;margin: 5px 0 0 0;padding: 0px;right: 25px;background: #ffffff;border: 1px solid #f7f7f7;border-radius: 5px;">';
        var B3 = '&fb_type=';
        var A3 = '<iframe src="';
        var Y3 = '<input type="text" id="FunCaptcha-Token" name="fc-token" placeholder="Copy verification code in here" style="display:none;">';
        var v3 = '" frameborder="0" scrolling="no" style="width: 308px; height:408px; border-style: none;"></iframe>';
        var c3 = "lang";
        var q3 = '&lang=';
        var a3 = "r";
        var e3 = '&r=';
        var r3 = "session";
        var D3 = '&session=';
        var H3 = '&litejs=1&fb_type=';
        var g3 = '/fc/api/nojs/?pkey=';
        var k3 = '<iframe id="fc-iframe-wrap" src="';
        var u3 = '&skipverify=1';
        var O3 = '';
        var u1 = O3;
        if (!O1)
            O1 = W1;
        if (H1)
            u1 += u3;
        var g1 = Q2;
        if (window[D8])
            g1 = k3 + R5 + g3 + O5[R3] + H3 + O1 + D3 + O5[r3] + e3 + O5[a3] + q3 + O5[c3] + H5 + u1 + v3 + Y3;
        else
            g1 = A3 + R5 + g3 + O5[R3] + B3 + O1 + D3 + O5[r3] + e3 + O5[a3] + q3 + O5[c3] + H5 + u1 + v3 + I3 + l3 + f3;
        var R1 = document[q2](v2);
        R1[F0][U0](R1);
        document[q2](Y2)[p0] = g1;
    }
    var T8 = 'src';
    function Y5(d1) {
        var E3 = "async";
        var W3 = 'text/javascript';
        var G3 = "type";
        var p3 = 'head';
        var f1 = document[n3](p3)[G1];
        var l1 = document[A2](V3);
        l1[G3] = W3;
        l1[o8] = d1;
        l1[E3] = N2;
        f1[E8](l1);
    }
    var Z8 = "getAttribute";
    var S8 = "clearTimeout";
    var o8 = "src";
    var E8 = "appendChild";
    var W8 = "height";
    var G8 = "px";
    var t8 = "width";
    var V8 = "style";
    var z8 = "fc-iframe-wrap";
    var X8 = "id";
    var K8 = "setAttribute";
    var f8 = "meta";
    var l8 = "setTimeout";
    var A8 = 'onmessage';
    var v8 = 'message';
    var q8 = '*';
    var r8 = 'FunCaptcha-action';
    var D8 = "postMessage";
    var H8 = "contentWindow";
    var R8 = 'fc-iframe-wrap';
    var g8 = "game loaded";
    var k8 = "loaded";
    var u8 = "/fc/gc/?token=";
    var O8 = "&ps=";
    var T2 = "hasOwnProperty";
    var Z2 = "search";
    var J2 = "location";
    var L2 = "ps";
    var b2 = "fc_shown";
    var j2 = "dispatchEvent";
    var U2 = "fc_suppressed";
    var F2 = "initCustomEvent";
    var S2 = 'CustomEvent';
    var E2 = "createEvent";
    var W2 = "sup";
    var G2 = "injs";
    var V2 = "durl";
    var p2 = "dm";
    var N2 = true;
    var z2 = 'firefox';
    function m5() {
        return X5(A5);
    }
    var X2 = "indexOf";
    var C2 = "toLowerCase";
    function n5(N1, p1) {
        var A9 = "body";
        var Y9 = "&data[site]=";
        var v9 = "&data[public_key]=";
        var c9 = "&session_token=";
        var q9 = "&action=";
        var a9 = "/fc/a/?callback=fcAnalytic&category=";
        var e9 = "fcAnalytic";
        var r9 = "Not found";
        var D9 = "href";
        var H9 = "referrer";
        var R9 = "parent";
        var C1 = window[J2] != window[R9][J2] ? document[H9] : document[J2];
        C1 = C1 || window[J2][D9] || window[J2] || r9;
        window[e9] = function(V1) {}
        ;
        var z1 = R5 + a9 + N1 + q9 + p1 + c9 + k5 + v9 + O5[R3] + Y9 + C1;
        var X1 = document[A2](V3);
        X1[K8](T8, z1);
        document[A9][E8](X1);
    }
    var M2 = "userAgent";
    var Q2 = "";
    var K2 = false;
    var n2 = "tfb";
    var P2 = "https://funcaptcha.com";
    var m2 = "surl";
    var w2 = "?session=";
    var i2 = "&";
    var d2 = "join";
    var f2 = "|";
    var l2 = "split";
    var I2 = "value";
    var B2 = "IFRAME";
    var A2 = "createElement";
    var Y2 = "FunCaptcha";
    var v2 = "FunCaptcha-Token";
    var q2 = "getElementById";
    var a2 = 20000;
    var T1 = 250;
    var j1 = 10;
    var S1 = 3;
    var E1 = 2;
    var W1 = 1;
    var G1 = 0;
    var I5 = document[q2](v2);
    function N5(Z5) {
        var T0 = "store_player_data";
        var Z0 = "getElementsByName";
        var L0 = ",";
        Z5 = Z5[l2](L0);
        for (var T5 = Z5[J0] - W1; T5 >= G1; T5--) {
            if (document[q2](Z5[T5]))
                collected_data = document[q2](Z5[T5])[I2];
            else if (document[Z0](Z5[T5]))
                collected_data = document[Z0](Z5[T5])[G1][I2];
            if (window[D8])
                document[q2](R8)[H8][D8]({
                    "msg": T0,
                    "name": Z5[T5],
                    "value": collected_data
                }, e0);
        }
    }
    var d5 = document[q2](Y2);
    var u5 = document[A2](B2);
    var k5 = I5[I2];
    k5 = k5[l2](f2)[d2](i2);
    var O5 = c5(w2 + k5);
    function D5(F5) {
        var j0 = "populate_nojs";
        var S0 = "replace_fc";
        var x0 = "inj_tag";
        var o0 = "changeIframeSize";
        var E0 = "show_inject";
        var W0 = "inject_js";
        var G0 = "inject_url";
        var V0 = "inject_html";
        var N0 = 0.01;
        var X0 = "250px";
        var C0 = "300px";
        var M0 = "left";
        var h0 = "4px";
        var Q0 = "offsetLeft";
        var K0 = "1px";
        var n0 = "top";
        var P0 = "absolute";
        var m0 = "FCINJ";
        var w0 = "DIV";
        var i0 = "relative";
        var d0 = "position";
        var f0 = "inject";
        var l0 = "msg";
        var I0 = "parse";
        var B0 = '{';
        var A0 = 'load_count';
        var Y0 = "getElementsByClassName";
        var v0 = "js_ready";
        var c0 = "finished_loading_game";
        var q0 = "get_data";
        var a0 = "passback_get_data";
        var r0 = "snip_data";
        var D0 = "get_snips";
        var H0 = "col";
        var R0 = "get_col_data";
        var g0 = "check_extra";
        var k0 = "detachEvent";
        var u0 = "removeEventListener";
        var O0 = 'session_timeout';
        var J8 = 'https://funcaptcha.com';
        var L8 = 'https://funcaptcha.co';
        var y8 = "origin";
        var b8 = "data";
        var U1 = 5;
        var F1 = 4;
        if (F5[b8] && (F5[y8] === L8 || F5[y8] === J8 || document[q2](R8) && document[q2](R8)[Z8](T8)[Z2](F5[y8]) !== -W1)) {
            if (F5[b8] == O0)
                if (window[D8])
                    if (window[u0]) {
                        window[u0](r8, l5);
                        window[u0](v8, D5, K2);
                    } else if (window[k0])
                        window[k0](A8, D5);
            if (F5[b8] == g0) {
                z5();
                return;
            }
            if (F5[b8] == R0) {
                if (O5[H0])
                    N5(O5[H0]);
                return;
            }
            if (F5[b8] == D0) {
                document[q2](R8)[H8][D8]({
                    "msg": r0,
                    "data": K5()
                }, e0);
                return;
            }
            if (F5[b8] == a0)
                document[q2](R8)[H8][D8]({
                    "msg": q0,
                    "data": {
                        "msg": q0,
                        "data": c5(document[J2][Z2])
                    }
                }, e0);
            if (F5[b8] == c0 || F5[b8] == v0)
                window[S8](v5);
            if (F5[b8] == c0) {
                e5 += W1;
                var b5 = document[Y0](R8);
                for (var L5 in b5)
                    if (b5[T2](L5))
                        b5[L5][H8][D8]({
                            msg: A0,
                            value: e5
                        }, q8);
            }
            if (F5[b8][X2](B0) === -W1)
                return;
            var U5 = JSON[I0](F5[b8]);
            if (U5[l0])
                switch (U5[l0]) {
                case f0:
                    document[q2](Y2)[V8][d0] = i0;
                    var j5 = document[A2](w0);
                    j5[K8](X8, m0);
                    j5[V8][d0] = P0;
                    if (O5[f8] == S1 || O5[f8] == F1 || O5[f8] == U1) {
                        j5[V8][n0] = K0;
                        var y5 = W1 + document[q2](z8)[Q0];
                    } else {
                        j5[V8][n0] = h0;
                        var y5 = F1 + document[q2](z8)[Q0];
                    }
                    j5[V8][M0] = y5 + G8;
                    j5[V8][t8] = C0;
                    j5[V8][W8] = X0;
                    j5[V8][z0] = N0;
                    j5[p0] = U5[b8][V0];
                    document[q2](Y2)[E8](j5);
                    Y5(U5[b8][G0]);
                    eval(U5[b8][W0]);
                    break;
                case E0:
                    h5(document[q2](m0), T1);
                    break;
                case o0:
                    M5(U5[t8], U5[W8]);
                    break;
                case x0:
                    Y5(U5[b8]);
                    break;
                case S0:
                    var J5 = document[q2](v2);
                    J5[F0][U0](J5);
                    document[q2](Y2)[p0] = U5[b8];
                    break;
                case j0:
                    document[q2](v2)[I2] = U5[b8];
                    break;
                }
        }
    }
    var v5;
    var e5 = G1;
    var R5 = O5[m2] ? O5[m2] : P2;
    var f5 = O5[n2] ? O5[n2] : a2;
    var r5 = K2;
    function h5(i1, m1) {
        var J3 = "alpha(opacity=1)";
        var b3 = "visible";
        var j3 = "visibility";
        var U3 = "inline-block";
        var F3 = "display";
        var S3 = "alpha(opacity=0)";
        var x3 = "filter";
        var b1 = 50;
        if (!i1)
            return;
        i1[V8][z0] = G1;
        i1[V8][x3] = S3;
        i1[V8][F3] = U3;
        i1[V8][j3] = b3;
        if (m1) {
            var w1 = G1;
            var P1 = setInterval(function() {
                var L3 = ")";
                var y3 = "alpha(opacity=";
                var L1 = 100;
                w1 += b1 / m1;
                if (w1 >= W1) {
                    clearInterval(P1);
                    w1 = W1;
                }
                i1[V8][z0] = w1;
                i1[V8][x3] = y3 + w1 * L1 + L3;
            }, b1);
        } else {
            i1[V8][z0] = W1;
            i1[V8][x3] = J3;
        }
    }
    var A5;
    function K5() {
        var N3 = "innerText";
        var z3 = "textContent";
        var X3 = /^([^\/]+)(?:\/(\d+))?/;
        var C3 = "match";
        var M3 = 'content';
        var Q3 = 'name';
        var K3 = 'meta';
        var P3 = "document";
        var m3 = 'description';
        var w3 = 'keywords';
        var i3 = 'h1';
        var d3 = 'title';
        var B1 = [d3, i3, w3, m3];
        var e1 = {};
        var I1 = window[P3];
        var q1 = I1[n3](K3);
        for (var D1 = G1; D1 < q1[J0]; D1++) {
            var Y1 = q1[D1][Z8](Q3)
              , A1 = q1[D1][Z8](M3);
            if (Y1 && A1)
                e1[Y1[C2]()] = A1;
        }
        for (var v1 = G1; v1 < B1[J0]; v1++) {
            var r1 = B1[v1][C3](X3);
            var D1 = r1[E1] ? parseInt(r1[E1], j1) : G1;
            var a1 = I1[n3](r1[W1]);
            if (a1[J0] <= D1)
                continue;
            e1[r1[W1]] = a1[D1][z3] || a1[D1][N3];
        }
        return e1;
    }
    var H5 = Q2;
    var a5 = K2;
    function P5() {
        var J1 = 200;
        window[l8](function() {
            var e2 = 500;
            if (m5())
                P5();
            else if (window[D8])
                window[l8](function() {
                    var g9 = 'canvas_render_fix';
                    document[q2](R8)[H8][D8](g9, q8);
                }, e2);
        }, J1);
    }
    if (navigator[M2][C2]()[X2](z2) > -W1)
        r5 = N2;
    function c5(E5) {
        var j8 = "exec";
        var U8 = " ";
        var F8 = "+";
        E5 = E5[l2](F8)[d2](U8);
        var o5 = {}, x5, S5 = /[?&]?([^=]+)=([^&]*)/g;
        while (x5 = S5[j8](E5))
            o5[decodeURIComponent(x5[W1])] = decodeURIComponent(x5[E1]);
        return o5;
    }
    if (O5[p2] && O5[V2])
        R5 = O5[V2];
    function X5(M1) {
        var k9 = null;
        var u9 = "offsetParent";
        return M1[u9] === k9;
    }
    if (O5[G2])
        Y5(O5[G2]);
    if (O5[W2] == W1) {
        a5 = N2;
        try {
            var g5 = document[E2](S2);
            g5[F2](U2, K2, K2, void G1);
            window[j2](g5);
        } catch (s5) {}
    } else
        try {
            var g5 = document[E2](S2);
            g5[F2](b2, K2, K2, void G1);
            window[j2](g5);
        } catch (p5) {}
    if (O5[L2]) {
        var q5 = c5(document[J2][Z2]);
        if (q5[T2](O5[L2])) {
            H5 = O8 + q5[O5[L2]];
            k5 += H5;
        }
    }
    var B5 = u8;
    var w5 = R5 + B5;
    function Q5() {
        var p8 = "Please solve this FunCaptcha so we know you are a real person";
        var s8 = "title";
        var N8 = "class";
        var C8 = "no";
        var M8 = "scrolling";
        var h8 = "0";
        var Q8 = "frameBorder";
        var n8 = "10";
        var P8 = "6";
        var m8 = "4";
        var w8 = "size";
        var i8 = "2";
        var d8 = "3";
        var I8 = "skipverify";
        var B8 = "pl";
        var Y8 = "attachEvent";
        var c8 = "addEventListener";
        var r2 = 450;
        var D2 = 311;
        var H2 = 310;
        var R2 = 308;
        var g2 = 302;
        var u2 = 290;
        var O2 = 252;
        var Z1 = 238;
        var W5 = Q2;
        if (window[D8])
            if (window[c8]) {
                window[c8](r8, l5);
                window[c8](v8, D5, K2);
            } else if (window[Y8])
                window[Y8](A8, D5);
        if (!C5() || O5[B8] == S1) {
            i5(W1, O5[I8]);
            return;
        }
        if (window[D8])
            v5 = window[l8](function() {
                i5(j1, O5[I8]);
            }, f5);
        var t5 = H2;
        var G5 = R2;
        switch (O5[f8]) {
        case d8:
        case i8:
            if (O5[w8] == T1) {
                t5 = Z1;
                G5 = T1;
            } else {
                t5 = u2;
                G5 = g2;
            }
            break;
        case m8:
            t5 = O2;
            break;
        case P8:
            t5 = O2;
            break;
        case n8:
            G5 = r2;
            t5 = D2;
            break;
        }
        u5[K8](Q8, h8);
        u5[K8](M8, C8);
        u5[K8](X8, z8);
        u5[K8](N8, z8);
        u5[K8](s8, p8);
        u5[V8][t8] = G5 + G8;
        u5[V8][W8] = t5 + G8;
        d5[E8](u5);
        u5[K8](o8, w5 + k5);
        if (r5 && window[D8]) {
            A5 = document[q2](z8);
            if (m5()) {
                window[S8](v5);
                P5();
            }
        }
    }
    if (!a5)
        Q5();
    else
        n5(k8, g8);
}());
