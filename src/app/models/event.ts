import { Model } from './model';

export class Event extends Model{

    primaryKey: string ;
    name: string ;
    status: boolean;
    broadcastLink: string;
    timezone: string;
    profil: string;
    cover: string;
    begin_date: string;
    begin_time: string;
    end_date: string;
    end_time: string;
    description: string;
    speakers: string[];
    ticketingWebSite: string;
    visibility: string;
    location: string;
    locationInfo: string;

    constructor() {
        super();
        this.primaryKey = 'event_id';
        // we use tableName to store uploaded files
        this.tableName = 'event';
        this.primaryColName = 'event_id';
    }

}