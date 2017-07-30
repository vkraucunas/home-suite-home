`npm install`

`npm start`


##Route documentation

* `/lights` 
    * Lists data about all lights on the HUE bridge

* `/lights/on`
    * Turns on all lights

* `/lights/off`
    * Turns off all lights

* `/lights/:id:/on` && `/lights/:id/off` 
    * Turns on/off light by id

* `/lights/:id/brighter?value=20` && `/lights/:id/dimmer?value=20`
    * Brightens or dims lights by optional value or by 5 (note: end value must be 0 > 254)


