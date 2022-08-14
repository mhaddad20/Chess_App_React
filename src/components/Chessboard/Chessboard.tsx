import React, { useRef, useState } from "react"
import { act } from "react-dom/test-utils";
import Tile from "../Tile/tile";
import './Chessboard.css'



interface Piece {
    image?: string | undefined;
    x: number | undefined;
    y: number | undefined;
}

const initialBoardState: Piece[] = []

for (let i = 0; i < 2; i++) {
    let piece_color = i === 0 ? 'b' : 'w'
    let y = i === 0 ? 0 : 7
    initialBoardState.push({ image: `../../${piece_color}rook.png`, x: 0, y: y })
    initialBoardState.push({ image: `../../${piece_color}knight.png`, x: 1, y: y })
    initialBoardState.push({ image: `../../${piece_color}bishop.png`, x: 2, y: y })
    initialBoardState.push({ image: `../../${piece_color}queen.png`, x: 3, y: y })
    initialBoardState.push({ image: `../../${piece_color}king.png`, x: 4, y: y })
    initialBoardState.push({ image: `../../${piece_color}bishop.png`, x: 5, y: y })
    initialBoardState.push({ image: `../../${piece_color}knight.png`, x: 6, y: y })
    initialBoardState.push({ image: `../../${piece_color}rook.png`, x: 7, y: y })
}

for (let j = 0; j < 8; j++) {
    initialBoardState.push({ image: '../../wpawn.png', x: j, y: 6 })
}

for (let j = 0; j < 8; j++) {
    initialBoardState.push({ image: '../../bpawn.png', x: j, y: 1 })
}



export default function Chessboard() {
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
    const [grid_x, setGridX] = useState(0)
    const [grid_y, setGridY] = useState(0)
    const [active_piece, setActivePiece] = useState<HTMLElement | null>(null)


    const chessboardRef = useRef<HTMLDivElement>(null)
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

    (function() {
        document.onmousemove = handleMouseMove;
        function handleMouseMove(event:any) {
        const chessboard = chessboardRef.current

        if(chessboard && active_piece){
            if(event.clientX<chessboard.offsetLeft || event.clientX>((chessboard.offsetLeft +chessboard.clientWidth)-25)
            || event.clientY<chessboard.offsetTop || event.clientY>((chessboard.offsetTop +chessboard.clientHeight)-25)){
                console.log('out')
                console.log(active_piece)
                active_piece.style.position='relative'
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

    function dropPiece(e: React.MouseEvent) {
        console.log(3)
        const chessboard = chessboardRef.current
        if (active_piece && chessboard) {

            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 100)
            const y = Math.floor((e.clientY - chessboard.offsetTop) / 100)


            setPieces((current_pieces) => {
        
                const updated_board = current_pieces.map((p) => {

                    if (p.x === grid_x && p.y === grid_y) { 
                        if (grid_x === x && grid_y === y) {
                            active_piece.style.position='relative'
                            active_piece.style.removeProperty('left')
                            active_piece.style.removeProperty('top')
                        }
                        else {
                            p.x = x
                            p.y = y
                        }



                    }
                    return p
                })

                return updated_board
            })

            active_piece.style.position='relative'
            active_piece.style.removeProperty('left')
            active_piece.style.removeProperty('top')

            setActivePiece(null)
            
        }
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
