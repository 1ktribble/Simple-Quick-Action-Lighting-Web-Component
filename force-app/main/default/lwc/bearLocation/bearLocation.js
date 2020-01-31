import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

// Don't use this approach if you want to support referential integrity.
const fields = [
    'Bear__c.Name'
    , 'Bear__c.Location__Latitude__s'
    , 'Bear__c.Location__Longitude__s' 
    ];

export default class BearLocation extends LightningElement {
    // get current record Id
    @api recordId;
    // expose name and map marker array to template
    @track name;
    @track mapMarkers = [];

    /* if passing in wire param, the @wire decorator needs to be used.
    *  Passing in the getRecord adapter with the recordId and the list
    *  of fields created earlier. The getRecord adapter allows us to 
    *  retrieve records without having to write Apex.
    */ 
    @wire(getRecord, { recordId: '$recordId', fields })
    
    //create loadBear function to place bear on map.
    loadBear({error, data }) {
        if(error) {
            // linter requires anything, even comments.
            // TODO: handle error
        } else if(data){
            // getting bear data
            this.name = data.fields.Name.value;
            const Latitude = data.fields.Location__Latitude__s.value;
            const Longitude = data.fields.Location__Longitude__s.value;

            // create map markers with bear data
            this.mapMarkers = [{
                location: { Latitude, Longitude }
                , title: this.name
                , description: 'Coords: ${Latitude}, ${Longitude}'
            }];
        }
    }

    get cardTitle() {
        return (this.name) ? `${this.name}'s location` : 'Bear location';
    }
}