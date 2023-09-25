public class DefectFromCaseController {
	
     @AuraEnabled
    public static string saveDefectLog(List<PlatinumPMO__Defect_Log__c> dl){
        String returnMessage = '';
        try{
            if(Schema.SObjectType.PlatinumPMO__Defect_Log__c.isCreateable())
                insert dl;
            returnMessage = 'success'; 
        }
        catch(Exception e){
            returnMessage = e.getMessage();
        }
        return returnMessage;
    }	
    @AuraEnabled
    public static doInitWrapper doint(Map<String,String> obj){
       doInitWrapper picklistWrapper=new doInitWrapper();
       picklistWrapper.typeofDefect= getPickListValuesIntoList('PlatinumPMO__Defect_Log__c',obj.get('typeofDefect'));
       picklistWrapper.ProjectPhase= getPickListValuesIntoList('PlatinumPMO__Defect_Log__c',obj.get('ProjectPhase'));
       picklistWrapper.DefectPriority= getPickListValuesIntoList('PlatinumPMO__Defect_Log__c',obj.get('DefectPriority'));
       picklistWrapper.severity= getPickListValuesIntoList('PlatinumPMO__Defect_Log__c',obj.get('severity'));
       picklistWrapper.Integration_Impact= getPickListValuesIntoList('PlatinumPMO__Defect_Log__c',obj.get('Integration_Impact'));        
       system.debug(obj.get('typeofDefect'));
       system.debug('---------->'+picklistWrapper); 
       return picklistWrapper;
    }
    
    public class doInitWrapper {
       @AuraEnabled 
       public List<String> typeofDefect;
       @AuraEnabled  
       public List<String> ProjectPhase; 
       @AuraEnabled 
       public List<String> DefectPriority;  
       @AuraEnabled 
       public List<String> severity;        
       @AuraEnabled 
       public List<String> Integration_Impact;
        
        
    }
        
    public static List<String> getPickListValuesIntoList(String objectType, String selectedField){
        List<String> pickListValuesList = new List<String>();
        if(selectedField!='CurrencyIsoCode'){
        
        Schema.SObjectType convertToObj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = convertToObj.getDescribe();
        Schema.DescribeFieldResult fieldResult = res.fields.getMap().get(selectedField).getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        pickListValuesList.add('--None--');
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }     
        } 
        return pickListValuesList;
    }
    
}