import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("API")
    .setVersion("0.1")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  SwaggerModule.setup("api/docs", app, document, {
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
  });
}
