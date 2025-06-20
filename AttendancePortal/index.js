import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let mood;
let myPoem;

app.get("/", (req, res) => {
 
  res.render("index.ejs");  
});

app.post("/submit", async(req, res) => {
  try {
    const response = await axios.post(`http://127.0.0.1:5000/emotion_detect`);
    const result = response.data;
    const yoyo=result.link;
    mood = result.result;
    let song;
    console.log(yoyo);
    console.log(mood);
    if(mood==="Anger")
    {
      let num = Math.floor(Math.random()*7);
      myPoem = poetry[num];
      song = [songs[12], songs[13], songs[14]];

    }
    else if(mood === "Fear")
    {
      let num = Math.floor(Math.random()*7);
      myPoem = poetry[num];
      song = [songs[15], songs[16], songs[17]];
    }
    else if(mood === "Sad")
    {
      let num = Math.floor(Math.random()*7);
      myPoem = poetry[num];
      song = [songs[3], songs[4], songs[5]];
    }
    else if(mood === "Happy") {
      let num = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
      myPoem = poetry[num];
      song = [songs[9], songs[10], songs[11]];
    }
    else if(mood === "Surprise")
    {
      let num = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
      myPoem = poetry[num];
      song = [songs[0], songs[1], songs[2]];

    }
    else if(mood === "Neutral")
    {
      let num = Math.floor(Math.random() * (14 - 8 + 1)) + 8;
      myPoem = poetry[num];
      song = [songs[6], songs[7], songs[8]];
    }

    res.render("index.ejs", { poem: myPoem, mood: mood, photo: yoyo, son: song });
    console.log(result);
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  // res.render("index.ejs", {randomName:randomName, poem: poetry[0]});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const poetry = [
  "तू रुका नहीं, तू गिरा है तो फिर उठ, अभी हार मत मान, तेरे पास वो हिम्मत है जो सबसे बड़ी है।", 
  "वक़्त की घड़ी कभी रुकती नहीं,हर टूटा हुआ सपना फिर से संजीवित हो सकता है।",
  "संगीन रातें भी एक दिन खत्म होती हैं, तेरे हर आंसू के बाद मुस्कान फिर लौट आती है।",
  "हर दर्द के बाद दिल में एक नई उमंग उठती है, तुम फिर से उठकर अपने सपनों को सच कर सकते हो।",
  "अंधेरे में छुपा सूरज अब भी है वहीं, तुम खुद से कहो, ‘मैं कभी हार नहीं मानूंगा।’",
  "तेरी कामयाबी पर तारीफ़, तेरी कोशिश पर ताना होगा, तेरे दुख में कुछ लोग, तेरे सुख में ज़माना होगा।",
  "हसरत ऐ ज़िंदगी हमारा ये उसूल है, अगर ख़्वाहिश है चाँद की तो दाग भी क़बूल है।",
  "तेरी सुबह के सूरज में कुछ खास बात है, जो तेरे चेहरे पे मुस्कान की बरसात है।",
  "तेरे दिन की शुरुआत भी जैसे एक नया सफर हो, हर कदम में खुशी का जादू और रंगों का असर हो।",
  "तू जब उठता है, तो हर सुबह रोशन होती है, तेरी हंसी से दुनिया खुद भी खुश होती है।",
  "तेरी मेहनत में वो चमक है, जो दिन को रोशन कर दे, तेरे हर पल में एक नई उम्मीद खिल जाए।",
  "तेरे दिन की शुरुआत से ही, ख़ुशियाँ फैली रहती हैं, तेरे हर कदम से दुनिया में कुछ खास बात रहती है।",
  "जब तुम उठ खड़े होते हो, तो धरती भी थामती है कदम, सपनों को जीने का हौंसला हो, तो कोई भी रुकावट नहीं दम।",
  "न रुको, न थको, बस चलते रहो, सपने पूरे होंगे, यकीन रखो।" 
];

const songs = [
  {name: "Kya hua tera vada", link: "https://www.youtube.com/watch?v=Z5D1dhTMclI"},//Surprise
  {name: "Aa chal ke tujhe", link: "https://www.youtube.com/watch?v=Y_8VmzWOsgs"},
  {name: "Mai Jindagi ka Saath", link: "https://www.youtube.com/watch?v=ivBhqDtJeiw"}, 
  {name: "Channa Mereya", link: "https://www.youtube.com/watch?v=bzSTpdcs-EI"}, //sad
  {name: "Tujhe Bhula Diya", link: "https://www.youtube.com/watch?v=-Hb2DeHvvEg"},
  {name: "Naina - Dangal", link: "https://www.youtube.com/watch?v=KzBa4ZKTVjE"},
  {name: "Yaara Seeli Seeli", link: "https://www.youtube.com/watch?v=zgC3-E36bwg"},//Neutral
  {name: "Chalte Chalte Yun Hi Koi", link: "https://www.youtube.com/watch?v=X-40R7SfXJ4"},
  {name: "Kaun Tujhe", link: "https://www.youtube.com/watch?v=Ov0YGGSY6gY"},
  {name: "Tumhi Ho Bandhu", link: "https://www.youtube.com/watch?v=o1RducJbUdc"},//Happy
  {name: "Sweety Tera Drama", link: "https://www.youtube.com/watch?v=RpuhD_xKadk"},
  {name: "Nachde Ne Saare", link: "https://www.youtube.com/watch?v=HgIW7P4dsXU"},
  {name: "Sadda Haq", link: "https://www.youtube.com/watch?v=VAJK04HOLd0"},//Anger
  {name: "Jee Karda", link: "https://www.youtube.com/watch?v=-Hb2DeHvvEg"},
  {name: "Kabira", link: "https://www.youtube.com/watch?v=jHNNMj5bNQw"},
  {name: "Fikar Not", link: "https://www.youtube.com/watch?v=mxva6l4bCSI"}, //Fear
  {name: "Agar Tum Sath Ho", link: "https://www.youtube.com/watch?v=xRb8hxwN5zc"},
  {name: "Judaai", link: "https://www.youtube.com/watch?v=f7dd7aojpUY"}
];

 