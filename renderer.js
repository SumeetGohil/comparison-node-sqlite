'use strict';

var $ = require('jQuery');
var DbHelper = require('./dbHelper');
window.DbHelper = DbHelper;

$('button').click(function() {

    setTimeout(() => {
        new DbHelper().executeSqlite3({
            sql: $('textarea').val()
        }).then(function (data) {
            console.log('SQLITE Data', data);
        }).catch(function (err) {
            console.log('SQLITE DB Error ', err);
        });
    }, 0);
    setTimeout(() => {
        new DbHelper().execute({
            sql: $('textarea').val()
        }).then(function (data) {
            console.log('Data', data);
        }).catch(function (err) {
            console.log('DB Error ', err);
        });
    }, 0);

});