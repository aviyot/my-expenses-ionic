
export class Expense {
    constructor(
    public name:string,
    public amount:number,
    public category:string,
    public methodPay:string,
    public freqPay: number,
    public benef: string,
    public commitDate:Date,
    public fristPayDate:Date, 
    public numberOfPay: number
    ){
  
    }
    
}
