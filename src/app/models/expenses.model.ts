import { Expense } from "./expense.model";

export class Expenses {
  constructor(
    public expenses: Expense[],
    public payMethods: string[],
    public expensesCategories: string[]
  ) {}
}
