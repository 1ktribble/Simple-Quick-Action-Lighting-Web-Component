import { LightningElement, track } from 'lwc';

export default class HellowWebComponent extends LightningElement {
    @track greeting = 'Trailblazer';

    handleGreetingChange(event) {
        this.greeting = event.target.value;
    }

    /*
    *   This defines two getter functions that calculate expression values. The framework automatically reevaluates expression 
    *   functions if they include references to component properties and the value of those properties changes.
    *   Just like properties decorated with @track, expressions are reactive. If the expression value changes, the 
    *   component is refreshed.
    */
    get currentDate(){
        return new Date().toDateString();
    }

    get capitalizedGreeting() {
        return `Hello ${this.greeting.toUpperCase()}!`;
    }
}