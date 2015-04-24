/*..............................................................................
................................???,.....,?????==,,,,,,.........................
...............................?????.....??????????????????+~...................
..............................,?????....=???,...................................
..............................??????...,???:....................................
.............................???????...????.....................................
............................,???:???,.=???,.....................................
...................,?????~..????.???,,???+......................................
................+?????????.????,.???,????.......................................
..............=???????~,,.,???=..???~???,.......................................
.............?????,.......????...???????........................................
............????:........=???,...??????.........................................
...........=???:........,????....~????,.........................................
...........????.........????.....,????.EGDEN..........www.negden.com............
...........????........????,......,,,...........................................
...........????+.....,????,.....................................................
...........,??????:+?????:......................................................
............,???????????........................................................
..............,=?????,..........................................................
.....................ALL RIGHTS RESERVED........Author:Jonathan Rivalan.......*/

$(document).ready(function () {
    function a() {
        function P(a, b) {
            z = b + 1;
            return Math.floor(Math.random() * (z - a) + a)
        }
        function O(a) {
            return Math.floor(Math.random() * a)
        }
        function N() {
            bulle = new Object;
            b = bulle, b.mX = 10, b.my = 10;
            b.Osize = P(c, d);
            b.size = b.Osize;
            b.area = b.size * 2;
            var a = P(0, 3),
                k = P(0, 3);
            b.color = g[a];
            b.color2nd = h[k];
            if (i == 2 | i == 4) {
                b.color = j
            }
            var l = P(e, f / 2);
            var m = P(1, 999);
            b.speed = "0.00" + l + "" + m;
            b.counter = 0;
            var n = P(1, 2);
            switch (n) {
            case 1:
                var o = u + b.size * 3;
                b.x = O(t);
                b.y = o;
                break;
            case 2:
                var p = t + b.size * 3;
                b.x = p;
                b.y = O(u);
                break
            }
            b.dx = -(Math.floor(Math.random() * t) + 500);
            b.dy = -(Math.floor(Math.random() * u) + 500);
            bulle = b;
            return bulle
        }
        function M(a, b) {
            b.fillStyle = a.color;
            b.beginPath();
            b.arc(a.x, a.y, a.size, r, s, false);
            b.globalAlpha = .4;
            b.closePath();
            b.fill()
        }
        function L(b) {
            b.clearRect(0, 0, t, u);
            for (i = 1; i <= a; i++) {
                var c = bulleZ[i],
                    d = (c.dx - c.x) * c.speed,
                    e = (c.dy - c.y) * c.speed;
                c.x += d;
                c.y += e;
                if (c.x >= -c.area) {
                    c.x += d;
                    c.y += e;
                    M(c, b)
                } else if (c.counter == 0) {
                    c.counter += 1;
                    m += 1;
                    if (m == a) {
                        m = 0;
                        cancelAnimationFrame(bAnim)
                    }
                }
            }
        }
        function K(b, c) {
            for (i = 1; i <= a; i++) {
                var d = bulleZ[i],
                    e = d.size * .2,
                    f = d.size * .5,
                    g = d.size * d.speed * 10,
                    h = d.size * d.speed * 8,
                    k = O(4) * d.speed,
                    l = d.x - d.size,
                    m = d.y - d.size,
                    n = d.x + d.size,
                    o = d.y + d.size,
                    p = d.x - f,
                    q = d.y - f,
                    r = d.x + f,
                    s = d.y + f,
                    t = d.x - e,
                    u = d.y - e,
                    t = d.x + e,
                    u = d.y + e;
                if (b >= l && b <= n && c >= m && c <= o) {
                    d.size -= g;
                    d.x -= k + h;
                    d.y += k;
                    d.color = d.color2nd
                } else if (b >= p && b <= r && c >= q && c <= s) {
                    d.size += h;
                    d.y -= c + k;
                    d.x += b + h
                } else if (b >= t && b <= t && c >= u && c <= u) {
                    d.x += b + h;
                    d.color = j
                } else {
                    d.size = d.Osize
                }
            }
        }
        function J() {
            var a = (1e3 / D).toFixed(1) + "fps";
            G.innerHTML = a
        }
        function I() {
            L(A, x);
            x.clearRect(0, 0, t, u);
            x.drawImage(y, 0, 0);
            bAnim = requestAnimationFrame(I);
            var a = (F = new Date) - E;
            D += (a - D) / C;
            E = F
        }
        function H() {
            bAnim = requestAnimationFrame(H);
            L(x);
            var a = (F = new Date) - E;
            D += (a - D) / C;
            E = F
        }
        function B() {
            m = 0;
            bulleZ = new Array;
            for (i = 1; i <= a; i++) {
                bulleZ[i] = N()
            }
            setTimeout(function () {
                if (l == "render") {
                    H();
                    $("#rend").text("// rendu direct")
                } else if (l == "prerender") {
                    I();
                    $("#rend").text("// pré-rendu")
                } else {
                    H()
                }
            }, k)
        }
        var a = 50,
            c = 4,
            d = 100,
            e = 0,
            f = 5,
            g = ["#45d0fd", "#0096ff", "#1377d4", "#5192d5"],
            h = ["#ffa800", "#ff7e00", "#5bd40b", "#ff004e"],
            j = "#ff004e",
            k = 500,
            l = "render";
        var m = 0,
            n = 0,
            o = 3,
            p = 0,
            q = 0,
            r = 0 * Math.PI,
            s = 2 * Math.PI;
        var t = $(window).width();
        var u = $(window).height();
        var v = $("html");
        v.prepend('<canvas id="canvas1" width="' + t + '" height="' + u + '"></canvas>');
        var w = document.getElementById("canvas1");
        var x = w.getContext("2d");
        var y = document.createElement("canvas");
        y.width = t;
        y.height = u;
        var A = y.getContext("2d");
        $(document).mousemove(function (a, b, c) {
            b = a.pageX, c = a.pageY;
            K(b, c)
        });
        B();
        var C = 20;
        var D = 0,
            E = new Date,
            F;
        var G = document.getElementById("fps");
        setInterval(J, 1e3);
        (function () {
            var a = 0;
            var b = ["ms", "moz", "webkit", "o"];
            for (var c = 0; c < b.length && !window.requestAnimationFrame; ++c) {
                window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"];
                window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"]
            }
            if (!window.requestAnimationFrame) window.requestAnimationFrame = function (b, c) {
                var d = (new Date).getTime();
                var e = Math.max(0, 16 - (d - a));
                var f = window.setTimeout(function () {
                    b(d + e)
                }, e);
                a = d + e;
                return f
            };
            if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (a) {
                clearTimeout(a)
            }
        })();
        (function Q() {
            var a = $(".demo");
            a.click(function () {
                var a = $(window).width();
                var b = $(window).height();
                w = $("#canvas1");
                cancelAnimationFrame(bAnim);
                w.fadeToggle("slow").fadeToggle("slow");
                n += 1;
                B();
                if (n <= 1) {} else {
                    n = 0;
                    fpsControl = $("#fps").html().split(".");
                    if (fpsControl[0] >= 600) {
                        v.append('<div id="negPop" width="' + a + '" height="' + b + '"><p>Too many<br> fps!<br>:(</p></div>')
                    } else {
                        var c = '<div id="negPop" width="' + a + '" height="' + b + '"><p>Get a<br>life<br>!:)</p></div>';
                        v.append(c);
                        Rideau = $("#negPop");
                        Rideau.click(function () {
                            Rideau.remove();
                            cancelAnimationFrame(bAnim);
                            w.fadeToggle("slow").fadeToggle("fast");
                            B()
                        })
                    }
                }
            })
        })()
    }
    a()
})


