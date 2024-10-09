const handleRegister = (req, res, db, bcrypt)=>{
	const { email, name, password } = req.body;
	//backend validation
	if (! email || !name || !password){
		return res.status(400).json('incorrect form credentials')
	}
	const hash = bcrypt.hashSync(password);
	//doing transaction-first trx is insert
	db.transaction(trx =>{
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login') //updating login table
		.returning('email')
		.then(loginEmail =>{
		  return trx('users')
			.returning('*')
			.insert({
				email: loginEmail[0].email,
				name: name,
				joined: new Date()
			})
			.then(user =>{
				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('unable to register'))
}

module.exports ={
	handleRegister: handleRegister
}