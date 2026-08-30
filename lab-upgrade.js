// Motherboard lab expansion: additional internal connectors and a harder challenge mode.
const LAB_EXTRA_ITEMS=[
 {id:"usb2",name:"Internal USB 2.0 header",kind:"cable",short:"USB2",color:"#70d6ff",hint:"Look along the lower edge for a small 9-pin header with one missing key pin.",definition:"An internal motherboard header used for case USB 2.0 ports and some internal USB devices.",description:"A keyed 9-pin plug normally connects two USB 2.0 ports. Do not confuse it with the larger USB 3.x header.",specs:["9-pin layout (10 positions, one missing)","Usually supports two USB 2.0 ports","Common along the bottom edge","Keyed by a missing pin"],challenge:"Which header commonly uses a 9-pin layout with one missing pin and can support two front USB 2.0 ports?"},
 {id:"usbc",name:"Front-panel USB-C header",kind:"cable",short:"USB-C",color:"#48cae4",hint:"Find the compact rectangular Type-E style header near the board's right edge.",definition:"An internal header for a case-mounted USB-C port.",description:"The case USB-C cable plugs into the keyed internal Type-E style connector when the motherboard provides one.",specs:["Commonly called a front USB-C or Type-E header","Used for case USB-C ports","Different from the 19/20-position USB 3.x header","Availability varies by motherboard"],challenge:"A case has a front USB-C port. Which internal motherboard connector should receive its cable?"},
 {id:"sysfan",name:"System/chassis fan header",kind:"cable",short:"SYS",color:"#80ed99",hint:"Look for a small 3/4-pin fan header away from the CPU_FAN connection.",definition:"A motherboard header that powers and controls a case or chassis fan.",description:"Connect a case fan to SYS_FAN or CHA_FAN. A 4-pin header can provide PWM speed control.",specs:["Often labeled SYS_FAN or CHA_FAN","Usually 4-pin PWM","Can accept many 3-pin fans","Firmware/software may control speed"],challenge:"Which header should normally power and monitor a case fan rather than the CPU cooler fan?"},
 {id:"pump",name:"AIO pump header",kind:"cable",short:"PUMP",color:"#57cc99",hint:"Find a small 4-pin header near the CPU area, often labeled PUMP or AIO_PUMP.",definition:"A dedicated fan-style header intended to power and monitor a liquid-cooling pump.",description:"Connect the pump lead to the motherboard header specified by the board/cooler manual; many boards run this header at a higher or fixed duty cycle.",specs:["Often labeled AIO_PUMP or PUMP_FAN","Usually 4-pin","May supply more current than a normal fan header","Not present on every motherboard"],challenge:"A liquid cooler's pump needs a motherboard power/monitoring connection. Which header is intended for it?"},
 {id:"rgb",name:"12 V RGB header",kind:"cable",short:"RGB",color:"#ffd166",hint:"Look along an edge for a 4-pin lighting header. Four pins usually indicate analog 12 V RGB.",definition:"A 4-pin analog RGB lighting header that controls red, green, and blue channels together.",description:"Connect only compatible 12 V 4-pin RGB devices. Do not plug a 5 V addressable RGB device into it.",specs:["4 pins","Typically 12 V","Analog/non-addressable RGB","Not interchangeable with 5 V ARGB"],challenge:"Which lighting connector is typically 4-pin, 12 V, and non-addressable?"},
 {id:"argb",name:"5 V addressable RGB header",kind:"cable",short:"ARGB",color:"#f15bb5",hint:"Look for a 3-pin lighting header, often arranged as 5 V-data-ground with a missing position.",definition:"A digital addressable RGB header that can control individual LEDs in compatible lighting devices.",description:"Use only compatible 5 V ARGB devices. Connecting one to a 12 V RGB header can damage the lighting device.",specs:["3 active pins","Typically 5 V","Addressable/digital lighting","Not interchangeable with 12 V RGB"],challenge:"Which lighting header is normally 5 V and lets compatible LEDs be individually addressed?"},
 {id:"tpm",name:"TPM header",kind:"cable",short:"TPM",color:"#cdb4db",hint:"Find a small multi-pin security-module header along the lower half of the board.",definition:"A motherboard connector for a discrete Trusted Platform Module on boards that support one.",description:"A compatible TPM module connects only to the board's specified TPM header and pinout. Many modern systems instead use firmware TPM.",specs:["Pinout varies by motherboard","Used for a discrete TPM module","Security/key-storage function","Firmware TPM may make the header unnecessary"],challenge:"Which motherboard connector may accept a discrete security module used for cryptographic key storage?"},
 {id:"pciex1",name:"PCIe x1 expansion slot",kind:"component",short:"x1",color:"#ffadad",hint:"Find the short PCI Express slot below or between the longer expansion slots.",definition:"A short PCI Express expansion slot commonly used for lower-bandwidth add-in cards.",description:"Cards such as Wi-Fi, sound, USB, capture, or network adapters may use PCIe x1 depending on the device.",specs:["Shorter than x16","PCI Express interface","One lane by physical design","Used by many peripheral expansion cards"],challenge:"Which short expansion slot is commonly used for Wi-Fi, sound, USB, or other peripheral cards?"},
 {id:"cmos",name:"CMOS/RTC battery",kind:"component",short:"BAT",color:"#e9ecef",hint:"Find the round coin-cell holder in the lower-middle area of the motherboard.",definition:"A coin-cell battery that maintains the real-time clock and helps preserve firmware configuration when system power is removed.",description:"Install the correct battery type with proper polarity. A weak battery can cause clock or firmware-setting loss.",specs:["Common type: CR2032","Coin-cell form factor","Maintains RTC","Supports firmware settings when unplugged"],challenge:"Which board component commonly causes the clock and some firmware settings to reset when it becomes weak?"},
 {id:"clearcmos",name:"Clear-CMOS jumper/header",kind:"component",short:"CLR",color:"#adb5bd",hint:"Look near the battery or lower edge for a tiny 2- or 3-pin jumper/header.",definition:"A motherboard jumper or header used to clear stored firmware configuration and restore default settings.",description:"Use only the motherboard manual's procedure, normally with system power disconnected. Clearing CMOS does not reinstall or downgrade firmware.",specs:["Often labeled CLR_CMOS, JBAT, or CLRTC","Usually 2 or 3 pins","Resets firmware configuration","Does not reflash BIOS/UEFI"],challenge:"Which small jumper/header can reset firmware settings without reinstalling the BIOS/UEFI image?"}
];
LAB_ITEMS.push(...LAB_EXTRA_ITEMS);
LAB_ZONES.push("usb2","usbc","sysfan","pump","rgb","argb","tpm","pciex1","cmos","clearcmos");

