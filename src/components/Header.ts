import Clutter from 'gi://Clutter';
import St from 'gi://St';

import { registerGObjectClass } from '../utils/gjs';
import store from '../store';
import Switch from './Switch';

@registerGObjectClass
class Header extends St.BoxLayout {
  private label: St.Label;
  private switch: Switch;

  constructor() {
    super({
      name: 'header',
      style_class: 'header',
      reactive: true,
      can_focus: true,
      x_align: Clutter.ActorAlign.FILL,
      y_align: Clutter.ActorAlign.START,
    });

    this.label = new St.Label({
      text: 'Notes!',
    });

    this.switch = new Switch({
      label: 'Wrap lines',
      onChange: (value) => (store.wrapLines = value),
      initialValue: store.wrapLines,
    });

    this.add_child(this.label);
    this.add_actor(this.switch);
  }

  override show() {
    // console.log(this.textInput.clutter_text.fo);

    super.show();
  }

  override destroy() {
    this.label.destroy();
    this.switch.destroy();

    super.destroy();
  }
}

export default Header;
