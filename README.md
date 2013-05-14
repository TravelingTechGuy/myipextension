My IP Chrome Extension - geolocate by IP
========================================

This simple Chrome extension shows your external IP and then uses uses the [IPInfoDB API](http://ipinfodb.com/) to provide geolocation data, based on that IP.
You can download the extension from the [Chrome app store](https://chrome.google.com/webstore/detail/my-ip/lejbibljgiojigkpkhmdgdhmiaddgidd?hl=en-US&gl=US).

How does it work
----------------
This extension makes one call to a server side, that uses IPInfoDB to turn the IP into a result JSON.

You can read the whole story on [my blog](http://code.travelingtechguy.com/2013/04/whats-my-ip.html), and find the server-side source, at [https://github.com/TravelingTechGuy/myip](https://github.com/TravelingTechGuy/myip).

Build
-----
I used several open source apps to bootstrap and build this extension:
- [Yeoman](https://github.com/yeoman/yeoman) or the official website [yeoman.io](http://yeoman.io)
- [Yeoman Chrome Extension Generator](https://github.com/yeoman/generator-chrome-extension)
- [Grunt](https://github.com/gruntjs/grunt)

Created by **Guy Vider** [http://www.TravelingTechGuy.com](http://www.TravelingTechGuy.com)