import React, {FC, useEffect} from 'react'
import FeedList from "../../components/feed/feed-list/feed-list";
import {useAppDispatch} from "../../services";
import {wsConnectionClosed, wsConnectionStart} from "../../services/slices/ws";
import {STORAGE_KEY, WS_URL_USER} from "../../utils/constants";

const Orders: FC = () => {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem(STORAGE_KEY.ACCESS)
  const ws_str_init = WS_URL_USER + `?token=${token}`

  useEffect(() => {
    dispatch(wsConnectionStart(ws_str_init))

    return () => {
      dispatch(wsConnectionClosed())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <FeedList />
    </div>
  )
}

export default Orders