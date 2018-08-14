class Common {
    static shortTextEndingWithDot(s, len) {
        if(s.length > len) {
            return s.substr(0,len) + '...'
        }
        return s +'...'
    }
}

window.Common = Common;