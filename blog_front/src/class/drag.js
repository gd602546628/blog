/**
 * Created by gd on 2017/4/24.
 */


export class Drag {
  constructor(el) {
    this.el = el;
    this.disX = 0;
    this.disY = 0;
    this.init();

  }

  init() {
    this.el.onmousedown = () => {
      this.mouseDown()
    }
  }


  mouseDown(ev) {
    let e = ev || event;
    this.disX = e.clientX - this.el.offsetLeft;
    this.disY = e.clientY - this.el.offsetTop;
    document.onmousemove = () => {
      this.mouseMove()
    }
    document.onmouseup = () => {
      this.mouseUp()
    }
  }

  mouseMove(ev) {
    let e= ev||event;
    this.el.style.left =e.clientX-this.disX+'px'
    this.el.style.top = e.clientY-this.disY+'px'
  }

  mouseUp(ev) {
    document.onmousemove=null;
    document.onmouseup=null;
  }

}
