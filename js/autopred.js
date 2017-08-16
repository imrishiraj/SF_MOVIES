var xmlHttp = createXmlHttpRequestObject();                  //Calling the function to vaidate input credentials
function createXmlHttpRequestObject()                        
{
	var xmlHttp;

	if(window.ActiveXObject)                                 //If user is using internet Explorer
	{
		try
		{
			xmlHttp = new ActiveXObject("Microsoft.xmlHttp");
		}
		catch(e)
		{
			xmlHttp=false;
		}
	}
	else                                                   //If user is NOT using internet Explorer but any other browser
	{
		try
		{
			xmlHttp = new XMLHttpRequest();
		}
		catch(e)
		{
			xmlHttp=false;
		}
	}

	if(!xmlHttp)                                           //If Object can not be initialized.
		{
			alert("Can not create object");
		}
	else
	{
		return xmlHttp;
	}
}

function processCheckDB()
{
	if(xmlHttp.readyState==0 || xmlHttp.readyState==4)     						  //If object state is either 0 OR 4 i.e. object not engaged otherwise.
	{	
		var url = "https://data.sfgov.org/resource/wwmu-gmzc.json"
		xmlHttp.open("GET",url, true);
		xmlHttp.onreadystatechange = handleServerResponseLoginstu;                   //Preparing to send request
		xmlHttp.send(null); 
	}
	else
	{
		setTimeout('processCheckDB()', 1000);                                     //If reasyState is NOT 0 or 4 then repeat then wait and check again after 1 second.
	}
}
function handleServerResponseLoginstu()
{
	if(xmlHttp.readyState==4||xmlHttp.readyState==0)                              //If object state is either 0 OR 4 i.e. object not engaged otherwise.
	{
		if(xmlHttp.status==200)                                                   //status 200 means everything went OK
		{
			var jobj = JSON.parse(xmlHttp.responseText);
			var i;
			var location=[];
			for(i=0;i<1000;i++)
				if(jobj[i].hasOwnProperty('locations'))
					location.push(jobj[i].locations);
			var unique = location.filter(function(elem, index, self) {
    		return index == self.indexOf(elem);
			})
			$( function() 
  				{

  					$("#city").autocomplete({source: unique});
    			} 
    		);			
		}
		else
		{
			alert("xmlHttp.status!=200");
		}
	}
}