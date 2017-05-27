export class MainContentController {
  constructor(MessageService, UserService, $element, $timeout, $q) {
    this.messageService = MessageService;
    this.userService = UserService;
    this.$el = $element;
    this.$timeout = $timeout;
    this.$q = $q;
  }

  $onChanges(changes){
    if(changes.selectedChannel && changes.selectedChannel.currentValue){
      this.updateMessages();
    }
  }

  updateMessages(){
    this.messages = undefined;
    this.messageService.getMessagesForChannelId(this.selectedChannel.id)
      .then(messages=>{
        this.messages = messages;
        this.scrollToBottom();
      })
  }

  addMessage(message){
    this.messages.push(message);
    this.scrollToBottom();
  }

  scrollToBottom(){
    this.$timeout(()=>{
      this.$el[0].querySelector('app-messages-container').scrollTop = 100000000;
    }, 150);
  }

  getSelectedMembersText(){
    let promises = this.selectedChannel.members.map(memberId=> this.userService.getUserById(memberId));
    this.$q.all(promises).then(users=>{
      this.selectedMembersTooltipText = users.map(user=>`${user.name.first} ${user.name.last}\n`).join('')
    });
  }
}