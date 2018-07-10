var express = require('express')
var app = express()

app.get('/', function (req, res, next) {
	req.getConnection(function (error, conn) {
		conn.query('SELECT * FROM espetaculo ORDER BY id DESC', function (err, rows, fields) {
			if (err) {
				req.flash('error', err)
				res.render('espetaculo/list', {
					title: 'espetaculo List',
					data: ''
				})
			} else {
				res.render('espetaculo/list', {
					title: 'espetaculo List',
					data: rows
				})
			}
		})
	})
})


app.get('/add', function (req, res, next) {
	res.render('espetaculo/add', {
		title: 'Adicionar novo espetaculo',
		name: '',
		data_cadastro: '',
		data_apresentacao: ''
	})
})

app.post('/add', function (req, res, next) {
	req.assert('name', 'Nome é obrigatório').notEmpty()           //Validate name
	req.assert('data_cadastro', 'A data de cadastro é obrigatoria').notEmpty()             //Validate data_cadastro
	req.assert('data_apresentacao', 'A data da apresentação é obrigatoria').isdata_apresentacao()  //Validate data_apresentacao

	var errors = req.validationErrors()

	if (!errors) {

		var espetaculo = {
			name: req.sanitize('name').escape().trim(),
			data_cadastro: req.sanitize('data_cadastro').escape().trim(),
			data_apresentacao: req.sanitize('data_apresentacao').escape().trim()
		}

		req.getConnection(function (error, conn) {
			conn.query('INSERT INTO espetaculo SET ?', espetaculo, function (err, result) {

				if (err) {
					req.flash('error', err)

					res.render('espetaculo/add', {
						title: 'Adicionar novo espetaculo',
						name: espetaculo.name,
						data_cadastro: espetaculo.data_cadastro,
						data_apresentacao: espetaculo.data_apresentacao
					})
				} else {
					req.flash('success', 'Data added successfully!')

					res.render('espetaculo/add', {
						title: 'Adicionar novo espetaculo',
						name: '',
						data_cadastro: '',
						data_apresentacao: ''
					})
				}
			})
		})
	}
	else {
		var error_msg = ''
		errors.forEach(function (error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)

		res.render('espetaculo/add', {
			title: 'Adicionar novo espetaculo',
			name: req.body.name,
			data_cadastro: req.body.data_cadastro,
			data_apresentacao: req.body.data_apresentacao
		})
	}
})

app.get('/edit/(:id)', function (req, res, next) {
	req.getConnection(function (error, conn) {
		conn.query('SELECT * FROM espetaculo WHERE id = ' + req.params.id, function (err, rows, fields) {
			if (err) throw err


			if (rows.length <= 0) {
				req.flash('error', 'espetaculo not found with id = ' + req.params.id)
				res.redirect('/espetaculos')
			}
			else {
				res.render('espetaculo/edit', {
					title: 'Edit espetaculo',
					id: rows[0].id,
					name: rows[0].name,
					data_cadastro: rows[0].data_cadastro,
					data_apresentacao: rows[0].data_apresentacao
				})
			}
		})
	})
})

app.put('/edit/(:id)', function (req, res, next) {
	req.assert('name', 'Name é obrigatório').notEmpty()           //Validate name
	req.assert('data_cadastro', 'data_cadastro é obrigatório').notEmpty()             //Validate data_cadastro
	req.assert('data_apresentacao', 'A valid data_apresentacao é obrigatório').isdata_apresentacao()  //Validate data_apresentacao

	var errors = req.validationErrors()

	if (!errors) {
		var espetaculo = {
			name: req.sanitize('name').escape().trim(),
			data_cadastro: req.sanitize('data_cadastro').escape().trim(),
			data_apresentacao: req.sanitize('data_apresentacao').escape().trim()
		}

		req.getConnection(function (error, conn) {
			conn.query('UPDATE espetaculos SET ? WHERE id = ' + req.params.id, espetaculo, function (err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)

					// render to views/espetaculo/add.ejs
					res.render('espetaculo/edit', {
						title: 'Edit espetaculo',
						id: req.params.id,
						name: req.body.name,
						data_cadastro: req.body.data_cadastro,
						data_apresentacao: req.body.data_apresentacao
					})
				} else {
					req.flash('Sucesso', 'Dados atualizados com sucesso!')

					// render to views/espetaculo/add.ejs
					res.render('espetaculo/edit', {
						title: 'Edit espetaculo',
						id: req.params.id,
						name: req.body.name,
						data_cadastro: req.body.data_cadastro,
						data_apresentacao: req.body.data_apresentacao
					})
				}
			})
		})
	}
	else {   //Display errors to espetaculo
		var error_msg = ''
		errors.forEach(function (error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)

		res.render('espetaculo/edit', {
			title: 'Edit espetaculo',
			id: req.params.id,
			name: req.body.name,
			data_cadastro: req.body.data_cadastro,
			data_apresentacao: req.body.data_apresentacao
		})
	}
})

app.delete('/delete/(:id)', function (req, res, next) {
	var espetaculo = { id: req.params.id }

	req.getConnection(function (error, conn) {
		conn.query('DELETE FROM espetaculo WHERE id = ' + req.params.id, espetaculo, function (err, result) {

			if (err) {
				req.flash('error', err)
				res.redirect('/espetaculos')
			} else {
				req.flash('success', 'espetaculo deletado com sucesso! id = ' + req.params.id)
				res.redirect('/espetaculos')
			}
		})
	})
})

module.exports = app
