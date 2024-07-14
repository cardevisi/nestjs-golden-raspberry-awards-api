import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ImportCsvService } from './golden-raspberry-awards/infra/import-csv.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const importCsvService = app.get(ImportCsvService);
  importCsvService.importCsv('movielist.csv');

  console.log('Date imported');

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
