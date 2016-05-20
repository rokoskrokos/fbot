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
          "title": "1. Apple farm",
          "subtitle": "Farm in Thessaloniki area",
          "image_url": "http://www.agronews.gr/files/temp/605E6F4B28B0612541320C6C50EA2686.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://ssi.gov.gr/samplecode.php",
            "title": "Web"
          },{
            "type": "postback",
            "title": "Sensor",
            "payload": "sensor data for the first farm",
          },{
            "type": "postback",
            "title": "Soil analysis",
            "payload": "soil analysis for the first farm",
          }],
        },{
          "title": "2. Potato farm",
          "subtitle": "Farm in Seres area",
          "image_url": "http://sspga.ca/wordpress_sspga/wp-content/uploads/2015/01/IMG_0239-website-size.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "https://www.messenger.com/",
            "title": "Web"
          },{
            "type": "postback",
            "title": "Sensor",
            "payload": "sensor data for the second farm",
          },{
            "type": "postback",
            "title": "Soil analysis",
            "payload": "soil analysis for the second farm",
          }],
        }		
		,{
          "title": "3. Tomato farm",
          "subtitle": "Farm in Thessaloniki area",
          "image_url": "http://laxanokipos.com/LaxNew/wp-content/uploads/2015/03/2010_12_13_13-59-%CE%A4%CE%BF%CE%BC%CE%AC%CF%84%CE%B5%CF%82-%CF%85%CF%80%CE%B1%CE%AF%CE%B8%CF%81%CE%B9%CE%B5%CF%82-%CE%BC%CE%B5-mulch.jpg",
          "buttons": [{
            "type": "web_url",
            "url": "http://ssi.gov.gr/contactus.php",
            "title": "Web"
          },{
            "type": "postback",
            "title": "Sensor",
            "payload": "sensor data for the third farm",
          },{
            "type": "postback",
            "title": "Soil analysis",
            "payload": "soil analysis for the third farm",
          }
		  ],
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
					
					if (action=='sensor' && response.result.actionIncomplete==false )					
						{	
                      var repl123;
					  //var farm=response.result.parameters.farm;
					  switch(response.result.parameters.farm) {
								case "first farm":
									console.log( 'case first farm ======');
									repl123='http://195.251.59.51/json/photorig/hthermbig.jpg';
									break;
								case "second farm":
									console.log( 'case second farm ======');
									repl123='http://195.251.59.51/json/photorig/hthermbig.jpg';
									break;
								case "third farm":
									console.log( 'case third farm ======');
									repl123='http://195.251.59.51/json/photorig/hthermbig.jpg';
									break;
								//default:
								//	default code block
							}
					  
						//var repl123='http://195.251.59.51/json/photorig/hthermbig.jpg';
						//var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
						//console.log( 'repl99 ======',repl99);
						var messageData123 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl123+""
											  }
											}
										  };
										  
										  
										  
						sendFBMessage(sender, messageData123);
						
						var textArray1 = ['How about a graph? :-) ','Do you also want a graph?', 'Do you also want a chart?','How about a chart?','Need a graph?','Need chart?', 'Whould you like a chart?'];
						var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						setTimeout(function(){
						var wrwr=textArray1[randomNumber1];						
						//sendFBMessage(sender, messageData123);
						sendFBMessage(sender, {text: wrwr});
						}, 2000);
						
				};	
				if (action=='chartyes'  )					
						{		
						var repl123='http://195.251.59.51/json/photorig/therm_chart2.jpg';
						//var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
						//console.log( 'repl99 ======',repl99);
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
						//var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						//setTimeout(function(){
						//var wrwr=textArray1[randomNumber1];						
						//sendFBMessage(sender, messageData123);
						//sendFBMessage(sender, {text: wrwr});
						//}, 2000);
						
				};	
				if (action=='analysis' && response.result.actionIncomplete==false)					
						{		
						var repl1='http://195.251.59.51/json/photorig/soil.jpg';
						//var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
						//console.log( 'repl99 ======',repl99);
						var messageData123 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl1+""
											  }
											}
										  };
						sendFBMessage(sender, messageData123);
						
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
					
					if (action=='sensor' && response.result.actionIncomplete==false )					
						{	
                        //parameter.farm ="second farm"	
						//var repl123='http://195.251.59.51/json/"+parameter.farm+"/hthermbig.jpg';
						//or var repl123='http://195.251.59.51/json/photorig/"+left(parameter.farm,3)+"hthermbig.jpg';
						var repl123='http://195.251.59.51/json/photorig/hthermbig.jpg';
						var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
						//console.log( 'repl99 ======',repl99);
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
						sendFBMessage(sender, {text: ttt});
						
						// var textArray1 = ['How about a graph? :-) ','Do you also want a graph?', 'Do you also want a chart?','How about a chart?','Need a graph?','Need chart?'];
						// var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						// setTimeout(function(){
						// var wrwr=textArray1[randomNumber1];					
						// sendFBMessage(sender, {text: wrwr});
						// }, 2000);
						
				};	
				if (action=='chartyes'  )					
						{		
						var repl123='http://195.251.59.51/json/photorig/therm_chart2.jpg';
						//var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
						//console.log( 'repl99 ======',repl99);
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
						sendFBMessage(sender, {text: ttt});
						// var textArray1 = ['Anything else? :-) or else call me by name "Farmbot)','Do you want something else?', "That 's it for now..call Farmbot for anything else.",'If you need anything else call Farmbot','This is it for now. Call Farmbot for anything else','Something else? (or just call Farmbot :) )'];
						// var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						// setTimeout(function(){
						// var wrwr=textArray1[randomNumber1];					
						// sendFBMessage(sender, {text: wrwr});
						// }, 2000);
						
				};	
				if (action=='analysis' && response.result.actionIncomplete==false )					
						{		
						var repl1='http://195.251.59.51/json/photorig/soil.jpg';
						//var repl456='http://195.251.59.51/json/photorig/therm_chart.jpg';
						//console.log( 'repl99 ======',repl99);
						var messageData123 ={
											"attachment":{
											  "type":"image",
											  "payload":{
												"url":""+repl1+""
											  }
											}
										  };
						sendFBMessage(sender, messageData123);
						var ttt=anythingelse();
						sendFBMessage(sender, {text: ttt});
						
						// var textArray1 = ['Anything else? :-) or else call me by name "Farmbot)','Do you want something else?', "That 's it for now..call Farmbot for anything else.",'If you need anything else call Farmbot','This is it for now. Call Farmbot for anything else','Something else? (or just call Farmbot :) )'];
						// var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						// setTimeout(function(){
						// var wrwr=textArray1[randomNumber1];						
									
						// sendFBMessage(sender, {text: wrwr});
						// }, 2000);
						
						
						
				};	
					
                    console.log('Response as text message');
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
	var textArray1 = ['Anything else? :-) or else call me by name "Farmbot)','Do you want something else?', "That 's it for now..call Farmbot for anything else.",'If you need anything else call Farmbot','This is it for now. Call Farmbot for anything else','Something else? (or just call Farmbot :) )'];
						var randomNumber1 = Math.floor(Math.random()*textArray1.length);			
						setTimeout(function(){
						var wrwr=textArray1[randomNumber1];						
						//sendFBMessage(sender, messageData123);
						//sendFBMessage(sender, {text: wrwr});
						}, 2000);
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