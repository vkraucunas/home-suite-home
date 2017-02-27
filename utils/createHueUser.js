let huejay = require('huejay');

huejay.discover({strategy: 'all'})
  .then(bridges => {
    for (let bridge of bridges) {
      console.log(`Id: ${bridge.id}, IP: ${bridge.ip}`);
	  console.log('Press HUE Button');
	  setTimeout(() => {openHueConnection(bridge.ip)}, 5000);
    }
  })
  .catch(error => {
    console.log(`An error occurred: ${error.message}`);
  });




function openHueConnection(ip) {
    console.log(ip);
    
    let client = new huejay.Client({
	  host:     ip,
	  timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default) 
    });
    console.log('Creating User');
	let user = new client.users.User;
	user.deviceType = 'home-suite-home';
	client.users.create(user)
	  .then(user => {
		console.log(`New user created - Username: ${user.username}`);
	  })
	  .catch(error => {
		if (error instanceof huejay.Error && error.type === 101) {
		  return console.log(`Link button not pressed. Try again...`);
		}
	 
		console.log(error);
	  });
}
