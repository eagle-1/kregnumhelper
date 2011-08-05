/* Regnum Helper by Nobbi */
const rh_version="1.8.0";
const rh_v=180;
var GBack = "", tr_arr = new Array(), tr_max = 0, tr_ind = 0, tr_inprogress = new Boolean (false), popwin, mainwin,lang='de',uin,
    x=0, xx=100, yy=0, y=0, rh_showit=0, over, gm_name = new Array(), gm_uid = new Array(), gm_stat = new Array(),
    gm_cnt = 0, tid=0, rh_igmforw = new Boolean (false), rh_devel = new Boolean(false), anzahl, ziel, cur="", popcalc=null, DD = 0,
    ww = Components.classes["@mozilla.org/embedcomp/window-watcher;1"].getService(Components.interfaces.nsIWindowWatcher),
    prompts = Components.classes["@mozilla.org/embedcomp/prompt-service;1"].getService(Components.interfaces.nsIPromptService),
    rh_prefManager=Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
if(rh_prefManager.getIntPref("extensions.rh.version")<rh_v){
        rh_prefManager.setIntPref("extensions.rh.version",rh_v);
        window.setTimeout("rh_updated();",5000)
    }
function rh_updated(){
        var A=gBrowser.addTab("http://www.gate4fun.de/regnum/#dl1");
        gBrowser.selectedTab=A
    }
function rh_wtl(B,A){
        rh_show(over);
        B.getElementById("rhDiv").innerHTML=A
    }
function rh_show(A){
        A.style.visibility="visible"
    }
function rh_hide(A){
        A.style.visibility="hidden"
    }
function rh_moveTo(C,B,A){
        C.style.left=B+"px";
        C.style.top=A+"px";
        return false
    }
function rh_clr(){
        rh_showit=0;
        rh_hide(over)
    }
function rh_rinfo(C,D,B){
        var A='<table cellspacing=1 cellpadding=2 border=0 width=180 bgcolor="#000000"><tr><td class="white"><b>'+D+'</b></td></tr>\n<tr><td class="white2">\n'+B+"</td></tr></table>";
        rh_wtl(C,A);
        rh_display_it()
    }
function rh_info(B,C,A){
        yy=-70;
        xx=-210;
        if(yy==-111){
            xx=-335
        }
        if(yy==-244){
            xx=-335
        }
        rh_rinfo(B,C,A)
    }
function rh_display_it(){
        if(rh_showit==0){
            rh_moveTo(over,x+xx,y+yy);
            rh_show(over);
            rh_showit=1
        }
    }
Math.setSectionPoints=function(F){
        var E=String(F).split(".");
        if(E[0].length<=3){
            return E.join(",")
        }
        var C=E[0].split("").reverse();
        var A=new Array();
        A.push(","+E[1]);
        var D=0;
        for(var B=0;B<C.length;B++){
            A.push(C[B]);
            D++;
            if(D==3){
                A.push(".");
                D=0
            }
        }
        F=A.reverse().join("");
        if(F.substring(0,1)=="."){
            F=F.substring(1,F.length)
        }
        if(F.search("undefined")>-1){
            F=F.substring(0,F.search("undefined")-1)
        }
        return F
    };
function rh_mouseMove(A){
        x=A.pageX;
        y=A.pageY;
        if(over){
            rh_moveTo(over,x+xx,y+yy);
        }
    }
function rh_forschZeit(C){
        var H=C.target.ownerDocument;
        over=H.getElementById("rhDiv");
        var F=C.target.parentNode.previousSibling.previousSibling.textContent;
        var A=F.match(/Zeit: ([0-9]+[:][0-9]+[:][0-9]+)/)[1];
        var E=A.split(":");
        var D=E[0]*60*60*1000+E[1]*60*1000+E[2]*1000;
        var B=new Date();
        B.setTime(B.getTime()+D);
        var I=new Array("So","Mo","Di","Mi","Do","Fr","Sa");
        var G=I[B.getDay()]+" "+((B.getDate()<10)?"0"+B.getDate():B.getDate())+"."+(((parseFloat(B.getMonth())+1)<10)?"0"+(parseFloat(B.getMonth())+1):(parseFloat(B.getMonth())+1))+" "+((B.getHours()<10)?"0"+B.getHours():B.getHours())+":"+((B.getMinutes()<10)?"0"+B.getMinutes():B.getMinutes());
        rh_info(H,"Endzeit:",G)
    }
function rh_endZeit(C){
        var H=C.target.ownerDocument;
        over=H.getElementById("rhDiv");
        var F=C.target.parentNode.textContent;
        var A=F.match(/([0-9]+[:][0-9]+[:][0-9]+)/)[0];
        var E=A.split(":");
        var D=E[0]*60*60*1000+E[1]*60*1000+E[2]*1000;
        var B=new Date();
        B.setTime(B.getTime()+D);
        var I=new Array("Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag");
        var G=I[B.getDay()]+" "+((B.getDate()<10)?"0"+B.getDate():B.getDate())+"."+(((parseFloat(B.getMonth())+1)<10)?"0"+(parseFloat(B.getMonth())+1):(parseFloat(B.getMonth())+1))+". "+((B.getHours()<10)?"0"+B.getHours():B.getHours())+":"+((B.getMinutes()<10)?"0"+B.getMinutes():B.getMinutes())+" Uhr";
        rh_info(H,"Endzeit:",G)
    }
function rh_BerechneProdZeit(E){
        if(E.target.getAttribute("size")==8){
            //~ anzahl=rh_evalNode(E.target.ownerDocument,E.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode,".//input[@size='9']");
            if(DD==0){
                ziel=E.target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.firstChild;
            }
            if(DD==1){
                ziel=E.target.parentNode.parentNode.nextSibling.nextSibling.firstChild;
            }
                anzahl=ziel.value;
        }else{
            ziel=E.target;
            anzahl=E.target.value;
        }
        if(anzahl==0||anzahl==""){
            if(DD==0){
                ziel.nextSibling.textContent="Endzeit: "
            }
            if(DD==1){
                ziel.nextSibling.nextSibling.textContent="Endzeit: "
            }
        }else{
            var D=rh_evalNode(E.target.ownerDocument,E.target.parentNode.parentNode,".//font");
            var C=D[0].parentNode.lastChild.textContent;
            C=C.substring(C.search("Pro Std.")+"Pro Std.".length+1,C.length);
            var F=3600/C;
            F=F*anzahl*1000;
            var G=new Date();
            G.setTime(G.getTime()+F);
            var A=new Array("So","Mo","Di","Mi","Do","Fr","Sa");
            var B=A[G.getDay()]+unescape("%A0")+((G.getDate()<10)?"0"+G.getDate():G.getDate())+"."+(((parseFloat(G.getMonth())+1)<10)?"0"+(parseFloat(G.getMonth())+1):(parseFloat(G.getMonth())+1))+". "+((G.getHours()<10)?"0"+G.getHours():G.getHours())+":"+((G.getMinutes()<10)?"0"+G.getMinutes():G.getMinutes())+unescape("%A0"+"Uhr");
            if(DD==0){
                ziel.nextSibling.textContent="Endzeit: " + B
            }
            if(DD==1){
                ziel.nextSibling.nextSibling.textContent="Endzeit: " + B
            }
        }
    }
