export class BaseUrl{

   static  BASE_URL = "http://localhost:9090/printshopws";
// static  BASE_URL = "http://10.182.208.43:9090/printshopws";
   static BASE_URL_RDH = "http://demo.rule14.com/RdhCoreWS";  

   public static get $printShopWsBaseUrl() : string {
      return this.BASE_URL;
   }

   public static get $rdhCoreWsBaseUrl() : string {
       return this.BASE_URL_RDH;
   }

}