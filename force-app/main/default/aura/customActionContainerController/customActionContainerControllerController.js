({
    modalClose : function(component, event) {
        var closeModalEvent = event.getParam('close');
        if(closeEvent){
            $A.get("e.force:closeQuickAction").fire();
        }
    }
})
