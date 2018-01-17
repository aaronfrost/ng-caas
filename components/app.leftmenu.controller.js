export class LeftMenuController {
    constructor(ChannelService, InitService) {
        // console.log('Init Left Menu');
        this.channelService = ChannelService;

        this.channelService.getChannels().then(channels => {
            this.channels = channels;
            this.selectChannel(channels[0]);
        });
        InitService.init();
    }

    selectChannel(channel) {
        this.selected = channel;
        this.onSelectChannel({ channel });
    }
}
LeftMenuController.$inject = ["ChannelService", "InitService"];
