export type MyUser = {
  _id:string
  name: string;
  password: string;
  email: string;
  isDoctor:boolean
  appintments:Number
  appointment:string[]
};

export interface Appointment {
  name: string;
  appointment_time: Date | string;
}