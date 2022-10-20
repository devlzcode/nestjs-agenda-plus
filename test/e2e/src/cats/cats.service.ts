import { Injectable } from "@nestjs/common";
import { Agenda } from "@hokify/agenda";

@Injectable()
export class CatsService {
  constructor(private readonly agenda: Agenda) {}
}
