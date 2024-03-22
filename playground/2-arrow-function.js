const partyEvent = {
  name: "Birthday Party",
  guestList:['Thors', 'Askledd', 'Thorkel'],
  printGuestList: function(){
    console.log(`Guest list for ${this.name}`)

    this.guestList.forEach(function(guest){
      console.log(`${guest} is attending ${this.name}`)
    })
  }
}

partyEvent.printGuestList()