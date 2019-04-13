import { Prompts } from "./prompt/prompts";
import { Actions } from "./constants/actions.const";
let checkWord = require("check-word")("en");

export class Application {
  _obj = {};

  async init() {
    const values = await Prompts.getValues();
    if (values.action === Actions.ENCRYPT) {
      this.obj = values;
    } else {
      this.obj.action = values.action;
    }
  }

  encode() {
    //зашифровать
    let { text, shift } = this.obj;
    text = this._toCode(text, shift);
    this.obj.text = text;
    console.log(this.obj.text);
  }

  decode() {
    //разшифровать
    let { text } = this.obj;
    let sourceText = text; //исходный текст
    let status = true;
    let result = [];

    while (status) {
      let leng = null;
      let count = 0;

      text = this._toCode(text, 1);
      console.log(text);
      let arr = text.split(" "); //получить массив слов

      for (let i = 0; i < arr.length; i++) {
        checkWord.check(arr[i]) && count++;
        if (count > arr.length / 2) {
          result.push(arr.join(" "));
          break;
        }
      }

      if (text === sourceText) break;
    }

    console.log(result);
  }

  _toCode(text, shift) {
    //метод возращает зашифрованую строку c заданым сдвигом
    text = text.split("").map(e => {
      if (e != " ") {
        let code = e.charCodeAt();
        if (code >= 65 && code <= 90) {
          code += shift;
          code = code > 90 ? code - 26 : code;
        } else if (code >= 97 && code <= 122) {
          code += shift;
          code = code > 122 ? code - 26 : code;
        }
        return String.fromCharCode(code);
      }
      return e;
    });
    text = text.join("");
    return text;
  }

  get obj() {
    return this._obj;
  }

  set obj(v) {
    this._obj = v;
  }
}
