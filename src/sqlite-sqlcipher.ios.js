function toCharPtr(str) {
    const objcStr = NSString.stringWithString(str);
    const bufferSize = strlen(objcStr.UTF8String) + 1;
    const buffer = interop.alloc(bufferSize);

    objcStr.getCStringMaxLengthEncoding(buffer, bufferSize, NSUTF8StringEncoding);

    return buffer;
}

module.exports = {
    init: function(options, callback) {
        if(options && options.key && typeof options.key === 'string' && options.key.length > 0){
            const key = toCharPtr(options.key);
            const length = strlen(key);
            let response = sqlite3_key_v2(this._db, this._dbnamePtr, key, length);
        }
        callback();
    }
};