let labChallengeMode=false;
const originalRenderLab=renderLab;
renderLab=function(){
 originalRenderLab();
 const pane=document.querySelector('#assemblyLabPane');
 if(!pane)return;
 pane.classList.toggle('challengeMode',labChallengeMode);
 if(labChallengeMode){
   document.querySelectorAll('.labPart').forEach(function(btn){
     const item=labItem(btn.dataset.id); const name=btn.querySelector('span b'); const type=btn.querySelector('span small');
     if(name)name.textContent=item.challenge||item.definition;
     if(type)type.textContent='identify by function';
   });
 }
};
const originalSelectLab=selectLab;
selectLab=function(id){
 originalSelectLab(id);
 if(labChallengeMode){
   const item=labItem(id);
   $('#labHint').textContent='No location hint in Challenge Mode. Use the connector shape, position, and function.';
   $('#labMessage').textContent=(item.challenge||item.definition)+' Find the correct unlabeled location.';
 }
};

(function addChallengeControls(){
 const filters=document.querySelector('.labFilters');
 if(!filters)return;
 const b=document.createElement('button');
 b.id='labChallenge'; b.textContent='Challenge mode: OFF'; b.title='Hide names and location hints; identify items from their purpose.';
 b.onclick=function(){labChallengeMode=!labChallengeMode;b.textContent='Challenge mode: '+(labChallengeMode?'ON':'OFF');b.classList.toggle('active',labChallengeMode);labSelected=null;$('#labHint').textContent=labChallengeMode?'Select an item. Location hints are disabled.':'Select an item to begin.';$('#labMessage').textContent=labChallengeMode?'Identify each item by function, then find its unlabeled connector.':'Choose a part, then identify its unlabeled location.';renderLab()};
 filters.insertBefore(b,document.querySelector('#resetLab'));
})();

// Rebuild once so all new zones appear immediately.
labPlaced={};labSelected=null;labAttempts=0;labMistakes=0;
document.querySelector('#trainingBoard').querySelectorAll('.labZone').forEach(function(z){z.remove()});
buildBoard();renderLab();
