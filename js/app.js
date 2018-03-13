const streamsList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
//Helper functions!!
function allStreams(stream) {
   $.getJSON(`https://wind-bow.gomix.me/twitch-api/streams/${stream}?callback=?`, (data) =>  {
     if(data.stream === null){
       getChannelData(stream, data.stream);
     } else {
       getChannelData(stream, data.stream.stream_type)
     }
  });
}
function onlineStreams(stream) {
  $.getJSON(`https://wind-bow.gomix.me/twitch-api/streams/${stream}?callback=?`, (data) => {
    console.log(data);
    if(data.stream !== null) {
      getChannelData(stream, data.stream.stream_type);
    } 
  });
}
function offlineStreams(stream) {
  $.getJSON(`https://wind-bow.gomix.me/twitch-api/streams/${stream}?callback=?`, (data) => {
    if(data.stream === null) {
      getChannelData(stream, data.stream);
    }
  })
}
function getChannelData(channel, status) {
  $('#results').html('');
  $.getJSON(`https://wind-bow.gomix.me/twitch-api/channels/${channel}?callback=?`, (data) => {
    if(status === null) {
     $('#results').append(`<li><img src="${data.logo}"/>${data.display_name}<br/></li>`)
      } else {
      status = status.toUpperCase();
     $('#results').append(`<li><img src="${data.logo}"/>${data.display_name}<br/><div class="circle" id='status-circle'></div><p>${status}</p></li>`)
      }
   });
}
//Retrieve Data

$(document).ready(function () {
    let allTab = document.getElementById('all-tab')
    let onlineTab = document.getElementById('online-tab')
    let offlineTab = document.getElementById('offline-tab')
    let results = document.getElementById('results')
  //Event listeners
    allTab.addEventListener('mouseover', () => {
        allTab.firstElementChild.nextElementSibling.style.backgroundColor = 'green';
        allTab.appendChild(document.createTextNode('All'))
        for(var i = 0; i < streamsList.length; i++){
            allStreams(streamsList[i]);
        }
    })
    allTab.addEventListener('mouseleave', () => {
        allTab.firstElementChild.nextElementSibling.style.backgroundColor = 'red';
        allTab.innerHTML = '';
        results.innerHTML = '';
    })
   $('#online-tab').on('click', () => {
     $('#online-tab .circle').css('background-color', 'green');
     $('#online-tab').val = 'Online';
       for(var i = 0; i < streamsList.length; i++) {
         onlineStreams(streamsList[i]);
       }
   });
   $('#offline-tab').on('click', () => {
     $('#offline-tab .circle').css('background-color', 'green');
     $('#offline-tab').val = 'Offline';
      for(var i = 0; i < streamsList.length; i++) {
        offlineStreams(streamsList[i]);
      }
  });
});