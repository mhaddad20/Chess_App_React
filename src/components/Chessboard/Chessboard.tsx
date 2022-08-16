import React, { useRef, useState } from "react"
import Tile from "../Tile/tile";
import './Chessboard.css'
import Referee from '../Referee/Referee'



interface Piece {
    image?: string | undefined;
    x: number | undefined;
    y: number | undefined;
    'piece_name': string | undefined;
}

const initialBoardState: Piece[] = []

for (let i = 0; i < 2; i++) {
    let piece_color = i === 0 ? 'b' : 'w'
    let piece_name = i === 0 ? 'b' : 'w'
    let y = i === 0 ? 0 : 7
    initialBoardState.push({ image: `../../${piece_color}rook.png`, x: 0, y: y, 'piece_name': `${piece_name}r` })
    initialBoardState.push({ image: `../../${piece_color}knight.png`, x: 1, y: y, 'piece_name': `${piece_name}n` })
    initialBoardState.push({ image: `../../${piece_color}bishop.png`, x: 2, y: y, 'piece_name': `${piece_name}b` })
    initialBoardState.push({ image: `../../${piece_color}queen.png`, x: 3, y: y, 'piece_name': `${piece_name}q` })
    initialBoardState.push({ image: `../../${piece_color}king.png`, x: 4, y: y, 'piece_name': `${piece_name}k` })
    initialBoardState.push({ image: `../../${piece_color}bishop.png`, x: 5, y: y, 'piece_name': `${piece_name}b` })
    initialBoardState.push({ image: `../../${piece_color}knight.png`, x: 6, y: y, 'piece_name': `${piece_name}n` })
    initialBoardState.push({ image: `../../${piece_color}rook.png`, x: 7, y: y, 'piece_name': `${piece_name}r` })

}

for (let j = 0; j < 8; j++) {
    initialBoardState.push({ image: '../../wpawn.png', x: j, y: 6, 'piece_name': 'wp' })
}

for (let j = 0; j < 8; j++) {
    initialBoardState.push({ image: '../../bpawn.png', x: j, y: 1, 'piece_name': 'bp' })
}

const initialBoardArray: any = [[], [], [], [], [], [], [], []]




for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        initialBoardArray[i].push('')
    }
}
for (let p of initialBoardState) {
    if (p.x !== undefined && p.y!==undefined) {
        initialBoardArray[p.y][p.x]=p.piece_name
    }
}


