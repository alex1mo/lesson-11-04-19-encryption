import { Application } from "./src/main";
import { Actions } from "./src/constants/actions.const";

async function bootstrap() {
  const app = new Application();
  while (true) {
    await app.init();
    let { text, action, shift } = app.obj;
    if (text && action && shift) {
      if (action === Actions.ENCRYPT) {
        await app.encode();
      } else if (action === Actions.DECRYPT) {
        await app.decode();
      }
    } else {
      break;
    }
  }
}

bootstrap();
