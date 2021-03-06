
/*
 * GET users listing.
 */

exports.list = function (req, res) {
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM espetaculo', function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('customers', { page_title: "Show - SAE Desafia - Node.js", data: rows });
        });
        //console.log(query.sql);
    });
};

exports.hall = function (req, res) {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAaa');
    res.render('hall');

};


exports.add = function (req, res) {
    res.render('add_customer', { page_title: "Add Show - SAE Desafia - Node.js" });
};

exports.edit = function (req, res) {
    var id = req.params.id;
    req.getConnection(function (err, connection) {
        var query = connection.query('SELECT * FROM espetaculo WHERE id = ?', [id], function (err, rows) {
            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('edit_customer', { page_title: "Edit Show - SAE Desafia - Node.js", data: rows });
        });

        //console.log(query.sql);
    });
};

/*Save the customer*/
exports.save = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {
        var data = {
            name: input.name,
            date: input.date,
            ranking: input.ranking,
            value: input.value,
            info: input.info
        };

        var query = connection.query("INSERT INTO espetaculo set ? ", data, function (err, rows) {
            if (err)
                console.log("Error inserting : %s ", err);

            res.redirect('/customers');
        });
    });
};

exports.save_edit = function (req, res) {

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {
        var data = {
            name: input.name,
            date: input.date,
            ranking: input.ranking,
            value: input.value,
            info: input.info
        };

        connection.query("UPDATE espetaculo set ? WHERE id = ? ", [data, id], function (err, rows) {
            if (err)
                console.log("Error Updating : %s ", err);

            res.redirect('/customers');

        });

    });
};


exports.delete_customer = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query("DELETE FROM espetaculo  WHERE id = ? ", [id], function (err, rows) {
            if (err)
                console.log("Error deleting : %s ", err);

            res.redirect('/customers');

        });

    });
};


