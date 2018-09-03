/*Want to help? We have a bug bounty program you can join at https://www.funcaptcha.com/whitehat/ or contact us at whitehat@funcaptcha.com*/
(function() {
    var J6A = "isSupported";
    var C6A = "Touch";
    var Z6A = "onselectstart";
    var M6A = "drawRoundRect";
    var H6A = '#000000';
    var O8A = 1.1;
    var l8A = 0.3;
    function n1K() {
        var H0A = 'grey';
        var I0A = "bold 8.3px ";
        var b0A = "not_for_public_watermark";
        var q0A = "startup screen";
        var L0A = "begin load";
        var X6K = "px";
        var R6K = 'height';
        var e6K = 'width';
        var i6K = "getDevicePixelRatio";
        var x6K = "devicePixelRatio";
        var U6K = "mouseMoveOutside";
        var E6K = "Stage";
        var J6K = "2d";
        var C6K = "getContext";
        var f6K = "FunCAPTCHA";
        var V6K = "getElementById";
        var E8K = 230;
        var N8K = 182;
        X5L = document[V6K](f6K);
        X5L[l6K] = l5L;
        X5L[Z6K] = E7L;
        u1K = X5L[C6K](J6K);
        I5L = new createjs[E6K](X5L);
        I5L[y6K](Q7K);
        I5L[U6K] = s6K;
        if (window[x6K] && window[i6K]() > S7K) {
            X5L[d6K](e6K, Math[A6K](l5L * window[i6K]()));
            X5L[d6K](R6K, Math[A6K](E7L * window[i6K]()));
            X5L[T6K][l6K] = l5L + X6K;
            X5L[T6K][Z6K] = E7L + X6K;
            I5L[Y6K] = I5L[O6K] = window[i6K]();
        }
        Y0K();
        if (window[o6K][S0A])
            T0K();
        D5L = new createjs[F0A](s6K,z6K,q6K);
        D5L[B0A](I7K);
        D5L[W6K](W0A, J6L);
        D5L[W6K](t0A, n6L);
        D5L[W6K](s0A, V6L);
        t9L = new createjs[F0A](s6K,z6K,q6K);
        t9L[W6K](t0A, y6L);
        q7L = z0K;
        K0K();
        U0K();
        H7L(L0A, q0A);
        createjs[K0A][Q0A](i7K);
        createjs[K0A][W6K](h0A, N0K);
        if (y8L || J7L) {
            L7L = new createjs[p0A]();
            L7L[w0A] = N8K;
            L7L[a0A] = E8K;
            var i1K = J7L ? J7L : P5L(b0A, c0A, E5L);
            L7L[r0A](V5L([[i1K, I0A + M5L, H0A]], a8K, I7K, s6K, i7K, q6K, o9K, M0A, s6K, s6K));
            I5L[r0A](L7L);
        }
    }
    function E1K(x9K) {
        t8L = s6K;
    }
    function J6L(b2K) {
        var Y3A = "passLoadProgress";
        if (r5L[X3A] == undefined) {
            var a2K = D5L[U3A] * K8K * F7K;
            Y6L = a2K;
            d9L[Y6K] = a2K;
        }
        if (window[o6K][S0A])
            try {
                parent[Y3A](D5L[U3A]);
            } catch (c2K) {}
    }
    function E0K() {
        var e5A = "victoryScreen";
        r8L = s6K;
        if (I8L) {
            if (c5L[D5A] === S7K) {
                clearTimeout(D7L);
                if (X9L)
                    parent[u5A](m6L, z6K, z6K, W8L);
                parent[e5A]();
                parent[A5A]();
                c8L();
                return;
            }
            I8L = s6K;
            y9L = q6K;
            w6L();
        }
    }
    var P8A = 1.5;
    var v8A = "dy";
    function t1K() {
        TweenLite[i3A](h9L);
        TweenLite[y3A](h9L, S7A, {
            y: r5L[k9A] !== undefined ? r5L[k9A] : w8K
        });
    }
    var m8A = "dx";
    var z8A = "random";
    function m0K() {
        var n8A = "Please wait.";
        var G8A = "waiting on lazy load of victory screen";
        var N8A = "loading";
        var k8A = "fc2_welldone_image_x";
        var u8A = "fc2_welldone_image_y";
        var D8A = "metricLoader";
        var j8A = "fc_view_macro";
        var q8K = 95;
        TweenLite[y3A](v5L, n6K, {
            alpha: o9K
        });
        TweenLite[y3A](n9L, n6K, {
            alpha: o9K
        });
        TweenLite[y3A](z6L, n6K, {
            alpha: o9K
        });
        if (q8L) {
            if (y9L) {
                c8L();
                parent[w8A](L9L);
                if (c5L[t2A])
                    if (c5L[t2A][j8A] && c5L[t2A][j8A] != p6K)
                        parent[D8A](c5L[t2A][j8A]);
                if (v9L && r5L[u3A] !== undefined) {
                    var L4K = new createjs[h4A](D5L[p4A](N3A));
                    L4K[a0A] = r5L[u8A] !== undefined ? r5L[u8A] : F8K;
                    L4K[w0A] = r5L[k8A] !== undefined ? r5L[k8A] : p8K;
                    I5L[r0A](L4K);
                    L4K[y4A] = o9K;
                    TweenLite[y3A](L4K, n6K, {
                        alpha: S7K
                    });
                } else
                    parent[A5A]();
                c8L();
                clearTimeout(D7L);
            }
        } else {
            u8L = q6K;
            H7L(N8A, G8A);
            r7L = new createjs[p0A]();
            r7L[w0A] = q8K;
            r7L[a0A] = Z8K;
            I5L[r0A](r7L);
            r7L[r0A](V5L([[n8A, r7A + M5L, m5L]], K8K, m7K, s6K, z6K, q6K, z6K, z6K, s6K, s6K, q6K));
            TweenLite[y3A](r7L, B7K, {
                onComplete: c8L
            });
        }
    }
    var M8A = "floor";
    var I8A = "from";
    function J0K() {
        q8L = q6K;
        if (u8L) {
            u8L = s6K;
            m0K();
        }
    }
    var w8A = "setStars";
    function C6L() {
        var n4A = "fc2_loading_image_y";
        var G4A = "fc2_loading_image_x";
        var N4A = "22px ";
        var k4A = "fc2_meta_logo_x";
        var u4A = "fc2_meta_logo_y";
        var D4A = "fc2_meta_text_y";
        var j4A = "sv";
        var P4A = "ko";
        var m4A = "pt";
        var z4A = "pt-br";
        var M4A = "it";
        var H4A = "11px ";
        var r4A = "12px ";
        var b4A = "ar";
        var w4A = "fc2_intro_text_bold";
        var C8K = 227;
        var P8K = 148;
        if (b9L && z7L)
            W9L = l6L();
        else if (N9L)
            W9L = new createjs[h4A](d5L[p4A](W4A));
        else if (Q9L)
            W9L = new createjs[h4A](d5L[p4A](f3A));
        else
            W9L = new createjs[h4A](d5L[p4A](t4A));
        q9L[r0A](W9L);
        a9L = e8K;
        var M2K = r5L[w4A] !== undefined ? p6K : M6K;
        X7L = M2K + a4A + M5L;
        switch (H5L) {
        case b4A:
            a9L = g8K;
            break;
        case c4A:
            X7L = M2K + r4A + M5L;
            break;
        case I4A:
            X7L = M2K + H4A + M5L;
            break;
        case M4A:
            a9L = e8K;
            break;
        case z4A:
            a9L = e8K;
            break;
        case m4A:
            a9L = e8K;
            break;
        case v4A:
            a9L = e8K;
            break;
        case P4A:
            a9L = e8K;
            break;
        case j4A:
            a9L = e8K;
            break;
        }
        s7L = V5L([[u9L[o9K], X7L, R7L], [u9L[S7K], X7L, R7L]], a9L, z6K, s6K, F8K, q6K, I7K);
        if (navigator[k6K][D6K](N6K) !== -S7K && X5L[T6K][p3A] === w3A)
            s7L[w0A] = i8K;
        else
            s7L[w0A] = T7K;
        s7L[a0A] = r5L[D4A] !== undefined ? r5L[D4A] : a8K;
        switch (H5L) {
        case c4A:
            s7L[w0A] = O7K;
            break;
        }
        q9L[r0A](s7L);
        if (r5L[O3A] == undefined) {
            S7L = new createjs[h4A](d5L[p4A](o3A));
            S7L[a0A] = r5L[u4A] !== undefined ? r5L[u4A] : k7K;
            S7L[w0A] = r5L[k4A] !== undefined ? r5L[k4A] : m7K;
            q9L[r0A](S7L);
        }
        if (r5L[B3A] !== undefined) {
            V9L = V5L([[o6L, N4A + M5L, c6K]], a9L, z6K, s6K, F8K, q6K, I7K);
            V9L[w0A] = T7K;
            V9L[a0A] = K8K;
            I5L[r0A](V9L);
        }
        if (r5L[X3A] !== undefined) {
            R5L = new createjs[h4A](d5L[p4A](B4A));
            R5L[w0A] = r5L[G4A] !== undefined ? r5L[G4A] : P8K;
            R5L[a0A] = r5L[n4A] !== undefined ? r5L[n4A] : C8K;
            I5L[r0A](R5L);
            R5L[g4A] = R5L[V4A] = p7K;
            f6L();
        }
        e6L();
    }
    var p8A = 'response';
    var s8A = 'answered';
    var B8A = 'DENIED ACCESS';
    function q1K() {
        var m3A = "_finalChallengeInstruction2";
        var z3A = "_finalChallengeInstruction1";
        var M3A = "_text_landing_info";
        var H3A = "_text_fail_top_timed";
        var I3A = "_text_fail_middle_timed";
        var r3A = "_touch_button_info";
        var c3A = "_touch_done_info";
        var b3A = "_text_landing_button";
        var a3A = "_lang_only_custom";
        if (c5L[i0A][a3A] && H5L == c5L[i0A][a3A]) {
            if (c5L[i0A][b3A])
                w7L = c5L[i0A][b3A];
            if (c5L[i0A][c3A])
                if (H5L != g2A && H5L != V2A)
                    u5L = c5L[i0A][c3A][P0A](l2A);
                else
                    u5L = c5L[i0A][c3A][P0A](Z2A);
            if (c5L[i0A][r3A])
                if (H5L != g2A || H5L != V2A)
                    O5L = c5L[i0A][r3A][P0A](l2A);
                else
                    O5L = c5L[i0A][r3A][P0A](Z2A);
            if (c5L[i0A][I3A])
                if (H5L != g2A || H5L != V2A)
                    Z5L = c5L[i0A][I3A][P0A](l2A);
                else
                    Z5L = c5L[i0A][I3A][P0A](Z2A);
            if (c5L[i0A][H3A])
                if (H5L != g2A || H5L != V2A)
                    w9L = c5L[i0A][H3A][P0A](l2A);
                else
                    w9L = c5L[i0A][H3A][P0A](Z2A);
            if (c5L[i0A][M3A])
                u9L = c5L[i0A][M3A][P0A](l2A);
            if (c5L[i0A][z3A])
                if (H5L != g2A && H5L != V2A)
                    S9L = c5L[i0A][z3A][P0A](l2A);
                else
                    S9L = c5L[i0A][z3A][P0A](Z2A);
            if (c5L[i0A][m3A])
                if (H5L != g2A && H5L != V2A)
                    U5L = c5L[i0A][m3A][P0A](l2A);
                else
                    U5L = c5L[i0A][m3A][P0A](Z2A);
        } else if (!c5L[i0A][a3A]) {
            if (c5L[i0A][b3A])
                w7L = c5L[i0A][b3A];
            if (c5L[i0A][c3A])
                if (H5L != g2A && H5L != V2A)
                    u5L = c5L[i0A][c3A][P0A](l2A);
                else
                    u5L = c5L[i0A][c3A][P0A](Z2A);
            if (c5L[i0A][r3A])
                if (H5L != g2A || H5L != V2A)
                    O5L = c5L[i0A][r3A][P0A](l2A);
                else
                    O5L = c5L[i0A][r3A][P0A](Z2A);
            if (c5L[i0A][I3A])
                if (H5L != g2A || H5L != V2A)
                    Z5L = c5L[i0A][I3A][P0A](l2A);
                else
                    Z5L = c5L[i0A][I3A][P0A](Z2A);
            if (c5L[i0A][H3A])
                if (H5L != g2A || H5L != V2A)
                    w9L = c5L[i0A][H3A][P0A](l2A);
                else
                    w9L = c5L[i0A][H3A][P0A](Z2A);
            if (c5L[i0A][M3A])
                if (H5L != g2A && H5L != V2A)
                    u9L = c5L[i0A][M3A][P0A](l2A);
                else
                    u9L = c5L[i0A][M3A][P0A](Z2A);
            if (c5L[i0A][z3A])
                if (H5L != g2A && H5L != V2A)
                    S9L = c5L[i0A][z3A][P0A](l2A);
                else
                    S9L = c5L[i0A][z3A][P0A](Z2A);
            if (c5L[i0A][m3A])
                if (H5L != g2A && H5L != V2A)
                    U5L = c5L[i0A][m3A][P0A](l2A);
                else
                    U5L = c5L[i0A][m3A][P0A](Z2A);
        }
    }
    var F8A = "parseJSON";
    var E7A = 0.6;
    var Z7A = "getChildAt";
    function l0K(G2K) {
        l8L();
        x6L(G2K);
        if (G2K[x5A])
            C8L[C7L] = G2K[x5A];
        x8L();
    }
    var l7A = "getNumChildren";
    var V7A = "getMeasuredFPS";
    var n7A = "cache";
    var N7A = "lineWidth";
    var k7A = "center";
    var u7A = "textAlign";
    var D7A = "Text";
    var j7A = "tickID";
    var m7A = "checkboxgui";
    var M7A = "9";
    var H7A = "_meta_theme";
    var I7A = "textX";
    var r7A = "14px ";
    var c7A = "bold 14px ";
    var Q7A = "toFixed";
    var s7A = 0.25;
    var F7A = 0.2;
    var S7A = 0.1;
    function z1K() {
        f0K = s6K;
    }
    function y1K() {
        var U5A = "getEncryptionKey";
        parent[U5A](l0K);
    }
    var Y9A = 1.0;
    var X9A = 'default';
    var T9A = "rollout";
    var R9A = 'pointer';
    var A9A = "cursor";
    var e9A = "rollover";
    var d9A = "enabled";
    var i9A = "now";
    var Z9A = "body";
    var f9A = "fc2_dim_done_button";
    var V9A = "disable_mouse_over";
    function F1K(d3K) {
        var r8A = 'incorrect_guess';
        var c8A = 'result';
        var b8A = 'solved';
        var a8A = 'error';
        var i3K = $[F8A](d3K);
        if (i3K && i3K[a8A] == B8A) {
            Y8L();
            return;
        }
        if (i3K && i3K[p8A] == s8A) {
            V7L = q6K;
            if (i3K[b8A] == q6K) {
                y9L = q6K;
                K6L = i3K[c8A];
                if (K8L && !i5L)
                    N7L();
            } else
                H8L(i3K[r8A] - S7K);
        }
    }
    function e6L() {
        var V3A = "TEXT";
        var g3A = "_challenge_imgs";
        var q2K = [];
        var K2K = [];
        if (r5L[u3A] !== undefined)
            q2K[k3A]({
                id: N3A,
                src: r5L[u3A],
                type: createjs[F0A][G3A]
            });
        for (var L2K = o9K; L2K < j5L + S7K; L2K++)
            if (v8L && L2K == j5L) {
                if (!T5L)
                    q2K[k3A]({
                        id: n3A + L2K,
                        src: (P9L ? H9L : M0A) + v8L,
                        type: createjs[F0A][G3A]
                    });
            } else if (L2K == o9K)
                q2K[k3A]({
                    id: n3A + L2K,
                    src: (P9L ? H9L : M0A) + c5L[i0A][g3A][L2K],
                    type: x7L ? createjs[F0A][V3A] : createjs[F0A][G3A]
                });
            else
                K2K[k3A]({
                    id: n3A + L2K,
                    src: (P9L ? H9L : M0A) + c5L[i0A][g3A][L2K],
                    type: x7L ? createjs[F0A][V3A] : createjs[F0A][G3A]
                });
        if (!Q9L && !b9L)
            q2K[k3A]({
                id: f3A,
                src: s9L ? s9L : M7L + p9L + l3A + b7L + Z3A,
                type: createjs[F0A][G3A]
            });
        if (S8L)
            q2K[k3A]({
                id: C3A,
                src: S8L,
                type: createjs[F0A][G3A]
            });
        if (o7L)
            q2K[k3A]({
                id: J3A,
                src: o7L,
                type: createjs[F0A][G3A]
            });
        if (q2K[Q2A]) {
            D5L[E3A](q2K);
            X0K();
            TweenLite[y3A](this, Q7K, {
                onComplete: U6L,
                onCompleteParams: [D5L, o9K]
            });
        } else
            V6L();
        if (K2K[Q2A])
            t9L[E3A](K2K);
    }
    var g9A = "fc2_show_arrows";
    var k9A = "fc2_arrowbtn_y";
    var u9A = "col_y";
    var D9A = "col_x";
    function A0K() {
        N5L[d9A] = q6K;
        N5L[W6K](j5A, H6L);
        N5L[W6K](e9A, function(F3K) {
            document[Z9A][T6K][A9A] = R9A;
        });
        N5L[W6K](T9A, function(B3K) {
            document[Z9A][T6K][A9A] = X9A;
        });
    }
    var j9A = "col_height";
    var P9A = "col_width";
    var z9A = "InnerChildY";
    function n6L(p2K) {
        TweenLite[i3A](this);
        parent[d3A]();
        y7L++;
        D5L[e3A]();
        D5L[A3A]();
        D5L[R3A]();
        D5L[T3A]();
        D5L = new createjs[F0A](s6K,z6K,q6K);
        D5L[B0A](I7K);
        D5L[W6K](W0A, J6L);
        D5L[W6K](t0A, n6L);
        D5L[W6K](s0A, V6L);
        TweenLite[y3A](this, S7K, {
            onComplete: e6L
        });
    }
    var M9A = "InnerChildX";
    var H9A = "InnerChild";
    var c9A = "bezierCurveTo";
    var b9A = "moveTo";
    var a9A = "fc2_info2_wrap";
    var w9A = "fc2_info2_y";
    var p9A = "fc2_text_bg";
    var h9A = " ";
    var Q9A = "fc2_info1_wrap";
    var s9A = "Shadow";
    function N1K(N5K) {
        var k5K = N5K[Q2A];
        if (k5K == o9K)
            return s6K;
        while (--k5K) {
            var G5K = Math[M8A](Math[z8A]() * (k5K + S7K));
            N5K[k5K] = N5K[G5K];
            N5K[G5K] = N5K[k5K];
        }
    }
    var W9A = "closePath";
    var B9A = "lineTo";
    var O5A = 50.5;
    var Y5A = "beginStroke";
    var X5A = "setStrokeStyle";
    var T5A = "endFill";
    var R5A = "beginFill";
    var A5A = "showVictoryScreen";
    var d5A = "time_end_seconds";
    var i5A = "time_end";
    var x5A = "decryption_key";
    var y5A = "removeAllChildren";
    var E5A = "toString";
    var J5A = "checkAnswer";
    var V5A = "setClip";
    var g5A = "rawY";
    function W1K() {
        var B6K = 20000;
        var f8K = 210;
        I8L = q6K;
        o5L = new createjs[p0A]();
        o5L[w0A] = Q7K;
        o5L[a0A] = f8K;
        I5L[r0A](o5L);
        o5L[r0A](V5L([[Q0K, r7A + M5L, m5L]], e8K, m7K, q6K, I7K, y5L, I7K, r5L[p9A], s6K, s6K));
        TweenLite[I8A](o5L, n6K, {
            delay: n6K,
            alpha: o9K,
            onComplete: s1K
        });
        D7L = setTimeout(Y8L, B6K);
    }
    var n5A = "rawX";
    var G5A = "removeEventListener";
    var N5A = "update";
    function L1K() {
        TweenLite[i3A](r9L);
        TweenLite[y3A](r9L, S7A, {
            y: r5L[k9A] !== undefined ? r5L[k9A] : w8K
        });
    }
    var k5A = "/bannerbg.jpg";
    function m1K() {
        var F6A = "getSameFC";
        var S6A = "setTime";
        if (window[o6K][S0A])
            try {
                parent[S6A](p7L);
                parent[F6A]();
            } catch (s5K) {}
    }
    var u5A = "loadVictoryScreen";
    var D5A = "sec_nothing";
    var j5A = "click";
    var v5A = "red";
    var m5A = "fullWidth";
    var z5A = "fc2_add_btn_shadow";
    var M5A = "add_shadow";
    function D8L() {
        return B9L || I7L;
    }
    function U0K() {
        var o5A = 196.5;
        if (r5L[X3A] == undefined) {
            var f2K = w7K;
            g9L = new createjs[p0A]();
            d9L = new createjs[L4A]();
            d9L[q4A][R5A](R9L);
            d9L[q4A][Q4A](o9K, o9K, S7K, f2K);
            d9L[q4A][T5A]();
            var g2K = new createjs[L4A]();
            var V2K = o9K;
            g2K[q4A][X5A](S7K);
            g2K[q4A][Y5A](R9L);
            g2K[q4A][Q4A](-V2K / F7K, -V2K / F7K, g8K, f2K + V2K);
            g9L[r0A](g2K);
            g9L[r0A](d9L);
            g9L[w0A] = O5A;
            g9L[a0A] = o5A;
            I5L[r0A](g9L);
        }
        I5L[N5A]();
    }
    var H5A = "Width";
    var I5A = "fc2_all_button_width";
    var r5A = "autoWidth";
    var c5A = "centerButton";
    function N0K() {
        var I6A = "restart_frames_to_average_fps";
        var r6A = "restart_low_fps";
        var c6A = "restart_ms_before_check_fps";
        var b6A = "low_fps_restart_list";
        var a6A = "lowFPSFallback";
        var w6A = "disable_low_fps_link";
        var p6A = "frames_to_average_fps";
        var h6A = "low_fps";
        var Q6A = "ms_before_check_fps";
        if (!t8L) {
            function r5K(j5K, D5K, I5K, M5K) {
                var K6A = "hidden";
                var F6K = 3000;
                if (!b8L)
                    return s6K;
                if (Y5L)
                    return s6K;
                if (!J8L)
                    return s6K;
                if (document[K6A]) {
                    E8L = o9K;
                    J8L = Date[i9A]();
                    return s6K;
                }
                E8L++;
                I5K = Number(I5K || Y8K);
                if (E8L < I5K)
                    return s6K;
                var z5K = Number(j5K || F6K);
                var m5K = Number(D5K || I7K);
                var v5K = typeof M5K !== undefined ? !!M5K : s6K;
                var P5K = Date[i9A]() - J8L > z5K;
                var H5K = createjs[K0A][V7A](I5K);
                if (!v5K && P5K && H5K < m5K)
                    return Math[A6K](H5K) || S7K;
                return s6K;
            }
            I5L[N5A]();
            if (!j6L) {
                var b5K = r5K(r5L[Q6A], r5L[h6A], r5L[p6A], r5L[w6A]);
                if (b5K) {
                    j6L = q6K;
                    parent[a6A](b5K);
                }
            }
            if (!D6L && r5L[b6A]) {
                var c5K = r5K(r5L[c6A], r5L[r6A], r5L[I6A]);
                if (c5K) {
                    D6L = q6K;
                    parent[a6A](c5K, r5L[b6A]);
                }
            }
        }
    }
    var b5A = "pulseButton";
    var a5A = "btnbgColor2";
    var w5A = "btnbgColor";
    var p5A = "overlayColor";
    var h5A = "fc2_all_button_auto_center";
    var Q5A = "textCenter";
    var K5A = "fc2_button_text_y";
    var q5A = "textY";
    var L5A = "fc2_button_text_colour";
    function U8L() {
        if (L8L) {
            L8L = s6K;
            I9L[y4A] = o9K;
            TweenLite[i3A](I9L);
            TweenLite[y3A](I9L, n6K, {
                alpha: o9K
            });
        }
    }
    function i0K() {
        Y5L = q6K;
        O9L[k3A]((Math[A6K](k5L * Q7K) / Q7K)[Q7A](F7K));
        v5L[r0A](z5L);
        z5L[a0A] = I8K;
        TweenLite[y3A](z5L, n6K, {
            scaleX: s7A,
            scaleY: s7A,
            x: -j7K,
            y: m8K
        });
        e5L++;
        n7L = q6K;
        p0K();
        p6L();
        q0K();
    }
    var s5A = "text";
    var t5A = "taper";
    var W5A = "arrowType";
    var B5A = "hasStroke";
    var F5A = "strokeColour";
    function P1K() {
        if (D9L)
            D9L[E4A] = s6K;
    }
    var S5A = "strokeSize";
    var o4A = "colStrokeSize";
    var O4A = "Height";
    var Y4A = "toUpperCase";
    var X4A = "fc2_btn_txt_toupper";
    var T4A = "fc2_button_border_thickness";
    var R4A = "fc2_stroke_colour";
    var A4A = "px ";
    var e4A = "28";
    var d4A = "fc2_button_font_size";
    var i4A = "th";
    var x4A = "fc2_all_button_height";
    var y4A = "alpha";
    var E4A = "visible";
    var J4A = "removeChild";
    var C4A = "clearTimeout";
    var l4A = "rotation";
    function w6L() {
        if (i5L)
            return;
        if (X9L)
            parent[u5A](m6L, z6K, z6K, W8L);
        if (o5L) {
            createjs[K0A][G5A](h0A, R8L);
            TweenLite[i3A](o5L);
            I5L[J4A](o5L);
        }
        i5L = q6K;
        U8L();
        p7L += x9L;
        x9L = o9K;
        var W4K = p7L / createjs[K0A][V7A]();
        W4K = W4K[Q7A](S7K);
        var F4K = new createjs[p0A]();
        F4K[w0A] = F8K;
        F4K[a0A] = b8K;
        I5L[r0A](F4K);
        var t4K = V5L(z6K, p8K, J7K, z6K, z6K, z6K, z6K, v7L, s6K, s6K);
        t4K[w0A] = p7K;
        F4K[r0A](t4K);
        var s4K = r7A + M5L;
        if (j5L != o9K) {
            var B4K = new createjs[D7A](W4K + h9A + n8L,s4K,A5L);
            B4K[u7A] = k7A;
            B4K[N7A] = b8K;
            B4K[w0A] = R7K;
            B4K[a0A] = j7K;
        }
        F4K[r0A](B4K);
        TweenLite[y3A](F4K, n6K, {
            delay: P8A,
            alpha: o9K,
            onComplete: k7L,
            onCompleteParams: [F4K]
        });
        Q1K(W4K);
        s0K += L9L;
        h1K(L9L);
        document[Z9A][T6K][A9A] = X9A;
        if (!c5L[D5A])
            V1K();
        TweenLite[y3A](this, q8L ? F7K : B7K, {
            onComplete: m0K
        });
    }
    var V4A = "regY";
    var g4A = "regX";
    var v4A = "ja";
    var I4A = "zh-hk";
    function d6L() {
        if (l7L == o9K && !Y5L && !i5L)
            if (!L8L) {
                L8L = q6K;
                I9L[E4A] = q6K;
                F6L(I9L, Y9A, t7K);
            }
    }
    var c4A = "zh-tw";
    var a4A = "15px ";
    var p4A = "getResult";
    var h4A = "Bitmap";
    var Q4A = "drawRect";
    var K4A = "beginLinearGradientFill";
    var q4A = "graphics";
    var L4A = "Shape";
    var t4A = "meta_bg";
    var W4A = "landingbg";
    var B4A = "loading_image";
    function f7L(q3K) {
        s8L++;
        if (!a7L && s8L > j7K) {
            a7L = q6K;
            k5L = k5L + p8L;
            TweenLite[y3A](W7L, n6K, {
                rotation: k5L,
                onComplete: b6L
            });
            M6L();
        }
    }
    var o3A = "meta_logo";
    var O3A = "fc2_disable_meta_logo";
    var X3A = "fc2_loading_image";
    var T3A = "close";
    var R3A = "removeAllEventListeners";
    var A3A = "removeAll";
    var e3A = "reset";
    var d3A = "boostRefresh";
    var i3A = "killTweensOf";
    var U3A = "progress";
    var y3A = "to";
    function E6L() {
        if (!M8L)
            P7L = s6K;
        else
            c7L();
    }
    var E3A = "loadManifest";
    var J3A = "customFailCrossAsset";
    var C3A = "customStarAsset";
    var Z3A = "/appbg.jpg";
    var l3A = "/";
    function u0K(q5K) {
        TweenLite[y3A](q5K, n6K, {
            scaleX: O8A,
            scaleY: O8A
        });
        TweenLite[y3A](q5K, n6K, {
            delay: n6K,
            scaleX: S7K,
            scaleY: S7K,
            onComplete: u0K,
            onCompleteParams: [q5K]
        });
    }
    var f3A = "bg";
    var n3A = "obj";
    var G3A = "IMAGE";
    var N3A = "wellDoneImage";
    function w0K() {
        if (I7L) {
            Y5L = q6K;
            v5L[r0A](z5L);
            z5L[a0A] = I8K;
            TweenLite[y3A](z5L, n6K, {
                scaleX: s7A,
                scaleY: s7A,
                x: -j7K,
                y: m8K
            });
            e5L++;
        }
        O9L[k3A]((Math[A6K](k5L * Q7K) / Q7K)[Q7A](F7K));
        parent[J5A](u7L, Z7L, p9L, O9L[E5A](), R0K);
        I7L && a0K();
    }
    var k3A = "push";
    var u3A = "fc2_well_done_image";
    function V0K(J9K) {
        if (r5L[X3A] !== undefined) {
            TweenLite[i3A](R5L);
            I5L[J4A](R5L);
        } else
            I5L[J4A](Y9L);
        M9L[E4A] = q6K;
        TweenLite[I8A](M9L, l8A, {
            alpha: o9K
        });
        M9L[W6K](j5A, q6L);
    }
    var w3A = 'rtl';
    function R0K(y3K) {
        var Q8A = "incorrect_guess";
        var K8A = "result";
        var q8A = "solved";
        var L8A = "hideTimedModeTimer";
        var t8A = 'timed_mode_timeout';
        var W8A = "response";
        l8L();
        if (B9L)
            e5L++;
        y3K = $[F8A](y3K);
        if (y3K && y3K[t0A] == B8A) {
            Y8L();
            return;
        }
        if (y3K && y3K[W8A] == t8A) {
            S6L();
            return;
        }
        if (y3K && y3K[i5A]) {
            f8L = y3K[i5A];
            V8L = y3K[d5A];
            b0K();
        }
        if (y3K && y3K[x5A]) {
            C7L++;
            C8L[C7L] = y3K[x5A];
        }
        if (y3K && y3K[W8A] == s8A) {
            parent[L8A]();
            V7L = q6K;
            if (y3K[q8A] == q6K) {
                y9L = q6K;
                K6L = y3K[K8A];
                if (K8L && !i5L)
                    N7L();
            } else
                H8L(y3K[Q8A] - S7K);
        } else if (B9L)
            a0K();
    }
    var p3A = "direction";
    var B3A = "fc2_constant_verification_title";
    var i2A = "fail_info_timed_middle_hidden";
    var Z2A = "\n";
    var l2A = ",";
    var V2A = 'fr';
    var g2A = 'es';
    var M2A = 'nextAppLoaded';
    function k1K() {
        var P5A = "transparent";
        var U4A = "fc2_verifybtn_y";
        var t8K = 88;
        var P2K = r5L[U4A] !== undefined ? r5L[U4A] : g8K;
        var m2K = t8K;
        var j2K = r5L[x4A] !== undefined ? r5L[x4A] : j7K;
        var v2K = l5L / F7K - m2K / F7K;
        switch (H5L) {
        case i4A:
            v2K = A7K;
            m2K = D8K;
            break;
        }
        var D2K = j7L + (r5L[d4A] !== undefined ? r5L[d4A] : e4A) + A4A + M5L;
        var u2K = r5L[R4A];
        var z2K = r5L[T4A];
        if (r5L[X4A] !== undefined)
            w7L = w7L[Y4A]();
        n5L = F7L([[O4A, j2K], [o4A, s8K], [S5A, z2K], [F5A, u2K], [B5A, z2K === o9K ? s6K : q6K], [W5A, T8L == S7K ? S7K : F7K], [t5A, z9L], [s5A, [w7L, D2K, r5L[L5A] ? r5L[L5A] : G9L]], [q5A, r5L[K5A] !== undefined ? r5L[K5A] : s7K], [Q5A, r5L[h5A] !== undefined ? r5L[h5A] : s6K], [p5A, C9L], [w5A, A9L], [a5A, l9L], [b5A, j8L], [c5A, N8L], [r5A, r5L[I5A] !== undefined ? s6K : q6K], [H5A, r5L[I5A] !== undefined ? r5L[I5A] : z6K], [M5A, r5L[z5A] !== undefined ? q6K : s6K]]);
        n5L[w0A] = v2K;
        n5L[a0A] = P2K;
        n5L[E4A] = q6K;
        if (N8L)
            n5L[w0A] = j8K;
        D9L = F7L([[H5A, n5L[m5A] + q7K], [O4A, g7K], [o4A, s8K], [S5A, z2K], [F5A, v5A], [B5A, z2K === o9K ? s6K : q6K], [t5A, z9L], [p5A, C9L], [w5A, P5A], [a5A, P5A], [q5A, r5L[K5A] !== undefined ? r5L[K5A] : s7K]]);
        D9L[w0A] = n5L[g4A] + n5L[w0A] - n5L[m5A] - W7K;
        D9L[a0A] = n5L[a0A] - I7K;
        q9L[r0A](D9L);
        D9L[E4A] = s6K;
        q9L[r0A](n5L);
        n5L[W6K](j5A, c7L);
        if (c5L[D5A] === S7K)
            if (!X9L && !v9L)
                parent[u5A](Z9L ? Z9L : M7L + p9L + l3A + b7L + k5A);
        if (r5L[X3A] !== undefined) {
            TweenLite[i3A](R5L);
            I5L[J4A](R5L);
        } else
            I5L[J4A](g9L);
        I5L[N5A]();
    }
    function a0K() {
        n7L = q6K;
        p6L();
        q0K();
        G7L();
    }
    var I2A = "#FunCAPTCHA";
    var Q2A = "length";
    function e0K() {
        var y9A = "mouseup";
        var C9A = "keypress";
        var l9A = "fc2_gobtn_y";
        var n9A = "in";
        var G9A = "pressup";
        var N9A = "mousedown";
        var v9A = "undefined";
        var m9A = "fc2_rotate_stroke";
        var I9A = "fc2_rotate_bg";
        var r9A = "fc2_stroke_size";
        var K9A = "13px";
        var q9A = "14px";
        var L9A = "fc2_info1_y";
        var t9A = "fc2_help_arrow_y";
        var F9A = "green";
        var S9A = "fc2_help_arrow_colour";
        var J8K = 229;
        var V8K = 205;
        var M8K = 135;
        var Q8K = 105;
        var L8K = 93;
        var f7K = 42;
        var V7K = 41;
        var n7K = 39;
        var v7K = 26;
        var z7K = 24;
        if (!X9L && !v9L)
            parent[u5A](Z9L ? Z9L : M7L + p9L + l3A + b7L + k5A, z6K, z6K, W8L);
        I5L[J4A](q9L);
        g1K();
        if (b9L && z7L)
            k9L = l6L();
        else if (Q9L)
            k9L = new createjs[h4A](d5L[p4A](f3A));
        else
            k9L = new createjs[h4A](D5L[p4A](f3A));
        I5L[r0A](k9L);
        I5L[r0A](W9L);
        W9L[E4A] = s6K;
        I9L = new createjs[p0A]();
        I5L[r0A](I9L);
        I9L[E4A] = s6K;
        t7L = new createjs[L4A]();
        t7L[q4A][R5A](r5L[S9A] ? r5L[S9A] : F9A)[B9A](g7K, o9K)[B9A](g7K, -s7K)[B9A](i7K, W7K)[B9A](g7K, a7K)[B9A](g7K, q7K)[B9A](o9K, q7K)[B9A](o9K, o9K)[W9A]();
        t7L[l4A] = M8K;
        t7L[w0A] = Q8K;
        t7L[a0A] = r5L[t9A] !== undefined ? r5L[t9A] : o7K;
        I9L[r0A](t7L);
        B7L = new createjs[L4A]();
        B7L[q4A][R5A](r5L[S9A] ? r5L[S9A] : F9A)[B9A](g7K, o9K)[B9A](g7K, -s7K)[B9A](i7K, W7K)[B9A](g7K, a7K)[B9A](g7K, q7K)[B9A](o9K, q7K)[B9A](o9K, o9K)[W9A]();
        B7L[l4A] = Z7K;
        B7L[w0A] = V8K;
        B7L[a0A] = r5L[t9A] !== undefined ? r5L[t9A] - j7K : T7K;
        I9L[r0A](B7L);
        n9L = new createjs[p0A]();
        n9L[g4A] = l5L / F7K;
        n9L[w0A] = l5L / F7K;
        n9L[a0A] = i7K;
        I5L[r0A](n9L);
        g7L = new createjs[p0A]();
        g7L[w0A] = o9K;
        g7L[a0A] = K8K;
        n9L[r0A](g7L);
        z6L = new createjs[p0A]();
        n9L[r0A](z6L);
        e7L = new createjs[p0A]();
        n9L[r0A](e7L);
        v5L = new createjs[p0A]();
        I5L[r0A](v5L);
        G1K = new createjs[s9A](c6K,S7K,S7K,B7K);
        C5L = new createjs[p0A]();
        C5L[w0A] = T7K;
        C5L[a0A] = r5L[L9A] !== undefined ? r5L[L9A] : Q7K;
        I5L[r0A](C5L);
        var i2K = l5L - C5L[w0A] / F7K;
        var E2K = q9A;
        switch (H5L) {
        case v4A:
            E2K = K9A;
            break;
        }
        if (r5L[Q9A] == undefined)
            C5L[r0A](V5L([[O5L[o9K], M6K + E2K + h9A + M5L, m5L], [O5L[S7K], E2K + h9A + M5L, m5L]], i2K, J7K, s6K, F8K, y5L, I7K, r5L[p9A], s6K, s6K));
        else
            C5L[r0A](V5L([[O5L[o9K] + (O5L[S7K] ? h9A + O5L[S7K] : p6K), E2K + h9A + M5L, m5L]], i2K, J7K, s6K, F8K, y5L, I7K, r5L[p9A], s6K, s6K));
        g5L = new createjs[p0A]();
        g5L[w0A] = T7K;
        g5L[a0A] = r5L[w9A] !== undefined ? r5L[w9A] : t7K;
        I5L[r0A](g5L);
        TweenLite[y3A](g5L, o9K, {
            alpha: o9K
        });
        var y2K = l5L - g5L[w0A] / F7K;
        if (r5L[a9A] == undefined)
            g5L[r0A](V5L([[u5L[o9K], E2K + h9A + M5L, m5L], [u5L[S7K], M6K + E2K + h9A + M5L, m5L], [u5L[F7K], E2K + h9A + M5L, m5L]], y2K, T7K, s6K, L8K, y5L, I7K, r5L[p9A], s6K, s6K));
        else
            g5L[r0A](V5L([[u5L[o9K] + (u5L[S7K] ? h9A + u5L[S7K] : p6K) + (u5L[F7K] ? h9A + u5L[F7K] : p6K), E2K + h9A + M5L, m5L]], y2K, T7K, s6K, L8K, y5L, I7K, r5L[p9A], s6K, s6K));
        g5L[w0A] = l5L / F7K - L8K;
        T9L = new createjs[p0A]();
        I5L[r0A](T9L);
        T7L = new createjs[L4A]();
        var U2K = o9K
          , x2K = H7K
          , J2K = r7K;
        T7L[q4A][X5A](B7K, S7K)[b9A](U2K, x2K)[Y5A](f5L)[c9A](-F7K, z7K, -t7K, o9K, J2K, o9K)[X5A](o9K, r5L[r9A])[R5A](f5L)[b9A](J2K, -W7K)[B9A](J2K + Q7K, o9K)[B9A](J2K, W7K)[B9A](J2K, -W7K);
        T7L[w0A] = o9K;
        T7L[a0A] = o9K;
        h9L = F7L([[H5A, f7K], [O4A, f7K], [o4A, j7K], [t5A, z9L], [Q5A, q6K], [p5A, C9L], [w5A, r5L[I9A] === q6K || r5L[I9A] === undefined ? F9L : z6K], [a5A, r5L[I9A] === q6K || r5L[I9A] === undefined ? c9L : z6K], [H9A, T7L], [M9A, L7K], [z9A, H7K], [q5A, r5L[K5A] !== undefined ? r5L[K5A] : s7K], [B5A, typeof r5L[m9A] !== v9A ? r5L[m9A] : q6K], [P9A, F8K], [j9A, p8K], [D9A, -I7K], [u9A, -j7K]]);
        h9L[a0A] = r5L[k9A] !== undefined ? r5L[k9A] : w8K;
        h9L[w0A] = v7K;
        T9L[r0A](h9L);
        h9L[W6K](N9A, R6L);
        h7L = new createjs[L4A]();
        h7L[q4A][X5A](B7K, S7K)[b9A](U2K, x2K)[Y5A](f5L)[c9A](-F7K, z7K, -t7K, o9K, J2K, o9K)[X5A](o9K, r5L[r9A])[R5A](f5L)[b9A](J2K, -W7K)[B9A](J2K + Q7K, o9K)[B9A](J2K, W7K)[B9A](J2K, -W7K);
        h7L[w0A] = o9K;
        h7L[a0A] = o9K;
        h7L[Y6K] = -S7K;
        r9L = F7L([[H5A, f7K], [O4A, f7K], [q5A, r5L[K5A] !== undefined ? r5L[K5A] : s7K], [o4A, j7K], [t5A, z9L], [Q5A, q6K], [p5A, C9L], [w5A, r5L[I9A] === q6K || r5L[I9A] === undefined ? F9L : z6K], [a5A, r5L[I9A] === q6K || r5L[I9A] === undefined ? c9L : z6K], [H9A, h7L], [M9A, N7K], [z9A, H7K], [B5A, r5L[m9A] !== undefined ? r5L[m9A] : q6K], [P9A, F8K], [j9A, p8K], [D9A, -I7K], [u9A, -j7K]]);
        r9L[a0A] = r5L[k9A] !== undefined ? r5L[k9A] : w8K;
        r9L[w0A] = J8K;
        T9L[r0A](r9L);
        r9L[W6K](N9A, T6L);
        I5L[W6K](G9A, function(X2K) {
            createjs[K0A][G5A](h0A, f7L);
        });
        var e2K = V7K;
        var A2K = j7L + (r5L[d4A] !== z6K ? r5L[d4A] : e4A) + A4A + M5L;
        var R2K = r5L[x4A] !== undefined ? r5L[x4A] : j7K;
        var d2K = r5L[T4A];
        var T2K = r5L[R4A];
        switch (H5L) {
        case n9A:
            e2K = n7K;
            break;
        }
        if (r5L[X4A] !== undefined)
            G8L = G8L[Y4A]();
        N5L = F7L([[O4A, R2K], [q5A, r5L[K5A] !== undefined ? r5L[K5A] : s7K], [o4A, s8K], [B5A, d2K === o9K ? s6K : q6K], [S5A, d2K], [F5A, T2K], [W5A, r5L[g9A] !== undefined ? F7K : S7K], [t5A, z9L], [s5A, [G8L, A2K, r5L[L5A] ? r5L[L5A] : G9L]], [p5A, C9L], [w5A, A9L], [a5A, l9L], [b5A, g6L], [r5A, r5L[I5A] !== undefined ? s6K : q6K], [H5A, r5L[I5A] !== undefined ? r5L[I5A] : z6K], [c5A, q6K], [Q5A, r5L[h5A] !== undefined ? r5L[h5A] : s6K], [V9A, r5L[f9A] !== undefined ? q6K : s6K], [M5A, r5L[z5A] !== undefined ? q6K : s6K]]);
        N5L[w0A] = j8K;
        N5L[a0A] = r5L[l9A] !== undefined ? r5L[l9A] : Z8K;
        if (r5L[f9A] == undefined)
            N5L[E4A] = s6K;
        else
            N5L[y4A] = n6K;
        T9L[r0A](N5L);
        C0K();
        $(Z9A, document)[C9A](function(Y2K) {
            var E9A = "which";
            var J9A = "keyCode";
            var G7K = 38;
            var O2K = Y2K[J9A] || Y2K[E9A];
            if (!(O2K == G7K))
                d6L();
        });
        I5L[W6K](y9A, function(o2K) {
            if (!Y5L && !i5L)
                if (i8L)
                    i8L = s6K;
        });
        I5L[W6K](N9A, function(S3K) {
            var x9A = "stageY";
            var U9A = "stageX";
            var y8K = 235;
            var G8K = 190;
            var h8K = 108;
            if (!i5L && !Y5L && S3K[U9A] > o9K && S3K[U9A] < A8K && S3K[x9A] > o9K && S3K[x9A] < d8K) {
                I0K = W7L[l4A];
                i8L = q6K;
                X6L[k3A]([o9K, S3K[U9A], S3K[x9A]]);
                if (!(S3K[U9A] < i7K && S3K[x9A] > p8K && S3K[x9A] < u8K || S3K[U9A] > y8K && S3K[x9A] > p8K && S3K[x9A] < u8K || S3K[U9A] > h8K && S3K[U9A] < G8K && S3K[x9A] > G8K))
                    d6L();
            }
        });
        if (!o8L)
            if (r5L[B3A] !== undefined) {
                I5L[r0A](V9L);
                TweenLite[y3A](V9L, n6K, {
                    y: o9K,
                    alpha: S7K
                });
                C5L[y4A] = o9K;
                h9L[y4A] = o9K;
                r9L[y4A] = o9K;
                TweenLite[y3A](C5L, n6K, {
                    delay: n6K,
                    alpha: S7K
                });
                TweenLite[y3A](h9L, n6K, {
                    delay: n6K,
                    alpha: S7K
                });
                TweenLite[y3A](r9L, n6K, {
                    delay: n6K,
                    alpha: S7K
                });
                setTimeout(function() {
                    G7L(S7K);
                }, Y8K);
            } else
                G7L(S7K);
        else
            H8L(-F7K);
        createjs[K0A][W6K](h0A, h0K);
        J8L = Date[i9A]();
        if (y8L || J7L)
            I5L[r0A](L7L);
    }
    var t2A = "extra_data";
    var v1A = "_pulse_verify";
    var i0A = "customGUI";
    var P0A = "split";
    function d0K() {
        Y5L = s6K;
    }
    var M0A = '';
    var r0A = "addChild";
    var c0A = "game_meta";
    var a0A = "y";
    var w0A = "x";
    var p0A = "Container";
    var h0A = "tick";
    var Q0A = "setFPS";
    var K0A = "Ticker";
    var s0A = "complete";
    var t0A = "error";
    var W0A = "fileload";
    function b0K() {
        var h8A = "ShowTimedModeTimer";
        parent[h8A](f8L, V8L, e5L === o9K);
    }
    var B0A = "setMaxConnections";
    var F0A = "LoadQueue";
    var S0A = "document";
    function r1K() {
        var T8A = 217.5;
        var R8A = "fc2_tryagainbtn_y";
        var H8K = 134;
        var e4K = F8K;
        var A4K = H8K;
        switch (H5L) {
        case i4A:
            e4K = i7K;
            A4K = u8K;
            break;
        }
        var R4K = j7L + (r5L[d4A] !== z6K ? r5L[d4A] : e4A) + A4A + M5L;
        var T4K = r5L[x4A] !== undefined ? r5L[x4A] : j7K;
        var X4K = r5L[T4A];
        var Y4K = r5L[R4A];
        if (r5L[X4A] !== undefined)
            g8L = g8L[Y4A]();
        M9L = F7L([[O4A, T4K], [o4A, s8K], [q5A, r5L[K5A] !== undefined ? r5L[K5A] : s7K], [B5A, X4K === o9K ? s6K : q6K], [S5A, S7K], [F5A, Y4K], [W5A, r5L[g9A] !== undefined ? F7K : S7K], [t5A, z9L], [s5A, [g8L, R4K, r5L[L5A] ? r5L[L5A] : f5L]], [p5A, C9L], [w5A, A9L], [a5A, l9L], [r5A, r5L[I5A] !== undefined ? s6K : q6K], [H5A, r5L[I5A] !== undefined ? r5L[I5A] : z6K], [c5A, q6K], [Q5A, r5L[h5A] !== undefined ? r5L[h5A] : s6K], [M5A, r5L[z5A] !== undefined ? q6K : s6K]]);
        M9L[w0A] = l5L / F7K;
        M9L[a0A] = r5L[R8A] !== undefined ? r5L[R8A] : T8A;
        I5L[r0A](M9L);
        M9L[E4A] = s6K;
    }
    var o6K = "parent";
    var O6K = "scaleY";
    var Y6K = "scaleX";
    var T6K = "style";
    var A6K = "round";
    var d6K = "setAttribute";
    var y6K = "enableMouseOver";
    var Z6K = "height";
    var l6K = "width";
    var g6K = "getClr";
    var n6K = 0.5;
    var G6K = "images/template/fc_meta_solve_welldone.png";
    var N6K = "MSIE 10";
    var k6K = "appVersion";
    function Y8L() {
        var H8A = "setupSameChallenge";
        parent[H8A]();
        q6L();
    }
    var u6K = "android";
    function Z0K() {
        if (x5L == j5L + S7K)
            if (U5L) {
                g5L[y5A]();
                if (r5L[a9A] == undefined)
                    g5L[r0A](V5L([[U5L[o9K], r7A + M5L, m5L], [U5L[S7K], c7A + M5L, m5L], [U5L[F7K], r7A + M5L, m5L]], u8K, A7K, s6K, B8K, y5L, I7K, r5L[p9A], s6K, s6K));
                else
                    g5L[r0A](V5L([[U5L[o9K] + (U5L[S7K] ? h9A + U5L[S7K] : p6K) + (U5L[F7K] ? h9A + U5L[F7K] : p6K), r7A + M5L, m5L]], e8K, A7K, s6K, B8K, y5L, I7K, r5L[p9A], s6K, s6K));
                g5L[w0A] = l5L / F7K - B8K;
            }
    }
    function V1K() {
        var i6A = "disable";
        X5L[Z6A] = function() {}
        ;
        if (createjs[C6A][J6A]())
            createjs[C6A][i6A](I5L);
        else
            I5L[y6K](o9K);
    }
    function h0K() {
        if (!t8L) {
            if (!Y5L && !z8L)
                x9L++;
            if (z8L)
                k0K++;
        }
        if (t6L)
            if (r0K < o9K) {
                t6L = s6K;
                S6L();
            } else
                r0K -= S7K / createjs[K0A][V7A]();
    }
    var D6K = "indexOf";
    var j6K = "toLowerCase";
    function s1K() {
        if (!v5L)
            return z6K;
        var O3K = F7K;
        var S4K = Math[M8A](Math[z8A]() * B7K);
        for (var o3K = o9K; o3K <= v5L[l7A]() - S7K; o3K++) {
            var Y3K = v5L[Z7A](o3K);
            switch (S4K) {
            case o9K:
                Y3K[m8A] = O3K;
                Y3K[v8A] = O3K;
                break;
            case S7K:
                Y3K[m8A] = -O3K;
                Y3K[v8A] = O3K;
                break;
            case F7K:
                Y3K[m8A] = O3K;
                Y3K[v8A] = -O3K;
                break;
            case B7K:
                Y3K[m8A] = -O3K;
                Y3K[v8A] = -O3K;
                break;
            }
            if (Y3K != z5L)
                TweenLite[y3A](Y3K, n6K, {
                    alpha: o9K,
                    onComplete: k7L,
                    onCompleteParams: [Y3K]
                });
        }
        createjs[K0A][W6K](h0A, R8L);
    }
    var P6K = "userAgent";
    var v6K = "/landingbg.jpg";
    var m6K = "en";
    function f6L() {
        var Z4A = "easeNone";
        var f4A = "getChildIndex";
        var T8K = 360;
        if (I5L[f4A](R5L)) {
            R5L[l4A] = o9K;
            TweenLite[y3A](R5L, S7K, {
                rotation: T8K,
                onComplete: f6L,
                ease: Linear[Z4A]
            });
        }
    }
    var z6K = null;
    var M6K = "bold ";
    var H6K = "Arial";
    var I6K = "#eafdfd";
    var r6K = "#f4f7fd";
    var c6K = "#000000";
    var b6K = "#FFFFFF";
    function p0K() {
        if (B6L) {
            parent[J5A](u7L, Z7L, p9L, O9L[E5A](), S1K);
            if (e5L == j5L - (T5L ? S7K : o9K)) {
                V7L = q6K;
                y9L = q6K;
            }
        } else
            parent[J5A](u7L, Z7L, p9L, O9L[E5A](), F1K);
    }
    var a6K = "#ffbb36";
    var w6K = "#ffd33a";
    var p6K = "";
    var h6K = "/fc/";
    var Q6K = "/fc/ip/?url=";
    var K6K = "/fc/i/";
    function c7L(k2K) {
        var l5A = "getEncryptionTime";
        var f5A = "sc";
        var S6K = 1500;
        if (!M8L)
            return s6K;
        if (n5L)
            n5L[E4A] = s6K;
        if (k2K) {
            n5L[G5A](j5A, c7L);
            if (k2K[n5A] && k2K[g5A])
                $[V5A](f5A, [k2K[n5A], k2K[g5A]]);
        }
        if (I7L) {
            x8L();
            x6L(parent[l5A]());
            return;
        }
        if (B9L) {
            TweenLite[y3A](n5L, n6K, {
                alpha: o9K
            });
            y1K();
            r6L(S6K);
        } else
            x8L();
    }
    var q6K = true;
    var L6K = "message";
    var s6K = false;
    var t6K = "DOMContentLoaded";
    var W6K = "addEventListener";
    var O8K = 1000;
    function K0K() {
        var s4A = "/images/meta/fc_meta_bg.png";
        var F4A = "/images/meta/fc_nf_meta_logo.png";
        var S4A = "/images/meta/fc_nf_meta_logo_white.png";
        q9L = new createjs[p0A]();
        I5L[r0A](q9L);
        d5L = new createjs[F0A](s6K,z6K,q6K);
        d5L[W6K](t0A, O0K);
        d5L[W6K](s0A, C6L);
        var r2K = [];
        if (r5L[O3A] == undefined)
            if (S7L)
                r2K[k3A]({
                    id: o3A,
                    src: S7L,
                    type: createjs[F0A][G3A]
                });
            else if (W6L)
                r2K[k3A]({
                    id: o3A,
                    src: U9L + S4A,
                    type: createjs[F0A][G3A]
                });
            else
                r2K[k3A]({
                    id: o3A,
                    src: U9L + F4A,
                    type: createjs[F0A][G3A]
                });
        if (r5L[X3A] !== undefined)
            r2K[k3A]({
                id: B4A,
                src: r5L[X3A],
                type: createjs[F0A][G3A]
            });
        if (Q9L || N9L) {
            if (N9L)
                r2K[k3A]({
                    id: W4A,
                    src: B8L,
                    type: createjs[F0A][G3A]
                });
            if (Q9L && !b9L)
                r2K[k3A]({
                    id: f3A,
                    src: s9L ? s9L : M7L + p9L + l3A + b7L + Z3A,
                    type: createjs[F0A][G3A]
                });
        } else if (!(b9L && z7L))
            if (Q9L || N9L) {
                if (N9L)
                    r2K[k3A]({
                        id: W4A,
                        src: B8L,
                        type: createjs[F0A][G3A]
                    });
                if (Q9L)
                    r2K[k3A]({
                        id: f3A,
                        src: s9L ? s9L : M7L + p9L + l3A + b7L + Z3A,
                        type: createjs[F0A][G3A]
                    });
            } else
                r2K[k3A]({
                    id: t4A,
                    src: U9L + s4A,
                    type: createjs[F0A][G3A]
                });
        if (r2K[Q2A])
            d5L[E3A](r2K);
        else
            C6L();
    }
    var Y8K = 500;
    var A8K = 300;
    var e8K = 280;
    function M6L() {
        if (z5L[a0A] > t7K) {
            TweenLite[i3A](z5L);
            e8L = z5L[a0A] - a7K;
            TweenLite[y3A](z5L, F7A, {
                y: e8L,
                onComplete: I1K
            });
        }
    }
    function b1K() {
        var d8A = "fc2_timeout_arrow_colour";
        var i8A = "fc2_timed_out_arrow_y";
        var x8A = "fc2_timed_out_arrow_x";
        var U8A = 'object';
        var y8A = "timerTimeout";
        var x7K = 58;
        var P7K = 28;
        parent[y8A]();
        if (z5L) {
            TweenLite[y3A](z5L, n6K, {
                alpha: o9K,
                onComplete: k7L,
                onCompleteParams: [z5L]
            });
            k7L(v5L);
        }
        J5L = new createjs[p0A]();
        J5L[w0A] = T7K;
        I5L[r0A](J5L);
        var E4K = I7K;
        var x4K = D8K;
        if (m7L)
            x4K = l5L - J5L[w0A] / F7K;
        if (r5L[a9A] == undefined)
            J5L[r0A](V5L([[Z5L[o9K], r7A + M5L, m5L], [Z5L[S7K], c7A + M5L, m5L], [Z5L[F7K], r7A + M5L, m5L]], x4K, T7K, s6K, F8K, y5L, E4K, r5L[p9A], s6K, s6K));
        else
            J5L[r0A](V5L([[Z5L[o9K] + (Z5L[S7K] ? h9A + Z5L[S7K] : p6K) + (Z5L[F7K] ? h9A + Z5L[F7K] : p6K), r7A + M5L, m5L]], x4K, T7K, s6K, F8K, y5L, E4K, r5L[p9A], s6K, s6K));
        J5L[a0A] = W8K;
        TweenLite[I8A](J5L, n6K, {
            alpha: o9K
        });
        var Z4K = new createjs[p0A]();
        Z4K[w0A] = T7K;
        Z4K[a0A] = h7K;
        if (r5L[B3A] !== undefined)
            Z4K[a0A] = u7K;
        var i4K = l5L - Z4K[w0A] / F7K;
        I5L[r0A](Z4K);
        var J4K = [[w9L, r7A + M5L, m5L]];
        if (typeof w9L === U8A) {
            J4K = [];
            for (var y4K = o9K; y4K < w9L[Q2A]; y4K++)
                J4K[k3A]([w9L[y4K], r7A + M5L, m5L]);
        }
        Z4K[r0A](V5L(J4K, i4K, T7K, s6K, F8K, y5L, E4K, r5L[p9A], s6K, s6K));
        if (!m7L) {
            var C4K = new createjs[L4A]();
            var l4K = r5L[x8A] ? r5L[x8A] : L7K;
            var f4K = r5L[i8A] ? r5L[i8A] : p8K;
            var U4K = r5L[d8A] ? r5L[d8A] : r5L[L5A];
            if (!U4K)
                U4K = G9L;
            C4K[q4A][R5A](U4K)[B9A](l4K + t7K, f4K + e7K)[B9A](l4K + I7K, f4K + B8K)[B9A](l4K + u7K, f4K + e7K)[B9A](l4K + P7K, f4K + e7K)[B9A](l4K + P7K, f4K + x7K)[c9A](l4K + u7K, f4K + I7K, l4K + Z7K, f4K + o9K, l4K + T7K, f4K + o9K)[c9A](l4K + i7K, f4K + o9K, l4K + I7K, f4K + o9K, l4K + p7K, f4K + x7K)[B9A](l4K + p7K, f4K + e7K)[W9A]();
            C4K[w0A] = o9K;
            C4K[a0A] = o9K;
            I5L[r0A](C4K);
        }
    }
    var d8K = 250;
    var i8K = 245;
    var Z8K = 220;
    var g8K = 200;
    var u8K = 170;
    var D8K = 160;
    function l6L() {
        var H2K = new createjs[p0A]();
        var I2K = new createjs[L4A]();
        I2K[q4A][K4A]([b9L, z7L], [o9K, S7K], o9K, o9K, o9K, A8K);
        I2K[q4A][Q4A](o9K, o9K, A8K, d8K);
        H2K[r0A](I2K);
        return H2K;
    }
    var j8K = 150;
    var m8K = 140;
    var I8K = 128;
    var b8K = 120;
    function R8L() {
        var n8K = 195;
        if (z5L[w0A] < y7K || z5L[w0A] > i8K)
            z5L[m8A] = -z5L[m8A];
        if (z5L[a0A] < y7K || z5L[a0A] > n8K)
            z5L[v8A] = -z5L[v8A];
        z5L[w0A] += z5L[m8A];
        z5L[a0A] += z5L[v8A];
    }
    var a8K = 118;
    var w8K = 115;
    var p8K = 110;
    var K8K = 100;
    var s8K = 90;
    var W8K = 86;
    var B8K = 85;
    var F8K = 80;
    function j1K(h5K, K5K, Q5K) {
        var L6A = 0.15;
        if (!K5K)
            K5K = L6A;
        if (!Q5K)
            Q5K = K5K;
        TweenLite[y3A](h5K, K5K, {
            alpha: S7K
        });
        TweenLite[y3A](h5K, Q5K, {
            delay: K5K,
            alpha: o9K,
            onComplete: j1K,
            onCompleteParams: [h5K, K5K, Q5K]
        });
    }
    var o7K = 75;
    var O7K = 73;
    var Y7K = 72;
    var T7K = 70;
    function x0K() {
        var l8K = 215;
        var C2K = w7K;
        Y9L = new createjs[p0A]();
        o9L = new createjs[L4A]();
        o9L[q4A][R5A](R9L);
        o9L[q4A][Q4A](o9K, o9K, S7K, C2K);
        o9L[q4A][T5A]();
        var l2K = new createjs[L4A]();
        var Z2K = o9K;
        l2K[q4A][X5A](S7K);
        l2K[q4A][Y5A](R9L);
        l2K[q4A][Q4A](-Z2K / F7K, -Z2K / F7K, g8K, C2K + Z2K);
        Y9L[r0A](l2K);
        Y9L[r0A](o9L);
        Y9L[w0A] = O5A;
        Y9L[a0A] = l8K;
        I5L[r0A](Y9L);
    }
    var R7K = 68;
    var A7K = 65;
    var e7K = 62;
    var i7K = 60;
    var y7K = 55;
    var J7K = 50;
    var Z7K = 45;
    var g7K = 40;
    var N7K = 37;
    var k7K = 36;
    var u7K = 35;
    var j7K = 30;
    var m7K = 25;
    var H7K = 22;
    var I7K = 20;
    function r6L(h3K) {
        var a7A = "setTimeout";
        S0K = window[a7A](function() {
            D1K();
        }, h3K ? h3K : O8K);
    }
    function x6L(n2K) {
        if (n2K[i5A]) {
            f8L = n2K[i5A];
            V8L = n2K[d5A];
            b0K();
        }
    }
    var r7K = 17;
    var b7K = 15;
    function D1K() {
        var w7A = "showWaitScreen";
        Z8L = q6K;
        parent[w7A]();
    }
    function V6L() {
        M8L = q6K;
        window[C4A](w8L);
        I5L[J4A](g9L);
        if (D8L() || P7L && !i7L) {
            k1K();
            if (D8L() && (!P7L || i7L)) {
                n5L[E4A] = s6K;
                q9L[E4A] = s6K;
                if (V9L)
                    V9L[y4A] = o9K;
                if (P7L)
                    E6L();
            }
        } else
            c7L();
        f1K();
    }
    var a7K = 14;
    function c8L() {
        var o8A = "solveMeta";
        if (!O8L) {
            O8L = q6K;
            if (window[o6K][S0A])
                try {
                    parent[o8A]();
                } catch (t5K) {}
        }
    }
    var w7K = 13;
    var p7K = 12;
    var h7K = 11;
    var Q7K = 10;
    var q7K = 8;
    var L7K = 7;
    var s7K = 6;
    var t7K = 5;
    var W7K = 4;
    var B7K = 3;
    var F7K = 2;
    function R6L(s3K) {
        A6L(s3K);
        if (!Y5L && !i5L && F8L) {
            TweenLite[y3A](h9L, S7A, {
                y: r5L[k9A] !== undefined ? r5L[k9A] + B7K : a8K,
                onComplete: t1K
            });
            O6L();
            if (!a7L) {
                k5L = parseFloat(k5L);
                k5L = k5L + q7L;
                k5L = parseFloat(k5L);
                TweenLite[y3A](W7L, n6K, {
                    rotation: k5L,
                    onComplete: b6L
                });
                M6L();
            }
            s8L = o9K;
            p8L = q7L;
            createjs[K0A][W6K](h0A, f7L);
        }
    }
    var S7K = 1;
    var o9K = 0;
    document[W6K](t6K, n1K, s6K);
    window[W6K](L6K, K1K);
    var j0K = q6K;
    function K1K(O9K) {
        var B09 = 'down';
        var F09 = 'up';
        var S09 = 'right';
        var o6A = 'left';
        var O6A = 'proceed';
        var Y6A = "action";
        var X6A = 'FunCaptcha-action';
        var T6A = "msg";
        var R6A = "data";
        switch (O9K[R6A] && O9K[R6A][T6A]) {
        case X6A:
            switch (O9K[R6A][Y6A]) {
            case O6A:
                if (N5L && N5L[E4A] && N5L[d9A])
                    H6L();
                else if (M9L && M9L[E4A])
                    q6L();
                else if (n5L && n5L[E4A])
                    c7L();
                break;
            case o6A:
                T6L(O9K);
                createjs[K0A][G5A](h0A, f7L);
                break;
            case S09:
                R6L(O9K);
                createjs[K0A][G5A](h0A, f7L);
                break;
            case F09:
                break;
            case B09:
                break;
            }
            break;
        }
    }
    function a1K(V4K) {
        var U8K = 238;
        var k8K = 180;
        var r8K = 127;
        var c8K = 125;
        var l7K = 43;
        if (!y5L) {
            m8L = new createjs[L4A]();
            m8L[q4A][R5A](r5L[p9A])[Q4A](o9K, p7K, Z8K, u7K);
            m8L[w0A] = l5L / F7K - p8K;
            I5L[r0A](m8L);
        }
        var n4K = P0K(k8K, r8K);
        J5L = new createjs[p0A]();
        J5L[w0A] = L7K;
        I5L[r0A](J5L);
        var N4K = I7K;
        if (r5L[a9A] == undefined)
            J5L[r0A](V5L([[u5L[o9K], r7A + M5L, m5L], [u5L[S7K], c7A + M5L, m5L], [u5L[F7K], r7A + M5L, m5L]], D8K, T7K, s6K, F8K, y5L, N4K, r5L[p9A], s6K, s6K));
        else
            J5L[r0A](V5L([[u5L[o9K] + (u5L[S7K] ? h9A + u5L[S7K] : p6K) + (u5L[F7K] ? h9A + u5L[F7K] : p6K), r7A + M5L, m5L]], D8K, T7K, s6K, F8K, y5L, N4K, r5L[p9A], s6K, s6K));
        J5L[a0A] = W8K;
        if (!u5L[S7K]) {
            J5L[a0A] = l7K;
            J5L[w0A] = T7K;
        }
        TweenLite[I8A](J5L, n6K, {
            alpha: o9K
        });
        var D4K = new createjs[D7A](Z6L,r7A + M5L,m5L);
        D4K[w0A] = j8K;
        D4K[u7A] = k7A;
        D4K[a0A] = r7K;
        if (r5L[B3A] !== undefined)
            D4K[a0A] = u7K;
        I5L[r0A](D4K);
        v5L[r0A](z5L);
        for (var u4K = o9K; u4K <= v5L[l7A]() - S7K; u4K++) {
            var k4K = v5L[Z7A](u4K);
            TweenLite[i3A](k4K);
            if (u4K == V4K) {
                var G4K = U8K;
                var g4K = c8K;
                if (!u5L[S7K]) {
                    G4K = j8K;
                    n4K[w0A] = g8K;
                }
                TweenLite[y3A](k4K, n6K, {
                    scaleX: S7K,
                    scaleY: S7K,
                    x: G4K,
                    y: g4K
                });
            } else
                TweenLite[y3A](k4K, n6K, {
                    scaleX: o9K,
                    scaleY: o9K
                });
        }
    }
    var D0K = s6K;
    var M7L = K6K;
    var H9L = Q6K;
    var Q6L = h6K;
    var U9L = p6K;
    function S6L() {
        H8L(-F7K);
    }
    function H7L(i9K, d9K, e9K, A9K) {
        var A6A = "sendAnalytics";
        if (j0K)
            if (window[o6K][S0A])
                try {
                    parent[A6A](i9K, d9K, e9K, A9K);
                } catch (R9K) {}
    }
    var u7L;
    var Z7L;
    var p9L;
    var i9L;
    var Q7L = t7K;
    var b7L;
    var c5L;
    var B9L = s6K;
    var C7L = S7K;
    function C1K() {
        TweenLite[y3A](o9L, B7K, {
            scaleX: g8K
        });
    }
    var C8L = [];
    var f8L = o9K;
    var V8L = o9K;
    var x7L = s6K;
    var I7L = s6K;
    var t6L = s6K;
    var b9L;
    function V5L(E5K, n5K, g5K, A5K, y5K, e5K, R5K, J5K, i5K, U5K) {
        var m6A = "getMeasuredHeight";
        var z6A = '#FFFFFF';
        var E7K = 52;
        var x5K = new createjs[p0A]();
        if (!e5K) {
            J5K = J5K !== undefined ? J5K : F9L;
            i5K = i5K === undefined ? q6K : s6K;
            U5K = U5K === undefined ? q6K : s6K;
            var Z5K = new createjs[p0A]();
            x5K[r0A](Z5K);
            var l5K = new createjs[L4A]();
            if (U5K) {
                l5K[q4A][X5A](W7K);
                l5K[q4A][Y5A](H6A);
            }
            if (i5K)
                l5K[q4A][M6A](o9K, o9K, n5K, g5K, W7K);
            else
                l5K[q4A][Q4A](o9K, o9K, n5K, g5K);
            Z5K[r0A](l5K);
            l5K[g4A] = n5K / F7K;
            l5K[V4A] = g5K / F7K;
            l5K[w0A] = n5K / F7K;
            l5K[a0A] = g5K / F7K;
            var f5K = new createjs[L4A]();
            if (J5K)
                f5K[q4A][R5A](J5K);
            if (U5K)
                f5K[q4A][X5A](F7K)[Y5A](z6A);
            if (i5K)
                f5K[q4A][M6A](o9K, o9K, n5K, g5K, W7K);
            else
                f5K[q4A][Q4A](o9K, o9K, n5K, g5K);
            Z5K[r0A](f5K);
            f5K[g4A] = n5K / F7K | o9K;
            f5K[V4A] = g5K / F7K | o9K;
            f5K[w0A] = n5K / F7K;
            f5K[a0A] = g5K / F7K;
            Z5K[g4A] = n5K / F7K;
            Z5K[V4A] = g5K / F7K;
            Z5K[w0A] = n5K / F7K;
            Z5K[a0A] = g5K / F7K;
            if (e9L == s6K)
                Z5K[n7A](-(n5K * S7A), -(g5K * S7A), n5K + n5K * s7A, g5K + g5K * s7A);
        }
        if (E5K) {
            var d5K = s7K;
            for (var C5K = o9K; C5K <= E5K[Q2A] - S7K; C5K++) {
                var V5K = new createjs[D7A](E5K[C5K][o9K],E5K[C5K][S7K],E5K[C5K][F7K]);
                if (!A5K) {
                    V5K[u7A] = k7A;
                    if (y5K)
                        V5K[w0A] = y5K;
                    else
                        V5K[w0A] = E7K;
                } else if (y5K)
                    V5K[w0A] = y5K;
                else
                    V5K[w0A] = t7K;
                V5K[N7A] = n5K;
                V5K[a0A] = d5K;
                x5K[r0A](V5K);
                d5K += V5K[m6A]() + B7K;
            }
        }
        return x5K;
    }
    function A6L(t3K) {
        var o9A = "skip startup interaction";
        var O9A = "interaction";
        if (i7L && !s6L) {
            s6L = q6K;
            H7L(O9A, o9A);
        }
    }
    var z7L;
    var F9L = w6K;
    var c9L = a6K;
    var C9L = b6K;
    var f5L = c6K;
    var A9L = w6K;
    var l9L = a6K;
    var G9L = c6K;
    var N9L = s6K;
    function Z1K(y9K, E9K) {
        var e6A = "appProgress";
        o9L[Y6K] = E9K[e6A] * K8K * F7K;
    }
    var R9L = b6K;
    var v7L = r6K;
    var K7L = I6K;
    var M5L = H6K;
    var j7L = M6K;
    var S9L = [];
    var U5L = [];
    var E5L = o9K;
    var z9L = p7K;
    function M0K(X9K, Y9K) {
        if (S8L)
            return new createjs[h4A](D5L[p4A](C3A));
        X9K = X9K == z6K ? f5L : X9K;
        var T9K = new createjs[L4A]();
        T9K[q4A][X5A](S7K, F7K, F7K);
        if (Y9K)
            T9K[q4A][Y5A](Y9K);
        T9K[q4A][R5A](X9K)[b9A](q7K, o9K)[B9A](Q7K, s7K)[B9A](r7K, s7K)[B9A](h7K, Q7K)[B9A](a7K, r7K)[B9A](q7K, w7K)[B9A](W7K, r7K)[B9A](t7K, Q7K)[B9A](o9K, s7K)[B9A](s7K, s7K)[B9A](q7K, o9K);
        return T9K;
    }
    var m5L = f5L;
    var y5L;
    var T5L = s6K;
    var k8L = F9L;
    function T6L(L3K) {
        A6L(L3K);
        if (!Y5L && !i5L && F8L) {
            TweenLite[y3A](r9L, F7A, {
                y: r5L[k9A] !== undefined ? r5L[k9A] + B7K : a8K,
                onComplete: L1K
            });
            O6L();
            if (!a7L) {
                k5L = parseFloat(k5L);
                k5L = k5L - q7L;
                k5L = parseFloat(k5L);
                TweenLite[y3A](W7L, n6K, {
                    rotation: k5L,
                    onComplete: b6L
                });
                M6L();
            }
            s8L = o9K;
            p8L = -q7L;
            createjs[K0A][W6K](h0A, f7L);
        }
    }
    var Q8L = c9L;
    var R7L = f5L;
    var A5L = f5L;
    var d8L = s6K;
    var G6L = s6K;
    var N6L = s6K;
    var k6L = s6K;
    var Y7L = z6K;
    var P8L;
    var j9L;
    function p1K() {
        i5L = q6K;
        Y5L = q6K;
        U8L();
        if (o5L) {
            createjs[K0A][G5A](h0A, R8L);
            TweenLite[i3A](o5L);
            I5L[J4A](o5L);
        }
        TweenLite[i3A](G5L);
        TweenLite[y3A](G5L, o9K, {
            alpha: o9K
        });
        TweenLite[y3A](T9L, n6K, {
            alpha: o9K
        });
        TweenLite[y3A](e7L, n6K, {
            alpha: o9K
        });
        TweenLite[i3A](C5L);
        TweenLite[y3A](C5L, n6K, {
            alpha: o9K
        });
        TweenLite[i3A](g5L);
        TweenLite[y3A](g5L, F7A, {
            alpha: o9K
        });
        if (!c6L)
            if (!N9L) {
                W9L[E4A] = q6K;
                W9L[y4A] = o9K;
                k9L[E4A] = s6K;
            }
    }
    var H5L = m6K;
    function N7L() {
        if (!i5L) {
            K8L = q6K;
            Y5L = q6K;
            if (!c5L[D5A]) {
                TweenLite[i3A](g5L);
                TweenLite[y3A](g5L, n6K, {
                    alpha: o9K
                });
                v5L[r0A](z5L);
                TweenLite[y3A](z5L, n6K, {
                    scaleX: n6K,
                    scaleY: n6K,
                    x: j7K,
                    y: Z8K
                });
                TweenLite[y3A](T9L, n6K, {
                    alpha: o9K
                });
                TweenLite[y3A](e7L, n6K, {
                    alpha: o9K
                });
                var R3K = t7K;
                var T3K = l5L - t7K - p8K;
                var X3K = (T3K - R3K) / (v5L[l7A]() - S7K);
                for (var e3K = o9K; e3K <= v5L[l7A]() - S7K; e3K++) {
                    var A3K = v5L[Z7A](e3K);
                    TweenLite[i3A](A3K);
                    TweenLite[y3A](A3K, n6K, {
                        scaleX: S7K,
                        scaleY: S7K,
                        y: K8K,
                        x: t7K + X3K * e3K + y7K
                    });
                }
            }
            if (j5L == o9K && !r8L) {
                y9L = q6K;
                w6L();
            } else if (V7L && y9L)
                w6L();
            else
                W1K();
        }
    }
    var s9L, Z9L, v8L;
    var c6L = s6K;
    var z8L = s6K;
    var k0K = o9K;
    var B8L = v6K;
    function y0K() {
        F8L = q6K;
    }
    var t8L = s6K;
    var m6L = p6K;
    var q8L = s6K;
    function H6L(Q3K) {
        var p7A = "end challenge";
        var h7A = "final guess";
        var K7A = "ech";
        var q7A = "pauseTimedModeTimer";
        var L7A = "dc";
        i6L();
        if (w8L)
            window[C4A](w8L);
        if (!L6L) {
            L6L = q6K;
            if (Q3K)
                $[V5A](L7A, [Q3K[n5A], Q3K[g5A]]);
        }
        if (!i5L && !K8L) {
            U8L();
            if (D8L()) {
                parent[q7A]();
                if (e5L == j5L - (T5L ? S7K : o9K)) {
                    $[V5A](K7A, (Math[A6K](k5L * Q7K) / Q7K)[Q7A](F7K));
                    if (T5L)
                        w0K();
                    N7L();
                } else {
                    w0K();
                    B9L && r6L();
                    v5L[r0A](z5L);
                    z5L[a0A] = I8K;
                    TweenLite[y3A](z5L, n6K, {
                        scaleX: s7A,
                        scaleY: s7A,
                        x: -j7K,
                        y: m8K
                    });
                }
            } else if (e5L == j5L - (T5L ? S7K : o9K)) {
                if (T5L) {
                    O9L[k3A]((Math[A6K](k5L * Q7K) / Q7K)[Q7A](F7K));
                    p0K();
                } else
                    $[V5A](K7A, (Math[A6K](k5L * Q7K) / Q7K)[Q7A](F7K));
                H7L(h7A, p7A);
                N7L();
            } else
                i0K();
        }
    }
    function P5L(o1K, O1K, Y1K) {
        var D3A = '.';
        var j3A = '-';
        var P3A = '1';
        var v3A = 'undefined';
        if (typeof Y1K === v3A)
            Y1K = E5L;
        if (typeof O1K === v3A)
            O1K = P3A;
        if (Y1K == o9K)
            Y1K = z6K;
        for (var S2K = o9K; P8L && S2K < P8L[Q2A]; S2K++) {
            var F2K = P8L[S2K];
            var B2K = F2K + j3A + O1K + D3A + o1K + (Y1K ? j3A + Y1K : M0A);
            var W2K = F2K + j3A + O1K + D3A + o1K;
            if (j9L[B2K])
                return j9L[B2K];
            if (j9L[W2K])
                return j9L[W2K];
        }
        var t2K = O1K + D3A + o1K + (Y1K ? j3A + Y1K : M0A);
        if (j9L[t2K])
            return j9L[t2K];
        var s2K = O1K + D3A + o1K;
        if (j9L[s2K])
            return j9L[s2K];
        return M0A;
    }
    var X9L = s6K;
    var u8L = s6K;
    function G7L(E3K) {
        var S8A = "drawCircle";
        var o7A = "rect";
        var O7A = "getFrame";
        var Y7A = "spriteSheet";
        var X7A = "gotoAndPlay";
        var T7A = "Sprite";
        var R7A = "SpriteSheet";
        var A7A = "getFPS";
        var e7A = "ceil";
        var d7A = 'src';
        var i7A = "IMG";
        var x7A = "createElement";
        var U7A = "data:image/jpeg;base64,";
        var y7A = "decryptImg";
        var R8K = 320;
        U7L = s6K;
        if (x5L == j5L && T5L)
            return s6K;
        var v3K = new createjs[p0A]();
        e7L[r0A](v3K);
        var j3K;
        if (x5L == o9K || j5L == x5L)
            j3K = D5L[p4A](n3A + x5L);
        else {
            j3K = t9L[p4A](n3A + x5L);
            if (!j3K) {
                setTimeout(function() {
                    G7L(E3K);
                }, g8K);
                return s6K;
            }
        }
        x5L++;
        if (B9L && j5L != x5L - S7K) {
            var u3K;
            if (x5L == S7K)
                u3K = D5L[p4A](n3A + (x5L - S7K));
            else
                u3K = t9L[p4A](n3A + (x5L - S7K));
            var V3K = parent[y7A](u3K, C8L[C7L]);
            var f3K = U7A + V3K;
            var k3K = document[x7A](i7A);
            k3K[d6K](d7A, f3K);
            j3K = k3K;
        }
        if (b8L && j5L != x5L - S7K) {
            var Z3K = a6L;
            var l3K = Math[e7A](createjs[K0A][A7A]() / n0K);
            var N3K = [];
            var D3K = o9K;
            for (var G3K = Z3K - S7K; G3K >= o9K; G3K--) {
                for (var n3K = o9K; n3K < l3K; n3K++)
                    N3K[k3A]([D3K, o9K, p8K, p8K, o9K, o9K, o9K]);
                D3K = D3K + p8K;
            }
            var C3K = {
                images: [j3K],
                frames: N3K
            };
            var J3K = new createjs[R7A](C3K);
            K9L = new createjs[T7A](J3K);
            K9L[X7A](o9K);
            K9L[g4A] = K9L[Y7A][O7A](o9K)[o7A][l6K] / F7K;
            K9L[V4A] = K9L[Y7A][O7A](o9K)[o7A][Z6K] / F7K;
        } else {
            K9L = new createjs[h4A](j3K);
            K9L[g4A] = y7K;
            K9L[V4A] = y7K;
        }
        v3K[r0A](K9L);
        if (x5L == j5L + S7K) {
            var g3K = [b8K, D8K, g8K];
            N1K(g3K);
            v3K[l4A] = g3K[o9K];
        }
        if (!k6L) {
            var P3K = new createjs[L4A]();
            if (Y7L == z6K)
                Y7L = f5L;
            P3K[q4A][X5A](F7K)[Y5A](Y7L)[S8A](y7K, y7K, y7K);
            P3K[g4A] = y7K;
            P3K[V4A] = y7K;
            P3K[w0A] = o9K;
            P3K[a0A] = o9K;
            v3K[r0A](P3K);
        }
        v3K[w0A] = R8K;
        v3K[a0A] = O7L;
        v3K[Y6K] = v3K[O6K] = o9K;
        TweenLite[y3A](v3K, n6K, {
            scaleX: s7A,
            scaleY: s7A
        });
        g0K = v3K;
        U7L = q6K;
        if (E3K)
            h6L();
    }
    var r7L;
    var W8L = p6K;
    var G0K = navigator[P6K][j6K]()[D6K](u6K) > -S7K;
    var F8L = q6K;
    var P9L = navigator[k6K][D6K](N6K) !== -S7K;
    var Q9L = s6K;
    var W6L = s6K;
    var a8L = q6K;
    var P6L = G6K;
    var e5L = o9K;
    function g1K() {
        var x6A = "enable";
        var U6A = "enableDOMEvents";
        var y6A = "Chrome";
        var E6A = "Android";
        X5L[Z6A] = function() {
            return s6K;
        }
        ;
        if (createjs[C6A][J6A]()) {
            var Z9K = navigator[P6K][D6K](E6A) > -S7K && !(navigator[P6K][D6K](y6A) > -S7K);
            if (Z9K)
                I5L[U6A](s6K);
            createjs[C6A][x6A](I5L);
        } else
            I5L[y6K]();
    }
    var j5L = B7K;
    function w1K() {
        var E8A = "zh";
        var x8K = 240;
        var U7K = 57;
        var C7K = 48;
        TweenLite[y3A](z5L, n6K, {
            alpha: o9K,
            onComplete: k7L,
            onCompleteParams: [z5L]
        });
        var v4K = t7K;
        var P4K = l5L - t7K - p8K;
        var j4K = (P4K - v4K) / (v5L[l7A]() - S7K);
        for (var z4K = o9K; z4K <= v5L[l7A]() - S7K; z4K++) {
            var m4K = v5L[Z7A](z4K);
            TweenLite[i3A](m4K);
            TweenLite[y3A](m4K, n6K, {
                scaleX: S7K,
                scaleY: S7K,
                y: K8K,
                x: t7K + j4K * z4K + y7K,
                alpha: S7K
            });
        }
        var H4K = P0K(m7K, u7K);
        var M4K = V5L([[L0K, r7A + M5L, m5L]], x8K, C7K, s6K, b8K, y5L, I7K, r5L[p9A], s6K, s6K, q6K);
        M4K[w0A] = U7K;
        M4K[a0A] = q7K;
        if (r5L[B3A] !== undefined)
            M4K[a0A] = m7K;
        switch (H5L) {
        case c4A:
            M4K[w0A] = g7K;
            H4K[a0A] = J7K;
            H4K[w0A] = j7K;
            break;
        case I4A:
            M4K[w0A] = g7K;
            H4K[a0A] = J7K;
            H4K[w0A] = j7K;
            break;
        case E8A:
            M4K[w0A] = g7K;
            H4K[a0A] = J7K;
            H4K[w0A] = j7K;
            break;
        case v4A:
            M4K[w0A] = u7K;
            H4K[a0A] = T7K;
            H4K[w0A] = j7K;
            break;
        }
        I5L[r0A](M4K);
        TweenLite[y3A](v5L, n6K, {
            scaleX: S7K,
            scaleY: S7K,
            y: m7K
        });
        H1K(v5L[l7A]());
    }
    var v9L = s6K;
    var j8L = s6K;
    function S1K(x3K) {
        var U3K = $[F8A](x3K);
        if (U3K && U3K[p8A] == s8A)
            parent[w8A](L9L);
    }
    function h1K(I4K) {
        var J8A = 1.3;
        var C8A = 0.4;
        var Z8A = "-30";
        var f8A = "bold 18px ";
        var X8K = 400;
        var v8K = 145;
        var b4K = new createjs[p0A]();
        var r4K;
        switch (I4K) {
        case S7K:
        case F7K:
            r4K = t0K;
            break;
        case B7K:
        case W7K:
            r4K = W0K;
            break;
        case t7K:
            r4K = B0K;
            break;
        }
        var a4K = new createjs[D7A](r4K,f8A + M5L,A5L);
        a4K[u7A] = k7A;
        a4K[a0A] = N7K;
        if (j5L == o9K)
            a4K[a0A] = Z7K;
        b4K[r0A](a4K);
        for (var c4K = I4K - S7K; c4K >= o9K; c4K--) {
            var w4K = M0K(A5L, K7L);
            w4K[g4A] = w4K[l6K] / F7K | o9K;
            w4K[V4A] = w4K[Z6K] / F7K | o9K;
            switch (c4K) {
            case o9K:
                w4K[w0A] = o9K;
                w4K[a0A] = o9K;
                break;
            case S7K:
                w4K[w0A] = -u7K;
                w4K[a0A] = H7K;
                break;
            case F7K:
                w4K[w0A] = j7K;
                w4K[a0A] = m7K;
                break;
            case B7K:
                w4K[w0A] = -u7K;
                w4K[a0A] = -p7K;
                break;
            case W7K:
                w4K[w0A] = u7K;
                w4K[a0A] = -b7K;
                break;
            }
            if (parent[H7A] !== M7A)
                b4K[r0A](w4K);
            TweenLite[I8A](w4K, n6K, {
                delay: l8A + c4K * S7A,
                scaleX: o9K,
                scaleY: o9K,
                x: o9K,
                y: o9K
            });
            TweenLite[y3A](w4K, F7A, {
                delay: S7K,
                y: Z8A
            });
            TweenLite[y3A](w4K, C8A, {
                delay: J8A,
                y: X8K
            });
        }
        TweenLite[I8A](a4K, n6K, {
            delay: n6K,
            scaleX: S7K,
            scaleY: S7K
        });
        TweenLite[y3A](a4K, n6K, {
            delay: P8A,
            y: -g8K
        });
        I5L[r0A](b4K);
        b4K[w0A] = v8K;
        b4K[a0A] = s8K;
    }
    var g6L = s6K;
    var T8L = q6K;
    var H0K = z6K;
    var c0K = z6K;
    var N8L = q6K;
    var i7L = s6K;
    var s6L = s6K;
    function p6L() {
        if (n7L) {
            TweenLite[i3A](C5L);
            TweenLite[i3A](g5L);
            l7L = o9K;
            TweenLite[y3A](g5L, v6L, {
                alpha: o9K,
                onComplete: Z0K
            });
            TweenLite[y3A](C5L, u6L, {
                alpha: S7K,
                delay: A8L
            });
            i6L();
            if (r5L[f9A] == undefined)
                TweenLite[y3A](N5L, n6K, {
                    alpha: o9K,
                    visible: o9K
                });
            else
                TweenLite[y3A](N5L, n6K, {
                    alpha: n6K
                });
            if (x5L == j5L + S7K)
                if (S9L) {
                    C5L[y5A]();
                    if (r5L[Q9A] == undefined)
                        C5L[r0A](V5L([[S9L[o9K], c7A + M5L, m5L], [S9L[S7K], r7A + M5L, m5L]], j8K, J7K, s6K, o7K, y5L, I7K, r5L[p9A], s6K, s6K));
                    else
                        C5L[r0A](V5L([[S9L[o9K] + (S9L[S7K] ? h9A + S9L[S7K] : p6K), r7A + M5L, m5L]], e8K, J7K, s6K, o7K, y5L, I7K, r5L[p9A], s6K, s6K));
                }
            n7L = s6K;
        }
    }
    var L6L = s6K;
    function q0K() {
        var J7A = 0.8;
        var C7A = "updateCache";
        var f7A = " of ";
        if (!i5L && !c5L[D5A]) {
            F8L = s6K;
            G5L[E4A] = q6K;
            G5L[y4A] = o9K;
            TweenLite[y3A](G5L, n6K, {
                alpha: S7K
            });
            f9L[E4A] = s6K;
            if (e5L == S7K)
                f9L[E4A] = q6K;
            else {
                m9L[E4A] = q6K;
                var z3K = (x9L / createjs[K0A][V7A]())[Q7A](S7K);
                m9L[s5A] = z3K + h9A + n8L;
                if (e5L >= Q7L) {
                    if (!E9L) {
                        E9L = new createjs[D7A](p6K,a4A + M5L,A5L);
                        E9L[u7A] = k7A;
                        E9L[N7A] = b8K;
                        E9L[a0A] = b7K;
                        E9L[w0A] = e7K;
                        G5L[r0A](E9L);
                    }
                    var m3K = j5L + (T5L ? o9K : S7K);
                    E9L[s5A] = e5L + f7A + m3K;
                }
            }
            for (var M3K = G5L[l7A]() - S7K; M3K >= o9K; M3K--) {
                var H3K = G5L[Z7A](M3K);
                if (e5L >= Q7L) {
                    if (H3K[m7A] == S7K)
                        H3K[E4A] = s6K;
                } else if (H3K[j7A])
                    if (H3K[j7A] == e5L)
                        H3K[E4A] = q6K;
            }
            if (e9L == s6K)
                G5L[C7A]();
            TweenLite[y3A](G5L, n6K, {
                delay: J7A,
                alpha: o9K
            });
            TweenLite[y3A](this, E7A, {
                onComplete: h6L
            });
        }
    }
    var X5L, u1K, I5L, D5L, t9L;
    var Y5L = q6K;
    function B1K() {
        var h3A = 'ar';
        var Q3A = "_show_verify_arrow";
        var K3A = "_center_verify";
        var q3A = "_verify_btn_width";
        var L3A = "_verify_txt_x";
        var s3A = "_final_chal_lang_key";
        var t3A = "_info_land_lang_key";
        var W3A = "verification";
        var F3A = "game_check";
        var S3A = "game_perfect";
        var o2A = "game_great";
        var O2A = "game_good";
        var Y2A = "fail_top_multi";
        var X2A = "fail_button";
        var T2A = "wait_text";
        var R2A = "seconds";
        var A2A = "done_button";
        var e2A = "fail_top";
        var d2A = "fail_info_timed_top";
        var x2A = "fail_info_timed_middle";
        var U2A = "_done_info_key";
        var y2A = "touch_done_info_stack";
        var E2A = "touch_done_info";
        var J2A = "touch_button_info";
        var C2A = "landing_button";
        var f2A = "landing_info";
        if (H5L != g2A || H5L != V2A)
            u9L = P5L(f2A, c0A, E5L)[P0A](l2A);
        else
            u9L = P5L(f2A, c0A, E5L)[P0A](Z2A);
        w7L = P5L(C2A, c0A, E5L);
        if (H5L != g2A || H5L != V2A)
            O5L = P5L(J2A)[P0A](l2A);
        else
            O5L = P5L(J2A)[P0A](Z2A);
        var T1K = E2A;
        if (I6L)
            T1K = y2A;
        if (c5L[i0A][U2A])
            T1K = c5L[i0A][U2A];
        if (H5L != g2A || H5L != V2A)
            u5L = P5L(T1K)[P0A](l2A);
        else
            u5L = P5L(T1K)[P0A](Z2A);
        if (!m7L)
            if (H5L != g2A || H5L != V2A)
                Z5L = P5L(x2A)[P0A](l2A);
            else
                Z5L = P5L(x2A)[P0A](Z2A);
        else if (H5L != g2A || H5L != V2A)
            Z5L = P5L(i2A)[P0A](l2A);
        else
            Z5L = P5L(i2A)[P0A](Z2A);
        if (H5L != g2A || H5L != V2A)
            w9L = P5L(d2A)[P0A](l2A);
        else
            w9L = P5L(d2A)[P0A](Z2A);
        var X1K = e2A;
        Z6L = P5L(X1K);
        G8L = P5L(A2A);
        n8L = P5L(R2A, c0A, E5L);
        Q0K = P5L(T2A, c0A, E5L);
        g8L = P5L(X2A);
        L0K = P5L(Y2A);
        t0K = P5L(O2A, c0A, E5L);
        W0K = P5L(o2A, c0A, E5L);
        B0K = P5L(S3A, c0A, E5L);
        F0K = P5L(F3A, c0A, E5L);
        if (c5L[i0A][B3A])
            o6L = P5L(W3A, c0A, E5L);
        if (c5L[i0A][t3A])
            if (H5L != g2A || H5L != V2A)
                u9L = P5L(c5L[i0A][t3A], c0A, E5L)[P0A](l2A);
            else
                u9L = P5L(c5L[i0A][t3A], c0A, E5L)[P0A](Z2A);
        S9L = O5L;
        U5L = u5L;
        q1K();
        if (c5L[i0A][s3A])
            U5L = P5L(c5L[i0A][s3A])[P0A](l2A);
        if (c5L[i0A][L3A])
            H0K = c5L[i0A][L3A];
        if (c5L[i0A][q3A])
            c0K = c5L[i0A][q3A];
        if (c5L[i0A][K3A])
            N8L = c5L[i0A][K3A];
        if (c5L[i0A][v1A])
            j8L = c5L[i0A][v1A];
        if (c5L[i0A][Q3A])
            T8L = !c5L[i0A][Q3A];
        if (H5L === h3A)
            X5L[T6K][p3A] = w3A;
    }
    function l8L() {
        var b7A = "hideWaitScreen";
        window[C4A](S0K);
        if (Z8L) {
            Z8L = s6K;
            parent[b7A]();
        }
    }
    var l5L = A8K;
    var E7L = d8K;
    var i8L = s6K;
    var l7L = o9K;
    var X6L = [];
    var g9L, d9L;
    var p7L = o9K;
    var y9L = s6K;
    var V7L = s6K;
    var s0K = o9K
      , K6L = o9K
      , L9L = o9K;
    var z5L;
    var O9L = [];
    function P0K(o4K, S5K) {
        var X8A = "fc2_cross_colour";
        var O4K = new createjs[L4A]();
        O4K[q4A][R5A](r5L[X8A] ? r5L[X8A] : v5A)[B9A](I7K, o9K)[B9A](g7K, I7K)[B9A](i7K, o9K)[B9A](T7K, Q7K)[B9A](J7K, j7K)[B9A](T7K, J7K)[B9A](i7K, i7K)[B9A](g7K, g7K)[B9A](I7K, i7K)[B9A](Q7K, J7K)[B9A](j7K, j7K)[B9A](j7K, j7K)[B9A](Q7K, Q7K)[W9A](I7K, o9K);
        if (o7L)
            O4K = new createjs[h4A](D5L[p4A](J3A));
        O4K[w0A] = o4K ? o4K : j8K;
        O4K[a0A] = S5K ? S5K : K8K;
        O4K[Y6K] = O4K[O6K] = E7A;
        O4K[g4A] = j7K;
        O4K[V4A] = j7K;
        F6L(O4K, Y9A, t7K);
        I5L[r0A](O4K);
        return O4K;
    }
    function k7L(u5K) {
        I5L[J4A](u5K);
    }
    var i5L = s6K;
    function H8L(d4K) {
        var A8A = "incorrect answer";
        var e8A = "failed game";
        p1K();
        H7L(e8A, A8A, d4K);
        TweenLite[y3A](W9L, n6K, {
            alpha: S7K
        });
        TweenLite[y3A](g7L, n6K, {
            alpha: o9K
        });
        r1K();
        if (r5L[X3A] !== undefined) {
            I5L[r0A](R5L);
            f6L();
            I5L[r0A](N5L);
            TweenLite[y3A](N5L, n6K, {
                alpha: o9K,
                visible: o9K
            });
        } else {
            x0K();
            C1K();
        }
        switch (d4K) {
        case -F7K:
            b1K();
            break;
        case -S7K:
            w1K();
            break;
        default:
            a1K(d4K);
        }
        clearTimeout(D7L);
        m1K();
    }
    function v1K() {
        if (D9L)
            D9L[E4A] = q6K;
    }
    var I0K = o9K;
    function q6L() {
        var W6A = "destroyLastCaptcha";
        var B6A = "unbind";
        $(I2A, document)[B6A](M2A, V0K);
        if (window[o6K][S0A])
            try {
                parent[W6A]();
            } catch (L5K) {
                var s6A = "reload";
                var t6A = "location";
                window[t6A][s6A]();
            }
    }
    var x5L = o9K;
    function M1K() {
        var Y8A = "setChildIndex";
        var W5K;
        if (J9L != o9K) {
            W5K = A7L[J9L - S7K];
            TweenLite[y3A](W5K, n6K, {
                scaleX: S7K,
                scaleY: S7K
            });
            v5L[Y8A](W5K, J9L - S7K);
        } else {
            W5K = A7L[v5L[l7A]() - S7K];
            TweenLite[y3A](W5K, n6K, {
                scaleX: S7K,
                scaleY: S7K
            });
            v5L[Y8A](W5K, v5L[l7A]() - S7K);
        }
        W5K = A7L[J9L];
        TweenLite[y3A](W5K, n6K, {
            scaleX: O8A,
            scaleY: O8A
        });
        v5L[Y8A](W5K, v5L[l7A]() - S7K);
        if (J9L + S7K == X8L)
            J9L = o9K;
        else
            J9L++;
    }
    function x8L() {
        var C5A = "user clicked verify";
        var Z5A = "begin app";
        H7L(Z5A, C5A);
        if (i9L === t7K) {
            r8L = q6K;
            parent[J5A](u7L, Z7L, p9L, v0K[E5A](), E0K);
        }
        I5L[J4A](q9L);
        if (c5L[D5A] === S7K) {
            l1K();
            return;
        }
        e0K();
    }
    var p8L = g7K;
    var n0K = q7K;
    function J1K(U9K) {
        t8L = q6K;
    }
    var h8L = t7K;
    var d7L = Q7K;
    var P7L = s6K;
    var d5L;
    function y6L(w2K) {
        parent[d3A]();
        y7L++;
        t9L[e3A]();
        t9L[A3A]();
        t9L[R3A]();
        t9L[T3A]();
        t9L = new createjs[F0A](s6K,z6K,q6K);
        t9L[B0A](I7K);
        t9L[W6K](t0A, y6L);
    }
    var S7L;
    var q9L;
    var k9L, g7L, n9L, C5L, g5L, L7L;
    var y8L = s6K;
    var J7L;
    function i6L() {
        N5L[d9A] = s6K;
        N5L[G5A](j5A, H6L);
        N5L[G5A](e9A, function(W3K) {
            document[Z9A][T6K][A9A] = R9A;
        });
    }
    var e9L = s6K;
    var J5L, G1K, z6L, v5L;
    function o0K() {
        o8L = q6K;
        m7L = q6K;
        if (H5L != g2A || H5L != V2A)
            Z5L = P5L(i2A)[P0A](l2A);
        else
            Z5L = P5L(i2A)[P0A](Z2A);
        x8L();
        l8L();
    }
    var h9L, r9L, N5L, T9L, Y9L, o9L;
    function U6L(Q2K, h2K) {
        var x3A = "timeout";
        if (y7L < I7K) {
            if (!h2K)
                h2K = o9K;
            if (Q2K[U3A] != S7K)
                if (Q2K[U3A] == h2K)
                    n6L(x3A);
                else
                    TweenLite[y3A](this, Q7K, {
                        onComplete: U6L,
                        onCompleteParams: [Q2K, Q2K[U3A]]
                    });
        }
    }
    var I9L, t7L, B7L, M9L;
    var m9L, f9L, G5L, E9L;
    var g0K, K9L;
    var L8L = s6K;
    var a7L = s6K;
    var f0K = s6K;
    var K8L = s6K;
    function O0K() {
        d5L[e3A]();
        d5L[A3A]();
        d5L[R3A]();
        d5L[T3A]();
        parent[d3A]();
        y7L++;
        TweenLite[y3A](this, S7K, {
            onComplete: K0K
        });
    }
    var k5L = o9K;
    var s8L = o9K;
    var x9L = o9K;
    function Q1K(q4K) {
        var V8A = 3.33;
        var g8A = 1.66;
        h8L = j5L * g8A;
        d7L = j5L * V8A;
        var K4K = Math[A6K](Q7K * h8L) / Q7K;
        var Q4K = Math[A6K](Q7K * (h8L + d7L) / F7K) / Q7K;
        var h4K = Math[A6K](Q7K * d7L) / Q7K;
        var p4K = Math[A6K](Q7K * (d7L * W7K)) / Q7K;
        if (q4K < K4K)
            L9L = t7K;
        else if (q4K < Q4K)
            L9L = W7K;
        else if (q4K < h4K)
            L9L = B7K;
        else if (q4K < p4K)
            L9L = F7K;
        else
            L9L = S7K;
        if (q4K == o9K || j5L == o9K)
            L9L = t7K;
    }
    function H1K(B5K) {
        v5L[r0A](z5L);
        c1K = setInterval(M1K, O8K);
        X8L = B5K;
        for (var F5K = o9K; F5K <= v5L[l7A]() - S7K; F5K++)
            A7L[F5K] = v5L[Z7A](F5K);
    }
    var o5L;
    var w8L;
    function Y0K() {
        var n2A = "bindEvts";
        var G2A = 'hideTab';
        var N2A = 'showTab';
        var k2A = 'hiddenTimedTimeout';
        var u2A = 'timedTimeout';
        var D2A = 'skipStartupScreen';
        var j2A = 'startupClick';
        var P2A = 'victoryScreenLoaded';
        var v2A = 'loadProgress';
        var m2A = 'showApp';
        var z2A = 'hideApp';
        var H2A = "bind";
        $(I2A, document)[H2A](M2A, V0K);
        $(I2A, document)[H2A](z2A, J1K);
        $(I2A, document)[H2A](m2A, E1K);
        $(I2A, document)[H2A](v2A, Z1K);
        $(I2A, document)[H2A](P2A, J0K);
        $(I2A, document)[H2A](j2A, c7L);
        $(I2A, document)[H2A](D2A, E6L);
        $(I2A, document)[H2A](u2A, S6L);
        $(I2A, document)[H2A](k2A, o0K);
        $(I2A, document)[H2A](N2A, v1K);
        $(I2A, document)[H2A](G2A, P1K);
        parent[n2A]($(I2A, document));
    }
    var r5L = {};
    function b6L() {
        a7L = s6K;
    }
    function I1K() {
        var t7A = 0.21;
        var W7A = 0.24;
        var B7A = 0.27;
        var K3K = F7A;
        if (z5L[a0A] < j7K)
            K3K = B7A;
        else if (z5L[a0A] < g7K)
            K3K = W7A;
        else if (z5L[a0A] < J7K)
            K3K = t7A;
        TweenLite[y3A](z5L, K3K, {
            y: O7L,
            onComplete: z1K
        });
    }
    var B6L = s6K;
    function F6L(w5K, a5K, p5K) {
        var q6A = "fromTo";
        if (p5K == o9K)
            return;
        p5K--;
        TweenLite[q6A](w5K, a5K, {
            alpha: o9K
        }, {
            alpha: S7K,
            onComplete: F6L,
            onCompleteParams: [w5K, a5K, p5K]
        });
    }
    var S8L = p6K;
    var o7L = p6K;
    function O6L() {
        if (l7L == o9K) {
            k5L = W7L[l4A];
            l7L = S7K;
            TweenLite[i3A](C5L);
            TweenLite[y3A](C5L, n6K, {
                alpha: o9K
            });
            g5L[a0A] = -K8K;
            TweenLite[y3A](g5L, n6K, {
                delay: s7A,
                alpha: S7K,
                y: r5L[w9A] !== undefined ? r5L[w9A] : t7K
            });
            A0K();
            if (r5L[f9A] == undefined) {
                N5L[E4A] = q6K;
                N5L[y4A] = o9K;
                TweenLite[y3A](N5L, n6K, {
                    alpha: S7K
                });
            } else
                TweenLite[y3A](N5L, n6K, {
                    alpha: S7K
                });
        }
        U8L();
    }
    var O7L = Y7K;
    var b8L = s6K;
    var a6L = o9K;
    function F7L(X5K) {
        var l6A = "rgba(0,0,0,0.2)";
        var f6A = 0.01;
        var V6A = '#ffffff';
        var g6A = 12.5;
        var n6A = "fc2_arrow_y";
        var G6A = 0.9;
        var N6A = 0.96;
        var k6A = "shadow";
        var u6A = "getMeasuredWidth";
        var D6A = "minWidth";
        var j6A = "extraWidth";
        var P6A = 'firefox';
        var v6A = "#ffffff";
        var q9K = w6K;
        var L9K = a6K;
        var v9K = b6K;
        var t9K = p7K;
        var Y5K, P9K, h9K = o9K;
        var I9K = s6K;
        var o5K = o9K;
        var V9K = o9K;
        var c9K = q6K;
        var N9K = F7K;
        var G9K = v6A;
        var w9K = S7K;
        var p9K = s6K;
        var F9K;
        var u9K = Q7K;
        var k9K = s7K;
        var K9K;
        var g9K;
        var n9K;
        var H9K = s6K;
        var M9K = s6K;
        var z9K = s6K;
        var m9K = s6K;
        var a9K = o9K;
        var b9K = o9K;
        var j9K = o9K;
        var D9K = o9K;
        if (navigator[P6K][j6K]()[D6K](P6A) > -S7K)
            e9L = q6K;
        for (var T5K = X5K[Q2A] - S7K; T5K >= o9K; T5K--)
            switch (X5K[T5K][o9K]) {
            case H5A:
                Y5K = X5K[T5K][S7K];
                break;
            case O4A:
                o5K = X5K[T5K][S7K];
                break;
            case o4A:
                V9K = X5K[T5K][S7K];
                break;
            case s5A:
                F9K = X5K[T5K][S7K];
                break;
            case q5A:
                k9K = X5K[T5K][S7K];
                break;
            case I7A:
                u9K = X5K[T5K][S7K];
                break;
            case Q5A:
                p9K = X5K[T5K][S7K];
                break;
            case t5A:
                t9K = X5K[T5K][S7K];
                break;
            case w5A:
                q9K = X5K[T5K][S7K];
                break;
            case a5A:
                L9K = X5K[T5K][S7K];
                break;
            case p5A:
                v9K = X5K[T5K][S7K];
                break;
            case H9A:
                K9K = X5K[T5K][S7K];
                break;
            case M9A:
                g9K = X5K[T5K][S7K];
                break;
            case z9A:
                n9K = X5K[T5K][S7K];
                break;
            case r5A:
                I9K = X5K[T5K][S7K];
                break;
            case j6A:
                P9K = X5K[T5K][S7K];
                break;
            case D6A:
                h9K = X5K[T5K][S7K];
                break;
            case S5A:
                N9K = X5K[T5K][S7K];
                break;
            case F5A:
                G9K = X5K[T5K][S7K];
                break;
            case W5A:
                w9K = X5K[T5K][S7K];
                break;
            case B5A:
                c9K = X5K[T5K][S7K];
                break;
            case b5A:
                H9K = X5K[T5K][S7K];
                break;
            case c5A:
                M9K = X5K[T5K][S7K];
                break;
            case V9A:
                z9K = X5K[T5K][S7K];
                break;
            case M5A:
                m9K = X5K[T5K][S7K];
                break;
            case P9A:
                a9K = X5K[T5K][S7K];
                break;
            case j9A:
                b9K = X5K[T5K][S7K];
                break;
            case D9A:
                j9K = X5K[T5K][S7K];
                break;
            case u9A:
                D9K = X5K[T5K][S7K];
                break;
            }
        if (F9K) {
            var B9K = new createjs[D7A](F9K[o9K],F9K[S7K],F9K[F7K]);
            if (p9K)
                B9K[u7A] = k7A;
            B9K[w0A] = u9K;
            B9K[a0A] = k9K;
        }
        if (I9K && F9K) {
            Y5K = B9K[u6A]() + (P9K ? P9K : o9K);
            Y5K += I7K;
        }
        if (h9K)
            if (Y5K < h9K)
                Y5K = h9K;
        if (F9K && p9K)
            B9K[w0A] = Y5K / F7K;
        var O5K = new createjs[p0A]();
        O5K[m5A] = Y5K;
        if (w9K == F7K)
            Y5K += I7K;
        if (!d8L && c9K) {
            var r9K = new createjs[L4A]();
            r9K[q4A][X5A](W7K)[Y5A](H6A)[M6A](o9K, o9K, Y5K, o5K, t9K);
            if (!G6L)
                r9K[k6A] = new createjs[s9A](c6K,S7K,S7K,t7K);
            O5K[r0A](r9K);
        }
        var W9K = new createjs[L4A]();
        if (q9K !== L9K)
            W9K[q4A][K4A]([q9K, L9K], [o9K, S7A], o9K, I7K, o9K, b8K);
        else
            W9K[q4A][R5A](q9K);
        if (c9K) {
            W9K[q4A][X5A](N9K);
            W9K[q4A][Y5A](G9K);
        }
        if (t9K)
            W9K[q4A][M6A](o9K, o9K, Y5K, o5K, t9K);
        else
            W9K[q4A][Q4A](o9K, o9K, Y5K, o5K);
        O5K[r0A](W9K);
        if (!N6L && L9K) {
            var S9K = new createjs[L4A]();
            S9K[q4A][K4A]([v9K, L9K], [o9K, S7A], o9K, Q7K, o9K, b8K)[M6A](o9K, o9K, Y5K, o5K, t9K);
            S9K[y4A] = l8A;
            O5K[r0A](S9K);
            S9K[g4A] = Y5K / F7K | o9K;
            S9K[V4A] = o5K / F7K | o9K;
            S9K[w0A] = Y5K / F7K;
            S9K[a0A] = o5K / F7K;
            S9K[Y6K] = N6A;
            S9K[O6K] = G6A;
        }
        if (K9K) {
            O5K[r0A](K9K);
            K9K[w0A] = g9K;
            K9K[a0A] = n9K;
        }
        if (w9K == F7K) {
            var Q9K = new createjs[L4A]();
            Q9K[q4A][R5A](r5L[L5A] ? r5L[L5A] : G9L)[B9A](t7K, o9K)[B9A](t7K, -W7K)[B9A](b7K, F7K)[B9A](t7K, q7K)[B9A](t7K, W7K)[B9A](o9K, W7K)[B9A](o9K, o9K)[W9A]();
            Q9K[w0A] = Y5K - b7K - q7K;
            Q9K[a0A] = r5L[n6A] !== undefined ? r5L[n6A] : g6A;
            O5K[r0A](Q9K);
        }
        var s9K = new createjs[L4A]();
        s9K[q4A][R5A](b9L ? b9L : V6A)[Q4A](o9K, o9K, a9K ? a9K : Y5K, b9K ? b9K : o5K);
        s9K[w0A] = j9K;
        s9K[a0A] = D9K;
        O5K[r0A](s9K);
        s9K[y4A] = f6A;
        if (F9K) {
            B9K[N7A] = Y5K;
            O5K[r0A](B9K);
        }
        if (M9K) {
            O5K[g4A] = Y5K / F7K;
            O5K[V4A] = o5K / F7K;
        }
        if (m9K)
            O5K[k6A] = new createjs[s9A](l6A,F7K,F7K,t7K);
        if (!z9K) {
            O5K[W6K](e9A, function(f9K) {
                document[Z9A][T6K][A9A] = R9A;
            });
            O5K[W6K](T9A, function(l9K) {
                document[Z9A][T6K][A9A] = X9A;
            });
        }
        if (e9L == s6K)
            O5K[n7A](-(Y5K * S7A), -(o5K * S7A), Y5K + Y5K * s7A, o5K + o5K * s7A, O8A);
        if (H9K)
            u0K(O5K);
        return O5K;
    }
    function X0K() {
        if (r5L[X3A] == undefined)
            TweenLite[y3A](d9L, B7K, {
                scaleX: g8K
            });
    }
    var I6L = s6K;
    function l1K() {
        createjs[K0A][Q0A](i7K);
        createjs[K0A][W6K](h0A, h0K);
        createjs[K0A][W6K](h0A, N0K);
        window[C4A](w8L);
        I5L[J4A](q9L);
        I5L[J4A](g9L);
        I5L[J4A](n5L);
        I5L[y5A]();
        if (b9L && z7L)
            k9L = l6L();
        else if (Q9L) {
            var N2K = d5L[p4A](f3A);
            k9L = new createjs[h4A](N2K);
        } else {
            N2K = D5L[p4A](f3A);
            k9L = new createjs[h4A](N2K);
        }
        I5L[r0A](k9L);
        I5L[r0A](W9L);
        W9L[E4A] = s6K;
        n5L[E4A] = s6K;
        N7L();
    }
    var v6L = n6K;
    var u6L = n6K;
    var A8L = n6K;
    var D7L = z6K;
    var r8L = s6K;
    var I8L = s6K;
    var v0K;
    var M8L = s6K;
    var q7L = g7K;
    var z0K = $[g6K]();
    var m8L, s7L, W9L, n5L, a9L, X7L, D9L, V9L;
    var R5L;
    var T7L, h7L;
    var e8L = o9K;
    var x1K, U1K;
    var J9L = o9K;
    var X8L = o9K;
    var c1K;
    var A7L = [];
    function f1K() {
        var d6A = "onAppLoad";
        if (window[o6K][S0A])
            try {
                parent[d6A]();
            } catch (C9K) {}
    }
    var O8L = s6K;
    var r0K;
    var e7L, W7L;
    var u9L, w7L, O5L, u5L, G8L, n8L, Q0K, g8L, Z6L, L0K, w9L, Z5L, t0K, W0K, B0K, F0K, o6L;
    var Y6L = o9K;
    function T0K() {
        var r2A = "getDebug";
        var c2A = "getTime";
        var b2A = "waves";
        var a2A = "fc_ball_img";
        var w2A = "fc_ui_text_color";
        var p2A = "#";
        var h2A = "charAt";
        var K2A = "fc_ui_color";
        var q2A = "fc_banner_img";
        var L2A = "fc_background_img";
        var s2A = "fc_victory_html";
        var W2A = "hasExtraData";
        var B2A = "disable_cache_rendering";
        var F2A = "watermark_text_site_specific";
        var S2A = "watermark_not_for_public";
        var o1A = "animation_frames";
        var O1A = "image_stack";
        var Y1A = "animated";
        var X1A = "_welldone_path";
        var T1A = "welldone";
        var R1A = "fc2_ball_pos_y";
        var A1A = "fc2_btn_bold";
        var e1A = "fc_2";
        var d1A = "search";
        var i1A = "0";
        var x1A = "welldone_stars";
        var U1A = "_guiProgressTextColor";
        var y1A = "_guiInfoText";
        var E1A = "_guiActionButtonColorSecondary";
        var J1A = "_guiActionButtonColorMain";
        var C1A = "_landingTextInfoColor";
        var Z1A = "_landingTextColor";
        var l1A = "_landingColorSecondary";
        var f1A = "_landingColorMain";
        var V1A = "_guiProgressColorSecondary";
        var g1A = "_guiProgressColorMain";
        var n1A = "_guiLoaderColor";
        var G1A = "_guiTextColor";
        var N1A = "_guiColorSecondary";
        var k1A = "_guiBGColorSecondary";
        var u1A = "_guiBGColorMain";
        var D1A = "_guiColorMain";
        var j1A = "_skip_start_up";
        var P1A = "_pulse_done";
        var m1A = "game_rid";
        var z1A = "custom_fail_cross_url";
        var M1A = "custom_star_url";
        var H1A = "skip_answer_return";
        var I1A = "_rimColor";
        var r1A = "1";
        var c1A = "true";
        var b1A = "_disableRim";
        var a1A = "_disableFinalChalAfterSecChal";
        var w1A = "_disableFinalChallenge";
        var p1A = "_guiTaper";
        var h1A = "_guiTheme";
        var Q1A = "_trans_rightwayup_time_fadeindelay";
        var K1A = "_trans_rightwayup_time_fadein";
        var q1A = "_trans_rollball_time_fadeout";
        var L1A = "_guiNoInfoBG";
        var s1A = "_guiNoOverlay";
        var t1A = "_guiNoShadow";
        var W1A = "_guiNoOutline";
        var B1A = "_landing_bg";
        var F1A = "_landing_bg_path";
        var S1A = "_app_bg";
        var o0A = "_end_banner";
        var O0A = "_final_ball";
        var Y0A = "_guiMainFont";
        var X0A = "_meta_logo";
        var T0A = "_white_meta_logo";
        var R0A = "_intro_game_bg";
        var A0A = "base64_mode";
        var e0A = "timed_mode";
        var d0A = "encrypted_mode";
        var x0A = "display_fc_welldone";
        var U0A = "getHiddenTimedMode";
        var y0A = "getLang";
        var E0A = "string_table_prefixes";
        var J0A = "string_table";
        var C0A = "getStringTable";
        var Z0A = "getGameData";
        var l0A = "getSec";
        var f0A = "getSessionToken";
        var V0A = "getSID";
        var g0A = "getGameSid";
        var n0A = "getGameToken";
        var G0A = "showStartup";
        var N0A = "/images/template/fc_meta_solve_welldone.png";
        var k0A = "substr";
        var u0A = "string";
        var D0A = 'version/';
        var j0A = 'safari';
        var v0A = 'msie';
        var m0A = "/apps/canvas/001";
        var z0A = "getCDN";
        var S8K = 78;
        var K7K = 9;
        Q6L = parent[z0A]();
        U9L = Q6L + m0A;
        if (G0K)
            P9L = q6K;
        var d1K = navigator[P6K][j6K]();
        if (d1K[D6K](v0A) != -S7K)
            if (parseInt(d1K[P0A](v0A)[S7K]) == K7K)
                P9L = q6K;
        if (d1K[D6K](j0A) != -S7K) {
            var e1K = d1K[P0A](D0A)[S7K];
            if (typeof e1K === u0A)
                e1K = parseInt(e1K[k0A](o9K, S7K));
            if (e1K <= t7K)
                P9L = q6K;
        }
        if (P9L)
            U9L = H9L + U9L;
        P6L = U9L + N0A;
        P7L = parent[G0A]();
        p9L = parent[n0A]();
        b7L = parent[g0A]();
        u7L = parent[V0A]();
        Z7L = parent[f0A]();
        i9L = parent[l0A]();
        c5L = parent[Z0A]();
        var R1K = parent[C0A]();
        j9L = R1K[J0A];
        P8L = R1K[E0A];
        H5L = parent[y0A]();
        m7L = parent[U0A]();
        v9L = c5L[x0A];
        if (v9L) {
            q8L = q6K;
            X9L = q6K;
        }
        if (c5L[i0A][d0A]) {
            B9L = q6K;
            x7L = q6K;
        }
        if (c5L[i0A][e0A])
            I7L = q6K;
        if (c5L[i0A][A0A])
            x7L = q6K;
        if (c5L[i0A][R0A])
            Q9L = c5L[i0A][R0A];
        if (c5L[i0A][T0A])
            W6L = c5L[i0A][T0A];
        if (c5L[i0A][X0A])
            S7L = c5L[i0A][X0A];
        if (c5L[i0A][Y0A])
            M5L = c5L[i0A][Y0A];
        if (c5L[i0A][O0A])
            v8L = c5L[i0A][O0A];
        if (c5L[i0A][o0A])
            Z9L = c5L[i0A][o0A];
        if (c5L[i0A][S1A])
            s9L = c5L[i0A][S1A];
        if (c5L[i0A][F1A])
            B8L = c5L[i0A][F1A];
        if (c5L[i0A][B1A])
            N9L = c5L[i0A][B1A];
        if (c5L[i0A][W1A])
            d8L = c5L[i0A][W1A];
        if (c5L[i0A][t1A])
            G6L = c5L[i0A][t1A];
        if (c5L[i0A][s1A])
            N6L = c5L[i0A][s1A];
        if (c5L[i0A][L1A])
            y5L = c5L[i0A][L1A];
        if (c5L[i0A][q1A] !== undefined && parseInt(c5L[i0A][q1A]) >= o9K)
            v6L = parseInt(c5L[i0A][q1A]);
        if (c5L[i0A][K1A] !== undefined && parseInt(c5L[i0A][K1A]) >= o9K)
            u6L = parseInt(c5L[i0A][K1A]);
        if (c5L[i0A][Q1A] !== undefined && parseInt(c5L[i0A][Q1A]) >= o9K)
            A8L = parseInt(c5L[i0A][Q1A]);
        if (c5L[i0A][h1A])
            E5L = parseInt(c5L[i0A][h1A]);
        else
            E5L = o9K;
        if (c5L[i0A][p1A] !== undefined)
            z9L = parseInt(c5L[i0A][p1A]);
        if (c5L[i0A][w1A])
            T5L = c5L[i0A][w1A];
        if (c5L[i0A][a1A])
            if (i9L != t7K)
                T5L = c5L[i0A][a1A];
        if (c5L[i0A][b1A] == q6K || c5L[i0A][b1A] == c1A || c5L[i0A][b1A] == r1A || c5L[i0A][b1A] == S7K)
            k6L = q6K;
        if (c5L[i0A][I1A])
            Y7L = c5L[i0A][I1A];
        if (c5L[i0A][H1A])
            B6L = c5L[i0A][H1A];
        if (c5L[i0A][M1A])
            S8L = c5L[i0A][M1A];
        if (c5L[i0A][z1A])
            o7L = c5L[i0A][z1A];
        if (c5L[i0A][m1A])
            v0K = c5L[i0A][m1A];
        if (c5L[i0A][v1A])
            j8L = q6K;
        if (c5L[i0A][P1A])
            g6L = q6K;
        if (c5L[i0A][j1A])
            i7L = q6K;
        if (c5L[i0A][D1A]) {
            b9L = c5L[i0A][u1A];
            z7L = c5L[i0A][k1A];
            F9L = c5L[i0A][D1A];
            c9L = c5L[i0A][N1A];
            f5L = c5L[i0A][G1A];
            if (c5L[i0A][n1A])
                R9L = c5L[i0A][n1A];
            else
                R9L = f5L;
            if (c5L[i0A][g1A])
                v7L = c5L[i0A][g1A];
            else
                v7L = F9L;
            if (c5L[i0A][V1A])
                K7L = c5L[i0A][V1A];
            else
                K7L = c9L;
            if (c5L[i0A][f1A])
                A9L = c5L[i0A][f1A];
            else
                A9L = F9L;
            if (c5L[i0A][l1A])
                l9L = c5L[i0A][l1A];
            else if (c5L[i0A][f1A])
                l9L = c5L[i0A][f1A];
            else
                l9L = c9L;
            if (c5L[i0A][Z1A])
                G9L = c5L[i0A][Z1A];
            else
                G9L = f5L;
            if (c5L[i0A][C1A])
                R7L = c5L[i0A][C1A];
            else
                R7L = G9L;
            if (c5L[i0A][J1A])
                k8L = c5L[i0A][J1A];
            else
                k8L = F9L;
            if (c5L[i0A][E1A])
                Q8L = c5L[i0A][E1A];
            else
                Q8L = c9L;
            if (c5L[i0A][y1A])
                m5L = c5L[i0A][y1A];
            else
                m5L = f5L;
            if (c5L[i0A][U1A])
                A5L = c5L[i0A][U1A];
            else
                A5L = f5L;
        }
        if (c5L[i0A][x1A] === i1A)
            a8L = s6K;
        else
            a8L = q6K;
        for (var A1K in c5L[i0A])
            if (A1K[d1A](e1A))
                r5L[A1K] = c5L[i0A][A1K];
        if (r5L[A1A] !== undefined)
            j7L = p6K;
        O7L = r5L[R1A] ? r5L[R1A] : S8K;
        if (c5L[i0A][T1A]) {
            P6L = c5L[i0A][X1A];
            v9L = q6K;
        }
        if (c5L[i0A][Y1A] === S7K)
            b8L = q6K;
        if (c5L[i0A][O1A] === S7K)
            I6L = q6K;
        if (c5L[i0A][o1A])
            a6L = c5L[i0A][o1A];
        if (c5L[i0A][S2A] == q6K)
            y8L = q6K;
        if (c5L[i0A][F2A])
            J7L = c5L[i0A][F2A];
        if (c5L[i0A][B2A] == q6K)
            e9L = q6K;
        if (parent[W2A]())
            v9L = s6K;
        if (c5L[t2A]) {
            if (c5L[t2A][s2A]) {
                X9L = q6K;
                W8L = c5L[t2A][s2A];
            }
            if (c5L[t2A][L2A] && c5L[t2A][L2A] != p6K) {
                if (Q9L) {
                    N9L = q6K;
                    B8L = s9L;
                }
                s9L = H9L + c5L[t2A][L2A];
                c6L = q6K;
            }
            if (c5L[t2A][q2A] && c5L[t2A][q2A] != p6K) {
                v9L = s6K;
                a8L = s6K;
                Z9L = H9L + c5L[t2A][q2A];
            }
            if (c5L[t2A][K2A] && c5L[t2A][K2A] != p6K)
                if (c5L[t2A][K2A][Q2A] == L7K && c5L[t2A][K2A][h2A](o9K) == p2A) {
                    A9L = F9L;
                    l9L = c9L;
                    F9L = c9L = c5L[t2A][K2A];
                    v7L = K7L = k8L = Q8L = F9L;
                }
            if (c5L[t2A][w2A] && c5L[t2A][w2A] != p6K)
                if (c5L[t2A][w2A][Q2A] == L7K && c5L[t2A][w2A][h2A](o9K) == p2A) {
                    G9L = f5L;
                    f5L = c5L[t2A][w2A];
                    m5L = A5L = f5L;
                }
            if (c5L[t2A][a2A] && c5L[t2A][a2A] != p6K)
                v8L = H9L + c5L[t2A][a2A];
        }
        if (!i9L)
            i9L = I7K;
        switch (i9L) {
        case t7K:
            j5L = o9K;
            break;
        }
        if (c5L[b2A]) {
            j5L = c5L[b2A];
            if (c5L[b2A] > t7K) {
                j5L = c5L[b2A];
                i9L = j7K;
            }
        }
        if (P9L) {
            s9L = H9L + s9L;
            Z9L = H9L + Z9L;
        }
        p7L = parent[c2A]();
        D0K = parent[r2A]();
        B1K();
    }
    var U7L = s6K;
    function h6L() {
        var o8K = 1100;
        if (!U7L) {
            B9L && r6L();
            setTimeout(function() {
                h6L();
            }, o8K);
            return s6K;
        }
        U7L = s6K;
        l8L();
        if (!i5L) {
            p7L += x9L;
            x9L = o9K;
            p6L();
            z5L = g0K;
            W7L = K9L;
            TweenLite[y3A](z5L, B9L ? S7A : n6K, {
                scaleX: S7K,
                scaleY: S7K,
                x: j8K,
                y: O7L,
                onComplete: y0K
            });
            TweenLite[y3A](this, B9L ? S7A : n6K, {
                onComplete: d0K
            });
            if (x5L == j5L + S7K)
                z8L = q6K;
            if (e5L < j5L && !D8L())
                TweenLite[y3A](this, B9L ? S7A : n6K, {
                    onComplete: G7L
                });
        }
    }
    var y7L = o9K;
    var m7L = s6K;
    var J8L;
    var j6L = s6K;
    function C0K() {
        var g7A = 30.5;
        var G7A = "51.9 ";
        var P7A = 14.5;
        var v7A = 2.5;
        var z7A = "#c2c5c9";
        var z8K = 136;
        var X7K = 71;
        var d7K = 61;
        var D7K = 33;
        var M7K = 23;
        var c7K = 16;
        G5L = new createjs[p0A]();
        var r3K = z8K;
        var I3K = X7K;
        var c3K = F7L([[H5A, z8K], [O4A, d7K], [o4A, o9K], [t5A, z9L], [I7A, D7K], [q5A, r5L[K5A] !== undefined ? r5L[K5A] : s7K], [Q5A, q6K], [p5A, C9L], [w5A, v7L], [a5A, K7L], [B5A, s6K]]);
        I5L[r0A](G5L);
        G5L[r0A](c3K);
        if (j5L < Q7L) {
            var w3K = M0K(A5L);
            w3K[a0A] = a7K;
            if (parent[H7A] !== M7A)
                G5L[r0A](w3K);
        }
        switch (j5L) {
        case S7K:
            _varX = j7K;
            w3K[w0A] = O7K;
            break;
        case F7K:
            _varX = M7K;
            w3K[w0A] = O7K;
            break;
        case B7K:
            _varX = I7K;
            w3K[w0A] = s8K;
            break;
        case W7K:
            _varX = s7K;
            w3K[w0A] = K8K;
            break;
        default:
            _varX = p7K;
        }
        if (T5L || j5L >= Q7L)
            _varX += q7K;
        else if (w3K)
            w3K[w0A] = w3K[w0A] + p7K;
        if (j5L < t7K)
            _varX += Q7K;
        else
            _varX += B7K;
        for (var b3K = o9K; b3K <= j5L - (T5L ? S7K : o9K); b3K++)
            if (b3K < Q7L) {
                var p3K = new createjs[L4A]();
                if (A5L === c6K) {
                    p3K[q4A][X5A](S7K, F7K, F7K);
                    p3K[q4A][Y5A](z7A);
                    p3K[q4A][Q4A](-s7K, S7K, r7K, r7K);
                }
                p3K[q4A][X5A](S7K, F7K, F7K);
                p3K[q4A][Y5A](A5L);
                p3K[q4A][Q4A](-t7K, o9K, r7K, r7K);
                p3K[m7A] = S7K;
                G5L[r0A](p3K);
                p3K[w0A] = _varX - v7A;
                p3K[a0A] = P7A;
                var a3K = new createjs[L4A]();
                a3K[q4A][X5A](B7K, F7K)[Y5A](A5L)[b9A](B7K, q7K)[B9A](s7K, p7K)[B9A](b7K, o9K);
                G5L[r0A](a3K);
                a3K[j7A] = b3K + S7K;
                a3K[w0A] = _varX - L7K;
                a3K[a0A] = c7K;
                a3K[m7A] = S7K;
                _varX += I7K;
                a3K[E4A] = s6K;
            }
        f9L = new createjs[D7A](F0K,c7A + M5L,A5L);
        f9L[u7A] = k7A;
        f9L[N7A] = z8K;
        f9L[w0A] = e7K;
        f9L[a0A] = k7K;
        G5L[r0A](f9L);
        m9L = new createjs[D7A](G7A + n8L,r7A + M5L,A5L);
        m9L[u7A] = k7A;
        m9L[N7A] = b8K;
        m9L[w0A] = e7K;
        m9L[a0A] = u7K;
        G5L[r0A](m9L);
        m9L[E4A] = s6K;
        if (e9L == s6K)
            G5L[n7A](o9K, o9K, r3K, I3K);
        G5L[E4A] = s6K;
        G5L[w0A] = l5L / F7K - R7K;
        G5L[a0A] = E7L / F7K - g7A;
        c3K[w0A] = -B7K;
        c3K[a0A] = -B7K;
    }
    var D6L = s6K;
    var E8L = o9K;
    var S0K;
    var Z8L = s6K;
    var n7L = q6K;
    var o8L = s6K;
}());
