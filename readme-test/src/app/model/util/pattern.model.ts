export class Pattern{

   public static onlyNumberPattern : any = /^\d+$/;
   public static onlyTwoDecimalPlacesPattern : any = /^\d+(\.\d{0,2})?$/;
   public static emailPattern : any = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
   public static onlyCharacters: any = /^[a-zA-Z]*$/;
   public static phoneNumber: any = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;   
   public static alphaNumeric: any = /^[a-z0-9]+$/i;

}