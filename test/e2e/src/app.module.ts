import { Module } from "@nestjs/common";
import { AgendaModule } from "../../../lib";

@Module({
  imports: [
    AgendaModule.forRoot({
      db: {
        address: "mongodb://localhost/test_agenda",
      },
    }),
  ],
})
export class AppModule {}
