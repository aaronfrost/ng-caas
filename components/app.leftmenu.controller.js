export class LeftMenuController {
  constructor(ChannelService) {
    // console.log('Init Left Menu');
    this.channelService = ChannelService;

    this.channelService.getChannels().then(channels => {
      this.channels = channels;
      this.selectChannel(channels[0]);
    })
  }

  selectChannel(channel) {
    this.selected = channel;
    this.onSelectChannel({channel});
  }
}
LeftMenuController.$inject = ['ChannelService'];