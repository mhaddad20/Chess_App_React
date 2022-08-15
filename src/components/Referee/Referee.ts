

export default class Referee {
    isValidMove( px:number,py:number,x:number,y:number,board:any){
        // console.log(px,py,x,y)
        const enemy_pieces_black=['bp','br','bn','bb','bq']
        const enemy_pieces_white=['wp','wr','wn','wb','wq']

       if(board[py][px]==='wp'){
        
        if(py===6 && y===4 && board[py-1][px]===''&& board[py-2][px]===''&&x===px){
            return true
        }
        if(board[y][x]==='' && y-py===-1 && x-px===0 ){
            return true
        }
        if(enemy_pieces_black.includes(board[py-1][px-1]) && x===px-1 && y===py-1){
            return true
        }
        if(enemy_pieces_black.includes(board[py-1][px+1]) && x===px+1 && y===py-1){
            return true
        }
       }

       if(board[py][px]==='bp'){
        if(py===1 && y===3 && board[py+1][px]===''&& board[py+2][px]===''&&x===px){
            return true
        }
        if(board[y][x]==='' && y-py===1 && x-px===0 ){
            return true
        }
        if(enemy_pieces_white.includes(board[py+1][px-1]) && x===px-1 && y===py+1){
            return true
        }
        if(enemy_pieces_white.includes(board[py+1][px+1]) && x===px+1 && y===py+1){
            return true
        }
       }

       //rooks
       if(board[py][px]==='wr' || board[py][px]==='br'){
        const enemy_pieces = board[py][px]=== 'wr' ? ['bp','br','bn','bb','bq'] : ['wp','wr','wn','wb','wq']
        const ally_pieces = board[py][px]=== 'wr' ? ['wp','wr','wn','wb','wq'] : ['bp','br','bn','bb','bq'] 

        //move vertically
        if(x===px){
            for(let i=py-1;i>y;i--){
                if(enemy_pieces.includes(board[i][px]) || ally_pieces.includes(board[i][px])){
                    return false
                }
            }
            for(let i=py+1;i<y;i++){
                if(enemy_pieces.includes(board[i][px]) || ally_pieces.includes(board[i][px])){
                    return false
                }
            }
            if(enemy_pieces.includes(board[y][x])|| board[y][x]===''){
                return true
            }
        }
        //move horizontally
        if(y===py){
            for(let i=px+1;i<x;i++){
                if(enemy_pieces.includes(board[py][i]) || ally_pieces.includes(board[py][i])){
                    return false
                }
            }
            for(let i=px-1;i>x;i--){
                if(enemy_pieces.includes(board[py][i]) || ally_pieces.includes(board[py][i])){
                    return false
                }
            }
            if(enemy_pieces.includes(board[y][x]) || board[y][x]===''){
                return true
            }
        }
       }


       //bishops
       if(board[py][px]==='wb' || board[py][px]==='bb' ){

        const ally_pieces = board[py][px]=== 'wb' ? ['wp','wr','wn','wb','wq'] : ['bp','br','bn','bb','bq'] 
        const enemy_pieces = board[py][px]=== 'wb' ? ['bp','br','bn','bb','bq'] : ['wp','wr','wn','wb','wq']

        // left-up diagonally
        if(x-px <0 && y-py <0){
            for(let i=px-1,j=py-1;i>=0 && j>=0;i--,j--){
                if(ally_pieces.includes(board[j][i]) ){
                    console.log('ok')
                    return false
                }
                if(enemy_pieces.includes(board[j][i])){
                    if(x===i&&y===j){
                        return true
                    }
                    else{
                        return false
                    }
                }
                if(i===x && j===y &&   board[j][i]==='' ){
                    return true
                }
            }
        }
        // left-dpwn diagonally
        if(x-px<0 && y-py>0){
            for(let i=px-1,j=py+1;i>=0 && j<=7;i--,j++){
                if(ally_pieces.includes(board[j][i]) ){
                    console.log('ok')
                    return false
                }
                if(enemy_pieces.includes(board[j][i])){
                    if(x===i&&y===j){
                        return true
                    }
                    else{
                        return false
                    }
                }
                if(i===x && j===y &&   board[j][i]==='' ){
                    return true
                }
            }
        }

        // // right-up diagonally
        if(x-px>0 && y-py<0){
            for(let i=px+1,j=py-1;i<=7&&j>=0;i++,j--){
                if(ally_pieces.includes(board[j][i]) ){
                    console.log('ok')
                    return false
                }
                if(enemy_pieces.includes(board[j][i])){
                    if(x===i&&y===j){
                        return true
                    }
                    else{
                        return false
                    }
                }
                if(i===x && j===y &&   board[j][i]==='' ){
                    return true
                }
            }
        }


        // // right-down diagonally
        if(x-px>0 && y-py > 0){
            for(let i=px+1,j=py+1;i<=7&& j<=7;i++,j++){
                if(ally_pieces.includes(board[j][i]) ){
                    console.log('ok')
                    return false
                }
                if(enemy_pieces.includes(board[j][i])){
                    if(x===i&&y===j){
                        return true
                    }
                    else{
                        return false
                    }
                }
                if(i===x && j===y &&   board[j][i]==='' ){
                    return true
                }
            }
        }
       }
       
       //knight
       if(board[py][px]==='wn' || board[py][px]==='bn'){
        const enemy_pieces = board[py][px]=== 'wn' ? ['bp','br','bn','bb','bq'] :['wp','wr','wn','wb','wq'] 

        const valid_knight_moves=[]
        valid_knight_moves.push([px-2,py-1],[px-2,py+1],[px-1,py-2],[px-1,py+2],[px+1,py-2],[px+2,py-1],[px+2,py+1],[px+1,py+2])
        for(let p of valid_knight_moves){
            if(p[0]===x && p[1]===y) {
                if(enemy_pieces.includes(board[y][x]) || board[y][x]===''){
                    return true;

                }
            }
        }
       }

       //queens
       if(board[py][px]==='wq' || board[py][px]==='bq'){
         const ally_pieces = board[py][px]=== 'wq' ? ['wp','wr','wn','wb','wq'] : ['bp','br','bn','bb','bq'] 
         const enemy_pieces = board[py][px]=== 'wq' ? ['bp','br','bn','bb','bq'] : ['wp','wr','wn','wb','wq']
 
         // left-up diagonally
         if(x-px <0 && y-py <0){
             for(let i=px-1,j=py-1;i>=0 && j>=0;i--,j--){
                if(ally_pieces.includes(board[j][i]) ){
                    console.log('ok')
                    return false
                }
                if(enemy_pieces.includes(board[j][i])){
                    if(x===i&&y===j){
                        return true
                    }
                    else{
                        return false
                    }
                }
                if(i===x && j===y &&   board[j][i]==='' ){
                    return true
                }
             }
         }
         // left-dpwn diagonally
         if(x-px<0 && y-py>0){
             for(let i=px-1,j=py+1;i>=0 && j<=7;i--,j++){
                if(ally_pieces.includes(board[j][i]) ){
                    console.log('ok')
                    return false
                }
                if(enemy_pieces.includes(board[j][i])){
                    if(x===i&&y===j){
                        return true
                    }
                    else{
                        return false
                    }
                }
                if(i===x && j===y &&   board[j][i]==='' ){
                    return true
                }
             }
         }
 
         // // right-up diagonally
         if(x-px>0 && y-py<0){
             for(let i=px+1,j=py-1;i<=7&&j>=0;i++,j--){
                if(ally_pieces.includes(board[j][i]) ){
                    console.log('ok')
                    return false
                }
                if(enemy_pieces.includes(board[j][i])){
                    if(x===i&&y===j){
                        return true
                    }
                    else{
                        return false
                    }
                }
                if(i===x && j===y &&   board[j][i]==='' ){
                    return true
                }
             }
         }
 
 
         // // right-down diagonally
         if(x-px>0 && y-py > 0){
             for(let i=px+1,j=py+1;i<=7&& j<=7;i++,j++){
                if(ally_pieces.includes(board[j][i]) ){
                    return false
                }
                if(enemy_pieces.includes(board[j][i])){
                    if(x===i&&y===j){
                        return true
                    }
                    else{
                        return false
                    }
                }
                if(i===x && j===y &&   board[j][i]==='' ){
                    return true
                }
             }
         }
        //move vertically
    
        if(x===px){
        
            for(let i=py-1;i>y;i--){
                if(enemy_pieces.includes(board[i][px]) || ally_pieces.includes(board[i][px])){
                    return false
                }
            }
            for(let i=py+1;i<y;i++){
                if(enemy_pieces.includes(board[i][px]) || ally_pieces.includes(board[i][px])){
                    return false
                }
            }
            if(enemy_pieces.includes(board[y][x])|| board[y][x]===''){
                return true
            }
        }
        //move horizontally
        if(y===py){
            for(let i=px+1;i<x;i++){
                if(enemy_pieces.includes(board[py][i]) || ally_pieces.includes(board[py][i])){
                    return false
                }
            }
            for(let i=px-1;i>x;i--){
                if(enemy_pieces.includes(board[py][i]) || ally_pieces.includes(board[py][i])){
                    return false
                }
            }
            if(enemy_pieces.includes(board[y][x]) || board[y][x]===''){
                return true
            }
        }
       }
       

       //king
       if(board[py][px]==='wk' || board[py][px]==='bk' ){
        const valid_king_moves=[]
        let enemy_king = board[py][px]==='wk' ? 'bk' :'wk'

        valid_king_moves.push([px-1,py],[px-1,py-1],[px-1,py+1],[px,py+1],[px,py-1],[px+1,py],[px+1,py+1],[px+1,py-1])
        for(let p of valid_king_moves){
            if(p[0]===x && p[1]===y) {
                const enemy_king_squares=[[x-1,y],[x-1,y-1],[x-1,y+1],[x,y+1],[x,y-1],[x+1,y],[x+1,y+1],[x+1,y-1]]
                for(let p of enemy_king_squares){
                    if(p[0]>=0 && p[0]<=7 && p[1]>=0 && p[1]<=7){
                        if(board[p[1]][p[0]]===enemy_king){
                            return false
                        }
                    }
                }
                // let safe_king:any =this.isSafeKing(x,y,board,board[py][px])
                // if(safe_king){
                //     console.log('no')
                //     return false
                // }
                if(this.isSafeKing(x,y,board,'wk')){
                    return false
                }
                console.log(this.isSafeKing(x,y,board,'wk'))
              
               
                return true
            }
        }
       }





    return false
    }

    isSafeKing(x:number,y:number,board:any,enemy:string | undefined){
        const enemy_pieces = enemy === 'wk' ? ['bp','br','bn','bb','bq'] : ['wp','wr','wn','wb','wq']
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(enemy_pieces.includes(board[i][j])){
                    if(this.isValidMove(j,i,x,y,board)){
                        return true
                    }
                }

            }
        }
    }

}