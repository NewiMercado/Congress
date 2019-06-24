$(function() {
    var data;
    fetch('https://api.propublica.org/congress/v1/115/senate/members.json',
        { 
            headers: new Headers({'X-API-Key':'KcdM6Mh6P913os9PHtO91NkGmlPopyQCwHdumxUd'})
        }
    )
    .then(function(response) {
        return response.json()
    })
    .then(function(myJson) {
        procesar(myJson)
    })
});
        
var app = new Vue({  
    el: '#app',  
    data: {
        members: [],
        statistics : {
            senate: {
            demNumber : 0,
            repNumber : 0,
            indNumber : 0,
            totalNumber : 0,
            missedVotesDesc : [],
            missedVotesAsc : [],
            missedVotesPctDesc : [],
            missedVotesPctAsc : [],
            votesWithPartyPctDem : 0,
            votesWithPartyPctRep : 0,
            votesWithPartyPctInd : 0,
            votesWithPartyPctTotal : [],
            }
        }
    }
});

function procesar(myJson) {

    app.members = myJson.results[0].members;
    
    app.statistics.senate.demNumber = totalDemocrates(app.members).length;
    
    app.statistics.senate.repNumber = totalRepublicans(app.members).length;
    
    app.statistics.senate.indNumber = totalIndependents(app.members).length;
    
    app.statistics.senate.totalNumber = app.statistics.senate.demNumber + app.statistics.senate.repNumber + app.statistics.senate.indNumber;

    app.statistics.senate.missedVotesDesc = percentArray(app.members.sort(function(a,b) {return(a.missed_votes - b.missed_votes)}));
    
    app.statistics.senate.missedVotesAsc = percentArray(app.members.sort(function(a,b) {return(b.missed_votes - a.missed_votes)}));
    
    app.statistics.senate.missedVotesPctDesc = percentArray(app.members.sort(function(a,b) {return(a.missed_votes_pct - b.missed_votes_pct)}));
    
    app.statistics.senate.missedVotesPctAsc = percentArray(app.members.sort(function(a,b) {return(b.missed_votes_pct - a.missed_votes_pct)}));
    
    app.statistics.senate.votesWithPartyPctDem = (totalDemocrates(app.members).map(elm => elm.votes_with_party_pct || 0).reduce(function(total, elm) {return total + elm}) / app.statistics.senate.demNumber).toFixed(2);
    
    app.statistics.senate.votesWithPartyPctRep = (totalRepublicans(app.members).map(elm => elm.votes_with_party_pct || 0).reduce(function(total, elm) {return total + elm}) / app.statistics.senate.repNumber).toFixed(2);
    
    if (app.statistics.senate.indNumber == 0) {
        app.statistics.senate.votesWithPartyPctInd = 0
    } else {
        app.statistics.senate.votesWithPartyPctInd = (totalIndependents(app.members).map(elm => elm.votes_with_party_pct || 0).reduce(function(total, elm) {return total + elm}) / app. statistics.senate.indNumber).toFixed(2);
    }
    
    app.statistics.senate.votesWithPartyPctTotal = ((app.members).map(elm => elm.votes_with_party_pct || 0).reduce(function(total, elm) {return total + elm}) / app.statistics.senate.totalNumber).toFixed(2);

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
}


/*

function mapear(elm) {
    var fullName = elm.first_name + ' ' + (elm.middle_name || '') + ' ' + elm.last_name;
    return "<tr><td><a href=" + elm.url + ">" + fullName + "</a></td><td>" + 
    elm.missed_votes + "</td><td>" + elm.missed_votes_pct + "</tr></td>";
};

function partyMap(elm) {
    var fullName = elm.first_name + ' ' + (elm.middle_name || '') + ' ' + elm.last_name;
    return "<tr><td><a href=" + elm.url + ">" + fullName + "</a></td><td>" + elm.total_votes + "</td><td>" + elm.votes_with_party_pct + "</td></tr>" 
}


// Tables


if(document.getElementById('senate-table') != null)
document.getElementById('senate-table').innerHTML = "<tr><td>Democrats</td><td>" + statistics.senate.demNumber + '</td><td>' + statistics.senate.votesWithPartyPctDem + "</td></tr><tr><td>Republicans</td><td>" + statistics.senate.repNumber + "</td><td>" + statistics.senate.votesWithPartyPctRep + "</td></tr><tr><td>Independents</td><td>" + statistics.senate.indNumber + "</td><td>" + statistics.senate.votesWithPartyPctInd + "</td></tr><tr><td>Total</td><td>" + statistics.senate.total + "</td><td>" + statistics.senate.votesWithPartyPctTotal + "</td></tr>";

if(document.getElementById('missed-votes-desc') != null)
document.getElementById('missed-votes-desc').innerHTML = statistics.senate.missedVotesDesc.map(mapear).join('');

if(document.getElementById('missed-votes-asc') != null)
document.getElementById('missed-votes-asc').innerHTML = statistics.senate.missedVotesAsc.map(mapear).join('');

if(document.getElementById('party-loyalty-asc') != null)
document.getElementById('party-loyalty-asc').innerHTML = statistics.senate.totalVotesAsc.map(partyMap).join('');

if(document.getElementById('party-loyalty-desc') != null)
document.getElementById('party-loyalty-desc').innerHTML = statistics.senate.totalVotesDesc.map(partyMap).join('');

}

*/