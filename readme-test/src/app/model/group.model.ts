import { User } from './user.model';

export class Group{
	groupId : string;
	groupName : string;
	products;
	facility; 
	numberOfJobsPerDay : number;
	jobPricePerUserPerDay : number;
    users : User[];
	approvalManagers;
}