export class AppComponentClass {
  constructor() {
    // console.log("THIS IS AN APP COMPONENT");
    console.log("Component Initing");
  }

  onMenuSelectChannel(channel){
    this.selectedChannel = channel;
  }
}