import { environment, _MainUrlImage } from '../../environments/environment';

export class Model {
    public primaryKey?: string;  // primarykey of each model extended
    public tableName?: any;   // nom de la table correspondant modele dans le backend pour factoriser l'upload
    public primaryColName?: any;
    public modelInstance?: any; // instance ponctuelle du modele utilise
    // link on which ulpoad component will redirect user after uploaded file
    public redirectAfterUploadedFileLink?: string;
    constructor() {
        this.primaryKey = '';
        this.tableName = '';
        this.primaryColName = '';
        this.redirectAfterUploadedFileLink = undefined;
    }

   /**
    * @param emitter object on which members will be copied
    * @param receiver object that will receive members
    */
    replicateMember(emitter: Model) {
        // tslint:disable-next-line: forin
        for (const key in emitter) {
            if (!Array.isArray(key)){
                this[key] = emitter[key];
            }
        }
        // check and rewrite file field of each model
        if (emitter.hasOwnProperty('file')) {
            const key = 'file';
            if (emitter[key] !== null && emitter[key] !== undefined) {
                // this[key]   = environment.API + emitter[key];
            }
        }
        this.primaryKey = emitter[this.primaryColName];
        return this;
    }


}


export class Event extends Model{

    primaryKey: string;
    name: string;
    status: string;
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