function rh_ProdKosten(A){
        var K=A.target.ownerDocument;
        over=K.getElementById("rhDiv");
        var C="<table border=0 width=180 cellpadding=0 cellspacing=0>";
        var D=rh_evalNode(K,A.target.parentNode.parentNode,".//font[@class='klein']");
        var F=D[1].parentNode.firstChild;
        if(A.target.getAttribute("size")==8){
            if(DD==0){
                anzahl=A.target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.firstChild.value;
            }
            if(DD==1){
                anzahl=A.target.parentNode.parentNode.nextSibling.nextSibling.firstChild.value;
            }
        }else{
            anzahl=A.target.value;
        }
        if(D[1].textContent.search("tigt: ")>-1){
            var G=D[1].textContent.substring(D[1].textContent.search("tigt: ")+"tigt: ".length,D[1].textContent.length);
            var B=new Array();
            var H=new Array();
            for(var E=0;G.search(/[0-9]/)>-1;E++){
                H[E]=G.substring(G.search(/[0-9]/),G.search(/[a-za-я]/i)-1);
                G=G.substring(G.search(/[a-za-я]/i),G.length);
                if(G.search(/[0-9]/)>-1){
                    B[E]=G.substring(G.search(/[a-za-я]/i),G.search(/[0-9]/));
                    G=G.substring(G.search(/[0-9]/),G.length)
                }else{
                    B[E]=G
                }
            }
            for(E=0;E<B.length;E++){
                C+="<tr><td>"+Math.setSectionPoints(Math.round(H[E]*anzahl*10)/10)+" "+B[E]+"</td></tr>"
            }
        }
        if(DD==0){
            var I=rh_extract(D[1].nextSibling.nextSibling.textContent,"Produktionskosten: "," ");
        }
        if(DD==1){
            var I=rh_extract(D[1].nextSibling.nextSibling.nextSibling.textContent,"Produktionskosten: "," ");
        }
        I=I.replace(".","");
        I=I.replace(",",".");
        C+="<tr><td>"+Math.setSectionPoints(Math.round(I*anzahl*100)/100)+" "+cur+"</td></tr></table>";
        rh_info(K,Math.setSectionPoints(anzahl)+" "+F.textContent,C)
    }
function rh_BerechneProduktion(E){
        var D=E.target.value;
        D=D.replace(/[,]/g,":");
        if(D.search(":")<0){
            var C=D*60
        }else{
            D=D.split(":");
            if(D.length==2){
                C=D[0]*60*60+D[1]*60
            }else{
                C=D[0]*24*60*60+D[1]*60*60+D[2]*60
            }
        }
        var H=E.target.parentNode.lastChild.textContent;
        H=H.substring(H.search("Pro Std.")+"Pro Std.".length+1,H.length);
        var B=3600/H;
        var A=C/B;
        A=Math.round(A);
        if(DD=0){
            E.target.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling.firstChild.value=A
        }
        if(DD=1){
            E.target.parentNode.parentNode.nextSibling.nextSibling.firstChild.value=A
        }
    }
function rh_BerechneKosten(A){
        var C=A.target.ownerDocument;
        var E=A.target.value;
        var F=A.target.parentNode.parentNode;
        var D=F.textContent.match(/zum Preis von ([.,0-9]+)/)[1];
        D=D.replace(".","");
        D=D.replace(",",".");
        var B=D*E;
        B=Math.round(B*100)/100;
        B=Math.setSectionPoints(B);
        C.getElementById("gesamtkosten").textContent="Gesamtkosten: "+B+" "+cur
    }
function rh_extract(C,B,A){
        C=C.substring(C.search(B)+B.length,C.length);
        C=C.substring(0,C.search(A));
        return C
    }
function rh_isRegnumDom(A){
        if(A.search(/(skybanner.php|ucp.php|schaufenster_public.php|zeitung.php|statistics.php|hilfe[a-zA-Z0-9]*.php|fehlerseite.php)/)>-1){
            return false
        }
        if(A.search(/kapi-regnum*(.de|-welten.de)/)>-1){
            lang="de";
            return true
        }
        if(A.search(/file:/)>-1){
            lang="de";
            return true
        }
        return false
    }
function rh_evalNode(F,B,D){
        var A=F.evaluate(D,B,null,0,null),
        E=[],
         C;
        while(C=A.iterateNext()){
            E.push(C)
        }
        return E
    }
function rh_eval(A,B){
        return rh_evalNode(A,A,B)
    }
function rh_insAfter(A,B){
        B.parentNode.insertBefore(A,B.nextSibling);
        return A
    }
function rh_insBefore(A,B){
        B.parentNode.insertBefore(A,B);
        return A
    }
function rh_new_elm(D,C,E){
        var A=D.createElement(C);
        var args = Array.prototype.slice.call(arguments);
        if(E.indexOf("<")!=-1||E.indexOf("&")!=-1){
            A.innerHTML=E
        } else {
            if(E.length>0){
                A.appendChild(D.createTextNode(E))
            }
        }
        if(args.length>3){
            for(var B=3;B<args.length-1;B+=2){
                if(!args[B+1].length){
                    continue
                }
                A.setAttribute(args[B],args[B+1])
            }
        }
        return A
    }
function rh_wait_kauf (){
        popwin.focus();
        if (tr_inprogress == true) {
            popwin.setTimeout(function(){rh_wait_kauf()}, 100);
        } else {
            var el=popwin.document.getElementById("rhfetch");
            if (tr_ind < tr_max){
                el.textContent=tr_ind + "/" + (tr_max) + ":" + tr_arr[tr_ind];
                var http = new XMLHttpRequest();
                http.open("GET", tr_arr[tr_ind], true);
                http.onreadystatechange = function() {
                    if (http.readyState == 4) {
                        try {
                            //var text = http.responseText;
                            //alert(http.responseText);
                            el.textContent="Done " + tr_ind;
                            tr_inprogress = false;
                        }
                        catch (ex) {}
                    }
                }
                tr_inprogress = true;
                http.send(null);
                tr_ind ++;
                popwin.setTimeout(function(){rh_wait_kauf()}, 100);
            } else {
                el.textContent="Reloading Page...";
                gBrowser.selectedBrowser.contentDocument.location.replace(GBack);
                popwin.close();
            }
        }
    }

