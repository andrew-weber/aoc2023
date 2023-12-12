import StringReader from "stringreader";

const file = Bun.file("input.txt");
const wholeText = await file.text();

const reader = new StringReader(wholeText);

const getGameInventory = (line: string) => {
  const [gameNumStr, gameInvStr] = line.split(":");
  const gameNum = parseInt(gameNumStr.split(" ")[1]);

  const gameSets = gameInvStr.split(";");
  const result = gameSets.reduce(
    (acc, gameSet) => {
      const set = gameSet.split(", ").map((v) => v.trim());
      let res = {
        red: 0,
        blue: 0,
        green: 0,
      };
      set.forEach((e) => {
        const [valStr, color] = e.split(" ");
        const val = parseInt(valStr);
        if (val > res[color]) {
          res[color] = val;
        }
      });

      if (res.red > acc.red) acc.red = res.red;
      if (res.green > acc.green) acc.green = res.green;
      if (res.blue > acc.blue) acc.blue = res.blue;
      return acc;
    },
    { red: 0, blue: 0, green: 0 }
  );

  return {
    game: gameNum,
    ...result,
  };
};

let p1 = 0;
let p2 = 0;
while (!reader.end()) {
  const res = getGameInventory(reader.readUntil("\n", true));
  if (res.red <= 12 && res.green <= 13 && res.blue <= 14) {
    p1 += res.game;
  }
  p2 += res.red * res.green * res.blue;
}
console.log(p1);
console.log(p2);
