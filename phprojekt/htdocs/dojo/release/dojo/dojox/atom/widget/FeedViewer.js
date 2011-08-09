/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


dojo._hasResource["dojox.atom.widget.FeedViewer"]||(dojo._hasResource["dojox.atom.widget.FeedViewer"]=!0,dojo.provide("dojox.atom.widget.FeedViewer"),dojo.require("dijit._Widget"),dojo.require("dijit._Templated"),dojo.require("dijit._Container"),dojo.require("dojox.atom.io.Connection"),dojo.requireLocalization("dojox.atom.widget","FeedViewerEntry",null,"ROOT,ar,ca,cs,da,de,el,es,fi,fr,he,hu,it,ja,kk,ko,nb,nl,pl,pt,pt-pt,ro,ru,sk,sl,sv,th,tr,zh,zh-tw"),dojo.experimental("dojox.atom.widget.FeedViewer"),
dojo.declare("dojox.atom.widget.FeedViewer",[dijit._Widget,dijit._Templated,dijit._Container],{feedViewerTableBody:null,feedViewerTable:null,entrySelectionTopic:"",url:"",xmethod:!1,localSaveOnly:!1,templateString:dojo.cache("dojox.atom","widget/templates/FeedViewer.html",'<div class="feedViewerContainer" dojoAttachPoint="feedViewerContainerNode">\n\t<table cellspacing="0" cellpadding="0" class="feedViewerTable">\n\t\t<tbody dojoAttachPoint="feedViewerTableBody" class="feedViewerTableBody">\n\t\t</tbody>\n\t</table>\n</div>\n'),
_feed:null,_currentSelection:null,_includeFilters:null,alertsEnabled:!1,postCreate:function(){this._includeFilters=[];if(this.entrySelectionTopic!=="")this._subscriptions=[dojo.subscribe(this.entrySelectionTopic,this,"_handleEvent")];this.atomIO=new dojox.atom.io.Connection;this.childWidgets=[]},startup:function(){this.containerNode=this.feedViewerTableBody;var a=this.getDescendants(),b;for(b in a){var c=a[b];c&&c.isFilter&&(this._includeFilters.push(new dojox.atom.widget.FeedViewer.CategoryIncludeFilter(c.scheme,
c.term,c.label)),c.destroy())}this.url!==""&&this.setFeedFromUrl(this.url)},clear:function(){this.destroyDescendants()},setFeedFromUrl:function(a){if(a!==""){if(this._isRelativeURL(a)){var b="",b=a.charAt(0)!=="/"?this._calculateBaseURL(window.location.href,!0):this._calculateBaseURL(window.location.href,!1);this.url=b+a}this.atomIO.getFeed(a,dojo.hitch(this,this.setFeed))}},setFeed:function(a){this._feed=a;this.clear();var b=function(a){a=a.split(",");a.pop();return a.join(",")},c=a.entries.sort(dojo.hitch(this,
function(a,b){var c=this._displayDateForEntry(a),d=this._displayDateForEntry(b);return c>d?-1:c<d?1:0}));if(a)for(var a=null,d=0;d<c.length;d++){var e=c[d];if(this._isFilterAccepted(e)){var f=this._displayDateForEntry(e),g="";f!==null&&(g=b(f.toLocaleString()),g===""&&(g=""+(f.getMonth()+1)+"/"+f.getDate()+"/"+f.getFullYear()));if(a===null||a!=g)this.appendGrouping(g),a=g;this.appendEntry(e)}}},_displayDateForEntry:function(a){return a.updated?a.updated:a.modified?a.modified:a.issued?a.issued:new Date},
appendGrouping:function(a){var b=new dojox.atom.widget.FeedViewerGrouping({});b.setText(a);this.addChild(b);this.childWidgets.push(b)},appendEntry:function(a){var b=new dojox.atom.widget.FeedViewerEntry({xmethod:this.xmethod});b.setTitle(a.title.value);b.setTime(this._displayDateForEntry(a).toLocaleTimeString());b.entrySelectionTopic=this.entrySelectionTopic;b.feed=this;this.addChild(b);this.childWidgets.push(b);this.connect(b,"onClick","_rowSelected");a.domNode=b.entryNode;a._entryWidget=b;b.entry=
a},deleteEntry:function(a){this.localSaveOnly?this._removeEntry(a,!0):this.atomIO.deleteEntry(a.entry,dojo.hitch(this,this._removeEntry,a),null,this.xmethod);dojo.publish(this.entrySelectionTopic,[{action:"delete",source:this,entry:a.entry}])},_removeEntry:function(a,b){if(b){var c=dojo.indexOf(this.childWidgets,a),d=this.childWidgets[c-1],c=this.childWidgets[c+1];d.declaredClass==="dojox.atom.widget.FeedViewerGrouping"&&(c===void 0||c.declaredClass==="dojox.atom.widget.FeedViewerGrouping")&&d.destroy();
a.destroy()}},_rowSelected:function(a){for(a=a.target;a;){if(a.attributes){var b=a.attributes.getNamedItem("widgetid");if(b&&b.value.indexOf("FeedViewerEntry")!=-1)break}a=a.parentNode}for(b=0;b<this._feed.entries.length;b++){var c=this._feed.entries[b];if(a===c.domNode&&this._currentSelection!==c){dojo.addClass(c.domNode,"feedViewerEntrySelected");dojo.removeClass(c._entryWidget.timeNode,"feedViewerEntryUpdated");dojo.addClass(c._entryWidget.timeNode,"feedViewerEntryUpdatedSelected");this.onEntrySelected(c);
this.entrySelectionTopic!==""&&dojo.publish(this.entrySelectionTopic,[{action:"set",source:this,feed:this._feed,entry:c}]);this._isEditable(c)&&c._entryWidget.enableDelete();this._deselectCurrentSelection();this._currentSelection=c;break}else if(a===c.domNode&&this._currentSelection===c){dojo.publish(this.entrySelectionTopic,[{action:"delete",source:this,entry:c}]);this._deselectCurrentSelection();break}}},_deselectCurrentSelection:function(){if(this._currentSelection)dojo.addClass(this._currentSelection._entryWidget.timeNode,
"feedViewerEntryUpdated"),dojo.removeClass(this._currentSelection.domNode,"feedViewerEntrySelected"),dojo.removeClass(this._currentSelection._entryWidget.timeNode,"feedViewerEntryUpdatedSelected"),this._currentSelection._entryWidget.disableDelete(),this._currentSelection=null},_isEditable:function(a){var b=!1;if(a&&a!==null&&a.links&&a.links!==null)for(var c in a.links)if(a.links[c].rel&&a.links[c].rel=="edit"){b=!0;break}return b},onEntrySelected:function(){},_isRelativeURL:function(a){var b=function(a){var b=
!1;a.indexOf("http://")===0&&(b=!0);return b},c=!1;a!==null&&!function(a){var b=!1;a.indexOf("file://")===0&&(b=!0);return b}(a)&&!b(a)&&(c=!0);return c},_calculateBaseURL:function(a,b){var c=null;if(a!==null){var d=a.indexOf("?");d!=-1&&(a=a.substring(0,d));if(b)d=a.lastIndexOf("/"),c=d>0&&d<a.length&&d!==a.length-1?a.substring(0,d+1):a;else if(d=a.indexOf("://"),d>0){d+=3;var c=a.substring(0,d),e=a.substring(d,a.length),d=e.indexOf("/"),c=d<e.length&&d>0?c+e.substring(0,d):c+e}}return c},_isFilterAccepted:function(a){var b=
!1;if(this._includeFilters&&this._includeFilters.length>0)for(var c=0;c<this._includeFilters.length;c++){if(this._includeFilters[c].match(a)){b=!0;break}}else b=!0;return b},addCategoryIncludeFilter:function(a){if(a){var b=a.scheme,c=a.term,a=a.label,d=!0;b||(b=null);c||(b=null);a||(b=null);if(this._includeFilters&&this._includeFilters.length>0)for(var e=0;e<this._includeFilters.length;e++){var f=this._includeFilters[e];if(f.term===c&&f.scheme===b&&f.label===a){d=!1;break}}d&&this._includeFilters.push(dojox.atom.widget.FeedViewer.CategoryIncludeFilter(b,
c,a))}},removeCategoryIncludeFilter:function(a){if(a){var b=a.scheme,c=a.term,a=a.label;b||(b=null);c||(b=null);a||(b=null);var d=[];if(this._includeFilters&&this._includeFilters.length>0){for(var e=0;e<this._includeFilters.length;e++){var f=this._includeFilters[e];f.term===c&&f.scheme===b&&f.label===a||d.push(f)}this._includeFilters=d}}},_handleEvent:function(a){a.source!=this&&(a.action=="update"&&a.entry?(this.localSaveOnly||this.atomIO.updateEntry(a.entry,dojo.hitch(a.source,a.callback),null,
!0),this._currentSelection._entryWidget.setTime(this._displayDateForEntry(a.entry).toLocaleTimeString()),this._currentSelection._entryWidget.setTitle(a.entry.title.value)):a.action=="post"&&a.entry&&(this.localSaveOnly?this._addEntry(a.entry):this.atomIO.addEntry(a.entry,this.url,dojo.hitch(this,this._addEntry))))},_addEntry:function(a){this._feed.addEntry(a);this.setFeed(this._feed);dojo.publish(this.entrySelectionTopic,[{action:"set",source:this,feed:this._feed,entry:a}])},destroy:function(){this.clear();
dojo.forEach(this._subscriptions,dojo.unsubscribe)}}),dojo.declare("dojox.atom.widget.FeedViewerEntry",[dijit._Widget,dijit._Templated],{templateString:dojo.cache("dojox.atom","widget/templates/FeedViewerEntry.html",'<tr class="feedViewerEntry" dojoAttachPoint="entryNode" dojoAttachEvent="onclick:onClick">\n    <td class="feedViewerEntryUpdated" dojoAttachPoint="timeNode">\n    </td>\n    <td>\n        <table border="0" width="100%" dojoAttachPoint="titleRow">\n            <tr padding="0" border="0">\n                <td class="feedViewerEntryTitle" dojoAttachPoint="titleNode">\n                </td>\n                <td class="feedViewerEntryDelete" align="right">\n                    <span dojoAttachPoint="deleteButton" dojoAttachEvent="onclick:deleteEntry" class="feedViewerDeleteButton" style="display:none;">[delete]</span>\n                </td>\n            <tr>\n        </table>\n    </td>\n</tr>\n'),
entryNode:null,timeNode:null,deleteButton:null,entry:null,feed:null,postCreate:function(){this.deleteButton.innerHTML=dojo.i18n.getLocalization("dojox.atom.widget","FeedViewerEntry").deleteButton},setTitle:function(a){this.titleNode.lastChild&&this.titleNode.removeChild(this.titleNode.lastChild);var b=document.createElement("div");b.innerHTML=a;this.titleNode.appendChild(b)},setTime:function(a){this.timeNode.lastChild&&this.timeNode.removeChild(this.timeNode.lastChild);this.timeNode.appendChild(document.createTextNode(a))},
enableDelete:function(){if(this.deleteButton!==null)this.deleteButton.style.display="inline"},disableDelete:function(){if(this.deleteButton!==null)this.deleteButton.style.display="none"},deleteEntry:function(a){a.preventDefault();a.stopPropagation();this.feed.deleteEntry(this)},onClick:function(){}}),dojo.declare("dojox.atom.widget.FeedViewerGrouping",[dijit._Widget,dijit._Templated],{templateString:dojo.cache("dojox.atom","widget/templates/FeedViewerGrouping.html",'<tr dojoAttachPoint="groupingNode" class="feedViewerGrouping">\n\t<td colspan="2" dojoAttachPoint="titleNode" class="feedViewerGroupingTitle">\n\t</td>\n</tr>\n'),
groupingNode:null,titleNode:null,setText:function(a){this.titleNode.lastChild&&this.titleNode.removeChild(this.titleNode.lastChild);this.titleNode.appendChild(document.createTextNode(a))}}),dojo.declare("dojox.atom.widget.AtomEntryCategoryFilter",[dijit._Widget,dijit._Templated],{scheme:"",term:"",label:"",isFilter:!0}),dojo.declare("dojox.atom.widget.FeedViewer.CategoryIncludeFilter",null,{constructor:function(a,b,c){this.scheme=a;this.term=b;this.label=c},match:function(a){var b=!1;if(a!==null&&
(a=a.categories,a!==null))for(var c=0;c<a.length;c++){var d=a[c];if(this.scheme!==""&&this.scheme!==d.scheme)break;if(this.term!==""&&this.term!==d.term)break;if(this.label!==""&&this.label!==d.label)break;b=!0}return b}}));