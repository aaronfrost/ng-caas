export class AppComponentClass {
    constructor(InitService) {
        InitService.init();
    }

    onMenuSelectChannel(channel) {
        this.selectedChannel = channel;
    }
}
