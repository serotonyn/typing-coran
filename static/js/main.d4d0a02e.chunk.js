(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(30)},18:function(e,t,n){},21:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(10),u=n.n(c),s=(n(18),n(7)),i=n.n(s),o=n(11),l=n(1),h=n(2),m=n(4),f=n(3),d=n(5),p=function(e,t,n){return r.a.createElement("div",null,e,r.a.createElement("span",{className:"highlight"},"".concat(t,"\u200d")),"\u200d"+n)},v=function(e,t,n){return r.a.createElement("div",null,e,r.a.createElement("span",{className:"highlight"},t),n)},b=function(e,t,n,a,c,u){if(u>-1){if(a===u)return function(e,t,n){return r.a.createElement("div",null,e,r.a.createElement("span",{className:"highlight"},"".concat(t).concat(n[0])),n.slice(1))}(e,t,n);if(a===u+1)return function(e,t,n){return r.a.createElement("div",null,e.slice(0,-1),r.a.createElement("span",{className:"highlight"},"".concat(e.slice(-1)).concat(t)),n)}(e,t,n)}var s=" "===c[a+1],i=" "===c[a-1],o=" "===c[a],l=0===a,h=a===c.length-1,m="\u0671"===t&&"\u0647"===c[a+1],f="\u0647"===t&&"\u0671"===c[a-1],d="\u0648"===t&&"\u0644"===c[a+1],b="\u0644"===t&&"\u0648"===c[a-1];return s||h?function(e,t,n){return r.a.createElement("div",null,e+"\u200d",r.a.createElement("span",{className:"highlight"},"\u200d".concat(t)),n)}(e,t,n):i||l?m||d?v(e,t,n):p(e,t,n):o?v(e,t,n):f||b?p(e,t,n):function(e,t,n){return r.a.createElement("div",null,e+"\u200d",r.a.createElement("span",{className:"highlight"},"\u200d".concat(t,"\u200d")),"\u200d"+n)}(e,t,n)},g=(n(21),n(8)),N=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,c=new Array(a),u=0;u<a;u++)c[u]=arguments[u];return(n=Object(m.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(c)))).renderSpecialButton=function(e){switch(e){case"tab":return r.a.createElement("div",{className:"button special_button tab"},"Tab");case"delete":return r.a.createElement("div",{className:"button special_button tab"},"delete");case"caplock":return r.a.createElement("div",{className:"button special_button caplock"},"caplock");case"restart":return r.a.createElement("div",{className:"button special_button restart"},"restart");case"shift":return r.a.createElement("div",{className:"button special_button shift"},"shift");case"space":return r.a.createElement("div",{className:"button special_button space"},"space");case"alt":return r.a.createElement("div",{className:"button special_button alt"},"alt")}return"s"},n}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props,t=e.char,n=e.isToPress?"button pressed":"button";if(t.match(/{.+}/g)){var a=t.slice(1,-1);return this.renderSpecialButton(a)}return r.a.createElement("div",{className:n},t)}}]),t}(a.Component),k={default:["\u0640 1 2 3 4 5 6 7 8 9 0 - = {delete}","{tab} \u0636 \u0635 \u062b \u0642 \u0641 \u063a \u0639 \u0647 \u062e \u062d \u062c \u0629 \\","{caplock} \u0634 \u0633 \u064a \u0628 \u0644 \u0627 \u062a \u0646 \u0645 \u0643 \u061b {restart}","{shift} \u0638 \u0637 \u0630 \u062f \u0632 \u0631 \u0648 \u060c . / {shift}","{space}"],shift:[" ! @ # $ % ^ & * ( ) _ + {delete}","{tab} \u064e \u064b \u0650 \u064d \u064f \u064c \u0652 \u0651 ] [ } { |",'{caplock} \xab \xbb \u0649   \u0622  \u066b \u066c : " {restart}',"{shift} '  \u0626 \u0621 \u0623 \u0625 \u0624 > < \u061f {shift}"],shiftAlt:[" \u0638 \u274a \xa3 \u20ac \u221e     \xb0 _  {delete}","{tab}    \u0609 \u06a4  \u06d5    \u0686  ","{caplock}  \u06d2 \u06cc \u067e  \u0671 \u0679 \u06ba  \u06a9 \u2026 {restart}","{shift}   \u0688 \u0691 \u0698   ,  \xf7 {shift}","{alt} {space} {alt}"]},C=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(m.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(r)))).state={input:""},n.onInputChanged=function(e){n.setState({input:e})},n.onInputSubmitted=function(e){console.log("Input submitted:",e)},n.showCorrectLayout=function(e){for(var t=!0,n="default";t;){k.default.reduce(function(e,t){return e.concat(t)},"").includes(e)&&(console.log("1"),t=!1),k.shift.reduce(function(e,t){return e.concat(t)},"").includes(e)&&(t=!1,console.log("2"),n="shift"),k.shiftAlt.reduce(function(e,t){return e.concat(t)},"").includes(e)&&(console.log("3"),t=!1,n="shiftAlt"),t=!1}return n},n}return Object(d.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props.keyToPress,t=this.showCorrectLayout(e);return r.a.createElement("div",{className:"keyboard"},k[t].map(function(t){return r.a.createElement("div",{className:"line",key:Object(g.generate)()},t.split(" ").map(function(t){return r.a.createElement(r.a.Fragment,null,console.log(e),r.a.createElement(N,{key:Object(g.generate)(),isToPress:t===e,char:t}))}))}))}}]),t}(a.Component),E=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,c=new Array(a),u=0;u<a;u++)c[u]=arguments[u];return(n=Object(m.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(c)))).state={curSourat:1,totalVersesCount:0,name:"",verses:{},curVerseNum:1,curVerse:"",curWithoutTashkil:"",userInput:"",curCharNum:0,indexOfLigaturedLaOfNegation:-1},n.handleKeyDown=function(e){var t=n.state,a=t.curCharNum,r=t.curWithoutTashkil,c=t.curVerseNum,u=t.totalVersesCount,s=a===r.length-1,i=r[a],o=e.key,l=c===u;!s&&i===o?n.setState({userInput:o,curCharNum:a+1}):s&&!l?n.setState(function(e){return{curVerseNum:e.curVerseNum+1,curCharNum:0}},function(){return n.setCurVerse()}):l&&s&&console.log("Congrats you've just finished this sourat")},n.getSourat=Object(o.a)(i.a.mark(function e(){var t,a,r,c,u;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah/surah_1.json");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,r=a.count,c=a.name,u=a.verse,n.setState({totalVersesCount:r,name:c,verses:u},function(){return n.setCurVerse()});case 8:case"end":return e.stop()}},e)})),n.setCurVerse=function(){var e=n.state,t=e.verses,a=e.curVerseNum,r=t["verse_".concat(a)];n.setState({curVerse:r},function(){return n.setCurVerseWithoutTechkil()})},n.setCurVerseWithoutTechkil=function(){var e=n.state.curVerse.replace(/\u0650|\u064f|\u0653|\u0670|\u0652|\u064c|\u064d|\u064b|\u0651|\u064e/g,""),t=e.indexOf("\u0644\u0627 ");t>-1&&n.setState({indexOfLigaturedLaOfNegation:t}),n.setState({curWithoutTashkil:e})},n.updateCurCharNum=function(){var e=n.state;if(e.curCharNum===e.curWithoutTashkil.length-1)n.setState(function(e){return{curVerseNum:e.curVerseNum+1,curCharNum:0}},function(){return n.setCurVerse()});else{var t=n.state.curCharNum;n.setState({curCharNum:t+1})}},n.getTextWithHighlitedChar=function(){var e=n.state,t=e.curCharNum,a=e.curWithoutTashkil,r=e.indexOfLigaturedLaOfNegation,c=a[t],u=a.slice(0,t),s=a.slice(t+1);return b(u,c,s,t,a,r)},n.textTachkil=function(){var e=n.state.curVerse;return r.a.createElement("div",{className:"duplicate"},e)},n.text=function(){return r.a.createElement("div",{className:"duplicate"},n.getTextWithHighlitedChar())},n}return Object(d.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getSourat(),document.addEventListener("keydown",function(t){return e.handleKeyDown(t)})}},{key:"componentWillUnmount",value:function(){var e=this;document.removeEventListener("keydown",function(t){return e.handleKeyDown(t)})}},{key:"render",value:function(){var e=this,t=this.state,n=t.curWithoutTashkil,a=t.curCharNum;if(!n)return null;var c=n[a];return c=" "===c?"space":c,r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"App"},this.text(),this.textTachkil(),r.a.createElement(C,{keyToPress:c}),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.updateCurCharNum},"next char"),r.a.createElement("button",{onClick:function(){return e.setState(function(e){return{curCharNum:e.curCharNum-1}})}},"prev char"))))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.d4d0a02e.chunk.js.map