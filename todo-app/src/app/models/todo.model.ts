export interface TodoItem {
  uid: string, // user id
  _id: string; // item id
  task: string;
  date: {
    day: number,
    month: number,
    year: number
  };
  time: {
    hour: number,
    minute: number
  };

}
