

export default class Referee {
    isValidMove(px: number, py: number, x: number, y: number, board: any) {
        const enemy_pieces_black = ['bp', 'br', 'bn', 'bb', 'bq']
        const enemy_pieces_white = ['wp', 'wr', 'wn', 'wb', 'wq']

        if (board[py][px] === 'wp') {

            if (py === 6 && y === 4 && board[py - 1][px] === '' && board[py - 2][px] === '' && x === px) {
                return true
            }
            if (board[y][x] === '' && y - py === -1 && x - px === 0) {
                return true
            }
            if (enemy_pieces_black.includes(board[py - 1][px - 1]) && x === px - 1 && y === py - 1) {
                return true
            }
            if (enemy_pieces_black.includes(board[py - 1][px + 1]) && x === px + 1 && y === py - 1) {
                return true
            }
        }

        if (board[py][px] === 'bp') {
            if (py === 1 && y === 3 && board[py + 1][px] === '' && board[py + 2][px] === '' && x === px) {
                return true
            }
            if (board[y][x] === '' && y - py === 1 && x - px === 0) {
                return true
            }
            if (enemy_pieces_white.includes(board[py + 1][px - 1]) && x === px - 1 && y === py + 1) {
                return true
            }
            if (enemy_pieces_white.includes(board[py + 1][px + 1]) && x === px + 1 && y === py + 1) {
                return true
            }
        }

        //rooks
        if (board[py][px] === 'wr' || board[py][px] === 'br') {
            const enemy_pieces = board[py][px] === 'wr' ? ['bp', 'br', 'bn', 'bb', 'bq'] : ['wp', 'wr', 'wn', 'wb', 'wq']
            const ally_pieces = board[py][px] === 'wr' ? ['wp', 'wr', 'wn', 'wb', 'wq'] : ['bp', 'br', 'bn', 'bb', 'bq']

            //move vertically
            if (x === px) {
                for (let i = py - 1; i > y; i--) {
                    if (enemy_pieces.includes(board[i][px]) || ally_pieces.includes(board[i][px])) {
                        return false
                    }
                }
                for (let i = py + 1; i < y; i++) {
                    if (enemy_pieces.includes(board[i][px]) || ally_pieces.includes(board[i][px])) {
                        return false
                    }
                }
                if (enemy_pieces.includes(board[y][x]) || board[y][x] === '') {
                    return true
                }
            }
            //move horizontally
            if (y === py) {
                for (let i = px + 1; i < x; i++) {
                    if (enemy_pieces.includes(board[py][i]) || ally_pieces.includes(board[py][i])) {
                        return false
                    }
                }
                for (let i = px - 1; i > x; i--) {
                    if (enemy_pieces.includes(board[py][i]) || ally_pieces.includes(board[py][i])) {
                        return false
                    }
                }
                if (enemy_pieces.includes(board[y][x]) || board[y][x] === '') {
                    return true
                }
            }
        }


        //bishops
        if (board[py][px] === 'wb' || board[py][px] === 'bb') {

            const ally_pieces = board[py][px] === 'wb' ? ['wp', 'wr', 'wn', 'wb', 'wq'] : ['bp', 'br', 'bn', 'bb', 'bq']
            const enemy_pieces = board[py][px] === 'wb' ? ['bp', 'br', 'bn', 'bb', 'bq'] : ['wp', 'wr', 'wn', 'wb', 'wq']

            // left-up diagonally
            if (x - px < 0 && y - py < 0) {
                for (let i = px - 1, j = py - 1; i >= 0 && j >= 0; i--, j--) {
                    if (ally_pieces.includes(board[j][i])) {
                        return false
                    }
                    if (enemy_pieces.includes(board[j][i])) {
                        if (x === i && y === j) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (i === x && j === y && board[j][i] === '') {
                        return true
                    }
                }
            }
            // left-dpwn diagonally
            if (x - px < 0 && y - py > 0) {
                for (let i = px - 1, j = py + 1; i >= 0 && j <= 7; i--, j++) {
                    if (ally_pieces.includes(board[j][i])) {
                        return false
                    }
                    if (enemy_pieces.includes(board[j][i])) {
                        if (x === i && y === j) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (i === x && j === y && board[j][i] === '') {
                        return true
                    }
                }
            }

            // // right-up diagonally
            if (x - px > 0 && y - py < 0) {
                for (let i = px + 1, j = py - 1; i <= 7 && j >= 0; i++, j--) {
                    if (ally_pieces.includes(board[j][i])) {
                        return false
                    }
                    if (enemy_pieces.includes(board[j][i])) {
                        if (x === i && y === j) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (i === x && j === y && board[j][i] === '') {
                        return true
                    }
                }
            }


            // // right-down diagonally
            if (x - px > 0 && y - py > 0) {
                for (let i = px + 1, j = py + 1; i <= 7 && j <= 7; i++, j++) {
                    if (ally_pieces.includes(board[j][i])) {
                        return false
                    }
                    if (enemy_pieces.includes(board[j][i])) {
                        if (x === i && y === j) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (i === x && j === y && board[j][i] === '') {
                        return true
                    }
                }
            }
        }

        //knight
        if (board[py][px] === 'wn' || board[py][px] === 'bn') {
            const enemy_pieces = board[py][px] === 'wn' ? ['bp', 'br', 'bn', 'bb', 'bq'] : ['wp', 'wr', 'wn', 'wb', 'wq']

            const valid_knight_moves = []
            valid_knight_moves.push([px - 2, py - 1], [px - 2, py + 1], [px - 1, py - 2], [px - 1, py + 2], [px + 1, py - 2], [px + 2, py - 1], [px + 2, py + 1], [px + 1, py + 2])
            for (let p of valid_knight_moves) {
                if (p[0] === x && p[1] === y) {
                    if (enemy_pieces.includes(board[y][x]) || board[y][x] === '') {
                        return true;

                    }
                }
            }
        }

        //queens
        if (board[py][px] === 'wq' || board[py][px] === 'bq') {
            const ally_pieces = board[py][px] === 'wq' ? ['wp', 'wr', 'wn', 'wb', 'wq'] : ['bp', 'br', 'bn', 'bb', 'bq']
            const enemy_pieces = board[py][px] === 'wq' ? ['bp', 'br', 'bn', 'bb', 'bq'] : ['wp', 'wr', 'wn', 'wb', 'wq']

            // left-up diagonally
            if (x - px < 0 && y - py < 0) {
                for (let i = px - 1, j = py - 1; i >= 0 && j >= 0; i--, j--) {
                    if (ally_pieces.includes(board[j][i])) {
                        return false
                    }
                    if (enemy_pieces.includes(board[j][i])) {
                        if (x === i && y === j) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (i === x && j === y && board[j][i] === '') {
                        return true
                    }
                }
            }
            // left-dpwn diagonally
            if (x - px < 0 && y - py > 0) {
                for (let i = px - 1, j = py + 1; i >= 0 && j <= 7; i--, j++) {
                    if (ally_pieces.includes(board[j][i])) {
                        return false
                    }
                    if (enemy_pieces.includes(board[j][i])) {
                        if (x === i && y === j) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (i === x && j === y && board[j][i] === '') {
                        return true
                    }
                }
            }

            // // right-up diagonally
            if (x - px > 0 && y - py < 0) {
                for (let i = px + 1, j = py - 1; i <= 7 && j >= 0; i++, j--) {
                    if (ally_pieces.includes(board[j][i])) {
                        return false
                    }
                    if (enemy_pieces.includes(board[j][i])) {
                        if (x === i && y === j) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (i === x && j === y && board[j][i] === '') {
                        return true
                    }
                }
            }


            // // right-down diagonally
            if (x - px > 0 && y - py > 0) {
                for (let i = px + 1, j = py + 1; i <= 7 && j <= 7; i++, j++) {
                    if (ally_pieces.includes(board[j][i])) {
                        return false
                    }
                    if (enemy_pieces.includes(board[j][i])) {
                        if (x === i && y === j) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (i === x && j === y && board[j][i] === '') {
                        return true
                    }
                }
            }
            //move vertically

            if (x === px) {

                for (let i = py - 1; i > y; i--) {
                    if (enemy_pieces.includes(board[i][px]) || ally_pieces.includes(board[i][px])) {
                        return false
                    }
                }
                for (let i = py + 1; i < y; i++) {
                    if (enemy_pieces.includes(board[i][px]) || ally_pieces.includes(board[i][px])) {
                        return false
                    }
                }
                if (enemy_pieces.includes(board[y][x]) || board[y][x] === '') {
                    return true
                }
            }
            //move horizontally
            if (y === py) {
                for (let i = px + 1; i < x; i++) {
                    if (enemy_pieces.includes(board[py][i]) || ally_pieces.includes(board[py][i])) {
                        return false
                    }
                }
                for (let i = px - 1; i > x; i--) {
                    if (enemy_pieces.includes(board[py][i]) || ally_pieces.includes(board[py][i])) {
                        return false
                    }
                }
                if (enemy_pieces.includes(board[y][x]) || board[y][x] === '') {
                    return true
                }
            }
        }


        //king
        if (board[py][px] === 'wk' || board[py][px] === 'bk') {
            const valid_king_moves = []
            let enemy_king = board[py][px] === 'wk' ? 'bk' : 'wk'

            valid_king_moves.push([px - 1, py], [px - 1, py - 1], [px - 1, py + 1], [px, py + 1], [px, py - 1], [px + 1, py], [px + 1, py + 1], [px + 1, py - 1])
            for (let p of valid_king_moves) {
                if (p[0] === x && p[1] === y) {
                    const enemy_king_squares = [[x - 1, y], [x - 1, y - 1], [x - 1, y + 1], [x, y + 1], [x, y - 1], [x + 1, y], [x + 1, y + 1], [x + 1, y - 1]]
                    for (let p of enemy_king_squares) {
                        if (p[0] >= 0 && p[0] <= 7 && p[1] >= 0 && p[1] <= 7) {
                            if (board[p[1]][p[0]] === enemy_king) {
                                return false
                            }
                        }
                    }

                   
                    if(this.pawnAttackKing(board[py][px],x,y,board)){
                        return false
                    }
                    if(this.knightAttackKing(board[py][px],x,y,board)){
                        return false
                    }
                    if(this.queenAttackKing(board[py][px],x,y,board)){
                        return false
                    }
               
                    if(board[py][px] === 'wk'){
                        if(board[y][x].includes('w')){
                            return false
                        }
                    }
                    else{
                        if(board[y][x].includes('b')){
                            return false
                        }
                    }
                    return true
                }
            }
        }





        return false
    }

    //check if pawn is attacking king
    pawnAttackKing(curr_king:string | undefined,x:number,y:number,board:any){
        let enemy_pawn = curr_king === 'wk' ? 'bp' : 'wp'
        let square_sign = enemy_pawn ==='bp' ? -1 : 1
        if (y+square_sign >=0 && y +square_sign <=7 && x-1 >=0 && x-1<=7) {
            if (board[y + square_sign][x - 1] === enemy_pawn) {
                return true
            }
        }
        if (y+square_sign >=0 && y +square_sign <=7 && x+1 >=0 && x+1<=7) {
            if (board[y + square_sign][x + 1] === enemy_pawn) {
                return true
            }
        }
  
        return false
    }

    knightAttackKing(curr_king:string | undefined,x:number,y:number,board:any){
        let enemy_knight = curr_king === 'wk' ? 'bn' : 'wn'
        const valid_knight_moves = []
        valid_knight_moves.push([x - 2, y - 1], [x - 2, y + 1], [x - 1, y - 2], [x - 1, y + 2], [x + 1, y - 2], [x + 2, y - 1], [x + 2, y + 1], [x + 1, y + 2])
        for(let p of valid_knight_moves){
            if(p[0]<=7 && p[0] >=0 && p[1]<=7 && p[1]>=0){
                if(board[p[1]][p[0]]===enemy_knight){
                    return true
                }
            }
        }
        return false

    }
    queenAttackKing(curr_king:string | undefined,x:number,y:number,board:any){
        let enemy_piece= curr_king === 'wk' ? 'b' :'w'
        //horizontally
        for(let i=x+1;i<=7;i++){
            if(board[y][i].includes(`${enemy_piece}r`) || board[y][i].includes(`${enemy_piece}q`)){
                return true
            }
            if((board[y][i]!=='') &&(board[y][i]!==`${enemy_piece}r` || board[y][i]!==`${enemy_piece}q`)){
                break;

            }
        }

        for(let i=x-1;i>=0;i--){
            if(board[y][i].includes(`${enemy_piece}r`) || board[y][i].includes(`${enemy_piece}q`)){
                return true
            }
            if((board[y][i]!=='') &&(board[y][i]!==`${enemy_piece}r` || board[y][i]!==`${enemy_piece}q`) ){
                break;

            }
        }

       // vertically
        for(let i=y+1;i<=7;i++){
            if(board[i][x].includes(`${enemy_piece}r`) || board[i][x].includes(`${enemy_piece}q`)){
                return true
            }
            if((board[i][x]!=='') &&(board[i][x]!==`${enemy_piece}r` || board[i][x]!==`${enemy_piece}q`) ){
                break;
            }
        }

        for(let i=y-1;i>=0;i--){
            if(board[i][x].includes(`${enemy_piece}r`) || board[i][x].includes(`${enemy_piece}q`)){
                return true
            }
            if((board[i][x]!=='') &&(board[i][x]!==`${enemy_piece}r` || board[i][x]!==`${enemy_piece}q`) ){
                break;
            }
        }

        //right-up
        for(let i=x+1,j=y-1;i<=7&&j>=0;i++,j--){
            if(board[j][i].includes(`${enemy_piece}b`) || board[j][i].includes(`${enemy_piece}q`)){
                return true
            }
            if((board[j][i]!=='') &&(board[j][i]!==`${enemy_piece}b` || board[j][i]!==`${enemy_piece}q`)){
                break;
            }
        }
        //right-down
        for(let i=x+1,j=y+1;i<=7&&j<=7;i++,j++){
            if(board[j][i].includes(`${enemy_piece}b`) || board[j][i].includes(`${enemy_piece}q`)){
                return true
            }
            if((board[j][i]!=='') &&(board[j][i]!==`${enemy_piece}b` || board[j][i]!==`${enemy_piece}q`)){
                break;
            }
        }

        //left-up
        for(let i=x-1,j=y-1;i>=0&&j>=0;i--,j--){
            if(board[j][i].includes(`${enemy_piece}b`) || board[j][i].includes(`${enemy_piece}q`)){
                return true
            }
            if((board[j][i]!=='') &&(board[j][i]!==`${enemy_piece}b` || board[j][i]!==`${enemy_piece}q`)){
                break;
            }
        }

        //left-down
        for(let i=x-1,j=y+1;i>=0&&j<=7;i--,j++){
            if(board[j][i].includes(`${enemy_piece}b`) || board[j][i].includes(`${enemy_piece}q`)){
                return true
            }
            if((board[j][i]!=='') &&(board[j][i]!==`${enemy_piece}b` || board[j][i]!==`${enemy_piece}q`)){
                break;
            }
        }
        return false
    }

   

}