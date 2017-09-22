import { BaseUrl } from './base-url.model';

export class UrlDetails {
  private static loginUrl: string = BaseUrl.$printShopWsBaseUrl + "/user/authenticate";
  private static facilityGetUrl: string = BaseUrl.$printShopWsBaseUrl + "/facility/find/all";
  private static facilitySaveUrl: string = BaseUrl.$printShopWsBaseUrl + "/facility/save";
  private static removeFacilityUrl: string = BaseUrl.$printShopWsBaseUrl + "/facility/delete";
  private static updateFacilityUrl: string = BaseUrl.$printShopWsBaseUrl + "/facility/update";
  private static getFacilityByIDUrl:string = BaseUrl.$printShopWsBaseUrl + "/facility/getFacilityByID";
  private static forgotPasswordUrl:string = BaseUrl.$printShopWsBaseUrl + "/user/forgotPassword";
  private static uploadUsersUrl:string  = BaseUrl.$printShopWsBaseUrl + "/user/uploadUsers";
  private static groupSaveUrl: string = BaseUrl.$printShopWsBaseUrl + "/group/save";
  private static groupGetUrl: string = BaseUrl.$printShopWsBaseUrl + "/group/find/all";
  private static groupGetByGroupIdUrl: string = BaseUrl.$printShopWsBaseUrl + "/group/find/bygroupid";
  private static getAllGroupsResponseUrl : string = BaseUrl.$printShopWsBaseUrl + "/group/find/response/list";
  private static removeGroupUrl: string = BaseUrl.$printShopWsBaseUrl + "/group/delete";
  private static getGroupListByFacilityIdUrl: string = BaseUrl.$printShopWsBaseUrl + "/group/findall/byfacilityID";
  private static getAllProductsUrl : string = BaseUrl.$printShopWsBaseUrl + "/product/find/all";
  private static getUserByEmailIdUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/find/byemailid";
  private static getUserByUserNameUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/find/byloginname";
  private static getUserByEmailIdAndRoleUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/find/byemailid&role";
  private static getUserByUserNameAndRoleUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/find/byusername&role";
  private static addVendorUrl : string = BaseUrl.$printShopWsBaseUrl + "/vendor/addVendor";
  private static getVendorsUrl : string = BaseUrl.$printShopWsBaseUrl + "/vendor/getVendors";
  private static deleteVendorUrl : string = BaseUrl.$printShopWsBaseUrl + "/vendor/deleteVendor";
  private static getAllUsersUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/getAllUsers";
  private static changePasswordUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/changePassword";
  private static getAllGroupsUrl : string = BaseUrl.$printShopWsBaseUrl + "/group/find/all";
  private static saveUserUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/save";
  private static deleteUserUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/deleteUser";
  private static updateUserUrl : string = BaseUrl.$printShopWsBaseUrl + "/user/updateUser";
  private static updateVendorUrl : string = BaseUrl.$printShopWsBaseUrl + "/vendor/updateVendor";
  private static uploadFacilitiesUrl: string = BaseUrl.$printShopWsBaseUrl + "/facility/uploadFacilities";
  private static getAllCostCenterResponseUrl : string = BaseUrl.$printShopWsBaseUrl + "/costcenter/find/all/response";
  private static removeCostCenterUrl : string = BaseUrl.$printShopWsBaseUrl + "/costcenter/delete";
  private static costCenterSaveUrl : string = BaseUrl.$printShopWsBaseUrl + "/costcenter/save";
  private static getCostCenterByIdUrl : string = BaseUrl.$printShopWsBaseUrl + "/costcenter/find/byid"; 

  private static createClientUrl : string = BaseUrl.$printShopWsBaseUrl + "/client/create";
  private static getAllClientUrl : string = BaseUrl.$printShopWsBaseUrl + "/client/findAll";
  private static updateClientUrl : string = BaseUrl.$printShopWsBaseUrl + "/client/update";
  private static deleteClientUrl : string = BaseUrl.$printShopWsBaseUrl + "/client/delete";
  
   public static get $loginUrl(): string {
    return this.loginUrl;
  }
  public static get $facilityGetUrl(): string {
    return this.facilityGetUrl;
  }
  public static get $facilitySaveUrl(): string {
    return this.facilitySaveUrl;
  }
  public static get $removeFacilityUrl(): string {
    return this.removeFacilityUrl;
  }
  public static get $updateFacilityUrl(): string {
    return this.updateFacilityUrl;
  }
  public static get $getFacilityByIDUrl(): string {
    return this.getFacilityByIDUrl;
  }
  public static get $groupGetUrl(): string {
    return this.groupGetUrl;
  }
   public static get $removeGroupUrl(): string {
    return this.removeGroupUrl;
  }
   public static get $getGroupListByFacilityIdUrl(): string {
    return this.getGroupListByFacilityIdUrl;
  }
  public static get $forgotPasswordUrl(): string {
		return this.forgotPasswordUrl;
	}
  public static get $getAllProductsUrl() : string {
    return this.getAllProductsUrl;
  }
  public static get $getUserByEmailIdUrl() : string {
    return this.getUserByEmailIdUrl;
  }
   public static get $getUserByUserNameUrl() : string {
    return this.getUserByUserNameUrl;
  }  
  public static get $getGroupSaveUrl() : string {
    return this.groupSaveUrl;
  }
  public static get $getAllGroupsResponseUrl() : string {
    return this.getAllGroupsResponseUrl;
  }
  public static get $uploadUsersUrl(): string {
		return this.uploadUsersUrl;
	}
  public static get $addVendorUrl(): string {
		return this.addVendorUrl;
	}
  public static get $getVendorsUrl(): string {
		return this.getVendorsUrl;
	}
  public static get $deleteVendorUrl(): string {
		return this.deleteVendorUrl;
	}
  public static get $getAllUsersUrl(): string {
		return this.getAllUsersUrl;
	}
  public static get $changePasswordUrl(): string {
		return this.changePasswordUrl;
	}

  public static get $getAllGroupsUrl(): string {
		return this.getAllGroupsUrl;
	}

  public static get $saveUserUrl(): string {
		return this.saveUserUrl;
	}
  public static get $groupGetByGroupIdUrl(): string {
    return this.groupGetByGroupIdUrl;
  }
  public static get $getUserByEmailIdAndRoleUrl() : string{
     return this.getUserByEmailIdAndRoleUrl;
  } 
 public static get $getUserByUserNameAndRoleUrl() : string{
     return this.getUserByUserNameAndRoleUrl;
  } 
  public static get $deleteUserUrl(): string {
		return this.deleteUserUrl;
	}
  public static get $updateUserUrl(): string {
		return this.updateUserUrl;
	}
  public static get $updateVendorUrl(): string {
		return this.updateVendorUrl;
	}

  public static get $uploadFacilitiesUrl(): string {
		return this.uploadFacilitiesUrl;
	}
  public static get $getAllCostCenterResponseUrl() : string {
    return this.getAllCostCenterResponseUrl;
  }
  public static get $removeCostCenterUrl() : string {
    return this.removeCostCenterUrl;
  }
  public static get $costCenterSaveUrl(): string {
    return this.costCenterSaveUrl;
  }
  public static get $getCostCenterByIdUrl() : string {
    return this.getCostCenterByIdUrl;
  }

  public static get $createClientUrl(): string {
    return this.createClientUrl;
  }
 public static get $getAllClientUrl(): string {
    return this.getAllClientUrl;
  }
  public static get $deleteClientUrl(): string {
    return this.deleteClientUrl;
  }
 public static get $updateClientUrl(): string {
    return this.updateClientUrl;
  }

}