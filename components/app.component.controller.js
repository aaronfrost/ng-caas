export class AppComponentClass {
  constructor() {

    console.log("Component Initing");
  }

  onMenuSelectChannel(channel){
    this.selectedChannel = channel;
  }
}