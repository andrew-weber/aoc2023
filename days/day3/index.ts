import StringReader from "stringreader";

const file = Bun.file("input.txt");
const wholeText = await file.text();

const reader = new StringReader(wholeText);

while (!reader.end()) {
  console.log(reader.readUntil("\n", true));
}
