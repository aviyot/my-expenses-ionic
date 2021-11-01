interface Entries {
  title: string;
  total: string;
  sortBy: string;
  cancel: string;
  ok: string;
  new: string;
  acs: string;
  des: string;
  addNewExp: string;
  optList: string;
  edit: string;
  editCategoery: string;
  editExpensesMethod: string;
  amount: string;
  name: string;
  category: string;
  payMethod: string;
  fristPayDate: string;
  lastPayDate: string;
  numberPays: string;
  freqPay: string;
  beneficiary: string;
  commitTime: string;
  update: string;
  enter: string;
  addNew: string;
  addExit: string;
  pay: string;
  opthion: string;
  select: string;
  add: string;
  sortAcs: string;
  sortDcs: string;
  enterRequired: string;
  dataAdded: string;
  del: string;
  opthionEdit: string;
  editExpenseCat: string;
  editExpenseMethod: string;
  enterCat: string;
  enterMethod: string;
  menu: string;
  english: string;
  hebrew: string;
  language: string;
  reset: string;
  exit: string;

  //INCOME B
  income: string;
  type: string;
  from: string;
  //INCOME E
}

interface Language {
  [key: string]: Entries;
}
const languages: Language = {
  hebrew: {
    title: "הוצאות שלי",
    total: 'סה"כ',
    sortBy: "מיין לפי",
    cancel: "בטל",
    ok: "אשר",
    new: "חדש",
    acs: "סדר עולה",
    des: "סדר יורד",
    addNewExp: "הוסף הוצאה חדשה",
    optList: "עריכת אפשריות",
    edit: "ערוך",
    editCategoery: "ערוך קטגוריות",
    editExpensesMethod: "ערוך שיטת תשלום",
    amount: "סכום",
    name: "שם",
    category: "קטגוריה",
    payMethod: "שיטת תשלום",
    fristPayDate: "תשלום ראשון",
    lastPayDate: "תשלום אחרון",
    numberPays: "מספר תשלומים",
    freqPay: "תדירות תשלום",
    beneficiary: "המוטב",
    commitTime: "תאריך העסקה",
    update: "עדכן",
    enter: "הכנס",
    addNew: "חדש",
    pay: "תשלום",
    opthion: "אפשרות",
    select: "בחר",
    add: "הוסף",
    addExit: "הוסף וצא",
    sortAcs: "סדר עולה",
    sortDcs: "סדר יורד",
    enterRequired: "הכנס נתונים נדרשים",
    dataAdded: "הנתונים נשמרו בהצלחה",
    del: "הסר",
    opthionEdit: "עריכת אפשרויות",
    editExpenseCat: "ערוך קטגורית הוצאות",
    editExpenseMethod: "ערוך סוג התשלום",
    enterCat: "הכנס קטגוריה חדשה",
    enterMethod: "הכנס סוג תשלום חדש",
    menu: "תפריט",
    english: "אנגלית",
    hebrew: "עברית",
    language: "שפה",
    reset: "אפס",
    exit: "צא",
    income: "הכנסה",
    type: "סוג",
    from: "מקור",
  },
  english: {
    title: "my expenses",
    total: "total",
    sortBy: "Sort By",
    cancel: "Cancel",
    ok: "Ok",
    new: "new",
    acs: "acs",
    des: "Des",
    addNewExp: "Add New Expenses",
    optList: "Opthion list",
    edit: "Edit",
    editCategoery: "Edit Categoery",
    editExpensesMethod: "Edit Expense Method",
    amount: "Amount",
    name: "Name",
    category: "Category",
    payMethod: "Pay Method",
    fristPayDate: "Frist Pay Date",
    lastPayDate: "Last Pay Date",
    numberPays: "Number Of Pays",
    freqPay: "Frequency Payment",
    beneficiary: "Beneficiary",
    commitTime: "Commit Time",
    update: "Update",
    enter: "Enter",
    addNew: "Add New",
    addExit: "ADD & EXIT",
    pay: "Pay",
    opthion: "Opthion",
    select: "Select",
    add: "add",
    sortAcs: "Sort Acs",
    sortDcs: "Sort Dcs",
    enterRequired: "Enter Required Data",
    dataAdded: "Data Added successfully",
    del: "Delete",
    opthionEdit: "Opthions Edit",
    editExpenseCat: "Edit Expenses Category",
    editExpenseMethod: "Edit Expense Pay Method",
    enterCat: "Enter Category",
    enterMethod: "Enter pay method",
    menu: "Menu",
    english: "English",
    hebrew: "Hebrew",
    language: "Language",
    reset: "reset",
    exit: "exit",
    income: "income",
    type: "type",
    from: "from",
  },
};

export default languages;
