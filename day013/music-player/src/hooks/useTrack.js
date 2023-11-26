import { useEffect, useState } from "react"
import { formatTime } from "../helpers"


function useTracksDuration(tracks) {
    const [isLoadingTrackDuration, setIsLoadingTrackDuration] = useState(true);
    const [durations, setDurations] = useState([]);

    useEffect(() => {
        const fetchDurations = async () => {
            try {
                setIsLoadingTrackDuration(true)
                const durationsArray = [];

                tracks.forEach(track => {
                    const audio = new Audio(track.audioSrc);
                    audio.addEventListener('loadedmetadata', () => {
                        const duration = formatTime(audio.duration);
                        durationsArray.push(duration);
                    });
                });

                setDurations(durationsArray);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoadingTrackDuration(false);
            }
        };

        fetchDurations();
    }, [tracks])

    return { durations, isLoadingTrackDuration };
}

export default useTracksDuration