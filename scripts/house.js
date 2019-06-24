$(function() {
    var data;
    fetch('https://api.propublica.org/congress/v1/115/house/members.json',
        { 
            headers: new Headers({'X-API-Key':'KcdM6Mh6P913os9PHtO91NkGmlPopyQCwHdumxUd'})
        }
    )
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        house(myJson)
    })
});
        
var app = new Vue({  
    el: '#app',  
    data: {
        members: [],
        statistics2 : {
            demNumber : 0,
            repNumber : 0,
            indNumber : 0,
            totalNumber : 0,
            missedVotesPctDesc : [],
            missedVotesPctAsc : [],
            votesWithPartyPctDem : 0,
            votesWithPartyPctRep : 0,
            votesWithPartyPctInd : 0,
            votesWithPartyPctTotal : [],
            }
        }
    }
);

function house(myJson) {
    app.members = myJson.results[0].members;

    app.statistics2.demNumber = totalDemocrates(app.members).length;

    app.statistics2.repNumber = totalRepublicans(app.members).length;

    app.statistics2.indNumber = totalIndependents(app.members).length;

    app.statistics2.totalNumber = app.statistics2.demNumber + app.statistics2.repNumber + app.statistics2.indNumber;

    app.statistics2.name = "";

    app.statistics2.missedVotesDesc = percentArray(app.members.sort(function(a,b) {return(a.missed_votes - b.missed_votes)}));

    app.statistics2.missedVotesAsc = percentArray(app.members.sort(function(a,b) {return(b.missed_votes - a.missed_votes)}));

    app.statistics2.missedVotesPctDesc = percentArray(app.members.sort(function(a,b) {return(a.missed_votes_pct - b.missed_votes_pct)}));

    app.statistics2.missedVotesPctAsc = percentArray(app.members.sort(function(a,b) {return(b.missed_votes_pct - a.missed_votes_pct)}));

    app.statistics2.votesWithPartyPctDem = (totalDemocrates(app.members).map(elm => elm.votes_with_party_pct || 0).reduce(function(total, elm) {return total + elm}) / app.statistics2.demNumber).toFixed(2);

    app.statistics2.votesWithPartyPctRep = (totalRepublicans(app.members).map(elm => elm.votes_with_party_pct || 0).reduce(function(total, elm) {return total + elm}) / app.statistics2.repNumber).toFixed(2);

    app.statistics2.votesWithPartyPctInd = (indZero(app.members));

    app.statistics2.votesWithPartyPctTotal = ((app.members).map(elm => elm.votes_with_party_pct || 0).reduce(function(total, elm) {return total + elm}) / app.statistics2.totalNumber).toFixed(2);


   // Functions


    function percentArray(array) {
    var obj = Math.round((array.length * 10) / 100);
    return array.slice(0,obj);
    };

    function totalDemocrates(obj) {
      return obj.filter(function(elm){
        return elm.party == "D";
    })
    };

    function totalRepublicans(obj) {
      return obj.filter(function(elm){
        return elm.party == "R";
    })
    };

    function totalIndependents(obj) {
      return obj.filter(function(elm){
        return elm.party == "I";
    })
    };

    function indZero(elm) {
      if (app.statistics2.indNumber == 0) {
        return 0
    } else {
        return (totalIndependents(elm).map(elm => (elm.votes_with_party_pct || 0)).reduce(function (total, elm){return total + elm}) / app.statistics2.indNumber).toFixed(2)
    }
    };
}

/*

function mapear(elm) {
    var fullName = elm.first_name + ' ' + (elm.middle_name || '') + ' ' + elm.last_name;
    return "<tr><td><a href=" + elm.url + ">" + fullName + "</a></td><td>" + 
    (elm.missed_votes || 0) + "</td><td>" + (elm.missed_votes_pct || 0) + "</tr></td>";
};

}

function partyMap(elm) {
    var fullName = elm.first_name + ' ' + (elm.middle_name || '') + ' ' + elm.last_name;
    return "<tr><td><a href=" + elm.url + ">" + fullName + "</a></td><td>" + (elm.total_votes || 0) + "</td><td>" + (elm.votes_with_party_pct || 0) + "</td></tr>" 
}

if(document.getElementById('house-table') != null)
document.getElementById('house-table').innerHTML = "<tr><td>Democrats</td><td>" + statistics2.demNumber + '</td><td>' + statistics2.votesWithPartyPctDem + "</td></tr><tr><td>Republicans</td><td>" + statistics2.repNumber + "</td><td>" + statistics2.votesWithPartyPctRep + "</td></tr><tr><td>Independents</td><td>" + statistics2.indNumber + "</td><td>" + statistics2.votesWithPartyPctInd + "</td></tr><tr><td>Total</td><td>" + statistics2.total + "</td><td>" + statistics2.votesWithPartyPctTotal + "</td></tr>";

if(document.getElementById('missed-votes-desc2') != null)
document.getElementById('missed-votes-desc2').innerHTML = statistics2.missedVotesDesc.map(mapear).join('');

if(document.getElementById('missed-votes-asc2') != null)
document.getElementById('missed-votes-asc2').innerHTML = statistics2.missedVotesAsc.map(mapear).join('');

if(document.getElementById('house-loyalty-votes-asc') != null)
document.getElementById('house-loyalty-votes-asc').innerHTML = statistics2.totalVotesAsc.map(partyMap).join('');

if(document.getElementById('house-loyalty-votes-desc') != null)
document.getElementById('house-loyalty-votes-desc').innerHTML = statistics2.totalVotesDesc.map(partyMap).join('');

*/
