const { default: axios } = require('axios');
const fs = require('fs');
const process = require('process');
const readline = require('readline');
const events = require('events');


let path = process.argv[2];

if (!path) {
  console.log("Specify name of the file");
  process.exit(1);
}

/** read page at URL and save it to file. */

async function readUrl(url) {
  try{
    response = await axios.get(url);
    let out = getFileName(url)
    writeToFile(out, response.data);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
  }
}

function getFileName(url){
  let hostname = url.split('//')[1];
  return hostname.split('/')[0];
}

function writeToFile(out, text){
  fs.writeFile(out, text, 'utf8', function(err) {
    if (err) {
      console.error(`Error writing ${out}: ${err}`);
    } else {
      console.log(`Wrote to ${out}`)
    }
  });
}

//async function called processLineByLine which creates an interface for readline 
//where the input is a readstram  
//As per the create Interface options the crlfDelay set to infinity will 
//consider \r followed by \n as a single newline.
//As we are interacting with a readable stream, on each line read event it will 
//call the ri.on function with the line event. At that point, 
//we log the contents of the line read from the stream. 
//Then we listen to the readline close event with events.once that creates a promise 
//that will resolve with an array of all the arguments emitted to the given event. 
//It will be an empty array in this case.
//Finally, we read the memory usage and log it. 
async function getUrlFromFile() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(path),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      readUrl(`${line}`);
    });

    await events.once(rl, 'close');
    
  } catch (err) {
    console.error(err);
  }
}

getUrlFromFile();



