const tg = require('./telegram')
const yt = require('./youtrack')
exports.handler =  async function(event, context) {
  if(checkIsWeekEnd()) return true
  let items = await yt.getWorkItems(event?event.day:'today');
  let res = await tg.sendWorkItems(items).catch(err=>{console.log(err)});
  console.log(res)
  return res;
}
//just for local tests
 /* ;(async () => {
  try {
    await exports.handler()
  }catch(err){
    console.log(err)
  }
})();  */
function checkIsWeekEnd(date = new Date){
  let dayOfWeek = date.getDay();
  return (dayOfWeek === 6) || (dayOfWeek  === 0); 
}