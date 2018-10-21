function getTiers(position, tiers){
    $.get('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://s3-us-west-1.amazonaws.com') + '/fftiers/out/text_' + position + '.txt', function(response) {
        var reg = /(?<=\: )(.*?)(?=$)/gm, item;

        var tier = 1;
        while (item = reg.exec(response['contents'].split(','))){
            if(position == 'DST'){
                var fields = item[1].split(" ");
            }
            else {
                var fields = item[1].split(", ");
            }
            for (var i = 0; i < fields.length; i++){
              tiers.set(fields[i], tier);
            }
          ++tier;
        };
    });
}

var tiers = new Map();

getTiers('QB', tiers);
getTiers('WR', tiers);
getTiers('RB', tiers);
getTiers('TE', tiers);
getTiers('K', tiers);
getTiers('DST', tiers);


chrome.tabs.executeScript(null, {file: "content_script.js"});

setTimeout(function(){
    chrome.storage.local.get(['names'], function (results){
        for(var i = 0; i < results['names'].length; i++){
            //console.log(results['names'][i] + ':'+ tiers.get(results['names'][i]))
            if (tiers.has(results['names'][i])){
                var str = results['names'][i] + ':'+ tiers.get(results['names'][i]);
                console.log(str)
                document.getElementById("QB").innerHTML = str;
            }
            else {
                console.log(results['names'][i] + ':'+ 'Not ranked')
            }
        }
    });
}, 1000);



/*PLAN OF ATTACK FOR now
    Right now this puts a skill position into tiers.

    TODO:
    Start with TE(
        Scrape names on my team off of Yahoo.
        Compare names on yahoo to tier list
        make html popup(probably table) that looks like:
            QB:
            Tier: Name
            RB:
            Tier: name
            Tier: name
            .
            .
            .
    )
    IDEA:
    Write possible streamers(tier on waiver wire > tier on team)
    May want to use name:tier map for quicker look up

*/
