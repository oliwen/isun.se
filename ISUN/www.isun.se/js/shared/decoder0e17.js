var StringDecoder = function () {
    var self = this;

    self.decode = function (r) {
        if (r != null) {
            var b = unescapeData(r);
            var c = "$#}*,-./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ:;?^_[ ]()|~abcdefghijklmnopqrstuvwxyz!{";
            var e = "";
            var f = b.length;
            for (var g = 0; g < f; g++) {
                var h = b.charAt(g);
                var i = c.indexOf(h);
                switch (i) {
                    case -1:
                        e += h;
                        break;
                    case 1:
                        e += b.charAt(++g);
                        break;
                    default:
                        e += String.fromCharCode(i + 28);
                        break
                }
            }
            return e;
        }
        return null
    }
    var unescapeData = function (s) {
        return unescape(s.replace(/\+/g, " "))
    }

}