export default function Chessboard() {
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const [current_board,setBoard] = useState(initialBoardArray)
    const [grid_x, setGridX] = useState(0)
    const [grid_y, setGridY] = useState(0)
    const [active_piece, setActivePiece] = useState<HTMLElement | null>(null)


    const chessboardRef = useRef<HTMLDivElement>(null)
    const referee = new Referee()
    let board = []


    function grabPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current


        const element = e.target as HTMLElement
        if (element.classList.contains('chess_piece') && chessboard) {
            setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 100))
            setGridY(Math.floor((e.clientY - chessboard.offsetTop) / 100))

            const x = e.clientX - 50
            const y = e.clientY - 50
            element.style.position = 'absolute'

            element.style.left = `${x}px`
            element.style.top = `${y}px`

            setActivePiece(element)
        }

    }

    (function () {
        document.onmousemove = handleMouseMove;
        function handleMouseMove(event: any) {
            const chessboard = chessboardRef.current

            if (chessboard && active_piece) {
                if (event.clientX < chessboard.offsetLeft || event.clientX > ((chessboard.offsetLeft + chessboard.clientWidth) - 25)
                    || event.clientY < chessboard.offsetTop || event.clientY > ((chessboard.offsetTop + chessboard.clientHeight) - 25)) {
                    active_piece.style.position = 'relative'
                    active_piece.style.removeProperty('left')
                    active_piece.style.removeProperty('top')
                    setActivePiece(null)

                }


            }
        }
    })();

    function movePiece(e: React.MouseEvent) {
        const x = e.clientX - 50
        const y = e.clientY - 50
        const chessboard = chessboardRef.current

        if (active_piece && chessboard) {
            active_piece.style.position = 'absolute'
            active_piece.style.left = x < chessboard.offsetLeft - 25 ? `${chessboard.offsetLeft - 25}px` : `${x}px`
            active_piece.style.top = y < chessboard.offsetTop ? `${chessboard.offsetTop}px` : `${y}px`
            if (x > (chessboard.offsetLeft + chessboard.clientWidth) - 85) {
                active_piece.style.left = `${chessboard.offsetLeft + chessboard.clientWidth - 85}px`
            }
            if (y > (chessboard.offsetTop + chessboard.clientHeight) - 85) {
                active_piece.style.top = `${chessboard.offsetTop + chessboard.clientHeight - 85}px`
            }

        }

    }
    function removePiece(x:number,y:number,piece_name:string | undefined){
        setPieces((current_pieces) => {

            const updated_board = current_pieces.map((p) => {

                if (p.x === x && p.y === y && p.piece_name===piece_name) {
                   p.x=undefined
                   p.y=undefined
                }
                return p
            })

            return updated_board
        })
    }

    function dropPiece(e: React.MouseEvent) {
        const chessboard = chessboardRef.current
        if (active_piece && chessboard) {

            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            const y = Math.floor((e.clientY - chessboard.offsetTop) / 100)

            setPieces((current_pieces) => {

                const updated_board = current_pieces.map((p) => {

                    if (p.x === grid_x && p.y === grid_y) {
                        if (grid_x === x && grid_y === y) {
                            active_piece.style.position = 'relative'
                            active_piece.style.removeProperty('left')
                            active_piece.style.removeProperty('top')
                        }
                        else {
                            if(referee.isValidMove(grid_x,grid_y,x, y,current_board)){
                                const copy_board=current_board.map((p:any)=>p.slice())
                                copy_board[y][x]=p.piece_name
                                copy_board[p.y][p.x]=''
                                
                                let color = p.piece_name?.includes('w') ? 'w' :'b'
                                for(let i=0;i<8;i++){
                                    for(let j=0;j<8;j++){
                                        if(copy_board[j][i]===`${color}k`){
                                            console.log(kingUnderAttack(i,j,copy_board,color))
                                        }
                                    }
                                }
                            p.x = x
                            p.y = y
                            if(current_board[y][x]!==''){
                                if(p.piece_name==='wp' && y===0){
                                    p.piece_name='wq'
                                    p.image = '../../wqueen.png'
                                }
                                else if(p.piece_name==='bp' && y===7){
                                    p.piece_name='bq'
                                    p.image = '../../bqueen.png'
                                }
                                removePiece(x,y,current_board[y][x])
                            }
                            setBoard((prevState:any)=>{
                                const newBoard = [...prevState]
                                newBoard[grid_y][grid_x]=''
                                newBoard[y][x]=p.piece_name
                                return newBoard
                            })
                        }
                        }



                    }
                    return p
                })

                return updated_board
            })

            active_piece.style.position = 'relative'
            active_piece.style.removeProperty('left')
            active_piece.style.removeProperty('top')
            setActivePiece(null)
            

        }
    }

    function kingUnderAttack(x:number,y:number,board:any,color:string|undefined){
        //vertically
        let enemy_color = color === 'w' ? 'b' :'w'
        for(let i=y-1;i>=0;i--){
            if(board[i][x]===`${enemy_color}q` || board[i][x]===`${enemy_color}r` ){
                return true
            }
            else if(board[i][x]!==''){
                break;
            }
        }
        for(let i=y+1;i<=7;i++){
            if(board[i][x]===`${enemy_color}q` || board[i][x]===`${enemy_color}r` ){
                return true
            }
            else if(board[i][x]!==''){
                break;
            }
        }

        //horizontally
        for(let i=x-1;i>=0;i--){
            if(board[y][i]===`${enemy_color}q` || board[y][i]===`${enemy_color}r` ){
                return true
            }
            else if(board[y][i]!==''){
                break;
            }
        }
        for(let i=x+1;i<=7;i++){
            if(board[y][i]===`${enemy_color}q` || board[y][i]===`${enemy_color}r` ){
                return true
            }
            else if(board[y][i]!==''){
                break;
            }
        }

        //right-up
        for(let i=x+1,j=y-1;i<=7&&j>=0;i++,j--){
            if(board[j][i]===`${enemy_color}q` || board[j][i]===`${enemy_color}b` ){
                return true
            }
            else if(board[j][i]!==''){
                break;
            }
        }
         //right-down
         for(let i=x+1,j=y+1;i<=7&&j<=7;i++,j++){
            if(board[j][i]===`${enemy_color}q` || board[j][i]===`${enemy_color}b` ){
                return true
            }
            else if(board[j][i]!==''){
                break;
            }
        }
         //left-down
         for(let i=x-1,j=y+1;i>=0&&j<=7;i--,j++){
            if(board[j][i]===`${enemy_color}q` || board[j][i]===`${enemy_color}b` ){
                return true
            }
            else if(board[j][i]!==''){
                break;
            }
        }
         //left-up
         for(let i=x-1,j=y-1;i>=0&&j>=0;i--,j--){
            if(board[j][i]===`${enemy_color}q` || board[j][i]===`${enemy_color}b` ){
                return true
            }
            else if(board[j][i]!==''){
                break;
            }
        }

        return false
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let image = undefined
            pieces.forEach((p) => {

                if (p.y === i && p.x === j) {
                    image = p.image
                }
            })
            board.push(<Tile key={`${i},${j}`} image={image} tile_num_row={i} tile_num_column={j} />)
        }
    }

    return <div className="chessboard" onMouseMove={(e) => movePiece(e)} onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        ref={chessboardRef}>
        {board}
    </div>
}
