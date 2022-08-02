import { Injectable, Module } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import Agenda from "agenda";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { AgendaModule, DefineJob, ScheduleJob } from "../lib";

@Injectable()
class AppService {
  constructor(private readonly agenda: Agenda) {}

  @DefineJob("test")
  async test() {
    return true;
  }

  async runTest() {
    const job = this.agenda.create("test", {});
    job.setShouldSaveResult(true);
    await job.run();
    return job.attrs.result;
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

@Module({
  imports: [
    AgendaModule.forRoot({
      db: {
        address: "mongodb://localhost/test_agenda",
        collection: "agenda_jobs",
      },
    }),
  ],
  providers: [AppService],
})
class AppModule {}

describe("AgendaModule", () => {
  let agenda: Agenda;
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    await module.init();
    agenda = module.get(Agenda);
    appService = module.get(AppService);
  });

  afterEach(async () => {
    await agenda.cancel({});
  });

  it("Should define jobs", async () => {
    expect(agenda._definitions["test"]).toBeDefined();
    expect(agenda._definitions["test-schedule"]).toBeDefined();
    expect(agenda._definitions["test-every"]).toBeDefined();
  });

  it("Should run a job", async () => {
    const result = await appService.runTest();
    expect(result).toBe(true);
  });
});
