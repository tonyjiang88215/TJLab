/**
 * Created by tony on 2014/9/11.
 */
//alert('i am running');

//获取当前窗口对象
chrome.windows.getCurrent(function(window){

    console.log(window);

});

//chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
//    alert(tab.url);
//})

chrome.tabs.getSelected(function(w){

    console.log(w);

})