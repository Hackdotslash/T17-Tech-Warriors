document.getElementById('whatsapp').addEventListener('click', (e) => {
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            console.log(tabs[0].url)
            if(tabs[0].url === "https://web.whatsapp.com/"){
                chrome.tabs.executeScript({
                    file: './scripts/whatsapp.js'
                });
            }
        }
    );
})

document.getElementById('report').addEventListener('click', (e) => {
    let Http = new XMLHttpRequest();
    const url = 'http://localhost:9000/sms'
    console.log(url)
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
})

document.getElementById('bookmark').addEventListener('click', (e) => {
    // console.log(document.getElementById('tags').value)
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            let Http = new XMLHttpRequest();
            const url = 'http://localhost:3000/?url=' + tabs[0].url;
            console.log(url)
            Http.open("GET", url);
            Http.send();
            Http.onreadystatechange = (e) => {
                console.log(Http.responseText)
            }
        }
    );
})


document.getElementById('reviews_button').addEventListener('click', (e) => {
    console.log(document.getElementById('reviews_input').value)
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            let Http = new XMLHttpRequest();
            const url = 'http://localhost:3000/uploadreviews?reviews=' + document.getElementById('reviews_input').value + '&url=' + tabs[0].url;
            console.log(url)
            Http.open("GET", url);
            Http.send();
            // document.getElementById('reviews_button').innerHTML = "Posted"
            document.getElementById('post_div').innerHTML = '<div class="alert alert-success" role="alert"> Review Posted Successfully  </div >'
            console.log('chlo review button ke ander')
            Http.onreadystatechange = (e) => {
                // if (Http.readyState == 4 && Http.status == 200){
                // document.getElementById('reviews_button').innerHTML = '<div class="alert alert - success" role="alert"> Review Posted Successfully  </div >'
                console.log(Http.responseText)
                // }
            }
        }
    );
})


document.getElementById('disp').addEventListener('click', (e) => {
    console.log('hii inside')
    // console.log(document.getElementById('reviews_input').value)
    // console.log('jfjjn')
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            let Http = new XMLHttpRequest();
            // const url = 'http://localhost:3000/test'
            // console.log('fnjnf')
            // const userAction = async () => {
            //     const response = await fetch('http://localhost:9000/test');
            //     const myJson = await response.json();
            //     console.log("in script") 
            //     console.log(myJson)
            // }
            const url = 'http://localhost:3000/displayreviews?url=' + tabs[0].url;
            console.log(url)
            Http.open("GET", url);
            Http.send();
            Http.onreadystatechange = function () {
                // console.log(Http)
                if (Http.readyState == 4 && Http.status == 200) {
                    console.log(Http.responseText);
                    var respt = JSON.parse(Http.responseText);
                    var st = '<ul>'
                    console.log(respt)
                    if (respt.length) {
                        for (var x in respt) {
                            st += '<li align="left">' + respt[x] + '</li>'
                        }
                    }
                    else {
                        st += '<li align="left">' + 'Be the 1st one to review..' + '</li>'
                    }
                    st += '</ul>'
                    console.log(st)
                    document.getElementById('disp').innerHTML = st;
                }
            }
        }
    );
})

document.getElementById('gmail').addEventListener('click', (e) => {
    console.log("hello gmail here");
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            const url = 'https://mail.google.com/mail/?view=cm&body=' + tabs[0].url + '';
            window.open(
                url,
                '_blank'
            );
        }
    );
})
document.getElementById('whatsappp').addEventListener('click', (e) => {
    console.log("hello gmail here");
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            const url = 'https://api.whatsapp.com/send?text=' + tabs[0].url;
            window.open(
                url,
                '_blank'
            );
        }
    );
})
document.getElementById('linkedin').addEventListener('click', (e) => {
    console.log("hello gmail here");
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            const url = 'https://www.linkedin.com/sharing/share-offsite/?url=' + tabs[0].url;
            window.open(
                url,
                '_blank'
            );
        }
    );
})
document.getElementById('reddit').addEventListener('click', (e) => {
    console.log("hello gmail here");
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            const url = 'https://reddit.com/submit?url=' + tabs[0].url + '&title=' + "boogle";
            window.open(
                url,
                '_blank'
            );
        }
    );
})
document.getElementById('telegram').addEventListener('click', (e) => {
    console.log("hello gmail here");
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            const url = 'https://mail.google.com/mail/?view=cm&body=' + tabs[0].url + '';
            window.open(
                url,
                '_blank'
            );
        }
    );
})
document.getElementById('twitter').addEventListener('click', (e) => {
    console.log("hello twitter here");
    chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
            const url = 'https://twitter.com/intent/tweet?url=&text=' + tabs[0].url + '&via=&hashtags=boogle';
            window.open(
                url,
                '_blank'
            );
        }
    );
})

document.getElementById('get_rating').addEventListener('click', (e) => {
    chrome.tabs.executeScript({
        file: 'ratingdisplay.js'
    });
})

var star;
document.getElementById('new-rate').addEventListener('click', (e) => {
    if ($("input[type='radio']").is(':checked')) {
        var star = $("input[type='radio']:checked").val();
        alert(star);
    }
    if (star) {
        chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
            function (tabs) {
                let Http = new XMLHttpRequest();
                const url = 'http://localhost:3000/rate?star=' + star + '&url=' + tabs[0].url;
                console.log(url)
                Http.open("GET", url);
                Http.send();
                Http.onreadystatechange = (e) => {
                    console.log(Http.responseText)
                }
            }
        );
    }
})

const togglehandler = () => {
    $('#pills-home-tab').removeClass('active');
    $('#pills-bookmark-tab').removeClass('active');
    $('#pills-review-tab').removeClass('active');
    $('#pills-rating-tab').removeClass('active');
    $('#pills-report-tab').removeClass('active');
    $('#pills-home').removeClass('show active');
    $('#pills-bookmark').removeClass('show active');
    $('#pills-review').removeClass('show active');
    $('#pills-rating').removeClass('show active');
    $('#pills-report').removeClass('show active');
}

document.getElementById('pills-home-tab').addEventListener('click', () => {
    $('#myTab a[href = "#pills-home"]').tab('show');
    togglehandler();
    $('#pills-home-tab').addClass('active');
    $('#pills-home').addClass('show active');
});
document.getElementById('pills-bookmark-tab').addEventListener('click', () => {
    $('#myTab a[href = "#pills-bookmark"]').tab('show');
    togglehandler();
    $('#pills-bookmark-tab').addClass('active');
    $('#pills-bookmark').addClass('show active');
});
document.getElementById('pills-review-tab').addEventListener('click', () => {
    $('#myTab a[href = "#pills-review"]').tab('show');
    togglehandler();
    $('#pills-review-tab').addClass('active');
    $('#pills-review').addClass('show active');
});

document.getElementById('pills-rating-tab').addEventListener('click', () => {
    $('#myTab a[href = "#pills-rating"]').tab('show');
    togglehandler();
    $('#pills-rating-tab').addClass('active');
    $('#pills-rating').addClass('show active');
});

document.getElementById('pills-report-tab').addEventListener('click', () => {
    $('#myTab a[href = "#pills-report"]').tab('show');
    togglehandler();
    $('#pills-report-tab').addClass('active');
    $('#pills-report').addClass('show active');
});
