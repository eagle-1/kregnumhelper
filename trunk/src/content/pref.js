function rh_InitOptions(){
        document.getElementById("col0").addEventListener("change",rh_color,true);
        document.getElementById("col1").addEventListener("change",rh_color,true);
        document.getElementById("col2").addEventListener("change",rh_color,true);
        document.getElementById("col3").addEventListener("change",rh_color,true);
        document.getElementById("farbe0").addEventListener("change",rh_farbe,true);
        document.getElementById("farbe1").addEventListener("change",rh_farbe,true);
        document.getElementById("farbe2").addEventListener("change",rh_farbe,true);
        document.getElementById("farbe3").addEventListener("change",rh_farbe,true);
        document.getElementById("ptitle").addEventListener("click",rh_ptv,true);
        try{
            var E=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            document.getElementById("endzeit").checked=E.getBoolPref("extensions.rh.endzeit");
            document.getElementById("countdown").checked=E.getBoolPref("extensions.rh.countdown");
            document.getElementById("geldverkauf").checked=E.getBoolPref("extensions.rh.geldverkauf");
            document.getElementById("welt").selectedIndex=E.getIntPref("extensions.rh.welt");
            document.getElementById("wbwlink").checked=E.getBoolPref("extensions.rh.wbwlink");
            document.getElementById("ptitle").checked=E.getBoolPref("extensions.rh.ptitle");
            document.getElementById("ptv").value=E.getCharPref("extensions.rh.ptv");
            document.getElementById("sortierung").selectedIndex=E.getIntPref("extensions.rh.sortierung");
            document.getElementById("forschend").checked=E.getBoolPref("extensions.rh.forschend");
            document.getElementById("firmensuche").checked=E.getBoolPref("extensions.rh.firmensuche");
            document.getElementById("guildpage").checked=E.getBoolPref("extensions.rh.guildpage");
            document.getElementById("geldsumme").checked=E.getBoolPref("extensions.rh.geldsumme");
            document.getElementById("produktion").checked=E.getBoolPref("extensions.rh.produktion");
            document.getElementById("prodskip").checked=E.getBoolPref("extensions.rh.prodskip");
            document.getElementById("ausbau").checked=E.getBoolPref("extensions.rh.ausbau");
            document.getElementById("allewaren").checked=E.getBoolPref("extensions.rh.allewaren");
            document.getElementById("cancelskip").checked=E.getBoolPref("extensions.rh.cancelskip");
            document.getElementById("ausgabenmarkt").checked=E.getBoolPref("extensions.rh.ausgabenmarkt");
            document.getElementById("menupreis").checked=E.getBoolPref("extensions.rh.menupreis");
            document.getElementById("taschenrechner").checked=E.getBoolPref("extensions.rh.taschenrechner");
            document.getElementById("tracking").checked=E.getBoolPref("extensions.rh.tracking");
            document.getElementById("nolinkicon").checked=E.getBoolPref("extensions.rh.nolinkicon");
            var D=E.getCharPref("extensions.rh.zeiten");
            D=D.split(":");
            D.pop();
            var C;
            for(C=0;C<D.length;C++){
                document.getElementById("zeit"+C).value=D[C]
            }
            var B=E.getCharPref("extensions.rh.farben");
            B=B.split(":");
            B.pop();
            for(C=0;C<B.length;C++){
                document.getElementById("farbe"+C).value=B[C]
                document.getElementById("col"+C).color="#" + B[C]
            }
            //rh_graph();
            //rh_stats();
            rh_ptv()
        }
        catch(F){
            alert("Konnte Einstellungen nicht laden.\n"+F)
        }
    }

