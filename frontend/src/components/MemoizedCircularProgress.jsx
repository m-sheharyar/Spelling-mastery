import { useContext, useMemo } from "react";
import { CircularProgress } from "./CircularProgress";
import { FoundWordsContext } from "../contexts/Contexts";
import AuthContext from "../contexts/AuthContext";

export const MemoizedCircularProgress = ({ setShowConfetti }) => {
    const foundWordsState = useContext(FoundWordsContext)
    const foundWords = foundWordsState[0]
    const {updateLevel, gameLevel} = useContext(AuthContext)
    return (
         <CircularProgress setShowConfetti={setShowConfetti} foundWords={foundWords} updateLevel={updateLevel} gameLevel={gameLevel} />
    )
}