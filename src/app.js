'use strict';

const apiai = require('apiai');
const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const request = require('request');

const REST_PORT = (process.env.PORT || 5000);
const APIAI_ACCESS_TOKEN = process.env.APIAI_ACCESS_TOKEN;
const APIAI_LANG = process.env.APIAI_LANG || 'en';
const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

const apiAiService = apiai(APIAI_ACCESS_TOKEN, {language: APIAI_LANG, requestSource: "fb"});
const sessionIds = new Map();

function processEvent(event) {
    var sender = event.sender.id;
	
	
	var messageData1 = {
    "attachment": {
      "type": "template",
      "payload": {
        "template_type": "generic",
        "elements": [{
          "title": "1. Oregano farm",
          "subtitle": "Farm in Thessaloniki area (alt. 140m)",
          "image_url": "http://195.251.59.51/json/photorig/of2.jpg",
          "buttons": [{
            "type":"web_url",
			"url":"https://www.google.com/maps/place/40%C2%B030'36.7%22N+23%C2%B008'34.8%22E/@40.5102367,23.1430865,291m/data=!3m1!1e3!4m5!3m4!1s0x0:0x0!8m2!3d40.510201!4d23.143003",
			"title":"Google maps"
			//,"payload": "map"
          },{
            "type": "postback",
            "title": "Sensor data",
            "payload": "sensorsfull",
          },{
            "type": "postback",
            "title": "Soil,Leafs,Oil analysis",
            "payload": "analysisfull",
          }],
        }
		]
      }
    }
  }
	
	
	
	if (event.postback) {	
				var text1 = JSON.stringify(event.postback.payload);
					
				if (!sessionIds.has(sender)) {
					sessionIds.set(sender, uuid.v1());
				}
				let apiaiRequest = apiAiService.textRequest(text1,
					{
						sessionId: sessionIds.get(sender)
				});
					
			apiaiRequest.on('response', (response) => {		
				   if (isDefined(response.result)) {						
						let responseText = response.result.fulfillment.speech;
						let responseData = response.result.fulfillment.data;
						let action = response.result.action;						
						
						if (isDefined(responseData) && isDefined(responseData.facebook)) {
							try {
								console.log('Response as formatted message');
								sendFBMessage(sender, responseData.facebook);
							} catch (err) {
								sendFBMessage(sender, {text: err.message });
							}
						} else if (isDefined(responseText)) {	
						
						if (action=='help' )					
					{						
						sendFBMessage(sender, messageData1);
					};	
										
				
				if (action=='sensorsfull' && response.result.actionIncomplete==false)					
						{	

						//sos Maybe only one graph with both soil and leafs analysis here (both in postback and usual) and different in the simple call					
						//var repl1='http://195.251.59.51/json/photorig/soil.jpg';
										//var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
										//console.log( 'repl99 ======',repl99);
						 var repl34;
					  //var farm=response.result.parameters.farm;
					 // var analelse;
					  repl34='http://195.251.59.51/json/photorig/Monthtempall2.jpg';
					  
					  // switch(response.result.contexts[0].parameters.typeofanalysis) {
								// case "soil":
									
									// repl34='http://195.251.59.51/json/photorig/soils.jpg';
									
									// break;
								// case "leafs":
									
									// repl34='http://195.251.59.51/json/photorig/leafs.jpg';
									// break;								
							// }
					  					  
					  					
						var messageData34 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl34+""
											  }
											}
										  };
										  
						
						sendFBMessage(sender, messageData34);
						
						// var textArray3344 = ['Now for the leafs :-) ','Leafs analysis on the way:', 'We continue with leafs:','Next leafs analysis:','Leafs next:','Leafs analysis next'];
						// var randomNumber3344 = Math.floor(Math.random()*textArray3344.length);		
						// setTimeout(function(){
						// var wrwr3344=textArray3344[randomNumber3344];					
						// sendFBMessage(sender, {text: wrwr3344});
						// }, 3000);
											
						 repl34='http://195.251.59.51/json/photorig/Monthhumall1.jpg';
						 var messageData34 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl34+""
											  }
											}
										  };
										  
						 sendFBMessage(sender, messageData34);
							
						  var ttt=anythingelse();

						  setTimeout(function(){						
						  sendFBMessage(sender, {text: ttt});
						  }, 3000);
						  
						//}
						//var textArray1 = ['How about a graph? :-) ','Do you also want a graph?', 'Do you also want a chart?','How about a chart?','Need a graph?','Need chart?'];
						//var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						//setTimeout(function(){
						//var wrwr=textArray1[randomNumber1];						
						//sendFBMessage(sender, messageData123);
						//sendFBMessage(sender, {text: wrwr});
						//}, 2000);						
				};
				
				
				
				if (action=='analysisfull' && response.result.actionIncomplete==false)					
						{	

						//sos Maybe only one graph with both soil and leafs analysis here (both in postback and usual) and different in the simple call					
						//var repl1='http://195.251.59.51/json/photorig/soil.jpg';
										//var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
										//console.log( 'repl99 ======',repl99);
						 var repl34;
					  //var farm=response.result.parameters.farm;
					 // var analelse;
					  repl34='http://195.251.59.51/json/photorig/Soilleafsoil.jpg';
					  
					  // switch(response.result.contexts[0].parameters.typeofanalysis) {
								// case "soil":
									
									// repl34='http://195.251.59.51/json/photorig/soils.jpg';
									
									// break;
								// case "leafs":
									
									// repl34='http://195.251.59.51/json/photorig/leafs.jpg';
									// break;								
							// }
					  					  
					  					
						var messageData34 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl34+""
											  }
											}
										  };
										  
						
						sendFBMessage(sender, messageData34);
						
						
						
						// var textArray3344 = ['Now for the leafs :-) ','Leafs analysis on the way:', 'We continue with leafs:','Next leafs analysis:','Leafs next:','Leafs analysis next'];
						// var randomNumber3344 = Math.floor(Math.random()*textArray3344.length);		
						// setTimeout(function(){
						// var wrwr3344=textArray3344[randomNumber3344];					
						// sendFBMessage(sender, {text: wrwr3344});
						// }, 3000);
						
						
						// repl34='http://195.251.59.51/json/photorig/leafs.jpg';
						// var messageData34 ={
											// "attachment":{
											  // "type":"image",
											  // "payload":{
												// "url":""+repl34+""
											  // }
											// }
										  // };
										  
						// sendFBMessage(sender, messageData34);
											
					
						  var ttt=anythingelse();

						 
						  setTimeout(function(){						
						  sendFBMessage(sender, {text: ttt});
						  }, 3000);
						  
						//}
						//var textArray1 = ['How about a graph? :-) ','Do you also want a graph?', 'Do you also want a chart?','How about a chart?','Need a graph?','Need chart?'];
						//var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						//setTimeout(function(){
						//var wrwr=textArray1[randomNumber1];						
						//sendFBMessage(sender, messageData123);
						//sendFBMessage(sender, {text: wrwr});
						//}, 2000);
						
				};
				
				
					
						// console.log('6666666666666666666666666666666 mesa        responseText===', responseText);
							sendFBMessage(sender, {text:responseText});			
						}
					}
			});
			apiaiRequest.on('error', (error) => console.error(error));
			apiaiRequest.end();
	};
	
	
	

    if (event.message && event.message.text) {
        var text = event.message.text;
        // Handle a text message from this sender

        if (!sessionIds.has(sender)) {
            sessionIds.set(sender, uuid.v1());
        }

        console.log("Text", text);

        let apiaiRequest = apiAiService.textRequest(text,
            {
                sessionId: sessionIds.get(sender)
            });

        apiaiRequest.on('response', (response) => {
            if (isDefined(response.result)) {
                let responseText = response.result.fulfillment.speech;
                let responseData = response.result.fulfillment.data;
                let action = response.result.action;

                if (isDefined(responseData) && isDefined(responseData.facebook)) {
                    try {
                        console.log('Response as formatted message');
                        sendFBMessage(sender, responseData.facebook);
                    } catch (err) {
                        sendFBMessage(sender, {text: err.message });
                    }
                } else if (isDefined(responseText)) {
					
					
					
					if (action=='help' )					
					{						
						sendFBMessage(sender, messageData1);
					};	
														
					
					if (action=='leafsmonth' )					
					{						
						var r1;
							r1='http://195.251.59.51/json/photorig/leafsmonth1full.jpg';							
								var messageDataq ={
														"attachment":{
														  "type":"image",
														  "payload":{
															"url":""+r1+""
														  }
														}
													  };
									
									sendFBMessage(sender, messageDataq);
									
							setTimeout(function(){	
							r1='http://195.251.59.51/json/photorig/leafsmonth2full.jpg';
									var messageDataq ={
														"attachment":{
														  "type":"image",
														  "payload":{
															"url":""+r1+""
														  }
														}
													  };
									
									
														
									sendFBMessage(sender, messageDataq);
									}, 1000);	
									
									setTimeout(function(){	
									r1='http://195.251.59.51/json/photorig/leafsmonth3full.jpg';
									var messageDataq ={
														"attachment":{
														  "type":"image",
														  "payload":{
															"url":""+r1+""
														  }
														}
													  };
									
									//setTimeout(function(){						
									sendFBMessage(sender, messageDataq);
									}, 2000);	
									
									var ttt=anythingelse();
									setTimeout(function(){						
									sendFBMessage(sender, {text: ttt});
									}, 4000);	
					};
					
					
					if (action=='photos'  )					
						{		
							var r1;
							r1='http://195.251.59.51/json/photorig/photo1_1.jpg';							
								var messageDataq ={
														"attachment":{
														  "type":"image",
														  "payload":{
															"url":""+r1+""
														  }
														}
													  };
									
									sendFBMessage(sender, messageDataq);
							r1='http://195.251.59.51/json/photorig/photo2_2.jpg';
									var messageDataq ={
														"attachment":{
														  "type":"image",
														  "payload":{
															"url":""+r1+""
														  }
														}
													  };
									
									sendFBMessage(sender, messageDataq);
							r1='http://195.251.59.51/json/photorig/photo3_3.jpg';
							var messageDataq ={
														"attachment":{
														  "type":"image",
														  "payload":{
															"url":""+r1+""
														  }
														}
													  };
									
									sendFBMessage(sender, messageDataq);
									
									var ttt=anythingelse();
									setTimeout(function(){						
									sendFBMessage(sender, {text: ttt});
									}, 2000);			
						};
					
										
					if (action=='sensor' && response.result.actionIncomplete==false )					
						{	
					//sos in direct call: maybe both data and histogram from air in one graph or data and histogram from humidity in second
                        var repl123;
					  //var farm=response.result.parameters.farm;
				// repl123='http://195.251.59.51/json/photorig/Month_temp.jpg';
					   switch(response.result.parameters.typeofsensors) {
								 case "air temp.":
									//console.log( 'case first farm ======');
									 repl123='http://195.251.59.51/json/photorig/Month_temp.jpg';
									 break;
								 case "humidity":
									//console.log( 'case second farm ======');
									 repl123='http://195.251.59.51/json/photorig/Month_hum.jpg';
								 break;
							 }			  
						var messageData123 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl123+""
											  }
											}
										  };
						sendFBMessage(sender, messageData123);
						
						//var textArray1 = ['How about a graph? :-) ','Do you also want a graph?', 'Do you also want a chart?','How about a chart?','Need a graph?','Need chart?'];
						var textArray1 = ['I can provide more data. Do you need more?','How about more data? :-) ','Need more graphs?', 'Do you also want another chart?','Care fore more data?','I can give you more data. Do you need more?','Need more data?'];
						var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						setTimeout(function(){
						var wrwr=textArray1[randomNumber1];					
						sendFBMessage(sender, {text: wrwr});
						}, 2000);			
				};	
				
	
				
				if (action=='chartyes'  )					
						{		
						 var repl123;
						 //repl123='http://195.251.59.51/json/photorig/therm_chart1.jpg';
						 
						 switch(response.result.contexts[0].parameters.typeofsensors) {
								 case "air temp.":
									//console.log( 'case first farm ======');
									 repl123='http://195.251.59.51/json/photorig/month_temp_chart.jpg';
									 break;
								 case "humidity":
									//console.log( 'case second farm ======');
									 repl123='http://195.251.59.51/json/photorig/Month_hum_chart.jpg';
								 break;
								// case "third farm":
									//console.log( 'case third farm ======');
									// repl123='http://195.251.59.51/json/photorig/hthermbig3.jpg';
									// break;
													//default:
														//default code block
							 }
						 
						var messageData123 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl123+""
											  }
											}
										  };
						sendFBMessage(sender, messageData123);
						var ttt=anythingelse();
						setTimeout(function(){						
						sendFBMessage(sender, {text: ttt});
						}, 2000);
						
					};	
				
					if (action=='sensorsfull' && response.result.actionIncomplete==false)					
						{	
						 var repl34;
					  repl34='http://195.251.59.51/json/photorig/Monthtempall2.jpg';
						var messageData34 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl34+""
											  }
											}
										  };
										  
						sendFBMessage(sender, messageData34);
						 repl34='http://195.251.59.51/json/photorig/Monthhumall1.jpg';
						 var messageData34 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl34+""
											  }
											}
										  };
										  
						 sendFBMessage(sender, messageData34);
						  var ttt=anythingelse();
						  setTimeout(function(){						
						  sendFBMessage(sender, {text: ttt});
						  }, 3000);
				};
				

				if (action=='analysis' && response.result.actionIncomplete==false )					
						{		
						 var repl123;
						  switch(response.result.contexts[0].parameters.typeofanalysis) {
								case "soil":
									//console.log( 'case first farm ======');
									repl123='http://195.251.59.51/json/photorig/soils.jpg';
									//analelse
									break;
								case "leafs":
									//console.log( 'case second farm ======');
									repl123='http://195.251.59.51/json/photorig/leafs.jpg';
									break;
								case "oil":
									//console.log( 'case second farm ======');
									repl123='http://195.251.59.51/json/photorig/oil.jpg';
									break;									
							}
					  			
						 
						 
					  // var farm=response.result.parameters.farm;
					  // switch(response.result.contexts[0].parameters.farm) {
								// case "first farm":
									// console.log( 'case first farm ======');
									// repl123='http://195.251.59.51/json/photorig/soil1.jpg';
									// break;
								// case "second farm":
									// console.log( 'case second farm ======');
									// repl123='http://195.251.59.51/json/photorig/soil2.jpg';
									// break;
								// case "third farm":
									// console.log( 'case third farm ======');
									// repl123='http://195.251.59.51/json/photorig/soil3.jpg';
									// break;
								
							// }
						var messageData123 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl123+""
											  }
											}
										  };
										  
						sendFBMessage(sender, messageData123);
						var ttt=anythingelse();
						setTimeout(function(){						
						sendFBMessage(sender, {text: ttt});
						}, 4000);
						
						// var textArray1 = ['Anything else? :-) or else call me by name "Farmbot)','Do you want something else?', "That 's it for now..call Farmbot for anything else.",'If you need anything else call Farmbot','This is it for now. Call Farmbot for anything else','Something else? (or just call Farmbot :) )'];
						// var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						// setTimeout(function(){
						// var wrwr=textArray1[randomNumber1];						
									
						// sendFBMessage(sender, {text: wrwr});
						// }, 2000);
						
						
						
				};	
					
					if (action=='analysisfull' && response.result.actionIncomplete==false)					
						{		
						//var repl1='http://195.251.59.51/json/photorig/soil.jpg';
										//var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
										//console.log( 'repl99 ======',repl99);
						 var repl3456;
					  //var farm=response.result.parameters.farm;
					 // var analelse;
					  repl3456='http://195.251.59.51/json/photorig/Soilleafs.jpg';
					  
					  // switch(response.result.contexts[0].parameters.typeofanalysis) {
								// case "soil":
									
									// repl34='http://195.251.59.51/json/photorig/soils.jpg';
									
									// break;
								// case "leafs":
									
									// repl34='http://195.251.59.51/json/photorig/leafs.jpg';
									// break;								
							// }
					  					  
					  
					 
						var messageData3456 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl3456+""
											  }
											}
										  };
										  
						
						sendFBMessage(sender, messageData3456);
						
						
						// var textArray3344 = ['Now for the leafs :-) ','Leafs analysis on the way:', 'We continue with leafs:','Next leafs analysis:','Leafs next:','Leafs analysis next'];
						// var randomNumber3344 = Math.floor(Math.random()*textArray3344.length);		
						// setTimeout(function(){
						// var wrwr3344=textArray3344[randomNumber3344];					
						// sendFBMessage(sender, {text: wrwr3344});
						// }, 2000);
						
						// setTimeout(function(){
						// repl34='http://195.251.59.51/json/photorig/leafs.jpg';
						// var messageData3456 ={
											// "attachment":{
											  // "type":"image",
											  // "payload":{
												// "url":""+repl34+""
											  // }
											// }
										  // };
										  
						
						// sendFBMessage(sender, messageData3456);
						// }, 2000);
						
						
											
						//--------------- old one
						//sendFBMessage(sender, {text: "rere111"});
						  var ttt=anythingelse();
						  setTimeout(function(){						
						  sendFBMessage(sender, {text: ttt});
						  }, 3000);
						
						//var textArray1 = ['How about a graph? :-) ','Do you also want a graph?', 'Do you also want a chart?','How about a chart?','Need a graph?','Need chart?'];
						//var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						//setTimeout(function(){
						//var wrwr=textArray1[randomNumber1];						
						//sendFBMessage(sender, messageData123);
						//sendFBMessage(sender, {text: wrwr});
						//}, 2000);
						
				};
					
                    //console.log('Response as text message');
                    // facebook API limit for text length is 320,
                    // so we split message if needed
                    var splittedText = splitResponse(responseText);

                    for (var i = 0; i < splittedText.length; i++) {
                        sendFBMessage(sender, {text: splittedText[i]});
                    }
                }

            }
        });

        apiaiRequest.on('error', (error) => console.error(error));
        apiaiRequest.end();
    }
}

