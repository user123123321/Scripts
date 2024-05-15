const oldInfoCard = {
  gameTextInterval: null,
  isBusinessOpen: false,
  openOldInfoCard(e, n) {
    e = JSON.parse(e);
    let r = n == "Business" ? 1 : 0;
    let d = r == 0 ? e[1] : e[2];
    let a = r == 0 ? e[4] : e[6];
    let i = r == 0 ? e[2] : e[3];
    let l = r == 0 ? e[6] : e[5];
    let o = r == 0 ? e[5] : e[4];
    let t = r == 0 ? ["Эконом класс", "Деревенски дом", "Средни класс", "Премиум класс", "Элитны дом", "Эконом класс", "VIP класс", "Квартира"].indexOf(e[3].replace("й", "").replace("й", "").replace("+", "")) : e[1];
    e = JSON.stringify([r, d, a, i, l, o, t]);
    window.openInterface("InfoCard", e);
    if (d.toLocaleLowerCase().includes("киоск")) {
      setTimeout(() => {
        window.interface("InfoCard").$el.children[0].children[0].children[1].children[0].children[1].className = "text";
        window.interface("InfoCard").$el.children[0].children[0].children[1].children[0].children[1].innerHTML = `<span style="color: hsl(336deg 28% 67%)">Свободных полок: ${a}<span>`;
        window.interface("InfoCard").$el.children[0].children[1].children[1].children[0].children[1].innerText = "Налог на продажу";
        window.interface("InfoCard").$el.children[0].children[1].children[1].children[0].children[0].innerText = `${o} %`;
      }, 50);
    }
    if (n == "Appartament") {
      setTimeout(() => {
        window.interface("InfoCard").$el.children[0].children[1].children[0].children[0].innerHTML = `<span style="color:${i.toLocaleLowerCase() == "государство" ? "hsl(120deg 100% 39%)" : "FFFFFF"}">${i}</span>`;
        window.interface("InfoCard").$el.children[0].children[0].children[1].children[0].children[0].innerHTML = `<span style="color:${i.toLocaleLowerCase() == "государство" ? "hsl(120deg 100% 39%)" : "FFFFFF"}">${d}</span>`;
      }, 50);
    }
  },
  hookAndReplaceNewInfoCard() {
    window.App.$refs.Appartament = [{
      close() {
        clearInterval(oldInfoCard.gameTextInterval);
        window.interface("GameText").add("[3,\"~w~Для взаимодействия нажмите ~g~alt\",500,0,0,0]");
        window.closeInterface("InfoCard");
      }
    }];
    window.App.$refs.Business = [{
      close: () => {
        clearInterval(oldInfoCard.gameTextInterval);
        window.interface("GameText").add("[3,\"~w~Для взаимодействия нажмите ~g~alt\",500,0,0,0]");
        window.closeInterface("InfoCard");
        this.isBusinessOpen = false;
      }
    }];
    window.openInterface = new Proxy(window.openInterface, {
      apply: (e, n, r) => {
        try {
          if (r[0] === "Business") {
            this.isBusinessOpen = true;
          }
          if (r[0] === "Business" || r[0] === "Appartament") {
            window.interface("GameText").add("[3,\"~w~Для взаимодействия нажмите ~g~alt\",3000,0,0,0]");
            oldInfoCard.gameTextInterval = setInterval(() => window.interface("GameText").add("[3,\"~w~Для взаимодействия нажмите ~g~alt\",3000,0,0,0]"), 2000);
            oldInfoCard.openOldInfoCard(r[1], r[0]);
            return 0;
          }
        } catch (e) {}
        return Reflect.apply(e, n, r);
      }
    });
    this.onKeyDown();
    jsLoader.showConnectedScript("info", "oldInfoCard");
  },
  onKeyDown() {
    document.addEventListener("keydown", e => {
      if (!e.repeat) {
        if (this.isBusinessOpen && e.keyCode === 18) {
          window.sendClientEvent(0, "Business_OnPlayerEnter");
        }
      }
    });
  }
};
oldInfoCard.hookAndReplaceNewInfoCard();