function rh_SaveOptions(){
        try{
            var D=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
            var C="";
            var A="";
            for(var B=0;B<4;B++){
                C+=parseFloat(document.getElementById("zeit"+B).value)+":"
            }
            D.setCharPref("extensions.rh.zeiten",C);
            for(B=0;B<4;B++){
                document.getElementById("farbe"+B).value=document.getElementById("farbe"+B).value.replace(/[#]/g,"");
                if(document.getElementById(("farbe"+B)).value.match(/[A-Fa-f0-9]{6}/)&&document.getElementById(("farbe"+B)).value.length==6){
                    A+=document.getElementById("farbe"+B).value+":"
                } else {
                    alert("Keine gültige Farbe\nEine Farbe muss 6 Zeichen haben und nur aus 0-9 und a-f bestehen.");
                    return false
                }
            }
            D.setCharPref("extensions.rh.farben",A);
            D.setBoolPref("extensions.rh.endzeit",document.getElementById("endzeit").checked);
            D.setBoolPref("extensions.rh.countdown",document.getElementById("countdown").checked);
            D.setBoolPref("extensions.rh.geldverkauf",document.getElementById("geldverkauf").checked);
            D.setIntPref("extensions.rh.welt",parseInt(document.getElementById("welt").selectedIndex));
            D.setBoolPref("extensions.rh.wbwlink",document.getElementById("wbwlink").checked);
            D.setBoolPref("extensions.rh.ptitle",document.getElementById("ptitle").checked);
            D.setCharPref("extensions.rh.ptv",document.getElementById("ptv").value);
            D.setIntPref("extensions.rh.sortierung",parseInt(document.getElementById("sortierung").selectedIndex));
            D.setBoolPref("extensions.rh.forschend",document.getElementById("forschend").checked);
            D.setBoolPref("extensions.rh.firmensuche",document.getElementById("firmensuche").checked);
            D.setBoolPref("extensions.rh.guildpage",document.getElementById("guildpage").checked);
            D.setBoolPref("extensions.rh.geldsumme",document.getElementById("geldsumme").checked);
            D.setBoolPref("extensions.rh.produktion",document.getElementById("produktion").checked);
            D.setBoolPref("extensions.rh.prodskip",document.getElementById("prodskip").checked);
            D.setBoolPref("extensions.rh.ausbau",document.getElementById("ausbau").checked);
            D.setBoolPref("extensions.rh.allewaren",document.getElementById("allewaren").checked);
            D.setBoolPref("extensions.rh.cancelskip",document.getElementById("cancelskip").checked);
            D.setBoolPref("extensions.rh.ausgabenmarkt",document.getElementById("ausgabenmarkt").checked);
            D.setBoolPref("extensions.rh.menupreis",document.getElementById("menupreis").checked);
            D.setBoolPref("extensions.rh.taschenrechner",document.getElementById("taschenrechner").checked);
            D.setBoolPref("extensions.rh.tracking",document.getElementById("tracking").checked);
            D.setBoolPref("extensions.rh.nolinkicon",document.getElementById("nolinkicon").checked);
        }
        catch(E){
            alert("Konnte Einstellungen nicht speichern.\n"+E);
            return false
        }
        return true
    }
function rh_ptv(){
        if(document.getElementById("ptitle").checked){
            document.getElementById("ptv").disabled=false
        } else {
            document.getElementById("ptv").disabled=true
        }
    }
function rh_color(){
        for(var B=0;B<4;B++){
            document.getElementById("farbe"+B).value=document.getElementById("col"+B).color.replace(/[#]/g,"");
        }
    }
function rh_farbe(){
        for(var B=0;B<4;B++){
            document.getElementById("farbe"+B).value=document.getElementById("farbe"+B).value.replace(/[#]/g,"");
            if(document.getElementById(("farbe"+B)).value.match(/[A-Fa-f0-9]{6}/)&&document.getElementById(("farbe"+B)).value.length==6){
                document.getElementById("col"+B).color="#" + document.getElementById("farbe"+B).value
            } else {
                alert("Keine gültige Farbe\nEine Farbe muss 6 Zeichen haben und nur aus 0-9 und a-f bestehen.");
                return false
            }
        }
    }
;
