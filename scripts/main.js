var arrayState = mapState(data.results[0].members);
arrayState.sort();

var senateData = data.results[0].members;

if(document.getElementById("state") != null)
    document.getElementById("state").innerHTML = selectState(sortStates(arrayState)).join('');

if(document.getElementById("house-data") != null)
    document.getElementById("house-data").innerHTML = memberMap(filter(data.results[0].members)).join('');

if(document.getElementById("senate-data") != null)
    document.getElementById("senate-data").innerHTML = memberMap(filter(data.results[0].members)).join('');


function mapState(elm) {
    return elm.map(function(elm) {
        return elm.state
    })
};

function memberMap(members) {
    return members.map(mapear);
}

function mapear(elm) {
    var fullName = elm.first_name + ' ' + (elm.middle_name || '') + ' ' + elm.last_name;
    return "<tr><td>" + "<a href=" + elm.url + ">" + fullName + "</a>" + "</td>" + "<td>" + 
    elm.state + "</td>" + "<td>" + elm.party + "</td>" + "<td>" + elm.seniority + "</td>" + "<td>" + elm.votes_with_party_pct + 
    "</tr></td>";
};

function filter(members) {
    return members.filter(filtrar)
}

function filtrar(elm) {
        var array = Array.from(document.querySelectorAll('input[name=party]:checked')).map(elt => elt.value)
        var state = document.getElementById('state').value
        return array.indexOf(elm.party) >= 0 && (state == elm.state || state == "All")
};

function sortStates(Array) {
    var newList = ['All'];
    for (i = 0; i < Array.length; i++)
      if (newList.indexOf(Array[i]) == -1)
          newList.push(Array[i])
    return newList
};

function clickCheck2() {
    return document.getElementById("senate-data").innerHTML = data.results[0].members.filter(filtrar).map(mapear).join('');
};

function clickCheck() {
    return document.getElementById("house-data").innerHTML = data.results[0].members.filter(filtrar).map(mapear).join('');
};

function selectState(members) {
    return members.map(function(elm) {
        return "<option value='" + elm + "'>" + elm + "</option>";
    })
};