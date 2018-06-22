import {HoaxlyApi} from './hoaxlyApi';
import {HoaxlyRestClient} from './hoaxlyRestClient'
import Vue from 'vue'
import popupComponent from './popupComponent.vue';

class Popup {
  static callApi(url:string|undefined){
    if(url){
      let api = new HoaxlyApi();
      api.check(url).then(resp => {
        Popup.popup(resp);
      });
    }
  }

  static main() {
    // get the url of the current window - this does not work in firefox :(
    const queryInfo = {active: true, currentWindow: true};
    chrome.tabs.query(queryInfo, tabs => Popup.callApi(tabs[0].url));
  }

  static popup(apiResponse: HoaxlyRestClient.IClaimReviewResponse) {
    // check if the response has reviews
    // not much error handling here...
    // if something fails the default content is displayed (see popup.html)
    apiResponse && apiResponse.reviews && apiResponse.reviews.length > 0 && new Vue({
      el: '#app',
      render: h=> h(popupComponent, {props: {apiResponse:apiResponse}}),
      mounted: function(){ this.$nextTick(Popup.enableLinks); },
      updated: function(){ this.$nextTick(Popup.enableLinks); },
    });
  }

  static enableLinks(){
      // <a href='url'>text</a> does not work here...
      // who wants to open a website in the popup anyway :)
      // substitute by opening a new tab
      var links = document.getElementsByTagName("a");
      for (var i = 0; i < links.length; i++) {
        (function(url:string){
          var create = {active: true, url: url};
          links[i].onclick = function () {
              chrome.tabs.create(create);
          };
        })(links[i].href);
      }
  }
}

// entrypoint
document.addEventListener('DOMContentLoaded', Popup.main);