import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as Tone from 'tone';

const QR_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" shape-rendering="crispEdges"><rect width="33" height="33" fill="#ffffff"/><g fill="#141a30"><rect x="2" y="2" width="7" height="1"/><rect x="12" y="2" width="6" height="1"/><rect x="20" y="2" width="2" height="1"/><rect x="24" y="2" width="7" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="8" y="3" width="1" height="1"/><rect x="12" y="3" width="1" height="1"/><rect x="14" y="3" width="1" height="1"/><rect x="17" y="3" width="2" height="1"/><rect x="24" y="3" width="1" height="1"/><rect x="30" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="4" y="4" width="3" height="1"/><rect x="8" y="4" width="1" height="1"/><rect x="11" y="4" width="1" height="1"/><rect x="13" y="4" width="1" height="1"/><rect x="16" y="4" width="2" height="1"/><rect x="19" y="4" width="1" height="1"/><rect x="21" y="4" width="2" height="1"/><rect x="24" y="4" width="1" height="1"/><rect x="26" y="4" width="3" height="1"/><rect x="30" y="4" width="1" height="1"/><rect x="2" y="5" width="1" height="1"/><rect x="4" y="5" width="3" height="1"/><rect x="8" y="5" width="1" height="1"/><rect x="11" y="5" width="2" height="1"/><rect x="16" y="5" width="3" height="1"/><rect x="20" y="5" width="1" height="1"/><rect x="24" y="5" width="1" height="1"/><rect x="26" y="5" width="3" height="1"/><rect x="30" y="5" width="1" height="1"/><rect x="2" y="6" width="1" height="1"/><rect x="4" y="6" width="3" height="1"/><rect x="8" y="6" width="1" height="1"/><rect x="11" y="6" width="1" height="1"/><rect x="13" y="6" width="3" height="1"/><rect x="17" y="6" width="4" height="1"/><rect x="22" y="6" width="1" height="1"/><rect x="24" y="6" width="1" height="1"/><rect x="26" y="6" width="3" height="1"/><rect x="30" y="6" width="1" height="1"/><rect x="2" y="7" width="1" height="1"/><rect x="8" y="7" width="1" height="1"/><rect x="10" y="7" width="1" height="1"/><rect x="13" y="7" width="3" height="1"/><rect x="17" y="7" width="1" height="1"/><rect x="19" y="7" width="3" height="1"/><rect x="24" y="7" width="1" height="1"/><rect x="30" y="7" width="1" height="1"/><rect x="2" y="8" width="7" height="1"/><rect x="10" y="8" width="1" height="1"/><rect x="12" y="8" width="1" height="1"/><rect x="14" y="8" width="1" height="1"/><rect x="16" y="8" width="1" height="1"/><rect x="18" y="8" width="1" height="1"/><rect x="20" y="8" width="1" height="1"/><rect x="22" y="8" width="1" height="1"/><rect x="24" y="8" width="7" height="1"/><rect x="12" y="9" width="3" height="1"/><rect x="19" y="9" width="2" height="1"/><rect x="22" y="9" width="1" height="1"/><rect x="2" y="10" width="1" height="1"/><rect x="5" y="10" width="1" height="1"/><rect x="7" y="10" width="2" height="1"/><rect x="10" y="10" width="1" height="1"/><rect x="12" y="10" width="1" height="1"/><rect x="15" y="10" width="4" height="1"/><rect x="21" y="10" width="1" height="1"/><rect x="23" y="10" width="1" height="1"/><rect x="25" y="10" width="1" height="1"/><rect x="3" y="11" width="2" height="1"/><rect x="7" y="11" width="1" height="1"/><rect x="9" y="11" width="3" height="1"/><rect x="14" y="11" width="2" height="1"/><rect x="22" y="11" width="3" height="1"/><rect x="27" y="11" width="1" height="1"/><rect x="30" y="11" width="1" height="1"/><rect x="6" y="12" width="3" height="1"/><rect x="12" y="12" width="3" height="1"/><rect x="16" y="12" width="1" height="1"/><rect x="21" y="12" width="1" height="1"/><rect x="24" y="12" width="1" height="1"/><rect x="27" y="12" width="3" height="1"/><rect x="2" y="13" width="2" height="1"/><rect x="5" y="13" width="2" height="1"/><rect x="9" y="13" width="2" height="1"/><rect x="13" y="13" width="1" height="1"/><rect x="15" y="13" width="1" height="1"/><rect x="18" y="13" width="1" height="1"/><rect x="20" y="13" width="3" height="1"/><rect x="25" y="13" width="2" height="1"/><rect x="28" y="13" width="2" height="1"/><rect x="2" y="14" width="2" height="1"/><rect x="5" y="14" width="2" height="1"/><rect x="8" y="14" width="1" height="1"/><rect x="12" y="14" width="1" height="1"/><rect x="16" y="14" width="1" height="1"/><rect x="18" y="14" width="3" height="1"/><rect x="22" y="14" width="3" height="1"/><rect x="27" y="14" width="1" height="1"/><rect x="29" y="14" width="2" height="1"/><rect x="2" y="15" width="1" height="1"/><rect x="4" y="15" width="1" height="1"/><rect x="6" y="15" width="2" height="1"/><rect x="11" y="15" width="1" height="1"/><rect x="14" y="15" width="2" height="1"/><rect x="21" y="15" width="3" height="1"/><rect x="25" y="15" width="1" height="1"/><rect x="5" y="16" width="2" height="1"/><rect x="8" y="16" width="2" height="1"/><rect x="11" y="16" width="1" height="1"/><rect x="14" y="16" width="3" height="1"/><rect x="23" y="16" width="1" height="1"/><rect x="27" y="16" width="4" height="1"/><rect x="2" y="17" width="3" height="1"/><rect x="7" y="17" width="1" height="1"/><rect x="17" y="17" width="4" height="1"/><rect x="23" y="17" width="2" height="1"/><rect x="27" y="17" width="1" height="1"/><rect x="29" y="17" width="1" height="1"/><rect x="2" y="18" width="1" height="1"/><rect x="4" y="18" width="1" height="1"/><rect x="7" y="18" width="2" height="1"/><rect x="10" y="18" width="1" height="1"/><rect x="12" y="18" width="4" height="1"/><rect x="19" y="18" width="1" height="1"/><rect x="21" y="18" width="1" height="1"/><rect x="23" y="18" width="1" height="1"/><rect x="25" y="18" width="1" height="1"/><rect x="29" y="18" width="1" height="1"/><rect x="3" y="19" width="5" height="1"/><rect x="10" y="19" width="2" height="1"/><rect x="15" y="19" width="2" height="1"/><rect x="18" y="19" width="1" height="1"/><rect x="24" y="19" width="2" height="1"/><rect x="27" y="19" width="1" height="1"/><rect x="30" y="19" width="1" height="1"/><rect x="2" y="20" width="1" height="1"/><rect x="4" y="20" width="3" height="1"/><rect x="8" y="20" width="1" height="1"/><rect x="12" y="20" width="2" height="1"/><rect x="16" y="20" width="1" height="1"/><rect x="18" y="20" width="3" height="1"/><rect x="24" y="20" width="2" height="1"/><rect x="29" y="20" width="2" height="1"/><rect x="5" y="21" width="1" height="1"/><rect x="9" y="21" width="3" height="1"/><rect x="14" y="21" width="1" height="1"/><rect x="16" y="21" width="7" height="1"/><rect x="29" y="21" width="2" height="1"/><rect x="2" y="22" width="1" height="1"/><rect x="6" y="22" width="4" height="1"/><rect x="12" y="22" width="3" height="1"/><rect x="17" y="22" width="2" height="1"/><rect x="22" y="22" width="5" height="1"/><rect x="28" y="22" width="1" height="1"/><rect x="10" y="23" width="1" height="1"/><rect x="13" y="23" width="1" height="1"/><rect x="16" y="23" width="1" height="1"/><rect x="18" y="23" width="1" height="1"/><rect x="21" y="23" width="2" height="1"/><rect x="26" y="23" width="1" height="1"/><rect x="28" y="23" width="3" height="1"/><rect x="2" y="24" width="7" height="1"/><rect x="11" y="24" width="1" height="1"/><rect x="14" y="24" width="1" height="1"/><rect x="18" y="24" width="2" height="1"/><rect x="22" y="24" width="1" height="1"/><rect x="24" y="24" width="1" height="1"/><rect x="26" y="24" width="1" height="1"/><rect x="29" y="24" width="1" height="1"/><rect x="2" y="25" width="1" height="1"/><rect x="8" y="25" width="1" height="1"/><rect x="10" y="25" width="1" height="1"/><rect x="13" y="25" width="2" height="1"/><rect x="16" y="25" width="1" height="1"/><rect x="20" y="25" width="1" height="1"/><rect x="22" y="25" width="1" height="1"/><rect x="26" y="25" width="3" height="1"/><rect x="30" y="25" width="1" height="1"/><rect x="2" y="26" width="1" height="1"/><rect x="4" y="26" width="3" height="1"/><rect x="8" y="26" width="1" height="1"/><rect x="12" y="26" width="3" height="1"/><rect x="18" y="26" width="2" height="1"/><rect x="22" y="26" width="5" height="1"/><rect x="29" y="26" width="2" height="1"/><rect x="2" y="27" width="1" height="1"/><rect x="4" y="27" width="3" height="1"/><rect x="8" y="27" width="1" height="1"/><rect x="10" y="27" width="1" height="1"/><rect x="14" y="27" width="2" height="1"/><rect x="19" y="27" width="1" height="1"/><rect x="21" y="27" width="1" height="1"/><rect x="24" y="27" width="1" height="1"/><rect x="26" y="27" width="4" height="1"/><rect x="2" y="28" width="1" height="1"/><rect x="4" y="28" width="3" height="1"/><rect x="8" y="28" width="1" height="1"/><rect x="11" y="28" width="2" height="1"/><rect x="15" y="28" width="2" height="1"/><rect x="19" y="28" width="1" height="1"/><rect x="23" y="28" width="1" height="1"/><rect x="26" y="28" width="3" height="1"/><rect x="30" y="28" width="1" height="1"/><rect x="2" y="29" width="1" height="1"/><rect x="8" y="29" width="1" height="1"/><rect x="12" y="29" width="1" height="1"/><rect x="16" y="29" width="4" height="1"/><rect x="21" y="29" width="2" height="1"/><rect x="26" y="29" width="1" height="1"/><rect x="29" y="29" width="1" height="1"/><rect x="2" y="30" width="7" height="1"/><rect x="10" y="30" width="2" height="1"/><rect x="13" y="30" width="1" height="1"/><rect x="19" y="30" width="1" height="1"/><rect x="22" y="30" width="1" height="1"/><rect x="25" y="30" width="2" height="1"/><rect x="29" y="30" width="1" height="1"/></g></svg>';
const LOGO_SVG = '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">\n<polygon points="100,6 168,44 168,120 100,158 32,120 32,44" fill="#ffffff" stroke="#d7dced" stroke-width="3"/>\n<g transform="translate(62,36)">\n<path d="M8 40 q-16 -2 -14 -20 q0 -16 17 -15 q5 -15 22 -15 q17 0 22 15 q17 -1 17 15 q2 18 -14 20 z" fill="#ffffff" stroke="#2a2f45" stroke-width="3"/>\n<rect x="6" y="40" width="56" height="13" rx="3" fill="#ffffff" stroke="#2a2f45" stroke-width="3"/>\n<circle cx="26" cy="27" r="2.6" fill="#2a2f45"/><circle cx="42" cy="27" r="2.6" fill="#2a2f45"/>\n<path d="M22 35 q12 7 24 0" fill="none" stroke="#2a2f45" stroke-width="3" stroke-linecap="round"/>\n</g>\n<line x1="128" y1="34" x2="128" y2="74" stroke="#c7cde0" stroke-width="3"/>\n<circle cx="150" cy="54" r="18" fill="#1b2a63"/>\n<text x="150" y="59" font-size="12" font-family="Georgia,serif" fill="#ffffff" text-anchor="middle" font-weight="bold">VIT</text>\n<text x="100" y="106" font-size="25" font-family="Arial,sans-serif" font-weight="900" fill="#1b1f2e" text-anchor="middle" letter-spacing="1">CODECHEF</text>\n<text x="100" y="127" font-size="15" font-family="Arial,sans-serif" font-weight="800" fill="#2f45c9" text-anchor="middle">&lt;VIT Chennai&gt;</text>\n<text x="100" y="145" font-size="15" font-family="Arial,sans-serif" font-weight="800" fill="#2f45c9" text-anchor="middle">Chapter</text>\n</svg>';
const CSS = "* { margin:0; padding:0; box-sizing:border-box; }\n  html,body { width:100%; height:100%; overflow:hidden; background:#0b1020; font-family:'Trebuchet MS',system-ui,sans-serif; color:#fff; }\n  #game { position:fixed; inset:0; }\n  canvas { display:block; }\n  #hud { position:fixed; inset:0; pointer-events:none; }\n  #topbar { position:absolute; top:14px; left:0; right:0; display:flex; justify-content:space-between; align-items:flex-start; padding:0 20px; font-weight:bold; }\n  #score { font-size:22px; text-shadow:0 2px 6px #000; }\n  #rightinfo { text-align:right; }\n  #best { font-size:16px; opacity:.85; text-shadow:0 2px 6px #000; }\n  #roundtag { font-size:15px; opacity:.95; margin-top:2px; text-shadow:0 2px 6px #000; }\n  #clock { font-size:13px; opacity:.8; margin-top:2px; text-shadow:0 2px 6px #000; }\n  #mute { pointer-events:auto; cursor:pointer; font-size:20px; background:rgba(0,0,0,.35); border-radius:8px; padding:3px 9px; margin-top:6px; display:inline-block; }\n  #announce { position:absolute; top:52px; left:0; right:0; text-align:center; }\n  #target-word { font-size:48px; font-weight:900; letter-spacing:1px; line-height:1.05; text-shadow:0 3px 12px #000; }\n  #target-word .neg { color:#ff5f5f; }\n  #target-word small { font-size:25px; opacity:.9; }\n  #target-sub { font-size:16px; opacity:.92; margin-top:4px; text-shadow:0 2px 8px #000; }\n  #timerwrap { position:absolute; bottom:22px; left:50%; transform:translateX(-50%); width:min(560px,80vw); }\n  #timerbar-bg { width:100%; height:15px; background:rgba(255,255,255,.15); border-radius:10px; overflow:hidden; border:2px solid rgba(255,255,255,.25); }\n  #timerbar { height:100%; width:100%; background:linear-gradient(90deg,#3bd16f,#ffd23f,#ff5f5f); border-radius:8px; transition:width .06s linear; }\n  #timernum { text-align:center; margin-top:5px; font-size:27px; font-weight:900; text-shadow:0 2px 8px #000; }\n  #flash { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; text-align:center; font-size:80px; font-weight:900; opacity:0; text-shadow:0 4px 18px #000; transition:opacity .12s; padding:0 20px; }\n  #compass { position:absolute; bottom:66px; left:50%; transform:translateX(-50%); font-size:16px; opacity:.9; text-shadow:0 2px 8px #000; }\n  #minimap { position:absolute; bottom:18px; right:18px; width:132px; height:132px; border-radius:50%; border:2px solid rgba(255,255,255,.35); background:rgba(6,12,26,.55); }\n  .overlay { position:fixed; inset:0; background:rgba(6,10,25,.9); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; pointer-events:auto; padding:24px; overflow:auto; }\n  .hidden { display:none !important; }\n  h1 { font-size:clamp(34px,7vw,66px); font-weight:900; line-height:1.35; padding:.22em .1em .06em; background:linear-gradient(90deg,#3bd16f,#3fa9ff,#ffd23f,#ff5fa2,#ff5f5f); -webkit-background-clip:text; background-clip:text; color:transparent; margin-bottom:2px; }\n  .sub-title { font-size:15px; letter-spacing:4px; opacity:.7; margin-bottom:14px; text-transform:uppercase; }\n  .tag { font-size:16px; opacity:.85; margin-bottom:16px; max-width:660px; line-height:1.55; }\n  button { pointer-events:auto; cursor:pointer; font-family:inherit; font-weight:900; font-size:20px; padding:13px 36px; border:none; border-radius:14px; background:linear-gradient(90deg,#ff7a3f,#ff3f6e); color:#fff; box-shadow:0 6px 0 #a01f42, 0 10px 24px rgba(0,0,0,.4); transition:transform .06s; }\n  button:active { transform:translateY(4px); box-shadow:0 2px 0 #a01f42; }\n  .controls { margin-top:16px; font-size:14px; opacity:.75; line-height:1.7; max-width:660px; }\n  kbd { background:#222b45; border:1px solid #3a466e; border-radius:6px; padding:2px 9px; font-family:inherit; }\n  .rounds { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:4px 0 12px; max-width:700px; }\n  .rc { background:rgba(255,255,255,.06); border-radius:12px; padding:10px 14px; width:158px; font-size:13px; line-height:1.45; }\n  .rc b { display:block; font-size:15px; margin-bottom:3px; }\n  #board { margin:10px 0 6px; width:min(440px,92vw); }\n  #board .row { display:flex; justify-content:space-between; gap:10px; padding:7px 14px; border-radius:8px; font-size:16px; }\n  #board .row:nth-child(odd){ background:rgba(255,255,255,.06); }\n  #board .row.me { background:rgba(255,210,63,.22); font-weight:900; }\n  #board .row span:last-child{ opacity:.85; white-space:nowrap; }\n  .go-final { font-size:23px; margin:4px 0 12px; }\n  .subtle{ font-size:13px; opacity:.6; margin-top:12px;}\n  .rank{ opacity:.6; width:26px; text-align:left; display:inline-block;}\n  #nameRow { display:flex; gap:8px; align-items:center; margin:6px 0 14px; }\n  #nameInput { font-family:inherit; font-size:17px; padding:9px 12px; border-radius:10px; border:2px solid #3a466e; background:#141a30; color:#fff; width:180px; text-align:center; }\n  #saveName { font-size:15px; padding:9px 18px; }\n  #loading { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; font-size:20px; opacity:.85; text-align:center; }\n\n/* --- React shell, welcome splash, QR --- */\n.cl-root{ position:fixed; inset:0; background:#0b1020; font-family:'Trebuchet MS',system-ui,sans-serif; color:#fff; }\n.welcome{ position:fixed; inset:0; z-index:60; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; background:radial-gradient(circle at 50% 38%, #1a2240, #06080f 72%); animation:wlfade .6s ease; padding:20px; }\n@keyframes wlfade{ from{opacity:0} to{opacity:1} }\n.wl-logo{ width:180px; height:180px; animation:wlpop .85s cubic-bezier(.2,1.5,.4,1); }\n.wl-logo svg,.wl-logo img{ width:100%; height:100%; object-fit:contain; filter:drop-shadow(0 10px 26px rgba(0,0,0,.55)); }\n@keyframes wlpop{ 0%{transform:scale(.4) rotate(-10deg);opacity:0} 100%{transform:scale(1) rotate(0);opacity:1} }\n.wl-small{ margin-top:16px; letter-spacing:7px; font-size:15px; opacity:.85; animation:wlup .6s .3s both; }\n.wl-title{ font-size:clamp(44px,10vw,84px); font-weight:900; line-height:1.28; padding:.16em .12em .04em; background:linear-gradient(90deg,#3bd16f,#3fa9ff,#ffd23f,#ff5fa2,#ff5f5f); background-size:220% auto; -webkit-background-clip:text; background-clip:text; color:transparent; animation:wlup .6s .4s both, shimmer 4s linear infinite; }\n@keyframes shimmer{ to{ background-position:220% center; } }\n.wl-chapter{ font-size:clamp(20px,4.4vw,32px); font-weight:900; color:#5b74ff; margin-top:2px; animation:wlup .6s .5s both; }\n.wl-presents{ margin:16px 0 2px; opacity:.6; letter-spacing:4px; font-size:12px; animation:wlup .6s .65s both; }\n.wl-game{ font-size:20px; font-weight:900; opacity:.92; animation:wlup .6s .78s both; }\n.wl-btn{ margin-top:24px; cursor:pointer; font-family:inherit; font-weight:900; font-size:22px; padding:14px 48px; border:none; border-radius:14px; background:linear-gradient(90deg,#ff7a3f,#ff3f6e); color:#fff; box-shadow:0 6px 0 #a01f42,0 10px 24px rgba(0,0,0,.4); animation:wlup .6s .95s both, pulse 1.7s ease-in-out 1.1s infinite; }\n.wl-btn:active{ transform:translateY(4px); box-shadow:0 2px 0 #a01f42; }\n@keyframes wlup{ from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }\n@keyframes pulse{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }\n.qrbox{ display:flex; flex-direction:column; align-items:center; margin:6px 0 10px; }\n.qr{ width:128px; height:128px; background:#fff; padding:7px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,.4); }\n.qr svg,.qr img{ width:100%; height:100%; image-rendering:pixelated; display:block; }\n.iglink{ margin-top:9px; color:#ff5fa2; font-weight:900; text-decoration:none; }\n";

