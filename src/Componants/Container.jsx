import React from 'react'
import { useState } from 'react'
export default function(){

    const [meme,setMeme]=useState(
        {
            topText:"",
            bottomText:"",
            randomImg:"http://i.imgflip.com/1bij.jpg"
        }
    )

    const [allMemes,setAllMemes]=useState([])

    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImg(){
        const ind=Math.floor(Math.random()*allMemes.length)
        const url=allMemes[ind].url
        setMeme(prevMeme=>(
                {
                    ...prevMeme,
                    randomImg:url
                }
            ))
    }

    function handleChange(event){
        const {name,type,value}=event.target
        setMeme(prevMeme=>(
            {
                ...prevMeme,
                [name]:value
            }
        ))
    }

    return(
    <div>
        <div className="mainBox">
            <div className="form">

            <input 
            type="text" 
            name="topText"
            value={meme.topText}
            onChange={handleChange}
            placeholder="enter text to display on top"
            />

            <input 
            type="text" 
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
            placeholder="enter text to display on bottom"
            />

            <button onClick={getMemeImg}>Get a new meme image</button>
            </div>
            <div className="memeImg">
                <h2 className='topText'>{meme.topText}</h2>
                <h2 className='bottomText'>{meme.bottomText}</h2>
            <img src={meme.randomImg} alt="" className='meme--image'/>
            </div>
        </div>
    </div>
    )
}