function rh_wait_schau(){
        window.clearTimeout(tid);
        try{
            if(gBrowser.selectedBrowser.contentDocument.location.href.search(/page=guild_member&/)>-1){
                if (tr_inprogress == true) {
                    tid=window.setTimeout(function(){rh_wait_schau()}, 100);
                } else {
                    if (tr_ind < tr_max){
                        gBrowser.selectedBrowser.contentDocument.getElementById('pr'+tr_ind).setAttribute("src","chrome://regnumhelper/skin/loading12.gif");
                        gBrowser.selectedBrowser.contentDocument.getElementById('pr'+tr_ind).setAttribute("title","Checking");
                        var http = new XMLHttpRequest();
                        http.open("GET", tr_arr[tr_ind], true);
                        http.onreadystatechange = function() {
                            if (http.readyState == 4) {
                                try{
                                    var text = http.responseText, found = [];
                                    //alert(http.responseText);
                                    if(found = text.match(/Status: (.[A-Za-z]*)/i)){
                                        gm_stat[tr_ind]=found[1];
                                        if(gm_stat[tr_ind]=="VIP"){
                                            gBrowser.selectedBrowser.contentDocument.getElementById('pr'+tr_ind).setAttribute("src","chrome://regnumhelper/skin/premicon.gif");
                                        }else if(gm_stat[tr_ind]=="Normal"){
                                            gBrowser.selectedBrowser.contentDocument.getElementById('pr'+tr_ind).setAttribute("src","chrome://regnumhelper/skin/done12.gif");
                                        }
                                    }else{
                                        gm_stat[tr_ind]="Unknown";
                                        gBrowser.selectedBrowser.contentDocument.getElementById('pr'+tr_ind).setAttribute("src","chrome://regnumhelper/skin/unknown.gif");
                                    }
                                    gBrowser.selectedBrowser.contentDocument.getElementById('pr'+tr_ind).setAttribute("title","Status: "+gm_stat[tr_ind]);
                                    tr_inprogress = false;
                                    tr_ind ++;
                                }
                                catch (ex){
                                    tr_inprogress = false;
                                    return true;
                                }
                            }
                        }
                        tr_inprogress = true;
                        http.send(null);
                        tid=window.setTimeout(function(){rh_wait_schau()}, 100);
                    }else{
                        tr_ind = 1;
                    }
                }
            }
        }
        catch(ex){
            tr_ind=1;
            tr_inprogress = false;
            return true;
        }
    }
function rh_show_kauf(Aa){
        var Gstring = "", i, links, Gcode, Gtype, J=Aa.originalTarget, docloc=J.location.href;;
        tr_max = 0;
        tr_ind = 0;
        if(docloc.search(/page=/)>-1){
            uin=docloc.match(/UIN=(.[0-9a-f]*)/i)[1];
            GBack = "http://" + J.location.host + J.location.pathname + "?page=kaufs&UIN=" + uin + "&show=all";
        }
        links = J.getElementsByTagName("a");
        for(i = 0; i < links.length; i++) {
            if(links[i].getAttribute("href")) {
                if(links[i].getAttribute("href").match(/page=kauf&/)) {
                    // alert("Laufvariable:"+ i + "\n" + links[i].innerHTML);
                    window.status = "";
                    Gcode = links[i].getAttribute("href").match(/y=(.[0-9]*)/i)[1];
                    Gtype = links[i].getAttribute("href").match(/art=(.[0-9]*)/i)[1];
                    switch (Gtype){
                        case '28':
                            Gstring = "Bauernmarkt      ";
                            break;
                        case '30':
                            Gstring = "Gasthaus         ";
                            break;
                        case '32':
                            Gstring = "Obstmarkt        ";
                            break;
                        case '27':
                            Gstring = "Waffenhändler    ";
                            break;
                        default:
                            Gstring = "unbekannt        ";
                    }
                    tr_arr[tr_max] = "http://" + J.location.host + J.location.pathname + "?page=kauf&art=" + Gtype + "&y=" + Gcode + "&UIN=" + uin;
                    tr_max ++;
                    tr_arr[tr_max] = GBack;
                    tr_max ++;
                }
            }
        }
        popwin = ww.openWindow(null, 'chrome://regnumhelper/content/rhfetch.html', 'rhfetch', 'width=600,height=120,titlebar=no,scrollbars=yes,toolbar=no,resizable=yes', null);
        popwin.document.close();
        popwin.moveTo((screen.width/3),(screen.height/3));
        popwin.setTimeout(function(){rh_wait_kauf()}, 100);
    }
function rh_autoqell(Aa){
        prompts.alert(null, "no net hudln...","Do missta nuch a weng wartn.\n\nDess iss nuch net fertich!\n\nDeswecha scholt ma dess a nuch amol aus, gell?");
        rh_prefManager.setBoolPref("extensions.rh.autoquell",false);
        //~ var J = Aa.originalTarget, docloc=J.location.href;
        //~ uin=docloc.match(/UIN=(.[0-9a-f]*)/i)[1];
        //~ var rh_td=rh_eval(J,"//td[@class='white2']/*[position()=1 and name()='TABLE']//text()[contains(.,'Quellbrunnen A:')]/parent::td");
        //~ var rh_q_all = '';
        //~ for(var i=0;i<rh_td.length;i++){
            //~ rh_q_all +=rh_td[i].previousSibling.previousSibling.firstChild.textContent + "\n";
        //~ }
        //~ alert (rh_q_all);
        gBrowser.selectedBrowser.contentDocument.location.replace(Aa.originalTarget.location.href);
    }
function rh_empty(A){
        A.target.value=""
    }
function rh_absLeft(A){
        return(A.offsetParent)?A.offsetLeft+rh_absLeft(A.offsetParent):A.offsetLeft
    }
function rh_absTop(A){
        return(A.offsetParent)?A.offsetTop+rh_absTop(A.offsetParent):A.offsetTop
    }
function rh_noteln(F){
        var nt=notiz.text.value;
        var ist=nt.length;
        var rest=F-ist;
        if(rest<0){
            notiz.text.value=nt.substr(0,F);
            rest=0;
        }
        notiz.counter.value=rest;
    }
function rh_wbwlink(B){
        var C=B.target.ownerDocument;
        var D=C.location;
        var uintab=D.href.match(/UIN=(.[0-9a-f]*)/i)[1];
        gBrowser.selectedBrowser.contentDocument.location.replace("http://"+D.host+D.pathname+"?page=wettbewerb&UIN="+uintab);
    }
