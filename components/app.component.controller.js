export class AppComponentClass {
    constructor(InitService) {
        // console.log("THIS IS AN APP COMPONENT");
        InitService.init();
    }

    onMenuSelectChannel(channel) {
        this.selectedChannel = channel;
    }
}