// in-memory stores (browser storage is blocked in the preview sandbox)
let MEM_SCORES=[]; let MEM_NAME='Player';

// ---- adaptive music (Tone.js) ----
let musicStarted=false, musicIntensity=1, _lead,_bass,_kick,_arp;
async function startMusic(){ if(musicStarted) return; musicStarted=true;
  try{
    await Tone.start();
    _lead=new Tone.PolySynth(Tone.Synth,{oscillator:{type:'triangle'}}).toDestination(); _lead.volume.value=-15;
    _bass=new Tone.Synth({oscillator:{type:'sawtooth'}}).toDestination(); _bass.volume.value=-19;
    _kick=new Tone.MembraneSynth().toDestination(); _kick.volume.value=-10;
    _arp=new Tone.Synth({oscillator:{type:'square'}}).toDestination(); _arp.volume.value=-24;
    var chords=[['C4','E4','G4'],['A3','C4','E4'],['F3','A3','C4'],['G3','B3','D4']];
    var bassN=['C2','A1','F1','G1']; var arpN=['C5','E5','G5','B4','C6','G5','E5','C5'];
    var ci=0, ai=0;
    new Tone.Loop(function(t){ _lead.triggerAttackRelease(chords[ci%4],'2n',t); _bass.triggerAttackRelease(bassN[ci%4],'2n',t); ci++; },'2n').start(0);
    new Tone.Loop(function(t){ if(musicIntensity>=2) _arp.triggerAttackRelease(arpN[ai%arpN.length],'16n',t); ai++; },'8n').start(0);
    new Tone.Loop(function(t){ if(musicIntensity>=3) _kick.triggerAttackRelease('C2','8n',t); },'4n').start(0);
    Tone.Transport.bpm.value=92; Tone.Transport.start();
  }catch(e){ musicStarted=false; }
}
function musicPhase(p){ musicIntensity=p; if(musicStarted){ try{ Tone.Transport.bpm.rampTo(86+p*13,1.5); }catch(e){} } }
function setMusicMuted(m){ try{ Tone.Destination.mute=m; }catch(e){} }

