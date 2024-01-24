import { parse } from "csv-parse";
import fs from "node:fs";

const csvFile = new URL("../tasks.csv", import.meta.url);

const stream = fs.createReadStream(csvFile);

const csvParse = parse({
  fromLine: 2,
  skipEmptyLines: true,
  delimiter: ",",
});

async function csvParserAndUpload() {
  const linesData = stream.pipe(csvParse);

  for await (const data of linesData) {
    const [title, description] = data;

    await fetch("http://localhost:3333/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
}

csvParserAndUpload();
