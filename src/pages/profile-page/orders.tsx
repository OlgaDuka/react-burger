import React, {FC, useEffect} from 'react'
import FeedList from '../../components/feed/feed-list/feed-list'
import {useAppDispatch} from '../../services'
import {STORAGE_KEY, WS_URL_USER} from '../../utils/constants'
import {wsUserConnectionClosed, wsUserConnectionStart} from '../../services/slices/ws-user'

const Orders: FC = () => {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem(STORAGE_KEY.ACCESS)
  const ws_str_init = WS_URL_USER + `?token=${token}`

  useEffect(() => {
    dispatch(wsUserConnectionStart(ws_str_init))

    return () => {
      dispatch(wsUserConnectionClosed())
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