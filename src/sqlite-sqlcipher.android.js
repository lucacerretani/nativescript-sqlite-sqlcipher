module.exports = {
    prototypes: {
        _openDatabase: function(dbName, flags, options, context) {
            net.sqlcipher.database.SQLiteDatabase.loadLibs(context);
    
            if (dbName === ":memory:") {
                return net.sqlcipher.database.SQLiteDatabase.create(null);
            } else {
            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                if(options && options.key && typeof options.key === 'string' && options.key.length > 0){
                return net.sqlcipher.database.SQLiteDatabase.openOrCreateDatabase(dbName, options.key, null);
                }
                return android.database.sqlite.SQLiteDatabase.openDatabase(dbName, null, flags | 0x10000000);
            }
        }
    }
};