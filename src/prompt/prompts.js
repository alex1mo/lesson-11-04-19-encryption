import prompts from "prompts";
import { Actions } from "../constants/actions.const";

export class Prompts {
  static async getValues() {
    return await prompts([
      {
        type: "select",
        name: "action",
        message: "Pick a action",
        choices: [
          {
            title: "Encode",
            value: Actions.ENCRYPT
          },
          {
            title: "Decode",
            value: Actions.DECRYPT
          }
        ]
      },
      {
        type: prev => {
          if (prev === Actions.DECRYPT) {
            return null;
          }
          return "text";
        },
        name: "text",
        message: "Enter the text you wish to encrypt."
      },
      {
        type: prev => prev !== Actions.DECRYPT && "number",
        name: "shift",
        min: 1,
        max: 26,
        message: "Enter shift (from 1 to 25)"
      }
    ]);
  }

  // static async decode(str, cb) {
  //   return await prompts([
  //     {
  //       type: "select",
  //       name: "text",
  //       message: "Decode string",
  //       choices: [
  //         {
  //           title: str,
  //           value: "test"
  //         }
  //       ]
  //     }
  //   ]);
  // }
}
