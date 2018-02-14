### Redux implementation notes



#### State Types
 * ACTIVATING
 * INVALID
 * STALE
 * VALID
 * RESEARCHING
 * ON
 * OFF
    
#### Action Types
 * ON
 * OFF
 * SUITE
  * VALIDATE
  * INVALIDATE
  * RESEARCH
 * DEVICE
  * ADD
  * ON
  * OFF
  * BRIGHTNESS_CHANGE (ooofh, this doesnt belong here)
  * FORGET
  * HEALTH_CHECK
 * DEVICES
  * VALIDATED
  * INVALIDATED
  * RESEARCH
  * UPDATED

#### Classes for Extension
* Device
  * Id ~ Unique id to identify this device
  * Reachable - Can we control it?
  * Enabled - Are we allowed to control it?
  * On - Is it currently on?
* Controller -> Device
  * Ip Address - What is the network address of this controller?
  * Connection Type - Currently must be `IP`.  This is planned for future expansion
#### Planned Classes        
* Suite -> Device
  * controllers - DataProvider?
        
#### Classes for use:
 * HueController -> Controller
  * Key - To connect to a hue bridge we need a key to access it
