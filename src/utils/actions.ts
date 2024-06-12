import axios from "axios";
import { CONSTANTS } from "../constants";
import { Encryption } from "./encryption";

export interface Attempt {
  input: string;
  output: string;
  result: string;
  status: string;
  userId: number;
  questionId: number;
}

export class Actions {
  static async createAttempt(attempt: Attempt) {
    const mydata = {
      input: attempt.input,
      output: attempt.output,
      result: attempt.result,
      status: attempt.status,
      userId: attempt.userId,
      questionId: attempt.questionId,
    };
    try {
      const res = await axios.post(`${CONSTANTS.SERVERURL}/attempts`, mydata);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }
}
