'use strict'
window.onload = function() {

	var images ={
		"img1" : ['http://ngm.nationalgeographic.com/wallpaper/img/2013/08/01-simba-east-cubs-zebra-feast_1600.jpg',
	'http://img.wallpaperfolder.com/f/50D6DEC22335/44-cool-national-geographic-landscape.jpg',
	'http://ngm.nationalgeographic.com/wallpaper/img/2012/11/08-penguins-launches-to-ice_1600.jpg',
	'http://img.wallpaperfolder.com/f/70EA09C8FD85/national-geographic-1920x1080.jpg',
	'http://ngm.nationalgeographic.com/wallpaper/img/2013/04/01-manatees-swim-close-to-surface_1600.jpg'],
		"img2" : ['http://cdn.wallpapersafari.com/18/91/YTuUgj.jpg',
	'http://wallpapere.org/wp-content/uploads/2011/10/poze-reale-toamna-1024x640.jpg',
	'http://wallpapercave.com/wp/go5oSVU.jpg',
	'http://www.thedesignwork.com/wp-content/uploads/2012/01/National-Geographic-Wallpaper-08.jpg',
	'http://ngm.nationalgeographic.com/wallpaper/img/2013/08/12-cboy-zebra-feast_1600.jpg'],
		"img3": ['http://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg',
	'http://www.fastfoodmenunutrition.com/wp-content/uploads/2015/03/fast-food.jpg',
	'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
	'http://tremendouswallpapers.com/wp-content/uploads/2014/12/basket-fruit-food-free_340459.jpg',
	'http://i2.cdn.turner.com/cnnnext/dam/assets/150204162810-chinese-food-hairy-crab-super-169.jpg'],
		"img4" : ['http://cdn.wallpapersafari.com/18/91/YTuUgj.jpg',
	'http://wallpapere.org/wp-content/uploads/2011/10/poze-reale-toamna-1024x640.jpg',
	'http://wallpapercave.com/wp/go5oSVU.jpg',
	'http://www.thedesignwork.com/wp-content/uploads/2012/01/National-Geographic-Wallpaper-08.jpg',
	'http://ngm.nationalgeographic.com/wallpaper/img/2013/08/12-cboy-zebra-feast_1600.jpg'],
		"img5" : ['http://ngm.nationalgeographic.com/wallpaper/img/2013/08/01-simba-east-cubs-zebra-feast_1600.jpg',
	'http://img.wallpaperfolder.com/f/50D6DEC22335/44-cool-national-geographic-landscape.jpg',
	'http://ngm.nationalgeographic.com/wallpaper/img/2012/11/08-penguins-launches-to-ice_1600.jpg',
	'http://img.wallpaperfolder.com/f/70EA09C8FD85/national-geographic-1920x1080.jpg',
	'http://ngm.nationalgeographic.com/wallpaper/img/2013/04/01-manatees-swim-close-to-surface_1600.jpg']
	}

	var pics = document.getElementsByName("pic")
	pics.forEach(function(pic){
		var t=Math.floor(Math.random()*5)+1
		//console.log(t)
		var img=pic.getElementsByTagName("img")[0]
		var btn=pic.getElementsByTagName("button")[0]
		img.value=setInterval( function(){
			//console.log(img.id)
			if (btn.innerHTML==="STOP"){
				var x=Math.floor(Math.random()*5)
				img.src=images[img.id][x]	
			}else if (btn.innerHTML==="START"){}
		},t*1000)
		btn.onclick=function(){
			console.log(btn.id,"button is clicked")
			if (btn.innerHTML==="STOP"){
				btn.innerHTML="START"
			}else if (btn.innerHTML==="START"){
				btn.innerHTML="STOP"
			}
			console.log(btn.innerHTML)
		}
	})
}