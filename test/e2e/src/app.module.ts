import { Module } from "@nestjs/common";
import { AgendaModule } from "../../../lib";
import { CatsModule } from "./cats/cats.module";

@Module({
  imports: [
    AgendaModule.forRoot({
      db: {
        address: "mongodb://localhost/test_agenda",
      },
    }),
    CatsModule,
  ],
})
export class AppModule {}
