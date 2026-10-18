"use strict";
(function () {
const STORAGE = "scenequest-happylearning-v1";
const VOCAB = {
"chicken out":{meaning:"Decide not to do something because you are afraid.",zh:"临阵退缩",level:"B2",example:"I wanted to ask for feedback, but I chickened out.",forms:["chicken out","chickened out","chickens out"]},
"bring up":{meaning:"Introduce a topic into a conversation.",zh:"提起（话题）",level:"B1+",example:"I didn't want to bring up the deadline.",forms:["bring up","brought up","bringing up","bring it up","brought it up"]},
"figure out":{meaning:"Understand something or find a solution.",zh:"弄明白",level:"B1",example:"We finally figured out what went wrong.",forms:["figure out","figured out","figuring out"]},
"come across as":{meaning:"Give other people a particular impression.",zh:"给人……的印象",level:"B2",example:"I don't want to come across as pushy.",forms:["come across as","came across as","comes across as","coming across as"]},
"speak up":{meaning:"Express your opinion, especially when it feels difficult.",zh:"大胆说出意见",level:"B1+",example:"She decided to speak up during the meeting.",forms:["speak up","spoke up","speaking up"]},
"put off":{meaning:"Delay doing something until later.",zh:"推迟",level:"B1+",example:"I've been putting off that difficult conversation.",forms:["put off","putting off","puts off"]},
"give it a shot":{meaning:"Try something, even if you are not sure it will work.",zh:"试试看",level:"B2",example:"I'm nervous about the interview, but I'll give it a shot.",forms:["give it a shot","gave it a shot","giving it a shot"]},
"hold back":{meaning:"Stop yourself from speaking or acting.",zh:"克制；有所保留",level:"B2",example:"Don't hold back if you have a good idea.",forms:["hold back","held back","holding back"]},
"follow up":{meaning:"Contact someone again or take additional action.",zh:"跟进",level:"B1+",example:"I'll follow up with my manager tomorrow.",forms:["follow up","followed up","following up"]}
};
const CLIPS = [
 {id:"9ifQ3xRz4hM",title:"Learning multiple languages",source:"BBC Learning English",level:"B1–B2",category:"Conversation",start:0,end:300,icon:"◎",description:"BBC presenters discuss whether learning several languages benefits us. Watch the first five minutes.",question:"What benefits or challenges of learning languages did the speakers mention?"},
 {id:"1kRbLOEICOQ",title:"Greatest Moments! | Friends",source:"Warner Bros. TV",level:"B2–C1",category:"Sitcom",start:0,end:300,icon:"✳",description:"A compilation of official Friends scenes. Watch a five-minute excerpt for natural dialogue, humor, and reactions.",question:"Describe one misunderstanding or reaction you noticed. What did the character really mean?"},
 {id:"P2jvBE6DiHo",title:"How quickly can you learn English?",source:"BBC Learning English",level:"B1–B2",category:"Conversation",start:0,end:300,icon:"↗",description:"BBC presenters discuss language-learning techniques. Watch a five-minute excerpt.",question:"Which technique did you hear, and how could you apply it to your learning?"}
];
const STORY = {
intro:{stage:0,place:"THE COFFEE SHOP",speaker:"EMMA",line:"I was going to bring it up yesterday, but I chickened out.",mood:"She looks worried.",prompt:"Emma wants to ask her manager for a promotion. How do you respond?",choices:[
{text:"That sounds stressful. What held you back?",next:"support",score:2,feedback:"You acknowledge her feelings and invite her to explain.",journal:"You listened before giving advice."},
{text:"Just ask! It's not that complicated.",next:"pressure",score:-1,feedback:"Direct advice is understandable, but it may make Emma feel judged.",journal:"Emma feels a little pressured."},
{text:"You and me both. Difficult conversations are scary.",next:"relate",score:1,feedback:"Sharing an experience helps her feel less alone.",journal:"You connected with Emma's experience."}]},
support:{stage:1,place:"THE COFFEE SHOP",speaker:"EMMA",line:"I don't want to come across as pushy. My manager is always so busy.",mood:"Emma opens up.",prompt:"What would help Emma most?",choices:[
{text:"Maybe you could ask for a short meeting and explain your contributions.",next:"rehearsal",score:2,feedback:"Specific, respectful advice gives Emma an actionable next step.",journal:"You suggested a practical plan."},
{text:"Then perhaps you should wait another six months.",next:"rehearsal",score:-1,feedback:"Waiting might be reasonable, but you haven't explored her options.",journal:"You encouraged waiting."}]},
pressure:{stage:1,place:"THE COFFEE SHOP",speaker:"EMMA",line:"I know it sounds easy to you, but I don't want to come across as pushy.",mood:"She pulls away slightly.",prompt:"Can you repair the conversation?",choices:[
{text:"You're right. I shouldn't have dismissed your concern. What's the hardest part?",next:"rehearsal",score:2,feedback:"Acknowledging the mistake can rebuild trust.",journal:"You repaired the conversation."},
{text:"You're overthinking it. Just get it done.",next:"rehearsal",score:-2,feedback:"Dismissive language increases tension.",journal:"Emma becomes more hesitant."}]},
relate:{stage:1,place:"THE COFFEE SHOP",speaker:"EMMA",line:"Exactly! I don't want to come across as pushy. What did you do?",mood:"Emma is curious.",prompt:"How do you turn empathy into support?",choices:[
{text:"I prepared my main points and asked for a good time to talk.",next:"rehearsal",score:2,feedback:"You share a concrete strategy without taking over.",journal:"You shared a useful technique."},
{text:"Honestly, I just kept putting it off.",next:"rehearsal",score:0,feedback:"It's a natural admission, but Emma still needs a way forward.",journal:"You were candid about your experience."}]},
rehearsal:{stage:2,place:"A FEW MINUTES LATER",speaker:"EMMA",line:"Okay, give it a shot with me. Pretend you're my manager. How should I start?",mood:"It's time to rehearse.",prompt:"Choose the opening that sounds confident and professional.",choices:[
{text:"Could we schedule a time to discuss my work and growth opportunities?",next:"follow",score:2,feedback:"Clear, specific and polite. This creates an opening without making demands.",journal:"You helped Emma rehearse a professional request."},
{text:"I deserve a promotion, and I want an answer immediately.",next:"follow",score:-1,feedback:"This may come across as confrontational before any discussion begins.",journal:"Your opening sounded too forceful."},
{text:"Sorry to bother you. This is probably a terrible idea, but...",next:"follow",score:0,feedback:"Excessive apologies weaken an otherwise reasonable request.",journal:"Your opening lacked confidence."}]},
follow:{stage:3,place:"THE NEXT DAY / TEXT MESSAGE",speaker:"EMMA",line:"My manager agreed to meet! I almost held back, but I spoke up.",mood:"A new message appears.",prompt:"What do you text back?",choices:[
{text:"That's great! Prepare two examples of your impact, and follow up afterward.",next:"end",score:2,feedback:"You celebrate her progress and offer practical next steps.",journal:"You helped Emma prepare for her meeting."},
{text:"See? It was nothing. You worried for no reason.",next:"end",score:-1,feedback:"The result was positive, but minimizing her feelings can hurt trust.",journal:"Your reply minimized Emma's fears."},
{text:"Congratulations! I'm proud you gave it a shot.",next:"end",score:1,feedback:"A warm, natural message of encouragement.",journal:"You celebrated Emma's courage."}]}
};
const $ = (id) => document.getElementById(id);
const initial = {level:"B1–B2",xp:0,words:{},sentences:[],reflections:{},understanding:{},completedStory:false,story:{node:"intro",confidence:0,journal:[],finished:false},clip:CLIPS[0].id};
let data;
try { data = JSON.parse(localStorage.getItem(STORAGE)) || {}; } catch(e){data={};}
data = Object.assign({},initial,data);
data.words = data.words && typeof data.words === "object" ? data.words : {};
data.sentences = Array.isArray(data.sentences) ? data.sentences : [];
data.reflections = data.reflections && typeof data.reflections === "object" ? data.reflections : {};
data.understanding = data.understanding && typeof data.understanding === "object" ? data.understanding : {};
if (!data.story || !STORY[data.story.node] && data.story.node !== "end") data.story = Object.assign({},initial.story);
let activePage = "discover", currentClip = CLIPS.find(c=>c.id === data.clip) || CLIPS[0], currentWord = null, selectedChoice = null;
let recallWord = null, showRecallAnswer = false;
function store() {try{localStorage.setItem(STORAGE,JSON.stringify(data))}catch(e){console.warn("Saving progress unavailable",e)}}
function xp(amount){data.xp+=amount;store(); $("head-xp").textContent="✦ "+data.xp+" XP"; $("stat-xp").textContent=data.xp+" XP"}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function go(page){
 activePage = page;
 document.querySelectorAll(".page").forEach(el=>el.classList.toggle("active",el.id==="page-"+page));
 document.querySelectorAll("[data-go]").forEach(el=>{el.classList.toggle("active",el.dataset.go===page);if(el.classList.contains("navbtn"))el.setAttribute("aria-current",el.dataset.go===page?"page":"false")});
 if(page==="watch")renderWatch();
 if(page==="story")renderStory();
 if(page==="notebook")renderNotebook();
 window.scrollTo({top:0,behavior:"instant"});
 try{history.replaceState(null,"","#"+page)}catch(e){}
}
function saveWord(key){
 if (!VOCAB[key])return;
 if(!data.words[key]){data.words[key]={box:0,due:Date.now(),added:Date.now()};xp(8)}
 store();renderStoryWords();renderSavedWords();
}
function detailHtml(key){const v=VOCAB[key];return "<div class='definition'><strong>"+escapeHtml(key)+"</strong> <span class='small-muted'>"+escapeHtml(v.level)+" · "+escapeHtml(v.zh)+"</span><p>"+escapeHtml(v.meaning)+"</p><p><em>"+escapeHtml(v.example)+"</em></p><button class='button compact primary' data-saveword='"+escapeHtml(key)+"'>"+(data.words[key]?"Saved ✓":"Save expression +8 XP")+"</button></div>"}
function renderWatch(){
 $("catalog").innerHTML=CLIPS.map(c=>"<button class='catalog-item"+(c.id===currentClip.id?" active":"")+"' data-clip='"+c.id+"'><span class='catalog-icon'>"+c.icon+"</span><span><strong>"+escapeHtml(c.title)+"</strong><small>"+escapeHtml(c.source)+" · "+escapeHtml(c.level)+" · First 5 min</small></span></button>").join("");
 $("video-title").textContent=currentClip.title;
 $("video-description").textContent=currentClip.description;
 $("video-meta").innerHTML="<span class='chip'>"+escapeHtml(currentClip.source)+"</span><span class='chip'>"+escapeHtml(currentClip.level)+"</span><span class='chip'>5 min segment</span>";
 const src="https://www.youtube-nocookie.com/embed/"+encodeURIComponent(currentClip.id)+"?playsinline=1&rel=0&start="+currentClip.start+"&end="+currentClip.end;
 const iframe=document.createElement("iframe");iframe.src=src;iframe.title=currentClip.title;iframe.loading="lazy";iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";iframe.referrerPolicy="strict-origin-when-cross-origin";iframe.allowFullscreen=true;
 $("video-frame").replaceChildren(iframe);
 $("watch-mission").textContent="Your listening mission: "+(currentClip.question||"Tell the story in your own words.");
 const rating=data.understanding[currentClip.id];
 $("understanding-message").textContent=rating?("Your last assessment: "+rating+"% understood. Choose a new rating if it changes."):"";
 document.querySelectorAll("[data-understood]").forEach(el=>el.classList.toggle("chosen",Number(el.dataset.understood)===rating));
 const external=document.createElement("a");external.href="https://www.youtube.com/watch?v="+currentClip.id;external.target="_blank";external.rel="noopener noreferrer";external.textContent="Open on YouTube ↗";
 $("video-meta").appendChild(external);
 $("reflection").value=data.reflections[currentClip.id]||"";
 $("reflection-message").textContent=data.reflections[currentClip.id]?"Your earlier reflection was restored.":"";
 $("custom-message").textContent="YouTube controls subtitles. The video owner may prevent embedding.";
}
function rateUnderstanding(value){
 const previous=data.understanding[currentClip.id];data.understanding[currentClip.id]=value;
 if(!previous)xp(5);store();
 document.querySelectorAll("[data-understood]").forEach(el=>el.classList.toggle("chosen",Number(el.dataset.understood)===value));
 $("understanding-message").textContent=value<60?"Try again with captions and focus on the main idea.":value<85?"Good challenge. Rewatch one confusing moment, then retell it.":"Strong comprehension. Try a harder clip or summarize without subtitles.";
 }
function loadCustom(){
 let id;const value=$("video-url").value.trim();
 try{const url=new URL(value);const host=url.hostname.toLowerCase().replace(/^www\./,"").replace(/^m\./,"");if(host==="youtu.be")id=url.pathname.split("/")[1];else if(["youtube.com","youtube-nocookie.com"].includes(host)){id=url.searchParams.get("v")||url.pathname.match(/\/(?:shorts|embed|live)\/([^/?]+)/)?.[1]}}catch(e){}
 if(!id || !/^[A-Za-z0-9_-]{11}$/.test(id)){$("custom-message").textContent="Please paste a valid YouTube video link.";return}
 currentClip={id,title:"Your chosen YouTube video",source:"YouTube",level:data.level,category:"Custom",start:0,end:300,description:"A five-minute selection from your video. The story and learning questions are yours to explore.",question:"Summarize what you understood and note one unfamiliar phrase."};
 data.clip=id;store();renderWatch();$("custom-message").textContent="Custom clip loaded. No automatic captions or vocabulary extraction in this version.";
}
function renderStoryWords(){
 $("story-vocab").innerHTML=["chicken out","bring up","come across as","give it a shot","speak up","hold back","follow up"].map(k=>"<button class='vocab-item' data-storyword='"+k+"'><span><strong>"+escapeHtml(k)+"</strong><small>"+escapeHtml(VOCAB[k].zh)+"</small></span><span>"+(data.words[k]?"✓":"＋")+"</span></button>").join("");
}
function renderStory(){
 const s=data.story;
 $("confidence-chip").textContent="Confidence: "+s.confidence;
 $("choice-journal").innerHTML=(s.journal||[]).map((t,i)=>"<div><span class='small-muted'>CHOICE "+(i+1)+"</span><br>"+escapeHtml(t)+"</div>").join("");
 renderStoryWords();
 if(s.finished || s.node==="end"){
 $("scene-label").textContent="THE NEXT CHAPTER";
 $("scene-count").textContent="THE END";$("speaker").textContent="NARRATOR";
 const high=s.confidence>=6,med=s.confidence>=3;
 $("line").textContent=high?"Emma feels prepared. She has a plan, and she knows she can speak for herself.":med?"Emma is still nervous, but she has decided to give the conversation a chance.":"Emma is uncertain. She wants to try, but she needs more time and encouragement.";
 $("scene-mood").textContent=high?"Hopeful ending":med?"Thoughtful ending":"Uncertain ending";
 $("choice-prompt").textContent="Your story is complete.";
 $("choice-type").textContent="CHAPTER COMPLETED";
 $("choices").innerHTML="<div class='feedback'>You made "+(s.journal||[]).length+" decisions. Try again to explore a different outcome.</div>";
 $("choice-feedback").classList.add("hidden");$("next-scene").classList.add("hidden");
 $("story-result").textContent="Final confidence: "+s.confidence;
 $("story-progress").style.width="100%";
 $("progress-note").textContent="Explore a different branch by restarting.";
 return;
 }
 const node=STORY[s.node]||STORY.intro;
 $("scene-label").textContent=node.place;$("scene-count").textContent="Scene "+(node.stage+1)+" / 4";
 $("speaker").textContent=node.speaker;$("line").textContent=node.line;$("scene-mood").textContent=node.mood;
 $("choice-prompt").textContent=node.prompt;$("choice-type").textContent="YOUR NEXT MOVE";
 $("story-progress").style.width=((node.stage+1)/4*100)+"%";
 $("progress-note").textContent=node.stage===0?"Meet Emma and hear her problem.":"Your responses shape Emma's confidence.";
 $("choices").innerHTML=node.choices.map((c,i)=>"<button class='choice' data-choice='"+i+"'><span class='small-muted'>"+String.fromCharCode(65+i)+"</span>&nbsp;&nbsp;"+escapeHtml(c.text)+"</button>").join("");
 $("choice-feedback").classList.add("hidden");$("choice-feedback").classList.remove("warn");$("choice-feedback").textContent="";
 $("next-scene").classList.add("hidden");
 $("story-result").textContent="";
 selectedChoice=null;
}
function choose(i){
 if(selectedChoice!==null)return;
 const node=STORY[data.story.node];if(!node || !node.choices[i])return;
 selectedChoice=i;const choice=node.choices[i];
 document.querySelectorAll("#choices .choice").forEach((el,j)=>{el.disabled=true;if(j===i)el.classList.add(choice.score<0?"notideal":"chosen")});
 $("choice-feedback").textContent=choice.feedback+" "+(choice.score>0?"+":"")+choice.score+" confidence.";
 $("choice-feedback").classList.toggle("warn",choice.score<0);
 $("choice-feedback").classList.remove("hidden");
 $("next-scene").classList.remove("hidden");
}
function nextScene(){
 if(selectedChoice===null)return;
 const choice=STORY[data.story.node].choices[selectedChoice];
 data.story.confidence+=choice.score;
 data.story.journal=(data.story.journal||[]).concat(choice.journal);
 data.story.node=choice.next;
 if(choice.next==="end"){
 data.story.finished=true;
 if(!data.completedStory){data.completedStory=true;xp(60)}
 }
 store();renderStory();
}
function speakLine(){
 if(!("speechSynthesis" in window)){$("story-result").textContent="Audio reading is not supported by this browser.";return}
 const text=$("line").textContent;window.speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(text);utter.lang="en-US";utter.rate=.88;window.speechSynthesis.speak(utter);
}
function renderSavedWords(){
 const keys=Object.keys(data.words).filter(k=>VOCAB[k]);$("saved-count").textContent=keys.length;
 $("sentences-count").textContent=data.sentences.length;
 $("saved-words").innerHTML=keys.length?keys.map(k=>"<div class='saved-item'><div><strong>"+escapeHtml(k)+"</strong><small>"+escapeHtml(VOCAB[k].zh)+" · "+escapeHtml(VOCAB[k].meaning)+"</small></div><button data-remove='"+escapeHtml(k)+"'>Remove</button></div>").join(""):"<p>No expressions saved yet. Play a story or add starter phrases.</p>";
 const select=$("sentence-expression");const selected=select.value;select.innerHTML=keys.map(k=>"<option value='"+escapeHtml(k)+"'>"+escapeHtml(k)+"</option>").join("");
 if(keys.includes(selected))select.value=selected;
 $("sentence-feedback").textContent="";
}
function renderNotebook(){renderSavedWords();$("stat-xp").textContent=data.xp+" XP";renderRecall()}
function renderRecall(){
 const keys=Object.keys(data.words).filter(k=>VOCAB[k]);
 $("recall-actions").innerHTML="";$("recall-content").innerHTML="";
 if(!keys.length){$("recall-content").innerHTML="<p>Save some expressions to start reviewing them.</p>";return}
 const due=keys.filter(k=>data.words[k].due<=Date.now());
 if(!recallWord || !keys.includes(recallWord) || (due.length && !due.includes(recallWord))){
 recallWord=(due.length?due:keys).sort((a,b)=>data.words[a].due-data.words[b].due)[0];showRecallAnswer=false;
 }
 const word=VOCAB[recallWord];
 $("recall-content").innerHTML="<div class='recall-card'>"+escapeHtml(recallWord)+"</div><p>What does this expression mean? Say the meaning aloud, then check.</p>"+(showRecallAnswer?"<div class='recall-reveal'><strong>"+escapeHtml(word.zh)+"</strong><p>"+escapeHtml(word.meaning)+"</p><em>"+escapeHtml(word.example)+"</em></div>":"");
 $("recall-actions").innerHTML=showRecallAnswer?"<button class='button outline compact' id='recall-again'>Not yet</button><button class='button primary compact' id='recall-good'>I remembered</button>":"<button class='button primary compact' id='recall-reveal'>Reveal meaning</button>";
 const dueCount=due.length;
 $("recall-content").insertAdjacentHTML("beforeend","<p class='small-muted' style='margin-top:15px'>"+(dueCount?dueCount+" expression(s) due now.":"Nothing due right now. You can review early.")+"</p>");
}
function rateRecall(remembered){
 const w=data.words[recallWord];if(!w)return;
 w.box=remembered?Math.min((w.box||0)+1,4):0;
 const days=[1,3,7,14,30][w.box];
 w.due=Date.now()+days*86400000;
 if(remembered)xp(3);
 recallWord=null;showRecallAnswer=false;store();renderRecall();
}
function saveSentence(){
 const key=$("sentence-expression").value, sentence=$("sentence-input").value.trim();
 if(!VOCAB[key]){$("sentence-feedback").textContent="Save an expression first.";return}
 if(sentence.length<15){$("sentence-feedback").textContent="Write a full sentence of at least 15 characters.";return}
 const forms=VOCAB[key].forms;
 const used=forms.some(f=>sentence.toLowerCase().includes(f));
 if(!used){$("sentence-feedback").textContent="Try including '"+key+"' (or a natural variation) in your sentence.";return}
 data.sentences.push({word:key,text:sentence,time:Date.now()});
 $("sentence-input").value="";xp(12);store();$("sentences-count").textContent=data.sentences.length;
 $("sentence-feedback").textContent="Saved! +12 XP. This checks phrase presence, not grammar or meaning.";
}
function saveReflection(){
 const text=$("reflection").value.trim();if(text.length<25){$("reflection-message").textContent="Write at least 25 characters about what you heard.";return}
 const wasSaved=Boolean(data.reflections[currentClip.id]);data.reflections[currentClip.id]=text;
 if(!wasSaved)xp(20);store();
 $("reflection-message").textContent=wasSaved?"Reflection updated.":"Reflection saved! +20 XP.";
}
document.addEventListener("click",e=>{
 const nav=e.target.closest("[data-go]");if(nav){go(nav.dataset.go);return}
 const understood=e.target.closest("[data-understood]");if(understood){rateUnderstanding(Number(understood.dataset.understood));return}
 const clip=e.target.closest("[data-clip]");if(clip){const next=CLIPS.find(c=>c.id===clip.dataset.clip);if(next){currentClip=next;data.clip=next.id;store();renderWatch()}return}
 const wordButton=e.target.closest("[data-expression]");if(wordButton){currentWord=wordButton.dataset.expression;$("expression-popover").innerHTML=detailHtml(currentWord);return}
 const saved=e.target.closest("[data-saveword]");if(saved){saveWord(saved.dataset.saveword);$("expression-popover").innerHTML=detailHtml(saved.dataset.saveword);return}
 const storyWord=e.target.closest("[data-storyword]");if(storyWord){const word=storyWord.dataset.storyword;saveWord(word);$("progress-note").textContent=word+": "+VOCAB[word].meaning;return}
 const choice=e.target.closest("[data-choice]");if(choice){choose(Number(choice.dataset.choice));return}
 const remove=e.target.closest("[data-remove]");if(remove){delete data.words[remove.dataset.remove];recallWord=null;store();renderNotebook();return}
 if(e.target.id==="recall-reveal"){showRecallAnswer=true;renderRecall()}
 if(e.target.id==="recall-again")rateRecall(false);
 if(e.target.id==="recall-good")rateRecall(true);
});
$("level-select").value=data.level;$("head-level").textContent=data.level;
$("level-select").addEventListener("change",e=>{data.level=e.target.value;$("head-level").textContent=data.level;currentClip=data.level==="B2–C1"?CLIPS[1]:CLIPS[0];data.clip=currentClip.id;store()});
$("load-custom").addEventListener("click",loadCustom);
$("save-reflection").addEventListener("click",saveReflection);
$("next-scene").addEventListener("click",nextScene);
$("restart-story").addEventListener("click",()=>{if("speechSynthesis" in window)window.speechSynthesis.cancel();data.story={node:"intro",confidence:0,journal:[],finished:false};store();renderStory()});
$("speak-line").addEventListener("click",speakLine);
$("seed-vocab").addEventListener("click",()=>{["bring up","chicken out","figure out"].forEach(saveWord);renderNotebook()});
$("check-sentence").addEventListener("click",saveSentence);
$("head-xp").textContent="✦ "+data.xp+" XP";
const start=location.hash.replace("#","");go(["discover","watch","story","notebook"].includes(start)?start:"discover");
})();
