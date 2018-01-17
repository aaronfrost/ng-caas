export class AvatarController {
    constructor(UserService, $attrs, InitService) {
        this.userService = UserService;
        this.attrs = $attrs;

        this.showPopover = false;
        this.updatePicSize();
        this.considerPopover();
        InitService.init();
    }

    $onChanges(changes) {
        if (changes.userId && changes.userId.currentValue) {
            this.updateUser();
        }
        if (changes.size && changes.size.currentValue) {
            this.updatePicSize();
        }
    }

    updateUser() {
        this.user = undefined;
        return this.userService.getUserById(this.userId).then(user => {
            this.user = user;
            return this.user;
        });
    }

    updatePicSize() {
        let { size } = this.attrs;
        if (["large", "medium", "thumbnail"].includes(size)) {
            this.picSize = size;
        } else {
            this.picSize = "thumbnail";
        }
    }

    considerPopover() {
        if (this.attrs.noPopover) {
            this.noPopover = true;
        }
    }

    togglePopover(e) {
        this.showPopover = !!!this.showPopover;
    }

    popoverClosed() {
        this.showPopover = false;
    }
}
