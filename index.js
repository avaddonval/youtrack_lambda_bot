const tg = require('./telegram')
const yt = require('./youtrack')
exports.handler =  async function(event, context) {
  let items = await yt.getWorkItems();
  let res = tg.sendWorkItems(items);
  return res;
}
//just for local tests
/* ;(async () => {
  try {
    await handler()
  }catch(err){
    console.log(err)
  }
})(); */ 