export default function App(){
  const started=useRef(false);
  const [welcome,setWelcome]=useState(true);
  useEffect(function(){
    if(started.current) return; started.current=true;
    var rafId;

/* ================================================================
   COLOR LAVA — EMBER ISLE
   Large island, landmark biomes, ocean coast, day/night, events.
   ================================================================ */

var C = {
  GREEN:  { key:'GREEN',  hex:0x46c96a, css:'#46c96a', dir:'the FOREST (north)' },
  BROWN:  { key:'BROWN',  hex:0xa06a38, css:'#c08a4d', dir:'the RUINS (west) or village timber' },
  BLUE:   { key:'BLUE',   hex:0x3fa9ff, css:'#3fa9ff', dir:'the RIVER & LAKE (south)' },
  YELLOW: { key:'YELLOW', hex:0xffcf3a, css:'#ffd23f', dir:'the FARMLAND (south-east)' },
  PINK:   { key:'PINK',   hex:0xff6fae, css:'#ff5fa2', dir:'the CHERRY GARDEN (south-west)' },
  RED:    { key:'RED',    hex:0xf24747, css:'#ff4d4d', dir:'the VILLAGE (east)' }
};
var COLOR_KEYS=['GREEN','BROWN','BLUE','YELLOW','PINK','RED'];

var TAGS={
  cabin:['wood','house'], cottage:['house'], barn:['house'], pinkhouse:['house'], roofhouse:['house'],
  tent:['house'], gazebo:['house'], church:['house'], clocktower:['wood'],
  trunk:['wood'], fence:['wood'], crate:['wood'], bench:['wood'], log:['wood'], cartwheel:['wood'],
  dock:['wood'], watchtower:['wood'], ropebridge:['wood'], fallentree:['wood'],
  lake:['water'], river:['water'], waterfall:['water'], fountain:['water'], boat:['water'], well:['water'], pond:['water']
};
var TOUCH_R={
  lake:5, pond:3.2, river:3.4, waterfall:3, fountain:2.4, well:2.2, boat:2.4,
  barn:3.4, cabin:2.8, cottage:2.8, pinkhouse:2.8, roofhouse:2.8, church:3, gazebo:3,
  clocktower:3.6, lighthouse:3.6, statue:3.2, watchtower:3.4, windmill:3.2, arch:3,
  cherry:2.6, oak:2.6, pine:2.4, palm:2.4, tractor:2.6, hay:2.4, ropebridge:3.2
};

// Biome centers on the big island. anchors[0] is the landmark (placed at center).
var BIOMES=[
  { key:'GREEN', name:'Evergreen Forest', center:[0,-82], r:34,
    anchors:['oak','pine','bush'],
    scatter:['pine','oak','pine','bush','fern','pond','cabin','log','fern','pine','oak','bush','fern','pine','oak','fern','bush','pine'] },
  { key:'YELLOW', name:'Farmland', center:[74,54], r:30,
    anchors:['windmill','cottage','barn'],
    scatter:['wheat','hay','sunflower','scarecrow','tractor','wheat','hay','sunflower','wheat','scarecrow','hay','sunflower','wheat','tractor'] },
  { key:'BLUE', name:'River & Lake', center:[0,84], r:34,
    anchors:['waterfall','lake','dock'],
    scatter:['river','boat','fountain','river','dock','boat','river','pond','fountain','river','boat','pond'] },
  { key:'PINK', name:'Cherry Garden', center:[-74,58], r:28,
    anchors:['cherry','gazebo','pinkhouse'],
    scatter:['pinkflower','mushroom','crystal','balloon','cherry','pinkflower','lantern','cherry','pinkflower','mushroom','cherry','pinkflower'] },
  { key:'BROWN', name:'Ancient Ruins', center:[-88,-8], r:30,
    anchors:['statue','arch','trunk'],
    scatter:['arch','crate','fern','bush','arch','vinerock','fern','crate','log','fern','bush','arch'] },
  { key:'BROWN', name:'Mountain Pass', center:[70,-72], r:28,
    anchors:['watchtower','ropebridge','trunk'],
    scatter:['crate','ropebridge','log','fence','crate','log','ropebridge','crate','fence','log'] }
];

// Central all-colour VILLAGE (safe hub). Everything here is permanent.
var VILLAGE_CENTER=[46,4];
var VILLAGE=[
  ['BROWN','clocktower', 0,0],        // landmark
  ['RED','roofhouse', -9,-4], ['RED','door', 7,-8], ['RED','mailbox', 11,2], ['RED','tractor',-4,10],
  ['YELLOW','cottage', 9,6], ['YELLOW','lantern', -11,3], ['YELLOW','church', -6,11],
  ['GREEN','oak', 13,-3], ['GREEN','bush', -13,-7],
  ['BROWN','fence', 3,9], ['BROWN','cabin', -9,8], ['BROWN','bench', 6,-2],
  ['BLUE','well', -3,-9], ['BLUE','fountain', 4,3],
  ['PINK','gazebo', 12,10], ['PINK','pinkflower', -14,-1]
];

var R_LAND=104, CLAMP_R=100, PLAYER_SPEED=19;

var scene,camera,renderer,clock;
var player,volcano,crater,lavaMesh,lavaGlow,ground,ocean,sun,amb,hemi;
var objects=[], scenery=[];
var burst=[],ash=[],smoke=[],cracks=[],fireflies=[],torches=[];
var keys={};

var state='menu',instr=null;
var timeLeft=10,roundTime=10,score=0,attempt=0,lastPhase=0;
var lastSafeColor=null,lastTouchedObj=null,twiceCount=0;
var runStart=0,timeSurvived=0,muted=false,baseLavaY=-6,currentEntryId=null;
var shake=0,rumble=false,dayTime=0.12;
var mmCtx;

var el=function(id){return document.getElementById(id);};

// ================= TERRAIN =================
function biomeElev(x,z){
  var e=0;
  // mountain pass NE
  var d1=Math.hypot(x-70,z-(-72)); if(d1<34) e+=(1-d1/34)*10;
  // snowy cliffs far north
  var d2=Math.hypot(x-0,z-(-108)); if(d2<32) e+=(1-d2/32)*16;
  // ruins slight raise
  var d3=Math.hypot(x-(-88),z-(-8)); if(d3<30) e+=(1-d3/30)*3;
  return e;
}
function th(x,z){
  var d=Math.hypot(x,z);
  var h=Math.sin(x*0.03)*2 + Math.cos(z*0.028)*2 + Math.sin((x+z)*0.02)*1.3;
  h+=2.0;                                   // lift land above sea
  if(d<22) h+=(22-d)*0.55;                  // volcano swell
  h+=biomeElev(x,z);
  if(d>92) h-=(d-92)*1.1;                   // coastal slope into the sea
  return h;
}

// ================= SETUP =================
function init(){
  scene=new THREE.Scene();
  scene.background=new THREE.Color(0x9fd0ea);
  scene.fog=new THREE.Fog(0x9fd0ea, 60, 150);
  camera=new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 700);

  renderer=new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(innerWidth,innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  el('game').appendChild(renderer.domElement);

  hemi=new THREE.HemisphereLight(0xbfe0ff, 0x3a5a3a, 0.5); scene.add(hemi);
  amb=new THREE.AmbientLight(0xbfd4f0, 0.6); scene.add(amb);
  sun=new THREE.DirectionalLight(0xfff4e0, 1.0);
  sun.position.set(60,90,40); sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  sun.shadow.camera.left=-130; sun.shadow.camera.right=130;
  sun.shadow.camera.top=130; sun.shadow.camera.bottom=-130; sun.shadow.camera.far=320;
  scene.add(sun);

  buildOcean();
  buildTerrain();
  buildPaths();
  buildBiomes();
  buildVillage();
  buildBeach();
  buildSnowPeaks();
  buildVolcano();
  buildFX();
  buildPlayer();

  mmCtx=el('minimap').getContext('2d');
  clock=new THREE.Clock();
  addEventListener('resize', onResize);
  addEventListener('keydown', function(e){ keys[e.key.toLowerCase()]=true; if(['arrowup','arrowdown','arrowleft','arrowright',' '].indexOf(e.key.toLowerCase())>=0)e.preventDefault(); });
  addEventListener('keyup', function(e){ keys[e.key.toLowerCase()]=false; });

  el('loading').style.display='none'; el('start').classList.remove('hidden');
  animate();
}

function mkMat(hex,em){ return new THREE.MeshStandardMaterial({color:hex,roughness:.8,emissive:em||0x000000}); }
function glowMat(hex){ var m=new THREE.MeshStandardMaterial({color:hex,roughness:.6,emissive:0x000000}); m.userData.glow=true; return m; }
function sh(m){ m.castShadow=true; return m; }

function buildOcean(){
  ocean=new THREE.Mesh(new THREE.CircleGeometry(520,72),
    new THREE.MeshStandardMaterial({color:0x1f6dbf, roughness:.25, metalness:.4, transparent:true, opacity:.94, emissive:0x082238}));
  ocean.rotation.x=-Math.PI/2; ocean.position.y=0.15; scene.add(ocean);
}

function biomeInfluence(x,z){
  var best=null,bf=0;
  for(var i=0;i<BIOMES.length;i++){ var B=BIOMES[i]; var d=Math.hypot(x-B.center[0],z-B.center[1]); var f=1-d/(B.r*1.3); if(f>bf){bf=f;best=B;} }
  var dv=Math.hypot(x-VILLAGE_CENTER[0],z-VILLAGE_CENTER[1]); var fv=1-dv/34; if(fv>bf){bf=fv;best={ground:0x9a8a6a};}
  return bf>0?{B:best,f:Math.min(1,bf)}:null;
}
var GROUND={ GREEN:0x3f8f52, YELLOW:0xb59a3f, BLUE:0x4f9a6a, PINK:0x9a6280, BROWN:0x8a6a54 };

function buildTerrain(){
  var seg=170, W=260;
  var geo=new THREE.PlaneGeometry(W,W,seg,seg); geo.rotateX(-Math.PI/2);
  var pos=geo.attributes.position, colors=[];
  var grass=new THREE.Color(0x4f9a5a), rock=new THREE.Color(0x53433c),
      sand=new THREE.Color(0xd8c48c), snow=new THREE.Color(0xeef3fb);
  for(var i=0;i<pos.count;i++){
    var x=pos.getX(i), z=pos.getZ(i), y=th(x,z); pos.setY(i,y);
    var d=Math.hypot(x,z), col=grass.clone();
    if(d<22){ col.lerp(rock, 1-(d/22)); }
    else{
      var inf=biomeInfluence(x,z);
      if(inf && inf.B.key){ col.lerp(new THREE.Color(GROUND[inf.B.key]||0x4f9a5a), inf.f*0.55); }
      else if(inf){ col.lerp(new THREE.Color(inf.B.ground), inf.f*0.5); }
    }
    if(y<1.6){ col.lerp(sand, Math.min(1,(1.6-y)/1.6)); }        // beaches
    if(y>13){ col.lerp(snow, Math.min(1,(y-13)/8)); }            // snowy peaks
    if(y>7 && y<=13){ col.lerp(rock, Math.min(1,(y-7)/6)*0.6); } // exposed rock
    colors.push(col.r,col.g,col.b);
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors,3)); geo.computeVertexNormals();
  ground=new THREE.Mesh(geo, new THREE.MeshStandardMaterial({vertexColors:true, roughness:1}));
  ground.receiveShadow=true; scene.add(ground);

  lavaMesh=new THREE.Mesh(new THREE.CircleGeometry(120,64),
    new THREE.MeshBasicMaterial({color:0xff4400, transparent:true, opacity:.96}));
  lavaMesh.rotation.x=-Math.PI/2; lavaMesh.position.y=-6; lavaMesh.visible=false; scene.add(lavaMesh);
  lavaGlow=new THREE.PointLight(0xff5500,0,160); lavaGlow.position.set(0,7,0); scene.add(lavaGlow);
}

function buildPaths(){
  var dests=BIOMES.map(function(b){return b.center;}); dests.push(VILLAGE_CENTER);
  dests.forEach(function(c){
    var steps=26;
    for(var s=3;s<steps;s++){ var t=s/steps, x=c[0]*t, z=c[1]*t;
      if(Math.hypot(x,z)<20) continue;
      var seg=new THREE.Mesh(new THREE.BoxGeometry(3,0.15,3), new THREE.MeshStandardMaterial({color:0xb59b6a,roughness:1}));
      seg.position.set(x, th(x,z)+0.08, z); seg.rotation.y=Math.atan2(c[0],c[1]); seg.receiveShadow=true; scene.add(seg);
    }
  });
}

// ================= PROP MODELS =================
function buildProp(model,hex){
  var g=new THREE.Group();
  var brown=0x6b4a2b, dark=0x352c28, stone=0x9aa0ad, wood=0x8a5a30, white=0xeee6d8;
  function A(m){ g.add(m); return m; }
  switch(model){
    case 'pine': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.3,.4,1.4,7),mkMat(brown)))).position.y=.7;
      for(var i=0;i<3;i++){var c=A(sh(new THREE.Mesh(new THREE.ConeGeometry(1.6-i*.35,1.7,9),glowMat(hex))));c.position.y=1.7+i*1.05;} break;
    case 'oak': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.4,.5,1.8,8),mkMat(brown)))).position.y=.9;
      var can=A(sh(new THREE.Mesh(new THREE.SphereGeometry(2,12,12),glowMat(hex))));can.position.y=3.2;can.scale.y=.85; break;
    case 'bush': for(var b=0;b<3;b++){var s=A(new THREE.Mesh(new THREE.SphereGeometry(.9,10,10),glowMat(hex)));s.position.set((b-1)*.85,.7,0);} break;
    case 'fern': for(var f=0;f<7;f++){var bl=A(new THREE.Mesh(new THREE.ConeGeometry(.18,1.2,5),glowMat(hex)));bl.position.set((Math.random()-.5)*1.6,.6,(Math.random()-.5)*1.6);bl.rotation.z=(Math.random()-.5)*.6;} break;
    case 'pond': var w=A(new THREE.Mesh(new THREE.CylinderGeometry(2.6,2.6,.4,26),new THREE.MeshStandardMaterial({color:hex,roughness:.12,metalness:.4,emissive:0x0a2a55})));w.material.userData.glow=true;w.position.y=.2; break;
    case 'cabin': var bd=A(sh(new THREE.Mesh(new THREE.BoxGeometry(3,2.1,3),glowMat(hex))));bd.position.y=1.05;
      var rf=A(sh(new THREE.Mesh(new THREE.ConeGeometry(2.5,1.5,4),mkMat(0x5a3b28))));rf.position.y=2.85;rf.rotation.y=Math.PI/4;
      A(new THREE.Mesh(new THREE.BoxGeometry(.8,1.3,.15),mkMat(dark))).position.set(0,.65,1.52); break;
    case 'church': A(sh(new THREE.Mesh(new THREE.BoxGeometry(3,3,4.5),glowMat(hex)))).position.y=1.5;
      var tw=A(sh(new THREE.Mesh(new THREE.BoxGeometry(1.4,4,1.4),glowMat(hex))));tw.position.set(0,2,-2.4);
      A(sh(new THREE.Mesh(new THREE.ConeGeometry(1.1,2,4),mkMat(0x7a4a30)))).position.set(0,5,-2.4); break;
    case 'clocktower': A(sh(new THREE.Mesh(new THREE.BoxGeometry(3.4,14,3.4),glowMat(hex)))).position.y=7;
      A(sh(new THREE.Mesh(new THREE.ConeGeometry(2.6,3,4),mkMat(0x6a4530)))).position.y=15.4;
      var face=A(new THREE.Mesh(new THREE.CylinderGeometry(1.1,1.1,.3,18),mkMat(0xf5edd8,0x333322)));face.rotation.x=Math.PI/2;face.position.set(0,11,1.75); break;
    case 'fence': for(var p=0;p<4;p++){A(sh(new THREE.Mesh(new THREE.BoxGeometry(.25,1.2,.25),glowMat(hex)))).position.set((p-1.5),.6,0);} A(sh(new THREE.Mesh(new THREE.BoxGeometry(4,.2,.2),glowMat(hex)))).position.set(-.5,.9,0); break;
    case 'crate': A(sh(new THREE.Mesh(new THREE.BoxGeometry(1.6,1.6,1.6),glowMat(hex)))).position.y=.8; break;
    case 'bench': A(sh(new THREE.Mesh(new THREE.BoxGeometry(2.4,.2,.8),glowMat(hex)))).position.y=.8; A(sh(new THREE.Mesh(new THREE.BoxGeometry(2.4,.8,.15),glowMat(hex)))).position.set(0,1.15,-.32); break;
    case 'log': var lg=A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.5,.5,3,10),glowMat(hex))));lg.rotation.z=Math.PI/2;lg.position.y=.55; break;
    case 'trunk': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.55,.65,2.6,12),glowMat(hex)))).position.y=1.3; break;
    case 'cartwheel': var wh=A(sh(new THREE.Mesh(new THREE.TorusGeometry(1,.18,8,18),glowMat(hex))));wh.position.y=1;wh.rotation.y=Math.PI/2; break;
    case 'ropebridge': A(sh(new THREE.Mesh(new THREE.BoxGeometry(6,.25,2.2),glowMat(hex)))).position.y=1.2;
      A(sh(new THREE.Mesh(new THREE.BoxGeometry(.2,1.4,.2),glowMat(hex)))).position.set(-3,.6,0); A(sh(new THREE.Mesh(new THREE.BoxGeometry(.2,1.4,.2),glowMat(hex)))).position.set(3,.6,0); break;
    case 'watchtower': for(var lgi=0;lgi<4;lgi++){var lx=(lgi<2?-1:1)*1.4, lz=(lgi%2?-1:1)*1.4; A(sh(new THREE.Mesh(new THREE.BoxGeometry(.35,7,.35),glowMat(hex)))).position.set(lx,3.5,lz);}
      A(sh(new THREE.Mesh(new THREE.BoxGeometry(3.6,.4,3.6),glowMat(hex)))).position.y=7; A(sh(new THREE.Mesh(new THREE.ConeGeometry(2.8,2,4),mkMat(0x6a4530)))).position.y=8.4; break;
    case 'statue': A(sh(new THREE.Mesh(new THREE.BoxGeometry(3,1,3),mkMat(stone)))).position.y=.5;
      A(sh(new THREE.Mesh(new THREE.BoxGeometry(1.6,5,1.2),glowMat(hex)))).position.y=3.5;
      A(sh(new THREE.Mesh(new THREE.SphereGeometry(1,12,12),glowMat(hex)))).position.y=6.6; break;
    case 'arch': A(sh(new THREE.Mesh(new THREE.BoxGeometry(.8,5,.8),glowMat(hex)))).position.set(-2,2.5,0); A(sh(new THREE.Mesh(new THREE.BoxGeometry(.8,5,.8),glowMat(hex)))).position.set(2,2.5,0); A(sh(new THREE.Mesh(new THREE.BoxGeometry(5,.9,.8),glowMat(hex)))).position.set(0,5.2,0); break;
    case 'vinerock': A(sh(new THREE.Mesh(new THREE.DodecahedronGeometry(1.3),mkMat(stone)))).position.y=.9; A(new THREE.Mesh(new THREE.SphereGeometry(.5,8,8),glowMat(hex))).position.set(.4,1.5,.3); break;
    case 'lake': var lk=A(new THREE.Mesh(new THREE.CylinderGeometry(4.2,4.2,.4,30),new THREE.MeshStandardMaterial({color:hex,roughness:.1,metalness:.45,emissive:0x0a2a55})));lk.material.userData.glow=true;lk.position.y=.2;
      var rim=A(sh(new THREE.Mesh(new THREE.TorusGeometry(4.2,.3,10,30),mkMat(0x8a8f9c))));rim.rotation.x=Math.PI/2;rim.position.y=.4; break;
    case 'river': var rv=A(new THREE.Mesh(new THREE.BoxGeometry(6,.3,3,1,1,1),new THREE.MeshStandardMaterial({color:hex,roughness:.1,metalness:.45,emissive:0x0a2a55})));rv.material.userData.glow=true;rv.position.y=.2; break;
    case 'waterfall': A(sh(new THREE.Mesh(new THREE.BoxGeometry(6,8,3),mkMat(stone)))).position.y=4;
      var wf=A(new THREE.Mesh(new THREE.BoxGeometry(3.4,8,.4),new THREE.MeshStandardMaterial({color:hex,roughness:.08,metalness:.5,emissive:0x123a66})));wf.material.userData.glow=true;wf.position.set(0,4,1.6);
      var pool=A(new THREE.Mesh(new THREE.CylinderGeometry(3.4,3.4,.4,24),new THREE.MeshStandardMaterial({color:hex,roughness:.1,metalness:.4,emissive:0x123a66})));pool.material.userData.glow=true;pool.position.set(0,.2,3.4); break;
    case 'fountain': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(1.8,2,.6,18),mkMat(stone)))).position.y=.3;
      var fw=A(new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,.3,18),new THREE.MeshStandardMaterial({color:hex,roughness:.1,metalness:.4,emissive:0x123a66})));fw.material.userData.glow=true;fw.position.y=.65;
      A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.2,.2,1.4,8),mkMat(stone)))).position.y=1.3;
      var top=A(new THREE.Mesh(new THREE.SphereGeometry(.5,12,12),new THREE.MeshStandardMaterial({color:hex,emissive:0x123a66})));top.material.userData.glow=true;top.position.y=2.1; break;
    case 'well': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,1.4,16),mkMat(stone)))).position.y=.7;
      var ww=A(new THREE.Mesh(new THREE.CylinderGeometry(1,1,.2,16),new THREE.MeshStandardMaterial({color:hex,roughness:.1,metalness:.4,emissive:0x123a66})));ww.material.userData.glow=true;ww.position.y=1.4;
      A(sh(new THREE.Mesh(new THREE.BoxGeometry(.2,1.6,.2),mkMat(brown)))).position.set(-1.1,2.2,0); A(sh(new THREE.Mesh(new THREE.BoxGeometry(.2,1.6,.2),mkMat(brown)))).position.set(1.1,2.2,0);
      A(sh(new THREE.Mesh(new THREE.ConeGeometry(1.8,1,4),mkMat(0x5a3b28)))).position.y=3.4; break;
    case 'dock': A(sh(new THREE.Mesh(new THREE.BoxGeometry(4,.25,2),glowMat(hex)))).position.y=.6; break;
    case 'boat': A(sh(new THREE.Mesh(new THREE.BoxGeometry(3,.7,1.2),mkMat(brown)))).position.y=.5; A(sh(new THREE.Mesh(new THREE.BoxGeometry(.1,1.8,1.4),glowMat(hex)))).position.set(0,1.6,0); break;
    case 'wheat': for(var w2=0;w2<9;w2++){A(new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,1.6,5),glowMat(hex))).position.set((Math.random()-.5)*1.8,.8,(Math.random()-.5)*1.8);} break;
    case 'hay': var hy=A(sh(new THREE.Mesh(new THREE.CylinderGeometry(1,1,1.6,14),glowMat(hex))));hy.rotation.z=Math.PI/2;hy.position.y=1; break;
    case 'sunflower': A(new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,2,6),mkMat(0x3f8a3f))).position.y=1;
      var head=A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,.2,14),glowMat(hex))));head.position.y=2.1;head.rotation.x=.4;
      A(new THREE.Mesh(new THREE.SphereGeometry(.35,10,10),mkMat(0x5a3b1a))).position.set(0,2.18,.1); break;
    case 'scarecrow': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,2.6,6),mkMat(brown)))).position.y=1.3; A(sh(new THREE.Mesh(new THREE.BoxGeometry(2,.15,.15),mkMat(brown)))).position.y=2; A(sh(new THREE.Mesh(new THREE.SphereGeometry(.5,10,10),glowMat(hex)))).position.y=2.7; break;
    case 'tractor': A(sh(new THREE.Mesh(new THREE.BoxGeometry(2.4,1.2,1.4),glowMat(hex)))).position.y=1; A(sh(new THREE.Mesh(new THREE.BoxGeometry(1.2,1,1.4),glowMat(hex)))).position.set(-.6,1.9,0);
      A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,.4,14),mkMat(dark)))).position.set(1,.7,.8); A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.8,.8,.4,14),mkMat(dark)))).position.set(1,.7,-.8); break;
    case 'windmill': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(1.4,2.2,7,14),mkMat(0xe8e0cc)))).position.y=3.5;
      A(sh(new THREE.Mesh(new THREE.ConeGeometry(2,1.6,14),mkMat(0x7a4a30)))).position.y=7.8;
      var hub=new THREE.Group(); hub.position.set(0,6,2); g.add(hub);
      for(var bl=0;bl<4;bl++){ var bld=new THREE.Mesh(new THREE.BoxGeometry(.5,4.2,.12),glowMat(hex)); bld.position.y=2.1; var pv=new THREE.Group(); pv.add(bld); pv.rotation.z=bl*Math.PI/2; hub.add(pv);} g.userData.spin=hub; break;
    case 'barn': A(sh(new THREE.Mesh(new THREE.BoxGeometry(4.5,3,3.6),glowMat(hex)))).position.y=1.5; A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.01,2.7,1.8,4,1,false,Math.PI/4,Math.PI/2),mkMat(0x7a2a2a)))).position.y=3.7; break;
    case 'cottage': A(sh(new THREE.Mesh(new THREE.BoxGeometry(3,2.1,3),glowMat(hex)))).position.y=1.05; A(sh(new THREE.Mesh(new THREE.ConeGeometry(2.4,1.5,4),mkMat(0x8a3b2b)))).position.set(0,2.85,0); g.children[g.children.length-1].rotation.y=Math.PI/4; break;
    case 'roofhouse': A(sh(new THREE.Mesh(new THREE.BoxGeometry(2.8,2,2.8),mkMat(0xe8e0cc)))).position.y=1; var rrf=A(sh(new THREE.Mesh(new THREE.ConeGeometry(2.4,1.6,4),glowMat(hex))));rrf.position.y=2.8;rrf.rotation.y=Math.PI/4; break;
    case 'mailbox': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,1.4,8),mkMat(brown)))).position.y=.7; A(sh(new THREE.Mesh(new THREE.BoxGeometry(.7,.6,1),glowMat(hex)))).position.y=1.5; break;
    case 'door': A(sh(new THREE.Mesh(new THREE.BoxGeometry(.4,3.4,.4),mkMat(stone)))).position.set(-1.2,1.7,0); A(sh(new THREE.Mesh(new THREE.BoxGeometry(.4,3.4,.4),mkMat(stone)))).position.set(1.2,1.7,0); A(sh(new THREE.Mesh(new THREE.BoxGeometry(2.8,.4,.4),mkMat(stone)))).position.set(0,3.4,0); A(sh(new THREE.Mesh(new THREE.BoxGeometry(1.9,3.1,.3),glowMat(hex)))).position.set(0,1.65,0); break;
    case 'hydrant': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.4,.5,1.3,10),glowMat(hex)))).position.y=.65; break;
    case 'flag': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,3.2,8),mkMat(dark)))).position.y=1.6; A(new THREE.Mesh(new THREE.BoxGeometry(1.4,.9,.06),glowMat(hex))).position.set(.75,2.7,0); break;
    case 'lantern': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.12,.12,2,8),mkMat(dark)))).position.y=1; A(new THREE.Mesh(new THREE.BoxGeometry(.5,.6,.5),glowMat(hex))).position.y=2.1; break;
    case 'cherry': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.35,.45,2,8),mkMat(brown)))).position.y=1; var cc=A(sh(new THREE.Mesh(new THREE.SphereGeometry(2.1,12,12),glowMat(hex))));cc.position.y=3.2;cc.scale.y=.8; break;
    case 'pinkflower': A(new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,1.2,6),mkMat(0x3f8a3f))).position.y=.6; for(var pf=0;pf<5;pf++){A(new THREE.Mesh(new THREE.SphereGeometry(.3,8,8),glowMat(hex))).position.set(Math.cos(pf/5*6.28)*.4,1.3,Math.sin(pf/5*6.28)*.4);} break;
    case 'gazebo': for(var gp=0;gp<4;gp++){var gx=(gp<2?-1:1)*1.6, gz=(gp%2?-1:1)*1.6; A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,2.4,8),glowMat(hex)))).position.set(gx,1.2,gz);} A(sh(new THREE.Mesh(new THREE.ConeGeometry(2.8,1.6,8),glowMat(hex)))).position.y=3.2; break;
    case 'pinkhouse': A(sh(new THREE.Mesh(new THREE.BoxGeometry(3,2.1,3),glowMat(hex)))).position.y=1.05; var pr=A(sh(new THREE.Mesh(new THREE.ConeGeometry(2.4,1.5,4),mkMat(0xc44d84))));pr.position.y=2.85;pr.rotation.y=Math.PI/4; break;
    case 'mushroom': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.35,.4,1,8),mkMat(0xefe7d8)))).position.y=.5; A(sh(new THREE.Mesh(new THREE.SphereGeometry(.9,12,8,0,6.28,0,1.6),glowMat(hex)))).position.y=1; break;
    case 'crystal': A(sh(new THREE.Mesh(new THREE.ConeGeometry(.7,2.4,6),glowMat(hex)))).position.y=1.2; A(sh(new THREE.Mesh(new THREE.ConeGeometry(.4,1.4,6),glowMat(hex)))).position.set(.7,.7,.3); break;
    case 'balloon': A(new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,2,4),mkMat(dark))).position.y=1; var bo=A(sh(new THREE.Mesh(new THREE.SphereGeometry(.7,12,12),glowMat(hex))));bo.position.y=2.5;bo.scale.y=1.2; break;
    case 'palm': var tr=A(sh(new THREE.Mesh(new THREE.CylinderGeometry(.3,.4,4,8),mkMat(0x8a6a3a))));tr.position.y=2;tr.rotation.z=.15; for(var fr=0;fr<6;fr++){var fd=A(new THREE.Mesh(new THREE.BoxGeometry(2.4,.12,.7),glowMat(hex)));fd.position.set(Math.cos(fr/6*6.28)*1,4.1,Math.sin(fr/6*6.28)*1);fd.rotation.y=fr/6*6.28;fd.rotation.z=.3;} break;
    case 'lighthouse': A(sh(new THREE.Mesh(new THREE.CylinderGeometry(1.6,2.6,14,16),glowMat(hex)))).position.y=7; A(sh(new THREE.Mesh(new THREE.CylinderGeometry(2,2,1.2,16),mkMat(0xffffff)))).position.y=14.5; A(new THREE.Mesh(new THREE.SphereGeometry(1,12,12),new THREE.MeshStandardMaterial({color:0xffffcc,emissive:0xffcc55,emissiveIntensity:.8}))).position.y=15.6; break;
    default: A(sh(new THREE.Mesh(new THREE.BoxGeometry(1.4,1.4,1.4),glowMat(hex)))).position.y=.7;
  }
  return g;
}

