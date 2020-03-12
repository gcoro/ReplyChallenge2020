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

function parseOutput(results) {
	return results
}


const content = readContent();

const { } = parseInput(content);


const result = ['test']

const parsedOutput = parseOutput(result);
// OOOH
writeToFile(parsedOutput);