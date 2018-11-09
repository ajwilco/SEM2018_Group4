
$.ajax
({
  type: "GET",
  url: "https://api.mysportsfeeds.com/v1.0/pull/nfl/2017-regular/cumulative_player_stats.json?player=smith",
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa("389c9cb2-7e84-4cb4-a0ec-b2fbaa:Apr231991")
  },
  data: '{ "comment" }',
  success: function (){
    alert('Thanks for your comment!'); 
  }
});