function placeObject(key,model,x,z,primary){
  var g=buildProp(model, C[key].hex);
  g.position.set(x, th(x,z), z); g.rotation.y=Math.random()*6.28; scene.add(g);
  var gm=[]; g.traverse(function(m){ if(m.isMesh&&m.material&&m.material.userData&&m.material.userData.glow) gm.push(m.material); });
  if(gm.length===0) g.traverse(function(m){ if(m.isMesh&&m.material) gm.push(m.material); });
  objects.push({ key:key, tags:(TAGS[model]||[]), model:model, group:g, x:x, z:z, touchR:(TOUCH_R[model]||1.9), visible:true, glowMats:gm, primary:!!primary, spin:g.userData.spin||null, onFire:false });
}
function scatterIn(B,model,primary,atCenter){
  if(atCenter){ placeObject(B.key,model,B.center[0],B.center[1],true); return; }
  for(var tries=0;tries<14;tries++){
    var a=Math.random()*6.28, rad=Math.sqrt(Math.random())*B.r;
    var x=B.center[0]+Math.cos(a)*rad, z=B.center[1]+Math.sin(a)*rad;
    if(Math.hypot(x,z)<20) continue; if(Math.hypot(x,z)>CLAMP_R-3) continue;
    placeObject(B.key,model,x,z,primary); return;
  }
  placeObject(B.key,model,B.center[0],B.center[1],primary);
}
function buildBiomes(){
  BIOMES.forEach(function(B){
    B.anchors.forEach(function(m,idx){ scatterIn(B,m,true, idx===0); });
    B.scatter.forEach(function(m){ scatterIn(B,m,false,false); });
  });
}
function buildVillage(){
  VILLAGE.forEach(function(v){
    var key=v[0], model=v[1], x=VILLAGE_CENTER[0]+v[2], z=VILLAGE_CENTER[1]+v[3];
    placeObject(key,model,x,z,true);
  });
}
function buildBeach(){
  // palms + lighthouse ring the coast (lighthouse is a landmark, touchable RED)
  placeObject('RED','lighthouse', 0, 100, true);
  for(var i=0;i<16;i++){ var a=(i/16)*6.28; var x=Math.cos(a)*96, z=Math.sin(a)*96;
    if(Math.abs(z-100)<8) continue; placeObject('GREEN','palm', x, z, false); }
  for(var b=0;b<5;b++){ var a2=Math.random()*6.28; placeObject('BLUE','boat', Math.cos(a2)*90, Math.sin(a2)*90, false); }
}
function buildSnowPeaks(){ // decorative, non-touch
  for(var i=0;i<5;i++){ var x=-30+i*15, z=-104-(i%2)*6;
    var pk=sh(new THREE.Mesh(new THREE.ConeGeometry(9,20,7), new THREE.MeshStandardMaterial({color:0xeef3fb,roughness:1})));
    pk.position.set(x, th(x,z)+7, z); scene.add(pk); scenery.push(pk); }
}

