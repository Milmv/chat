const button = document.querySelector("button");
const textarea = document.querySelector(".textarea");
let room = document.querySelector(".room");
let wrapperRom = document.querySelector(".wrapperRom");

let a;
let b;

button.addEventListener("click", (event) => { //Событие на клик
  event.preventDefault();
  let textareaValue = document.querySelector(".textarea").value;
  textareaValue = textareaValue.replace(/ +/g, " ").trim();//удаляем пробелы
  if (textareaValue.length != 0) {//Проверяем содержимое на наличие содержимого
    message();//Сообщение
    answer();//Ответ
  }
  textarea.value = "";//Чистим поле ввода
});

textarea.addEventListener("focus", (event) => {//Если фокус, то создаём элемент
  animation();
});
textarea.addEventListener("blur", (event) => {//Удаляем
  document.querySelector(".anim").remove();
});

textarea.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {//Если enter, то клик с проверкой содержимого
    event.preventDefault();
    button.click();
    textarea.blur();
  }
});

/* Animation bot */
let anim1 = () => {//Блок пока печатает бот
  let answerWrapper = document.createElement("div");
  answerWrapper.className = "answerWrapper animbot";
  room.appendChild(answerWrapper);

  let avatarBot = document.createElement("div");
  avatarBot.className = "avatarBot animbot";
  answerWrapper.appendChild(avatarBot);

  let answer = document.createElement("div");
  answer.className = "answer animbot";
  answerWrapper.appendChild(answer);

  let anim = document.createElement("div");
  anim.className = "Anim";
  answer.appendChild(anim);
};
/* Animation */
let animation = () => {//Блок пока печатаем
  let wrapperRom = document.querySelector(".wrapperRom");
  let messageWrapper = document.createElement("div");
  messageWrapper.className = "messageWrapper anim";
  wrapperRom.appendChild(messageWrapper);

  let avatarYour = document.createElement("div");
  avatarYour.className = "avatarYour anim";
  messageWrapper.appendChild(avatarYour);

  let message = document.createElement("div");
  message.className = "message anim";
  messageWrapper.appendChild(message);

  let anim = document.createElement("div");
  anim.className = "Anim";
  message.appendChild(anim);
  scrollChat();
};

/* scroll */
const scrollChat = () => {//Скролл
  wrapperRom.scrollTop = wrapperRom.scrollHeight;
};

/* создание сообщения */
const message = () => {//Создаём элементы с классами для сообщения
  let messageWrapper = document.createElement("div");
  messageWrapper.className = "messageWrapper";
  room.appendChild(messageWrapper);

  let avatarYour = document.createElement("div");
  avatarYour.className = "avatarYour";
  messageWrapper.appendChild(avatarYour);

  let message = document.createElement("div");
  message.className = "message";
  message.textContent = textarea.value;
  messageWrapper.appendChild(message);

  scrollChat();
};

/* создание ответа бота */
const answer = () => {
  let textareaValue = document.querySelector(".textarea").value;
  anim1();
  scrollChat();
  setTimeout(function () {
    document.querySelector(".animbot").remove();

    let answerWrapper = document.createElement("div");//Создаём элементы с классами для сообщения бота
    answerWrapper.className = "answerWrapper";
    room.appendChild(answerWrapper);

    let avatarBot = document.createElement("div");
    avatarBot.className = "avatarBot";
    answerWrapper.appendChild(avatarBot);

    let answer = document.createElement("div");
    answer.className = "answer";
    answerWrapper.appendChild(answer);

    function bot() {//Ответы бота
      textareaValue = textareaValue.replace(/ +/g, " ").trim();

      if (
        textareaValue.replace(/\s+/g, "").toLowerCase().indexOf("start") != -1
      ) {//Проверяем на наличие start
        answer.textContent = "Привет, меня зовут Чат-бот, а как зовут тебя?";
      } else if (
        textareaValue.replace(/\s+/g, "").toLowerCase().indexOf("stop") != -1
      ) {//Проверяем на наличие stop
        answer.textContent = "Всего доброго, если хочешь поговорить пиши start";
      } else if (
        textareaValue.replace(/\s+/g, "").toLowerCase().indexOf("name") != -1
      ) {//Проверяем на наличие Name
        textareaValue = textareaValue.toLowerCase().replace(/\s+/g, "");
        textareaValue = textareaValue.replace(/[:/]/g, "");
        textareaValue = textareaValue.replace("name", "");
        textareaValue = textareaValue.replace(
          textareaValue[0],
          textareaValue[0].toUpperCase()
        );//Удаляем все ненужное и первую букву имени делаем заглавной
        answer.textContent =
          "Привет " +
          textareaValue +
          ", приятно познакомиться. Я умею считать, введи числа которые надо посчитать";
      } else if (
        textareaValue.replace(/\s+/g, "").toLowerCase().indexOf("number") != -1
      ) {//Проверяем на наличие number и добавляем числа в переменные
        textareaValue = textareaValue.toLowerCase().replace(/\s+/g, "");
        textareaValue = textareaValue.replace(/[:/]/g, "");
        textareaValue = textareaValue.split("number");
        let number = textareaValue[1];
        number = number.split(",");
        a = number[0];
        b = number[1];
        answer.textContent =
          "Я умею складывать, вычитать, умножать и делить. Просто введите нужный оператор";
      } else if (
        textareaValue == "/" &&
        typeof a == "string" &&
        typeof b == "string" &&
        a !== ""
      ) {//Делаем операции с числами и после операции очищаем значения переменных
        textareaValue = Number(a) / Number(b);
        answer.textContent = textareaValue;
        a = "";
        b = "";
      } else if (
        textareaValue == "*" &&
        typeof a == "string" &&
        typeof b == "string" &&
        a !== ""
      ) {//Делаем операции с числами и после операции очищаем значения переменных
        textareaValue = Number(a) * Number(b);
        answer.textContent = textareaValue;
        a = "";
        b = "";
      } else if (
        textareaValue == "+" &&
        typeof a == "string" &&
        typeof b == "string" &&
        a !== ""
      ) {//Делаем операции с числами и после операции очищаем значения переменных
        textareaValue = Number(a) + Number(b);
        answer.textContent = textareaValue;
        a = "";
        b = "";
      } else if (
        textareaValue == "-" &&
        typeof a == "string" &&
        typeof b == "string" &&
        a !== ""
      ) {//Делаем операции с числами и после операции очищаем значения переменных
        textareaValue = Number(a) - Number(b);
        answer.textContent = textareaValue;
        a = "";
        b = "";
      } else if (
        textareaValue.replace(/\s+/g, "").toLowerCase().indexOf("weather") != -1
      ) {//Проверяем на наличие weather
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            let temp = JSON.stringify(response.main.temp);
            answer.textContent = Math.round(temp) - 273 +' градуса тепла';
          });
          
      } else {//Если неправильная команда
        answer.textContent = "Я не понимаю, введите другую команду!";
      }
    }

    bot();
    scrollChat();
  }, 1000);
};

//Самое первое сообщение бота
let firstAnswer = () => {
  let answerWrapper = document.createElement("div");
  answerWrapper.className = "answerWrapper";
  room.appendChild(answerWrapper);

  let avatarBot = document.createElement("div");
  avatarBot.className = "avatarBot";
  answerWrapper.appendChild(avatarBot);

  let answer = document.createElement("div");
  answer.className = "answer";
  answer.textContent = "Введите команду /start, для начала общения";
  answerWrapper.appendChild(answer);
  scrollChat();
};
firstAnswer();

//Url с ключом для погоды
let url =
  "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=48e114ff6d8f82d804bed6d558d9d01d";

