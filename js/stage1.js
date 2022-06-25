var stage1State = {
    create: function(){
        //SONS E EFEITOS SONOROS
        this.music = game.add.audio('music')
        this.music.loop = true
        this.music.volume = 0.01;
        this.music.play()

        this.sndCrab = game.add.audio('getcrab')
        this.sndCrab.volume = 0.01;

        this.sndLoseCrab = game.add.audio('losecrab')
        this.sndLoseCrab.volume = 0.01;

        game.add.sprite(0,0,'bg')

        this.maze = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,1,3,0,1,0,1,0,0,1,3,0,0,1],
            [1,0,0,0,0,1,0,1,0,0,1,0,1,0,1],
            [1,0,1,0,1,1,0,1,1,0,0,0,1,0,1],
            [1,0,1,0,0,1,0,1,3,0,1,1,1,0,1],
            [1,1,1,2,1,1,0,1,1,0,1,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
            [1,0,1,1,1,1,0,1,1,1,1,0,1,3,1],
            [1,0,0,0,3,1,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ]

        this.blocks = game.add.group()
        this.blocks.enableBody = true

        this.crabPositions = []

        for(var row in this.maze){
            for(var col in this.maze[row]){
                var tile = this.maze[row][col]

                var gameSizeScale = 50

                var x = col * gameSizeScale
                var y = row * gameSizeScale

                if(tile === 1){
                    var block = this.blocks.create(x, y, 'plantinha')
                        block.body.immovable = true
                }
                if(tile === 2){
                    this.player = game.add.sprite(x + 25,y + 25,'duda')
                    this.player.anchor.set(.5)
                    game.physics.arcade.enable(this.player)
                    this.player.animations.add('goLeft',[0,1,2,3],12, true)
                    this.player.animations.add('goDown',[4,5,6,7],12, true)
                    this.player.animations.add('goRight',[8,9,10,11],12, true)
                    this.player.animations.add('goUp',[12,13,14,15],12, true)
                }
                if(tile === 3){
                    var position = {
                        x: x + 25,
                        y: y + 25,
                    }
                    this.crabPositions.push(position)
                }
            }
        }
        //robotinho(inimigo)
        this.enemy = game.add.sprite(75,75,'robotinho')
        this.enemy.anchor.set(.5)
        game.physics.arcade.enable(this.enemy)
        this.enemy.animations.add('goLeft',[0,1,2,3],12, true)
        this.enemy.animations.add('goDown',[4,5,6,7],12, true)
        this.enemy.animations.add('goRight',[8,9,10,11],12, true)
        this.enemy.animations.add('goUp',[12,13,14,15],12, true)
        this.enemy.direction = 'DOWN'


        //Criar crab
        this.crab = {}
        this.crab.position = this.newPosition()
        this.crab = game.add.sprite(this.crab.position.x,this.crab.position.y,'crab')
        this.crab.anchor.set(.5)
        this.crab.animations.add('moveCrab',[0,1,2,1,3,1,0],2, true).play();
        game.physics.arcade.enable(this.crab)

        //coletar crab
        this.crabs = 0
        this.txtCrabs = game.add.text(15,15, 'Crabs:' + this.getText(this.crabs),{font:'15px emulogic', fill:'#000'})
        //controles
        this.controls = game.input.keyboard.createCursorKeys()

    },

    update: function(){
        game.physics.arcade.collide(this.player, this.blocks)
        game.physics.arcade.overlap(this.player, this.crab, this.getCrab, null, this)
        game.physics.arcade.overlap(this.player, this.enemy, this.loseCrab , null, this)

        this.moveEnemy()
        this.movePlayer()
    },
    loseCrab: function(){
        this.sndLoseCrab.play();

        if(this.crabs > 0){
            this.crabs--
            this.txtCrabs.text = 'Crabs:' + this.getText(this.crabs)
        }
    },

    getCrab: function(){
        this.sndCrab.play()
        this.crabs++
        this.txtCrabs.text = 'Crabs:' + this.getText(this.crabs)

        this.crab.position = this.newPosition()
    },

    getText: function(value){
        if(value < 10){
            return '00' + value.toString()
        }
        if(value < 100){
            return '0' + value.toString()
        }
        return value.toString()
    },

    moveEnemy: function(){
        if(Math.floor(this.enemy.x -25)%50 === 0 && Math.floor(this.enemy.y -25)%50 === 0 ){
            var enemyCol = Math.floor(this.enemy.x/50)
            var enemyRow = Math.floor(this.enemy.y/50)
            var validPath = []

            if(this.maze[enemyRow][enemyCol-1] !== 1 && this.enemy.direction !== 'RIGHT'){
                validPath.push('LEFT')
            }
            if(this.maze[enemyRow][enemyCol+1] !== 1 && this.enemy.direction !== 'LEFT'){
                validPath.push('RIGHT')
            }
            if(this.maze[enemyRow-1][enemyCol] !== 1 && this.enemy.direction !== 'DOWN'){
                validPath.push('UP')
            }
            if(this.maze[enemyRow+1][enemyCol] !== 1 && this.enemy.direction !== 'UP'){
                validPath.push('DOWN')
            }

            this.enemy.direction = validPath[Math.floor(Math.random()*validPath.length)]
        }
        switch(this.enemy.direction){
            case 'LEFT':
                this.enemy.x -= 1
                this.enemy.animations.play('goLeft')
                break
            case 'RIGHT':
                this.enemy.x += 1
                this.enemy.animations.play('goRight')
                break
            case 'UP':
                this.enemy.y -= 1
                this.enemy.animations.play('goUp')
                break
            case 'DOWN':
                this.enemy.y += 1
                this.enemy.animations.play('goDown')
                break
        }
    },

    movePlayer: function(){
        this.player.body.velocity.x = 0
        this.player.body.velocity.y = 0


        if(this.controls.left.isDown && !this.controls.right.isDown){
            this.player.body.velocity.x = -100;
            this.player.direction = "left"
        } else
        if(this.controls.right.isDown && !this.controls.left.isDown){
            this.player.body.velocity.x = 100;
            this.player.direction = "right"
        } else
        if(this.controls.up.isDown && !this.controls.down.isDown){
            this.player.body.velocity.y = -100;
            this.player.direction = "up"
        } else
        if(this.controls.down.isDown && !this.controls.up.isDown){
            this.player.body.velocity.y = 100;
            this.player.direction = "down"
        }
        switch(this.player.direction){
            case "left":
                this.player.animations.play('goLeft')
                break
            case "right":
                this.player.animations.play('goRight')
                break
            case "up":
                this.player.animations.play('goUp')
                break
            case "down":
                this.player.animations.play('goDown')
                break
        }

        if(this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0){
            this.player.animations.stop()
        }
    },

    newPosition: function(){
        var pos = this.crabPositions[Math.floor(Math.random()*this.crabPositions.length)]
        while(this.crab.position === pos){
            pos = this.crabPositions[Math.floor(Math.random()*this.crabPositions.length)]
        }
        return pos
    }
}