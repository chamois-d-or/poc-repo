const glob = require("glob");
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();
var fs = require('fs');

const ctKey = process.env.CT_API_KEY

listSlices()
pushSlices()

async function listSlices() {
  const URL = `https://customtypes.prismic.io/slices`

  const options = {
    endpoint: URL,
    method: "GET", //or POST
    headers: {
      "repository": "poc-temp",
      "Authorization": ctKey,
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  }

  try {
    const data = await fetch(URL, options).then(response => {
      return response.json()
    })

    console.log("slices in the prismic repo before push")
    console.log(data)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

async function pushSlices() {
    const slicesJsons = glob.sync('./slices/**/model.json')

    console.log("slice in the github code")
    slicesJsons.forEach(function(slice,index){
        const sliceObject = JSON.parse(fs.readFileSync(slicesJsons[index], 'utf8'));
        pushSlice(sliceObject)
    })
}

async function pushSlice(sliceObject) {

  const URL = `https://customtypes.prismic.io/slices/update`

  const options = {
    endpoint: URL,
    method: "POST", //or POST
    headers: {
      "repository": "poc-temp",
      "Authorization": ctKey,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sliceObject)
  }

  try {
    const data = await fetch(URL, options).then(response => {
      return response.status
    })

    console.log("push to remote prismic repo: " + sliceObject.id)
    console.log(data)
    return data
  } catch (error) {
    throw new Error(error)
  }
}