var loadState = {
    preload: function(){
        var txtLoading = game.add.text(game.world.centerX,200,'LOADING...',{font:'15px emulogic',fill:'#fff'});
			txtLoading.anchor.set(.5);
	
		var progressBar = game.add.sprite(game.world.centerX,250,'progressBar');
			progressBar.anchor.set(.5);

        game.load.setPreloadSprite(progressBar);

        game.load.image('part', 'img/part.png')
        game.load.image('bg', 'img/bg.png')
        game.load.image('woodfloor', 'img/woodfloor.png')
        game.load.image('flowerwall', 'img/flowerwall2.png', 25, 25)

        game.load.spritesheet('crab', 'img/crab.png', 19, 19)
        game.load.spritesheet('duda', 'img/dudaSprite.png', 32, 42)
        game.load.spritesheet('robotinho', 'img/robotinho.png', 32, 42)
        game.load.spritesheet('plantinha', 'img/plantinha.png', 50, 50)

        game.load.audio('getcrab', 'sfx/getitem.ogg')
        game.load.audio('losecrab', 'sfx/loseEnemy.wav')
        game.load.audio('music', 'sfx/music.ogg')

        game.physics.startSystem(Phaser.Physics.ARCADE)
    },

    create: function(){
        game.state.start('menu')
    }
}