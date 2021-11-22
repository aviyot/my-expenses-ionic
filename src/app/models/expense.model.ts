import { expenseBase } from "./expenseBase.model";

export interface Expense extends expenseBase {
  id: number;
  name: string;
  amount: number;
  category: string;
  methodPay: string;
  freqPay: number;
  benef: string;
  commitDate: Date;
  fristPayDate: Date;
  numberOfPay: number;
}
