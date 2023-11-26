import { createContext, useContext, useRef, useState } from "react";
import useTracksDuration from "../hooks/useTrack";
import { tracks } from "../data";

const TrackContext = createContext();

const TrackProvider = ({ children }) => {
    // References
    const audioRef = useRef(null)
    const progressBarRef = useRef(null)


    // States
    const [trackIndex, setTrackIndex] = useState(0)
    const [trackIndexFromList, setTrackIndexFromList] = useState(trackIndex)
    const [track, setTrack] = useState(tracks[trackIndex])
    const [timeProgress, setTimeProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlayListOpen, setIsPlayListOpen] = useState(false)

    // Custom hook
    const { tracksDuration, isLoadingTrackDuration } = useTracksDuration(tracks);


    function showPlayList() {
        setIsPlayListOpen(!isPlayListOpen)
    }

    function handleNext() {
        if (trackIndex >= tracks.length - 1) {
            setTrackIndex(0)
            setTrackIndexFromList(0)
            setTrack(tracks[0])
        } else {
            setTrackIndex(trackIndex + 1)
            setTrackIndexFromList(trackIndex + 1)
            setTrack(tracks[trackIndex + 1])
        }
    }

    function handlePlayListItemClick(index) {
        setTrackIndexFromList(index)
    }

    return (
        <TrackContext.Provider value={{
            audioRef,
            progressBarRef,
            trackIndex,
            trackIndexFromList,
            track,
            tracks,
            timeProgress,
            duration,
            tracksDuration,
            isPlayListOpen,
            isLoadingTrackDuration,
            showPlayList,
            handleNext,
            handlePlayListItemClick,
            setDuration,
            setTimeProgress,
            setTrackIndex,
            setTrack,
            setTrackIndexFromList
        }}>
            {children}
        </TrackContext.Provider>
    )
}

export const useTrack = () => {
    return useContext(TrackContext);
}

export default TrackProvider

