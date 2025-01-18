export interface SendMessageRequest
{
  selfUserId : number,
  requestedUserId : number
}

export interface CancelMessageRequest extends SendMessageRequest
{

}