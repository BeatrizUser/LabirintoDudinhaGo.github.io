var menuState = {
    create: function(){
        this.music = game.add.audio('music')
        this.music.loop = true
        this.music.volume = 0.01;
        this.music.play()

        var txtLabirinto = game.add.text(game.world.centerX, 200, 'DudinhaGo!',{font:'40px emulogic',fill:'#fff'})
            txtLabirinto.anchor.set(.5)

        var txtPressStart = game.add.text(game.world.centerX, 550, 'PRESS START',{font:'25px emulogic',fill:'#fff'})
            txtPressStart.anchor.set(.5)
        
        // var imgDudaStart = game.add.image('duda',game.world.centerX, 250, 32, 42)
        //     imgDudaStart.anchor.set(.5)

        game.add.tween(txtPressStart).to({y:260 },1300).start()

        game.time.events.add(1500,function(){
            var imgDudaStart = game.add.sprite(game.world.centerX, 350,'duda')
                imgDudaStart.anchor.set(.5)
        },this)

        game.time.events.add(1000,function(){
            var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
                enterKey.onDown.addOnce(this.startGame, this)
        },this)
    },

    startGame: function(){
        this.music.stop()
        game.state.start('stage1')
    }

}