// ================= VOLCANO + FX =================
function buildVolcano(){
  volcano=new THREE.Group();
  volcano.add(sh(new THREE.Mesh(new THREE.CylinderGeometry(3,10,11,26),mkMat(0x463730)))).position.y=5.5;
  var c2=sh(new THREE.Mesh(new THREE.CylinderGeometry(5.5,8.5,4,26),mkMat(0x362a24)));c2.position.y=2;volcano.add(c2);
  crater=new THREE.Mesh(new THREE.CylinderGeometry(3.2,3.4,1,26),new THREE.MeshStandardMaterial({color:0xff5522,emissive:0xff3300,emissiveIntensity:.7}));crater.position.y=11;volcano.add(crater);
  volcano.position.y=th(0,0); scene.add(volcano);
  for(var i=0;i<14;i++){ var a=(i/14)*6.28; var ck=new THREE.Mesh(new THREE.BoxGeometry(1,0.15,60), new THREE.MeshBasicMaterial({color:0xff5a1e})); ck.position.set(Math.cos(a)*33,th(0,0)+0.4,Math.sin(a)*33); ck.rotation.y=-a+Math.PI/2; ck.visible=false; ck.scale.z=0.01; scene.add(ck); cracks.push(ck); }
}
function buildFX(){
  for(var i=0;i<50;i++){var p=new THREE.Mesh(new THREE.SphereGeometry(.4,6,6),new THREE.MeshStandardMaterial({color:0xff6a1a,emissive:0xff3300,emissiveIntensity:.9}));p.visible=false;scene.add(p);burst.push({mesh:p,vx:0,vy:0,vz:0,life:0});}
  for(var j=0;j<48;j++){var a2=new THREE.Mesh(new THREE.SphereGeometry(.18,5,5),new THREE.MeshBasicMaterial({color:0x2a2320}));a2.visible=false;scene.add(a2);ash.push({mesh:a2,vy:0,life:0});}
  for(var k=0;k<24;k++){var sm=new THREE.Mesh(new THREE.SphereGeometry(1,7,7),new THREE.MeshBasicMaterial({color:0x8a8480,transparent:true,opacity:.5}));sm.visible=false;scene.add(sm);smoke.push({mesh:sm,vy:0,life:0,seed:Math.random()*6.28});}
  for(var f=0;f<26;f++){var ff=new THREE.Mesh(new THREE.SphereGeometry(.12,5,5),new THREE.MeshBasicMaterial({color:0xfff2a0}));ff.visible=false;scene.add(ff);fireflies.push({mesh:ff,seed:Math.random()*6.28,cx:0,cz:0});}
  // a couple of torch point-lights near the village for night
  for(var tL=0;tL<2;tL++){ var pl=new THREE.PointLight(0xffa64d,0,26); pl.position.set(VILLAGE_CENTER[0]+(tL?10:-10), th(VILLAGE_CENTER[0],VILLAGE_CENTER[1])+4, VILLAGE_CENTER[1]); scene.add(pl); torches.push(pl); }
}
function buildPlayer(){
  player=new THREE.Group();
  var body=sh(new THREE.Mesh(new THREE.SphereGeometry(.75,18,18),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.4})));body.position.y=.95;body.scale.y=1.2;player.add(body);
  var em=new THREE.MeshStandardMaterial({color:0x111111});
  var e1=new THREE.Mesh(new THREE.SphereGeometry(.13,8,8),em);e1.position.set(-.26,1.2,.62);player.add(e1);
  var e2=new THREE.Mesh(new THREE.SphereGeometry(.13,8,8),em);e2.position.set(.26,1.2,.62);player.add(e2);
  var cr=new THREE.Mesh(new THREE.ConeGeometry(.38,.55,6),new THREE.MeshStandardMaterial({color:0xffd23f,emissive:0x332200}));cr.position.y=2;player.add(cr);
  scene.add(player); resetPlayer();
}
function resetPlayer(){
  var SP=BIOMES.map(function(b){return b.center;}); SP.push(VILLAGE_CENTER);
  var s=SP[(Math.random()*SP.length)|0];
  player.position.set(s[0], th(s[0],s[1]), s[1]);
}

