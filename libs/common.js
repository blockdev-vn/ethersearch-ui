class Common {
    static shortTextEndingWithDot(s, len) {
        if(!s) return s;
        if(s.length > len) {
            return s.substr(0,len) + '...'
        }
        return s +'...'
    }
}
module.exports = Common;