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
	const lines = contentToParse.replace(new RegExp('\\r', 'g'), '').split('\n');
	if (lines[lines.length - 1] === '')
		lines.splice(lines.length - 1, 1);
	const [v, h] = lines.splice(0, 1)[0].split(' ');
	const map = lines.splice(0, +h);
	const developersCount = +lines.splice(0, 1)
	const initialDevelopers = lines.splice(0, developersCount).map((developer, index) => {
		const args = developer.split(" ");
		return {
			id: index,
			company: args[0],
			bonusPotential: args[1],
			numberOfSkills: +args[2],
			skills: [args.splice(3, args.length)]
		}
	});
	const managersCount = +lines.splice(0, 1)
	const initialManagers = lines.splice(0, managersCount).map((manager, index) => {
		const args = manager.split(" ");
		return {
			id: index,
			company: args[0],
			bonusPotential: args[1]
		}
	});
	return { initialManagers, initialDevelopers, map }
}

function compute(map, developers, managers) {
	const hLength = map.length;
	const vLength = map[0].length;

	let devCount = 0;
	let manCount = 0;

	for (let i = 0; i < hLength; i++) {
		for (let j = 0; j < vLength; j++) {
			if (manCount === managers.length && devCount === developers.length) break;

			// random placement
			if (map[i][j] === '_' && devCount < developers.length) {
				developers[devCount].placement = { h: i, v: j };
				devCount++;
			} else if (map[i][j] === 'M' && manCount < managers.length) {
				managers[manCount].placement = { h: i, v: j };
				manCount++;
			}
		}
	}

	return { developers, managers };
}

function parseOutput(developers, managers) {
	const results = [];
	// todo ? order developers by id
	developers.forEach(el => {
		results.push(el.placement ? `${el.placement.v} ${el.placement.h}` : 'X')
	});

	managers.forEach(el => {
		results.push(el.placement ? `${el.placement.v} ${el.placement.h}` : 'X')
	});

	return results;
}


const content = readContent();

const { map, initialDevelopers, initialManagers } = parseInput(content);

const { developers, managers } = compute(map, initialDevelopers, initialManagers);

const parsedOutput = parseOutput(developers, managers);

writeToFile(parsedOutput);