// ================= AUDIO =================
function speak(text){ if(muted||!('speechSynthesis' in window))return; try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(text);u.pitch=0.35;u.rate=0.95;speechSynthesis.speak(u);}catch(e){} }
var actx=null,windGain=null;
function ensureAudio(){ try{ if(!actx){ actx=new (window.AudioContext||window.webkitAudioContext)();
  var buf=actx.createBuffer(1,actx.sampleRate*2,actx.sampleRate),dt=buf.getChannelData(0);
  for(var i=0;i<dt.length;i++)dt[i]=(Math.random()*2-1)*0.5;
  var src=actx.createBufferSource();src.buffer=buf;src.loop=true;
  var flt=actx.createBiquadFilter();flt.type='lowpass';flt.frequency.value=420;
  windGain=actx.createGain();windGain.gain.value=0.015; src.connect(flt);flt.connect(windGain);windGain.connect(actx.destination);src.start();
} }catch(e){} }
function tick(freq){ if(muted||!actx)return; try{var o=actx.createOscillator(),g=actx.createGain();o.frequency.value=freq||440;o.type='square';g.gain.value=0.06;o.connect(g);g.connect(actx.destination);o.start();g.gain.exponentialRampToValueAtTime(0.0001,actx.currentTime+0.12);o.stop(actx.currentTime+0.13);}catch(e){} }
function setWind(v){ if(windGain)try{windGain.gain.value=v;}catch(e){} }

// ================= PHASES / INSTRUCTIONS =================
function phaseFor(a){ if(a<=3)return 1; if(a<=8)return 2; if(a<=14)return 3; return 4; }
function phaseName(p){ return p===1?'Round 1 • Color Rush':p===2?'Round 2 • Chaos':p===3?'Round 3 • Panic':'Endless Survival'; }
function timerForPhase(p,a){ if(p===1)return 10; if(p===2)return 8; if(p===3)return 6; return Math.max(3.5,6-(a-14)*0.12); }
function activeObjects(){ return objects.filter(function(o){return o.visible;}); }
function touchedObject(){ var px=player.position.x,pz=player.position.z,best=null,bd=1e9,arr=activeObjects();
  for(var i=0;i<arr.length;i++){var o=arr[i];var d=Math.hypot(px-o.x,pz-o.z);if(d<=o.touchR&&d<bd){bd=d;best=o;}} return best; }
function inSet(o){ return instr&&instr.excludeSet&&instr.excludeSet.indexOf(o)>=0; }
// The k nearest qualifying objects (locked out in later rounds so you must reach
// one further away). Never returns so many that no option remains.
function nearestQualifying(k){ var px=player.position.x,pz=player.position.z;
  var q=activeObjects().filter(function(o){return objSafe(o);});
  q.sort(function(a,b){ return Math.hypot(px-a.x,pz-a.z)-Math.hypot(px-b.x,pz-b.z); });
  if(q.length<=k) return []; return q.slice(0,k); }
// Nearest qualifying SAFE object that isn't locked out (forces real movement).
function currentSafeObject(){ var px=player.position.x,pz=player.position.z,best=null,bd=1e9,arr=activeObjects();
  for(var i=0;i<arr.length;i++){var o=arr[i]; if(inSet(o))continue; if(!objSafe(o))continue; var d=Math.hypot(px-o.x,pz-o.z); if(d<=o.touchR&&d<bd){bd=d;best=o;}} return best; }
function objSafe(o){ if(!instr)return false;
  switch(instr.mode){ case 'find':case 'last':case 'twice':return o.key===instr.color;
    case 'not':return o.key!==instr.color; case 'cat':return o.tags.indexOf(instr.cat)>=0;
    case 'or':return o.key===instr.colorA||o.key===instr.colorB; case 'none':return false; } return false; }
function cap(k){return k.charAt(0)+k.slice(1).toLowerCase();}
function pickColor(av){var k;do{k=COLOR_KEYS[(Math.random()*6)|0];}while(av&&k===av);return k;}
function pickColorWithObject(){var a={};activeObjects().forEach(function(o){a[o.key]=true;});var ks=Object.keys(a);return ks[(Math.random()*ks.length)|0]||'RED';}
function pickInstruction(p){
  var pool=p===1?['find']:p===2?['find','find','not','cat','cat']:['find','not','cat','or','last','twice','none'];
  pool=pool.filter(function(m){return !(m==='last'&&!lastSafeColor);});
  var mode=pool[(Math.random()*pool.length)|0], ins={mode:mode};
  if(mode==='find'){ ins.color=pickColor(instr&&instr.mode==='find'?instr.color:null);
    ins.banner='<small>FIND</small><br><span style="color:'+C[ins.color].css+'">'+ins.color+'</span>'; ins.voice=cap(ins.color); ins.sub='Head for '+C[ins.color].dir+' — or grab it in the village.'; ins.compass=C[ins.color].dir; }
  else if(mode==='not'){ ins.color=pickColor(null);
    ins.banner='<small>DO NOT TOUCH</small><br><span class="neg">'+ins.color+'</span>'; ins.voice='Not '+cap(ins.color); ins.sub='Touching '+ins.color.toLowerCase()+' is instant death. Reach any OTHER color.'; ins.compass='avoid '+ins.color; }
  else if(mode==='cat'){ var cats=['house','wood','water']; ins.cat=cats[(Math.random()*3)|0];
    var lab=ins.cat==='house'?'ANY HOUSE':ins.cat==='wood'?'WOOD':'WATER';
    ins.banner='<span>'+lab+'</span>'; ins.voice=ins.cat==='house'?'Any house':cap(ins.cat);
    ins.sub=ins.cat==='house'?'Any cabin, cottage, barn, church, gazebo or house.':ins.cat==='wood'?'Trunks, fences, crates, logs, docks, towers.':'River, lake, waterfall, well or fountain.'; ins.compass=lab; }
  else if(mode==='or'){ ins.colorA=pickColor(null); do{ins.colorB=pickColor(null);}while(ins.colorB===ins.colorA);
    ins.banner='<span style="color:'+C[ins.colorA].css+'">'+ins.colorA+'</span> <small>OR</small> <span style="color:'+C[ins.colorB].css+'">'+ins.colorB+'</span>'; ins.voice=cap(ins.colorA)+' or '+cap(ins.colorB); ins.sub='Either color keeps you safe.'; ins.compass=ins.colorA+' / '+ins.colorB; }
  else if(mode==='last'){ ins.color=lastSafeColor; ins.banner='<small>LAST SAFE</small><br>COLOR'; ins.voice='Last safe color'; ins.sub='Remember the color that saved you last time!'; ins.compass='???'; }
  else if(mode==='twice'){ ins.color=pickColorWithObject(); ins.banner='<small>TOUCH</small> <span style="color:'+C[ins.color].css+'">'+ins.color+'</span> <small>TWICE</small>'; ins.voice='Touch '+cap(ins.color)+' twice'; ins.sub='Touch it, step away, then touch it again.'; ins.compass=C[ins.color].dir; }
  else { ins.banner='<small>DO NOT TOUCH</small><br>ANYTHING'; ins.voice='Do not touch anything'; ins.sub='FREEZE! Any object you touch will kill you.'; ins.compass='stay in the open'; }
  return ins;
}

