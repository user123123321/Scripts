const fastScroll = {
     start() {
          document.addEventListener('keydown', (e) => {
               if (e.key == 'ArrowUp' && window.IsDialogOpened()) {
                    this.onArrowUp();
                    return
               }
               if (e.key == 'ArrowDown' && window.IsDialogOpened()) {
                    this.onArrowDown();
                    return
               }
          })
     },
     onArrowUp() {
          const lastItem = App.$children[0].$children[1].$children[0].items.length - 1;
          const selectedItem = App.$children[0].$children[1].$children[0].$children[0].selected;

          if (selectedItem == 0) {
               this.scrollToBottom(lastItem);
          }

          return
     },
     onArrowDown() {
          const lastItem = App.$children[0].$children[1].$children[0].items.length - 1;
          const selectedItem = App.$children[0].$children[1].$children[0].$children[0].selected;

          if (selectedItem == lastItem) {
               this.scrollToTop();
          }
         
          return
     },
     scrollToBottom(lastItem) {
          const dialogList = document.getElementById('list');

          App.$children[0].$children[1].$children[0].$children[0].selected = lastItem + 1;

          setTimeout(() => {
               dialogList.scrollTop = 9e5;
          }, 100);

          return
     },
     scrollToTop() {
          const dialogList = document.getElementById('list');

          App.$children[0].$children[1].$children[0].$children[0].selected = -1;
          dialogList.scrollTop = 0;

          return
     }
}

fastScroll.start();