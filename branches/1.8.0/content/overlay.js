// prefs for debugging.  true should mean enabled.
var debuggingPrefs = ["nglayout.debug.disable_xul_cache", "javascript.options.showInConsole", "javascript.options.strict", "browser.dom.window.dump.enabled", "extensions.logging.enabled"];

function doToggleregnumhelperPrefs(menuitem){
        var chk = menuitem.getAttribute("checked");
        if(chk == "" || chk == "false")
        doSetDebuggingPrefs(false);
        else
        doSetDebuggingPrefs(true);
    }

function doSetDebuggingPrefs(v){
        try {
        var mPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        for(var i=0; i<debuggingPrefs.length; i++)
          mPrefs.setBoolPref(debuggingPrefs[i], v);    
        }
        catch(e) {}
    }

var regnumhelper = {
    onLoad: function() {
        // initialization code
        this.initialized = true;
        this.strings = document.getElementById("regnumhelper-strings");
        var rv = false;
        // set the "debugging prefs" menuitem
        var mPrefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        try {
            for(var i=0; i<debuggingPrefs.length; i++){
                rv = rv || mPrefs.getBoolPref(debuggingPrefs[i]);
            }
        }
        catch(e){}
        doSetDebuggingPrefs(rv);
        document.getElementById("regnumhelper_toggleprefs").setAttribute("checked", rv);
    },
    onMenuItemCommand: function(e) {
    var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
                                  .getService(Components.interfaces.nsIPromptService);
    promptService.alert(window, this.strings.getString("helloMessageTitle"),
                                this.strings.getString("helloMessage"));
    },

};
window.addEventListener("load", function(e) { regnumhelper.onLoad(e); }, false);
