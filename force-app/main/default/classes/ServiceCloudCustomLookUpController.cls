public class ServiceCloudCustomLookUpController {
@AuraEnabled
public static List < sObject > fetchLookUpValues(String onRecordId,String searchKeyWord, String ObjectName,String ProgId,String ProjId,String DeliId, String WpId,String OrgId,String portfolioId,String SourceSystemId,String SourceDataStoreId, String SourceDataElementId,String TargetSystemId,String TargetDataStoreId, String TargetDataElementId,String userid,String BPId,String BPLevel, String BPPrefix,String BusinessTransactionId,String BPsId,String SorP,boolean elementry, String Usablity,String onObjectName,String onProgram, String usrType,List<PlatinumPMO__Program__c> ProgramListOnRelatedTeams) {
    try{
        system.debug('ObjectName-->'+ObjectName);
        system.debug('BPId-->'+BPId);
        system.debug('ProgId----->'+ProgId);
        system.debug('ProjId----->'+ProjId);
        system.debug('DeliId----->'+DeliId);
        system.debug('WpId------->'+WpId);
        system.debug('OrgId-->'+OrgId);
        system.debug('portfolioId---->'+portfolioId);
        System.debug('parent Object Name : '+onObjectName);
        system.debug('onprogram-------->'+onProgram);
        system.debug('onRecordId----------->'+onRecordId);
        system.debug('Source System Id----------->'+SourceSystemId);
        system.debug('Source DataStore----------->'+SourceDataStoreId);
        system.debug('Source DataElement---------->'+SourceDataElementId);
        system.debug('Target System Id----------->'+TargetSystemId);
        system.debug('Target DataStore----------->'+TargetDataStoreId);
        system.debug('Target DataElement---------->'+TargetDataElementId);
        system.debug('userid-------->'+userid);
        system.debug('BusinessTransactionID----------->'+BusinessTransactionId);
        system.debug('BusinessPredANDSucessID----------->'+BPsId);
        system.debug('sucessor or Predecessor------>'+SorP);
        system.debug('BPLevel--------->'+BPLevel);
        system.debug('elementry----->'+elementry);
        System.debug('Use of lookup ::::: Sourav ::::: '+Usablity);
        system.debug('user login----->'+userInfo.getUserId());
        system.debug('ProgramListOnRelatedTeams----------->'+ProgramListOnRelatedTeams);
        system.debug('usrType--------->'+usrType);
        String searchKey = '%' + searchKeyWord + '%';
        Set<Id> usrIdSet = new Set<Id>();
        Set<Id> raciIdSet = new Set<Id>();
        Set<Id> recordIdSet = new Set<Id>();
        List < sObject > returnList = new List < sObject > ();
        String sQuery='';
        if(ObjectName=='PlatinumPMO__Program__c' && portfolioId.length()!=0) {
                 sQuery =  'select id, Name,PlatinumPMO__Portfolio__c from ' +ObjectName + ' where PlatinumPMO__Portfolio__c=:portfolioId AND Name LIKE: searchKey With SECURITY_ENFORCED' ;
        }
      
        if(ObjectName == 'PlatinumPMO__Business_Transaction_Ownership_Library__c' && onObjectName =='PlatinumPMO__Defect_Log__c'){
                sQuery = 'Select Id, Name From '+ObjectName+' Where Name Like: searchKey With SECURITY_ENFORCED Limit 10';
        }
       
        if(ObjectName=='PlatinumPMO__Organization__c') {
                sQuery =  'select id, Name from ' +ObjectName + ' where Name LIKE: searchKey With SECURITY_ENFORCED order by createdDate DESC ';
        }
        if(ObjectName=='PlatinumPMO__Portfolio__c') {
            if(OrgId != null && OrgId != ''){
                    sQuery =  'select id, Name,PlatinumPMO__Organization__c from ' +ObjectName + ' where PlatinumPMO__Organization__c=:OrgId AND  Name LIKE: searchKey With SECURITY_ENFORCED order by createdDate DESC ';
            }
        }  
        if(ObjectName=='PlatinumPMO__Meeting_Minutes__c' && ProjId.length()!=0) {
                sQuery =  'select id, Name,Project__c from ' +ObjectName + ' where Project__c =:ProjId AND  Name LIKE: searchKey With SECURITY_ENFORCED order by createdDate DESC ';
        }
        if(ObjectName=='PlatinumPMO__Deliverable__c' && ProjId.length()!=0) {
                sQuery =  'select id, Name,PlatinumPMO__Project__c from ' +ObjectName + ' where PlatinumPMO__Project__c =:ProjId AND  Name LIKE: searchKey With SECURITY_ENFORCED order by createdDate DESC ';
        }
		if(ObjectName=='PlatinumPMO__Project__c' && ProgId.length()!=0 ) {
                 sQuery =  'select id, Name,PlatinumPMO__Program__c,PlatinumPMO__Project_Name__c from ' +ObjectName + ' where PlatinumPMO__Program__c =:ProgId AND  Name LIKE: searchKey With SECURITY_ENFORCED order by createdDate DESC ';
        }
        if(ObjectName=='PlatinumPMO__Object__c' && ProgId.length()!=0 ) {
                sQuery =  'select id, Name,Program__c from ' +ObjectName + ' where Program__c =:ProgId AND  Name LIKE: searchKey With SECURITY_ENFORCED order by createdDate DESC ';
        }
        if(ObjectName=='PlatinumPMO__Deliverable__c') {
                sQuery =  'select id, Name,PlatinumPMO__Associated_Project__c from ' +ObjectName + ' where PlatinumPMO__Associated_Project__c =:ProjId AND  Name LIKE: searchKey With SECURITY_ENFORCED order by createdDate DESC Limit 10';
        }    
		if(ObjectName=='PlatinumPMO__System__c' && onObjectName == 'PlatinumPMO__Defect_Log__c'){
                   sQuery = 'Select Id, Name, PlatinumPMO__Program__c From '+ObjectName+' Where (Name Like: searchKey AND PlatinumPMO__Program__c =: ProgId) With SECURITY_ENFORCED Limit 5' ;
        }     
        if(ObjectName == 'PlatinumPMO__Business_Transaction_Ownership_Library__c' && onObjectName =='PlatinumPMO__Defect_Log__c'){
                sQuery = 'Select Id, Name From '+ObjectName+' Where Name LIKE: searchKey With SECURITY_ENFORCED Limit 10';
        }
        if(ObjectName=='PlatinumPMO__Test_Step__c') {
                sQuery =  'select id, Name, PlatinumPMO__Project__c from ' +ObjectName + ' where Name LIKE: searchKey AND PlatinumPMO__Project__c =: ProjId With SECURITY_ENFORCED order by createdDate DESC ';
        }
        if(ObjectName=='PlatinumPMO__Test_Plan__c') {
                sQuery =  'select id, Name, PlatinumPMO__Project__c from ' +ObjectName + ' where Name LIKE: searchKey AND PlatinumPMO__Project__c =: ProjId With SECURITY_ENFORCED order by createdDate DESC ';
        }
         if(ObjectName=='PlatinumPMO__Test_Plan__c') {
                sQuery =  'select id, Name, PlatinumPMO__Project__c from ' +ObjectName + ' where Name LIKE: searchKey AND PlatinumPMO__Project__c =: ProjId With SECURITY_ENFORCED order by createdDate DESC ';
        }
        if(ObjectName=='PlatinumPMO__Test_Plan_Details__c') {
                sQuery =  'select id, Name, PlatinumPMO__Project__c from ' +ObjectName + ' where Name LIKE: searchKey AND PlatinumPMO__Project__c =: ProjId With SECURITY_ENFORCED order by createdDate DESC ';
        }
         if(ObjectName=='User'){
            sQuery='select id, Name,isActive,Profile.Name,Username FROM User WHERE (isActive=true AND Name LIKE: searchKey) With SECURITY_ENFORCED Limit 10';
        }
        system.debug('the sQuery----->'+sQuery);

        List < sObject > lstOfRecords = Database.query(sQuery);
        system.debug('the Query list---->'+lstOfRecords);

        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }

        return returnList;
    }
    catch(exception e) {
        List<sObject> l = new List<sObject>();
        string v1 = e.getMessage();
        string v2 = v1+' at line number: '+ e.getLineNumber();
        system.debug(v2);
        return l;
    }
}


}