import type {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";

export type TWebSocketActions<TMessage> = {
  connect: ActionCreatorWithPayload<string>
  disconnect: ActionCreatorWithoutPayload
  sendMessage: ActionCreatorWithPayload<string>
  onConnected: ActionCreatorWithPayload<Event>
  onDisconnected: ActionCreatorWithPayload<CloseEvent>
  onMessageReceived: ActionCreatorWithPayload<TMessage>
  onError: ActionCreatorWithPayload<Event>
}

export type TWebSocketOptions = {
  withTokenRefresh: boolean
}
