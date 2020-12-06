const TelegramBot = require('node-telegram-bot-api');
//require('dotenv').config();
const token = process.env.TG_API_TOKEN;
const chatId = process.env.TG_CHAT_ID
const bot = new TelegramBot(token);
function prepareText(items){
  
  let helloPhrase = getCatchPhrase();
  let text = `<b>${helloPhrase}</b> \n\n`;
  for(key in items){
    let item = items[key]
    text += `\n<b>${item.fullName}</b> - ${Math.floor(item.fullTime/60)}h ${item.fullTime%60}m \n`
    for(work of item.workItems){
      let date = new Date(work.created)
      //text += `${date.toString()}\n`
      text += `${work.duration.presentation} - ${work.type.name} - ${work.text} \n`
    }
  }
  return text

}

module.exports = {
  sendWorkItems:(items) => {
    let text = prepareText(items);
    bot.sendMessage(chatId, text, {parse_mode: 'html'});
  }
}


let catchPhrases = [
"It’s showtime!",
"They’re heeeere!",
"Hey you guys!",
"Say ‘hello’ to my little friend!",
"Hello, my name is Inigo Montoya. You killed my father. Prepare to die.",
"Heeeeere’s Johnny!",
"Bueller….Bueller…Bueller?",
"A martini…shaken, not stirred.",
"Shall…we…play…a…game?",
"Alrighty then!",
"To infinity…and beyond!",
"Yeah baby, yeah!",
"I know kung fu.",
"I have come here to chew bubblegum and kick ass, and I’m all out of bubblegum.",
"I know you are, but what am I?",
"I pity the fool.",
"You talkin’ to me?",
"You’ve gotta ask yourself a question: do I feel lucky? …well, do ya, punk?!?",
"WHAT IS YOUR MAJOR MALFUNCTION, NUMBNUTS?!?",
"There can be only one.",
"Aw, crap.",
"YOU SHALL NOT PASS!",
"THIS IS SPARTA!",
"Houston, we have a problem.",
"Warriors, come out to play-ee-ay!",
"I must break you.",
"Shit just got real.",
"I’m as mad as hell, and I’m not gonna take this anymore!",
"It’s clobberin’ time!",
"Here comes the pain!",
"HULK SMASH!", 
"Go ahead, make my day.",
"Time to nut up or shut up.",
"Resistance is futile.",
"Get off my plane.",
"Get away from her, you BITCH!!!",
"Take your stinking paws off me, you damn dirty ape!",
"Run, Forrest, run!",
"I’ll be back.",
"I’m too old for this shit.",
"Thank you for your cooperation.",
"Loser!",
"Ding-dong, the witch is dead!",
"I want my two dollars!",
"SHOW ME THE MONEY!!!",
"Greed, for lack of a better word, is good.",
"Very nice, how much?",
"One MILLION dollars!",
"I’ll buy that for a dollar!",
"Excellent!",
"The horror…..the horror.",
"You can’t handle the truth!",
"YES, they deserved to die, and I hope they burn in hell!",
"Damn you. Goddamn you all to hell!",
"Why so serious?",
"We’re on a mission from God.",
"Shaa, and monkeys might fly out of my butt!",
"I sell drugs to the community!",
"You’re a disease, and I’m the cure.",
"Yipee kayaye, motherfucker!",
"Hoo-ah!",
"Cowabunga!",
"I feel the need…the need for speed.",
"If you build it, he will come.",
"You’re only supposed to blow the bloody doors off!",
"Machete don’t text.",
"You’re gonna need a bigger boat.", 
"Badges? We don’t have no badges. We don’t need no badges. I don’t have to show you any stinking badges!",
"I am your father.",
"I see dead people.",
"Toto, I have a feeling we’re not in Kansas anymore.",
"HOLY SCHNIKES!!!",
"Great scott!",
"My momma always said, ‘Life is like a box of chocolates: you never know what you’re gonna get.",
"It’s alive! It’s alive! IT’S ALIVE!!!",
"Alright, Mr. DeMille, I’m ready for my close-up.",
"I ate his liver with some fava beans and a nice chianti.",
"THE POWER OF CHRIST COMPELS YOU!!!",
"I’m gonna make him an offer he can’t refuse.",
"Soylent Green is people!",
"I know it was you, Fredo. You broke my heart. You broke my heart!",
"Here’s lookin’ at you, kid.",
"Never give up, never surrender!",
"Goonies never say die!",
"They may take our lives, but they’ll never take…OUR FREEDOM!",
"Frankly, my dear, I don’t give a damn.",
"What do you mean, I’m funny?",
"Just when I thought I was out, they pull me back in!",
"They’re back!",
"There’s no place like home.",
"You…complete me.",
"I’m not bad. I’m just drawn that way.",
"Why don’t you come up sometime, and see me?",
"Ssssssssssssmokin’!",
"I’ll have what she’s having.",
"My precious!",
"It’s a trap!",
"Wax on, wax off. Wax on, wax off.",
"My bad!",
"Is it safe?",
"Yes, sensei!",
"Hey! I’m walking here! I’m walking here!",
"Uhh….yeah.",
"In this country, you gotta make the money first. Then, when you get the money, you get the power.Then when you get the power, THEN you get the woman!",
"I’m the king of the world!",
"Hakuna Matata!",
"Toga, toga, toga toga!",
"Feed me, Seymour!",
"I’m sorry, Dave. I’m afraid I can’t do that.",
"Pay no attention to that man behind the curtain!",
"Forget it, Jake. It’s Chinatown.",
"Live long and prosper.",
"May the Force be with you.",
"Hasta la vista…baby.",
"That’ll do, Pig.",
"It’s over, Johnny.",
"After all, tomorrow is another day.",
"In case I don’t see ya…good afternoon, good evening, and goodnight.",

]
function getCatchPhrase(){
  let rand = 1 + Math.random() * (catchPhrases.length);
  let phrase = catchPhrases[Math.floor(rand)-1];
  return phrase
}