function rh_igmPopup(B){
        var C=B.target.ownerDocument;
        uin=C.location.href.match(/UIN=(.[0-9a-f]*)/i)[1];
        over=C.getElementById("rhDiv");
        if(C.location.href.search(/page=guild_member&/)>-1){
            if(DD==0){
                D=B.target.parentNode.nextSibling.childNodes[1].textContent;
            }
            if(DD==1){
                D=B.target.nextSibling.textContent;
            }
        }
        //~ }else{
            //~ if(C.location.href.search("page=vertrag&")>-1){
                //~ var D=B.target.nextSibling.textContent
            //~ }else{
                //~ var D=B.target.parentNode.firstChild.textContent
            //~ }
        //~ }
        var G="<FORM name='notiz' action='"+C.location.pathname.substring(1,C.location.pathname.length)+"?page=nachricht2&UIN="+uin+"' style='margin: 1px;' method='post'><INPUT type='hidden' value='1' name='filled'/><INPUT type='hidden' value='"+D+"' size='50' maxlength='50' name='fname'/>";
        G+="<TABLE cellspacing='0' cellpadding='0' border='0' width='180'><TBODY><TR><TD align='left' width='30%' valign='top' class='white'>Betreff</TD><TD align='left' width='70%' valign='top' class='white'><INPUT type='text' value='' size='50' maxlength='50' name='betreff'/></TD></TR>";
        G+="<TR><TD align='left' width='30%' valign='top' class='white'>Text<BR/><BR/>Smilies? Geht mit <a onclick=\"window.open('','fenster','width=270,height=400,resizable=no,scrollbars=yes')\" target=\"fenster\" href=\"hilfebb.php\">BB-Code</a></TD>";
        G+="<TD align='left' width='70%' valign='top' class='white'><TEXTAREA onfocus='rh_noteln(1500);' onkeyup='rh_noteln(1500);' onkeydown='rh_noteln(1500);' onchange='rh_noteln(1500);' cols='50' rows='10' name='text'></TEXTAREA>";
        G+="<BR/>(noch maximal<INPUT type='text' value='1500' onfocus='notiz.text.focus();' maxlength='4' size='4' name='counter'/> Zeichen)<BR/><BR/></TD></TR>";
        G+="<TR><TD align='left' width='30%' valign='top' class='white'></TD><TD width='70%' valign='top' class='white'><INPUT id='rh_igmsend' type='submit' class='send' value=' senden '/> &nbsp; <INPUT id='rh_igmclose' type='submit' class='send' value=' schliessen ' onclick='return false;'/>";
        G+="<BR/><BR/></TD></TR></TBODY></TABLE></FORM>";
        rh_moveTo(over,rh_absLeft(B.target)+54,rh_absTop(B.target)-15);
        rh_info(C,"Botschaft an: "+D,G);
        rh_moveTo(over,rh_absLeft(B.target)+54,rh_absTop(B.target)-15);
        C.getElementById("rh_igmsend").addEventListener("click",function(E){rh_igmforw=true},true);
        C.getElementById("rh_igmclose").addEventListener("click",function(E){rh_clr()},true)
    }
function rh_ausbau(A){
        var H = 0;
        var K=A.target.value;
        var G=A.target.parentNode.parentNode;
        var N=G.textContent.match(/kostet Euch ([\.0-9]+)/)[1];
        N=N.replace(".","");
        var J=G.textContent.match(/(?:dauert [etwa ]*)([:0-9]*)(?:[ Std.]*)/)[1];
        if(J.search(/:/)>-1){
            var Q=J.split(":");
            J=Q[0];
            H=Q[1];
        }else{
            H=G.textContent.match(/(Std.) ([\.0-9]+) Min/)[2];
       }
        var P=G.textContent.match(/([\.0-9]+) Holz/)[1];
        var O=G.textContent.match(/([\.0-9]+) Steine/)[1];
        var B=G.textContent.match(/([\.0-9]+) Werkzeuge/)[1];
        var F=N*K;
        F=Math.round(F*100)/100;
        F=Math.setSectionPoints(F);
        var I=J*60+(H*K);
        var M=P*K;
        M=Math.setSectionPoints(M);
        var E=O*K;
        E=Math.setSectionPoints(E);
        var D=B*K;
        D=Math.setSectionPoints(D);
        var C="Kosten: "+F+cur+unescape("%A0%A0")+"Dauer: "+Math.floor(I/60)+" Stunden und "+(I%60)+" Minuten";
        var L="Holz: "+M+unescape("%A0%A0")+"Steine: "+E+unescape("%A0%A0")+"Werkzeuge: "+D;
        A.target.ownerDocument.getElementById("kosten").textContent=C;
        A.target.ownerDocument.getElementById("kosten2").textContent=L
    }
function rh_alleWaren(A){
        var B=A.target.parentNode.parentNode;
        var C=B.childNodes[1].lastChild.textContent;
        C=C.replace(/[,.]/g,"");
        C=C.replace(/\s/g,"");
        A.target.parentNode.childNodes[1].value=C;
        A.target.parentNode.childNodes[1].focus()
    }
function rh_calc(B){
        if(popcalc == null || popcalc.closed){
        popcalc = ww.openWindow(null, 'chrome://regnumhelper/content/rhcalc.html', 'rhcalculator', 'width=220,height=170,scrollbars=no,toolbar=no,resizable=no', null);
        popcalc.document.close();
        popcalc.moveTo((screen.width/3),(screen.height/3));
        }else{
            popcalc.focus();
        }
    }
