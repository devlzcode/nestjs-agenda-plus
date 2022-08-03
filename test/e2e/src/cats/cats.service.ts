import { Injectable } from "@nestjs/common";
import { Agenda } from "agenda";

@Injectable()
export class CatsService {
  constructor(private readonly agenda: Agenda) {}
}
