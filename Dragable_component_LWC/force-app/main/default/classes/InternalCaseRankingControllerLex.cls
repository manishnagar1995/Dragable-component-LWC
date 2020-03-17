public with sharing class InternalCaseRankingControllerLex {
    
    public static List<AccountTeamMember> accTeamMemberList = new List<AccountTeamMember>();
    public static List<String> accountIds = new List<String>();
    
    public static Map<String, Contact> mapOfAccContact   = new Map<String, Contact>();
    public static String selectedAccount;
    
 	@AuraEnabled(cacheable=true)
    public static List<SelectOption> getItems() {    
        prepareAccount();
        List<SelectOption> options = new List<SelectOption>();          
        for (AccountTeamMember accTeamMember : accTeamMemberList) { 
            accountIds.add(accTeamMember.AccountId);
            options.add(new SelectOption(accTeamMember.AccountId, accTeamMember.Account.Name));
        }        
        return options;
    }
    
    @AuraEnabled(cacheable=true)
    public static void prepareAccount(){
        Set <String> accountSet = new Set<String>();        
        accTeamMemberList = [SELECT User.name, Id, AccountId, Account.Name 
                                FROM AccountTeamMember 
                                WHERE UserId = :UserInfo.getUserId()
                                AND (TeamMemberRole = 'Client Services Manager (CSM)' OR TeamMemberRole = 'Delivery Executive')]; 
        
        for (AccountTeamMember accTeamMember : accTeamMemberList) { 
            accountSet.add(accTeamMember.AccountId);
        }                        
        
        for (Contact con : [SELECT Id, AccountId, Account.Name from Contact Where AccountId IN :accountSet] ) {
            mapOfAccContact.put(con.AccountId, con);
        }
        
        if(accTeamMemberList.size() > 0) {
            selectedAccount = accTeamMemberList.get(0).AccountId;
        } 
        
    }

}