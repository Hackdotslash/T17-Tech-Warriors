document.getElementById('whatsapp').addEventListener('click', (e) => {
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            if(tabs[0].url === "https://web.whatsapp.com/"){
                chrome.tabs.executeScript({
                    file: './scripts/whatsapp.js'
                });
            }
        }
    );
})