// ================= GAME FLOW =================
function startGame(){
  ensureAudio(); startMusic(); score=0; attempt=0; lastPhase=0; lastSafeColor=null; baseLavaY=-6;
  restoreWorld(); el('start').classList.add('hidden'); el('over').classList.add('hidden'); el('hud').classList.remove('hidden');
  resetPlayer(); updateHud(); runStart=performance.now();
  introCountdown(function(){ nextTrial(); });
}
function introCountdown(done){ state='intro'; var seq=['3','2','1','GO!'],i=0;
  el('target-word').innerHTML=''; el('target-sub').textContent='The crater begins to smoke...'; el('compass').textContent='';
  (function step(){ if(i<seq.length){ flash(seq[i],i===3?'#46c96a':'#fff'); tick(i===3?660:330); i++; setTimeout(step,700);} else done(); })(); }
function nextTrial(){
  attempt++; var p=phaseFor(attempt); roundTime=timerForPhase(p,attempt); musicPhase(p);
  if(p!==lastPhase){ lastPhase=p; el('roundtag').textContent=phaseName(p);
    if(p===2)speak('Chaos mode'); if(p===3)speak('Panic mode'); if(p===4)speak('Endless survival'); }
  if(p>=3){ triggerEvent(); baseLavaY=Math.min(-0.2, baseLavaY+0.4); } else baseLavaY=-6;
  clearCracks(); rumble=false;
  instr=pickInstruction(p); timeLeft=roundTime; lastTouchedObj=null; twiceCount=0;
  // Escalating "reach a further one" rule:
  //  R1 none | R2 the object you're on is locked | R3 nearest locked | Endless 2 nearest locked
  instr.excludeSet=[];
  if(['find','not','cat','or','last'].indexOf(instr.mode)>=0){
    if(p===2){ instr.excludeSet=nearestQualifying(1); }
    else if(p===3){ instr.excludeSet=nearestQualifying(2); }
    else if(p>=4){ instr.excludeSet=nearestQualifying(3); }
  }
  objects.forEach(function(o){ o.glowMats.forEach(function(m){ m.emissive.setHex(0x000000); }); });
  el('target-word').innerHTML=instr.banner;
  el('target-sub').textContent=instr.sub + (instr.excludeSet.length&&p>=3?'  Skip the nearest — reach one further!':'');
  el('compass').innerHTML = instr.compass? ('&#9758; '+instr.compass) : '';
  speak(instr.voice); state='playing';
}
function succeedTrial(){ if(state!=='playing')return; state='resolving'; var t=touchedObject(); if(t)lastSafeColor=t.key;
  score++; updateHud(); flash('SAFE!  +1','#46c96a'); tick(720); setTimeout(function(){ if(state==='resolving')nextTrial(); },950); }
function failTrial(msg){ if(state==='dead')return; state='resolving'; erupt(); flash(msg||'BURNED!','#ff4d4d'); setTimeout(gameOver,1100); }
function resolveTimeout(){ if(instr.mode==='twice'){ failTrial('TOO SLOW!'); return; }
  if(instr.mode==='none'){ if(touchedObject())failTrial('YOU TOUCHED IT!'); else safeFlood(null); return; }
  var safeObj=currentSafeObject();
  if(safeObj) safeFlood(safeObj); else failTrial('CONSUMED BY LAVA'); }
function safeFlood(safeObj){ state='resolving'; erupt(); if(safeObj)lastSafeColor=safeObj.key;
  score++; updateHud(); flash('SAFE!  +1','#46c96a'); tick(720); setTimeout(function(){ if(state==='resolving')nextTrial(); },1000); }
function gameOver(){ state='dead'; timeSurvived=(performance.now()-runStart)/1000;
  currentEntryId=saveScore(getName(),score,timeSurvived);
  el('finalScore').textContent='Safe Trials: '+score+'   •   Survived '+fmtTime(timeSurvived);
  el('nameInput').value=getName(); renderBoard(); el('hud').classList.add('hidden'); el('over').classList.remove('hidden'); }

// dynamic events: a prop collapses / catches fire each panic round
function triggerEvent(){
  var rem=objects.filter(function(o){return o.visible&&!o.primary;});
  if(rem.length<=2) return;
  var o=rem[(Math.random()*rem.length)|0];
  if(Math.random()<0.5){ o.visible=false; o.sink=1.2; }         // collapse / sink
  else { o.onFire=true; o.fireT=3.5; }                          // catches fire, then gone
}
function restoreWorld(){ objects.forEach(function(o){ o.visible=true; o.sink=0; o.onFire=false; o.fireT=0; o.group.visible=true; o.group.position.y=th(o.x,o.z); o.glowMats.forEach(function(m){m.emissive.setHex(0x000000);}); }); }

// ================= EFFECTS =================
function flash(text,color){ var f=el('flash'); f.innerHTML=text; f.style.color=color; f.style.opacity=1; clearTimeout(flash._t); flash._t=setTimeout(function(){f.style.opacity=0;},750); }
function erupt(){ burst.forEach(function(p){ p.mesh.visible=true; p.mesh.position.set(0,th(0,0)+11,0);
    var a=Math.random()*6.28,s=5+Math.random()*10; p.vx=Math.cos(a)*s; p.vz=Math.sin(a)*s; p.vy=14+Math.random()*12; p.life=1.5+Math.random()*0.8; });
  cracks.forEach(function(c){ c.visible=true; c.scale.z=0.01; }); lavaMesh.visible=true; lavaGlow.intensity=3.4; lavaMesh._flood=true; shake=1.1; }
function clearCracks(){ cracks.forEach(function(c){ c.visible=false; }); }

