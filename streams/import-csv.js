import { parse } from 'csv-parse';
import fs from 'node:fs';

const csvFile = new URL('./tasks.csv', import.meta.url);

const stream = fs.createReadStream(csvFile);

const csvParse = parse({
  delimiter: ',',
  skipEmptyLines: true,
  fromLine: 2
});

async function run() {
  const linesParse = stream.pipe(csvParse);

  for await (const line of linesParse) {
    const [title, description] = line;

    await fetch('http://localhost:3003/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })

  }

}

run()
