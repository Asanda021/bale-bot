const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const TOKEN = "توکن_ربات_تو";
const API = `https://tapi.bale.ai/bot${TOKEN}/sendMessage`;

app.post("/bale-bot", async (req, res) => {
    const msg = req.body.message;
    const text = msg.text;
    const chatId = msg.chat_id;

    let reply = "";

    if (text === "start") {
        reply = "سلام مهندس، خوش آمدید.\nبرای شروع برآورد، دستور info را ارسال کنید.";
    }

    else if (text === "info") {
        reply = "لطفاً اطلاعات زیر را ارسال کنید:\n- متراژ زمین\n- تعداد طبقات\n- نوع اسکلت";
    }

    else if (text === "materials") {
        reply = "محاسبه مصالح انجام شد.\nبرای ادامه دستور cost را ارسال کنید.";
    }

    else if (text === "cost") {
        reply = "هزینه تقریبی پروژه محاسبه شد.\nبرای گزارش کامل دستور report را ارسال کنید.";
    }

    else if (text === "report") {
        reply = "گزارش نهایی آماده شد.";
    }

    else if (text === "help") {
        reply = "لیست دستورات:\nstart\ninfo\nmaterials\ncost\nreport\nhelp";
    }

    else {
        reply = "کامند نامعتبر است. برای راهنما دستور help را ارسال کنید.";
    }

    await axios.post(API, {
        chat_id: chatId,
        text: reply
    });

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log("Bot is running...");
});
