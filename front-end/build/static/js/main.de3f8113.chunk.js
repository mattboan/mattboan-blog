(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{144:function(e,t,n){},145:function(e,t,n){},150:function(e,t,n){},173:function(e,t,n){},174:function(e,t,n){},175:function(e,t,n){},176:function(e,t,n){},177:function(e,t,n){},178:function(e,t,n){},179:function(e,t,n){},180:function(e,t,n){},181:function(e,t,n){},182:function(e,t,n){},287:function(e,t,n){},288:function(e,t,n){},289:function(e,t,n){},290:function(e,t,n){},300:function(e,t,n){},301:function(e,t,n){},303:function(e,t,n){},304:function(e,t,n){},305:function(e,t,n){},306:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n(1),c=n.n(o),s=n(53),r=n.n(s),i=(n(144),n(145),n(15)),l=n(14),d=n(13),j=n(55),u=n(56),h=n.n(u),p=n(123),b="TOKEN_KEY",g=function(){var e=m();return!!e&&!(1e3*Object(p.a)(e).exp<Date.now())},m=function(){return h.a.get(b)},O=function(e){var t=e.component,n=Object(j.a)(e,["component"]);return Object(a.jsx)(l.b,Object(d.a)(Object(d.a)({},n),{},{render:function(e){return g()?Object(a.jsx)(t,Object(d.a)({},e)):Object(a.jsx)(l.a,{to:"/Login"})}}))},x=function(e){var t=e.component,n=e.restricted,o=Object(j.a)(e,["component","restricted"]);return Object(a.jsx)(l.b,Object(d.a)(Object(d.a)({},o),{},{render:function(e){return g()&&n?Object(a.jsx)(l.a,{to:"/Home"}):Object(a.jsx)(t,Object(d.a)({},e))}}))},f=n(2),v=n(3),y=n(29),C=n(5),k=n(4),S=n(8),w=n(126),N=(n(150),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={menuOpen:!1},a.onMenuClick=a.onMenuClick.bind(Object(y.a)(a)),a}return Object(v.a)(n,[{key:"onMenuClick",value:function(){var e=this.state.menuOpen;this.setState({menuOpen:!e})}},{key:"render",value:function(){return Object(a.jsxs)("div",{children:[Object(a.jsxs)("header",{className:"App-header",children:[Object(a.jsx)(i.b,{className:"App-header-text",to:"/",children:"matt boan"}),Object(a.jsx)(w.a,{rounded:!0,className:"menubtn",toggled:this.state.menuOpen,toggle:this.onMenuClick,size:26,hideOutline:!0})]}),Object(a.jsxs)("div",{className:this.state.menuOpen?"dropDown slideDown":"dropDown slideUp",children:[Object(a.jsxs)(i.b,{to:"/Home",onClick:this.onMenuClick,children:[Object(a.jsx)(S.h,{})," ",Object(a.jsx)("p",{children:"Home"})]}),Object(a.jsxs)(i.b,{to:"/Projects",onClick:this.onMenuClick,children:[Object(a.jsx)(S.d,{})," ",Object(a.jsx)("p",{children:"Projects"})]}),Object(a.jsxs)(i.b,{to:"/AboutMe",onClick:this.onMenuClick,children:[Object(a.jsx)(S.a,{})," ",Object(a.jsx)("p",{children:"About Me"})]})]})]})}}]),n}(c.a.Component)),T=n(11),I=n.n(T),E=n(32),P=n.n(E),L=(n(173),c.a.Component,n(174),n(7)),M=n.n(L),D="\n    display: block;\n    margin: 0 auto;\n    margin-top: 25px;\n    margin-bottom: 25px;\n    border-color: red;\n",B=function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).handleEmailChange=function(e){a.setState({email:e.target.value})},a.handleSubjectChange=function(e){a.setState({subject:e.target.value})},a.handleMessageChange=function(e){a.setState({message:e.target.value})},a.sendEmail=function(){a.setState({sending:!0}),console.log("sendEmail called");var e=new URLSearchParams;e.append("from",a.state.email),e.append("subject",a.state.subject),e.append("message",a.state.message),I()({method:"post",url:M.a.backend+"/api/send-email",data:e,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){console.log(e.data),a.setState({sending:!1,status:"Message Sent!"})})).catch((function(e){console.log(e),a.setState({sending:!1,status:"Error Sending!"})}))},a.state={email:"",subject:"",message:"",sending:!1,status:""},a}return Object(v.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{className:"ContactMe",children:[Object(a.jsx)("h3",{children:"Contact Me"}),Object(a.jsxs)("div",{className:"ContactMeForm",children:[Object(a.jsx)("label",{children:"Email"}),Object(a.jsx)("input",{value:this.state.email,placeholder:"example@example.com",onChange:this.handleEmailChange}),Object(a.jsx)("label",{children:"Subject"}),Object(a.jsx)("input",{value:this.state.subject,placeholder:"The Subject of the Email",onChange:this.handleSubjectChange}),Object(a.jsx)("label",{children:"Message"}),Object(a.jsx)("textarea",{value:this.state.message,rows:"5",placeholder:"Ask me anything...",onChange:this.handleMessageChange}),Object(a.jsxs)("div",{className:"buttonAndStatus",children:[e.state.sending?Object(a.jsx)(P.a,{css:"\n    display: block;\n    margin: 0;\n    margin-top: 0px;\n    margin-bottom: 0px;\n\tmargin-right: 5px;\n    border-color: red;\n",size:25,color:"#ffffff"}):Object(a.jsx)("p",{children:e.state.status}),Object(a.jsxs)("button",{onClick:this.sendEmail,children:["Send ",Object(a.jsx)(S.o,{})]})]})]})]})}}]),n}(c.a.Component),A=(n(175),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(){return Object(f.a)(this,n),t.call(this)}return Object(v.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{className:"footerconmain",children:[Object(a.jsxs)("div",{className:"footercon",children:[Object(a.jsxs)("div",{className:"footercon-col",children:[Object(a.jsx)("h3",{children:"Quicklinks"}),Object(a.jsxs)(i.b,{to:"/Home",children:[Object(a.jsx)(S.h,{})," ",Object(a.jsx)("p",{children:"Home"})]}),Object(a.jsxs)(i.b,{to:"/Projects",children:[Object(a.jsx)(S.d,{})," ",Object(a.jsx)("p",{children:"Projects"})]}),Object(a.jsxs)(i.b,{to:"/AboutMe",children:[Object(a.jsx)(S.a,{})," ",Object(a.jsx)("p",{children:"About Me"})]})]}),Object(a.jsxs)("div",{className:"footercon-col",children:[Object(a.jsx)("h3",{children:"Socials"}),Object(a.jsxs)("a",{href:"https://www.linkedin.com/in/matt-boan-656561129/",children:[Object(a.jsx)(S.l,{}),Object(a.jsx)("p",{children:"LinkedIn"})]}),Object(a.jsxs)("a",{href:"https://www.github.com/mattboan",children:[Object(a.jsx)(S.g,{}),Object(a.jsx)("p",{children:"Github"})]})]}),Object(a.jsx)("div",{className:"footercon-col",children:Object(a.jsx)(B,{})})]}),Object(a.jsx)("p",{children:"\xa9 2021 Matt Boan. All Rights Reserved."})]})}}]),n}(c.a.Component)),R=function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(v.a)(n,[{key:"componentDidUpdate",value:function(e){this.props.location!==e.location&&window.scrollTo(0,0)}},{key:"render",value:function(){return this.props.children}}]),n}(c.a.Component),H=Object(l.g)(R),U=(n(176),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).onSearch=function(){a.props.onSearch&&a.props.onSearch(a.state.id)},a.state={id:a.props.id},a}return Object(v.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{onClick:this.onSearch,className:"MainCon",style:{fontSize:this.props.size,borderColor:this.props.color},children:[Object(a.jsx)("p",{children:this.props.text}),function(){if(e.props.mutable)return Object(a.jsx)("button",{className:"tagButton",onClick:function(){e.props.onRemove(e.state.id)},children:"X"})}()]})}}]),n}(c.a.Component)),z=(n(177),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={error:null,isLoaded:!1,tags:[],isHovered:!1,hidden:!0},a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.loadTags(),setTimeout((function(){e.show()}),this.props.anim)}},{key:"show",value:function(){this.setState({hidden:!1})}},{key:"loadTags",value:function(){var e=this;I.a.get(M.a.backend+"/api/projects-tags:"+this.props.item.id).then((function(t){e.setState({loaded:!0,tags:t.data.tags})})).catch((function(t){e.setState({loaded:!0,error:t})}))}},{key:"render",value:function(){var e=this.state.hidden?"Thumbnail hide":"Thumbnail";return Object(a.jsxs)(i.b,{to:{pathname:"".concat(this.props.link,"/").concat(this.props.item.id)},className:e,children:[Object(a.jsx)("div",{className:"ThumbnailImage",style:{backgroundImage:"url('"+this.props.item.image+"')"}}),Object(a.jsxs)("div",{className:"ThumbnailText",children:[Object(a.jsx)("h3",{children:this.props.item.name}),Object(a.jsx)("p",{children:this.props.item.description})]}),Object(a.jsx)("div",{className:"ThumbnailTags",children:this.state.tags.map((function(e){return Object(a.jsx)(U,{text:e.text,color:e.color,size:"12px"},e.id)}))})]})}}]),n}(c.a.Component)),K=(n(178),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={},a}return Object(v.a)(n,[{key:"render",value:function(){return Object(a.jsx)("div",{className:"ProjecConCon",children:Object(a.jsx)("div",{className:"projects",children:this.props.projects.map((function(e,t){return Object(a.jsx)(z,{item:e,link:"Project",anim:250*t},e.id)}))})})}}]),n}(c.a.Component)),F=(n(179),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(v.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{className:"Banner",children:[Object(a.jsxs)("div",{className:"BannerText",children:[Object(a.jsx)("h3",{children:"Create."}),Object(a.jsx)("h3",{children:"Innovate."}),Object(a.jsx)("h3",{className:"BannerTextLastLine",children:"Learn."})]}),Object(a.jsx)("div",{className:"BannerImage",children:Object(a.jsx)("img",{src:M.a.backend+"/images/minime2.svg",alt:"Banner"})})]})}}]),n}(c.a.Component)),q=(n(180),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={error:null,loaded:!1,projects:[]},a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){this.loadProjects()}},{key:"loadProjects",value:function(){var e=this;I.a.get(M.a.backend+"/api/projects").then((function(t){e.setState({loaded:!0,projects:t.data.projects})})).catch((function(t){e.setState({loaded:!0,error:t})}))}},{key:"render",value:function(){var e=this.state,t=e.error,n=e.loaded,o=e.projects;return Object(a.jsxs)("div",{className:"Home",children:[Object(a.jsx)(F,{}),Object(a.jsx)("h2",{children:"Projects"}),t?Object(a.jsx)("div",{children:"Error Loading Projects...."}):n?Object(a.jsx)(K,{projects:o}):Object(a.jsx)(P.a,{css:D,size:55,color:"#dd5405"})]})}}]),n}(c.a.Component)),_=(n(181),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={},a}return Object(v.a)(n,[{key:"render",value:function(){return Object(a.jsx)("a",{href:this.props.url,className:"SocialIcon",children:this.props.icon})}}]),n}(c.a.Component)),J=(n(182),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={},a}return Object(v.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{className:"AboutMe",children:[Object(a.jsx)("div",{className:"aboutMeImageHeader",style:{backgroundImage:"url('./img/beach-2.png')"}}),Object(a.jsxs)("div",{className:"para",children:[Object(a.jsx)("h2",{children:"Matt Boan"}),Object(a.jsx)("p",{children:"To me there is nothing more rewarding than solving an interesting problem. Once a problem nests itself into my head I immediately start learning as much as possible. Understanding a problem helps but is really only the first step to the cure, to really understand it in my own way I delve deeper and start to break the problem down into smaller pieces, figure out what the solution is for each piece and work backwards from the solution. Once the problem seems solved I test vigorously and iterate over slightly different designs to achieve the best possible solution. I\u2019m BIG on teamwork. Throughout my studies and various side ventures, being able to share my passions, solve problems, and work within a group is like surfing a wave, it\u2019s fun but it\u2019s even more fun when you have someone to share the wave with."})]}),Object(a.jsxs)("div",{className:"creds",children:[Object(a.jsx)("h2",{children:"Credentials"}),Object(a.jsx)("p",{children:"I love learning, and then applying various skills together to create some unique, interesting, and exciting solutions. Below is a list of my professional learning credentials however, I never stop learning and always aiming to improve myself!"}),Object(a.jsxs)("ul",{children:[Object(a.jsx)("li",{children:"\ud83c\udfa8 Certificate III in Graphic Design"}),Object(a.jsx)("li",{children:"\ud83c\udfa8 Certificate IV in Graphic Design"}),Object(a.jsx)("li",{children:"\ud83d\udcbb Bachelors Degree - Double Major in Computer Science & Web and Mobile Design"})]})]}),Object(a.jsxs)("div",{className:"para",children:[Object(a.jsx)("h2",{children:"This Site"}),Object(a.jsx)("p",{children:"If you want to learn, contribute, or just see what I'm working on in a greater detail than a github repository might provide, this is where it all happens. This blog is a culmination of all the projects I've been working on. Here I delve deep into great detail providing my thoughts and methodologies when working on a project, no matter how big or small I always ensure that I put my all into what I do."})]}),Object(a.jsxs)("div",{className:"socials",children:[Object(a.jsx)("h2",{children:"Get in touch"}),Object(a.jsx)("p",{children:"Want to reach out, ask me a question, calobrate, or just say hello? Great contact me via any social media platform you prefer!"}),Object(a.jsxs)("div",{className:"socialsCon",children:[Object(a.jsx)(_,{url:"https://www.linkedin.com/in/matt-boan-656561129/",icon:Object(a.jsx)(S.l,{className:"icon"})}),Object(a.jsx)(_,{url:"https://www.github.com/mattboan",icon:Object(a.jsx)(S.g,{className:"icon"})}),Object(a.jsx)(_,{url:"mailto:mattboan97@gmail.com",icon:Object(a.jsx)(S.f,{className:"icon"})})]})]})]})}}]),n}(c.a.Component)),W=n(10),G=n(54),V=n.n(G),Q={keyBindingFn:function(e,t){if(!(0,t.getEditorState)().getSelection().isCollapsed())return W.KeyBindingUtil.hasCommandModifier(e)&&75===e.which?"add-link":void 0},handleKeyCommand:function(e,t,n){n.getEditorState;var a=n.setEditorState;if("add-link"!==e)return"not-handled";var o=window.prompt("Paste the link -"),c=t.getSelection();if(!o)return a(W.RichUtils.toggleLink(t,c,null)),"handled";var s=t.getCurrentContent().createEntity("LINK","MUTABLE",{url:o}),r=W.EditorState.push(t,s,"create-entity"),i=s.getLastCreatedEntityKey();return a(W.RichUtils.toggleLink(r,c,i)),"handled"},decorators:[{strategy:function(e,t,n){e.findEntityRanges((function(e){var t=e.getEntity();return null!==t&&"LINK"===n.getEntity(t).getType()}),t)},component:function(e){console.log("Link called!");var t=e.contentState,n=e.entityKey,o=t.getEntity(n).getData().url;return Object(a.jsx)("a",{className:"link",href:o,rel:"noopener noreferrer",target:"_blank","aria-label":o,children:e.children})}}]},X=function(e){return"atomic"===e.getType()?{component:Z,editable:!1}:null},Y=function(e){return e.src?Object(a.jsx)("img",{className:"ProjectPostImage",src:e.src}):null},Z=function(e){var t,n=e.contentState.getEntity(e.block.getEntityAt(0)),o=n.getData().src;return"image"===n.getType()&&(t=Object(a.jsx)(Y,{className:"ProjectPostImage",src:o})),t},$=(n(287),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).progressBar=function(){var e=document.documentElement.scrollTop,t=document.documentElement.scrollHeight-document.documentElement.clientHeight,n="".concat(e/t*100,"%");a.setState({scroll:n})},a.onChange=function(e){a.setState({editorState:e})},a.state={error:null,isLoaded:!1,project:{},tags:[],editorState:null,scroll:0},a.plugins=[Q],a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){this.getProjects(),this.getTags(),window.addEventListener("scroll",this.progressBar)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.progressBar)}},{key:"getTags",value:function(){var e=this;I.a.get(M.a.backend+"/api/projects-tags:"+this.props.match.params.id).then((function(t){e.setState({tags:t.data.tags,isLoaded:!0})})).catch((function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"getProjects",value:function(){var e=this;I.a.get(M.a.backend+"/api/project:"+this.props.match.params.id).then((function(t){t.data.project[0].post?e.setState({editorState:W.EditorState.createWithContent(Object(W.convertFromRaw)(JSON.parse(t.data.project[0].post)))}):e.setState({editorState:W.EditorState.createEmpty()}),e.setState({project:t.data.project[0]})})).catch((function(t){console.log(t),e.setState({isLoaded:!0,error:t})}))}},{key:"render",value:function(){var e=this,t={borderRadius:"10px",transition:"0.1s ease",height:"5px",background:"#dd5404",width:this.state.scroll};return Object(a.jsxs)("div",{className:"Project",children:[Object(a.jsx)("div",{className:"progress-bar",style:{background:"rgba(255, 255, 255, 0)",height:"5px",position:"fixed",top:0,left:0,zIndex:101,width:"100%"},children:Object(a.jsx)("div",{style:t})}),Object(a.jsxs)("div",{className:"flexCon",children:[Object(a.jsxs)("div",{className:"contentCon",children:[Object(a.jsx)("div",{className:"imageHeader",alt:"Header",style:{backgroundImage:"url('"+this.state.project.image+"')"}}),Object(a.jsxs)("div",{className:"projectcon",children:[Object(a.jsxs)("div",{className:"headerCon",children:[Object(a.jsx)("h2",{children:this.state.project.name}),g()?Object(a.jsx)(i.b,{to:{pathname:"/EditProject/".concat(this.props.match.params.id)},className:"editButton",children:Object(a.jsx)(S.e,{className:"icon"})}):Object(a.jsx)("div",{})]}),Object(a.jsx)("div",{className:"ThumbnailTags",children:this.state.tags.map((function(e){return Object(a.jsx)(U,{text:e.text,color:e.color,size:"12px"},e.id)}))}),Object(a.jsx)("div",{className:"postcon",children:function(){if(e.state.editorState)return Object(a.jsx)(V.a,{editorState:e.state.editorState,readOnly:!0,plugins:e.plugins,onChange:e.onChange,blockRendererFn:X})}()})]})]}),Object(a.jsx)("div",{className:"sidepanel",children:Object(a.jsx)(i.b,{className:"profile",to:"/AboutMe",children:Object(a.jsxs)("div",{className:"innerCon",children:[Object(a.jsx)("img",{src:"../img/me2.jpg",alt:"Author"}),Object(a.jsxs)("div",{className:"author",children:[Object(a.jsx)("p",{className:"authorName",children:"Matt Boan"}),Object(a.jsx)("p",{className:"authorDesc",children:"Programmer, Designer, Fullstack \ud83d\ude4f"})]})]})})})]})]})}}]),n}(c.a.Component)),ee=(n(288),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).inputHandler=function(e){a.setState({query:e.target.value})},a.state={query:""},a}return Object(v.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{className:"SearchBar",children:[Object(a.jsx)("input",{placeholder:this.props.placeholder,onChange:this.inputHandler}),Object(a.jsx)("button",{onClick:function(){e.props.onSearch(e.state.query)},children:Object(a.jsx)(S.r,{className:"FaSearch"})})]})}}]),n}(c.a.Component)),te=(n(289),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={tags:[]},a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){this.loadTags()}},{key:"loadTags",value:function(){var e=this;I.a.get(M.a.backend+"/api/tags").then((function(t){e.setState({loaded:!0,tags:t.data.tags})})).catch((function(t){e.setState({loaded:!0,error:t})}))}},{key:"render",value:function(){var e=this;return Object(a.jsx)("div",{className:"TagCon-Con",children:this.state.tags.map((function(t,n){return Object(a.jsx)(U,{id:t.id,text:t.text,onSearch:e.props.onSearch,color:t.color,size:"14px"},n)}))})}}]),n}(c.a.Component)),ne=(n(290),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).state={error:null,loaded:!1,projects:[]},a.search=a.search.bind(Object(y.a)(a)),a.searchTags=a.searchTags.bind(Object(y.a)(a)),a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){this.loadProjects()}},{key:"createNewProject",value:function(){var e=null;g()&&(e="Bearer ".concat(m())),I()({method:"post",url:M.a.backend+"/api/create-project",headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:e}}).then((function(e){console.log(e)}))}},{key:"search",value:function(e){var t=this;this.setState({error:null,loaded:!1}),I.a.get(M.a.backend+"/api/project-query:"+e).then((function(e){t.setState({loaded:!0,projects:e.data.projects})})).catch((function(e){t.setState({loaded:!0,error:e})}))}},{key:"searchTags",value:function(e){var t=this;this.setState({loaded:!1,error:null}),I.a.get(M.a.backend+"/api/project-with-tag:"+e).then((function(e){t.setState({loaded:!0,projects:e.data.projects})})).catch((function(e){t.setState({loaded:!0,error:e})}))}},{key:"loadProjects",value:function(){var e=this;I.a.get(M.a.backend+"/api/projects").then((function(t){e.setState({loaded:!0,projects:t.data.projects})})).catch((function(t){e.setState({loaded:!0,error:t})}))}},{key:"render",value:function(){var e=this.state,t=e.error,n=e.loaded,o=e.projects;return Object(a.jsxs)("div",{className:"Projects",children:[Object(a.jsxs)("div",{className:"ProjectsHeader",children:[Object(a.jsx)("h2",{children:"Projects"}),g()?Object(a.jsxs)("button",{className:"ProjectsHeaderButton",onClick:this.createNewProject,children:[Object(a.jsx)(S.p,{}),Object(a.jsx)("span",{children:"Project"})]}):Object(a.jsx)("div",{})]}),Object(a.jsx)("div",{className:"searchBarWrapper",children:Object(a.jsx)(ee,{placeholder:"Search Projects",onSearch:this.search})}),Object(a.jsx)(te,{onSearch:this.searchTags}),t?Object(a.jsx)("div",{children:"Error Loading Projects."}):n?o.length?Object(a.jsx)(K,{projects:o}):Object(a.jsx)("p",{className:"noprojectsfound",children:"No Projects Found."}):Object(a.jsx)(P.a,{css:D,size:55,color:"#dd5405"})]})}}]),n}(c.a.Component)),ae=n(70),oe=n.n(ae),ce=function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(){var e;Object(f.a)(this,n);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).onToggle=function(t){console.log("test"),t.preventDefault(),e.props.onToggle(e.props.style)},e}return Object(v.a)(n,[{key:"render",value:function(){var e="BSButton";return this.props.active&&(e+=" activeButton"),Object(a.jsx)("button",{className:e,onClick:this.onToggle,children:this.props.label})}}]),n}(c.a.Component),se=(n(300),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(){var e;Object(f.a)(this,n);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(e=t.call.apply(t,[this].concat(o))).onToggle=function(t){var n=t.target.value;e.props.onToggle(n),console.log("HSDropDown onToggle: "+n)},e}return Object(v.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("select",{className:"HSDropDown",value:this.props.active,onChange:this.onToggle,children:[Object(a.jsx)("option",{value:"",children:"Header Levels"}),this.props.headerOptions.map((function(e,t){return Object(a.jsx)("option",{value:e.style,children:e.label},t)}))]})}}]),n}(c.a.Component)),re=(n(301),[{label:Object(a.jsx)(S.q,{}),style:"blockquote"},{label:Object(a.jsx)(S.n,{}),style:"unordered-list-item"},{label:Object(a.jsx)(S.m,{}),style:"ordered-list-item"},{label:Object(a.jsx)(S.c,{}),style:"code-block"}]),ie=[{label:"(None)",style:"unstyled"},{label:"H1",style:"header-one"},{label:"H2",style:"header-two"},{label:"H3",style:"header-three"},{label:"H4",style:"header-four"},{label:"H5",style:"header-five"},{label:"H6",style:"header-six"}];function le(e){switch(e.getType()){case"blockquote":return"RichEditor-blockquote";default:return null}}var de=function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(){return Object(f.a)(this,n),t.apply(this,arguments)}return Object(v.a)(n,[{key:"render",value:function(){var e=this,t=this.props.editorState,n=t.getSelection(),o=t.getCurrentContent().getBlockForKey(n.getStartKey()).getType();t.getCurrentInlineStyle();return Object(a.jsxs)("span",{className:"RichEditor-controls",children:[Object(a.jsx)(se,{headerOptions:ie,active:o,onToggle:this.props.onToggle}),re.map((function(t,n){return Object(a.jsx)(ce,{active:t.style===o,label:t.label,onToggle:e.props.onToggle,style:t.style,type:t},n)}))]})}}]),n}(c.a.Component),je=function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).onChange=function(e){a.setState({editorState:e}),a.props.onChange(e.getCurrentContent())},a.onURLChange=function(e){return a.setState({urlValue:e.target.value})},a.handleKeyCommand=function(e){var t=W.RichUtils.handleKeyCommand(a.state.editorState,e);return t?(a.onChange(t),"handled"):"not-handled"},a.onUnderlineClick=function(){a.onChange(W.RichUtils.toggleInlineStyle(a.state.editorState,"UNDERLINE"))},a.onBoldClick=function(){a.onChange(W.RichUtils.toggleInlineStyle(a.state.editorState,"BOLD"))},a.onItalicClick=function(){a.onChange(W.RichUtils.toggleInlineStyle(a.state.editorState,"ITALIC"))},a.toggleBlockType=function(e){console.log("blockType: "+e),a.onChange(W.RichUtils.toggleBlockType(a.state.editorState,e))},a.onAddLink=function(){var e=a.state.editorState,t=e.getSelection(),n=window.prompt("Paste the link -");if(!n)return a.onChange(W.RichUtils.toggleLink(e,t,null)),"handled";var o=e.getCurrentContent().createEntity("LINK","MUTABLE",{url:n}),c=W.EditorState.push(e,o,"create-entity"),s=o.getLastCreatedEntityKey();return a.onChange(W.RichUtils.toggleLink(c,t,s)),"handled"},a.onAddImage=function(e){e.preventDefault();var t=a.state.editorState,n=window.prompt("Paste Image Link"),o=t.getCurrentContent().createEntity("image","IMMUTABLE",{src:n}),c=o.getLastCreatedEntityKey(),s=W.EditorState.set(t,{currentContent:o},"create-entity");a.setState({editorState:W.AtomicBlockUtils.insertAtomicBlock(s,c," ")})},a.state={editorState:W.EditorState.createEmpty()},a.plugins=[Q],a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){this.props.contentState&&this.setState({editorState:W.EditorState.createWithContent(this.props.contentState)})}},{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{className:"projectPostEdit",children:[Object(a.jsx)("label",{children:"Post"}),Object(a.jsxs)("div",{className:"toolbar-con",children:[Object(a.jsx)(de,{editorState:this.state.editorState,onToggle:this.toggleBlockType}),Object(a.jsx)("button",{onClick:this.onUnderlineClick,children:Object(a.jsx)(S.s,{})}),Object(a.jsx)("button",{onClick:this.onBoldClick,children:Object(a.jsx)(S.b,{})}),Object(a.jsx)("button",{onClick:this.onItalicClick,children:Object(a.jsx)(S.j,{})}),Object(a.jsx)("button",{id:"link_url",onClick:this.onAddLink,className:"add-link",children:Object(a.jsx)(S.k,{})}),Object(a.jsx)("button",{onClick:this.onAddImage,children:Object(a.jsx)(S.i,{})})]}),Object(a.jsx)("div",{className:"postEditorCon",children:function(){if(e.state.editorState)return Object(a.jsx)(V.a,{blockRendererFn:X,editorState:e.state.editorState,blockStyleFn:le,handleKeyCommand:e.handleKeyCommand,onChange:e.onChange,plugins:e.plugins})}()})]})}}]),n}(c.a.Component),ue=n(71),he=n.n(ue),pe=n(125),be=(n(303),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).isHexColor=function(e){return console.log("checking: "+e),"string"===typeof e&&6===e.length&&!isNaN(Number("0x"+e))},a.handleTagTextInput=function(e){a.setState({tagTextInput:e.target.value})},a.handleTagColorInput=function(e){a.setState({tagColorInput:e.target.value}),a.isHexColor(e.target.value.substring(1))&&(console.log("is valid!"),a.setState({boxColor:e.target.value}))},a.onRemove=function(e){var t=null;g()&&(t="Bearer ".concat(m()));var n=new URLSearchParams;n.append("tag_id",e),n.append("project_id",a.props.projectID),I()({method:"delete",url:M.a.backend+"/api/delete-projects-tags",data:n,headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:t}}).then((function(e){return console.log(e),I.a.get(M.a.backend+"/api/projects-tags:"+a.props.projectID)})).then((function(e){a.setState({tags:e.data.tags})})).catch((function(e){console.log(e)}))},a.getTags=function(){I.a.get(M.a.backend+"/api/projects-tags:"+a.props.projectID).then((function(e){a.setState({tags:e.data.tags,tempTags:[]})}))},a.state={tagTextInput:"",tagColorInput:"",boxColor:"#1f1",loaded:!0,uploaded:!1,tags:[],tempTags:[]},a.onAdd=a.onAdd.bind(Object(y.a)(a)),a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){this.getTags()}},{key:"onAdd",value:function(e){var t=this;JSON.parse(JSON.stringify(this.state.tags)).forEach((function(e){delete e.id,""!==e.text&&t.state.tempTags.push(e)})),""!==this.state.tagTextInput&&this.state.tempTags.push({text:this.state.tagTextInput,color:this.state.boxColor}),this.state.tempTags.forEach((function(e){t.updateTags(e)}))}},{key:"updateTags",value:function(){var e=Object(pe.a)(he.a.mark((function e(t){var n,a,o,c=this;return he.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=null,g()&&(n="Bearer ".concat(m())),a=0,(o=new URLSearchParams).append("text",t.text),o.append("color",t.color),I()({method:"get",url:M.a.backend+"/api/tag-exists:"+t.text,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){return e.data.tag_id?e:I()({method:"post",url:M.a.backend+"/api/create-tag",data:o,headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:n}})})).then((function(e){a=e.data.tag_id;var t=new URLSearchParams;return t.append("tag_id",a),t.append("project_id",c.props.projectID),I()({method:"get",url:M.a.backend+"/api/projects-tags-exists",data:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}})})).then((function(e){if(console.log("/api/projects-tags-exists"),0===e.data.id){var t=new URLSearchParams;return t.append("tag_id",a),t.append("project_id",c.props.projectID),I()({method:"post",url:M.a.backend+"/api/create-projects-tags",data:t,headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:n}})}return e})).then((function(e){return I.a.get(M.a.backend+"/api/projects-tags:"+c.props.projectID)})).then((function(e){c.setState({tags:e.data.tags}),c.setState({tempTags:[]})})),this.setState({tempTags:[]});case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{className:"EditTags",children:[Object(a.jsx)("div",{className:"EditTags-TagsCon",children:this.state.tags.map((function(t,n){return Object(a.jsx)(U,{id:t.id,text:t.text,color:t.color,onSearch:null,size:"14px",mutable:!0,onRemove:e.onRemove},n)}))}),Object(a.jsxs)("div",{className:"EditTags-input",children:[Object(a.jsx)("label",{children:"Tag Name"}),Object(a.jsx)("input",{type:"text",value:this.state.tagTextInput,onChange:this.handleTagTextInput}),Object(a.jsx)("label",{children:"Tag Color"}),Object(a.jsxs)("div",{className:"EditTags-ColorPicker",children:[Object(a.jsx)("div",{className:"EditTags-ColorPickerColorBlock",style:{backgroundColor:this.state.boxColor}}),Object(a.jsx)("input",{type:"text",value:this.state.tagColorInput,onChange:this.handleTagColorInput}),Object(a.jsx)("button",{className:"EditTags-Button",onClick:this.onAdd,children:"Update Tags"})]})]})]})}}]),n}(c.a.Component));n(304);oe.a.setAppElement("#root");var ge=function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).openModal=function(){a.setState({modalIsOpen:!0})},a.closeModal=function(){a.setState({modalIsOpen:!1})},a.getContentState=function(e){e&&a.setState({contentState:e})},a.projectTitleHandler=function(e){a.setState({project:Object(d.a)(Object(d.a)({},a.state.project),{},{name:e.target.value})})},a.projectDescChange=function(e){a.setState({project:Object(d.a)(Object(d.a)({},a.state.project),{},{description:e.target.value})})},a.triggetHeaderImageInput=function(e){a.inputRef.click(e)},a.headerImageOnChange=function(e){if(e.target.files&&e.target.files[0]){var t=e.target.files[0];a.setState({image:t,previewImage:URL.createObjectURL(t)})}},a.updateProject=function(){if(window.confirm("Did you remember to touch the post section, if not it will be deleted!")){var e=null;g()&&(e="Bearer ".concat(m()));var t=new FormData,n=a.state.project;n.description&&(n.description=n.description.slice(0,80));var o=Object(W.convertToRaw)(a.state.contentState);n.post=o,t.append("project",JSON.stringify(n)),t.append("header-image",a.state.image),I()({method:"post",url:M.a.backend+"/api/update-project",data:t,headers:{"Content-Type":"multipart/form-data",Authorization:e}}).then((function(e){alert(JSON.stringify(e.data)),console.log(e)})).catch((function(e){console.log(e)}))}},a.getProject=function(){I.a.get(M.a.backend+"/api/project:"+a.props.match.params.id).then((function(e){if(e.data.project[0]){var t=null;e.data.project[0].post&&(t=Object(W.convertFromRaw)(JSON.parse(e.data.project[0].post))),a.setState({project:e.data.project[0],previewImage:e.data.project[0].image,contentState:t,isLoaded:!0})}})).catch((function(e){console.log("Error /Project: "+e)}))},a.deleteProject=function(){var e=null;g()&&(e="Bearer ".concat(m())),I()({method:"delete",url:M.a.backend+"/api/remove-project:"+a.props.match.params.id,headers:{Authorization:e}}).then((function(e){alert(JSON.stringify(e.data)),console.log(e)})).catch((function(e){console.log(e)}))},a.state={id:a.props.match.params.id,image:null,previewImage:null,error:null,isLoaded:!1,tagsLoaded:!1,project:{name:"",description:""},contentState:null,tempContentState:null,modalIsOpen:!1},a}return Object(v.a)(n,[{key:"componentDidMount",value:function(){this.getProject()}},{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{className:"EditProject",children:[Object(a.jsx)("h2",{children:"Edit Project"}),Object(a.jsxs)("div",{className:"headerImageEdit",children:[Object(a.jsx)("h3",{children:"Header Image"}),Object(a.jsx)("div",{className:"imageHeader",style:{backgroundImage:"url('"+this.state.previewImage+"')"}}),Object(a.jsxs)("div",{className:"headerImageControls",children:[Object(a.jsx)("button",{onClick:this.triggetHeaderImageInput,children:"Upload New Header Image"}),Object(a.jsx)("input",{ref:function(t){return e.inputRef=t},onChange:this.headerImageOnChange,type:"file",name:"headerImage"})]})]}),Object(a.jsxs)("div",{className:"projectTitleEdit",children:[Object(a.jsx)("label",{children:"Project Title"}),Object(a.jsx)("input",{name:"projectTitle",type:"text",placeholder:"Project Title",value:this.state.project.name,onChange:this.projectTitleHandler})]}),Object(a.jsxs)("div",{className:"projectDescEdit",children:[Object(a.jsx)("label",{children:"Short Description"}),Object(a.jsx)("input",{type:"text",placeholder:"Enter a short description for the project",value:this.state.project.description,onChange:this.projectDescChange})]}),Object(a.jsxs)("div",{className:"tagsEdit",children:[Object(a.jsx)("label",{children:"Tags"}),Object(a.jsx)(be,{projectID:this.props.match.params.id})]}),this.state.isLoaded?Object(a.jsx)(je,{contentState:this.state.contentState,onChange:this.getContentState}):Object(a.jsx)(P.a,{css:D,size:55,color:"#dd5405"}),Object(a.jsxs)("div",{className:"bottomControls",children:[Object(a.jsx)("button",{onClick:this.updateProject,children:"Update Post"}),Object(a.jsx)("button",{style:{backgroundColor:"grey"},onClick:this.getProject,children:"Clear Changes"}),Object(a.jsx)("button",{style:{backgroundColor:"red"},onClick:this.openModal,children:"Delete Post"})]}),Object(a.jsxs)(oe.a,{isOpen:this.state.modalIsOpen,onRequestClose:this.closeModal,contentLabel:"Example Modal",children:[Object(a.jsx)("p",{children:"Are you sure you want to delete this Project?"}),Object(a.jsx)("button",{onClick:this.closeModal,children:"Close"}),Object(a.jsx)("button",{style:{backgroundColor:"red",color:"white"},onClick:this.deleteProject,children:"Delete"})]})]})}}]),n}(c.a.Component),me=(n(305),function(e){Object(C.a)(n,e);var t=Object(k.a)(n);function n(e){var a;return Object(f.a)(this,n),(a=t.call(this,e)).handleUsernameChange=function(e){a.setState({username:e.target.value})},a.handlePasswordChange=function(e){a.setState({password:e.target.value})},a.loginAPI=function(e){e.preventDefault(),h.a.remove(b);var t=new URLSearchParams;t.append("username",a.state.username),t.append("password",a.state.password),I()({method:"post",url:M.a.backend+"/api/login-user",data:t,headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then((function(e){var t;console.log(e),t=e.data.token,h.a.set(b,t)})).catch((function(e){console.log(e)}))},a.state={loading:!1,username:"",password:"",status:""},a}return Object(v.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{className:"Login",children:[Object(a.jsx)("h3",{children:"Login"}),Object(a.jsxs)("form",{onSubmit:this.loginAPI,children:[Object(a.jsx)("label",{children:"Username"}),Object(a.jsx)("input",{value:this.state.username,onChange:this.handleUsernameChange}),Object(a.jsx)("label",{children:"Password"}),Object(a.jsx)("input",{type:"password",value:this.state.password,onChange:this.handlePasswordChange}),Object(a.jsxs)("div",{className:"onSubmitRow",children:[Object(a.jsx)("p",{children:this.state.status}),Object(a.jsx)("button",{type:"submit",children:"Login"})]})]})]})}}]),n}(c.a.Component));var Oe=function(){return Object(a.jsx)(i.a,{children:Object(a.jsx)(H,{children:Object(a.jsxs)("div",{children:[Object(a.jsxs)("div",{className:"AppContent",children:[Object(a.jsx)("div",{className:"HeaderWrapper",children:Object(a.jsx)(N,{})}),Object(a.jsx)("div",{className:"dynamicCon",children:Object(a.jsxs)(l.d,{children:[Object(a.jsx)(x,{restricted:!0,component:q,exact:!0,path:"/"}),Object(a.jsx)(x,{restricted:!0,component:me,path:"/Login",exact:!0}),Object(a.jsx)(x,{restricted:!1,component:q,path:"/Home",exact:!0}),Object(a.jsx)(x,{restricted:!1,component:ne,path:"/Projects",exact:!0}),Object(a.jsx)(x,{restricted:!1,component:J,path:"/AboutMe",exact:!0}),Object(a.jsx)(x,{restricted:!1,component:$,path:"/Project/:id",exact:!0}),Object(a.jsx)(O,{component:ge,path:"/EditProject/:id",exact:!0})]})})]}),Object(a.jsx)(A,{})]})})})},xe=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,308)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),o(e),c(e),s(e)}))};r.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(Oe,{})}),document.getElementById("root")),xe()},7:function(e,t){e.exports={backend:"https://www.mattboan.com",frontend:"https://www.mattboan.com"}}},[[306,1,2]]]);
//# sourceMappingURL=main.de3f8113.chunk.js.map