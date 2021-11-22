import { DataHeader } from "./data-header.model";
import { expenseBase } from "./expenseBase.model";

export interface ExpenseHeader extends expenseBase {
  id: DataHeader;
  name: DataHeader;
  amount: DataHeader;
  category: DataHeader;
  methodPay: DataHeader;
  freqPay: DataHeader;
  benef: DataHeader;
  commitDate: DataHeader;
  fristPayDate: DataHeader;
  numberOfPay: DataHeader;
}
