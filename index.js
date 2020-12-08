const tg = require('./telegram')
const yt = require('./youtrack')
exports.handler =  async function(event, context) {
  let items = await yt.getWorkItems();
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