import StringReader from 'stringreader'

const file = Bun.file('codes.txt')
const wholeText = await file.text()

const reader = new StringReader(wholeText)

const getCalibrationValue = (line :string): number => {
    const res = line.split('').reduce((acc, val) => {
        const thisChar = parseInt(val)
        if(!isNaN(thisChar)){
            if (acc.first === -1 ) acc.first = thisChar
            acc.last = thisChar
        }
        return acc
    }, {first: -1, last: -1})
    

    return parseInt(`${res.first}${res.last}`) 
}

let accumulator = 0;

while(!reader.end()) {
    accumulator += getCalibrationValue(reader.readUntil('\n', true))
    console.log(accumulator)
}




