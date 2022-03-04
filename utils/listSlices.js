const glob = require("glob");
const fetch = require('node-fetch')
const dotenv = require('dotenv');
dotenv.config();

const slicesJsons =   glob.sync('./slices/**/model.json');

console.log("slice in the github code")
console.log(slicesJsons)

const ctKey = process.env.CT_API_KEY

listSlices()

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
    },
    //body: JSON.stringify({ query })
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