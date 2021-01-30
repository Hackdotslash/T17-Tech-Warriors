let Http = new XMLHttpRequest();
const url = 'https://boogle-e8231-default-rtdb.firebaseio.com/blacklist.json';
Http.open("GET", url);
Http.send();
Http.onreadystatechange = (e) => {
if (Http.readyState == 4 && Http.status == 200) {
    console.log(Http.responseText)
    var blacklist_array = [];
    let response = JSON.parse(Http.responseText);
    for (let key in response) {
        console.log(key)
        blacklist_array.push({
            ...response[key]
        });
    }
    var cc = blacklist_array.filter(rr => {
        return rr.url === window.location.href
    })
    if (cc.length == 1) {
        window.location.href ="https://www.google.com/"
        alert("You have been redirected to this site since the website was blacklisted..")
    }
}
}

