var getApiData = function() {
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/search/repositories?callback=repos&q=swift&per_page=5',
    dataType: 'jsonp',
    jsonpCallback: 'repos',
  }).then(
    function(json) {
      // console.log(typeof json);
      var repoList = document.getElementById('repo-list');
      var data = json['data']['items'];
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]['id']);
        var item = document.createElement("li");
        item.textContent = data[i]['id'] + ' : ' + data[i]['full_name'];
        repoList.appendChild(item);
      }
      console.log(data[0]);
    },
    function() {
      console.log('error');
    }
  )
};