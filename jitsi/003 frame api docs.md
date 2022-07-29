# JItsi  IFrame API

## 001: Getting Started

**_To start using the jitsi iframe api you need_**:
 - add the cdn to your index.html file 
 ```html
 <!-- self host -->
<script src='https://<your-domain-name>/external_api.js'></script>
 <!-- or you can choose the public jitsi host -->
<script src='https://meet.jit.si/external_api.js'></script>
 ```

## 002: Creating the Jitsi Meet API object:
After you have integrated the Meet API library, you must then create the Jitsi Meet API object.

```javascript
api = new JitsiMeetExternalAPI(domain, options)
```
_options is an object with the following properties_:
- `roomName`: the name of the room you want to create or join to.
- `width`: the width of the i frame [ex. 150 (numeric mean pixel), "50%" ] 
 - `height`: the height of the i frame [ex. 150 (numeric mean pixel), "50%" ] 
 - `parentNode`: The HTML DOM Element where the IFrame is added as a child.	
	 usually this is the element with known id and you use 
	 ```javascript
	 document.getElementById('elementId');
	 ```
- `jwt`: The [JWT](https://jwt.io/) token.
- `invitees`: Object arrays that contain information about participants invited to a call.
- `devices`: Information map about the devices used in a call.  for example use the internal mic instead of the headset mic. 
- `userInfo`: The JS object that contains information about the participant starting the meeting.
for example :
```javascript
"user": {
	"avatar": "https:/gravatar.com/avatar/abc123",
	"name": "John Doe",
	"email": "jdoe@example.com",
	"id": "abcd:a1b2c3-d4e5f6-0abc1-23de-abcdef01fedcba"
}
```
- `lang`: The default meeting language.
- `onload`: The IFrame onload event handler. (more events in details below).
- `configOverwrite`: The JS object with overrides for options defined in the [config.js](https://github.com/jitsi/jitsi-meet/blob/master/config.js) file ( more details below).
- `interfaceConfigOverwrite`: The JS object with overrides for options defined in the [interface_config.js](https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js) file (more details below).


##  003: interfaceConfigOverwrite object:
The JS object with overrides for options defined in the [interface_config.js](https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js) .

**_most useful  properties are_**:

- `APP_NAME`: this is the app name.
- `AUDIO_LEVEL_PRIMARY_COLOR:` when the user talks there is border around its avatar , the higher the voice, wider the border, this options set the color of that border.
- `AUDIO_LEVEL_SECONDARY_COLOR`: set the color of the secondary voice level border , this border is the outer border of the first border.
