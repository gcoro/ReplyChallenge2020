const path = process.argv[2];
const name = path.split('/')[path.split('/').length - 1].split('.')[0];
const fs = require('fs');

function readContent() {
	return fs.readFileSync(path, 'utf8');
}

function writeToFile(rows) {
	fs.writeFileSync('./solutions/' + name + '.out', rows.join('\n'), 'utf8')
}

function parseInput(contentToParse) {
return contentToParse
}

function parseOutput(developers, managers) {
	const results = [];
	// todo ? order developers by id
	developers.forEach(el => {
		results.push(el.placement ? `${el.placement.h} ${el.placement.v}` : 'X')
	});

	managers.forEach(el => {
		results.push(el.placement ? `${el.placement.h} ${el.placement.v}` : 'X')
	});

	return results;
}


const content = readContent();

const { } = parseInput(content);


const result = ['test']

const parsedOutput = parseOutput(result);
// OOOH
writeToFile(parsedOutput);