function rh_init_main(Aa){
        var J = Aa.originalTarget, D=0, P, H, Q, A, B, G, F, E, K, L, rh_row1, docloc=J.location.href, cn1=0, pos1=0, cn2=0;
        mainwin=J;
        if(!rh_isRegnumDom(docloc)){return}
        if(docloc.search(/page=/)>-1){
            uin=docloc.match(/UIN=(.[0-9a-f]*)/i)[1];
            try{
                rh_devel=rh_prefManager.getBoolPref("extensions.rh.devel");
            }
            catch(E){
                rh_devel=false;
            }
        }
        //start bugfixing for typos from upjers...
        // leave disabled, else layout is crippled...
        //~ var BFc = ["heigth", "background-repeart", "heigt", "widht"], BFc1 = ["height", "background-repeat", "height", "width"];
        //~ for(var i=0;i<BFc.length;i++){
            //~ var BFw = rh_eval(J,"//div[contains(@style,'"+ BFc[i] +"')]");
            //~ if(BFw.length>0){
                //~ var BFa = BFw[0].getAttribute("style");
                //~ BFa = BFa.replace(BFc[i],BFc1[i]);
                //~ BFw[0].setAttribute("style",BFa);
            //~ }
        //~ }
        //end bugfixing for typos from upjers...
        if(rh_prefManager.getBoolPref("extensions.rh.ptitle")){
            J.title = rh_prefManager.getCharPref("extensions.rh.ptv");
        }
        var M=rh_eval(J,"//td/abbr[text()='Bar']/parent::td/parent::tr/parent::tbody/tr/td");
        
        if(M.length==0){
            M=rh_eval(J,"//div/abbr[text()='Bar']/../../div");
            DD = 1;
        }
        
        if(M.length>0){
            
            if(M[0].childNodes[2]){
                if(M[0].childNodes[2].nodeName=="IMG"){
                    D+=3
                } else {
                //if(rh_evalNode(J,M[0],".//a/text()").length>0){
                    D+=2
                }
            }
            //alert("Line 593:" + D + "\n\n" + M.length + "\n\n" + M[2].innerHTML);
            P=rh_new_elm(J,"table","","id","rhtable1");
            H=rh_new_elm(J,"tr","");
            Q=J.createElement("TD");
            A=J.createElement("TD");
            B=J.createElement("TD");
            G=rh_new_elm(J,"b","");
            F=rh_new_elm(J,"font","","face","Tahoma","color","darkblue");
            E=J.createTextNode("RHelper "+rh_version);
            if(rh_devel){
                if(!rh_prefManager.getBoolPref("extensions.rh.nolinkicon")){
                    Q.appendChild(rh_new_elm(J,"img","","src","chrome://regnumhelper/content/regnumhelpel.gif","width","32px","height","32px"));
                }
                Q.addEventListener("click",function(){window.open("chrome://regnumhelper/content/prefel.xul","findfile","chrome")},true);
            }else{
                if(!rh_prefManager.getBoolPref("extensions.rh.nolinkicon")){
                    Q.appendChild(rh_new_elm(J,"img","","src","chrome://regnumhelper/content/regnumhelper.gif","width","32px","height","32px"));
                }
                Q.addEventListener("click",function(){window.open("chrome://regnumhelper/content/pref.xul","findfile","chrome")},true);
            }
            F.appendChild(E);
            G.appendChild(F);
            A.appendChild(G);
            H.appendChild(Q);
            H.appendChild(A);
            H.appendChild(B);
            P.appendChild(H);
            if(DD==0){
                rh_insAfter(P,M[0].childNodes[1+D]);
                var K1=M[0].parentNode.nextSibling.nextSibling.childNodes[1].textContent;
                var L1=M[0].parentNode.nextSibling.nextSibling.nextSibling.nextSibling.childNodes[1].textContent;
            }
            if(DD==1){
                rh_insAfter(P,M[0]);
                var K1=M[2].textContent;
                var L1=M[4].textContent;
            }
            K=K1.substring(0,K1.length-3);
            L=L1.substring(0,L1.length-3);
            cur = L1.substring(L.length+1,L.length+3);
            K=K.replace(/[.]/g,"");
            L=L.replace(/[.]/g,"");
            K=K.replace(",",".");
            L=L.replace(",",".");
            var O=K*1+L*1;
            O=Math.round(O*100)/100;
            O=Math.setSectionPoints(O);
            if(O.length<L1.length-3||O.length<K1.length-3){O=O+"0"}
            if(rh_prefManager.getBoolPref("extensions.rh.geldsumme")){
                if(DD==0){
                    H=rh_new_elm(J,"tr","");
                    A=rh_new_elm(J,"TD","","width","30%","valign","top","align","left","class","white");
                    B=rh_new_elm(J,"TD","","width","70%","valign","top","align","right","class","white");
                    A.appendChild(J.createTextNode("Gesamt: "));
                    B.appendChild(J.createTextNode(O+" "+cur));
                    H.appendChild(A);
                    H.appendChild(B);
                    rh_insAfter(H,M[0].parentNode.nextSibling.nextSibling.nextSibling.nextSibling);
                }
                if(DD==1){
                    A=rh_new_elm(J,"div","","style","width: 30%; float: left;");
                    B=rh_new_elm(J,"div","","style","width: 70%; float: left; text-align: right;");
                    A.appendChild(J.createTextNode("Gesamt: "));
                    B.appendChild(J.createTextNode(O+" "+cur));
                    rh_insAfter(B,M[4]);
                    rh_insAfter(A,M[4]);
                }
            }
            if(rh_prefManager.getBoolPref("extensions.rh.wbwlink")){
                var H=rh_new_elm(J,"tr",""),
                Q=J.createElement("TD"),
                D=J.createTextNode(" Link:"),
                A=rh_new_elm(J,"TD","","colspan","2"),
                K = rh_new_elm(J,"A","Status Wettbewerb","style","cursor: pointer;");
                K.addEventListener("click",rh_wbwlink,true);
                A.appendChild(K);
                Q.appendChild(D);
                H.appendChild(Q);
                H.appendChild(A);
                P.appendChild(H);
                //auf wbw seite: //text()[contains(.," bis zum ")]
            }
            if(rh_prefManager.getBoolPref("extensions.rh.taschenrechner")){
                var H=rh_new_elm(J,"tr",""),
                Q=J.createElement("TD"),
                D=J.createTextNode(" Link:"),
                A=rh_new_elm(J,"TD","","colspan","2"),
                K = rh_new_elm(J,"A","Taschenrechner","style","cursor: pointer;");
                K.addEventListener("click",rh_calc,true);
                A.appendChild(K);
                Q.appendChild(D);
                H.appendChild(Q);
                H.appendChild(A);
                P.appendChild(H);
            }
            if(rh_prefManager.getBoolPref("extensions.rh.firmensuche")){
                var E,
                A=rh_new_elm(J,"tr",""),
                B=J.createElement("TD"),
                C=rh_new_elm(J,"TD","","colspan","2"),
                D=J.createTextNode(" Suche:"),
                F=rh_new_elm(J,"FORM","","method","post","action",J.location.pathname+"?page=suche&UIN="+J.location.href.match(/UIN=(.[0-9a-f]*)/i)[1],"style","margin-bottom: 3px;","id","rhs"),
                G=rh_new_elm(J,"INPUT","","type","text","size","20","maxlength","100","name","suche","value","Firmensuche");
                G.addEventListener("focus",rh_empty,true);
                F.appendChild(G);
                B.appendChild(D);
                C.appendChild(F);
                A.appendChild(B);
                A.appendChild(C);
                E=J.getElementById('rhtable1').appendChild(A);
            }
        }
        //�bersicht: //A[contains(@href,"page=nachricht&") and contains(@href,"ename=")]
        if(J.location.href.search(/page=lager&/)>-1){
            var L=rh_eval(J,"//input[@name='p_anz[]']");
            if(rh_prefManager.getBoolPref("extensions.rh.allewaren")){
                for(var r=0;r<L.length;r++){
                    L[r].parentNode.appendChild(J.createElement("BR"));
                    var AY=new Array();
                    AY[r]=rh_new_elm(J,"A","Alles","style","cursor: pointer;");
                    AY[r].addEventListener("click",rh_alleWaren,true);
                    L[r].parentNode.appendChild(AY[r])
                }
            }
        }
        if(J.location.href.search(/page=guild_member&/)>-1){
            if(rh_prefManager.getBoolPref("extensions.rh.guildpage")){
                if(DD==0){
                    var O=rh_eval(J,"//div[@style='width: 100%; margin-bottom: 2px;']"),
                    schaulink = "schaufenster_public.php4?user=";
                }
                if(DD==1){
                    var O=rh_eval(J,"//div[@id='inhalt']/div/div/div"),
                    schaulink = "schaufenster_public.php?user=";
                }
                var P, PL, Q, QL, R, RL, S, SL, T,Qtemp,
                igmlink = J.location.pathname + "?page=nachricht&UIN=" + uin + "&ename=",
                marktlink = J.location.pathname + "?page=markt4&UIN=" + uin + "&usernummer=";
                if(DD==0){
                    gm_cnt = O.childNodes.length-1;
                }
                if(DD==1){
                    gm_cnt = O.length;
                }
                tr_max = 1;
                tr_ind = 1;
                for(var i=1;i<gm_cnt;i++){
                    if(gm_stat[i]){
                        if(gm_stat[i]=="Normal"){
                            Qtemp = "done12.gif";
                        }else if(gm_stat[i]=="VIP"){
                            Qtemp = "premicon.gif";
                        }else if(gm_stat[i]=="Unknown"){
                            Qtemp = "unknown.gif";
                        }
                    }else{
                        Qtemp = "unknown.gif";
                    }
                    Q=rh_new_elm(J,"img","","id","pr" + i,"src","chrome://regnumhelper/skin/"+Qtemp,"title","Status: unknown","style","vertical-align: top;","width","12","height","12","border","0");
                    if(DD==0){
                        gm_name[i]=O.childNodes[i].childNodes[1].firstChild.textContent;
                        gm_uid[i]=O.childNodes[i].childNodes[1].firstChild.href.match(/suchenr=(.[0-9]*)/i)[1];
                    }
                    if(DD==1){
                        gm_name[i]=O[i].childNodes[3].firstChild.textContent;
                        gm_uid[i]=O[i].childNodes[3].firstChild.href.match(/suchenr=(.[0-9]*)/i)[1];
                    }
                    P=rh_new_elm(J,"img","","src","chrome://regnumhelper/skin/igm.png","title","send IGM","style","vertical-align: top;","width","12","height","12","border","0");
                    P.addEventListener("click",rh_igmPopup,true);
                    //~ PL=rh_new_elm(J,"A","","href",igmlink + escape(gm_name[i]) + "&sort=2");
                    //~ PL.appendChild(P);
                    R=rh_new_elm(J,"img","","src","chrome://regnumhelper/skin/zummarkt.gif","title","Marktangebote","style","vertical-align: top;","width","12","height","12","border","0");
                    RL=rh_new_elm(J,"A","","href",marktlink + gm_uid[i] + "&sort=2");
                    RL.appendChild(R);
                    S=rh_new_elm(J,"img","","src","chrome://regnumhelper/skin/lagerschau.gif","title","Schaufenster","width","16","height","9","border","0");
                    SL=rh_new_elm(J,"A","","href",schaulink + gm_uid[i],"onclick","window.open('','fenster','scrollbars=yes,resizable=yes,height=620,width=920')","target","fenster");
                    tr_arr[tr_max]="http://" + J.location.host + "/"+ schaulink + gm_uid[i];
                    tr_max++;
                    SL.appendChild(S);
                    if(DD==0){
                        T=O.childNodes[i].firstChild.firstChild.textContent;
                        O.childNodes[i].firstChild.firstChild.textContent=(T<10)?'0' + T:T;
                        rh_insAfter(P,O.childNodes[i].firstChild.firstChild);
                        rh_insBefore(Q,O.childNodes[i].childNodes[1].lastChild);
                        rh_insAfter(RL,O.childNodes[i].childNodes[2].lastChild);
                        rh_insAfter(SL,O.childNodes[i].childNodes[6].lastChild);
                    }
                    if(DD==1){
                        T=O[i].childNodes[1].textContent;
                        O[i].childNodes[1].textContent=(T<10)?'0' + T:T;
                        rh_insAfter(Q,O[i].childNodes[1].firstChild);
                        rh_insBefore(P,O[i].childNodes[3].firstChild);
                        rh_insBefore(SL,O[i].childNodes[3].firstChild);
                        O[i].childNodes[5].firstChild.nodeName=="IMG"?rh_insAfter(RL,O[i].childNodes[11].firstChild):rh_insAfter(RL,O[i].childNodes[9].firstChild);
                    }
                }
                tid = window.setTimeout(function(){rh_wait_schau()}, 100);
                //prepare igm-popup
                J.childNodes[1].lastChild.lastChild.addEventListener("click",function(l){if(l.button==0){rh_clr()}},true);
                J.childNodes[1].firstChild.appendChild(rh_new_elm(J,"SCRIPT","function rh_noteln(F){var nt=document.notiz.text.value;var ist=nt.length;var rest=F-ist;if(rest<0){document.notiz.text.value=nt.substr(0,F);rest=0;}document.notiz.counter.value=rest;}","language","JavaScript"));
                J.childNodes[1].lastChild.appendChild(rh_new_elm(J,"div","","id","rhDiv","style","visibility:hidden; Z-INDEX: 5; LEFT: -1px; POSITION: absolute; top: 9px; border:outset; border-width:2px; border-color:#fAffe0;"));
                over=J.getElementById("rhDiv");
            }
        }
        if(J.location.href.search(/page=forschen&/)>-1){
            if(rh_prefManager.getBoolPref("extensions.rh.forschend")){
                var AL=rh_eval(J,"//a[contains(@href,'page=forschen2')]");
                J.addEventListener("mousemove",rh_mouseMove,true);
                J.childNodes[1].lastChild.appendChild(rh_new_elm(J,"div","","id","rhDiv","style","visibility:hidden; Z-INDEX: 5; LEFT: -1px; POSITION: absolute; top: 9px; border:outset; border-width:2px; border-color:#fAffe0;"));
                for(var r=0;r<AL.length;r++){
                    AL[r].addEventListener("mouseover",rh_forschZeit,true);
                    AL[r].addEventListener("mouseout",rh_clr,true)
                }
            }
        }
        if(rh_prefManager.getIntPref("extensions.rh.sortierung")!=0){
            var I=rh_eval(J,"//a[contains(@href, 'page=markt2') and not(contains(@href, 'sort=')) and not(contains(@href, 'welche='))]"),
            sortString="";
            for(i=0;i<I.length;i++){
                if(rh_prefManager.getIntPref("extensions.rh.sortierung")==1){
                    sortString="&welche=2&sort="
                }else{
                    sortString="&welche=3&sort="
                }
                I[i].setAttribute("href",I[i].getAttribute("href")+sortString)
            }
        }
        if(J.location.href.search(/page=(roh|forschen|kauf|oeffent|spez)7&/)>-1&&J.childNodes[1].textContent.search("Ihr verfügt nicht über gen")==-1&&J.childNodes[1].textContent.search("Bitte wählt einen Rohstoff")==-1&&J.childNodes[1].textContent.search("Bitte wählt aus,")==-1){
            if(rh_prefManager.getBoolPref("extensions.rh.ausbau")){
                var A=rh_eval(J,"//input[@name='ausbau']");
                A[0].addEventListener("keyup",rh_ausbau,true);
                if(DD==0){
                    var AD=A[0].parentNode.parentNode.parentNode.parentNode.parentNode;
                }
                if(DD==1){
                    var AD=A[0].parentNode;
                }
                var U=rh_new_elm(J,"font","Kosten:"+unescape("%A0%A0")+"Dauer:","id","kosten");
                var Y=rh_new_elm(J,"font","Holz:"+unescape("%A0%A0")+"Steine:"+unescape("%A0%A0")+"Werkzeuge:","id","kosten2");
                rh_insAfter(Y,AD);
                rh_insAfter(J.createElement("BR"),AD);
                rh_insAfter(U,AD)
                rh_insAfter(J.createElement("BR"),AD);
            }
        }
        if(J.location.href.search(/page=(kaufs|gebs|forschs|sonst)&/)>-1){
            if(J.location.href.search(/page=kaufs&/)>-1){
                cn1=1, pos1=2, cn2=6;
                if(rh_prefManager.getBoolPref("extensions.rh.geldverkauf")){
                    var E,
                    A=rh_new_elm(J,"tr",""),
                    B=J.createElement("TD"),
                    C=rh_new_elm(J,"TD","","colspan","2"),
                    D=J.createTextNode(" Link:"),
                    rh_row1 = rh_new_elm(J,"A","Geld einsammeln","style","cursor: pointer;");
                    rh_row1.addEventListener("click",function(){rh_show_kauf(Aa)},true);
                    C.appendChild(rh_row1);
                    B.appendChild(D);
                    A.appendChild(B);
                    A.appendChild(C);
                    E=J.getElementById('rhtable1').appendChild(A);
                }
            }else{
                cn1=1, pos1=1, cn2=7;
                if(J.location.href.search(/page=gebs&/)>-1){
                    if(rh_prefManager.getBoolPref("extensions.rh.autoquell")&&(rh_devel==true)){
                        var E,
                        aqv=rh_prefManager.getCharPref("extensions.rh.aqv"),
                        A=rh_new_elm(J,"tr",""),
                        B=J.createElement("TD"),
                        C=J.createElement("TD"),
                        D=J.createElement("TD"),
                        E=J.createTextNode(" Quelle"),
                        F=rh_new_elm(J,"INPUT","","type","text","size","9","value",aqv),
                        G=rh_new_elm(J,"INPUT","","type","button","value","AutoProd");
                        G.addEventListener("click",function(){rh_autoqell(Aa)},true);
                        B.appendChild(E);
                        C.appendChild(F);
                        D.appendChild(G);
                        A.appendChild(B);
                        A.appendChild(C);
                        A.appendChild(D);
                        E=J.getElementById('rhtable1').appendChild(A);
                    }
                }
            }
            if(DD==0){
                var AV=rh_eval(J,"//td[@class='white2']/*[position()=" + pos1 + " and (name()='TABLE' or name()='table')]//text()[contains(.,':')]/.."),
            q=0;
            }
            if(DD==1){
                var AV=rh_eval(J,"//div//text()[contains(.,':')]/.."),
                q=0;
            }
            if(rh_prefManager.getBoolPref("extensions.rh.countdown")){
                for(var AH=0;AH<AV.length;AH++){
                    if(AV[AH].textContent.match(/([0-9][:][0-9]+[:][0-9]+)/)){
                        AV[AH].setAttribute("id","cd"+q);
                        q++;
                    }
                }
                var zeiten=rh_prefManager.getCharPref("extensions.rh.zeiten");
                zeiten=zeiten.split(":");
                var farben=rh_prefManager.getCharPref("extensions.rh.farben");
                farben=farben.split(":");
                //new J.childNodes[1].firstChild.appendChild(rh_new_elm(J,"SCRIPT","var el;var sekunden = new Array();function rh_evalNode(doc,aNode,aExpr){var result = doc.evaluate(aExpr,aNode,null,0, null);var found = [];var res;while (res = result.iterateNext()){found.push(res)}return found;}function countdown(){for(var i=0; i<el.length; i++){if( sekunden[i] < 0 ){el[i].textContent= '--:--:--';}else{var sek = sekunden[i];var stunden = Math.floor(sek/3600);sek = sek - stunden*3600;var minuten = Math.floor(sek/60);sek = sek - minuten*60;el[i].textContent = stunden+':'+((minuten < 10) ? '0' + minuten : minuten)+':'+((sek < 10) ? '0' + sek : sek);if(stunden == 0 && minuten < "+zeiten[0]+"){el[i].setAttribute('style','color: #"+farben[0]+";font-weight: bold;');}else if(stunden < "+zeiten[1]+"){el[i].setAttribute('style','color: #"+farben[1]+";font-weight: bold;');}else if(stunden < "+zeiten[2]+"){el[i].setAttribute('style','color: #"+farben[2]+";font-weight: bold;');}else if(stunden < "+zeiten[3]+"){el[i].setAttribute('style','color: #"+farben[3]+";font-weight:bold;');}}sekunden[i] = sekunden[i]-1;}window.setTimeout(countdown, 1000);}function init(){el = rh_evalNode(document,document,\"//a[contains(@id,'cd')]\");var wert = '';for (var i=0; i < el.length; ++i){wert = el[i].textContent;var splitted = new Array();splitted = wert.split(':');sekunden.push(splitted[0]*3600+splitted[1]*60+splitted[2]*1);}countdown();}","language","JavaScript"));
                J.childNodes[1].firstChild.appendChild(rh_new_elm(J,"SCRIPT","function countdown(){var cd="+q+";for(var i=0;i<cd;i++){var ende=0;var el=document.getElementById('cd'+i);var zeit=el.textContent;var st;(el.nodeName=='DIV')?st='width: 11%; text-align: right;':st='';if(!(zeit=='--:--:--')){var zeit=zeit.split(':');var stunden=parseFloat(zeit[0]);var minuten=parseFloat(zeit[1]);var sekunden=parseFloat(zeit[2]);if(sekunden==0){if(minuten==0){if(stunden==0){ende=1;}else{stunden--;minuten=59;sekunden=59;}}else{minuten--;sekunden=59;}}else{sekunden--;}if(ende==1){zeit='--:--:--';}else{zeit=stunden+':'+((minuten<10)?'0'+minuten:minuten)+':'+((sekunden<10)?'0'+sekunden:sekunden);}el.textContent=zeit;if(stunden==0&&minuten<"+zeiten[0]+"){el.setAttribute('style','color: #"+farben[0]+";font-weight: bold;'+st);}else{if(stunden<"+zeiten[1]+"){el.setAttribute('style','color: #"+farben[1]+";font-weight: bold;'+st);}else{if(stunden<"+zeiten[2]+"){el.setAttribute('style','color: #"+farben[2]+";font-weight: bold;'+st);}else{if(stunden<"+zeiten[3]+"){el.setAttribute('style','color: #"+farben[3]+";font-weight:bold;'+st);}}}}}}window.setTimeout(countdown,1000);}","language","JavaScript"));
                var old_onload= J.childNodes[1].lastChild.getAttribute("onload");
                J.childNodes[1].lastChild.setAttribute("onload","countdown();"+old_onload);
                //new J.childNodes[1].lastChild.setAttribute("onload","init();");
            }
            if(rh_prefManager.getBoolPref("extensions.rh.endzeit")){
                J.addEventListener("mousemove",rh_mouseMove,true);
                J.childNodes[1].lastChild.appendChild(rh_new_elm(J,"div","","id","rhDiv","style","visibility:hidden; Z-INDEX: 5; LEFT: -1px; POSITION: absolute; top: 9px; border:outset; border-width:2px; border-color:#fAffe0;"));
                for(var r=0;r<AV.length;r++){
                    if(AV[r].textContent.match(/([0-9][:][0-9]+[:][0-9]+)/)){
                        AV[r].addEventListener("mouseover",rh_endZeit,true);
                        AV[r].addEventListener("mouseout",rh_clr,true)
                    }
                }
            }
        }
        if(J.location.href.search(/page=roh&/)>-1){
            if(rh_prefManager.getBoolPref("extensions.rh.produktion")){
                //~ J.childNodes[1].lastChild.lastChild.addEventListener("click",function(l){if(l.button==0){rh_clr()}},true);
                over=rh_new_elm(J,"div","","id","rhDiv","style","visibility:hidden; Z-INDEX: 5; LEFT: -1px; POSITION: absolute; top: 9px; border:outset; border-width:2px; border-color:#fAffe0;");
                rh_showit=0;
                J.childNodes[1].lastChild.appendChild(over);
                J.addEventListener("mousemove",rh_mouseMove,true);
                if(DD==0){
                    var A=rh_eval(J,"//form[contains(@action,'page=roh2&art=')]/table/tbody/tr");
                    for(var B=1;B<A.length;B++){
                        if(A[B].childNodes[1].firstChild.nodeName=="INPUT"){
                            A[B].childNodes[1].appendChild(J.createTextNode("Endzeit:"));
                            A[B].childNodes[1].addEventListener("keyup",rh_BerechneProdZeit,true);
                            A[B].childNodes[1].addEventListener("keyup",rh_ProdKosten,true);
                            A[B].childNodes[1].addEventListener("change",rh_clr,true);
                            var C = A[B].firstChild.childNodes[1].firstChild.firstChild.firstChild.firstChild;
                            var D = J.createTextNode("Prod.Zeit:");
                            var E = rh_new_elm(J,"INPUT","","maxlength","8","value","DD:HH:MM","size","8");
                            rh_insAfter(D,C.nextSibling);
                            rh_insAfter(E,D);
                            E.addEventListener("focus",rh_empty,true);
                            E.addEventListener("keyup",rh_BerechneProduktion,true);
                            E.addEventListener("keyup",rh_BerechneProdZeit,true);
                            E.addEventListener("keyup",rh_ProdKosten,true);
                            E.addEventListener("change",rh_clr,true);
                            E.addEventListener("change",rh_BerechneProduktion,true)
                        }
                    }
                }
                if(DD==1){
                    var A=rh_eval(J,"//form[contains(@action,'page=roh2&art=')]/div/div/div");
                    for(var B=0;B<(A.length);B++){
                        if(A[B].childNodes[3].firstChild.nodeName=="INPUT"){
                            A[B].childNodes[3].appendChild(J.createTextNode("Endzeit:"));
                            A[B].childNodes[3].addEventListener("keyup",rh_BerechneProdZeit,true);
                            A[B].childNodes[3].addEventListener("keyup",rh_ProdKosten,true);
                            A[B].childNodes[3].addEventListener("change",rh_clr,true);
                            var C = A[B].childNodes[1].childNodes[3].childNodes[3];
                            var D = J.createTextNode("Prod.Zeit:");
                            var E = rh_new_elm(J,"INPUT","","maxlength","8","value","DD:HH:MM","size","8");
                            rh_insAfter(D,C.nextSibling);
                            rh_insAfter(E,D);
                            E.addEventListener("focus",rh_empty,true);
                            E.addEventListener("keyup",rh_BerechneProduktion,true);
                            E.addEventListener("keyup",rh_BerechneProdZeit,true);
                            E.addEventListener("keyup",rh_ProdKosten,true);
                            E.addEventListener("change",rh_clr,true);
                            E.addEventListener("change",rh_BerechneProduktion,true)
                        }
                    }
                }
            }
        }
        if(J.location.href.search("page=markt3")>-1&&J.location.href.search("filled=1")==-1){
            if(rh_prefManager.getBoolPref("extensions.rh.ausgabenmarkt")){
                var A=rh_eval(J,"//input[@name='teilkauf']");
                if(DD==0){
                    rh_insAfter(rh_new_elm(J,"font","","id","gesamtkosten"),A[0].parentNode.nextSibling.nextSibling);
                }
                if(DD==1){
                    rh_insAfter(rh_new_elm(J,"font","","id","gesamtkosten"),A[0].parentNode.parentNode.lastChild);
                }
                anzahl=A[0].value;
                var AO=A[0].parentNode.parentNode;
                var I=AO.textContent.match(/zum Preis von ([.,0-9]+)/)[1];
                I=I.replace(".","");
                I=I.replace(",",".");
                var U=I*anzahl;
                U=Math.round(U*100)/100;
                U=Math.setSectionPoints(U);
                J.getElementById("gesamtkosten").textContent="Gesamtkosten: "+U+" "+cur;
                A[0].addEventListener("keyup",rh_BerechneKosten,true)
            }
        }
        if(J.location.href.search(/page=kauf&/)>-1){
            if(rh_prefManager.getBoolPref("extensions.rh.menupreis")){
                if(DD==0){
                    var AJ=rh_eval(J,"//td/a[position()=last() and contains(@href,'kauf10')]/..")[0];
                }
                if(DD==1){
                    var AJ=rh_eval(J,"//div/a[position()=last() and contains(@href,'kauf10')]/..")[0];
                }
                var AC=AJ.innerHTML.substring(AJ.innerHTML.search("<a"),AJ.innerHTML.length);
                var pr=AJ.innerHTML.match(/(^[\.0-9,]+) /)[1];
                pr=pr.replace(".","");
                var par1=AJ.innerHTML.match(/art=(.[0-9]*)/i)[1];
                var par2=AJ.innerHTML.match(/UIN=(.[0-9a-f]*)/i)[1];
                var par3=AJ.innerHTML.match(/y=(.[0-9]*)/i)[1];
                AJ.innerHTML='<FORM action="'+J.location.pathname.substring(1,J.location.pathname.length)+'?page=kauf&art='+par1+'&UIN='+par2+'&y='+par3+'" method="post"><INPUT type="hidden" value="2" name="neu"/><INPUT type="text" value="'+pr+'" size="10" maxlength="30" name="neu_preis"/> '+cur+'<BR/></FORM>'+AC;
            }
        }
        if((J.location.href.search("page=roh4&")>-1)){
            if(rh_prefManager.getBoolPref("extensions.rh.cancelskip")&&J.childNodes[1].textContent.search("Die Produktion wurde abgebrochen.")>-1){
                gBrowser.selectedBrowser.contentDocument.location.replace(window.content.history[window.content.history.length-2])
            }
        }
        if((J.location.href.search("page=roh2&")>-1)){
            if(rh_prefManager.getBoolPref("extensions.rh.prodskip")&&J.childNodes[1].textContent.search("Ihr verfügt nicht über gen")==-1&&J.childNodes[1].textContent.search("Bitte wählt einen Rohstoff")==-1){
                var loc="http://"+J.location.host+J.location.pathname+"?page=gebs&UIN="+uin+"&show=all";
                gBrowser.selectedBrowser.contentDocument.location.replace(loc)
            }
        }
        if(J.location.href.search("page=nachricht2&")>-1){
            if(rh_igmforw&&J.childNodes[1].textContent.search("Fehler")==-1){
                rh_igmforw=false;
                gBrowser.selectedBrowser.contentDocument.location.replace(window.content.history[window.content.history.length-2])
            }
        }
        if(J.location.pathname=="/"||J.location.pathname=="/index.php"){
            try{
                var t=rh_eval(J,"//select[@name='server']");
                t[0].options.selectedIndex=rh_prefManager.getIntPref("extensions.rh.welt");
                //~ var u=rh_eval(J,"//body");
                //~ u[0].setAttribute("onload","return false;");
            }
            catch(AS){
            }
        }
    }
function rh_init(){
        window.addEventListener("DOMContentLoaded",rh_init_main,true)
    }

rh_init();
