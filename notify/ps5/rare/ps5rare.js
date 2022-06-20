const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

var localappdata;

if (process.platform == "win32") {
    localappdata = path.join(process.env.LOCALAPPDATA);
} else if (process.platform == "linux") {
    localappdata = path.join(process.env.HOME,".local","share");
} else if (process.platform == "darwin") {
    localappdata = path.join(process.env.HOME,"Library","Application Support");
}

const config = JSON.parse(fs.readFileSync(path.join(localappdata,"Steam Achievement Notifier (V1.8)","store","config.json")));

document.body.style.opacity = config.opacity * 0.01;

ipcRenderer.on('notifymain', function(event, notifyachievement, notifytitle, notifydesc, notifyicon, screenshot, percent, audio, gameicon) {

document.getElementById("audio").src = audio;
document.getElementById("audio").volume = (config.rarevolume * 10) / 100;
document.getElementById("audio").play();

var colour1 = config.rarecolour1;
var colour2 = config.rarecolour2;
var textcolour = config.raretextcolour;
var img;

if (config.rareimg == "default") {
    img = "../../../img/santextlogobg.png";
} else {
    img = config.rareimg;
}

var icon;

if (notifyicon == "test") {
    icon = "../../../img/sanlogosquare.svg";
} else {
    icon = notifyicon;
}

var righticon;

if (config.raregameicon == "true") {
    if (notifyicon == "test") {
        righticon = "../../../img/gameicon.png";
    } else {
        righticon = gameicon;
    }
} else {
    if (config.rareicon == "" || config.rareicon == undefined) {
        righticon = "../../../img/sanlogosquare.svg";
    } else {
        righticon = config.rareicon;
    }
}

var borderradius;
var ssborderradius;
var ssimgborderradius;

if (config.rarenotifypos == "topleft") {
    borderradius = config.rareroundness + "px";
    ssborderradius = config.rareroundness + "px " + config.rareroundness + "px 0px 0px";
    ssimgborderradius = "0px 0px " + config.rareroundness + "px " + config.rareroundness + "px";
  } else if (config.rarenotifypos == "bottomleft") {
    borderradius = config.rareroundness + "px";
    ssborderradius = "0px 0px " + config.rareroundness + "px " + config.rareroundness + "px";
    ssimgborderradius = config.rareroundness + "px " + config.rareroundness + "px 0px 0px";
  
    document.getElementById("screenshotcont").style.order = "-1";
  } else if (config.rarenotifypos == "topcenter") {
    borderradius = config.rareroundness + "px";
    ssborderradius = config.rareroundness + "px " + config.rareroundness + "px 0px 0px";
    ssimgborderradius = "0px 0px " + config.rareroundness + "px " + config.rareroundness + "px";
} else if (config.rarenotifypos == "topright") {
    borderradius = config.rareroundness + "px";
    ssborderradius = config.rareroundness + "px " + config.rareroundness + "px 0px 0px";
    ssimgborderradius = "0px 0px " + config.rareroundness + "px " + config.rareroundness + "px";
} else if (config.rarenotifypos == "bottomright") {
    borderradius = config.rareroundness + "px";
    ssborderradius = "0px 0px " + config.rareroundness + "px " + config.rareroundness + "px";
    ssimgborderradius = config.rareroundness + "px " + config.rareroundness + "px 0px 0px";

    document.getElementById("screenshotcont").style.order = "-1";
  } else if (config.rarenotifypos == "bottomcenter") {
    borderradius = config.rareroundness + "px";
    ssborderradius = "0px 0px " + config.rareroundness + "px " + config.rareroundness + "px";
    ssimgborderradius = config.rareroundness + "px " + config.rareroundness + "px 0px 0px";

    document.getElementById("screenshotcont").style.order = "-1";
}

var solid = "background: " + colour1;
var background = "background: radial-gradient(circle, " + colour1 + " 0%, " + colour2 + " 100%)";
var imgbackground = "url('" + img + "')";

var scale = config.rarescale;
document.getElementById("cont").style.transform = "translate(-50%, -50%) scale(" + scale + "%, " + scale + "%)";

if (config.iconanim == "false") {
    document.getElementById("outline").style.display = "none";
    document.getElementById("outlinecont").style.display = "none";
    document.getElementById("outlineinnercont").style.display = "none";
    document.getElementById("icon").style.boxShadow = "none";
}

var bgtype = config.rarebgtype;

if (bgtype == "bgsolid") {
    document.getElementById("cont").style.color = textcolour;
    document.getElementById("notifycont").style = solid;
    if (screenshot == "true" && config.rarescreenshot == "true") {
        document.getElementById("notifycont").style.borderRadius = ssborderradius;
        document.getElementById("screenshot").style.borderRadius = ssimgborderradius;
    } else {
        document.getElementById("notifycont").style.borderRadius = borderradius;
    }
    document.getElementById("icon").src = icon;
    document.getElementById("icon").style.borderRadius = "" + config.rareiconroundness + "px";
    document.getElementById("righticon").src = righticon
} else if (bgtype == "bg") {
    document.getElementById("cont").style.color = textcolour;
    document.getElementById("notifycont").style = background;
    if (screenshot == "true" && config.rarescreenshot == "true") {
        document.getElementById("notifycont").style.borderRadius = ssborderradius;
        document.getElementById("screenshot").style.borderRadius = ssimgborderradius;
    } else {
        document.getElementById("notifycont").style.borderRadius = borderradius;
    }
    document.getElementById("icon").src = icon;
    document.getElementById("icon").style.borderRadius = "" + config.rareiconroundness + "px";
    document.getElementById("righticon").src = righticon
} else if (bgtype == "img") {
    document.getElementById("cont").style.color = textcolour;
    document.getElementById("notifycont").style.backgroundImage = imgbackground;
    document.getElementById("notifycont").style.backgroundPosition = "center";
    document.getElementById("notifycont").style.backgroundRepeat = "no-repeat";
    document.getElementById("notifycont").style.backgroundSize = "300px";
    if (screenshot == "true" && config.rarescreenshot == "true") {
        document.getElementById("notifycont").style.borderRadius = ssborderradius;
        document.getElementById("screenshot").style.borderRadius = ssimgborderradius;
    } else {
        document.getElementById("notifycont").style.borderRadius = borderradius;
    }
    document.getElementById("icon").src = icon;
    document.getElementById("icon").style.borderRadius = "" + config.rareiconroundness + "px";
    document.getElementById("righticon").src = righticon
}

if (screenshot == "true" && config.rarescreenshot == "true") {
    if (notifyicon == "test") {
        document.getElementById("screenshot").src = "../../../img/santextlogobg.png";
    } else {
        // document.getElementById("screenshot").src = "../../../img/ss.png";
        document.getElementById("screenshot").src = path.join(localappdata,"Steam Achievement Notifier (V1.8)","img","ss.png");
    }
    document.getElementById("cont").style.height = "219px";
    document.getElementById("screenshotcont").style.display = "flex";
} else {
    document.getElementById("cont").style.height = "50px";
    document.getElementById("screenshotcont").style.display = "none";
}

var title = notifytitle;
var desc = notifyachievement;

document.getElementById("textinner").innerHTML = title;
document.getElementById("desc").innerHTML = desc;

document.getElementById("cont").style.fontSize = 14 * config.rarefontsize * 0.01 + "px";
document.getElementById("desc").style.fontSize = 12 * config.rarefontsize * 0.01 + "px";
document.getElementById("trophyicon").style.width = 10 * config.rarefontsize * 0.01 + "px";
document.getElementById("trophyicon").style.height = 10 * config.rarefontsize * 0.01 + "px";

document.getElementById("notifycont").style.animation = "none";

var pause = 0;

var direction = "left";

if (config.rarenotifypos == "topright" || config.rarenotifypos == "topcenter" || config.rarenotifypos == "bottomcenter" || config.rarenotifypos == "bottomright") {
    direction = "left";
} else {
    direction = "right";
}

function PlayNotification(add) {
    if (config.rarenotifypos == "topcenter" || config.rarenotifypos == "topleft" || config.rarenotifypos == "topright") {
        document.getElementById("screenshot").style.animation = "revealdown 0.3s 0.3s forwards";
    } else {
        document.getElementById("screenshot").style.animation = "revealup 0.3s 0.3s forwards";
    }

    document.getElementById("notifycont").style.animation = "fadein" + direction + " 0.2s linear forwards";
    document.getElementById("notifycont").style.borderRadius = borderradius;

    document.getElementById("screenshot").addEventListener('animationstart', function(event) {
        if (event.animationName == "revealdown" || event.animationName == "revealup") {
            document.getElementById("notifycont").style.transition = "0.2s";
            document.getElementById("notifycont").style.borderRadius = ssborderradius;
        }
    });

    document.getElementById("notifycont").addEventListener('animationend', function(event) {
        if (event.animationName == "fadein" + direction) {
            document.getElementById("notifycont").style.animation = "animpause " + ((pause * 0.001) + add) + "s linear forwards";
        } else if (event.animationName == "animpause") {
            document.getElementById("screenshot").style.animation = "fadeinrev" + direction + " 0.2s linear forwards";
            document.getElementById("notifycont").style.animation = "fadeinrev" + direction + " 0.2s linear forwards";
        } else if (event.animationName == "fadeinrev" + direction) {
            ipcRenderer.send('notifywinstop');
        }
    });
}

var displaytime = config.raredisplaytime;

if (displaytime == 15) {
    PlayNotification(14);
} else if (displaytime == 14) {
    PlayNotification(13);
} else if (displaytime == 13) {
    PlayNotification(12);
} else if (displaytime == 12) {
    PlayNotification(11);
} else if (displaytime == 11) {
    PlayNotification(10);
} else if (displaytime == 10) {
    PlayNotification(9);
} else if (displaytime == 9) {
    PlayNotification(8);
} else if (displaytime == 8) {
    PlayNotification(7);
} else if (displaytime == 7) {
    PlayNotification(6);
} else if (displaytime == 6) {
    PlayNotification(5);
} else if (displaytime == 5) {
    PlayNotification(4);
} else if (displaytime == 4) {
    PlayNotification(3);
} else if (displaytime == 3) {
    PlayNotification(2);
} else if (displaytime == 2) {
    PlayNotification(1);
}

});