# nestjs-agenda-plus

## Installation

```sh
npm i agenda nestjs-agenda-plus
```

## Usage

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { AgendaModule } from "nestjs-agenda-plus";

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
```

```ts
import { Injectable } from "@nestjs/common";
import Agenda from 'agenda'
import { AgendaModule, DefineJob, ScheduleJob } from "nestjs-agenda-plus";

@Injectable()
class AppService {
    constructor(
        // Access the agenda client directly
        private readonly agenda: Agenda;
    ) {}

  @DefineJob("test")
  async test() {
    console.log("Hello world!");
  }

  @DefineJob("test-schedule")
  @ScheduleJob("in 10 seconds")
  async testSchedule() {
    console.log("Hello world from schedule!");
  }

  @DefineJob("test-every")
  @ScheduleJob("every 10 seconds")
  async testEvery() {
    console.log("Hello world from every!");
  }
}
```
