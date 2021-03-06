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
                 if (tiers.has(fields[i])){
                     var arr = tiers.get(fields[i]);
                     arr.push(tier);
                     tiers.set(fields[i], arr);
                 }
                 else {
                     var arr = [0, position, tier];
                     tiers.set(fields[i], tier);
                 }
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
setTimeout(function(){
    getTiers('FLX', tiers);
}, 500);


chrome.tabs.executeScript(null, {file: "content_script.js"});
var flex = []
setTimeout(function(){
    chrome.storage.local.get(['names'], function (results){
        for(var i = 0; i < results['names'].length; i++){
            if (tiers.has(results['names'][i])){
                tier = tiers.get(results['names'][i]);
                var str = '<div' + ' class=\"player tier_' + tier[0] + '\"><p>' + results['names'][i] + ': '+ tier[0] + '</p></div>';
                document.getElementById(tier[1]).innerHTML += str;
                if(tier.length == 3){
                    var flx = '<div' + ' class=\"player tier_' + tier[2] + '\"><p>' + results['names'][i] + ': '+ tier[2] + '</p><div>';
                    flex.push(flx)

                }
            }
            else {
                console.log(results['names'][i] + ':'+ 'Not ranked')
            }
        }
    });
}, 2000);

setTimeout(function(){
    flex.sort(function(x, y){
        if (Number(x.split(": ").pop().split("<")[0]) > Number(y.split(": ").pop().split("<")[0])){
            return 1;
        }
        else {
            return -1;
        }
        return 0;
    })
}, 2100);

setTimeout(function(){
    for(var i = 0; i < flex.length; i++){
        document.getElementById('FLX').innerHTML += flex[i];
    }
}, 2200);



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
