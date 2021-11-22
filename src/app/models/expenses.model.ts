import { Expense } from "./expense.model";

export interface Expenses {
  expenses: Expense[];
  payMethods: string[];
  expensesCategories: string[];
}
