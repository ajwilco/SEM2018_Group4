$.ajax
({
  type: "GET",
  url: {pull-url},
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa({apikey_token} + ":" + MYSPORTSFEEDS)
  },
  data: '{ "comment" }',
  success: function (){
    alert('Thanks for your comment!'); 
  }
});