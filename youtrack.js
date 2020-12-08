const axios = require('axios');
//require('dotenv').config();
const url = process.env.YT_API_URL;
const token = process.env.YT_API_TOKEN
let yt = axios.create({
  baseURL: url,
  headers: {
    'Authorization': 'Bearer '+token,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
function groupByUser(items){
  let formatted = items.reduce((users, item)=>{
    let login = item.creator.login;
    if(!users) users = {}
    if(!users[login]){
      users[login] = {
        login: login,
        fullName: item.creator.fullName,
        fullTime: item.duration.minutes,
        workItems: [
          {
            duration:item.duration,
            created: item.created,
            type: item.type ? item.type : { name: 'No type' },
            text: item.text,
          }
        ],
      }
    }else{
      users[login].fullTime += item.duration.minutes,
      users[login].workItems.push({
        duration:item.duration,
        created: item.created,
        type: item.type ? item.type : { name: 'No type' },
        text: item.text,
      })
    }
    return users
  },{})
  return formatted
}
module.exports = {
  getWorkItems: async(day='yesterday') => {
    if(day!=='today' && day!=='yesterday') throw new Error('WRONG_DAY')
    let createdStart = new Date()
    if(day==='yesterday') createdStart.setDate(createdStart.getDate()-1)
    createdStart.setUTCHours(0,0,0,0);
    let createdEnd = new Date()
    if(day==='yesterday') createdEnd.setDate(createdEnd.getDate()-1)
    createdEnd.setUTCHours(23,59,59,999);
    console.log(createdStart, createdEnd)
    let timeInterval=`&createdStart=${createdStart.getTime()}&createdEnd=${createdEnd.getTime()}`
    let response = await yt.get(
      `/workItems?fields=creator(fullName,login),text,type(name),created,duration(minutes,presentation)${timeInterval}`
    );
    let users = groupByUser(response.data)
    return users
  }
}