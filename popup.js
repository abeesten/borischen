var tiers = []
$.get('http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://s3-us-west-1.amazonaws.com') + '/fftiers/out/text_TE.txt', function(response) {
  var reg = /(?<=\: )(.*?)(?=$)/gm,
      item;

  while (item = reg.exec(response['contents'].split(',')))
      tiers.push(item[1].split(", "));
});

console.log(tiers)


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
