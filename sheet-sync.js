(function(root){
'use strict';
const text=v=>String(v??'').trim();
const norm=v=>text(v).normalize('NFKD').toLowerCase().replace(/[’‘]/g,"'").replace(/[^a-z0-9]/g,'');
const aliases={thelastempressorempressdignity:'thelastempress',anotheroh:'anotherohhaeyoung'};
const key=v=>aliases[norm(v)]||norm(v);
function csv(input){let rows=[],row=[],cell='',quoted=false;input=input.replace(/^\uFEFF/,'');for(let i=0;i<input.length;i++){let c=input[i];if(c==='"'){if(quoted&&input[i+1]==='"'){cell+='"';i++;}else if(!quoted&&cell!=='')throw Error('Invalid CSV');else quoted=!quoted;}else if(!quoted&&(c===','||c==='\n'||c==='\r')){row.push(cell);cell='';if(c!==','){rows.push(row);row=[];if(c==='\r'&&input[i+1]==='\n')i++;}}else cell+=c;}if(quoted)throw Error('Incomplete CSV');if(cell||row.length){row.push(cell);rows.push(row);}return rows;}
function headers(rows,required){const h=rows[0]?.map(norm)||[];return required.map(n=>{const i=h.indexOf(norm(n));if(i<0)throw Error('Sheet column missing: '+n);return i;});}
function merge(source,meta,base){
 const [a,b,c,d,e,f]=headers(source,['WATCHED DRAMAS','RATINGS','TOP 15 FAVORITES','MUST WATCH KDRAMAS','MOVIES','RATING']);
 const [mi,mt,mk,ms,mr,msp,ma,mc,mst,madd]=headers(meta,['ID','Title','Type','Score / 10','Review','Contains spoilers','Poster URL','Country','Source title','Added at']);
 const known=new Map(),details=new Map(),items=new Map(),blank=[];
 base.items.forEach(i=>[i.title,...i.sourceEntries.map(e=>e.sourceTitle)].forEach(t=>known.set(i.kind+':'+key(t),i)));
 meta.slice(1).forEach(r=>{const kind=text(r[mk]).toLowerCase();if(!['movie','drama'].includes(kind))return;const t=text(r[mst])||text(r[mt]);if(t)details.set(kind+':'+key(t),r);});
 function add(title,rating,kind,row,watchlist=false){title=text(title);rating=text(rating);if(!title){if(rating)blank.push({sourceRow:row,sourceRating:rating});return;}
 const k=kind+':'+key(title),old=known.get(k),m=details.get(k);let i=items.get(k);if(i&&watchlist)return;
 if(!i){const id=m&&/^[a-zA-Z0-9_-]+$/.test(text(m[mi]))?text(m[mi]):old?.id||kind+'-sheet-'+key(title);i={id,title:m?text(m[mt])||title:old?.title||title,kind,country:m?text(m[mc]):old?.country||'',grade:'',score:null,status:'Unrated',favorite:false,favoriteRank:null,review:m?text(m[mr]):'',containsSpoilers:m?/^(true|yes|1)$/i.test(text(m[msp])):false,art:m?text(m[ma]):old?.art||'',posterSource:old?.posterSource||'',posterTitle:old?.posterTitle||'',sourceEntries:[],addedAt:m?text(m[madd]):''};
 if(m&&text(m[ms])!==''){i.score=Number(m[ms]);if(!Number.isFinite(i.score)||i.score<0||i.score>10)throw Error('Invalid score for '+title);}
 if(i.art&&!/^https:\/\//i.test(i.art))throw Error('Invalid poster URL for '+title);
 // Only carry curated artwork when the identity still matches the source title.
 i.posterOverride=!!(m&&text(m[ma])&&text(m[ma])!==old?.art);items.set(k,i);}
 if(!watchlist){i.sourceEntries.push({sourceTitle:title,sourceRating:rating,sourceRow:row});i.status=/in\s*progress|watching/i.test(rating)?'Watching':/unfinished|never\s*finished|didn.?t\s*complete/i.test(rating)?'Unfinished':rating?'Completed':'Unrated';i.grade=['Watching','Unfinished'].includes(i.status)?'':rating;}else{i.status='Watchlist';i.sourceEntries.push({sourceTitle:title,sourceRating:'',sourceRow:row});}
 }
 source.slice(1).forEach((r,n)=>{add(r[a],r[b],'drama',n+2);add(r[e],r[f],'movie',n+2);});
 source.slice(1).forEach((r,n)=>{if(text(r[d]))add(r[d],'','drama',n+2,true);if(text(r[c])){const i=items.get('drama:'+key(r[c]))||[...items.values()].find(i=>i.kind==='drama'&&key(i.title)===key(r[c]));if(i){i.favorite=true;i.favoriteRank=n+1;}}});
 if(!items.size)throw Error('Sheet is empty');
 return {...base,updatedAt:new Date().toISOString().slice(0,10),items:[...items.values()],importNotes:{blankTitleRatings:blank}};
}
const cache=new Map();
async function posters(data,fetcher=fetch){
 const pending=data.items.filter(i=>i.kind==='drama'&&!i.art);
 async function worker(){while(pending.length){const item=pending.shift();const query=item.title.replace(/\s*\((?:C|K)\s*Drama\)\s*/ig,'').trim(),k=key(query);try{let match=cache.get(k);if(match===undefined){const response=await fetcher('https://api.tvmaze.com/search/shows?q='+encodeURIComponent(query),{signal:AbortSignal.timeout(10000)});if(!response.ok)continue;const results=await response.json();const exact=results.map(r=>r.show).filter(s=>key(s.name)===k&&s.image?.medium&&(!item.country||s.network?.country?.name===item.country||s.webChannel?.country?.name===item.country||s.language===({'South Korea':'Korean','China':'Chinese'}[item.country])));match=exact.length===1?exact[0]:null;cache.set(k,match);}if(match){item.art=match.image.medium;item.posterSource=match.url;item.posterTitle=match.name;}}catch(error){/* Keep a labeled fallback; never guess an image. */}}}
 await Promise.all([worker(),worker(),worker()]);return data;
}
const api={csv,merge,posters};if(typeof module!=='undefined')module.exports=api;else root.ShelfSheetSync=api;
})(typeof window==='undefined'?{}:window);
