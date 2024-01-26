import React, { useState } from 'react'
import { useEffect } from 'react';


const Fetcher = () => {
    const [link, setLink] = useState()
    const fetcher = () => {

        const api = "AIzaSyBIVuBEKwDYGN8JPVJIHyHhjmJnFSyBgbc";
        const pId = "PLeQGRdO33VBna7UjWMILAD-Ufoot_wmYv";
        const video = "https://www.youtube.com/watch?v="
        const l = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${pId}&key=${api}`
        let mp = {}

        useEffect(() => {
            fetch(l)
                .then((data) => {
                    return data.json();
                }).then((completedData) => {

                    completedData.items.map(
                        (e) => {
                            console.log(e.snippet.title)
                            const x = video + e.snippet.resourceId.videoId
                            console.log(x)
                            mp[x] = e.snippet.title
                            setLink(x);
                        }
                    )
                    // console.log(completedData)
                    // console.log(completedData.items[0].snippet.title)
                    // console.log(video + completedData.items[0].snippet.resourceId.videoId)

                }).catch(() => {
                    console.log("error!")
                })
        }, [])
    }

    return (
        <div>
            {fetcher()}
        </div>
    )
}

export default Fetcher
