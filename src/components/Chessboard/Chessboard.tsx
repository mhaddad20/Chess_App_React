import React,{useState} from "react"
import Tile from "../Tile/tile";
import './Chessboard.css'



interface Piece{
    image?:string | undefined;
    x:number;
    y:number;
}

const pieces: Piece[] =[]
let activePiece: HTMLElement | null = null

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

function movePiece(e:React.MouseEvent)
{
    console.log('active')

    const element = e.target as HTMLElement
    if(element.classList.contains('chess_piece')){
        activePiece=element
    }
  
}
function releasePiece(){
    if(activePiece){
        activePiece=null
    }
}

function holdPiece(e:React.MouseEvent){
    console.log(3)
    const x = e.clientX
    const y = e.clientY
    if(activePiece){
        activePiece.style.position='absolute'
        activePiece.style.top=`${y-50}px`
        activePiece.style.left=`${x-50}px`
    }

}

export default function Chessboard(){
let board=[]

for(let i =0;i<8;i++){
    for(let j=0;j<8;j++){
        let image=undefined
        pieces.forEach((p)=>{
            if(p.y===i && p.x=== j){
                image=p.image
            }
    })
    board.push( <Tile  key={`${i},${j}`} image={image} tile_num_row={i} tile_num_column={j}/>)
    }
}

return <div className="chessboard" onMouseMove={(e)=>holdPiece(e)} onMouseDown={(e)=>movePiece(e)} onMouseUp={()=>releasePiece()}>
    {board}
    {/* <div style={{backgroundImage:`url('/bking.png')`}}></div> */}
  

    </div>
}
