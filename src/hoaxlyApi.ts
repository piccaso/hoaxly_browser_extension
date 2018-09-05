import {HoaxlyRestClient} from './hoaxlyRestClient'

export class HoaxlyApi {
    
    // TODO: change
    apiBaseUrl:string = "https://api-luis.hoax.ly";

    check(claimUrl:string) : Promise<HoaxlyRestClient.ClaimReviewResponse>{
        let client = new HoaxlyRestClient.Client(this.apiBaseUrl);
        return client.apiCheckGet(claimUrl);
    }
}
