var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');


exports.db = function() {
	db.serialize(function() {
	    db.run("CREATE TABLE if not exists lorem (info TEXT)");

	    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
	    for (var i = 0; i < 10; i++) {
		stmt.run("Ipsum " + i);
	    }
	    stmt.finalize();

	    db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
		console.log(row.id + ": " + row.info);
	    });
	});

	db.close();
};