function anythingelse() {
	var textArray1 = ['Something else? :-)', 'Anything else?', 'Anything else? :-)','Do you want something else?', "That's it for now..call Farmbot (or say Hi) for anything else.",'If you need anything else say Hi','Next :-)','This is it or is there anything else?','What is next? :)','Next? (or say Hi)'];
						var randomNumber1 = Math.floor(Math.random()*textArray1.length);
						var wrwr;
						wrwr=textArray1[randomNumber1];							
						//setTimeout(function(){						
						//console.log( 'wrwr ======',wrwr);
						//return wrwr;						
						//sendFBMessage(sender, messageData123);
						//sendFBMessage(sender, {text: wrwr});
						//}, 2000);
						//console.log( 'wrwr2 ======',wrwr);
						return wrwr;
}


function splitResponse(str) {
    if (str.length <= 320)
    {
        return [str];
    }

    var result = chunkString(str, 300);

    return result;

}

function chunkString(s, len)
{
    var curr = len, prev = 0;

    var output = [];

    while(s[curr]) {
        if(s[curr++] == ' ') {
            output.push(s.substring(prev,curr));
            prev = curr;
            curr += len;
        }
        else
        {
            var currReverse = curr;
            do {
                if(s.substring(currReverse - 1, currReverse) == ' ')
                {
                    output.push(s.substring(prev,currReverse));
                    prev = currReverse;
                    curr = currReverse + len;
                    break;
                }
                currReverse--;
            } while(currReverse > prev)
        }
    }
    output.push(s.substr(prev));
    return output;
}

function sendFBMessage(sender, messageData) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: FB_PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
}

function doSubscribeRequest() {
    request({
            method: 'POST',
            uri: "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=" + FB_PAGE_ACCESS_TOKEN
        },
        function (error, response, body) {
            if (error) {
                console.error('Error while subscription: ', error);
            } else {
                console.log('Subscription result: ', response.body);
            }
        });
}

function isDefined(obj) {
    if (typeof obj == 'undefined') {
        return false;
    }

    if (!obj) {
        return false;
    }

    return obj != null;
}

const app = express();
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", '*');
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, content-type, accept");
    next();
});

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] == FB_VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
        
        setTimeout(function () {
            doSubscribeRequest();
        }, 3000);
    } else {
        res.send('Error, wrong validation token');
    }
});

app.post('/webhook/', function (req, res) {
    try {
        var messaging_events = req.body.entry[0].messaging;
        for (var i = 0; i < messaging_events.length; i++) {
            var event = req.body.entry[0].messaging[i];
            processEvent(event);
        }
        return res.status(200).json({
            status: "ok"
        });
    } catch (err) {
        return res.status(400).json({
            status: "error",
            error: err
        });
    }

});

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
});

doSubscribeRequest();
