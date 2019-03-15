/*
*	We import a navigation mixin that bundles utility functions dealing with navigation. 
*	A mixin lets us add functionality to a class without extending it. This is useful when 
*	a class already extends a parent class (a class can only extend a single parent).
*	Our class extends the navigation mixin applied to the LightningElement base class.
*	We handle the bearview event in the handleBearView function. We use the navigation 
*	mixin to navigate to a bear record page.
*/

import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';
import { loadStyle } from 'lightning/platformResourceLoader';
import ursusResources from '@salesforce/resourceUrl/ursus_park';
import { LightningElement, track, wire } from 'lwc';
/** BearController.searchBears(searchTerm) Apex method */
import searchBears from '@salesforce/apex/BearController.searchBears';
export default class BearListNav extends NavigationMixin(LightningElement) {
	@track searchTerm = '';
	@track bears;
	@wire(CurrentPageReference) pageRef;
	@wire(searchBears, {searchTerm: '$searchTerm'})
	loadBears(result) {
		this.bears = result;
		if (result.data) {
			fireEvent(this.pageRef, 'bearListUpdate', result.data);
		}
	}
	connectedCallback() {
		loadStyle(this, ursusResources + '/style.css');
	}
	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.bears.data.length > 0);
	}
	handleBearView(event) {
		// Navigate to bear record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: event.target.bear.Id,
				objectApiName: 'Bear__c',
				actionName: 'view',
			},
		});
	}
}