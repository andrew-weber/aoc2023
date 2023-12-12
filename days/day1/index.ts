import StringReader from "stringreader";

const file = Bun.file("input.txt");
const wholeText = await file.text();

const reader = new StringReader(wholeText);

const pt2 = (line: string): number => {
  let res = line.replaceAll(/one/g, "one1one");
  res = res.replaceAll(/two/g, "two2two");
  res = res.replaceAll(/three/g, "three3three");
  res = res.replaceAll(/four/g, "four4four");
  res = res.replaceAll(/five/g, "five5five");
  res = res.replaceAll(/six/g, "six6six");
  res = res.replaceAll(/seven/g, "seven7seven");
  res = res.replaceAll(/eight/g, "eight8eight");
  res = res.replaceAll(/nine/g, "nine9nine");
  res = res.replaceAll(/\D+/g, "");

  const result = parseInt(`${res[0]}${res[res.length - 1]}`);
  return result;
};

const getCalibrationValue = (line: string): number => {
  const res = line.split("").reduce(
    (acc, val) => {
      const thisChar = parseInt(val);
      if (!isNaN(thisChar)) {
        if (acc.first === -1) acc.first = thisChar;
        acc.last = thisChar;
      }
      return acc;
    },
    { first: -1, last: -1 }
  );

  return parseInt(`${res.first}${res.last}`);
};

let accumulator = 0;

while (!reader.end()) {
  //   accumulator += getCalibrationValue(reader.readUntil("\n", true));
  accumulator += pt2(reader.readUntil("\n", true));
}
console.log(accumulator);
