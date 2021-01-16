const http = require('http');
const parseString = require('xml2js').parseString;
const xmlbuilder = require('xmlbuilder')

let xmldoc = xmlbuilder.create('NodeJs').att('number', '322').att('korpus', '1');
xmldoc.ele('student').att('id', '1').att('name', 'Danik').att('sername', 'Motolyha').txt('wants to get good mark :)))')
	.up().ele('student').att('id', '2').att('name', 'Polina').att('sername', 'Ozeredova').txt('wants to get good mark Tooo___:)))')

const options = {
	host: 'localhost',
	path: '/exm',
	port: 3000,
	method: 'POST',
	headers: {
		"Content-Type": "text/xml", "accept": "text/xml"
	}
}

const req = http.request(options, (res) => {
	let data = '';
	res.on('data', (chunk) => {
		data += chunk;
	})
	res.on('end', () => {
		console.log(data);
		parseString(data, (err, str) => {
			if (err)
				console.log('xml parse error');
			else {
				console.log('str: ', str);
				console.log('str.result: ', str.NodeJs.student);
			}
		})
	})
})
req.write(xmldoc.toString({ pretty: true }))
req.end();