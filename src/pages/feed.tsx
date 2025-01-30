import React, {useEffect} from 'react'
import styles from "./pages.module.css";
import FeedList from "../components/feed/feed-list/feed-list";
import FeedInfo from "../components/feed/feed-info/feed-info";
import {useAppDispatch} from "../services";
import {wsConnectionClosed, wsConnectionStart} from "../services/slices/ws";
import {WS_URL_All} from "../utils/constants";

const FeedPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(wsConnectionStart(WS_URL_All))

    return () => {
      dispatch(wsConnectionClosed())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className={styles.main}>
      <FeedList />
      <FeedInfo />
    </main>
  )
}

export default FeedPage