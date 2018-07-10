import {HoaxlyApi} from "./hoaxlyApi"

var browser = (window["msBrowser"]||window["browser"]||window.chrome) as typeof chrome;

browser.webNavigation.onCommitted.addListener(details => {
    
    if(details.transitionType === "auto_subframe") return;

    // TODO: set badge text and icon based on api response
    let api = new HoaxlyApi();

    api.check(details.url).then(response => {

        // TODO: is this a good idea?
        // calculating the average of normalizedAlternateName?
        // /...Name/ does not sould like a number!
        let rating = 0, ratingCnt = 0, ratingText = '-';
        if(response.reviews) response.reviews.forEach(rev => {
            if(rev.reviewRating && rev.reviewRating.ratingValue){
                rating += rev.reviewRating.ratingValue;
                ratingCnt++;
            }
        });

        if(ratingCnt > 0){
            let avgRating = (rating / ratingCnt);

            type color = [number, number, number, number] | string
            let color = {
                // r,g,b,a
                green: <color>[0,100,0,50],
                yellow: <color>[200,180,100,50],
                red: <color>[150,0,0,100],
            };

            // - .. red .. 1.5 .. yellow .. 2.5 .. green .. +
            let badgeColor = color.yellow;
            if(avgRating <= 1.9) {
                badgeColor = color.red;
                ratingText = '!';

            } else if(avgRating >= 2.5) {
                badgeColor = color.green;
                ratingText = 'OK';
            }

            browser.browserAction.setBadgeText({
                tabId : details.tabId,
                text : ratingText,
            });

            browser.browserAction.setBadgeBackgroundColor({
                color: badgeColor,
                tabId: details.tabId,
            });
        }

        //// maybe?
        // browser.browserAction.setIcon({
        //     tabId : details.tabId,
        //     path : showWarningIcon ? 'warning.png' : 'normal.png'
        // })

        //// maybe? - needs 'notifications' permission
        // new Notification("Attention!", {
        //     body: `the website you are watching might be questionable... \n${details.url}`,
        // })
    })
});