// ================= HUD / MINIMAP / LEADERBOARD =================
function updateHud(){ el('score').textContent='Safe Trials: '+score; el('best').textContent='Best: '+bestScore(); }
function drawMinimap(){
  if(!mmCtx) return; var s=132, cx=s/2, cy=s/2, scale=(s/2-6)/CLAMP_R;
  mmCtx.clearRect(0,0,s,s);
  mmCtx.save(); mmCtx.beginPath(); mmCtx.arc(cx,cy,s/2-2,0,6.28); mmCtx.clip();
  mmCtx.fillStyle='rgba(20,40,30,0.5)'; mmCtx.fillRect(0,0,s,s);
  // volcano
  mmCtx.fillStyle='#ff5a1e'; mmCtx.beginPath(); mmCtx.arc(cx,cy,4,0,6.28); mmCtx.fill();
  // safe objects
  if(instr){ objects.forEach(function(o){ if(o.visible&&objSafe(o)&&!inSet(o)){ mmCtx.fillStyle=C[o.key].css;
    mmCtx.fillRect(cx+o.x*scale-1.5, cy+o.z*scale-1.5, 3,3); } }); }
  // player
  mmCtx.fillStyle='#fff'; mmCtx.beginPath(); mmCtx.arc(cx+player.position.x*scale, cy+player.position.z*scale, 3,0,6.28); mmCtx.fill();
  mmCtx.restore();
}
function loadScores(){ return MEM_SCORES.slice(); }
function writeScores(a){ MEM_SCORES=a.slice(); }
function saveScore(name,s,time){ var a=loadScores(),id=Date.now(); a.push({id:id,name:name||'Player',s:s,time:Math.round(time)}); a.sort(function(x,y){return y.s-x.s||x.time-y.time;}); a=a.slice(0,10); writeScores(a); return id; }
function bestScore(){ var a=loadScores(); return a.length?a[0].s:0; }
function getName(){ return MEM_NAME; }
function setName(n){ MEM_NAME=n; }
function fmtTime(s){ s=Math.round(s); var m=(s/60)|0,r=s%60; return m+':'+(r<10?'0':'')+r; }
function escapeHtml(s){ return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
function renderBoard(){ var a=loadScores(),b=el('board'); b.innerHTML='';
  if(!a.length){ b.innerHTML='<div class="row"><span>No scores yet</span><span>&mdash;</span></div>'; return; }
  a.forEach(function(r,i){ var row=document.createElement('div'); row.className='row'+(r.id===currentEntryId?' me':'');
    row.innerHTML='<span><span class="rank">#'+(i+1)+'</span>'+escapeHtml(r.name)+'</span><span>'+r.s+' safe &bull; '+fmtTime(r.time)+'</span>'; b.appendChild(row); }); }

// ================= DAY / NIGHT =================
var KEYS=[
  {t:0.00, sky:0x9fd0ea, sun:1.0, amb:0.6, hemi:0.5, label:'Morning'},
  {t:0.42, sky:0xa9d8ef, sun:1.05,amb:0.62,hemi:0.55,label:'Midday'},
  {t:0.58, sky:0xf2a76b, sun:0.7, amb:0.5, hemi:0.4, label:'Sunset'},
  {t:0.70, sky:0x24304f, sun:0.25,amb:0.32,hemi:0.28,label:'Night'},
  {t:0.90, sky:0x161c34, sun:0.2, amb:0.3, hemi:0.25,label:'Night'},
  {t:1.00, sky:0x9fd0ea, sun:1.0, amb:0.6, hemi:0.5, label:'Dawn'}
];
function dayState(dtv){
  for(var i=0;i<KEYS.length-1;i++){ if(dtv>=KEYS[i].t && dtv<=KEYS[i+1].t){
    var a=KEYS[i],b=KEYS[i+1], f=(dtv-a.t)/(b.t-a.t);
    var sky=new THREE.Color(a.sky).lerp(new THREE.Color(b.sky),f);
    return { sky:sky, sun:a.sun+(b.sun-a.sun)*f, amb:a.amb+(b.amb-a.amb)*f, hemi:a.hemi+(b.hemi-a.hemi)*f, label:f<0.5?a.label:b.label }; }
  }
  return { sky:new THREE.Color(0x9fd0ea), sun:1, amb:.6, hemi:.5, label:'Morning' };
}
function nightFactor(dtv){ return Math.max(0, Math.min(1, (dtv-0.6)/0.12)) * Math.max(0, Math.min(1,(0.98-dtv)/0.08)); }

// ================= LOOP =================
function onResize(){ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); }
function animate(){
  rafId=requestAnimationFrame(animate);
  var dt=Math.min(clock.getDelta(),0.05), t=clock.elapsedTime;
  dayTime=(dayTime+dt/140)%1;

  if(state==='playing'){
    var mx=0,mz=0;
    if(keys['w']||keys['arrowup'])mz-=1; if(keys['s']||keys['arrowdown'])mz+=1;
    if(keys['a']||keys['arrowleft'])mx-=1; if(keys['d']||keys['arrowright'])mx+=1;
    var len=Math.hypot(mx,mz);
    if(len>0){ mx/=len; mz/=len;
      player.position.x+=mx*PLAYER_SPEED*dt; player.position.z+=mz*PLAYER_SPEED*dt;
      player.rotation.y=Math.atan2(mx,mz);
      var d=Math.hypot(player.position.x,player.position.z);
      if(d>CLAMP_R){ var k=CLAMP_R/d; player.position.x*=k; player.position.z*=k; } }
    var gy=th(player.position.x,player.position.z);
    player.position.y=gy+(len>0?Math.abs(Math.sin(t*12))*0.28:0);

    var touched=touchedObject();
    if(touched!==lastTouchedObj){ if(touched&&instr.mode==='twice'&&touched.key===instr.color){ twiceCount++; if(twiceCount>=2)succeedTrial(); } lastTouchedObj=touched; }
    if(state==='playing'){ if(instr.mode==='none'&&touched)failTrial('YOU TOUCHED IT!'); else if(instr.mode==='not'&&touched&&touched.key===instr.color)failTrial('TOUCHED '+instr.color+'!'); }
    if(state==='playing'){
      timeLeft-=dt; var frac=Math.max(0,timeLeft/roundTime); el('timerbar').style.width=(frac*100)+'%';
      var ceil=Math.ceil(Math.max(0,timeLeft));
      if(el('timernum').textContent!=String(ceil)&&timeLeft<3.05)tick(300+(3-ceil)*120);
      el('timernum').textContent=ceil; el('timernum').style.color=timeLeft<3?'#ff5f5f':'#fff';
      if(timeLeft<=2&&!rumble)rumble=true; if(rumble)shake=Math.max(shake,0.2);
      if(timeLeft<=0)resolveTimeout();
    }
  }

  // glow qualifying
  var pulse=0.55+Math.sin(t*6)*0.4;
  objects.forEach(function(o){ if(o.visible&&instr&&objSafe(o)&&!inSet(o)) o.glowMats.forEach(function(m){ m.emissive.setHex(C[o.key].hex); m.emissiveIntensity=pulse; }); });

  // spinning windmills
  objects.forEach(function(o){ if(o.spin&&o.visible) o.spin.rotation.z+=dt*1.2; });

  // sinking props
  objects.forEach(function(o){ if(o.sink>0){ o.sink-=dt; o.group.position.y=th(o.x,o.z)-4*(1-Math.max(0,o.sink)/1.2); if(o.sink<=0)o.group.visible=false; } });
  // burning props
  objects.forEach(function(o){ if(o.onFire){ o.fireT-=dt; var fl=0.5+Math.sin(t*20)*0.5; o.glowMats.forEach(function(m){ m.emissive.setHex(0xff5522); m.emissiveIntensity=fl; }); if(o.fireT<=0){ o.onFire=false; o.visible=false; o.group.visible=false; } } });

  if(crater) crater.material.emissiveIntensity=0.6+Math.sin(t*10)*0.3 + nightFactor(dayTime)*0.8;

  // smoke
  var smint=(state==='resolving'?1:rumble?0.7:0.25);
  smoke.forEach(function(s){ if(s.life<=0){ if(Math.random()<smint*0.3){ s.life=2.5+Math.random()*1.5; s.mesh.visible=true; s.mesh.position.set((Math.random()-.5)*3,th(0,0)+11,(Math.random()-.5)*3); s.vy=2+Math.random(); s.mesh.material.opacity=.5; } }
    else { s.life-=dt; s.mesh.position.y+=s.vy*dt; s.mesh.material.opacity=Math.max(0,s.life/4*.5); s.mesh.scale.setScalar(Math.max(.5,1+(4-s.life))); if(s.life<=0)s.mesh.visible=false; } });
  // burst
  burst.forEach(function(p){ if(p.life>0){ p.life-=dt; p.vy-=26*dt; p.mesh.position.x+=p.vx*dt; p.mesh.position.y+=p.vy*dt; p.mesh.position.z+=p.vz*dt; if(p.mesh.position.y<th(0,0)){ p.mesh.visible=false; p.life=0; } } });
  // cracks
  cracks.forEach(function(c){ if(c.visible&&c.scale.z<1)c.scale.z=Math.min(1,c.scale.z+dt*2.5); });
  // ash
  var ashOn=(state==='resolving')||(lastPhase>=3&&state==='playing');
  ash.forEach(function(a){ if(a.life<=0){ if(ashOn&&Math.random()<0.25){ a.life=5; a.mesh.visible=true; a.mesh.position.set(player.position.x+(Math.random()-.5)*90,40,player.position.z+(Math.random()-.5)*90); a.vy=-4-Math.random()*2; } }
    else { a.life-=dt; a.mesh.position.y+=a.vy*dt; if(a.mesh.position.y<0){ a.mesh.visible=false; a.life=0; } } });

  // fireflies (night, near player)
  var nf=nightFactor(dayTime);
  fireflies.forEach(function(ff,idx){ if(nf>0.15 && state!=='resolving'){ ff.mesh.visible=true;
    var ang=t*0.5+ff.seed, rad=8+Math.sin(t+ff.seed)*5;
    ff.mesh.position.set(player.position.x+Math.cos(ang+idx)*rad, th(player.position.x,player.position.z)+1.5+Math.sin(t*2+ff.seed), player.position.z+Math.sin(ang+idx)*rad);
    ff.mesh.material.opacity=nf; } else ff.mesh.visible=false; });

  // lava height
  var target=(state==='resolving'&&lavaMesh._flood)?0.2:baseLavaY; if(state!=='resolving')lavaMesh._flood=false;
  if(baseLavaY>-5.5)lavaMesh.visible=true;
  lavaMesh.position.y+=(target-lavaMesh.position.y)*Math.min(1,dt*4);
  if(state==='playing'&&baseLavaY<=-5.5&&!lavaMesh._flood){ if(lavaMesh.position.y<-5.4)lavaMesh.visible=false; }
  var glowT=(state==='resolving')?3.4:(baseLavaY>-1?1.6:(rumble?0.7:0)); lavaGlow.intensity+=(glowT-lavaGlow.intensity)*Math.min(1,dt*3);

  // day/night + eruption overlay
  var ds=dayState(dayTime);
  var eruptF = state==='resolving'?1:(rumble?0.5:0);
  var sky=ds.sky.clone().lerp(new THREE.Color(0x1a0d10), eruptF*0.85);
  scene.background.lerp(sky, Math.min(1,dt*2.5)); scene.fog.color.copy(scene.background);
  sun.intensity += ((ds.sun*(1-eruptF*0.7)) - sun.intensity)*Math.min(1,dt*2);
  amb.intensity += ((ds.amb + eruptF*0.05) - amb.intensity)*Math.min(1,dt*2);
  hemi.intensity += (ds.hemi - hemi.intensity)*Math.min(1,dt*2);
  // sun moves across sky with day
  var sa=dayTime*6.28; sun.position.set(Math.cos(sa)*90, Math.max(12,Math.sin(sa)*90+30), 40);
  torches.forEach(function(pl){ pl.intensity += ((nf>0.15?1.8:0)-pl.intensity)*Math.min(1,dt*2); });
  el('clock').innerHTML='&#9728; '+ds.label;
  setWind(state==='resolving'?0.06:(rumble?0.04:0.015));

  shake=Math.max(0,shake-dt*1.6);

  var ct=state==='menu'?new THREE.Vector3(VILLAGE_CENTER[0],0,VILLAGE_CENTER[1]):player.position;
  var desired=new THREE.Vector3(ct.x,30,ct.z+30); camera.position.lerp(desired,0.09);
  if(shake>0.001){ camera.position.x+=(Math.random()-.5)*shake*2; camera.position.y+=(Math.random()-.5)*shake*1.4; camera.position.z+=(Math.random()-.5)*shake*2; }
  camera.lookAt(ct.x,1.4,ct.z);

  if(state!=='menu') drawMinimap();
  renderer.render(scene,camera);
}

// ================= WIRE UP =================
el('startBtn').addEventListener('click', startGame);
el('retryBtn').addEventListener('click', startGame);
el('mute').addEventListener('click', function(){ muted=!muted; this.innerHTML=muted?'&#128263;':'&#128266;'; if(muted&&'speechSynthesis' in window)speechSynthesis.cancel(); setWind(muted?0:0.015); setMusicMuted(muted); });
el('saveName').addEventListener('click', function(){ var n=el('nameInput').value.trim()||'Player'; setName(n); var a=loadScores(); for(var i=0;i<a.length;i++){ if(a[i].id===currentEntryId){ a[i].name=n; break; } } writeScores(a); renderBoard(); });
el('clearScores').addEventListener('click', function(){ MEM_SCORES=[]; currentEntryId=null; renderBoard(); updateHud(); });

init(); updateHud(); el('nameInput').value=getName();

  }, []);
  const enter=function(){ startMusic(); setWelcome(false); };
  return (
    <div className="cl-root">
      <style>{CSS}</style>
      {welcome && (
        <div className="welcome">
          <div className="wl-logo"><img src="/logo.png" alt="CodeChef VIT Chennai Chapter" /></div>
          <div className="wl-small">WELCOME TO</div>
          <h1 className="wl-title">CODECHEF</h1>
          <div className="wl-chapter">&lt;VIT Chennai&gt; Chapter</div>
          <div className="wl-presents">P R E S E N T S</div>
          <div className="wl-game">COLOR LAVA — Ember Isle</div>
          <button className="wl-btn" onClick={enter}>ENTER THE ISLE</button>
        </div>
      )}
      <div id="game"></div>
      <div id="loading">Raising Ember Isle from the sea…</div>
      <div id="hud" className="hidden">
        <div id="topbar">
          <div>
            <div id="score">Safe Trials: 0</div>
            <div id="mute">🔊</div>
          </div>
          <div id="rightinfo">
            <div id="best">Best: 0</div>
            <div id="roundtag">Round 1 • Color Rush</div>
            <div id="clock">☀ Morning</div>
          </div>
        </div>
        <div id="announce">
          <div id="target-word">READY</div>
          <div id="target-sub"></div>
        </div>
        <div id="compass"></div>
        <div id="timerwrap">
          <div id="timerbar-bg"><div id="timerbar"></div></div>
          <div id="timernum">10</div>
        </div>
        <canvas id="minimap" width="132" height="132"></canvas>
        <div id="flash"></div>
      </div>
      <div id="start" className="overlay hidden">
        <h1>COLOR LAVA</h1>
        <div className="sub-title">Ember Isle</div>
        <div className="tag">A volcanic island. The crater roars a color and lava pours out — reach something of that color before it engulfs you. The central village holds every color (your safe hub); the outer lands are a gamble. Learn the isle by its landmarks.</div>
        <div className="rounds">
          <div className="rc"><b>1 • Color Rush</b>Learn the isle. Reach the called color. 10s.</div>
          <div className="rc"><b>2 • Chaos</b>NOT green, ANY HOUSE, WOOD, WATER. Nearest match locked — go a little further. 8s.</div>
          <div className="rc"><b>3 • Panic</b>Two nearest locked — reach further. Isle breaks apart. 6s.</div>
          <div className="rc"><b>∞ • Endless</b>New command every few seconds. Lava never stops.</div>
        </div>
        <button id="startBtn">WASH ASHORE</button>
        <div className="controls">Move: <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / arrows • The minimap marks glowing safe zones.</div>
      </div>
      <div id="over" className="overlay hidden">
        <h1 style={{fontSize:'clamp(28px,6vw,50px)'}}>CONSUMED BY LAVA</h1>
        <div className="go-final" id="finalScore">Safe Trials: 0</div>
        <div style={{fontSize:19,fontWeight:900,marginBottom:4}}>🏆 Ember Isle Leaderboard</div>
        <div id="nameRow">
          <input id="nameInput" maxLength={14} placeholder="Your name" />
          <button id="saveName">SAVE</button>
        </div>
        <div id="board"></div>
        <div className="qrbox">
          <div style={{fontSize:14,opacity:.85,marginBottom:6}}>Follow CodeChef VIT Chennai on Instagram</div>
          <div className="qr"><img src="qr.jpeg" alt="@codechef.vitc Instagram QR" /></div>
          <a className="iglink" href="https://www.instagram.com/codechef.vitc" target="_blank" rel="noreferrer">@codechef.vitc</a>
        </div>
        <button id="retryBtn">PLAY AGAIN</button>
        <div className="subtle">Scores saved this session • <span id="clearScores" style={{textDecoration:'underline',cursor:'pointer'}}>clear scores</span></div>
      </div>
    </div>
  );
}