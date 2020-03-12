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
	const map = lines.splice(0, +h).map(line => line.split(''));
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

function tryToFill(company, i, j, map) {
	if ((!company.managers.length && !company.developers.length) || map[i][j] === "#" || map[i][j] === 'O')
		return

	//developers[devCount].placement = { h: i, v: j };
	if (map[i][j] === "M" && company.managers.length > 0) {
		company.managers.pop().placement = { h: i, v: j };
		map[i][j] = 'O'
	} else if (map[i][j] === "_" && company.developers.length > 0) {
		company.developers.pop().placement = { h: i, v: j };
		map[i][j] = 'O'
	} else return;

	if (map[i + 1] && (map[i + 1][j] === "M" || map[i + 1][j] === "_"))
		tryToFill(company, i + 1, j, map)
	if (map[i][j + 1] === "M" || map[i][j + 1] === "_")
		tryToFill(company, i, j + 1, map)
	if (map[i - 1] && (map[i - 1][j] === "M" || map[i - 1][j] === "_"))
		tryToFill(company, i - 1, j, map)
	if (map[i][j - 1] === "M" || map[i][j - 1] === "_")
		tryToFill(company, i, j - 1, map)
}

function compute(map, developers, managers) {

	const hLength = map.length;
	const vLength = map[0].length;

	const companiesMap = {

	}

	developers.forEach(developer => {
		if (!companiesMap[developer.company]) {
			companiesMap[developer.company] = {
				developers: [],
				managers: []
			}
		}

		companiesMap[developer.company].developers.push(developer)
	})

	managers.forEach(manager => {
		if (!companiesMap[manager.company]) {
			companiesMap[manager.company] = {
				developers: [],
				managers: []
			}
		}


		companiesMap[manager.company].managers.push(manager)
	})

	for (let i = 0; i < hLength; i++) {
		for (let j = 0; j < vLength; j++) {

			/* random placement
			if (manCount === managers.length && devCount === developers.length) break;
			if (map[i][j] === '_' && devCount < developers.length) {
				developers[devCount].placement = { h: i, v: j };
				devCount++;
			} else if (map[i][j] === 'M' && manCount < managers.length) {
				managers[manCount].placement = { h: i, v: j };
				manCount++; 
			}*/

			// keep near same company peeps
			if (map[i][j] === '_' || map[i][j] === 'M') {
				// place developers
				const company = Object.keys(companiesMap)[0];
				if (!company)
					break;
				tryToFill(companiesMap[company], i, j, map);
				if (companiesMap[company].developers.length === 0)
					delete companiesMap[company];
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