/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.color.Palette"]||(dojo._hasResource["dojox.color.Palette"]=!0,dojo.provide("dojox.color.Palette"),dojo.require("dojox.color"),function(){function n(a,b,c){var d=new dojox.color.Palette;d.colors=[];dojo.forEach(a.colors,function(a){d.colors.push(new dojox.color.Color({r:Math.min(255,Math.max(0,b=="dr"?a.r+c:a.r)),g:Math.min(255,Math.max(0,b=="dg"?a.g+c:a.g)),b:Math.min(255,Math.max(0,b=="db"?a.b+c:a.b)),a:Math.min(1,Math.max(0,b=="da"?a.a+c:a.a))}))});return d}function j(a,
b,c){var d=new dojox.color.Palette;d.colors=[];dojo.forEach(a.colors,function(a){a=a.toCmy();d.colors.push(dojox.color.fromCmy(Math.min(100,Math.max(0,b=="dc"?a.c+c:a.c)),Math.min(100,Math.max(0,b=="dm"?a.m+c:a.m)),Math.min(100,Math.max(0,b=="dy"?a.y+c:a.y))))});return d}function k(a,b,c){var d=new dojox.color.Palette;d.colors=[];dojo.forEach(a.colors,function(a){a=a.toCmyk();d.colors.push(dojox.color.fromCmyk(Math.min(100,Math.max(0,b=="dc"?a.c+c:a.c)),Math.min(100,Math.max(0,b=="dm"?a.m+c:a.m)),
Math.min(100,Math.max(0,b=="dy"?a.y+c:a.y)),Math.min(100,Math.max(0,b=="dk"?a.b+c:a.b))))});return d}function l(a,b,c){var d=new dojox.color.Palette;d.colors=[];dojo.forEach(a.colors,function(a){a=a.toHsl();d.colors.push(dojox.color.fromHsl((b=="dh"?a.h+c:a.h)%360,Math.min(100,Math.max(0,b=="ds"?a.s+c:a.s)),Math.min(100,Math.max(0,b=="dl"?a.l+c:a.l))))});return d}function m(a,b,c){var d=new dojox.color.Palette;d.colors=[];dojo.forEach(a.colors,function(a){a=a.toHsv();d.colors.push(dojox.color.fromHsv((b==
"dh"?a.h+c:a.h)%360,Math.min(100,Math.max(0,b=="ds"?a.s+c:a.s)),Math.min(100,Math.max(0,b=="dv"?a.v+c:a.v))))});return d}var g=dojox.color;g.Palette=function(a){this.colors=[];if(a instanceof dojox.color.Palette)this.colors=a.colors.slice(0);else if(a instanceof dojox.color.Color)this.colors=[null,null,a,null,null];else if(dojo.isArray(a))this.colors=dojo.map(a.slice(0),function(a){return dojo.isString(a)?new dojox.color.Color(a):a});else if(dojo.isString(a))this.colors=[null,null,new dojox.color.Color(a),
null,null]};dojo.extend(g.Palette,{transform:function(a){var b=n;if(a.use){var c=a.use.toLowerCase();c.indexOf("hs")==0?b=c.charAt(2)=="l"?l:m:c.indexOf("cmy")==0&&(b=c.charAt(3)=="k"?k:j)}else if("dc"in a||"dm"in a||"dy"in a)b="dk"in a?k:j;else if("dh"in a||"ds"in a)b="dv"in a?m:l;var c=this,d;for(d in a)d!="use"&&(c=b(c,d,a[d]));return c},clone:function(){return new g.Palette(this)}});dojo.mixin(g.Palette,{generators:{analogous:function(a){var b=a.high||60,c=a.low||18,a=(dojo.isString(a.base)?new dojox.color.Color(a.base):
a.base).toHsv(),d=Math.max(10,a.s<=95?a.s+5:100-(a.s-95)),f=a.v>=92?a.v-9:Math.max(a.v+9,20),e=a.v<=90?Math.max(a.v+5,20):95+Math.ceil((a.v-90)/2),h=[d,a.s>1?a.s-1:21-a.s,a.s,d,d],i=[f,e,a.v,f,e];return new g.Palette(dojo.map([(a.h+c+360)%360,(a.h+Math.round(c/2)+360)%360,a.h,(a.h-Math.round(b/2)+360)%360,(a.h-b+360)%360],function(a,b){return dojox.color.fromHsv(a,h[b],i[b])}))},monochromatic:function(a){var a=dojo.isString(a.base)?new dojox.color.Color(a.base):a.base,b=a.toHsv(),c=b.s-30>9?b.s-30:
b.s+30,d=b.s,f=b.v-20>20?b.v-20:b.v+60,e=b.v-50>20?b.v-50:b.v+30;return new g.Palette([dojox.color.fromHsv(b.h,c,100-(100-b.v)*0.8),dojox.color.fromHsv(b.h,d,e),a,dojox.color.fromHsv(b.h,c,e),dojox.color.fromHsv(b.h,d,f)])},triadic:function(a){var a=dojo.isString(a.base)?new dojox.color.Color(a.base):a.base,b=a.toHsv(),c=(b.h-157+360)%360,d=b.s>90?b.s-10:b.s+10,f=b.s>95?b.s-5:b.s+5,e=b.v-20>20?b.v-20:b.v+20,h=b.v-30>20?b.v-30:b.v+30,i=b.v-30>70?b.v-30:b.v+30;return new g.Palette([dojox.color.fromHsv((b.h+
57+360)%360,b.s>20?b.s-10:b.s+10,b.v),dojox.color.fromHsv(b.h,d,h),a,dojox.color.fromHsv(c,d,e),dojox.color.fromHsv(c,f,i)])},complementary:function(a){var a=dojo.isString(a.base)?new dojox.color.Color(a.base):a.base,b=a.toHsv(),c=b.h*2+137<360?b.h*2+137:Math.floor(b.h/2)-137,d=100-(100-b.s)*0.9,f=Math.min(100,b.s+20),e=b.v>20?b.v-30:b.v+30;return new g.Palette([dojox.color.fromHsv(b.h,Math.max(b.s-10,0),Math.min(100,b.v+30)),dojox.color.fromHsv(b.h,d,e),a,dojox.color.fromHsv(c,f,e),dojox.color.fromHsv(c,
b.s,b.v)])},splitComplementary:function(a){var b=dojo.isString(a.base)?new dojox.color.Color(a.base):a.base,c=a.da||30,a=b.toHsv(),d=a.h*2+137<360?a.h*2+137:Math.floor(a.h/2)-137,f=(d-c+360)%360,c=(d+c)%360,d=100-(100-a.s)*0.9,e=Math.min(100,a.s+20),h=a.v>20?a.v-30:a.v+30;return new g.Palette([dojox.color.fromHsv(f,Math.max(a.s-10,0),Math.min(100,a.v+30)),dojox.color.fromHsv(f,d,h),b,dojox.color.fromHsv(c,e,h),dojox.color.fromHsv(c,a.s,a.v)])},compound:function(a){var a=dojo.isString(a.base)?new dojox.color.Color(a.base):
a.base,b=a.toHsv(),c=b.h*2+18<360?b.h*2+18:Math.floor(b.h/2)-18,d=b.h*2+120<360?b.h*2+120:Math.floor(b.h/2)-120,f=b.h*2+99<360?b.h*2+99:Math.floor(b.h/2)-99,e=b.s-10>80?b.s-10:b.s+10,h=b.s-25>10?b.s-25:b.s+25,i=b.v-20>80?b.v-20:b.v+20,j=Math.max(b.v,20);return new g.Palette([dojox.color.fromHsv(c,b.s-40>10?b.s-40:b.s+40,b.v-40>10?b.v-40:b.v+40),dojox.color.fromHsv(c,e,i),a,dojox.color.fromHsv(d,h,j),dojox.color.fromHsv(f,e,i)])},shades:function(a){var a=dojo.isString(a.base)?new dojox.color.Color(a.base):
a.base,b=a.toHsv(),c=b.s==100&&b.v==0?0:b.s,d=b.v-25>=20?b.v-25:b.v+55,f=b.v-75>=20?b.v-75:b.v+5,e=Math.max(b.v-10,20);return new g.Palette([new dojox.color.fromHsv(b.h,c,b.v-50>20?b.v-50:b.v+30),new dojox.color.fromHsv(b.h,c,d),a,new dojox.color.fromHsv(b.h,c,f),new dojox.color.fromHsv(b.h,c,e)])}},generate:function(a,b){if(dojo.isFunction(b))return b({base:a});else if(g.Palette.generators[b])return g.Palette.generators[b]({base:a});throw Error("dojox.color.Palette.generate: the specified generator ('"+
b+"') does not exist.");}})}());