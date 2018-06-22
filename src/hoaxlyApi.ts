import {HoaxlyRestClient} from './hoaxlyRestClient'

export class HoaxlyApi {
    
    apiBaseUrl:string = "https://api.hoax.ly";

    check(claimUrl:string) : Promise<HoaxlyRestClient.ClaimReviewResponse>{
        let client = new HoaxlyRestClient.Client(this.apiBaseUrl);
        return client.apiCheckGet(claimUrl);
    }
}
