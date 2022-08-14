import React from "react";
import './tile.css'


interface tileProps {
    image?: string | undefined
    tile_num_row: number
    tile_num_column: number


}

// const verticalAxis=['8','7','6','5','4','3','2','1']
// const horizontalAxis=['a','b','c','d','e','f','g','h']

export default function Tile({ tile_num_row, tile_num_column, image }: tileProps) {
    if ((tile_num_row + tile_num_column) % 2 === 0) {
        return <div className="tile white_tile" >
    {image && <div style={{ backgroundImage: `url(${image})` }} className='chess_piece'></div>}

        </div>
    }
    else {

        return <div className="tile black_tile">
    {image && <div style={{ backgroundImage: `url(${image})` }} className='chess_piece'></div>}

        </div>
    }

}
