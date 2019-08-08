/**
 * yuanxin
 */
let heroImgPos = {
	x: 0,
	y: 0,
	width: 32,
	height: 32
};
let heroRect = {
	x: 0,
	y: 0,
	width: 40,
	height: 40
};

let monsterImgPos = {
	x: 858,
	y: 529,
	width: 32,
	height: 32
};
	   
let monsterRect = {
	x: 100,
	y: 100,
	width: 40,
	height: 40
};
function DrawFactory(context, img, imgPos, rect) {
	this.context = context;
	this.img = img;
	this.imgPos = {
		x: imgPos.x,
		y: imgPos.y,
		width: imgPos.w,
		height: imgPos.h
	};;
	this.rect = {
		x: rect.x,
		y: rect.y,
		width: rect.w,
		height: rect.h
	};
}
DrawFactory.prototype = {
	draw: function() {
		this.context
			.drawImage(
				this.img,
				this.imgPos.x,
				this.imgPos.y,
				this.imgPos.width,
				this.imgPos.height,
				this.rect.x,
				this.rect.y,
				this.rect.width,
				this.rect.height
			);
	},
	erase: function() {
		this.context
			.clearRect(0, 0, 500, 300);
	}
}

function Hero(context, img, positon) {
	this.blood = 1000;
	this.imgPos = {
		x: 0,
		y: 0,
		width: 32,
		height: 32
	};
	this.rect = {
		x: positon.x,
		y: positon.y,
		width: 40,
		height: 40
	}
	DrawFactory.call(this,context, img,this.imgPos, this.rect)
}
Hero.prototype = Object.create(DrawFactory.prototype)

function Monster(context, img, rect) {
	this.blood = 1000;
	this.imgPos = {
		x: 858,
		y: 529,
		width: 32,
		height: 32
	};
	DrawFactory.call(this,context, img, rect)
}
Monster.prototype = Object.create(DrawFactory.prototype)

// 我是汪洋老师
function prepare() {
	const imgTask = (img, src) => {
		return new Promise(function (resolve, reject) {
			img.onload = resolve;
			img.onerror = reject;
			img.src = src;
		});
	};
	const context = document.getElementById('content').getContext('2d');
	const heroImg = new Image();
	const allSpriteImg = new Image();
	const allresourceTask = Promise.all([
		imgTask(heroImg, './hero.png'),
		imgTask(allSpriteImg, './all.jpg'),
	]);
	return {
		/**
		 * @param {Function} [callback] - 当准备好了之后要调用的回掉函数
		 */
		getResource(callback) {
			allresourceTask.then(function () {
				callback && callback(context, heroImg, allSpriteImg);
			});
		}
	};
}
var resourceManager = prepare();
resourceManager.getResource(function (context, heroImg, allSpriteImg) {
	var drawHero = new Hero(context, heroImg, {x:0,y:0})
	//var drawMonster = new Monster(context, allSpriteImg, monsterRect)
	drawHero.draw();
	//drawMonster.draw();
	document.onkeydown = function(e) {
		// alert(e);
		var e = window.event || e;
		switch(e.keyCode){
			case 37: //左
				heroRect.x--;
				if (heroRect.x <= 0) {
					return;
				}
				break; 
			case 38: //上
				heroRect.y--;
				if (heroRect.y <= 0) {
					return;
				}
				break;
			case 39:  //右
				heroRect.x++;
				if (heroRect.x >= 460) {
					return;
				}
				break;	
			case 40:  //下
				heroRect.y++;
				if (heroRect.y >= 260) {
					return;
				}
				break;
			default:
				break;	 			
		}
		if (heroRect.x > monsterRect.x-40 && heroRect.x < monsterRect.x+40 
			&& heroRect.y > monsterRect.y-40 && heroRect.y < monsterRect.y+40) {
			return;
		}
		drawHero.erase();
		drawMonster.draw();
		drawHero.draw();
		}
});




