const express = require('express');
const router = express.Router();
const loadJsonFile = require('load-json-file');

router.get('/', (req, res, next) => {
	loadJsonFile('./src/config/database/dev.json').then(json => {
    
    
    console.log(json.dev);
	});

	res.status(200).send({
		restfull: "Igreja API",
		versao: "1.0.1"
	});
});
module.exports = router;