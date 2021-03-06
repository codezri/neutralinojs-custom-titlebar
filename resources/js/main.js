
window.myApp = {
    showInfo: () => {
        document.getElementById('info').innerHTML = `
            ${NL_APPID} is running on port ${NL_PORT}  inside ${NL_OS} 
            <br/><br/>
            <span>server: v${NL_VERSION} . client: v${NL_CVERSION}</span>
            `;
    },
    openDocs: () => {
        Neutralino.app.open({
            url: "https://neutralino.js.org/docs"
        });
    },
    openTutorial: () => {
        Neutralino.app.open({
            url: "https://www.youtube.com/watch?v=txDlNNsgSh8&list=PLvTbqpiPhQRb2xNQlwMs0uVV0IN8N-pKj"
        });
    },
    setTray: () => {
        if(NL_MODE != "window") {
            console.log("INFO: Tray menu is only available in the window mode.");
            return;
        }
        let tray = {
            icon: "/resources/icons/trayIcon.png",
            menuItems: [
                {id: "VERSION", text: "Get version"},
                {id: "SEP", text: "-"},
                {id: "QUIT", text: "Quit"}
            ]
        };
        Neutralino.os.setTray(tray);
    },
    onTrayMenuItemClicked: (event) => {
        switch(event.detail.id) {
            case "VERSION":
                Neutralino.os.showMessageBox({
                    type: "INFO",
                    title: "Version information",
                    content: `Neutralinojs server: v${NL_VERSION} | Neutralinojs client: v${NL_CVERSION}` 
                });
                break;
            case "QUIT":
                Neutralino.app.exit();
                break;
        }
    },
    onWindowClose: () => {
        Neutralino.app.exit();
    }
};

// ---------- Custom title bar ------------------

function closeBtnClicked() {
    Neutralino.app.exit();
}

function minimizeBtnClicked() {
    Neutralino.window.minimize();
}

async function maximizeRestoreBtnClicked() {
    let isMaximized = await Neutralino.window.isMaximized();
    let closeBtn = document.getElementById("maxRestoreBtn");
    if(isMaximized) {
        Neutralino.window.unmaximize();
        closeBtn.innerText = "o";
    } 
    else {
        Neutralino.window.maximize();
        closeBtn.innerText = "~";
    }
}

Neutralino.window.setDraggableRegion("titleBar");

// ----------- / Custom title bar ----------

Neutralino.init();
Neutralino.events.on("trayMenuItemClicked", myApp.onTrayMenuItemClicked);
Neutralino.events.on("windowClose", myApp.onWindowClose);
window.myApp.setTray();
window.myApp.showInfo();
