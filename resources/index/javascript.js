
window.onload = function(){
	var items = T.dom.q("item");
	var count = items.length;
	var colorFlag = null;
	var size = [{
		height: 221,
		width: 149
	},
	{
		height: 240,
		width: 171
	},
	{
		height: 279,
		width: 176
	},
	{
		height: 303,
		width: 215
	},
	{
		height: 350,
		width: 244
	}];
	for(var i=0; i<count; i++){
		(function(_i){
			T.event.on(items[_i], "mouseover", function(){
				focusItem(_i);
			});
		})(i);
	}
	focusItem(2);
	function focusItem(num){
		if(colorFlag){
			clearTimeout(colorFlag);
			colorFlag = null;
		}
		var styles = {};
		var leftFlag = Math.abs(num-2)*12+4;
		for(var i=0; i<count; i++){
			var t = size[4-Math.abs(num-i)];
			styles.left = leftFlag + "px";
			styles.width = t.width + "px";
			styles.height = t.height + "px";
			//styles.background = "#144273";
			styles["z-index"] = 5 - Math.abs(num-i);
			T.dom.setStyles(items[i], styles);
			leftFlag = leftFlag + t.width - 17;
		}
		/*
		T.dom.setStyle(items[num], "background", "#777799");
		colorFlag = setTimeout(function(){
			T.dom.setStyle(items[num], "background", "#002157");
		}, 1000);
*/
	}
}