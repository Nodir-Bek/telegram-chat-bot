require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");
const botToken = process.env.BOT_SECRET_TOKEN;
const openAiApiKey = process.env.OPEN_AI_API_KEY;
let state =0;

const bot = new TelegramBot(botToken, { polling: true });
const openAiconfig = new Configuration({
  apiKey: openAiApiKey,
});
const openai = new OpenAIApi(openAiconfig);

bot.on("message", async (msg) => {
  const MSG = await msg;
  const chatId = MSG.chat.id;
  const messageText = MSG.text;
  let message;
//   if (MSG.text == "/restart") {
//     await bot.sendMessage(
//         chatId,
//         "Restarting bot ..."
//       );
//       process.exit(0)

//   } else
  try {
    if (MSG.text == "/start") {
        const username = MSG?.from?.first_name
        await bot.sendMessage(
          chatId,
          `Assalom aleykum ${username} chatGpt AI tarmog'iga ulangan telegram botga xush kelibsiz! ushbu bot yordamida siz chatGpt AI qidiruv tarmog'idan cheklangan imkoniyatda foydalanishingiz mumkin!`
        );
        state =1;
        return;
      } 
      if (MSG.text !== "/start" && state == 1) {
        message = await bot.sendMessage(chatId, "Javob tayyorlanmoqda... ⏳");
      }
    
      const response = await openai.createCompletion({
        model: "davinci", // replace with the engine of your choice
        prompt: messageText,
        max_tokens: 1000,
        temperature: 0.7,
        
        
      });
    
      // simulate an async request
      await bot.editMessageText(response.data.choices[0].text, {
        chat_id: chatId,
        message_id: message?.message_id,
      });
  } catch (error) {
    state=0
    process.exit(0)
  }
});
