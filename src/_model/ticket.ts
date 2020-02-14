export class Ticket {
    _id?: string;
    id_user: string = "";
    description: string = "";
    date: Date = new Date();
    status: string = "active";
}