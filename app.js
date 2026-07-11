import { raidConfig, raidThemes } from "./raids-data.js";
/* PAGE ELEMENT REFERENCES */
const els={startDate:document.querySelector("#startDate"),endDate:document.querySelector("#endDate"),prize:document.querySelector("#prize"),submissionRules:document.querySelector("#submissionRules"),syncStatus:document.querySelector("#syncStatus"),tileDialog:document.querySelector("#tileDialog"),dialogCard:document.querySelector("#dialogCard"),dialogImage:document.querySelector("#dialogImage"),dialogStatus:document.querySelector("#dialogStatus"),dialogTitle:document.querySelector("#dialogTitle"),dialogDescription:document.querySelector("#dialogDescription"),dialogRequirements:document.querySelector("#dialogRequirements"),dialogRequirementsWrap:document.querySelector("#dialogRequirementsWrap"),dialogCompletedBy:document.querySelector("#dialogCompletedBy"),dialogCompletedByWrap:document.querySelector("#dialogCompletedByWrap"),tileTemplate:document.querySelector("#tileTemplate")};
/* HELPER: show player name after completed tile title */
function shownTitle(t){return t.completed&&t.completedBy?.trim()?`${t.title} - ${t.completedBy.trim()}`:t.title}
/* HELPER: shrink long titles */
function fitTitle(e,t){let s=.78;if(t.length>55)s=.52;else if(t.length>45)s=.58;else if(t.length>35)s=.64;else if(t.length>27)s=.69;else if(t.length>20)s=.73;e.style.fontSize=`${s}rem`}
/* HELPER: calculate bar width, capped at 100% */
function pct(c,g){return g<=0?0:Math.min(c/g*100,100)}
/* APPLY RAID COLORS TO A TILE */
function styleTile(e,r,done){const x=raidThemes[r];e.style.background=done?x.mid:x.dark;e.style.borderColor=done?x.light:x.accent;e.style.color=x.text;const c=e.querySelector(".completion-check");c.style.background=x.light;c.style.color=x.dark}
/* UPDATE ONE KC PROGRESS BAR */
function progress(box,d,r){const p=pct(d.currentKC,d.goalKC);box.querySelector(".progress-count").textContent=`${d.currentKC} / ${d.goalKC} KC`;box.querySelector(".progress-percent").textContent=`${Math.round(p)}%`;const f=box.querySelector(".progress-fill");f.style.width=`${p}%`;f.style.background=raidThemes[r].light}
/* OPEN EXPANDED TILE */
function openTile(team,r,i){const t=raidConfig.teams[team].raids[r].tiles[i],x=raidThemes[r];els.dialogImage.src=t.image||"images/tile-placeholder.svg";els.dialogImage.alt=t.title;els.dialogTitle.textContent=t.title;els.dialogDescription.textContent=t.description;els.dialogRequirements.textContent=t.requirements||"";els.dialogRequirementsWrap.classList.toggle("hidden",!t.requirements);els.dialogStatus.textContent=t.completed?"Completed":"Incomplete";els.dialogStatus.style.background=x.light;els.dialogStatus.style.color=x.dark;const by=t.completedBy?.trim();els.dialogCompletedByWrap.classList.toggle("hidden",!(t.completed&&by));els.dialogCompletedBy.textContent=by||"";els.dialogCard.style.borderColor=x.accent;els.dialogTitle.style.color=x.light;els.tileDialog.showModal()}
/* CLOSE WHEN CLICKING OUTSIDE THE CARD */
els.tileDialog.addEventListener("click",e=>{if(e.target===els.tileDialog)els.tileDialog.close()});
/* BUILD ONE TEAM'S ROW FOR ONE RAID */
/*
  Team One tiles are displayed left-to-right.
  Team Two uses CSS direction: rtl, so its tiles and progress fill right-to-left.
*/
function renderRaidTeam(team,r){const d=raidConfig.teams[team].raids[r],box=document.querySelector(`#${team}-${r}-panel`),grid=document.querySelector(`#${team}-${r}-grid`),x=raidThemes[r];box.style.borderColor=x.accent;box.style.background=x.dark;grid.textContent="";d.tiles.forEach((t,i)=>{const f=els.tileTemplate.content.cloneNode(true),b=f.querySelector(".raid-tile"),im=f.querySelector(".tile-image"),tt=f.querySelector(".tile-title"),n=f.querySelector(".tile-number");styleTile(b,r,t.completed);b.classList.toggle("completed",t.completed);im.src=t.image||"images/tile-placeholder.svg";im.addEventListener("error",()=>im.src="images/tile-placeholder.svg",{once:true});tt.textContent=shownTitle(t);fitTitle(tt,tt.textContent);n.textContent = team === "teamTwo" ? d.tiles.length - i : i + 1;b.addEventListener("click",()=>openTile(team,r,i));grid.appendChild(f)});progress(box,d,r)}
function render(){els.startDate.textContent=raidConfig.eventDetails.startDate;els.endDate.textContent=raidConfig.eventDetails.endDate;els.prize.textContent=raidConfig.eventDetails.prize;els.submissionRules.textContent=raidConfig.eventDetails.submissionRules;els.syncStatus.textContent="Published from GitHub";for(const r of ["cox","tob","toa"]){const s=document.querySelector(`#${r}-section`),x=raidThemes[r],h=s.querySelector(".raid-heading");s.style.borderColor=x.accent;h.style.background=x.dark;h.style.color=x.text;renderRaidTeam("teamOne",r);renderRaidTeam("teamTwo",r)}}render();
