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
              if (position=='FLX'){
                 var arr = tiers.get(fields[i]);
                 arr.push(tier);
                 tiers.set(fields[i], arr);
              }
              else {
                 tiers.set(fields[i], [tier, position]);
              }
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
getTiers('FLX', tiers);


chrome.tabs.executeScript(null, {file: "content_script.js"});
var flex = []
setTimeout(function(){
    chrome.storage.local.get(['names'], function (results){
        for(var i = 0; i < results['names'].length; i++){
            if (tiers.has(results['names'][i])){
                tier = tiers.get(results['names'][i]);
                var str = '<p' + ' class=' + tier[0] + '>' + results['names'][i] + ': '+ tier[0] + '</p>';
                document.getElementById(tier[1]).innerHTML += str;
                if(tier.length == 3){
                    var flx = '<p' + ' class=' + tier[2] + '>' + results['names'][i] + ': '+ tier[2] + '</p>';
                    flex.push(flx)
                    document.getElementById('FLX').innerHTML += flx;
                }
            }
            else {
                console.log(results['names'][i] + ':'+ 'Not ranked')
            }
        }
    });
}, 2000);



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
