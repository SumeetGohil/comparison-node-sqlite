'use strict';

const DB_PATH = "/Users/Sumeet/Downloads/vedabase-fts.db";
const Database = require('better-sqlite3');
const sqlite3 = require('sqlite3');

sqlite3.verbose();
function DbHelper() {
}

DbHelper.prototype.createVTable = function (params) {
    try{
        var db = new Database(DB_PATH);
        var drop = db.prepare('DROP TABLE fts_books').run();
        console.log('DROP STATUS ', drop);
        var create = db.prepare('CREATE VIRTUAL TABLE fts_books USING fts5(title, text)').run();
        console.log('CREATE STATUS ', create);
        var rows = db.prepare('SELECT * FROM BOOKS').all();
        console.log(rows);
        for(var i=0;i < rows.length; i++ ){
            if(rows[i]) {
                console.log(rows[i]);
                var insert = db.prepare('INSERT INTO fts_books values(@title,@text)').run(rows[i])
                console.log('INSERT STATUS ', insert);
            }
        }

        // db.close();
    }
    catch(e){
        console.log(e);
    }
}

DbHelper.prototype.executeSqlite3 = function (args) {
    return new Promise(function(resolve, reject){
        try{

            var db = new sqlite3.Database(DB_PATH);
            if(args.sql.toLowerCase().indexOf('select') != -1){
                db.all(args.sql, function(err, rows){
                    if(err) return reject(err);
                    return resolve(rows);
                })
            }else{
                db.run(args.sql, function (err, info) {
                    if (err) return reject(err);
                    return resolve(info);
                })
            }
        }catch(e){ reject(e) }
    });
}

DbHelper.prototype.execute = function (args) {
    return new Promise(function(resolve, reject){
        try{

            var db = new Database(DB_PATH);
            var stmt = db.prepare(args.sql);
            if(args.sql.toLowerCase().indexOf('select') != -1){
                var rows = stmt.all();
                return resolve(rows);
            }else{
                var info = stmt.run();
                resolve(info);
            }
        }catch(e){ reject(e) }
    });
}


module.exports = DbHelper;