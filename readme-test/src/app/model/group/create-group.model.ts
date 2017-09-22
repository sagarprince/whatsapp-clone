import {Facility} from './create-group-facility.model';
import {Product} from './create-group-product.model';
import {User} from './create-group-user.model';

export class Group{

       groupName : String
        
       numberOfJobsPerDay : number

       jobPricePerUserPerDay : number

       products : Product [] = new Array()
     
       facility : Facility

       users : User [] = new Array()

       approvalManagers : User [] = new Array()
}
	