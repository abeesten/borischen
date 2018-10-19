var tiers = new Map()
$.get('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://s3-us-west-1.amazonaws.com') + '/fftiers/out/text_TE.txt', function(response) {
  var reg = /(?<=\: )(.*?)(?=$)/gm,
      item;

var tier = 1;
while (item = reg.exec(response['contents'].split(','))){
    //console.log(item[1]);
    var fields = item[1].split(", ");
    for (var i = 0; i < fields.length; i++){
      tiers[fields[i]] = tier;
    }
  ++tier;
};


chrome.tabs.executeScript(null, {file: "content_script.js"});

    chrome.storage.local.get(['names'], function (results){
        //console.log(results['names'].length)
        for(var i = 0; i < results['names'].length; i++){
            if (results['names'][i] in tiers){
                console.log(results['names']] + ':'+ tiers[results['names'][i]])
            }
        }
    });
});


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
