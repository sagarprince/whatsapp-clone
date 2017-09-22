import { Group } from './group.model';

export class User {
    userName : string;
    password : string;
	userId : string;
	firstName : string;
	lastName : string;
	///isActive : string;
	emailId : string;
	contactNumber : string;
	userType : any;
	userRole : any;
    groups : Group[];
}