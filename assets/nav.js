/* Sayvoi shared navigation (menus). One definition for every page. */
(function(){
var D={
 groups:[
  {id:"audio",ic:"🎧",en:"Audio",ar:"الصوت",items:[
   ["/","🔄","Converter","المحوّل","Convert between MP3, WAV, OGG, FLAC and M4A","حوّل بين MP3 وWAV وOGG وFLAC وM4A"],
   ["/audio-cutter/","✂️","Audio cutter","قص الصوت","Trim and cut recordings","قصّ التسجيلات واقتطع أجزاء منها"],
   ["/audio-cleaner/","✨","Audio cleaner","منظّف الصوت","Reduce noise, trim silence, set volume","خفّف الضوضاء وأزل الصمت واضبط الصوت"],
   ["/audio-speed/","⏩","Speed changer","تغيير السرعة","Slow down or speed up audio","أبطئ الصوت أو سرّعه"],
   ["/voice-recorder/","🎙️","Voice recorder","مسجّل الصوت","Record WAV or MP3 in your browser","سجّل صوتك بصيغة WAV أو MP3"]]},
  {id:"video",ic:"🎬",en:"Video",ar:"الفيديو",items:[
   ["/video-to-audio/","🎞️","Video to audio","فيديو إلى صوت","Extract the audio from video files","استخرج الصوت من ملفات الفيديو"],
   ["/script-video/","📽️","Script to video","من السكربت إلى فيديو","Turn a script into a slide video","حوّل السكربت إلى فيديو شرائح"]]},
  {id:"qc",ic:"✅",en:"Check & organize",ar:"الفحص والتنظيم",items:[
   ["/check/","✅","Quality checker","فاحص الجودة","Find clipping, noise and silence","اكتشف القصّ والضوضاء والصمت"],
   ["/audio-duration/","⏱️","Audio duration","مدة الملفات","Total length of many files","مجموع مدة ملفات كثيرة"],
   ["/audio-renamer/","🏷️","Batch renamer","إعادة التسمية","Rename recordings from a ZIP","أعد تسمية تسجيلات كثيرة من ZIP"]]},
  {id:"text",ic:"📝",en:"Text & Data",ar:"النصوص والبيانات",items:[
   ["/speech-to-text/","🗣️","Speech to text","الصوت إلى نص","Transcribe audio in your browser","حوّل الصوت إلى نص داخل متصفحك"],
   ["/sentence-splitter/","🧩","Sentence splitter","مقسّم الجمل","Split text into recording sentences","قسّم النص إلى جمل للتسجيل"],
   ["/numbers-to-words/","🔢","Numbers to words","الأرقام بالحروف","Digits to spoken Arabic words","حوّل الأرقام إلى كلمات عربية منطوقة"],
   ["/text-diff/","🔍","Text diff","مقارنة النصوص","Compare two texts and see the changes","قارن نصّين وشاهد التغييرات"],
   ["/csv-to-json/","🧾","CSV to JSON","CSV إلى JSON","Turn a CSV table into JSON","حوّل جدول CSV إلى JSON"],
   ["/colloquial-to-fusha/","📖","Colloquial to Fusha","العامية إلى الفصحى","Convert Egyptian Arabic to Standard Arabic","حوّل العامية المصرية إلى الفصحى"]]},
  {id:"docs",ic:"📄",en:"Documents",ar:"المستندات",items:[
   ["/sign-pdf/","✍️","Sign PDF","توقيع PDF","Sign a PDF with your own signature","وقّع ملف PDF بتوقيعك"],
  ["/word-to-pdf/","🔄","Word ⇄ PDF","Word ⇄ PDF","Convert Word to PDF and PDF to Word","حوّل Word إلى PDF وPDF إلى Word"]]}
 ],
 links:[["/articles/","Articles","المقالات"],["https://sayvoi.com/services/","Services","الخدمات"],["/about.html","About","عن الموقع"]]
};
function lang(){return (document.documentElement.getAttribute("lang")||"ar").slice(0,2)==="en"?"en":"ar";}
var CONV="https://convert.sayvoi.com",MAIN=location.hostname.replace(/^www\./,"")==="sayvoi.com";
function href(h){if(!MAIN)return h;if(h==="https://sayvoi.com/services/")return "/services/";return h.charAt(0)==="/"&&h!=="/"?CONV+h:(h==="/"?CONV+"/":h);}
function abs(h){try{var u=new URL(h,location.href);return u.origin+norm(u.pathname);}catch(e){return h;}}
function norm(p){p=p.replace(/index\.html$/,"");if(p.length>1&&p.slice(-1)!=="/")p=p.replace(/\/$/,"");return p;}
function here(){return norm(location.pathname);}
function same(h){return abs(href(h))===location.origin+here();}
function inArticles(){return !MAIN&&/^\/articles\//.test(location.pathname);}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");}
function build(L){
 var o='<a class="brand" href="/">Sayvoi</a><div class="sv-row">';
 D.groups.forEach(function(g){
  var on=g.items.some(function(i){return same(i[0]);});
  o+='<div class="sv-dd"><button type="button" class="sv-btn'+(on?' on':'')+'" aria-haspopup="true" aria-expanded="false" data-g="'+g.id+'"><span class="sv-gi" aria-hidden="true">'+g.ic+'</span>'+esc(g[L])+'<svg class="sv-car" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
  o+='<div class="sv-pn" role="menu" hidden>';
  g.items.forEach(function(i){
   var cur=same(i[0]);
   o+='<a role="menuitem" class="sv-it'+(cur?' cur':'')+'" href="'+href(i[0])+'"'+(cur?' aria-current="page"':'')+'><span class="sv-ic" aria-hidden="true">'+i[1]+'</span><span class="sv-tx"><b>'+esc(L==="en"?i[2]:i[3])+'</b><small>'+esc(L==="en"?i[4]:i[5])+'</small></span></a>';
  });
  o+='</div></div>';
 });
 D.links.forEach(function(k){
  var cur=(k[0]==="/articles/"&&inArticles())||same(k[0]);
  o+='<a class="sv-ln'+(cur?' on':'')+'" href="'+href(k[0])+'">'+esc(L==="en"?k[1]:k[2])+'</a>';
 });
 return o+'</div>';
}
var nav=null,keep=[],busy=false,openBtn=null,timer=null;
function closeAll(){
 var b=nav&&nav.querySelectorAll(".sv-btn");if(!b)return;
 for(var i=0;i<b.length;i++){b[i].setAttribute("aria-expanded","false");var p=b[i].nextElementSibling;if(p)p.hidden=true;}
 openBtn=null;
}
function place(btn){
 var p=btn.nextElementSibling,r=btn.getBoundingClientRect(),vw=document.documentElement.clientWidth;
 var w=Math.min(380,vw-16);p.style.width=w+"px";
 var left=document.documentElement.dir==="rtl"?r.right-w:r.left;
 left=Math.max(8,Math.min(left,vw-w-8));
 p.style.left=left+"px";p.style.top=(r.bottom+8)+"px";
}
function open(btn){
 closeAll();btn.setAttribute("aria-expanded","true");var p=btn.nextElementSibling;p.hidden=false;place(btn);openBtn=btn;
}
function wire(){
 var btns=nav.querySelectorAll(".sv-btn");
 Array.prototype.forEach.call(btns,function(b){
  b.addEventListener("click",function(e){e.stopPropagation();if(openBtn===b&&!b._h)closeAll();else{open(b);b._h=false;}});
  var dd=b.parentNode;
  dd.addEventListener("mouseenter",function(){if(!window.matchMedia("(hover:hover)").matches)return;clearTimeout(timer);if(openBtn!==b){open(b);b._h=true;}});
  dd.addEventListener("mouseleave",function(){if(!window.matchMedia("(hover:hover)").matches)return;timer=setTimeout(closeAll,180);});
  b.addEventListener("keydown",function(e){if(e.key==="ArrowDown"){e.preventDefault();open(b);var a=b.nextElementSibling.querySelector("a");if(a)a.focus();}});
  b.nextElementSibling.addEventListener("keydown",function(e){
   var as=Array.prototype.slice.call(this.querySelectorAll("a")),i=as.indexOf(document.activeElement);
   if(e.key==="ArrowDown"){e.preventDefault();as[(i+1)%as.length].focus();}
   else if(e.key==="ArrowUp"){e.preventDefault();as[(i-1+as.length)%as.length].focus();}
   else if(e.key==="Escape"){closeAll();b.focus();}
  });
 });
}
function render(){
 if(!nav||busy)return;
 busy=true;
 try{
  keep=[];
  Array.prototype.forEach.call(nav.querySelectorAll("button,[data-sv-keep]"),function(x){if(!x.closest(".sv-row"))keep.push(x);});
  var L=lang();
  nav.innerHTML=build(L);
  keep.forEach(function(x){nav.appendChild(x);});
  nav.setAttribute("data-sv",L+"|"+here());
  wire();
 }finally{setTimeout(function(){busy=false;},0);}
}
function ensure(){
 if(!nav)return;
 if(nav.getAttribute("data-sv")!==lang()+"|"+here()||!nav.querySelector(".sv-row"))render();
}
function init(){
 nav=document.querySelector("nav.top");if(!nav)return;
 nav.classList.add("sv");
 render();
 new MutationObserver(function(){if(!busy)ensure();}).observe(document.documentElement,{attributes:true,attributeFilter:["lang","dir"]});
 new MutationObserver(function(){if(!busy)ensure();}).observe(nav,{childList:true});
 document.addEventListener("click",function(e){if(openBtn&&!e.target.closest(".sv-dd"))closeAll();});
 document.addEventListener("keydown",function(e){if(e.key==="Escape")closeAll();});
 window.addEventListener("resize",closeAll);
 window.addEventListener("scroll",function(){if(openBtn)closeAll();},{passive:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
