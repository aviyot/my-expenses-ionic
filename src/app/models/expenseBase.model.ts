import { DataHeader } from "./data-header.model";

export interface expenseBase {
  id: number | DataHeader;
  name: string | DataHeader;
  amount: number | DataHeader;
  category: string | DataHeader;
  methodPay: string | DataHeader;
  freqPay: number | DataHeader;
  benef: string | DataHeader;
  commitDate: Date | DataHeader;
  fristPayDate: Date | DataHeader;
  numberOfPay: number | DataHeader;
}
