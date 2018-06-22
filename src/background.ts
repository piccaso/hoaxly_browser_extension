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
        let rating = 0, ratingCnt = 0;
        if(response.reviews) response.reviews.forEach(rev => {
            if(rev.reviewRating && rev.reviewRating.simplifiedRatingValue){
                rating += rev.reviewRating.simplifiedRatingValue;
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
            }

            // - .. red .. 1.5 .. yellow .. 2.5 .. green .. +
            let badgeColor = color.yellow;
            if(avgRating <= 1.5){
                badgeColor = color.red
            }else if(avgRating >= 2.5){
                badgeColor = color.green
            }

            browser.browserAction.setBadgeText({
                tabId : details.tabId,
                text : avgRating.toFixed(1),
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
        // new Notification("Woot!", {
        //     body: `the website you are watching might be sthitty... \n${details.url}`,
        // })
    })
});