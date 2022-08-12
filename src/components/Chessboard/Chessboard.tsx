import React,{useRef} from "react"
import Tile from "../Tile/tile";
import './Chessboard.css'



interface Piece{
    image?:string | undefined;
    x:number;
    y:number;
}

const pieces: Piece[] =[]


for(let i=0;i<2;i++){
    let piece_color = i===0 ? 'b':'w'
    let y =  i===0 ? 0:7
    pieces.push({image:`../../${piece_color}rook.png`,x:0,y:y})
    pieces.push({image:`../../${piece_color}knight.png`,x:1,y:y})
    pieces.push({image:`../../${piece_color}bishop.png`,x:2,y:y})
    pieces.push({image:`../../${piece_color}queen.png`,x:3,y:y})
    pieces.push({image:`../../${piece_color}king.png`,x:4,y:y})
    pieces.push({image:`../../${piece_color}bishop.png`,x:5,y:y})
    pieces.push({image:`../../${piece_color}knight.png`,x:6,y:y})
    pieces.push({image:`../../${piece_color}rook.png`,x:7,y:y})
}

for(let j=0;j<8;j++){
    pieces.push({image:'../../wpawn.png',x:j,y:6})
}

for(let j=0;j<8;j++){
    pieces.push({image:'../../bpawn.png',x:j,y:1})
}



export default function Chessboard(){
    const chessboardRef = useRef<HTMLDivElement>(null)
let board=[]
let activePiece: HTMLElement | null = null



function grabPiece(e:React.MouseEvent){

  
    const element = e.target as HTMLElement
    if(element.classList.contains('chess_piece')){
        activePiece=element
    }

}


function movePiece(e:React.MouseEvent)
{     
    const x = e.clientX-50
    const y = e.clientY-50
    const chessboard= chessboardRef.current
    if(activePiece && chessboard){
        // console.log(chessboard.offsetLeft+chessboard.clientLeft)
        activePiece.style.position='absolute'

        activePiece.style.left =  x<chessboard.offsetLeft-25 ? `${chessboard.offsetLeft-25}px`:`${x}px`
        activePiece.style.top= y<chessboard.offsetTop-25 ? `${chessboard.offsetTop-25}px`:`${y}px`
        if(x>(chessboard.offsetLeft+chessboard.clientWidth)-85){
            activePiece.style.left = `${chessboard.offsetLeft+chessboard.clientWidth-85}px`
        }
        if(y>(chessboard.offsetTop+chessboard.clientHeight)-85){
            activePiece.style.top = `${chessboard.offsetTop+chessboard.clientHeight-85}px`
        }


    }
  
}

function dropPiece(){
    if(activePiece){
        activePiece=null
    }
}

for(let i =0;i<8;i++){
    for(let j=0;j<8;j++){
        let image=undefined
        pieces.forEach((p)=>{
            if(p.y===i && p.x=== j){
                image=p.image
            }
    })
    board.push( <Tile key={`${i},${j}`} image={image} tile_num_row={i} tile_num_column={j}/>)
    }
}

return <div className="chessboard" onMouseMove={(e)=>movePiece(e)} onMouseDown={(e)=>grabPiece(e)} 
onMouseUp={()=>dropPiece()}
ref = {chessboardRef}>
    {board}
    </div>
}
