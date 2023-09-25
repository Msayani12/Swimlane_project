({
    doInit : function(component, event, helper) {
    var Bid=component.get("v.BrokerId");
    
    },

    onfocus : function(component,event,helper){
       $A.util.addClass(component.find("mySpinner"), "slds-show");
        var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
        // Get Default 5 Records order by createdDate DESC
         var getInputkeyWord = '';
         helper.searchHelper(component,event,getInputkeyWord);
        ////console.log("hello onfocus");
    },
    onblur : function(component,event,helper){

      // //console.log("hello onblur");
       var name = component.find("NameHover");
     //  //console.log('onBlur------>'+name.class);
       $A.util.addClass(name, 'slds-hide');
       $A.util.removeClass(name, 'slds-show');

    },
    onhover : function(component,event,helper){

       //console.log("hello hover");
       var name = component.find("NameHover");
     //  //console.log('hover---->'+name.class);
       $A.util.addClass(name, 'slds-show');
       $A.util.removeClass(name, 'slds-hide');

    },

    keyPressController : function(component, event, helper) {
       // get the search Input keyword
         var getInputkeyWord = component.get("v.SearchKeyWord");
       // check if getInputKeyWord size id more then 0 then open the lookup result List and
       // call the helper
       // else close the lookup result List part.
        if( getInputkeyWord.length > 0 ){
             var forOpen = component.find("searchRes");
               $A.util.addClass(forOpen, 'slds-is-open');
               $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchHelper(component,event,getInputkeyWord);
        }
        else{
             component.set("v.listOfSearchRecords", null );
             var forclose = component.find("searchRes");
               $A.util.addClass(forclose, 'slds-is-close');
               $A.util.removeClass(forclose, 'slds-is-open');
          }
	},

  // function for clear the Record Selaction
    clear :function(component,event,heplper){
         var pillTarget = component.find("lookup-pill");
         var lookUpTarget = component.find("lookupField");

         $A.util.addClass(pillTarget, 'slds-hide');
         $A.util.removeClass(pillTarget, 'slds-show');

         $A.util.addClass(lookUpTarget, 'slds-show');
         $A.util.removeClass(lookUpTarget, 'slds-hide');

         component.set("v.SearchKeyWord",null);
         component.set("v.listOfSearchRecords", null );
         component.set("v.selectedRecord", {} );
         console.log('Clear');
    },
     // function for clear the Record Selaction
    clearCustom :function(component,event,heplper){
         var pillTarget = component.find("lookup-pill");
         var lookUpTarget = component.find("lookupField");
         var pillTarget2 = component.find("lookup-pill");

         console.log(pillTarget2);
         $A.util.addClass(pillTarget, 'slds-hide');
         $A.util.removeClass(pillTarget, 'slds-show');

         $A.util.addClass(lookUpTarget, 'slds-show');
         $A.util.removeClass(lookUpTarget, 'slds-hide');

        component.set("v.SearchKeyWord",null);
        component.set("v.listOfSearchRecords", null );
        component.set("v.selectedRecord", {} );
      /*  var c=component.find("lookup-pill").getElement().classList.value;
      //  $A.util.removeClass(pillTarget, c);
       var c2=component.find("lookup-pill").set("v.class", "slds-pill-container slds-hide");
        console.log(component.find("lookup-pill").getElement().classList.value);
        console.log(c2);
        */
       // //
       console.log(component.find("pill-Size").get("v.name"));
      // console.log(component.find("pill-Size").label);
        //var pillTarget = console.log(component.find("pill-Size").Name);


    },

  // This function call when the end User Select any record from the result list.
    handleComponentEvent : function(component, event, helper) {
    // get the selected Account record from the COMPONETN event
       var selectedAccountGetFromEvent = event.getParam("recordByEvent");
	   component.set("v.selectedRecord" , selectedAccountGetFromEvent);
        console.log('selectedAccountGetFromEvent--------->'+JSON.stringify(selectedAccountGetFromEvent));

        var forclose = component.find("lookup-pill");
           $A.util.addClass(forclose, 'slds-show');
           $A.util.removeClass(forclose, 'slds-hide');

        var forclose = component.find("searchRes");
           $A.util.addClass(forclose, 'slds-is-close');
           $A.util.removeClass(forclose, 'slds-is-open');

        var lookUpTarget = component.find("lookupField");
            $A.util.addClass(lookUpTarget, 'slds-hide');
            $A.util.removeClass(lookUpTarget, 'slds-show');
        var utilitySearch=component.find("utilitySearch");
             $A.util.addClass(utilitySearch,'slds-hide');
             $A.util.removeClass(utilitySearch,'slds-show');

	},
    create : function(component,event,helper){
        //console.log('---->create record');
        helper.createRecord(component,event,helper);
    },
  MessageBlur: function (component, event, helper) {
    //console.log('Message OnmouseLeave---->');
    var forclose = component.find("searchRes");
    $A.util.addClass(forclose, "slds-is-close");
    $A.util.removeClass(forclose, "slds-is-open");

    var name = component.find("NameHover");
    //  //console.log('onBlur------>'+name.class);
    $A.util.addClass(name, "slds-hide");
    $A.util.removeClass(name, "slds-show");
  },
      hideSpinner : function(component,event,helper){
     component.set("v.Spinner", false);
    }
})