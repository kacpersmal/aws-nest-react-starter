import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { setupSwagger } from "./config/swagger";
import { EnvConfig } from "./config/env";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<EnvConfig, true>);

  app.enableCors();
  setupSwagger(app);

  await app.listen(config.get("PORT"));
}
bootstrap();
